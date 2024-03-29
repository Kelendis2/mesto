import Popup from "./Popup.js";

export default class PopupWithConfirmation extends Popup {
  constructor(popupSelector, { submitCallback }) {
    super(popupSelector);
    this._submitCallback = submitCallback;
    this._buttonSubmit = this._popup.querySelector('.form__button-save');
    this.defaultText = this._buttonSubmit.textContent;
  }

  // Открытие попапа с айди
  openConfirmation(card) {
    super.open();
    this.cardId = card.cardId;
    this.card = card;
    this.defaultText = this._buttonSubmit.textContent;
  }
      // Метод отображения загрузки
      renderLoading(isLoading, loadingText) {
        if (isLoading) {
          this._buttonSubmit.textContent = loadingText;
        } else {
          this._buttonSubmit.textContent = this.defaultText;

        }
      }

  // Слушатель
  setEventListeners() {
    super.setEventListeners();
    this._buttonSubmit.addEventListener('click', (evt) => {
      evt.preventDefault();
      this._submitCallback(this);
    });
  }
}
