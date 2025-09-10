import { getWorksData, getCatsData } from "./api.js";
import { createdGallery, getCatsFromData, createFilterBtn, btnFilter } from "./gallery.js";
import { enableAdminPage } from "./admin-page.js";
import { handleLogout, isLoggedIn } from "./auth.js";
import { addCatsForm, mainModal } from "./modal.js";

    export const worksData = await getWorksData();
    export const catsData = await getCatsData();

// Initialisation
(async function init() {

    createdGallery(worksData, ".gallery");

    const categoriesData = getCatsFromData(catsData);
    createFilterBtn(categoriesData);
    btnFilter(worksData);
    addCatsForm(categoriesData);

    enableAdminPage(isLoggedIn);
    handleLogout(isLoggedIn);
    
    mainModal();
    createdGallery(worksData, ".modal-gallery");
})();