
const API_BASE = "http://localhost:5678/api"

/**
 * Function get works on API
 * @returns works
 */
export async function getWorksData() {
    try {
        const r = await fetch(`${API_BASE}/works`);
        if (!r.ok) throw new Error(`r status: ${r.status}`);

        const works = await r.json();
        console.log(works);
        return works;

    } catch (error) {
        console.error("Erreur API:", error);
    }
}


/**
 * Fonction POST pour accès token authentification
 * @param {*} credentials 
 * @returns {JSON}
 */
export async function postAuthApi(credentials) {

    try {
        const body = JSON.stringify(credentials);
        const request = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: body
        }
        const r = await fetch(`${API_BASE}/users/login`, request);

        if (!r.ok) {
            if (r.status === 404) {
                throw new Error(`Utilisateurs non trouvé : ${r.status} `);
                console.log(r.status);
            } else if (r.status === 401) {
                throw new Error(`Utilisateur non autorisé : ${r.status}`);
            } else {
                throw new Error(`Echec d'accès au serveur de API : ${r.status}`);
            }
        }

        const rJSON = await r.json();
        return rJSON;

    } catch (error) {
        console.error("Erreur API postAuthApi :", error.message);
        return null;

    }
}