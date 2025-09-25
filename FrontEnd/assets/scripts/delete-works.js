import { deleteWorksData, getWorksData } from "./api.js";
import { createdGallery } from "./gallery.js";
import { getBtTrash } from "./modal.js";

export async function deleteWorks(e) {
    console.log(e.currentTarget);
    const input = e.currentTarget;
    const works = input.parentNode;
    const worksId = works.dataset.id;

    let validDelete = confirm("Êtes vous sur de vouloir supprimer le projet ?");
    if (validDelete) {
        deleteWorksData(worksId);
        const getWorks = await getWorksData();
        createdGallery(getWorks, ".modal-gallery", true);
        createdGallery(getWorks, ".gallery", false);
        getBtTrash();
    }

}