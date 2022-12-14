export const BASE_URL = "https://api.artemkhudiakov.nomoredomains.sbs";

const checkResponse = (response) => {
  if (response.ok) {
    return response.json()
  }
  return Promise.reject(`Ошибка: ${response.status}`);
}

export const register = (email, password) => {

  return fetch(`${BASE_URL}/signup`, {

    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({email, password})
  })
    .then(checkResponse)
};

export const authorize = (email, password) => {

  return fetch(`${BASE_URL}/signin`, {

    method: 'POST',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({email, password})
  })
    .then(checkResponse)
};

export const checkToken = (token) => {

  return fetch(`${BASE_URL}/users/me`, {

    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    }
  })
    .then((res) => checkResponse(res))
}

