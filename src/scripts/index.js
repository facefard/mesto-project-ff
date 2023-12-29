import '../pages/index.css'
import { createCard, deleteCard, addCard, addLike } from './card';
import { handleEscape, openPopup, closePopup, closeModalOverlay } from './modal';
import { enableValidation, clearValidation } from './validation';
import { fetchData, updateProfileInfo, updateAvatar, addNewCardToServer, clearCards} from './api';

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
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const imagePopupImage = imagePopup.querySelector('.popup__image');
const imagePopupCaption = imagePopup.querySelector('.popup__caption');
const avatarEditButton = document.querySelector('.profile__image');
const avatarEditPopup = document.querySelector('.popup_type_avatar-edit');
const avatarEditForm = document.forms['avatar-edit'];
const avatarInput = avatarEditForm.querySelector('.popup__input_type_avatar-url');
const closeButtonEditAvatar = avatarEditPopup.querySelector('.popup__close')


closeButtonEditProfile.addEventListener('click', () => closePopup(editProfilePopup));
closeButtonNewCard.addEventListener('click', () => closePopup(newCardPopup));
closeButtonImagePopup.addEventListener('click', () => closePopup(imagePopup));


openEditProfilePopupButton.addEventListener('click', () => {
  openPopup(editProfilePopup);
  clearValidation(editProfileForm);

  const currentName = profileTitle.textContent;
  const currentDescription = profileDescription.textContent;

  nameInput.value = currentName;
  descriptionInput.value = currentDescription;
});


openNewCardPopupButton.addEventListener('click', () => openPopup(newCardPopup));


function handleEditProfileFormSubmit(evt) {
  evt.preventDefault();

  const newName = nameInput.value;
  const newDescription = descriptionInput.value;

  // Изменение текста кнопки на "Сохранение..."
  const saveButton = editProfileForm.querySelector('.popup__button');
  saveButton.textContent = 'Сохранение...';

  profileTitle.textContent = newName;
  profileDescription.textContent = newDescription;

  closePopup(editProfilePopup);
  updateProfileInfo(newName, newDescription);
}


editProfileForm.addEventListener('submit', handleEditProfileFormSubmit);


const handleNewCardFormSubmit = (evt) => {
  evt.preventDefault();

  const newPlaceName = placeNameInput.value;
  const newLink = linkInput.value;

  // Изменение текста кнопки на "Сохранение..."
  const saveButton = newCardForm.querySelector('.popup__button');
  saveButton.textContent = 'Сохранение...';

  // Добавление новой карточки на сервер
  addNewCardToServer({ name: newPlaceName, link: newLink });
};


function openImagePopup(imageSrc, imageAlt) {
  imagePopupImage.src = imageSrc;
  imagePopupImage.alt = imageAlt;
  imagePopupCaption.textContent = imageAlt;
  openPopup(imagePopup);
}


enableValidation();


const token = '1eebc460-8f14-44d3-8f3a-287aa4f24719';
const cohortId = 'wff-cohort-3';

const apiUrlUser = `https://nomoreparties.co/v1/${cohortId}/users/me`;
const apiUrlCards = `https://nomoreparties.co/v1/${cohortId}/cards`;


Promise.all([fetchData(apiUrlUser, token), fetchData(apiUrlCards, token)])
  .then(([userData, cardsData]) => {
    updateUserInfo(userData);
    renderInitialCards(cardsData);
    console.log(userData, cardsData);
  });


const updateUserInfo = (userInfo) => {
  const profileImage = document.querySelector('.profile__image');

  profileTitle.textContent = userInfo.name;
  profileDescription.textContent = userInfo.about;
  profileImage.style.backgroundImage = `url('${userInfo.avatar}')`;
};


export const renderInitialCards = (cardsData) => {
  const cardsContainer = document.querySelector('.places__list');

  cardsData.forEach(cardData => {
    const currentUserId = '9623ac04fd0dea80401d1a0a';
    const cardElement = createCard(cardData, { deleteCard, addLike, openImagePopup }, currentUserId);
    addCard(cardElement, cardsContainer);
  });
};



fetchData(apiUrlUser, token)
  .then(userData => {
    updateUserInfo(userData);
  });

fetchData(apiUrlCards, token)
  .then(cardsData => {
    renderInitialCards(cardsData);
  });

closeButtonEditAvatar.addEventListener('click', () => closePopup(avatarEditPopup))

avatarEditButton.addEventListener('click', () => openPopup(avatarEditPopup));

avatarEditForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const newAvatarUrl = avatarInput.value;

  // Изменение текста кнопки на "Сохранение..."
  const saveButton = avatarEditForm.querySelector('.popup__button');
  saveButton.textContent = 'Сохранение...';

  updateAvatar(newAvatarUrl);
  closePopup(avatarEditPopup);
});

enableValidation(avatarEditForm);

newCardForm.addEventListener('submit', handleNewCardFormSubmit);