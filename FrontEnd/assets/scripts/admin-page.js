import {} from "./auth.js";

export function enableAdminPage(isLoggedIn){
    const element = document.querySelector(".admin-banner");
    const btnFilter = document.querySelector(".container-filter");
    const editBtn = document.querySelector(".edit-mode");
    const loginBtn = document.querySelector(".login-btn");
    

    if (isLoggedIn) {
        element.style.display = "block";
        btnFilter.style.display = "none";
        editBtn.style.display = "flex";

        loginBtn.innerText = "Logout";

    } else {
        element.style.display = "none";
        btnFilter.style.display = "flex";
        editBtn.style.display = "none";
    };
    console.log(isLoggedIn);
}

