export default class Popup {
  constructor (popupSelector){
    this._popup = document.querySelector(popupSelector);
    this._buttonClose = this._popup.querySelector('.popup__close-button');
    this._buttonSubmit = this._popup.querySelector('.form__button-save');
  }
  // Открытие попапа
  open (){
    this._popup.classList.add('popup_opened');
    document.addEventListener('keydown', this._handleEscClose);
  };
  //Закрытие попапа
  close (){
    this._popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscClose);
  };
  //Закрытие по Еsс
  _handleEscClose = (evt) => {
    if (evt.key === 'Escape') {
      this.close();
  }
};
//Закрытие по оверлей
_handleCloseOverlay (evt){
  if (evt.target.classList.contains('popup_opened')) {
    this.close();
}
};
  // Метод отображения загрузки
  renderLoading(isLoading, loadingText) {
    if (!this._buttonSubmit) return;
    if (isLoading) {
      this.defaultText = this._buttonSubmit.textContent;
      this._buttonSubmit.textContent = loadingText;
    } else {
      this._buttonSubmit.textContent = this.defaultText;
    }
  }
//Слушатели
setEventListeners() {
  this._buttonClose.addEventListener('click', () => {
    this.close();
  });
  this._popup.addEventListener('mousedown',this._handleCloseOverlay.bind(this));
  };

}


