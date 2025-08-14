// Fonction de Récupération des projets
async function getWorksData() {
    const urlWorks = "http://localhost:5678/api/works";

    try {
        const result = await fetch(urlWorks);
        if (!result.ok) throw new Error(`Response status: ${result.status}`);

        const project = await result.json();
        console.log(project);
        return project;

    } catch (error) {
        console.error("Erreur API:", error);
    }
}

// Fonction de récupération des catégories depuis les données "works"
function getCategoriesFromData(works) {
    const categories = []; // Tableau final { id: XX, name: XXXX }

    // Boucle sur tous les projets
    for (let i = 0; i < works.length; i++) {
        const data = works[i]; // Projet courant

        // Si pas de catégorie ou pas d'id, on ignore
        if (!data.category || data.category.id == null) continue;

        // Vérifie si la catégorie existe déjà dans notre tableau
        let alreadyExists = false;
        for (let j = 0; j < categories.length; j++) {
            if (categories[j].id === data.category.id) {
                alreadyExists = true;
                break;
            }
        }

        // Si elle n'existe pas encore, on l'ajoute
        if (!alreadyExists) {
            categories.push({
                id: data.category.id,
                name: data.category.name
            });
        }
    }

    console.log(categories); // Debug
    return categories; // Retourne la liste unique des catégories
}



// Construction de la galerie
function createGallery(projects) {
    const container = document.querySelector(".gallery");
    if (!container) return;

    container.innerHTML = ""; // reset de la page

    projects.forEach(value => {
        const figure = document.createElement("figure");
        figure.dataset.id = value.id;

        const img = document.createElement("img");
        img.src = value.imageUrl;
        img.alt = value.title || "";

        const caption = document.createElement("figcaption");
        caption.textContent = value.title || "";

        container.appendChild(figure);
        figure.appendChild(img);
        figure.appendChild(caption);
    });
}

// Construction des bouton de filtration
function createFilterBtn(categories) {
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

    categories.forEach(value => {
        const btn = document.createElement("button");
        btn.type = "button";                         // type bouton
        btn.textContent = value.name;                // texte du bouton = nom de la catégorie
        btn.className = "filter-btn";                // classe CSS
        btn.dataset.catId = String(value.id);        // on stocke l'id de la catégorie dans data-cat-id
        containerBtn.appendChild(btn);               // on ajoute le bouton dans le conteneur
    })
}

// Fonction de gestion du filtrage au clic
function btnFilter(works) {
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
            createGallery(works); // Affiche tout
        } else {
            const filtered = works.filter(w => w.category && String(w.category.id) === catId);
            createGallery(filtered); // Affiche seulement ceux de la catégorie
        }
    });
}


// Initialisation
(async function init() {
    const data = await getWorksData();   // <- on attend la Promise
    createGallery(data);
    const categoriesData = getCategoriesFromData(data);
    createFilterBtn(categoriesData);
    btnFilter(data);
})();