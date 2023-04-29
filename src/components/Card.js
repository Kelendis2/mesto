export default class Card {
  constructor (data,templateSelector,handleCardClick,handleTrashClick, handleToggleLike,userId){
    this._link = data.link;
    this._name = data.name;
    this._alt = data.name;
    this.likes = data.likes;
    this._likesCounter = data.likes.length;
    this.cardId = data._id;
    this._userId = userId;
    this._ownerId = data.owner._id;
    this._handleCardClick = handleCardClick;
    this._templateSelector = templateSelector;
    this._handleTrashClick = handleTrashClick;
    this._handleToggleLike =  handleToggleLike;
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
  //Находим лайки
  this._counterLikes = this._element.querySelector('.element__like-quantity');
  this._counterLikes.textContent = this._likesCounter;

  //Устанавливаем слушатель
  this._setEventListners();

  // Установка активного лайка с сервера
  if (this.isLiked(this.likes)) {
    this._likeButton.classList.add('element__like_activ');
  }

  //Проверка пользователя для кнопки корзины
  if(this._ownerId !== this._userId) {
    this._buttonTrash.remove();
  }

  //Возвращаем готовый элемент
  return this._element;
}
isLiked(likes) {
  return likes.some((like) => {
    return like._id === this._userId;
  })
}
toggleLike({ likes }) {
  this.likes = likes;
  this._likeButton.classList.toggle('element__like_activ');
  this._counterLikes.textContent = likes.length;

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
  this._handleToggleLike(this);
});
this._cardImage.addEventListener('click', () => {
  this._handleOpenPopup(this);
});
};
  };
