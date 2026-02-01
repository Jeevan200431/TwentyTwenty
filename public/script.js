const API = "/api";

// Show/Hide forms
function showLogin() {
  document.getElementById("registerSection").classList.add("hidden");
  document.getElementById("loginSection").classList.remove("hidden");
  document.getElementById("message").innerText = "";
}

function showRegister() {
  document.getElementById("loginSection").classList.add("hidden");
  document.getElementById("registerSection").classList.remove("hidden");
  document.getElementById("message").innerText = "";
}

// Register function
function register(event) {
  event.preventDefault();
  
  const name = document.getElementById("regName").value;
  const email = document.getElementById("regEmail").value;
  const password = document.getElementById("regPassword").value;

  fetch(`${API}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, password })
  })
  .then(res => res.json())
  .then(data => {
    const messageEl = document.getElementById("message");
    messageEl.innerText = data.message;
    
    if (data.message.includes("successful")) {
      messageEl.className = "message success";
      document.getElementById("registerForm").reset();
      setTimeout(() => showLogin(), 1500);
    } else {
      messageEl.className = "message error";
    }
  })
  .catch(err => {
    document.getElementById("message").innerText = "Error: " + err.message;
    document.getElementById("message").className = "message error";
  });
}

// Login function
function login(event) {
  event.preventDefault();
  
  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;

  fetch(`${API}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password })
  })
  .then(res => res.json())
  .then(data => {
    if (data.token) {
      localStorage.setItem("token", data.token);
      localStorage.setItem("name", data.name);
      localStorage.setItem("email", data.email);
      window.location.href = "/portfolio.html";
    } else {
      const messageEl = document.getElementById("message");
      messageEl.innerText = data.message;
      messageEl.className = "message error";
    }
  })
  .catch(err => {
    document.getElementById("message").innerText = "Error: " + err.message;
    document.getElementById("message").className = "message error";
  });
}

// Logout function
function logout() {
  localStorage.clear();
  window.location.href = "/index.html";
}

// Portfolio page authentication check
if (window.location.pathname.includes("portfolio")) {
  if (!localStorage.getItem("token")) {
    window.location.href = "/index.html";
  } else {
    document.getElementById("userName").innerText = localStorage.getItem("name");
    document.getElementById("userEmail").innerText = localStorage.getItem("email");
  }
}