import '../pages/index.css'
import { createCard, addCard } from './card';
import { handleEscape, openPopup, closePopup, closeModalOverlay } from './modal';
import { enableValidation, clearValidation } from './validation';
import { fetchData, updateProfileInfo, updateAvatar, addNewCardToServer, clearCards, deleteCard, addLike} from './api';
import { checkResponse } from './utils';

const cardsContainer = document.querySelector('.places__list');
const editProfilePopup = document.querySelector('.popup_type_edit');
const newCardPopup = document.querySelector('.popup_type_new-card');
const imagePopup = document.querySelector('.popup_type_image');
const openEditProfilePopupButton = document.querySelector('.profile__edit-button');
const openNewCardPopupButton = document.querySelector('.profile__add-button');
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
const closeButtonEditAvatar = avatarEditPopup.querySelector('.popup__close');
const saveButton = editProfileForm.querySelector('.popup__button');
const avatarImage = document.querySelector('.profile__image');
const closeButtons = document.querySelectorAll('.popup__close');
let userId;

// с окончанием `s` нужно обязательно, так как много кнопок
closeButtons.forEach((button) => {
  // находим 1 раз ближайший к крестику попап 
  const popup = button.closest('.popup');
  // устанавливаем обработчик закрытия на крестик
  button.addEventListener('click', () => closePopup(popup));
});


openEditProfilePopupButton.addEventListener('click', () => {
  openPopup(editProfilePopup);
  clearValidation(editProfileForm, {
    formSelector: '.popup',
    contentSelector: '.popup__content',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'button_inactive',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__input-error_active'
  });

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

  updateProfileInfo(newName, newDescription)
    .then(updatedUserInfo => {
      // Обновление профиля немедленно после успешного выполнения запроса
      updateUserInfo(updatedUserInfo);
      closePopup(editProfilePopup);
      saveButton.textContent = 'Сохранить';
    })
    .catch(error => {
      console.error('Произошла ошибка при обновлении профиля:', error);
      // Обработка ошибки, если необходимо
    });
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
  addNewCardToServer({ name: newPlaceName, link: newLink })
    .then(newCardData => {
      // Обработка ответа от сервера при необходимости
      console.log('Новая карточка добавлена:', newCardData);
      

      // Обновление информации на странице после добавления карточки
      fetchData(apiUrlCards, token)
        .then(cardsData => {
          clearCards() //Если я просто добавлю карточку в DOM я ведь не смогу сразу удалить карточку, для удаления карточки придется перезагрузить сайт
          renderInitialCards(cardsData);
        });
      
      // Возврат текста кнопки к исходному значению
      saveButton.textContent = 'Сохранить';
      
      closePopup(newCardPopup);
      newCardForm.reset();
      clearValidation(newCardForm, {
        formSelector: '.popup',
        contentSelector: '.popup__content',
        inputSelector: '.popup__input',
        submitButtonSelector: '.popup__button',
        inactiveButtonClass: 'button_inactive',
        inputErrorClass: 'popup__input_type_error',
        errorClass: 'popup__input-error_active'
      });
    })
    .catch(error => {
      console.error('Произошла ошибка при добавлении новой карточки:', error);
      // Обработка ошибки, если необходимо
    });
};




function openImagePopup(imageSrc, imageAlt) {
  imagePopupImage.src = imageSrc;
  imagePopupImage.alt = imageAlt;
  imagePopupCaption.textContent = imageAlt;
  openPopup(imagePopup);
}


enableValidation({
  formSelector: '.popup',
  contentSelector: '.popup__content',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'button_inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
}); 


const token = '1eebc460-8f14-44d3-8f3a-287aa4f24719';
const cohortId = 'wff-cohort-3';

const apiUrlUser = `https://nomoreparties.co/v1/${cohortId}/users/me`;
const apiUrlCards = `https://nomoreparties.co/v1/${cohortId}/cards`;


Promise.all([fetchData(apiUrlUser, token), fetchData(apiUrlCards, token)])
  .then(([userData, cardsData]) => {
    userId = userData._id;
    updateUserInfo(userData);
    renderInitialCards(cardsData);
    console.log(userData, cardsData);
  })
  .catch(error => {
    console.error('Произошла ошибка:', error);
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
    const cardElement = createCard(cardData, { deleteCard, addLike, openImagePopup }, userId);
    addCard(cardElement, cardsContainer);
  });
};

closeButtonEditAvatar.addEventListener('click', () => closePopup(avatarEditPopup))

avatarEditButton.addEventListener('click', () => openPopup(avatarEditPopup));

avatarEditForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const newAvatarUrl = avatarInput.value;

  // Изменение текста кнопки на "Сохранение..."
  const saveButton = avatarEditForm.querySelector('.popup__button');
  saveButton.textContent = 'Сохранение...';

  updateAvatar(newAvatarUrl)
    .then(updatedUserInfo => {
      // Обновление информации на странице
      avatarImage.style.backgroundImage = `url('${updatedUserInfo.avatar}')`;
      saveButton.textContent = 'Сохранить';
      closePopup(avatarEditPopup);
    }) 
    .catch(error => {
      console.error('Произошла ошибка при обновлении аватара:', error);
      // Обработка ошибки, если необходимо
    });
});

enableValidation(avatarEditForm);

newCardForm.addEventListener('submit', handleNewCardFormSubmit);