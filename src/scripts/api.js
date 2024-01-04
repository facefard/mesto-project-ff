import { renderInitialCards } from ".";
import { closePopup } from "./modal";
import { clearValidation } from "./validation";
import { checkResponse } from "./utils";

const config = {
  baseUrl: 'https://nomoreparties.co/v1/wff-cohort-3',
  headers: {
    authorization: '1eebc460-8f14-44d3-8f3a-287aa4f24719',
    'Content-Type': 'application/json',
  },
};

export const fetchData = (url, token) => {
  return fetch(url, {
    headers: config.headers
  })
  .then(checkResponse)
};

export const updateProfileInfo = (name, about) => {
  const updateUrl = `${config.baseUrl}/users/me`;

  return fetch(updateUrl, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      about: about
    })
  })
  .then(checkResponse)
};

export function updateAvatar(newAvatarUrl) {
  const updateAvatarUrl = `${config.baseUrl}/users/me/avatar`;

  return fetch(updateAvatarUrl, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      avatar: newAvatarUrl,
    }),
  })
  .then(checkResponse) 
}

export const clearCards = () => {
  const cardsContainer = document.querySelector('.places__list');
  while (cardsContainer.firstChild) {
    cardsContainer.removeChild(cardsContainer.firstChild);
  }
};

export const addNewCardToServer = ({ name, link }) => {
  const addCardUrl = `${config.baseUrl}/cards`;

  return fetch(addCardUrl, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      link: link,
    })
  })
  .then(checkResponse)
};

export function deleteCard(cardId) {
  const deleteCardUrl = `${config.baseUrl}/cards/${cardId}`;

  return fetch(deleteCardUrl, {
    method: 'DELETE',
    headers: config.headers
  })
  .then(checkResponse)
}

export function addLike(likeButton, cardId) {
  const isLiked = likeButton.classList.contains('card__like-button_is-active');
  const method = isLiked ? 'DELETE' : 'PUT';
  const likeCardUrl = `${config.baseUrl}/cards/likes/${cardId}`;

  fetch(likeCardUrl, {
    method: method,
    headers: config.headers
  })
  .then(checkResponse)
  .then(updatedCardData => {
    const likesCount = updatedCardData.likes.length;
    updateLikeState(likeButton, isLiked, likesCount);
  })
}

function updateLikeState(likeButton, isLiked, likesCount) {
  likeButton.classList.toggle('card__like-button_is-active', !isLiked);
  const likeCountElement = likeButton.closest('.places__item').querySelector('.card__like-count');
  likeCountElement.textContent = likesCount;
}