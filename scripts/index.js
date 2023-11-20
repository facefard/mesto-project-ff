// @todo: Вывести карточки на страницу
const cardsContainer = document.querySelector('.places__list');
const cardTemplate = document.querySelector('#card-template').content;


for (let i = 0; i < initialCards.length; i++) {
  const cardElement = createCard(i);
  addCard(cardElement, cardsContainer);
}

function createCard(i) {
  const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
  cardElement.querySelector('.card__image').src = initialCards[i].link;
  cardElement.querySelector('.card__image').alt = initialCards[i].name;
  cardElement.querySelector('.card__title').textContent = initialCards[i].name;


  
  // @todo: Функция удаления карточки
  cardElement.querySelector('.card__delete-button').addEventListener('click', deleteCard);

  function deleteCard() {
    const cardToRemove = cardElement.closest('.places__item');
    if (cardToRemove) {
      cardToRemove.remove();
    }
  }

  return cardElement;
}

function addCard(cardElement, cardsContainer) {
  cardsContainer.append(cardElement );
} 