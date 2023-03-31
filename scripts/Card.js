export default class Card {
  constructor (data,templateSelector,handleCardClick){
    this._link = data.link;
    this._name = data.name;
    this._alt = data.name;
    this._handleCardClick = handleCardClick;
    this._templateSelector = templateSelector;
  }
//Поиск и клонирование темплейта
  _getTemplate() {
    const cardElement = this._templateSelector
      .content
      .cloneNode(true).children[0];

    return cardElement;
  }
//Метод генерации карточки
generateCard (){
  this.element = this._getTemplate();
  //Находим фото и записываем значения
  this._cardImage = this.element.querySelector('.element__photo');
  this._cardImage.src =  this._link;
  this._cardImage.alt  = this._name;
  //Находим подпись к фото и прописываем значение
  this._title = this.element.querySelector('.element__title');
  this._title.textContent = this._name;
  //Находим кнопки
  this._buttonTrash = this.element.querySelector('.element__trash');
  this._likeButton = this.element.querySelector('.element__like');
  //Устанавливаем слушатель
  this._setEventListners(this.element);
  //Возвращаем готовый элемент
  return this.element;
}
//Подключение лайка
_handleButtonLike(){
  this._likeButton.classList.toggle('element__like_activ');
  };
//Удаление карточки
  _handleButtonTrash(){
    this.element.remove();
  }
//Слушатели
_setEventListners() {
  this._buttonTrash.addEventListener ('click', ()=>{
  this._handleButtonTrash();
});

this._likeButton.addEventListener('click',()=>{
  this._handleButtonLike();
});
this._cardImage.addEventListener('click', () => {
  this._handleCardClick(this.element);
});
};
  };
