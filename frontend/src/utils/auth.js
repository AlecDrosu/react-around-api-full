// authentication file

// const BASE_URL = "https://register.nomoreparties.co";

// const BASE_URL =
//   process.env.NODE_ENV === "production"
//     ? "https://api.alecfinalproject.students.nomoreparties.sbs"
//     : "http://localhost:3000";

const BASE_URL = "https://api.alecfinalproject.students.nomoreparties.sbs";

class Auth {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }
  _checkResponse = (res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`error: ${res.status}`);
  };

  getUserData() {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "GET",
      headers: this._headers,
    }).then(this._checkResponse);
  }
  register = (email, password) => {
    return fetch(`${this._baseUrl}/signup`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        email,
        password,
      }),
    }).then(this._checkResponse);
  }
  authorize = (email, password) => {
    return fetch(`${this._baseUrl}/signin`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        email,
        password,
      }),
    })
      .then(this._checkResponse)
      .then((data) => {
        if (data.token) {
          localStorage.setItem("token", data.token);
          localStorage.setItem("email", email);
          return data;
        }
      });
  }
  checkToken(token) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then(this._checkResponse)
      .then((data) => {
        return data;
      });
  }
}

const auth = new Auth({
  baseUrl: BASE_URL,
  cardUrl: `${BASE_URL}/cards`,
  headers: {
    authorization: `Bearer ${localStorage.getItem("token")}`,
    "Content-Type": "application/json",
  },
});

export default auth;
