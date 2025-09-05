let modal = null;

function openModal(e) {
  e.preventDefault();

  // Le lien/bouton qui a déclenché l’événement
  const trigger = e.currentTarget; // plus fiable que e.target
  const selector = trigger.getAttribute("href"); // ex: "#modal-1"
  const target = document.querySelector(selector);
  if (!target) return; // sécurité

  // Affiche la modale
  target.style.display = null;
  target.setAttribute("aria-hidden", "false");
  target.setAttribute("aria-modal", "true");
  modal = target;

  // Ferme en cliquant sur le fond gris (mais pas sur le panneau)
  modal.addEventListener("click", onOverlayClick);

    console.log(modal);
  // Bouton X
  const closeBtn = modal.querySelector(".js-close-modal");
  console.log(closeBtn);
  if (closeBtn) closeBtn.addEventListener("click", closeModal);
}

function closeModal(e) {
  if (e) e.preventDefault();
  if (modal === null) return;

  modal.style.display = "none";
  modal.setAttribute("aria-hidden", "true");
  modal.removeAttribute("aria-modal");

  // Nettoyage des écouteurs
  modal.removeEventListener("click", onOverlayClick);
  const closeBtn = modal.querySelector(".js-modal-close");
  if (closeBtn) closeBtn.removeEventListener("click", closeModal);

  modal = null;
}

// Fermer si clic sur l’overlay (en dehors du .modal-wrapper)
function onOverlayClick(e) {
  const panel = e.target.closest(".modal-wrapper");
  if (!panel) {
    closeModal(e);
  }
}

export function mainModal() {
  document.querySelectorAll(".js-modal").forEach((a) => {
    a.addEventListener("click", openModal);
  });
}