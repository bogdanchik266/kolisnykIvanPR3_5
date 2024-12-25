document.addEventListener("DOMContentLoaded", () => {
    const buttonAuth = document.querySelector(".button-auth");
    const buttonOut = document.querySelector(".button-out");
    const userName = document.querySelector(".user-name");
    const modalAuth = document.querySelector(".modal-auth");
    const closeAuth = document.querySelector(".close-auth");
    const logInForm = document.querySelector("#logInForm");
    const loginInput = document.querySelector("#login");
    const passwordInput = document.querySelector("#password"); 
    const body = document.body;

   
    const storedLogin = localStorage.getItem("login");
    if (storedLogin) {
        userName.textContent = storedLogin;
        buttonAuth.style.display = "none";
        buttonOut.style.display = "inline-block";
    }


    buttonAuth.addEventListener("click", () => {
        modalAuth.classList.add("show");
        body.style.overflow = "hidden"; 

     
        loginInput.classList.remove("error");
        passwordInput.classList.remove("error");
    });

   
    closeAuth.addEventListener("click", () => {
        modalAuth.classList.remove("show");
        body.style.overflow = ""; 
    });

  
    window.addEventListener("click", (event) => {
        if (event.target === modalAuth) {
            modalAuth.classList.remove("show");
            body.style.overflow = ""; 
        }
    });


    logInForm.addEventListener("submit", (event) => {
        event.preventDefault();
        const login = loginInput.value.trim();
        const password = passwordInput.value.trim();

        if (!login) {
            loginInput.classList.add("error");
        } else {
            loginInput.classList.remove("error");
        }

        if (!password) {
            passwordInput.classList.add("error");
        } else {
            passwordInput.classList.remove("error");
        }

        if (!login || !password) {
            return;
        }

        loginInput.classList.remove("error");
        passwordInput.classList.remove("error");

        localStorage.setItem("login", login);
        userName.textContent = login;
        modalAuth.classList.remove("show");
        body.style.overflow = ""; 
        buttonAuth.style.display = "none";
        buttonOut.style.display = "inline-block";
    });

  
    buttonOut.addEventListener("click", () => {
        localStorage.removeItem("login");
        userName.textContent = "";
        buttonAuth.style.display = "inline-block";
        buttonOut.style.display = "none";
    });
});
