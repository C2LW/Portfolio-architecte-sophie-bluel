import { qSel } from "./modal.js";

/**
 * Function to read image file to charge image preview
 * @param {*} e 
 */
export function previewImg(e) {
    const input = e.currentTarget;
    const img = qSel(".preview-img");

    const formLabel = qSel(".btn-secondary");
    const formHint = qSel(".upload-hint");
    const formPreview = qSel(".upload-preview");

    console.log(input.files);

    if(input.files && input.files[0]) {
        const reader = new FileReader();

        reader.onload = function (e) {
            img.src = e.target.result;
            formLabel.classList.add("disable");
            formHint.classList.add("disable");
            formPreview.classList.add("enable");
        }

        reader.readAsDataURL(input.files[0]);
    }
}