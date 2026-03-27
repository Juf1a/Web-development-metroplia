function showRegister() {
  document.getElementById("authTitle").textContent = "Register";

  const btn = document.getElementById("authButton");
  btn.textContent = "Register";
  btn.onclick = register;
  
  document.getElementById("email").style.display = "block";

  document.getElementById("switchText").innerHTML =
    'Already have an account? <a href="#" onclick="showLogin()">Login</a>';
}

function showLogin() {
  document.getElementById("authTitle").textContent = "Login";

  const btn = document.getElementById("authButton");
  btn.textContent = "Login";
  btn.onclick = login;

  document.getElementById("email").style.display = "none";

  document.getElementById("switchText").innerHTML =
    'Don\'t have an account? <a href="#" onclick="showRegister()">Register</a>';
}

function login() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  console.log("Logging in:", username, password);
  alert("Login clicked");
}

function register() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  console.log("Registering:", username, password);
  alert("Register clicked");
}