import React, {useState} from 'react';
import {Link} from "react-router-dom";

function Register({onRegister}) {

  const [data, setData] = useState({
    email: '',
    password: '',
  })

  function handleChange(e) {
    const {name, value} = e.target;
    setData({
      ...data,
      [name]: value
    });
  }

  function handleSubmit(e) {
    e.preventDefault()
    let {email, password} = data;
    onRegister({email, password});

  }

  return (
    <div className="register">
      <form onSubmit={handleSubmit} className="register__form popup__form">
        <h2 className="register__title">Регистрация</h2>

        <input className="popup__edit-input register__edit-input" id="email" name="email" type="email"
               placeholder="Email"
               value={data.email} onChange={handleChange}/>

        <input className="popup__edit-input register__edit-input" id="password" name="password" type="password"
               placeholder="Пароль" value={data.password}
               onChange={handleChange}/>

        <button type="submit" className="popup__save register__button">Зарегистрироваться</button>

      </form>
      <div className="register__signin">
        <Link to="/sign-in" className="register__login-link">Уже зарегистрированы? Войти</Link>
      </div>
    </div>
  )

}

export default Register;
