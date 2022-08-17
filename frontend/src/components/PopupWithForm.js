export default function PopupWithForm({name, title, isOpen, children, onClose, buttonText, onSubmit}) {
  return (
    <div className={`popup popup-${name} ${isOpen && 'popup_opened'}`}>
      <div className={`popup__container popup-${name}__container`}>
        <button type="button" className="popup__close-button" onClick={onClose}></button>
        <h2 className={`popup__title`}>{title}</h2>
        <form name={`${name}`} className={`popup__form ${name}-popup__form`} onSubmit={onSubmit}>
          {children}
          <button type="submit" className="popup__save">
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  )
}

