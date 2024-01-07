import { checkResponse } from "./utils";
import { addLike, deleteCard } from "./api";

export function createCard(cardData, { deleteCard, addLike, openImagePopup }, currentUserId) {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
  const cardImage = cardElement.querySelector('.card__image');
  const likeButton = cardElement.querySelector('.card__like-button');
  const deleteButton = cardElement.querySelector('.card__delete-button');
  const isLiked = likeButton.classList.contains('card__like-button_is-active');

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
    if (cardData._id) {
      handleCardDeletion(cardData, deleteCard, cardElement);
    } else {
      console.error('Отсутствует свойство _id в объекте cardData');
    }
  });

  if (cardData.likes && cardData.likes.some(like => like._id === currentUserId)) {
    likeButton.classList.add('card__like-button_is-active');
  }

  likeButton.addEventListener('click', () => {
    if (cardData._id) {
      handleLikeClick(likeButton, cardData._id, isLiked, currentUserId);
    } else {
      console.error('Отсутствует свойство _id в объекте cardData');
    }
  });

  const likesCount = cardData.likes ? cardData.likes.length : 0;
  cardElement.querySelector('.card__like-count').textContent = likesCount;

  return cardElement;
}

function updateLikeState(likeButton, updatedIsLiked, likesCount) {
  likeButton.classList.toggle('card__like-button_is-active', updatedIsLiked);
  const likeCountElement = likeButton.closest('.places__item').querySelector('.card__like-count');
  likeCountElement.textContent = likesCount;
}

function handleCardDeletion(cardData, deleteCard, cardElement) {
  deleteCard(cardData._id)
    .then(() => {
      cardElement.remove();
    })
    .catch((error) => {
      // Обработка ошибки при удалении карточки
      console.error('Ошибка при удалении карточки:', error);
    });
}

function handleLikeClick(likeButton, cardId, isLiked, currentUserId) {
  addLike(likeButton, cardId)
    .then(updatedCardData => {
      const updatedIsLiked = updatedCardData.likes.some(like => like._id === currentUserId);
      const likesCount = updatedCardData.likes.length;
      updateLikeState(likeButton, updatedIsLiked, likesCount);
    })
    .catch(error => {
      console.error('Ошибка при обновлении лайка:', error);
    });
}