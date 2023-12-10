export function openModal(modal) {
  modal.classList.add('popup_is-opened', 'popup_is-animated');
  modal.addEventListener('click', closeModalOverlay);
}

export function closeModal(modal) {
  modal.classList.remove('popup_is-opened');
  modal.classList.add('popup_is-animated');
}

export function closeModalOverlay(evt) {
  const overlay = evt.currentTarget;
  const isOverlay = evt.target === overlay;

  if (isOverlay) {
    closeModal(overlay);
    overlay.removeEventListener('click', closeModalOverlay);
  }
}