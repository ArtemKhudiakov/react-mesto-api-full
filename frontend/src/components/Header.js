import logo from '../images/Vector-logo.svg';
import {Link, Route, Switch} from "react-router-dom";
import React from "react";

export default function Header({email, onSignOut}) {

  return (
    <header className="header">
      <img src={logo} className="header__logo" alt="Логотип сайта"/>
      <Switch>
        <Route exact path="/">
          <div className='header__info'>
            <p className='header__email'>{email}</p>
            <Link to='/sign-in' className='header__link' onClick={onSignOut}>Выйти</Link>
          </div>
        </Route>
        <Route path="/sign-up">
          <Link to='/sign-in' className='header__link'>Войти</Link>
        </Route>
        <Route path="/sign-in">
          <Link to='/sign-up' className='header__link'>Регистрация</Link>
        </Route>
      </Switch>
    </header>
  )
}
