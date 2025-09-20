import { getWorksData, postWork } from "./api.js";
import { createdGallery } from "./gallery.js";
import { btnAddWork, qSel } from "./modal.js";

let formSubmitBound = false;

async function onFormSubmit(e) {
  e.preventDefault();
  const form = e.currentTarget;

  const result = await postWork(form);
  if (result) {
    console.log("Travail ajouté avec succès !");

    const formLabel = qSel(".btn-secondary");
    const formHint = qSel(".upload-hint");
    const formPreview = qSel(".upload-preview");
    const imgPreview = qSel(".preview-img");

    formLabel.classList.remove("disable");
    formHint.classList.remove("disable");
    formPreview.classList.remove("enable");
    imgPreview.src = "./assets/icons/img.png";

    form.reset();

    const getWorks = await getWorksData();
    createdGallery(getWorks, ".gallery", false);
    createdGallery(getWorks, ".modal-gallery", true);
    btnAddWork.setAttribute("disabled", "");
  }
}

export function getNewWorks() {
  const form = document.getElementById("add-photo-view");
  if (!form || formSubmitBound) return;
  form.addEventListener("submit", onFormSubmit);
  formSubmitBound = true;
  
}