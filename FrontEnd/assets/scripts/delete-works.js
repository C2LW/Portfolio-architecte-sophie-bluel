import { deleteWorksData } from "./api.js";
import { createdGallery } from "./gallery.js";
import { worksData } from "./main-home.js";


export function deleteWorks(e) {
    const input = e.currentTarget;
    const works = input.parentNode;
    const worksId = works.dataset.id;

    deleteWorksData(worksId);


    // console.log(input);
    // console.log(works);
    // console.log(worksId);
}