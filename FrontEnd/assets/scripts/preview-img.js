import { qSel } from "./modal.js";

/**
 * Function to read image file to charge image preview
 * @param {*} e 
 */
export function previewImg(e) {
    const input = e.currentTarget;
    const img = qSel(".preview-img");

    console.log(input.files);

    if(input.files && input.files[0]) {
        const reader = new FileReader();

        reader.onload = function (e) {
            img.src = e.target.result;
        }

        reader.readAsDataURL(input.files[0]);
    }
}