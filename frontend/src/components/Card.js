import {CurrentUserContext} from "../contexts/CurrentUserContext";
import React from 'react';

export default function Card({card, onCardClick, onCardLike, onCardDelete}) {

  const currentUser = React.useContext(CurrentUserContext);

  const isOwn = card.owner._id === currentUser._id;

  const cardDeleteButtonClassName = (
    `element__trash ${isOwn ? 'element__trash_visible' : 'element__trash_hidden'}`
  );

  const isLiked = card.likes.some(i => i._id === currentUser._id);
  const cardLikeButtonClassName = `element__like ${isLiked ? "element__like_active" : ""}`;

  function handleClick() {
    onCardClick(card);
  }

  function handleLikeClick() {
    console.log(card.likes);
    onCardLike(card);
  }

  function handleDeleteClick() {
    onCardDelete(card);
  }

  return (
    <article className="element">
      <button type="button" className={cardDeleteButtonClassName} onClick={handleDeleteClick}></button>
      <img src={card.link} className="element__image" alt={card.name} onClick={handleClick}/>
      <div className="element__group">
        <h2 className="element__title">{card.name}</h2>
        <div className="element__likes-container">
          <button type="button" className={cardLikeButtonClassName} onClick={handleLikeClick}></button>
          <span className="element__likes-count">{card.likes.length}</span>
        </div>
      </div>
    </article>
  )
}
