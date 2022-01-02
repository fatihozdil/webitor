// store current filename
let currentFileName = "";
// store filename when clicked to the rename button
let editedFileName = "";

// store files datas where
// {"filename": "text"}
let filesData = [];

// fix tab issue
document.getElementById("editor").addEventListener("keydown", function (e) {
  if (e.key == "Tab") {
    e.preventDefault();
    var start = this.selectionStart;
    var end = this.selectionEnd;

    // set textarea value to: text before caret + tab + text after caret
    this.value =
      this.value.substring(0, start) + "\t" + this.value.substring(end);

    // put caret at right position again
    this.selectionStart = this.selectionEnd = start + 1;
  }
});

// download current text
function download(filename, text) {
  var element = document.createElement("a");
  element.setAttribute(
    "href",
    "data:text/plain;charset=utf-8," + encodeURIComponent(text)
  );
  element.setAttribute("download", filename);

  element.style.display = "none";
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);
}

// call downloader code
function downloadFile() {
  if (currentFileName === "") {
    alert("please create file");
    return;
  }
  const fileContent = document.getElementById("editor").value;
  download(currentFileName, fileContent);
}

function uploadProcess() {
}
// upload file from local
function upload() {
  let uploadedFileName = "";
  let uploadedFileContent = "";
  const fileUpload = document.getElementById('uploaded-file');
  fileUpload.click();
  fileUpload.addEventListener('change', function () {
    const file = fileUpload.files[0];
    // set file name
    uploadedFileName = file.name;
    let fileRead = new FileReader();
    fileRead.onload = function() {
      // fetch file content
      uploadedFileContent = fileRead.result;


      // create ui
      createFile(uploadedFileName);
      // create set content
      filesData[uploadedFileName] = uploadedFileContent;
      // load content to text area 
      document.getElementById("editor").value = filesData[uploadedFileName];
      // have access to name and content
    }
    fileRead.readAsText(file);

  })
}



// get filename
function createFile(customName) {
  let filename = "";
  // user manually creates file
  if (customName == undefined)
    filename = document.getElementById("new-filename").value;
  // create uploaded file ui 
  else 
    filename = customName;

  // reset file name
  document.getElementById("new-filename").value = "";

  // prevent to create same file
  if (filesData[filename] != undefined) {
    alert(`file '${filename}' already exist`);
    return;
  }


  // open new file content
  filesData[currentFileName] = ""
  document.getElementById("editor").value = filesData[currentFileName];

  // update previously selected color
  updatePrevColor();

  currentFileName = filename;


  // craete new file box component
  createComponent();
}



// set new file name
function setNewFileName(event, fileName) {
  editedFileName = fileName;
  event.stopPropagation();
}

// rename files content with using
// editing file name info
function renameFile() {
  // access new file name
  const newFileName = document.getElementById("update-filename").value;

  // access elements
  const fileBox = document.getElementById(editedFileName);
  const fileNameText = fileBox.childNodes[1];
  const renameButton= fileBox.childNodes[3].childNodes[3];

  // update ui
  // remove old infos
  fileBox.removeAttribute("onclick");
  fileBox.setAttribute('onclick', `loadFile('${newFileName}')`)
  fileBox.removeAttribute("id");
  fileBox.setAttribute('id', `${newFileName}`)
  fileNameText.innerHTML = newFileName;
  renameButton.removeAttribute('onclick');
  renameButton.setAttribute('onclick', `setNewFileName(event, '${newFileName}')`)

  // update data
  const temp = filesData[editedFileName];
  delete filesData[editedFileName];
  filesData[newFileName] = temp;

  // set current file, if necessary
  if (editedFileName === currentFileName)
    currentFileName = newFileName;

  console.log(temp);

}

// create file ui component
function createComponent() {
  // close filename model
  document.getElementById("filename-modal").style.display = "none";
  //  const template
  const template = `
  <!-- button template -->
  <div class="d-flex justify-content-between file-box
    align-items-baseline shadow p-2 bg-secondary rounded my-2" onclick="loadFile('${currentFileName}')" id="${currentFileName}" style="cursor: pointer;">
    <div style="user-select: none" >
    ${currentFileName}
    </div>
    <div class="d-flex" >
      <!-- update file name -->
      <button type="button"
      class="me-2 btn btn-sm btn-outline-light"
      onclick="setNewFileName(event, '${currentFileName}')"
      data-bs-toggle="modal"
      data-bs-target="#update-file-name">
        <i class="fas fa-pen fa-1x"></i>
      </button>
      <button type="button" class="btn btn-sm btn-outline-light" onclick="deleteFile(event, this)">
        <i class="fas fa-trash fa-1x"></i>
      </button>
    </div>
  </div>
  <style>
    .file-box:hover {
      color: black;
    }
  </style>
  `;

  const fileData = {
    "currentFileName": currentFileName,
    "template": template,
  }
  // set add
  files.insertAdjacentHTML('beforeend', template);
  //clearPage();
  //save empty file
  saveChanges();

  // change firstly selected box
  changeColor(currentFileName);

}




function updatePrevColor() {
  // revert prev selected file-box color
  if (currentFileName != "")  {
    changeColor(currentFileName);
  }
}

//load file content
function loadFile(id) {
  // user clicks same button
  if (currentFileName == id) {
    return;
  }

  // update previously selected color
  updatePrevColor();

  currentFileName = id;
  document.getElementById("editor").value = filesData[currentFileName];
  // change style of selected file box
  changeColor(currentFileName);
}



function changeColor(fileId) {
  const fileBox = document.getElementById(fileId);
  // check
  if(!fileBox.classList.contains("bg-white")) {
    // remove old colors
    fileBox.classList.remove("bg-dark", "text-white");
    // add new ones
    fileBox.classList.add("bg-white", "text-dark");

    fileBox.querySelectorAll('button').forEach(function(node) {
      // Do whatever you want with the node object.
      node.classList.remove("btn-outline-light");
      node.classList.add("btn-outline-dark");
    });
  }
  else {
    fileBox.classList.remove("bg-white", "text-dark");
    fileBox.classList.add("bg-dark", "text-white");

    fileBox.querySelectorAll('button').forEach(function(node) {
      // Do whatever you want with the node object.
      node.classList.remove("btn-outline-dark");
      node.classList.add("btn-outline-light");
    });
  }

}

//delete file
function deleteFile(event, elem) {
  event.stopPropagation();

  const id = elem.parentNode.parentNode.id;
  console.log(id);
  delete filesData[id];
  document.getElementById(id).remove();
  document.getElementById("editor").value = "";
  clearPage();
  // filesData.splice(event.target.id, 1);
}


function saveChanges() {
  const fileContent = document.getElementById("editor").value;

  // store files
  filesData[currentFileName] = fileContent;
}


function clearPage() {
  document.getElementById("editor").value = "";
  currentFileName = "";
}

/*
  // add event listener to enter button
const rename = document.getElementById('rename')
rename.addEventListener("keyup", function (event) {

  if (event.keyCode === 13) {
    event.preventDefault()
    setFileName();
  }
});
*/


/*
  // save changes with ctrl+s
const rename = document.getElementById('rename')
rename.addEventListener("keyup", function (event) {

  if (event.keyCode === 17 && event.keyCode === 83) {
    event.preventDefault()
    saveChanges();
    console.log("all changes are saved");
  }
});
*/
