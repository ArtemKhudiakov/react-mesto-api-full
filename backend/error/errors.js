const VALIDATION_ERROR = {
  status: 400,
  message: 'Ошибка некорректных данных',
};

const AUTH_ERROR = {
  status: 401,
  message: 'Необходима авторизация',
};

const NOT_FOUND_ERROR = {
  status: 404,
  message: 'Ошибка ненайденных данных',
};

const DEFAULT_ERROR = {
  status: 500,
  message: 'Ошибка сервера',
};

const DOUBLE_ACCOUNT_ERROR = {
  status: 409,
  message: 'Ошибка сервера',
};

module.exports = {
  VALIDATION_ERROR,
  AUTH_ERROR,
  NOT_FOUND_ERROR,
  DEFAULT_ERROR,
  DOUBLE_ACCOUNT_ERROR,
};
