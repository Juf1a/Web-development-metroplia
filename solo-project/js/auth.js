function getUsers() {
  return JSON.parse(localStorage.getItem('users') || '[]');
}

function getCurrentUser() {
  return JSON.parse(localStorage.getItem('currentUser') || 'null');
}

function setCurrentUser(user) {
  localStorage.setItem('currentUser', JSON.stringify(user));
}

function showError(msg) {
  let err = document.getElementById('authError');
  if (!err) {
    err = document.createElement('p');
    err.id = 'authError';
    err.className = 'auth-error';
    document.getElementById('authButton').before(err);
  }
  err.textContent = msg;
}

function clearError() {
  const err = document.getElementById('authError');
  if (err) err.remove();
}

function showRegister() {
  clearError();
  document.getElementById('authTitle').textContent = 'Register';
  const btn = document.getElementById('authButton');
  btn.textContent = 'Register';
  btn.onclick = register;
  document.getElementById('email').style.display = 'block';
  document.getElementById('switchText').innerHTML =
    'Already have an account? <a href="#" onclick="showLogin()">Login</a>';
}

function showLogin() {
  clearError();
  document.getElementById('authTitle').textContent = 'Login';
  const btn = document.getElementById('authButton');
  btn.textContent = 'Login';
  btn.onclick = login;
  document.getElementById('email').style.display = 'none';
  document.getElementById('switchText').innerHTML =
    'Don\'t have an account? <a href="#" onclick="showRegister()">Register</a>';
}

function login() {
  const username = document.getElementById('username').value.trim();
  const password = document.getElementById('password').value;

  if (!username || !password) {
    showError('Please fill in all fields.');
    return;
  }

  const user = getUsers().find(u => u.username === username && u.password === password);

  if (!user) {
    showError('Incorrect username or password.');
    return;
  }

  setCurrentUser({ username: user.username, email: user.email });
  window.location.href = 'home.html';
}

function register() {
  const username = document.getElementById('username').value.trim();
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value;

  if (!username || !email || !password) {
    showError('Please fill in all fields.');
    return;
  }

  if (password.length < 6) {
    showError('Password must be at least 6 characters.');
    return;
  }

  const users = getUsers();

  if (users.find(u => u.username === username)) {
    showError('Username already taken.');
    return;
  }

  users.push({ username, email, password });
  localStorage.setItem('users', JSON.stringify(users));
  setCurrentUser({ username, email });
  window.location.href = 'home.html';
}

// Redirect away if already logged in
if (getCurrentUser()) {
  window.location.href = 'home.html';
}
