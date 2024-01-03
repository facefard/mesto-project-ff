import { checkResponse } from "./utils";

export function createCard(cardData, { deleteCard, addLike, openImagePopup }, currentUserId) {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
  const cardImage = cardElement.querySelector('.card__image');
  const likeButton = cardElement.querySelector('.card__like-button');
  const deleteButton = cardElement.querySelector('.card__delete-button');

  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;

  cardImage.addEventListener('click', () => openImagePopup(cardData.link, cardData.name));

  cardElement.querySelector('.card__title').textContent = cardData.name;

  // Добавьте проверку наличия свойства _id
  if (cardData.owner && cardData.owner._id === currentUserId) {
    deleteButton.style.display = 'block';
  } else {
    deleteButton.style.display = 'none';
  }

  deleteButton.addEventListener('click', () => {
      // Добавьте проверку наличия свойства _id перед его использованием
      if (cardData._id) {
        deleteCard(cardData._id);
        cardElement.remove();
      } else {
        console.error('Отсутствует свойство _id в объекте cardData');
      }
  });

  likeButton.addEventListener('click', () => {
    if (cardData._id) {
      addLike(likeButton, cardData._id);
    } else {
      console.error('Отсутствует свойство _id в объекте cardData');
    }
  });

  const likesCount = cardData.likes ? cardData.likes.length : 0;
  cardElement.querySelector('.card__like-count').textContent = likesCount;

  return cardElement;
}

export function addCard(cardElement, cardsContainer) {
  cardsContainer.append(cardElement);
}




export function addLike(likeButton, cardId) {
  const token = '1eebc460-8f14-44d3-8f3a-287aa4f24719';
  const cohortId = 'wff-cohort-3';
  const isLiked = likeButton.classList.contains('card__like-button_is-active');
  const method = isLiked ? 'DELETE' : 'PUT';
  const likeCardUrl = `https://nomoreparties.co/v1/${cohortId}/cards/likes/${cardId}`;

  fetch(likeCardUrl, {
    method: method,
    headers: {
      authorization: token,
    },
  })
  .then(checkResponse)
    .then(updatedCardData => {
      const likesCount = updatedCardData.likes.length;
      updateLikeState(likeButton, isLiked, likesCount);
    })
    .catch(error => console.error(error));
}

function updateLikeState(likeButton, isLiked, likesCount) {
  likeButton.classList.toggle('card__like-button_is-active', !isLiked);
  const likeCountElement = likeButton.closest('.places__item').querySelector('.card__like-count');
  likeCountElement.textContent = likesCount;
}