// These helpers are global because header.js loads before every page script

function getCurrentUser() {
  return JSON.parse(localStorage.getItem('currentUser') || 'null');
}

function favKey() {
  const user = getCurrentUser();
  return user ? 'favorites_' + user.username : 'favorites_guest';
}

function getFavorites() {
  return JSON.parse(localStorage.getItem(favKey()) || '[]');
}

function toggleFavorite(id) {
  const favorites = getFavorites();
  const index = favorites.indexOf(id);
  if (index === -1) {
    favorites.push(id);
  } else {
    favorites.splice(index, 1);
  }
  localStorage.setItem(favKey(), JSON.stringify(favorites));
}

function logout() {
  localStorage.removeItem('currentUser');
  window.location.href = 'home.html';
}

function showToast(msg) {
  const existing = document.getElementById('toast');
  if (existing) existing.remove();

  const toast = document.createElement('div');
  toast.id = 'toast';
  toast.className = 'toast';
  toast.textContent = msg;
  document.body.appendChild(toast);

  requestAnimationFrame(() => toast.classList.add('toast-show'));
  setTimeout(() => {
    toast.classList.remove('toast-show');
    setTimeout(() => toast.remove(), 300);
  }, 2500);
}

(function initHeader() {
  const dropdown = document.querySelector('.dropdown');
  if (!dropdown) return;

  const user = getCurrentUser();

  if (user) {
    dropdown.innerHTML = `
      <p class="username">${user.username}</p>
      <a href="profile.html">My Profile</a>
      <a href="favorites.html">My Favorites</a>
      <a href="#" id="logoutBtn">Logout</a>
    `;
    document.getElementById('logoutBtn').addEventListener('click', (e) => {
      e.preventDefault();
      logout();
    });

    // swap the SVG icon for the user's actual photo if they've uploaded one
    const pics = JSON.parse(localStorage.getItem('profilePics') || '{}');
    const pic = pics[user.username];
    if (pic) {
      const btn = document.querySelector('.user-btn');
      if (btn) {
        btn.innerHTML = `<img src="${pic}" class="user-btn-avatar" alt="avatar">`;
        btn.classList.add('has-avatar');
      }
    }
  } else {
    dropdown.innerHTML = `
      <p class="username">Not logged in</p>
      <a href="auth.html">Login / Sign up</a>
    `;
    const favLink = document.querySelector('nav .nav-links a[href="favorites.html"]');
    if (favLink) favLink.href = 'auth.html';
  }
})();
