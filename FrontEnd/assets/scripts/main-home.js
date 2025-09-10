import { getWorksData, getCatsData } from "./api.js";
import { createdGallery, getCatsFromData, createFilterBtn, btnFilter } from "./gallery.js";
import { enableAdminPage } from "./admin-page.js";
import { handleLogout, isLoggedIn } from "./auth.js";
import { addCatsForm, mainModal } from "./modal.js";

// Initialisation
(async function init() {
    const works = await getWorksData();
    const cats = await getCatsData();

    createdGallery(works, ".gallery");

    const categoriesData = getCatsFromData(cats);
    createFilterBtn(categoriesData);
    btnFilter(works);
    addCatsForm(categoriesData);

    enableAdminPage(isLoggedIn);
    handleLogout(isLoggedIn);
    
    mainModal();
    createdGallery(works, ".modal-gallery");
})();