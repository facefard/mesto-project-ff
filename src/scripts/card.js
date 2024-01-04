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
      deleteCard(cardData._id)
        .then(() => {
          cardElement.remove();
        })
        .catch((error) => {
          // Обработка ошибки при удалении карточки
          console.error('Ошибка при удалении карточки:', error);
        });
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



