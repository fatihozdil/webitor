const loginBtn = document.getElementById('login-btn');
const userMenu = document.getElementById('user-menu');

function login() {
  userMenu.classList.remove("d-none");
  loginBtn.classList.add("d-none");
}

function logout() {
  loginBtn.classList.remove("d-none");
  userMenu.classList.add("d-none");
}
