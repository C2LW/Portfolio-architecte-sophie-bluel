import { postWork } from "./api.js";


export function getNewWorks() {
    document.getElementById("add-photo-view").addEventListener("submit", async (e) => {
        e.preventDefault();

        const form = document.getElementById("add-photo-view");
        
/*         const file = document.getElementById("photo").files[0];
        const title = document.getElementById("title").value.trim();
        const category = document.getElementById("category").value; */

/*         if (!file || !title || !category) {
            alert("Veuillez remplir tous les champs !");
            return;file, title, category
        } */

        const result = await postWork(form);

        if (result) {
            alert("Travail ajouté avec succès !");
            // Ici tu peux rafraîchir ta galerie
        }
    });
}