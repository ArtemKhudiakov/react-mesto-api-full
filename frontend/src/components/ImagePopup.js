export default function ImagePopup({card, onClose}) {

  return (
    <div className={`popup popup-image ${card.link ? 'popup_opened' : ''}`}>
      <div className="popup-image__container">
        <button
          type="button"
          className="popup__close-button"
          onClick={onClose}
        ></button>
        <img
          className="popup-image__url"
          src={card.link}
          alt={card.name}
        />
        <h2 className="popup__title popup-image__title">{card.name}</h2>
      </div>
    </div>
  )
}
