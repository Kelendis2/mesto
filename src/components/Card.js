export default class Card {
  constructor (data,templateSelector,handleCardClick,handleTrashClick){
    this._link = data.link;
    this._name = data.name;
    this._alt = data.name;
    this._likes = data.likes;
    this.cardId = data._id;
    this._userId = data.userId;
    this._ownerId = data.ownerId;
    this._handleCardClick = handleCardClick;
    this._templateSelector = templateSelector;
    this._handleTrashClick = handleTrashClick;
  }
//Поиск и клонирование темплейта
  _getTemplate() {
    return this._templateSelector
      .content
      .cloneNode(true).children[0];
  }
//Метод генерации карточки
generateCard (){
  this._element = this._getTemplate();
  //Находим фото и записываем значения
  this._cardImage = this._element.querySelector('.element__photo');
  this._cardImage.src =  this._link;
  this._cardImage.alt  = this._name;
  //Находим подпись к фото и прописываем значение
  this._title = this._element.querySelector('.element__title');
  this._title.textContent = this._name;
  //Находим кнопки
  this._buttonTrash = this._element.querySelector('.element__trash');
  this._likeButton = this._element.querySelector('.element__like');
  //Устанавливаем слушатель
  this._setEventListners(this._element);
  //Устанавливаем счетчик
  this._setLikes();
  //Проверка пользователя
  if(this._ownerId !== this._userId) {
    this._buttonTrash.remove();
  }

  //Возвращаем готовый элемент
  return this._element;
}
//Подключение лайка
_handleButtonLike(){
  this._likeButton.classList.toggle('element__like_activ');
  };

// Счетчик лайков
_setLikes(){
  const likeCountElement = this._element.querySelector('.element__like-quantity')
  likeCountElement.textContent = this._likes.length;
}

//Удаление карточки
removeCard(){
    this._element.remove();
    this._element = null;
  }
  _handleOpenPopup() {
    this._handleCardClick(this._name, this._link);
  }
//Слушатели
_setEventListners() {
  this._buttonTrash.addEventListener ('click', ()=>{
  this._handleTrashClick();
});

this._likeButton.addEventListener('click',()=>{
  this._handleButtonLike();
});
this._cardImage.addEventListener('click', () => {
  this._handleOpenPopup(this._element);
});
};
  };
