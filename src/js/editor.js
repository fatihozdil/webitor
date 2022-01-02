// store current filename
let currentFileName = "";

// store where
// {"filename": "text"}
let filesData = [];

// store filebox html
let fileTemplates = [];

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

// get filename
function setFileName() {
  const filename = document.getElementById("new-filename").value;

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
  createFile();
}


function renameFile(elem) {
  alert(elem.id);
  console.log(id);
}

// create file ui component
function createFile() {
  // close filename model
  document.getElementById("filename-modal").style.display = "none";
  //  const template
  const template = `
  <!-- button template -->
  <div>

  <div class="d-flex justify-content-between file-box
    align-items-baseline shadow p-2 bg-secondary rounded my-2" onclick="loadFile(event)" id="${currentFileName}" style="cursor: pointer;">
    <div style="user-select: none">
    ${currentFileName}
    </div>
    <div class="d-flex">
      <button type="button" class="me-2 btn btn-sm btn-outline-light" onclick="renameFile(this)">
        <i class="fas fa-pen fa-1x"></i>
      </button>
      <button type="button" class="btn btn-sm btn-outline-light" onclick="deleteFile(this)">
        <i class="fas fa-trash fa-1x"></i>
      </button>
    </div>
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
function loadFile(event) {
  // user clicks same button
  if (currentFileName == event.target.id) {
    return;
  }


  // update previously selected color
  updatePrevColor();

  currentFileName = event.target.id;
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


function saveChanges() {
  const fileContent = document.getElementById("editor").value;

  // store files
  filesData[currentFileName] = fileContent;
}

//delete file
function deleteFile(elem) {
  const id = elem.parentNode.parentNode.id;
  delete filesData[id];
  document.getElementById(id).remove();
  document.getElementById("editor").value = "";
  clearPage();
  // filesData.splice(event.target.id, 1);
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
