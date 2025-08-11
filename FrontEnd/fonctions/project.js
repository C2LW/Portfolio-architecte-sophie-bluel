// Fonction de Récupération des projets
async function getData() {
    const urlWorks = "http://localhost:5678/api/works";

    try {
        const res = await fetch(urlWorks);
        if (!res.ok) throw new Error(`Response status: ${res.status}`);
        
        const result = await res.json(); 
        console.log(result);
        return result;
        
    } catch (err) {
        console.error("Erreur API:", err);
        return []; // évite de crasher en aval
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
        img.src = value.imageUrl;          // <- clé correcte
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
    const data = await getData();   // <- on attend la Promise
    createGallery(data);
})();