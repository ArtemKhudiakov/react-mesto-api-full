import React, {useState} from 'react';

function Login({onLogin}) {

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
    onLogin({email, password});
  }


  return (
    <div className="register">
      <form onSubmit={handleSubmit} className="register__form popup__form">
        <h2 className="register__title">Вход</h2>

        <input className="popup__edit-input register__edit-input" id="email" name="email" type="email"
               placeholder="Email"
               value={data.email} onChange={handleChange}/>

        <input className="popup__edit-input register__edit-input" id="password" name="password" type="password"
               placeholder="Пароль" value={data.password}
               onChange={handleChange}/>

        <button type="submit" className="popup__save register__button">Войти</button>
      </form>
    </div>
  )

}

export default Login;
