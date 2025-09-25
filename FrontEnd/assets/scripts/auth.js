import { validerEmail, validerPassword } from "./validators.js";
import { postAuthApi } from "./api.js";


/**
 * Afficher message d'erreur mauvaise auth
 * @param {*} message 
 */
export function postMessageError(message) {

    let spanErreurMessage = document.getElementById("erreur-message");

    if (!spanErreurMessage) {
        let zone = document.getElementById("login-form");
        spanErreurMessage = document.createElement("span");
        spanErreurMessage.id = "erreur-message";

        zone.appendChild(spanErreurMessage);
    }
    
    spanErreurMessage.innerText = message;
};


/**
 * Récupère et valide les valeurs du formulaire
 * @param {Object} authValue
 * @returns {Object|undefined} Objet {email, password} si OK, sinon undefined
 */
export function getForm(credentials) {
    try {
        const emailInput = document.getElementById("email");
        const passInput = document.getElementById("password");

        if (!emailInput || !passInput) {
            throw new Error("Champs du formulaire introuvables.");
        }

        const email = emailInput.value.trim();
        const password = passInput.value.trim();

        postMessageError(""); // efface un éventuel message précédent
        validerEmail(email);
        validerPassword(password);

        // On remplit l'objet fourni (ou on peut en créer un nouveau)
        credentials.email = email;
        credentials.password = password;
        
        return credentials;

    } catch (erreur) {
        postMessageError(erreur.message || "Une erreur est survenue.");
        return undefined;
    }
}


/**
 * Fonction principale de gestion de l'authentification
 * @returns 
 */
export function handleLoginSubmit() {
    const form = document.querySelector('form');

    // Vérification si formulaire existe
    if (!form) {
        console.error("Formulaire non trouvé dans le DOM.");
        return;
    }

    const credentials = { email: "", password: "" };

    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        let authCredentials = getForm(credentials);

        if (!authCredentials) {
            // La validation a échoué, on ne va pas plus loin.
            return;
        }

        // À partir d’ici, authObject.email et authObject.password sont valides.
        console.log("Email OK:", authCredentials.email);
        console.log("Password OK (masqué):", "*".repeat(authCredentials.password.length));

        try {
            const r = await postAuthApi(credentials);

            if (r && r.token) {
                sessionStorage.setItem("token", r.token);
                console.log("Token saved !");
                window.location.href = "../index.html";
            } else {
                throw new Error("Identifiants incorrect !")
            }

        } catch (error) {
            postMessageError(error.message);
        }
    });
}


/**
 * 
 * @returns True or false if token == null
 */
function isAuthentificated() {
    return Boolean(sessionStorage.getItem("token"));
}

export const isLoggedIn = isAuthentificated();

/**
 * 
 * @param {*} isLoggedIn 
 */
export function handleLogout(isLoggedIn) {
    const btnLogout = document.querySelector(".login-btn");

    btnLogout.addEventListener("click", async(e) => {
        if(isLoggedIn) {
            sessionStorage.removeItem("token");    
        } else {
            window.location.href = "../index.html";
        };
    })


}