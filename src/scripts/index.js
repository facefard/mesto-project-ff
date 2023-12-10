import '../pages/index.css'
import { initialCards } from './cards';
import { createCard, deleteCard, addCard, addLike } from './card';
import { openModal, closeModal, closeModalOverlay } from './modal';

const cardsContainer = document.querySelector('.places__list');
const editProfilePopup = document.querySelector('.popup_type_edit');
const newCardPopup = document.querySelector('.popup_type_new-card');
const imagePopup = document.querySelector('.popup_type_image');
const openEditProfilePopupButton = document.querySelector('.profile__edit-button');
const openNewCardPopupButton = document.querySelector('.profile__add-button');
const closeButtonEditProfile = editProfilePopup.querySelector('.popup__close');
const closeButtonNewCard = newCardPopup.querySelector('.popup__close');
const closeButtonImagePopup = imagePopup.querySelector('.popup__close');
const editProfileForm = document.forms['edit-profile'];
const nameInput = editProfileForm.querySelector('.popup__input_type_name');
const descriptionInput = editProfileForm.querySelector('.popup__input_type_description');
const newCardForm = document.forms['new-place'];
const placeNameInput = newCardForm.querySelector('.popup__input_type_card-name');
const linkInput = newCardForm.querySelector('.popup__input_type_url');

initialCards.forEach(cardData => {
  const cardElement = createCard(cardData, deleteCard, addLike, openImagePopup);
  addCard(cardElement, cardsContainer);
});

function closePopupAndHandleChanges(popup) {
  closeModal(popup);
}

closeButtonEditProfile.addEventListener('click', () => closePopupAndHandleChanges(editProfilePopup));
closeButtonNewCard.addEventListener('click', () => closePopupAndHandleChanges(newCardPopup));
closeButtonImagePopup.addEventListener('click', () => closePopupAndHandleChanges(imagePopup));

function openPopup(popup) {
  openModal(popup);
}

function closePopup(popup) {
  closeModal(popup);
}

openEditProfilePopupButton.addEventListener('click', () => {
  openPopup(editProfilePopup);

  const currentName = document.querySelector('.profile__title').textContent;
  const currentDescription = document.querySelector('.profile__description').textContent;

  nameInput.value = currentName;
  descriptionInput.value = currentDescription;
});

openNewCardPopupButton.addEventListener('click', () => openModal(newCardPopup));

document.addEventListener('keydown', (evt) => {
  if (evt.key === 'Escape') {
    closePopup(editProfilePopup);
    closePopup(newCardPopup);
    closePopup(imagePopup);
  }
});

function handleEditProfileFormSubmit(evt) {
  evt.preventDefault();

  const newName = nameInput.value;
  const newDescription = descriptionInput.value;

  const profileName = document.querySelector('.profile__title');
  const profileDescription = document.querySelector('.profile__description');

  profileName.textContent = newName;
  profileDescription.textContent = newDescription;

  closePopup(editProfilePopup);
}

editProfileForm.addEventListener('submit', handleEditProfileFormSubmit);

function handleNewCardFormSubmit(evt) {
  evt.preventDefault();

  const newPlaceName = placeNameInput.value;
  const newLink = linkInput.value;

  const cardElement = createCard({ name: newPlaceName, link: newLink }, deleteCard, addLike, openImagePopup);

  cardsContainer.prepend(cardElement);

  closePopup(newCardPopup);

  newCardForm.reset();
}

function openImagePopup(imageSrc, imageAlt) {
  const imagePopup = document.querySelector('.popup_type_image');
  const imagePopupImage = imagePopup.querySelector('.popup__image');
  const imagePopupCaption = imagePopup.querySelector('.popup__caption');

  imagePopupImage.src = imageSrc;
  imagePopupImage.alt = imageAlt;
  imagePopupCaption.textContent = imageAlt;
  openPopup(imagePopup);
}

newCardForm.addEventListener('submit', handleNewCardFormSubmit);