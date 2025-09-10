import { deleteWorks } from "./delete-works.js";
import { getNewWorks } from "./new-works.js";
import { previewImg, validImage } from "./preview-img.js";


let modal = null;
export let modalIsOpened = 0;

export function qSel(target) {
  return document.querySelector(target);
}

const modalWrapper = qSel(".modal-wrapper");
const btnBack = qSel(".btn-back");
const modaleFooter = qSel(".modal-footer");
const btnAdd = qSel(".modal-footer .btn-primary");
const btnAddWork = qSel(".modal-container .modal-form .btn-primary")
const modalTitle = qSel(".modal-title");


function validFormAdd(e) {
  const worksTitle = qSel(".field-input");

  console.log(worksTitle.value);
  console.log(btnAddWork);

  if (worksTitle.value !== "" && validImage) {
    btnAddWork.removeAttribute("disabled");
  } else {
    btnAddWork.setAttribute("disabled", "");
  }
}

function toAddMode() {
  console.log("ToAddMode is launch");
  modalWrapper.classList.add("mode-add");
  modalWrapper.classList.remove("mode-gallery");
  btnBack.style.visibility = "visible";
  modaleFooter.style.display = "none";
  modalTitle.innerText = "Ajout photo";

  document.getElementById("photo").addEventListener("change", previewImg);

  document.getElementById("add-photo-view").addEventListener("input", validFormAdd);
  getNewWorks();

}

function toGalleryMode() {
  modalWrapper.classList.add("mode-gallery");
  modalWrapper.classList.remove("mode-add");
  btnBack.style.visibility = "hidden";
  modaleFooter.style.display = null;
  modalTitle.innerText = "Galerie photo";
  getBtTrash();
}

export function addCatsForm(cats) {
  const formCats = document.getElementById("category");
  if (!formCats) return; // sécurité si l'élément n'existe pas

  console.log(formCats);

  formCats.innerHTML = ""; // reset de la page

  cats.forEach(value => {
    const catsForm = document.createElement("option");
    catsForm.textContent = value.name;                // texte du bouton = nom de la catégorie
    catsForm.value = String(value.id);        // on stocke l'id de la catégorie dans data-cat-id
    formCats.appendChild(catsForm);               // on ajoute le bouton dans le conteneur
  })

}

/**
 * Function to opened modal
 * @param {*} e 
 * @returns 
 */
export function openModal(e) {
  e.preventDefault();

  const trigger = e.currentTarget;
  const selector = trigger.getAttribute("href");
  const target = document.querySelector(selector);

  if (!target) return; // sécurité

  // Affiche la modale
  target.classList.add("active");
  modal = target;

  // Bouton closed modal "X"
  const closeBtn = modal.querySelector(".js-modal-close");
  if (closeBtn) closeBtn.addEventListener("click", closeModal);

  // Ferme en cliquant sur le fond gris
  modal.addEventListener("click", onOverlayClick);

  // Gestion suppression au click du boutton du projet à supprimer
  getBtTrash();

  // Gestion activation du mode add
  btnAdd.removeEventListener("click", toAddMode);
  btnAdd.addEventListener("click", toAddMode);

  // Gestion activation du mode gallery
  btnBack.removeEventListener("click", toGalleryMode);
  btnBack.addEventListener("click", toGalleryMode);
}


/**
 * Function to button remove works
 */
export function getBtTrash() {
  const btnTrash = document.querySelectorAll("figure button");

  // Gestion suppression au click du boutton du prjet à supprimer
  btnTrash.forEach(r => {
    r.addEventListener("click", deleteWorks);
  });
}

/**
 * Function closed modal
 * @param {*} e 
 * @returns 
 */
function closeModal(e) {
  if (e) e.preventDefault();
  if (modal === null) return;

  modal.classList.remove("active");
  toGalleryMode();

  // Nettoyage des écouteurs
  modal.removeEventListener("click", onOverlayClick);
  const closeBtn = modal.querySelector(".js-modal-close");
  if (closeBtn) closeBtn.removeEventListener("click", closeModal);

  // Gestion activation du mode add
  btnAdd.removeEventListener("click", toAddMode);

  // Gestion activation du mode gallery
  btnBack.removeEventListener("click", toGalleryMode);

  modal = null;
}

/**
 * FOnction closed to click on overlay
 * @param {*} e 
 */
function onOverlayClick(e) {
  const panel = e.target.closest(".modal-wrapper");
  if (!panel) {
    closeModal(e);
  }
}



