class Api {
  constructor({ baseUrl, cardUrl, headers, userID }) {
    // constructor body
    this._baseUrl = baseUrl;
    this._cardUrl = cardUrl;
    this._headers = headers;
    // this._userID = userID;
  }

  // Since a low of the code is repeated, create _checkResponse method
  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Error: ${res.status}`);
  }

  updateToken(token) {
    this._headers = {
      ...this._headers,
      authorization: `Bearer ${token}`,
    };
  }

  getCards() {
    // fetch the url with the token: 807a4335-951b-4493-9e81-0010a6738faf
    return fetch(`${this._baseUrl}/cards`, {
      method: "GET",
      headers: this._headers,
    }).then(this._checkResponse);
  }

  createCard(card) {
    return fetch(this._cardUrl, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify(card),
    }).then(this._checkResponse);
  }

  deleteCard(cardId) {
    return fetch(`${this._cardUrl}/${cardId}`, {
      method: "DELETE",
      headers: this._headers,
    }).then(this._checkResponse);
  }

  likeCard({ cardId }) {
    return fetch(`${this._cardUrl}/likes/${cardId}`, {
      method: "PUT",
      headers: this._headers,
    }).then(this._checkResponse);
  }

  dislikeCard({ cardId }) {
    return fetch(`${this._cardUrl}/likes/${cardId}`, {
      method: "DELETE",
      headers: this._headers,
    }).then(this._checkResponse);
  }

  changeLikeCardStatus(cardId, isLiked) {
    if (isLiked) {
      return this.likeCard({ cardId });
    } else {
      return this.dislikeCard({ cardId });
    }
  }

  // Editing the profile. Once edited, profile data must be saved on the server. To do this, send a request using the PATCH method:
  editProfile({ name, about }) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({ name, about }),
    }).then(this._checkResponse);
  }

  editAvatar({ avatar }) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({ avatar }),
    }).then(this._checkResponse);
  }

  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers,
    }).then(this._checkResponse);
  }
}


// const BASE_URL = "https://api.alecdrosu.students.nomoredomainssbs.ru";

const BASE_URL = process.env.NODE_ENV === "production" ? "https://api.alecdrosu.students.nomoredomainssbs.ru" : "http://localhost:3000";

console.log(BASE_URL);

const config = {
  baseUrl: BASE_URL,
  cardUrl: `${BASE_URL}/cards`,
  headers: {
    authorization: `Bearer ${localStorage.getItem("token")}`,
    "Content-Type": "application/json",
  },
};

const api = new Api(config);

export default api;
