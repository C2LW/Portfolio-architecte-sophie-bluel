import { qSel } from "./modal.js";
import { validFileSize, validFileType } from "./validators.js";


export let validImage = false;

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

    let inputFile = input.files[0];

    console.log(inputFile);

    if(validFileType(inputFile) && validFileSize(inputFile)) {
        const reader = new FileReader();

        validImage = true;

        reader.onload = function (e) {
            img.src = e.target.result;
            formLabel.classList.add("disable");
            formHint.classList.add("disable");
            formPreview.classList.add("enable");
        }

        reader.readAsDataURL(input.files[0]);
    } else {
        validImage = false;
        alert("Le type ou la taille du fichier n'est pas correct, veuillez réssayer.")
    }
}


4000000
1152922