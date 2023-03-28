
class Card {
  static _template = document.querySelector('.card-template').content;

  constructor (data,handleOpenPopup){
    this._link = data.link;
    this._name = data.name;
    this._alt = data.name;
    this._handleOpenPopup = handleOpenPopup;
  }
  //Создаем карточки
generateCard (){
  this._viev = Card._template.cloneNode(true).children[0];
  this._viev.querySelector('.element__title').textContent = this._name
  this._viev.querySelector('.element__photo').src = this._link
  this._viev.querySelector('.element__photo').alt = this._name
  this._setEventListners(this._viev);
  return this._viev;
}
handleOpenPopup() {
  const popupOpenZoomPhoto = document.querySelector('.popup_type_photo')
  const popupZoomImg = document.querySelector('.popup__photo-zoom')
  const popupZoomImgCopyright = document.querySelector('.popup__copyright')
  popupZoomImg.src = this._link;
  popupZoomImgCopyright.textContent = this._name;
  popupOpenZoomPhoto.classList.add('popup_opened');
}

//Слушатели
_setEventListners(cardElement){
  const buttonTrash = cardElement.querySelector('.element__trash');
  buttonTrash.addEventListener ('click', ()=>{
    this._handleButtonTrash(cardElement);
  })

  const cardLike = cardElement.querySelector('.element__like');
  cardLike.addEventListener('click',()=>{
    this._handleCardLike(cardLike);
  });
  const imgOpenPopup = cardElement.querySelector('.element__photo')
  imgOpenPopup.addEventListener('click', () => {
    this.handleOpenPopup(cardElement);
  });
}

//Подключение лайка
_handleCardLike(cardLike){
cardLike.classList.toggle('element__like_activ');
}

//Удаление карточки
_handleButtonTrash(cardElement){
cardElement.remove();
}
}
export default Card;
