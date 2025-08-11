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

// Construction de la galerie
function createGallery(projects) {
    const container = document.querySelector(".gallery");
    if (!container) return;

    container.innerHTML = ""; // reset
    const frag = document.createDocumentFragment();

    projects.forEach(value => {
        const figure = document.createElement("figure");
        figure.dataset.id = value.id;

        const img = document.createElement("img");
        img.src = value.imageUrl;
        img.alt = value.title || "";

        const caption = document.createElement("figcaption");
        caption.textContent = value.title || "";

        figure.appendChild(img);
        figure.appendChild(caption);
        frag.appendChild(figure);
    });

    container.appendChild(frag);
}

// Initialisation
(async function init() {
    const data = await getWorksData();   // <- on attend la Promise
    createGallery(data);
})();