
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
        // console.log(works);
        return works;

    } catch (error) {
        console.error("Erreur API:", error);
    }
}

/**
 * Function get works on API
 * @returns cats
 */
export async function getCatsData() {
    try {
        const r = await fetch(`${API_BASE}/categories`);
        if (!r.ok) throw new Error(`r status: ${r.status}`);

        const cats = await r.json();
        // console.log(cats);
        return cats;

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

/**
 * Function to delete works
 * @param {*} id 
 */
export async function deleteWorksData(id) {
    const token = localStorage.getItem("token");

    const worksId = id;
    const request = {
        method: "DELETE",
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
        }
    };

    try {
        const r = await fetch(`${API_BASE}/works/${worksId}`, request);
    } catch (err) {
        if (err === "401") console.log("Unauthorized to delete works")
        console.log(err);
    }
}

/**
 * Function to post new works on API
 * @param {*} file 
 * @param {*} title 
 * @param {*} categoryId 
 * @returns 
 * file, title, categoryId)
 */
export async function postWork(form) {
    const url = "http://localhost:5678/api/works";

    // Récupération du token (ex: stocké en localStorage après login)
    const token = localStorage.getItem("token");

    // Création du FormData
    const formData = new FormData(form);

    // console.log(formData);

    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${token}`
            },
            body: formData
        });

        if (!response.ok) {
            throw new Error(`Erreur API: ${response.status}`);
        }

        const result = await response.json();
        console.log("Enregistrement réussi :", result);
        return result;

    } catch (err) {
        console.error("Erreur lors de l’upload :", err);
        return null;
    }

}