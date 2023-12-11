export function handleEscape(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_is-opened');
    if (openedPopup) {
      closePopup(openedPopup);
    }
  }
}

export function openPopup(modal) {
  modal.classList.add('popup_is-animated');
  setTimeout(() => {
    modal.classList.add('popup_is-opened');
  }, 1); 
  modal.addEventListener('click', closeModalOverlay);
  document.addEventListener('keydown', handleEscape);
}

export function closePopup(modal) {
  modal.classList.remove('popup_is-opened');
  modal.classList.add('popup_is-animated');
  document.removeEventListener('keydown', handleEscape);
  const overlay = modal;
  overlay.removeEventListener('click', closeModalOverlay);
}

export function closeModalOverlay(evt) {
  const overlay = evt.currentTarget;
  const isOverlay = evt.target === overlay;

  if (isOverlay) {
    closePopup(overlay);
  }
}