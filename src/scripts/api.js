import { renderInitialCards } from ".";
import { closePopup } from "./modal";
import { clearValidation } from "./validation";
import { checkResponse } from "./utils";

const token = '1eebc460-8f14-44d3-8f3a-287aa4f24719'; // Replace with your group identifier
const cohortId = 'wff-cohort-3'; // Replace with your token

const config = {
  baseUrl: 'https://nomoreparties.co/v1/wff-cohort-3',
  headers: {
    authorization: '1eebc460-8f14-44d3-8f3a-287aa4f24719',
    'Content-Type': 'application/json',
  },
};

const apiUrlUser = `${config.baseUrl}/users/me`;
const apiUrlCards = `${config.baseUrl}/cards`;

export const fetchData = (url, token) => {
  return fetch(url, {
    headers: config.headers
  })
  .then(checkResponse)
};

export const updateProfileInfo = (name, about) => {
  const editProfileForm = document.forms['edit-profile'];
  const updateUrl = `${config.baseUrl}/users/me`;
  const editProfilePopup = document.querySelector('.popup_type_edit');
  const saveButton = editProfileForm.querySelector('.popup__button');

  fetch(updateUrl, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      about: about
    })
  })
  .then(checkResponse)
  .then(() => {
    closePopup(editProfilePopup);
    saveButton.textContent = 'Сохранить';
  })
};

export function updateAvatar(newAvatarUrl) {
  const avatarEditForm = document.forms['avatar-edit'];
  const avatarImage = document.querySelector('.profile__image');
  const updateAvatarUrl = `${config.baseUrl}/users/me/avatar`;
  const saveButton = avatarEditForm.querySelector('.popup__button');

  fetch(updateAvatarUrl, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      avatar: newAvatarUrl,
    }),
  })
  .then(checkResponse)
    .then(updatedUserInfo => {
      // Обновление информации на странице
      avatarImage.style.backgroundImage = `url('${updatedUserInfo.avatar}')`;
      saveButton.textContent = 'Сохранить';
    })  
}

export const clearCards = () => {
  const cardsContainer = document.querySelector('.places__list');
  while (cardsContainer.firstChild) {
    cardsContainer.removeChild(cardsContainer.firstChild);
  }
};

export const addNewCardToServer = ({ name, link }) => {
  const newCardPopup = document.querySelector('.popup_type_new-card');
  const saveButton = newCardForm.querySelector('.popup__button');
  const addCardUrl = `${config.baseUrl}/cards`;

  fetch(addCardUrl, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      link: link,
    })
  })
  .then(checkResponse)
    .then(newCardData => {
      // Обработка ответа от сервера при необходимости
      console.log('Новая карточка добавлена:', newCardData);
      

      // Обновление информации на странице после добавления карточки
      fetchData(apiUrlCards, token)
        .then(cardsData => {
          clearCards();
          renderInitialCards(cardsData);
        });
      
      // Возврат текста кнопки к исходному значению
      saveButton.textContent = 'Сохранить';
      
      closePopup(newCardPopup);
      newCardForm.reset();
      clearValidation(newCardForm, {
        formSelector: '.popup',
        inputSelector: '.popup__input',
        submitButtonSelector: '.popup__button',
        inactiveButtonClass: 'button_inactive',
        inputErrorClass: 'popup__input_type_error',
        errorClass: 'popup__input-error_active'
      });
    })
};

export function deleteCard(cardId) {
  const token = '1eebc460-8f14-44d3-8f3a-287aa4f24719';
  const cohortId = 'wff-cohort-3';
  const deleteCardUrl = `https://nomoreparties.co/v1/${cohortId}/cards/${cardId}`;

  fetch(deleteCardUrl, {
    method: 'DELETE',
    headers: {
      authorization: token,
    },
  })
  .then(checkResponse)
    .then(deletedCardData => {
      // Если нужно обработать ответ от сервера, можно сделать это здесь
      console.log('Карточка удалена:', deletedCardData);
    })
    .catch(error => console.error(error));
}

