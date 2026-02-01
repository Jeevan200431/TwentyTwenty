const API = "/api";

function register() {
  fetch(`${API}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: document.getElementById("regEmail").value,
      password: document.getElementById("regPassword").value
    })
  })
  .then(res => res.json())
  .then(data => {
    document.getElementById("message").innerText = data.message;
  })
  .catch(err => {
    document.getElementById("message").innerText = "Error: " + err.message;
  });
}

function login() {
  fetch(`${API}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: document.getElementById("loginEmail").value,
      password: document.getElementById("loginPassword").value
    })
  })
  .then(res => res.json())
  .then(data => {
    if (data.token) {
      localStorage.setItem("token", data.token);
      localStorage.setItem("email", data.email);
      window.location.href = "/portfolio.html";   
    } else {
      document.getElementById("message").innerText = data.message;
    }
  })
  .catch(err => {
    document.getElementById("message").innerText = "Error: " + err.message;
  });
}

function logout() {
  localStorage.clear();
  window.location.href = "/index.html";            
}

if (window.location.pathname.includes("portfolio")) {
  if (!localStorage.getItem("token")) {
    window.location.href = "/index.html";          
  } else {
    document.getElementById("userEmail").innerText =
      "Logged in as: " + localStorage.getItem("email");
  }
}