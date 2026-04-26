function getUsers() {
  return JSON.parse(localStorage.getItem('users') || '[]');
}

if (!getCurrentUser()) {
  window.location.href = 'auth.html';
}

// inline SVG so there's no broken image if no photo has been uploaded yet
const PLACEHOLDER = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 24 24' fill='%23cbd5e1'%3E%3Ccircle cx='12' cy='8' r='4'/%3E%3Cpath d='M4 20c0-4 3.6-7 8-7s8 3 8 7'/%3E%3C/svg%3E";

function getProfilePic(username) {
  const pics = JSON.parse(localStorage.getItem('profilePics') || '{}');
  return pics[username] || PLACEHOLDER;
}

function saveProfilePic(username, dataUrl) {
  const pics = JSON.parse(localStorage.getItem('profilePics') || '{}');
  pics[username] = dataUrl;
  localStorage.setItem('profilePics', JSON.stringify(pics));
}

function showMsg(id, text, isError) {
  const el = document.getElementById(id);
  el.textContent = text;
  el.className = 'profile-msg ' + (isError ? 'profile-msg-error' : 'profile-msg-success');
  setTimeout(() => { el.textContent = ''; el.className = 'profile-msg'; }, 3000);
}

function initProfile() {
  const user = getCurrentUser();

  document.getElementById('profileUsername').textContent = user.username;
  document.getElementById('profileEmail').textContent = user.email;
  document.getElementById('newUsername').value = user.username;
  document.getElementById('newEmail').value = user.email;

  const img = document.getElementById('profilePicImg');
  img.src = getProfilePic(user.username);

  document.getElementById('profilePicInput').addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const dataUrl = ev.target.result;
      saveProfilePic(getCurrentUser().username, dataUrl);
      img.src = dataUrl;
      showMsg('infoMsg', 'Profile picture updated.', false);
    };
    reader.readAsDataURL(file);
  });

  document.getElementById('saveInfoBtn').addEventListener('click', () => {
    const currentUser = getCurrentUser();
    const newUsername = document.getElementById('newUsername').value.trim();
    const newEmail = document.getElementById('newEmail').value.trim();

    if (!newUsername || !newEmail) {
      showMsg('infoMsg', 'Fields cannot be empty.', true);
      return;
    }

    const users = getUsers();
    const conflict = users.find(u => u.username === newUsername && u.username !== currentUser.username);
    if (conflict) {
      showMsg('infoMsg', 'Username already taken.', true);
      return;
    }

    const idx = users.findIndex(u => u.username === currentUser.username);
    if (idx === -1) {
      showMsg('infoMsg', 'User not found.', true);
      return;
    }

    // if the username changed, move the profile pic to the new key so it isn't lost
    if (newUsername !== currentUser.username) {
      const pics = JSON.parse(localStorage.getItem('profilePics') || '{}');
      if (pics[currentUser.username]) {
        pics[newUsername] = pics[currentUser.username];
        delete pics[currentUser.username];
        localStorage.setItem('profilePics', JSON.stringify(pics));
      }
    }

    users[idx].username = newUsername;
    users[idx].email = newEmail;
    localStorage.setItem('users', JSON.stringify(users));
    localStorage.setItem('currentUser', JSON.stringify({ username: newUsername, email: newEmail }));

    document.getElementById('profileUsername').textContent = newUsername;
    document.getElementById('profileEmail').textContent = newEmail;

    showMsg('infoMsg', 'Info updated successfully.', false);
  });

  document.getElementById('savePasswordBtn').addEventListener('click', () => {
    const current = document.getElementById('currentPassword').value;
    const next = document.getElementById('newPassword').value;
    const confirm = document.getElementById('confirmPassword').value;

    if (!current || !next || !confirm) {
      showMsg('pwMsg', 'Please fill in all fields.', true);
      return;
    }

    const users = getUsers();
    const user = getCurrentUser();
    const idx = users.findIndex(u => u.username === user.username);

    if (idx === -1 || users[idx].password !== current) {
      showMsg('pwMsg', 'Current password is incorrect.', true);
      return;
    }

    if (next.length < 6) {
      showMsg('pwMsg', 'New password must be at least 6 characters.', true);
      return;
    }

    if (next !== confirm) {
      showMsg('pwMsg', 'Passwords do not match.', true);
      return;
    }

    users[idx].password = next;
    localStorage.setItem('users', JSON.stringify(users));

    document.getElementById('currentPassword').value = '';
    document.getElementById('newPassword').value = '';
    document.getElementById('confirmPassword').value = '';

    showMsg('pwMsg', 'Password changed successfully.', false);
  });
}

initProfile();
