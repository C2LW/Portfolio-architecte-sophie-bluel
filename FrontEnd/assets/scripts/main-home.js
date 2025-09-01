import { getWorksData, getCatsData } from "./api.js";
import { createdGallery, getCatsFromData, createFilterBtn, btnFilter } from "./gallery.js";
import { enableAdminPage } from "./admin-page.js";
import { isLoggedIn } from "./auth.js";

// Initialisation
(async function init() {
    const works = await getWorksData();
    const cats = await getCatsData(); 
    createdGallery(works);
    const categoriesData = getCatsFromData(cats);
    createFilterBtn(categoriesData);
    btnFilter(works);
    enableAdminPage(isLoggedIn);
})();