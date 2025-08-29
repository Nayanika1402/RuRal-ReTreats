
document.addEventListener("DOMContentLoaded", () => {
  const container = document.querySelector(".container");

  // Toggle buttons
  const toggleRegisterBtn = document.querySelector(".toggle-register-btn");
  const toggleLoginBtn = document.querySelector(".toggle-login-btn");

  if (toggleRegisterBtn)
    toggleRegisterBtn.addEventListener("click", () =>
      container.classList.add("active")
    );
  if (toggleLoginBtn)
    toggleLoginBtn.addEventListener("click", () =>
      container.classList.remove("active")
    );

  // FORM ELEMENTS
  const registerForm = document.getElementById("register-form");
  const loginForm = document.getElementById("login-form");

  const registerUsername = document.getElementById("register-username");
  const registerEmail = document.getElementById("register-email");
  const registerPassword = document.getElementById("register-password");

  const loginUsername = document.getElementById("login-username");
  const loginPassword = document.getElementById("login-password");

  // ===== VALIDATION HELPERS =====
  const setError = (el, msg) => {
    const box = el.parentElement;
    let span = box.querySelector(".error-message span");
    if (!span) {
      const errorEl = document.createElement("div");
      errorEl.className = "error-message";
      errorEl.innerHTML = `<span>${msg}</span>`;
      box.appendChild(errorEl);
    } else span.innerText = msg;
    box.classList.add("error");
    box.classList.remove("success");
  };

  const setSuccess = (el) => {
    const box = el.parentElement;
    let span = box.querySelector(".error-message span");
    if (span) span.innerText = "";
    box.classList.add("success");
    box.classList.remove("error");
  };

  const isValidEmail = (email) => {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };

  const validateRegister = () => {
    let valid = true;

    if (registerUsername.value.trim() === "") {
      setError(registerUsername, "Username is required");
      valid = false;
    } else setSuccess(registerUsername);
    if (registerEmail.value.trim() === "") {
      setError(registerEmail, "Email is required");
      valid = false;
    } else if (!isValidEmail(registerEmail.value.trim())) {
      setError(registerEmail, "Provide valid email");
      valid = false;
    } else setSuccess(registerEmail);
    if (registerPassword.value.trim() === "") {
      setError(registerPassword, "Password required");
      valid = false;
    } else if (registerPassword.value.trim().length < 8) {
      setError(registerPassword, "Password min 8 chars");
      valid = false;
    } else setSuccess(registerPassword);

    return valid;
  };

  // ===== REGISTER HANDLER =====
  if (registerForm) {
    registerForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      if (!validateRegister()) return;

      try {
        const res = await fetch("http://localhost:3000/api/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            username: registerUsername.value.trim(),
            email: registerEmail.value.trim(),
            password: registerPassword.value.trim(),
          }),
        });

        const data = await res.json();
        if (res.ok) {
          alert("Registration successful! Please login.");
          container.classList.remove("active");
        } else alert(data.message || "Registration failed");
      } catch (err) {
        console.error(err);
        alert("Cannot connect to server");
      }
    });
  }

  // ===== LOGIN HANDLER =====
  if (loginForm) {
    loginForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      try {
        const res = await fetch("http://localhost:3000/api/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            username: loginUsername.value.trim(),
            password: loginPassword.value.trim(),
          }),
        });

        const data = await res.json();
        if (res.ok) {
          localStorage.setItem("token", data.token);
          localStorage.setItem("username", loginUsername.value.trim());
          window.location.href = "index.html"; // redirect to home
        } else alert(data.message || "Login failed");
      } catch (err) {
        console.error(err);
        alert("Cannot connect to server");
      }

    });
  }
});
