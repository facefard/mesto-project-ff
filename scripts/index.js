// @todo: Вывести карточки на страницу
const cardsContainer = document.querySelector('.places__list');
const cardTemplate = document.querySelector('#card-template').content;
const cardData = initialCards;

for (let cardDataz = 0; cardDataz < initialCards.length; cardDataz++) {
  const cardElement = createCard(cardDataz);
  addCard(cardElement, cardsContainer);
}

function createCard(cardDataz) {
  const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
  cardElement.querySelector('.card__image').src = cardData[cardDataz].link;
  cardElement.querySelector('.card__image').alt = cardData[cardDataz].name;
  cardElement.querySelector('.card__title').textContent = cardData[cardDataz].name;

  cardElement.querySelector('.card__delete-button').addEventListener('click', deleteCard);

  return cardElement;
}

function addCard(cardElement, cardsContainer) {
  cardsContainer.append(cardElement );
} 

function deleteCard(evt) {
  evt.target.closest('.places__item').remove();
}