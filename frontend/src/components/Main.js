import logoEdit from '../images/Vector-edit.svg'
import React from 'react';
import Card from './Card';
import {CurrentUserContext} from "../contexts/CurrentUserContext";

export default function Main({cards, onEditProfile, onAddPlace, onEditAvatar, onCardClick, onCardLike, onCardDelete}) {

  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__container" onClick={onEditAvatar}>
          <img
            src={currentUser.avatar}
            alt="Аватар профайла"
            className="profile__avatar"
          />
          <img
            src={logoEdit}
            alt="Редактировать аватар"
            className="profile__avatar-edit"
          />
        </div>
        <div className="profile__wrap">
          <div className="profile__name-wrapper">
            <h1 className="profile__name">{currentUser.name}</h1>
            <button type="button" className="profile__edit" onClick={onEditProfile}></button>
          </div>
          <p className="profile__description">{currentUser.about}</p>
        </div>
        <button type="button" className="profile__add-button" onClick={onAddPlace}></button>
      </section>

      <section className="elements">
        {cards.map((card) =>
          <Card
            key={card._id}
            card={card}
            onCardClick={onCardClick}
            onCardLike={onCardLike}
            onCardDelete={onCardDelete}
          />
        )
        }
      </section>
    </main>
  )
}
