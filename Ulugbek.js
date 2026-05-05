const loginBox = document.getElementById("loginBox");
const registerBox = document.getElementById("registerBox");
const dashboardBox = document.getElementById("dashboardBox");

const loginBtn = document.getElementById("loginBtn");
const registerBtn = document.getElementById("registerBtn");
const logoutBtn = document.getElementById("logoutBtn");

const goRegister = document.getElementById("goRegister");
const goLogin = document.getElementById("goLogin");

function showLogin() {
  loginBox.classList.remove("hidden");
  registerBox.classList.add("hidden");
  dashboardBox.classList.add("hidden");
}

function showRegister() {
  loginBox.classList.add("hidden");
  registerBox.classList.remove("hidden");
  dashboardBox.classList.add("hidden");
}

function showDashboard(user) {
  loginBox.classList.add("hidden");
  registerBox.classList.add("hidden");
  dashboardBox.classList.remove("hidden");
  document.getElementById("userInfo").textContent = "Email: " + user;
}

registerBtn.addEventListener("click", () => {
  const user = document.getElementById("regUser").value;
  const pass = document.getElementById("regPass").value;
  const msg = document.getElementById("regMsg");

  if (!user || !pass) {
    msg.textContent = "Maydonlarni to‘ldiring ❗";
    msg.style.color = "red";
    return;
  }

  localStorage.setItem("user", user);
  localStorage.setItem("pass", pass);

  msg.textContent = "Account yaratildi ✅";
  msg.style.color = "green";

  setTimeout(showLogin, 1000);
});

loginBtn.addEventListener("click", () => {
  const user = document.getElementById("loginUser").value;
  const pass = document.getElementById("loginPass").value;
  const msg = document.getElementById("loginMsg");

  const savedUser = localStorage.getItem("user");
  const savedPass = localStorage.getItem("pass");

  if (!savedUser) {
    msg.textContent = "Avval ro‘yxatdan o‘ting ❗";
    msg.style.color = "red";
    return;
  }

  if (user === savedUser && pass === savedPass) {
    localStorage.setItem("isLoggedIn", "true");
    showDashboard(user);
  } else {
    msg.textContent = "Login yoki parol noto‘g‘ri ❌";
    msg.style.color = "red";
  }
});

logoutBtn.addEventListener("click", () => {
  localStorage.removeItem("isLoggedIn");
  showLogin();
});

goRegister.addEventListener("click", showRegister);
goLogin.addEventListener("click", showLogin);

window.addEventListener("load", () => {
  if (localStorage.getItem("isLoggedIn") === "true") {
    const user = localStorage.getItem("user");
    showDashboard(user);
  }
});