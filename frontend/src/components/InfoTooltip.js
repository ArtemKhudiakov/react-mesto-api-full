import React from "react";
import imageOk from '../images/ok.png'
import imageNotOk from '../images/notOk.png'

function InfoTooltip({isOpen, onClose, signupStatus}) {
  return (
    <div className={`popup popup_info-tooltip ${isOpen && 'popup_opened'}`}>
      <div className="popup__container popup-info-tooltip__container">
        <button type="button" className="popup__close-button" onClick={onClose}></button>
        <img
          className="popup-info-tooltip__image"
          src={signupStatus ? imageOk : imageNotOk}
          alt="Статус"
        />
        <p className="popup-info-tooltip__title">
          {signupStatus ? "Вы успешно зарегистрировались!" : "Что-то пошло не так! Попробуйте ещё раз."}
        </p>
      </div>
    </div>
  )
}

export default InfoTooltip;
