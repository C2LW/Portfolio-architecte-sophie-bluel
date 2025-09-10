import { deleteWorks } from "./delete-works.js";
import { previewImg } from "./preview-img.js";


let modal = null;
export let modalIsOpened = 0;

export function qSel(target) {
  return document.querySelector(target);
}

const modalWrapper = qSel(".modal-wrapper");
const btnBack = qSel(".btn-back");
const modaleFooter = qSel(".modal-footer");
const btnAdd = qSel(".modal-footer .btn-primary");
const modalTitle = qSel(".modal-title");




function toAddMode() {
  modalWrapper.classList.add("mode-add");
  modalWrapper.classList.remove("mode-gallery");
  btnBack.style.visibility = "visible";
  modaleFooter.style.display = "none";
  modalTitle.innerText = "Ajout photo";

  document.getElementById("photo").addEventListener("change", previewImg);
}

function toGalleryMode() {
  modalWrapper.classList.add("mode-gallery");
  modalWrapper.classList.remove("mode-add");
  btnBack.style.visibility = "hidden";
  modaleFooter.style.display = null;
  modalTitle.innerText = "Galerie photo";
}

export function addCatsForm(cats) {
  const formCats = document.getElementById("category");
  if (!formCats) return; // sécurité si l'élément n'existe pas

  console.log(formCats);

  formCats.innerHTML = ""; // reset de la page
  
  cats.forEach(value => {
    const catsForm = document.createElement("option");
    catsForm.textContent = value.name;                // texte du bouton = nom de la catégorie
    catsForm.dataset.catId = String(value.id);        // on stocke l'id de la catégorie dans data-cat-id
    formCats.appendChild(catsForm);               // on ajoute le bouton dans le conteneur
  })

}


/**
 * Function to opened modal
 * @param {*} e 
 * @returns 
 */
function openModal(e) {
  e.preventDefault();

  // Le lien/bouton qui a déclenché l’événement
  const trigger = e.currentTarget; // plus fiable que e.target
  const selector = trigger.getAttribute("href"); // ex: "#modal-1"
  const target = document.querySelector(selector);
  const btnTrash = document.querySelectorAll("figure button");
  if (!target) return; // sécurité

  // Affiche la modale
  target.classList.add("active");
  modal = target;

  // Ferme en cliquant sur le fond gris (mais pas sur le panneau)
  modal.addEventListener("click", onOverlayClick);

  // Gestion suppression au click du boutton du prjet à supprimer
  console.log(btnTrash);
  btnTrash.forEach(r => {
    r.addEventListener("click", deleteWorks);
  });


  // Gestion activation du mode add
  btnAdd.addEventListener("click", toAddMode);

  // Gestion activation du mode gallery
  btnBack.addEventListener("click", toGalleryMode);

  console.log(modal);
  // Bouton X
  const closeBtn = modal.querySelector(".js-modal-close");
  console.log(closeBtn);
  if (closeBtn) closeBtn.addEventListener("click", closeModal);
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

  modal = null;
  modalIsOpened = 0;
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


/**
 * Function mainModal to call on main-home.js
 */
export function mainModal() {
  document.querySelectorAll(".js-modal").forEach((a) => {
    a.addEventListener("click", openModal);
    modalIsOpened = 1;
  });
}


