// @todo: Вывести карточки на страницу
const cardsContainer = document.querySelector('.places__list');
const cardTemplate = document.querySelector('#card-template').content;

initialCards.forEach(cardData => {
  const cardElement = createCard(cardData, deleteCard);
  addCard(cardElement, cardsContainer);
})

function createCard(cardData, deleteCard) {
  const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
  const cardImage = cardElement.querySelector('.card__image');
  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardElement.querySelector('.card__title').textContent = cardData.name;

  cardElement.querySelector('.card__delete-button').addEventListener('click', deleteCard);

  return cardElement;
}

function addCard(cardElement, cardsContainer) {
  cardsContainer.append(cardElement);
}

function deleteCard(evt) {
  evt.target.closest('.places__item').remove();
}