// change color theme
function switchMode() {
  console.log("mode is changing...");
  document.querySelectorAll('*').forEach(function(node) {
    // change background
    if (node.classList.contains('theme-white')) {
      node.classList.remove('theme-white');
      node.classList.add('theme-black');
    }
    else if (node.classList.contains('theme-black')) {
      node.classList.remove('theme-black');
      node.classList.add('theme-white');
    }
    // switch file box logos
    if (node.classList.contains('icon-white')) {
      node.classList.remove('icon-white');
      node.classList.add('icon-black');
    }
    else if (node.classList.contains('icon-black')) {
      node.classList.remove('icon-black');
      node.classList.add('icon-white');
    }
  });
  // chage logos
  document.querySelectorAll(".logo").forEach(function(logos) {
    if (logos.src.includes("black"))
      logos.src = "assets/logo-white.png";
    else
      logos.src = "assets/logo-black.png";
  });
}
