// store current filename
let currentFileName = "";
// store filename when clicked to the rename button
let editedFileName = "";

// store files datas where
// {"filename": "text"}
let filesData = [];

// number of lines in text-area
let lines = 1;

const textArea = document.getElementById("text-area");

// fix tab issue
textArea.addEventListener("keydown", function (e) {
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
  const fileContent = textArea.value;
  download(currentFileName, fileContent);
}

// create upload listener 
const fileUpload = document.getElementById('uploaded-file');
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
    document.getElementById("text-area").value = filesData[uploadedFileName];
    // have access to name and content
    // place number of line
    line = 1;
    updateLines();
  }
  fileRead.readAsText(file);
})

// upload file from local
function upload() {
  let uploadedFileName = "";
  let uploadedFileContent = "";
  // call upload listener
  fileUpload.click();
}


// get filename
function createFile(customName) {
  let filename = "";
  // user manually creates file
  if (customName == undefined) {
    filename = document.getElementById("new-filename").value;
  }
  // create uploaded file ui
  else {
    filename = customName;
  }

  // reset file name
  document.getElementById("new-filename").value = "";

  // prevent to create same file
  if (filesData[filename] != undefined) {
    alert(`file '${filename}' already exist`);
    return;
  }


  // open new file content
  textArea.value = "";


  // update previously selected color
  updatePrevColor();

  currentFileName = filename;

  // update lines
  updateLines();

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
  document.getElementById("update-filename").value = ""; // reset old value

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
  <div class="d-flex justify-content-between file-box theme-white align-items-baseline shadow p-2 rounded my-1 border-top border-bottom border-0 border-light rounded-0" 
       onclick="loadFile('${currentFileName}')" 
       id="${currentFileName}" 
       style="cursor: pointer;">
    <div style="user-select: none" >
    ${currentFileName}
    </div>
    <div class="d-flex" >
      <!-- update file name -->
      <button type="button"
      class="me-2 btn btn-sm"
      onclick="setNewFileName(event, '${currentFileName}')"
      data-bs-toggle="modal"
      data-bs-target="#update-file-name" title="rename file">
        <i class="fas fa-pen fa-1x icon-black"></i>
      </button>
      <button type="button" class="btn btn-sm" onclick="deleteFile(event, this)" title="delete file">
        <i class="fas fa-trash fa-1x icon-black"></i>
      </button>
    </div>
  </div>
  `;


  const fileData = {
    "currentFileName": currentFileName,
    "template": template,
  }
  // set add
  files.insertAdjacentHTML('beforeend', template);

  // if dark mode on 
  // create white file boxes
  if (isDarkModeOn)
    elementThemeSwitcher(`${currentFileName}`);

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
  textArea.value = filesData[currentFileName];
  // change style of selected file box
  changeColor(currentFileName);
  
  // update lines
  updateLines()
}



// switch the color of fil box
function changeColor(fileId) {
  const fileBox = document.getElementById(fileId);
  // make theme white
  if(!fileBox.classList.contains("theme-white")) {
    // remove old colors
    fileBox.classList.remove("theme-black");
    // add new ones
    fileBox.classList.add("theme-white");

    fileBox.querySelectorAll('i').forEach(function(node) {
      // Do whatever you want with the node object.
      node.classList.remove("icon-white");
      node.classList.add("icon-black");
    });
  }
  // make theme dark
  else {
    // remove old colors
    fileBox.classList.remove("theme-white");
    // add new ones
    fileBox.classList.add("theme-black");

    fileBox.querySelectorAll('i').forEach(function(node) {
      // Do whatever you want with the node object.
      node.classList.remove("icon-black");
      node.classList.add("icon-white");
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
  textArea.value = "";
  clearPage();
  // filesData.splice(event.target.id, 1);
}


function saveChanges() {
  const fileContent = textArea.value;
  // store files
  filesData[currentFileName] = fileContent;
}


function clearPage() {
  textArea.value = "";
  currentFileName = "";
  // reset line counter
  removeLines(calcLines())
  updateLines()
}

/* enumerate lines in text-area */
function updateLines(event) {
  // auto save edited text
  if (currentFileName != "")
    saveChanges();

  // count number of lines
  const numOfLine = calcLines()
  const lineDiff = numOfLine - lines;
  console.log("line state: " + lines)
  console.log("num of lines: " + numOfLine)
  if (lineDiff > 0) {
    console.log("add new line")
    putLines(Math.abs(lineDiff));
    // handle the overflowed text 
    //scrollToBottom("editor");
    scrollToTop("text-area");
  }
  else if (lineDiff < 0 && lines != 1) {
    console.log("remove line")
    // remeove last count
    removeLines(Math.abs(lineDiff));
  }
}

// return number of lines
function calcLines() {
  // count number of lines
  const fileContent = textArea.value;
  return fileContent.split(/\r\n|\r|\n/).length // add 1 to pass new line
}

// fill with line counts 2 to n inclusive
function putLines(n) {
  for (let i = 0; i < n; i++) {
    const newLineCount = `<p class="mb-0">${lines + 1}</p>`
    document.getElementById("enumerate").insertAdjacentHTML('beforeend', newLineCount)
    lines++;
  }
}

function removeLines(n) {
  for (let i = 0; i < n; i++) {
    document.getElementById("enumerate").removeChild(document.getElementById("enumerate").lastChild);
    lines--;
  }
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

function scrollToBottom (id) {
  var div = document.getElementById(id);
  console.log(div.scroolTop);
  div.scrollTop = div.scrollHeight - div.clientHeight;
}


function scrollToTop(id) {
  var div = document.getElementById(id);
  console.log(div.scroolTop);
  div.scrollTop = 0; 
  console.log(div.scroolTop);
}

// copy content of current file
function copyFile() {
  /* Select the text field */
  const textArea = document.getElementById("text-area");

  textArea.select();
  textArea.setSelectionRange(0, 99999); /* For mobile devices */

  /* Copy the text inside the text field */
  navigator.clipboard.writeText(textArea.value);
}
