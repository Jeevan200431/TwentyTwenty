const API = "/api";

function register() {
  fetch(`${API}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: regEmail.value,
      password: regPassword.value
    })
  })
  .then(res => res.json())
  .then(data => {
    message.innerText = data.message;
  });
}

function login() {
  fetch(`${API}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: loginEmail.value,
      password: loginPassword.value
    })
  })
  .then(res => res.json())
  .then(data => {
    if (data.token) {
      localStorage.setItem("token", data.token);
      localStorage.setItem("email", data.email);
      window.location.href = "/portfolio.html";   
    } else {
      message.innerText = data.message;
    }
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
