(()=>{"use strict";const e=document.querySelector(".form_type_profile"),t=document.querySelector(".form_type_content"),s=(document.querySelector(".popup_type_avatar"),document.querySelector(".card-template")),r=document.querySelector(".profile__edit-button"),o=document.querySelector(".profile__add-button"),i=document.querySelector(".profile__button-avatar"),n={formSelector:".form",inputSelector:".form__input",inputSectionSelector:".form__field",inputInvalidClass:"form__input_invalid",submitButtonSelector:".form__button-save",inactiveButtonClass:"form__button-save_inactive",errorSelector:".form__input-error",errorClass:"form__input-error_active"};class a{constructor(e){this._popup=document.querySelector(e),this._buttonClose=this._popup.querySelector(".popup__close-button"),this._buttonSubmit=this._popup.querySelector(".form__button-save")}open(){this._popup.classList.add("popup_opened"),document.addEventListener("keydown",this._handleEscClose)}close(){this._popup.classList.remove("popup_opened"),document.removeEventListener("keydown",this._handleEscClose)}_handleEscClose=e=>{"Escape"===e.key&&this.close()};_handleCloseOverlay(e){e.target.classList.contains("popup_opened")&&this.close()}setEventListeners(){this._buttonClose.addEventListener("click",(()=>{this.close()})),this._popup.addEventListener("mousedown",this._handleCloseOverlay.bind(this))}}class l extends a{constructor(e,t){let{submitCallback:s}=t;super(e),this._submitCallback=s,this._form=this._popup.querySelector(".form"),this._inputs=Array.from(this._form.querySelectorAll(".form__input"))}_getInputValues(){return this._formValues={},this._inputs.forEach((e=>{this._formValues[e.name]=e.value})),this._formValues}setInputValues(e){this._inputs.forEach((t=>{t.value=e[t.name]}))}setEventListeners(){super.setEventListeners(),this._form.addEventListener("submit",(e=>{e.preventDefault(),this._submitCallback(this._getInputValues())}))}close(){super.close(),this._form.reset()}}class h{constructor(e){let{profileNameSelector:t,profileInfoSelector:s,profileAvatarSelector:r}=e;this._userName=document.querySelector(t),this._userInfo=document.querySelector(s),this._userAvatar=document.querySelector(r)}getUserInfo(){return{name:this._userName.textContent,about:this._userInfo.textContent,avatar:this._userAvatar.src}}setUserInfo(e){let{name:t,about:s,avatar:r}=e;this._userName.textContent=t,this._userInfo.textContent=s,this._userAvatar.src=r}}class c{constructor(e,t,s,r){this._link=e.link,this._name=e.name,this._alt=e.name,this._likes=e.likes,this.cardId=e._id,this._userId=e.userId,this._ownerId=e.ownerId,this._handleCardClick=s,this._templateSelector=t,this._handleTrashClick=r}_getTemplate(){return this._templateSelector.content.cloneNode(!0).children[0]}generateCard(){return this._element=this._getTemplate(),this._cardImage=this._element.querySelector(".element__photo"),this._cardImage.src=this._link,this._cardImage.alt=this._name,this._title=this._element.querySelector(".element__title"),this._title.textContent=this._name,this._buttonTrash=this._element.querySelector(".element__trash"),this._likeButton=this._element.querySelector(".element__like"),this._setEventListners(this._element),this._setLikes(),this._ownerId!==this._userId&&this._buttonTrash.remove(),this._element}_handleButtonLike(){this._likeButton.classList.toggle("element__like_activ")}_setLikes(){this._element.querySelector(".element__like-quantity").textContent=this._likes.length}removeCard(){this._element.remove(),this._element=null}_handleOpenPopup(){this._handleCardClick(this._name,this._link)}_setEventListners(){this._buttonTrash.addEventListener("click",(()=>{this._handleTrashClick()})),this._likeButton.addEventListener("click",(()=>{this._handleButtonLike()})),this._cardImage.addEventListener("click",(()=>{this._handleOpenPopup(this._element)}))}}const _=class{constructor(e,t){this._form=t,this._options=e,this._submitElement=this._form.querySelector(this._options.submitButtonSelector),this._inputs=Array.from(this._form.querySelectorAll(this._options.inputSelector))}_hideError(e){e.classList.remove(this._options.inputInvalidClass),this._getErrorElement(e).classList.remove(this._options.errorClass),this._getErrorElement(e).textContent=""}_showError(e){e.classList.add(this._options.inputInvalidClass),this._getErrorElement(e).classList.add(this._options.errorClass),this._getErrorElement(e).textContent=e.validationMessage}_enableButton(){this._submitElement.removeAttribute("disabled"),this._submitElement.classList.remove(this._options.inactiveButtonClass)}_disabledButton(){this._submitElement.disabled="true",this._submitElement.classList.add(this._options.inactiveButtonClass)}_getErrorElement(e){return this._form.querySelector(`#${e.id}-error`)}_toggleButtonState(){this._inputs.every((e=>e.validity.valid))?this._enableButton():this._disabledButton()}_toggleErrorState(e){e.validity.valid?this._hideError(e):this._showError(e)}cleanValidation(){this._toggleButtonState(),this._inputs.forEach((e=>{this._hideError(e)}))}_setEventListeners(e){this._toggleButtonState(),this._inputs.forEach(((e,t)=>{e.addEventListener("input",(()=>{this._toggleErrorState(e),this._toggleButtonState()}))}))}enableValidation(){const e=this._form;this._setEventListeners(e)}},u=new class{constructor(e){let{baseUrl:t,headers:s}=e;this._baseUrl=t,this._headers=s}getProfile(){return fetch(`${this._baseUrl}/users/me`,{headers:this._headers}).then((e=>e.ok?e.json():Promise.reject(`Что-то где-то пошло не так... Код ошибки ${e.status}`))).catch(console.log)}getInitialCards(){return fetch(`${this._baseUrl}/cards`,{headers:this._headers}).then((e=>e.ok?e.json():Promise.reject(`Что-то где-то пошло не так... Код ошибки ${e.status}`))).catch(console.log)}editProfile(e){let{name:t,about:s}=e;return fetch(`${this._baseUrl}/users/me `,{method:"PATCH",headers:this._headers,body:JSON.stringify({name:t,about:s})}).then((e=>e.ok?e.json():Promise.reject(`Что-то где-то пошло не так... Код ошибки ${e.status}`))).catch(console.log)}editAvatar(e){let{avatar:t}=e;return fetch(`${this._baseUrl}/users/me/avatar `,{method:"PATCH",headers:this._headers,body:JSON.stringify({avatar:t})}).then((e=>e.ok?e.json():Promise.reject(`Что-то где-то пошло не так... Код ошибки ${e.status}`))).catch(console.log)}addCard(e){let{name:t,link:s}=e;return fetch(`${this._baseUrl}/cards`,{method:"POST",headers:this._headers,body:JSON.stringify({name:t,link:s})}).then((e=>e.ok?e.json():Promise.reject(`Что-то где-то пошло не так... Код ошибки ${e.status}`))).catch(console.log)}deleteCard(e){return fetch(`${this._baseUrl}/cards/${e}`,{method:"DELETE",headers:this._headers}).then((e=>e.ok?e.json():Promise.reject(`Что-то где-то пошло не так... Код ошибки ${e.status}`))).catch(console.log)}deleteLike(){return fetch(`${this._baseUrl}/cards/${cardId}/likes`,{method:"DELETE",headers:this._headers}).then((e=>e.ok?e.json():Promise.reject(`Что-то где-то пошло не так... Код ошибки ${e.status}`))).catch(console.log)}addLike(){return fetch(`${this._baseUrl}/cards/${cardId}/likes`,{method:"PUT",headers:this._headers}).then((e=>e.ok?e.json():Promise.reject(`Что-то где-то пошло не так... Код ошибки ${e.status}`))).catch(console.log)}}({baseUrl:"https://mesto.nomoreparties.co./v1/cohort-64",headers:{authorization:"4c274032-0b3e-4759-b4b1-a9d64f1dfaf8","Content-Type":"application/json"}});let d;const p=new h({profileNameSelector:".profile__info-title",profileInfoSelector:".profile__info-subtitle",profileAvatarSelector:".profile__avatar"}),m=new class{constructor(e){let{items:t,renderer:s}=e;this.items=t,this._renderer=s,this._container=document.querySelector(".element")}addItem(e){this._container.append(e)}addItemPrepend(e){this._container.prepend(e)}rendersItem(e){e.forEach((e=>{this._renderer(e)}))}}({items:[],renderer:e=>{m.addItem(b(e))}});Promise.all([u.getProfile(),u.getInitialCards()]).then((e=>{let[t,s]=e;d=t._id,p.setUserInfo(t),m.rendersItem(s),console.log(s)})).catch(console.log);const f=new l(".popup_type_profile",{submitCallback:e=>{u.editProfile(e).then((e=>{p.setUserInfo(e)})),f.close()}});f.setEventListeners(),r.addEventListener("click",(()=>{f.open(),f.setInputValues(p.getUserInfo())}));const v=new l(".popup_type_avatar",{submitCallback:e=>{u.editAvatar(e).then((e=>{h.setUserInfo(e),v.close()}))}});v.setEventListeners(),i.addEventListener("click",(()=>{v.open()}));const b=e=>{const t=new c(e,s,(function(e,t){g.open(e,t)}),(function(){console.log(t),E.openConfirmation(t)}));return t.generateCard()},E=new class extends a{constructor(e,t){let{submitCallback:s}=t;super(e),this._submitCallback=s}openConfirmation(e){super.open(),this.cardId=e.cardId,this.card=e}setEventListeners(){super.setEventListeners(),this._buttonSubmit.addEventListener("click",(e=>{e.preventDefault(),this._submitCallback(this)}))}}(".popup_type_trash",{submitCallback:e=>{let{card:t}=e;u.deleteCard(t.cardId).then((()=>{t.removeCard(),E.close()}))}});E.setEventListeners();const k=new l(".popup_type_content",{submitCallback:e=>{u.addCard(e).then((e=>{m.addItemPrepend(b({name:e.name,link:e.link,likes:e.likes,cardId:e._id,ownerId:e.owner._id,userId:d})),k.close()}))}});k.setEventListeners(),o.addEventListener("click",(()=>{k.open(),C.cleanValidation()}));const g=new class extends a{constructor(e){super(e),this._popupImg=this._popup.querySelector(".popup__photo-zoom"),this._popupTitle=this._popup.querySelector(".popup__copyright")}open(e,t){super.open(),this._popupTitle.textContent=e,this._popupImg.alt=e,this._popupImg.src=t}close(){super.close()}}(".popup_type_photo");g.setEventListeners();const C=new _(n,t);C.enableValidation(),new _(n,e).enableValidation()})();