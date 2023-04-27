export default class UserInfo {
  constructor({ profileNameSelector, profileInfoSelector,profileAvatarSelector}) {
    this._userName = document.querySelector(profileNameSelector);
    this._userInfo = document.querySelector(profileInfoSelector);
    this._userAvatar = document.querySelector(profileAvatarSelector)
  }

  getUserInfo() {
    return {
      name: this._userName.textContent,
      about: this._userInfo.textContent,
      avatar: this._userAvatar.src
    };
  }

  setUserInfo({ name, about,avatar}) {
    this._userName.textContent = name;
    this._userInfo.textContent = about;
    this._userAvatar.src = avatar;
  }
}
