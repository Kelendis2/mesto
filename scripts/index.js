import Card from './Card.js'
import FormValidator from './FormValidator.js'

const buttonEditProfile = document.querySelector('.profile__edit-button');
const popupEditProfile = document.querySelector('.popup_type_profile');
const popupAddContentCard = document.querySelector('.popup_type_content');
const formEditProfile = document.querySelector('.form_type_profile');
const formEditNameProfile = document.querySelector('.form__input_type_name');
const formEditDescroptionProfile = document.querySelector('.form__input_type_about');
const formAddCard = document.querySelector('.form_type_content');
const userName = document.querySelector('.profile__info-title');
const userDescription = document.querySelector('.profile__info-subtitle');
const buttonAddContentCard = document.querySelector('.profile__add-button');
const popupOpenZoomPhoto = document.querySelector('.popup_type_photo');
const itemListWrapper = document.querySelector('.element');
const popups = document.querySelectorAll('.popup')
const cardTemplate = document.querySelector('.card-template');
const popupZoomImg = document.querySelector('.popup__photo-zoom');
const popupZoomImgCopyright = popupOpenZoomPhoto.querySelector('.popup__copyright');
const inputCardPhoto = document.querySelector('form__input_type_link');
const inputCardTitle = document.querySelector('form__input_type_title');


//открытие попапа
const openPopup = (popup) => {
	popup.classList.add('popup_opened');
  document.addEventListener('keydown', closeByEscBtn);
};
//Закрытие попапа
const closePopup = (popup) => {
	popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closeByEscBtn);
};
//Закрытие по оверлей
const closeByOverlay = (evt) => {
  if (evt.target.classList.contains('popup_opened')) {
    closePopup(evt.target);
  };
};
//закрытие по Esc
const closeByEscBtn = (evt) => {
  if (evt.key === 'Escape') {
    const activePopup = document.querySelector('.popup_opened');
    closePopup(activePopup);
  };
};
//Закрытие по оверлей для массива попапов
popups.forEach((popup) => {
  popup.addEventListener('mousedown', closeByOverlay);
});

//Изменение данных в профиле
function handleFormEditProfileSubmit(evt) {
	evt.preventDefault();
	userName.textContent = formEditNameProfile.value;
	userDescription.textContent = formEditDescroptionProfile.value;
	closePopup(popupEditProfile);
};


//Добавление карточки из формы
formAddCard.addEventListener('submit', (evt) => {
	evt.preventDefault();
	itemListWrapper.prepend(renderCard({
		name: evt.target.name.value,
		link: evt.target.link.value,
	}))
	closePopup(popupAddContentCard);
  evt.submitter.disabled = 'true';
  evt.submitter.classList.add(options.inactiveButtonClass);
  evt.target.reset();
});


//Создание карточки
const renderCard = (element) => {
  const cardElement = new Card (element,cardTemplate,handleCardClick);
  return cardElement.generateCard();
};
// Отрисовка карточек из массива
initialCards.forEach((element) => {
	itemListWrapper.append(renderCard(element,cardTemplate));
});
//Функция открытия попапа с фото
function handleCardClick(cardElement) {
  popupZoomImg.src = cardElement.querySelector('.element__photo').src
  popupZoomImg.alt = cardElement.querySelector('.element__title').textContent;
  popupZoomImgCopyright.textContent = cardElement.querySelector('.element__title').textContent;
  openPopup (popupOpenZoomPhoto);
};


//Слушатели
buttonEditProfile.addEventListener('click', (evt) => {
	evt.preventDefault();
	formEditNameProfile.value = userName.textContent;
	formEditDescroptionProfile.value = userDescription.textContent;
	openPopup(popupEditProfile);
});
buttonAddContentCard.addEventListener('click', () => openPopup(popupAddContentCard));

formEditProfile.addEventListener('submit',handleFormEditProfileSubmit);

//Крестики закрытия попапа.
const closeButtons = document.querySelectorAll('.popup__close-button');
closeButtons.forEach((button) => {
  // находим 1 раз ближайший к крестику попап
  const popup = button.closest('.popup');
  // устанавливаем обработчик закрытия на крестик
  button.addEventListener('click', () => closePopup(popup));
});

// Назначение объектов
const options = {
  formSelector: '.form',
  inputSelector: '.form__input',
  inputSectionSelector: '.form__field',
  imputInvalidClass:'form__input_invalid',
  submitButtonSelector: '.form__button-save',
  inactiveButtonClass: 'form__button-save_inactive',
  errorSelector: '.form__inpute-error',
  errorClass: 'form__input-error_active',
};
//Включение валидации
const fromCardValidator = new FormValidator(options, formAddCard);
fromCardValidator.enableValidation();

const fromProfileValidator = new FormValidator(options, formEditProfile);
fromProfileValidator.enableValidation();


