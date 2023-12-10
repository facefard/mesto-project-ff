export function createCard(cardData, deleteCard, addLike, openImagePopup) {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
  const cardImage = cardElement.querySelector('.card__image');
  const likeButton = cardElement.querySelector('.card__like-button');

  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;

  cardImage.addEventListener('click', () => openImagePopup(cardData.link, cardData.name));

  cardElement.querySelector('.card__title').textContent = cardData.name;

  cardElement.querySelector('.card__delete-button').addEventListener('click', deleteCard);

  likeButton.addEventListener('click', () => addLike(likeButton));

  return cardElement;
}

export function addCard(cardElement, cardsContainer) {
  cardsContainer.append(cardElement);
}

export function deleteCard(evt) {
  const cardItem = evt.target.closest('.places__item');
  if (cardItem) {
    cardItem.remove();
  } else {
    console.error('Unable to find the parent card element.');
  }
}

export function addLike(likeButton) {
  likeButton.classList.toggle('card__like-button_is-active');
}