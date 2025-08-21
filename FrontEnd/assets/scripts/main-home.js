import { getWorksData } from "./api.js";
import { createdGallery, getCatsFromData, createFilterBtn, btnFilter } from "./gallery.js";

// Initialisation
(async function init() {
    const data = await getWorksData();   // <- on attend la Promise
    createdGallery(data);
    const categoriesData = getCatsFromData(data);
    createFilterBtn(categoriesData);
    btnFilter(data);
})();