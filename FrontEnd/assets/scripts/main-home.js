import { getWorksData, getCatsData } from "./api.js";
import { createdGallery, getCatsFromData, createFilterBtn, btnFilter } from "./gallery.js";
import { enableAdminPage } from "./admin-page.js";
import { handleLogout, isLoggedIn } from "./auth.js";
import { addCatsForm, openModal } from "./modal.js";


export const APIworksData = await getWorksData();   // GET works from API
export const APIcatsData = await getCatsData();     // GET categories from API


/**
 * Function initialisation to js code
 */
(async function init() {

    createdGallery(APIworksData, ".gallery", false);

    const categoriesData = getCatsFromData(APIcatsData);

    createFilterBtn(categoriesData);
    btnFilter(APIworksData);
    addCatsForm(categoriesData);

    /**
     * Admin to login auth
     */
    enableAdminPage(isLoggedIn);
    handleLogout(isLoggedIn);

    /**
     * Add event on button to open modal
     */
    document.querySelectorAll(".js-modal").forEach((a) => {
        a.addEventListener("click", openModal);
    });

    createdGallery(APIworksData, ".modal-gallery", true);

})();