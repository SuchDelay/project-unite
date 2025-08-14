// Elements
const loginBtn = document.getElementById('loginBtn');
const registerBtn = document.getElementById('registerBtn');
const loginModal = document.getElementById('loginModal');
const registerModal = document.getElementById('registerModal');
const landing = document.getElementById('landing');
const dashboard = document.getElementById('dashboard');
const userNameSpan = document.getElementById('userName');
const projectsList = document.getElementById('projectsList');
const addProjectBtn = document.getElementById('addProjectBtn');
const logoutBtn = document.getElementById('logoutBtn');

// Modal controls
loginBtn.onclick = () => loginModal.style.display = 'flex';
registerBtn.onclick = () => registerModal.style.display = 'flex';
document.querySelectorAll('.close').forEach(btn => {
  btn.onclick = () => document.getElementById(btn.dataset.close).style.display = 'none';
});
window.onclick = (e) => {
  if (e.target.classList.contains('modal')) e.target.style.display = 'none';
};

// Register
document.getElementById('doRegister').onclick = () => {
  const name = document.getElementById('regName').value.trim();
  const type = document.getElementById('regType').value;
  if (!name) return alert("Please enter a name");
  localStorage.setItem('pu_user', JSON.stringify({name, type, projects: []}));
  registerModal.style.display = 'none';
  loadDashboard();
};

// Login
document.getElementById('doLogin').onclick = () => {
  const name = document.getElementById('loginName').value.trim();
  const user = JSON.parse(localStorage.getItem('pu_user') || 'null');
  if (!user || user.name !== name) return alert("User not found or name incorrect");
  loginModal.style.display = 'none';
  loadDashboard();
};

// Load dashboard
function loadDashboard() {
  const user = JSON.parse(localStorage.getItem('pu_user') || 'null');
  if (!user) return;
  landing.style.display = 'none';
  dashboard.style.display = 'block';
  userNameSpan.textContent = user.name;
  projectsList.innerHTML = '';
  user.projects.forEach(p => {
    const div = document.createElement('div');
    div.className = 'project';
    div.textContent = p;
    projectsList.appendChild(div);
  });
}

// Add project
addProjectBtn.onclick = () => {
  const title = document.getElementById('projectTitle').value.trim();
  if (!title) return;
  const user = JSON.parse(localStorage.getItem('pu_user'));
  user.projects.push(title);
  localStorage.setItem('pu_user', JSON.stringify(user));
  document.getElementById('projectTitle').value = '';
  loadDashboard();
};

// Logout
logoutBtn.onclick = () => {
  dashboard.style.display = 'none';
  landing.style.display = 'block';
};

// Auto load if logged in
if (localStorage.getItem('pu_user')) {
  loadDashboard();
}
