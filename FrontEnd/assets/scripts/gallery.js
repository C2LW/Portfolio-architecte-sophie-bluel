import { modalIsOpened } from "./modal.js";

/**
 * Function created gallery from works
 * @param {*} works 
 * @returns 
 */
export function createdGallery(works, target, modal) {
    const container = document.querySelector(target);
    if (!container) return;

    container.innerHTML = ""; // reset de la page

    works.forEach(value => {
        const figure = document.createElement("figure");
        figure.dataset.id = value.id;

        const img = document.createElement("img");
        img.src = value.imageUrl;
        img.alt = value.title || "";
        img.classList.add("gallery-img")

        const caption = document.createElement("figcaption");
        caption.textContent = value.title || "";

        const btnDelete = document.createElement("button");
        btnDelete.type = "button";
        btnDelete.classList.add("trash-btn");
        btnDelete.innerHTML = `
                <img src="./assets/icons/trash.png" alt="Boutton poubelle" class="trash-img">
            `;

        if (modal) {
            container.appendChild(figure);
            figure.appendChild(img);
            figure.appendChild(btnDelete);

        } else {
            container.appendChild(figure);
            figure.appendChild(img);
            figure.appendChild(caption);
        }
    });
}

/**
 * 
 * @param {*} cats 
 * @returns 
 */
export function getCatsFromData(cats) {
    const categories = [];

    cats.forEach(cat => {
        categories.push({
            id: cat.id,
            name: cat.name
        })
    })

    // console.log(categories);
    return new Set(categories);
}

/**
 * Function created button filters to categories
 * @param {*} cats 
 * @returns 
 */
export function createFilterBtn(cats) {
    const containerBtn = document.querySelector(".container-filter");
    if (!containerBtn) return; // sécurité si l'élément n'existe pas

    containerBtn.innerHTML = ""; // reset de la page

    // Crée un bouton "Tous" pour réafficher l'ensemble des projets.
    const btnAll = document.createElement("button"); // nouvelle balise <button>
    btnAll.type = "button";                          // type de bouton standard
    btnAll.textContent = "Tous";                     // texte affiché sur le bouton
    btnAll.className = "filter-btn is-active";       // classes CSS (is-active = visuel actif par défaut)
    btnAll.dataset.catId = "all";                    // on stocke "all" pour reconnaître ce bouton
    containerBtn.appendChild(btnAll);                // on ajoute le bouton dans le conteneur

    cats.forEach(value => {
        const btn = document.createElement("button");
        btn.type = "button";                         // type bouton
        btn.textContent = value.name;                // texte du bouton = nom de la catégorie
        btn.className = "filter-btn";                // classe CSS
        btn.dataset.catId = String(value.id);        // on stocke l'id de la catégorie dans data-cat-id
        containerBtn.appendChild(btn);               // on ajoute le bouton dans le conteneur
    })
}

/**
 * Function button filter
 * @param {*} cats 
 * @returns 
 */
export function btnFilter(cats) {
    const containerBtn = document.querySelector(".container-filter");
    if (!containerBtn) return;

    // Ajoute un écouteur d'événement sur tout le conteneur
    containerBtn.addEventListener("click", (event) => {
        const btn = event.target.closest(".filter-btn"); // Vérifie si on a cliqué sur un bouton
        if (!btn) return;

        // Retire la classe active de tous les boutons
        containerBtn.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("is-active"));

        // Ajoute la classe active au bouton cliqué
        btn.classList.add("is-active");

        const catId = btn.dataset.catId;

        // Filtre les projets
        if (catId === "all") {
            createdGallery(cats, ".gallery"); // Affiche tout
        } else {
            const filtered = cats.filter(w => w.category && String(w.category.id) === catId);
            console.log(filtered);
            createdGallery(filtered, ".gallery"); // Affiche seulement ceux de la catégorie
        }
    });
}
