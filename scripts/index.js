// @todo: Вывести карточки на страницу
const cardcontainer = document.querySelector('.places__list');
for (let i = 0; i < initialCards.length; i++) {
  function addCard() {
    const cardTemplate = document.querySelector('#card-template').content;
    const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);

    cardElement.querySelector('.card__image').src = initialCards[i].link;
    cardElement.querySelector('.card__title').textContent = initialCards[i].name;

    // @todo: Функция удаления карточки
    cardElement.querySelector('.card__delete-button').addEventListener('click', () => {
      const cardIndex = initialCards;

      if (cardIndex !== i) {
        initialCards.splice(cardIndex, 1);
      }

      cardElement.remove();
    });

    cardcontainer.append(cardElement);
  }

  addCard();
}