export class Api {
  constructor(options) {
    this._url = options.url;
    this._headers = options.headers;
  }

  getUserInfoServer() {
    return fetch(this._url + '/users/me', {
      method: 'GET',
      headers: this._headers
    })
      .then(this._checkOk)
  }

  getInitialCards() {
    return fetch(this._url + '/cards', {
      method: 'GET',
      headers: this._headers
    })
      .then(this._checkOk)
  }

  editUserInfo(userInfo) {
    return fetch(this._url + '/users/me', {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: userInfo.name, // из редактирования профиля взять новые фи
        about: userInfo.about
      })
    })
      .then(this._checkOk)
  }

  addNewCard(data) {
    return fetch(this._url + '/cards', {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: data.name, // из редактирования места взять новые фи
        link: data.link
      })
    })
      .then(this._checkOk)
  }

  deleteCard(id) {
    return fetch(this._url + `/cards/${id}`, {
      method: 'DELETE',
      headers: this._headers
    })
      .then(this._checkOk)
  }

  changeLikeCardStatus(id, isLiked) {
    return fetch(this._url + `/cards/${id}/likes`, {
      method: isLiked ? "PUT" : "DELETE",
      headers: this._headers
    })
      .then(this._checkOk)
  }

  //
  // dislikeCard(id) {
  //   return fetch(this._url + `/cards/${id}/likes`, {
  //     method: 'DELETE',
  //     headers: this._headers
  //   })
  //     .then(this._checkOk)
  // }

  setUserAvatar(data) {
    return fetch(this._url + `/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: data.avatar, // из редактирования аватара взять новое фото
      })
    })
      .then(this._checkOk)
  }

  _checkOk(res) {
    if (res.ok) {
      return res.json();
    } else {
      // если ошибка, отклоняем промис
      return Promise.reject(`Ошибка: ${res.status}`);
    }
  }
}

export const api = new Api({
  url: 'https://api.artemkhudiakov.nomoredomains.sbs',
  headers: {
       'Content-Type': 'application/json'
  }
});

