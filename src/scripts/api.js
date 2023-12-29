import { renderInitialCards } from ".";
import { closePopup } from "./modal";
import { clearValidation } from "./validation";

const token = '1eebc460-8f14-44d3-8f3a-287aa4f24719'; // Replace with your group identifier
const cohortId = 'wff-cohort-3'; // Replace with your token

const apiUrlUser = `https://nomoreparties.co/v1/${cohortId}/users/me`;
const apiUrlCards = `https://nomoreparties.co/v1/${cohortId}/cards`;

export const fetchData = (url, token) => {
  return fetch(url, {
    headers: {
      authorization: `${token}`
    }
  })
    .then(response => {
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      return response.json();
    })
    .catch(error => console.error(error));
};

export const updateProfileInfo = (name, about) => {
  const updateUrl = `https://nomoreparties.co/v1/${cohortId}/users/me`;

  fetch(updateUrl, {
    method: 'PATCH',
    headers: {
      authorization: token,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: name,
      about: about
    })
  })
    .then(response => {
      if (!response.ok) {
        throw new Error(`Ошибка: ${response.status}`);
      }
      return response.json();
    })
    .then(updatedUserInfo => {
      // Обновление информации на странице
      updateUserInfo(updatedUserInfo);
    })
    .catch(error => console.error('Ошибка при обновлении профиля:', error));
};

export function updateAvatar(newAvatarUrl) {
  const avatarImage = document.querySelector('.profile__image');
  const updateAvatarUrl = `https://nomoreparties.co/v1/${cohortId}/users/me/avatar`;

  fetch(updateAvatarUrl, {
    method: 'PATCH',
    headers: {
      authorization: token,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      avatar: newAvatarUrl,
    }),
  })
    .then(response => {
      if (!response.ok) {
        throw new Error(`Ошибка: ${response.status}`);
      }
      return response.json();
    })
    .then(updatedUserInfo => {
      // Обновление информации на странице
      avatarImage.style.backgroundImage = `url('${updatedUserInfo.avatar}')`;
    })
    .catch(error => console.error(error));
}

export const clearCards = () => {
  const cardsContainer = document.querySelector('.places__list');
  while (cardsContainer.firstChild) {
    cardsContainer.removeChild(cardsContainer.firstChild);
  }
};

export const addNewCardToServer = ({ name, link }) => {
  const newCardPopup = document.querySelector('.popup_type_new-card');
  const newCardForm = document.forms['new-place'];
  const saveButton = newCardForm.querySelector('.popup__button');
  const addCardUrl = `https://nomoreparties.co/v1/${cohortId}/cards`;

  fetch(addCardUrl, {
    method: 'POST',
    headers: {
      authorization: token,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: name,
      link: link,
    })
  })
    .then(response => {
      if (!response.ok) {
        throw new Error(`Ошибка: ${response.status}`);
      }
      return response.json();
    })
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
      clearValidation(newCardForm);
    })
    .catch(error => {
      console.error(error);
      // Возврат текста кнопки к исходному значению в случае ошибки
      saveButton.textContent = 'Сохранить';
    });
};

