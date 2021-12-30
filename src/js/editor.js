// store current filename
let currentFileName = "";

// store where 
// {"filename": "text"}
let filesData = []

// fix tab issue
document.getElementById('editor').addEventListener('keydown', function(e) {
  if (e.key == 'Tab') {
    e.preventDefault();
    var start = this.selectionStart;
    var end = this.selectionEnd;

    // set textarea value to: text before caret + tab + text after caret
    this.value = this.value.substring(0, start) +
      "\t" + this.value.substring(end);

    // put caret at right position again
    this.selectionStart =
      this.selectionEnd = start + 1;
  }
});


// download current text
function download(filename, text) {
  var element = document.createElement('a');
  element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
  element.setAttribute('download', filename);

  element.style.display = 'none';
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);
}

// call downloader code
function downloadFile() {
  const fileContent = document.getElementById("editor").value; 
  download(currentFileName, fileContent);
}

// get filename
function setFileName() {
  const filename  = document.getElementById("new-filename").value; 
  currentFileName = filename;
  createFile();
}


// create file ui component
function createFile() {
  // close filename model
  document.getElementById("filename-modal").style.display = "none"; 
  //  const template 
  const fileContent = document.getElementById("files"); 
  const template = 
  `
  <!-- button template -->
  <div class="d-flex justify-content-between 
    align-items-baseline shadow p-2 bg-secondary rounded my-2">
    <div id="${currentFileName}">
    ${currentFileName}
    </div>
    <div class="d-flex">
      <button type="button" class=" me-2 btn btn-sm btn-outline-light">
        <i class="fas fa-pen fa-1x"></i>
      </button>
      <button type="button" class="btn btn-sm btn-outline-light">
        <i class="fas fa-trash fa-1x"></i>
      </button>
    </div>
  </div>
  `

  // set add  
  files.innerHTML += template;


  console.log(template);
}

function saveChanges() {
  const fileContent = document.getElementById("editor").value; 
  console.log("file is saving")
  // store files
  filesData[currentFileName] = fileContent;
}
