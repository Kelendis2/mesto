const editButton = document.querySelector ('.profile__edit-button');
const popupProfile = document.querySelector ('.popup_type_profile');
const closeButtonProfilePopup = popupProfile.querySelector ('.popup__close-button_place_profile');
const closeButtonContentPopup = document.querySelector ('.popup__close-button_place_content');
const myName = document.querySelector('.profile__info-title');
const aboutPerson = document.querySelector('.profile__info-subtitle');
const myForm = document.querySelector('.form');
const formName = document.querySelector('.form__input_type_name');
const formAbout = document.querySelector('.form__input_type_about');
const addButton = document.querySelector ('.profile__add-button');
const popupContent = document.querySelector('.popup_type_content');
const itemListWrapper = document.querySelector('.element');
const addContentForm = document.querySelector('form_type_content');
const popupPhoto = document.querySelector('.popup_type_photo');
const closeButtonPhotoPopup = document.querySelector('.popup__close-button_place_photo');
const contentCards = document.querySelector ('.element');
const cardTemplate = document.querySelector ('.card-template');
const formContent = document.querySelector('.form__type_content');
const inputCardPhoto = document.querySelector('form__input_type_link');
const inputCardTitle = document.querySelector('form__input_type_title');
const openPopup = (popup) => {
  popup.classList.add ('popup_opened');
  formName.value = myName.textContent;
  formAbout.value = aboutPerson.textContent;
};
const closePopup = (popup) => {
  popup.classList.remove ('popup_opened');
};
const initialCards = [
  {
    title: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    title: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    title: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    title: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    title: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    title: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];
const togglelikeButton = (evt) =>  {
  evt.target.classList.toggle ('element__like_activ');
};
const handleTrash = (evt) =>{
  evt.target.closest('.element__item').remove();
  evt.preventDefault();
}
const addContent = (data) =>{
  const cardElement = cardTemplate.content.cloneNode(true);
  const cardPhoto = cardElement.querySelector ('.element__photo');
    cardPhoto.src = data.link;
    cardPhoto.alt = data.title;
    cardPhoto.addEventListener('click', (evt) =>{
    evt.preventDefault();
    const popupZoomImg = document.querySelector('.popup__photo-zoom')
    popupZoomImg.src = cardPhoto.src;
    const popupZoomImgCopyright = popupPhoto.querySelector('.popup__copyright');
    popupZoomImgCopyright.textContent = cardTitle.textContent;
    openPopup (popupPhoto)
    });
  const cardTitle = cardElement.querySelector ('.element__title');
    cardTitle.textContent = data.title;
  const buttonTrash = cardElement.querySelector ('.element__trash');
  buttonTrash.addEventListener ('click', handleTrash)
  const cardLike = cardElement.querySelector ('.element__like');
  cardLike.addEventListener ('click', togglelikeButton);
  return cardElement;
}
const renderCard = (element) =>{
  contentCards.prepend (addContent (element));
};
function handleMyFormSubmit(evt) {
  evt.preventDefault();
  myName.textContent = formName.value;
  aboutPerson.textContent = formAbout.value;
  closePopup (popupProfile);
};
formContent.addEventListener('submit', (evt) => {
  evt.preventDefault();
  renderCard ({
    title: evt.target.title.value,
    link: evt.target.link.value,
  })
  closePopup (popupContent);
  evt.target.link.value = '';
  evt.target.title.value = '';
})

initialCards.forEach((element) => {
  contentCards.append (addContent(element));
});
editButton.addEventListener ('click', () => openPopup (popupProfile));
closeButtonProfilePopup.addEventListener('click', () => closePopup (popupProfile));
addButton.addEventListener ('click',() =>  openPopup (popupContent));
closeButtonContentPopup.addEventListener('click',() =>  closePopup (popupContent));
closeButtonPhotoPopup.addEventListener('click',() =>  closePopup (popupPhoto));
myForm.addEventListener('submit', handleMyFormSubmit);













