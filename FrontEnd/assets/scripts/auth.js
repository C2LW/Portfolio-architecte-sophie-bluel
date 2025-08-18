/**
 * Validation de l'adresse e-mail
 * @param {string} email
 * @throws {Error}
 */
function validerEmail(email) {
    // Regex simple + bornes + insensible à la casse
    const mailRegex = /^[a-z0-9._-]+@[a-z0-9._-]+\.[a-z0-9._-]+$/i;
    if (!mailRegex.test(String(email).trim())) {
        throw new Error("L'adresse e-mail n'est pas valide.");
    }
}



/**
 * Fonction validation du mot de passe
 * @param {string} password
 * @throws {error} ""
 */
function validerPassword(password) {
    const pass = String(password);
    const hasMinLen = pass.length >= 6;
    const hasLetter = /[A-Za-z]/.test(pass);
    const hasDigit = /\d/.test(pass);

    if (!(hasMinLen && hasLetter && hasDigit)) {
        throw new Error("Mot de passe invalide (6+ caractères, 1 lettre et 1 chiffre).");
    }
};



/**
 * Afficher message d'erreur mauvaise auth
 * @param {*} message 
 */
function postMessageError(message) {

    let spanErreurMessage = document.getElementById("erreurMessage");

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
function getForm(credentials) {
    try {
        const emailInput = document.getElementById("email");
        const passInput = document.getElementById("password");

        if (!emailInput || !passInput) {
            throw new Error("Champs du formulaire introuvables.");
        }

        const email = emailInput.value.trim();
        const password = passInput.value.trim();

        validerEmail(email);
        validerPassword(password);

        postMessageError(""); // efface un éventuel message précédent

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
 * Fonction POST pour accès token authentification
 * @param {*} credentials 
 * @returns {JSON}
 */
async function postAuthApi(credentials) {
    const url = "http://localhost:5678/api/users/login";

    try {
        const body = JSON.stringify(credentials);
        const request = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: body
        }
        const response = await fetch(url, request);

        if (!response.ok) {
            if (response.status === 404) {
                throw new Error("Utilisateurs non trouvé : ${response.status} ");
                console.log(response.status);
            } else if (response.status === 401) {
                throw new Error("Utilisateur non autorisé : ${response.status}");
            } else {
                throw new Error("Echec d'accès au serveur de API : ${response.status}");
            }
        }

        const responseJSON = await response.json();
        return responseJSON;

    } catch (error) {
        console.error("Erreur API postAuthApi :", error.message);
        return null;

    }
}


/**
 * Fonction principale de gestion de l'authentification
 * @returns 
 */
function auth() {
    const form = document.querySelector('form');

    // Vérification si formulaire existe
    if (!form) {
        console.warn("Formulaire non trouvé dans le DOM.");
        return;
    }

    const credentials = { email: "", password: "" };

    form.addEventListener("submit", async (event) => {
        event.preventDefault();

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
                localStorage.setItem("token", r.token);
                console.log("Token saved !");
                window.location.href = "index.html";
            } else {
                throw new Error("Identifiants incorrect !")
            }

        } catch (error) {
            postMessageError(error.message);
        }
    });
};


// Init script
auth();