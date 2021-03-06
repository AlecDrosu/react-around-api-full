// authentication file

// const BASE_URL = "https://register.nomoreparties.co";

// const BASE_URL =
//   process.env.NODE_ENV === "production"
//     ? "https://api.alecfinalproject.students.nomoreparties.sbs"
//     : "http://localhost:3000";

const BASE_URL = "https://api.alecfinalproject.students.nomoreparties.sbs"

const checkResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`error: ${res.status}`);
};

export const register = (email, password) => {
  return fetch(`${BASE_URL}/signup`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
    }),
  })
    .then(checkResponse)
    .then((res) => {
      return res;
    })
};

export const authorize = (email, password) => {
  return fetch(`${BASE_URL}/signin`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
    }),
  })
    .then(checkResponse)
    .then((data) => {
      if (data.token) {
        localStorage.setItem("token", data.token);
        localStorage.setItem('email', email);
        return data;
      }
    })
};

export const checkToken = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then(checkResponse)
    .then((data) => {
      return data;
    });
};
