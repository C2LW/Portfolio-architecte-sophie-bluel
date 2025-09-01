import {} from "./auth.js";

export function enableAdminPage(isLoggedIn){
    const element = document.querySelector(".admin-banner");

    if (isLoggedIn) {
        element.style.display = "block";
    } else {
        element.style.display = "none";
    };
}