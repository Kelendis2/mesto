import {initialCards,formEditProfile,formAddCard,cardTemplate,buttonEditProfile,buttonAddContentCard,options} from '../utils/constants.js'
import  PopupWithForm from '../components/PopupWithForm.js'
import UserInfo from '../components/UserInfo.js'
import PopupWithImage from '../components/PopupWithImage.js'
import Section from '../components/Section.js'
import Card from '../components/Card.js'
import FormValidator from '../components/FormValidator.js'
import './index.css'

//Создание карточки
const renderCard = (element) => {
  const cardElement = new Card (element,cardTemplate,handleCardClick);
  return cardElement.generateCard();
};
// Отрисовка секции с карточками
const cardSection = new Section({
  items: initialCards,
  renderer: (item) => {
    cardSection.addItem(renderCard(item));
  },
});
cardSection.renderItem();

// Создание экзепляра  попапа картинки и открытие его.
const popupImage = new PopupWithImage('.popup_type_photo');
popupImage.setEventListeners();

function handleCardClick(name, link) {
  popupImage.open(name, link);
}
//Включение валидации
const fromCardValidator = new FormValidator(options, formAddCard);
fromCardValidator.enableValidation();

const fromProfileValidator = new FormValidator(options, formEditProfile);
fromProfileValidator.enableValidation();

// Экземпляр класса профиля
const userInfo = new UserInfo(
  {
    profileNameSelector: '.profile__info-title',
    profileInfoSelector: '.profile__info-subtitle',
  },
);
// Экземпляр класса профиля.
const userPopup = new PopupWithForm('.popup_type_profile',
  {submitCallback: (values)=> {
      userInfo.setUserInfo(values);
      userPopup.close();
    }
  }
);
userPopup.setEventListeners();
buttonEditProfile.addEventListener('click',()=>{
  userPopup.open();
  userPopup.setInputValues(userInfo.getUserInfo());
});

const cardPopup = new PopupWithForm('.popup_type_content',{
  submitCallback: (values) => {
    cardSection.addItemPrepend(
      renderCard({ name: values.name, link: values.link })
    );
    cardPopup.close();
  },
});
cardPopup.setEventListeners();
buttonAddContentCard.addEventListener('click', ()=>{
  cardPopup.open ();
  fromCardValidator.cleanValidation();
});





