export default function ImagePopup(props) {
	return (
		<div
			className={`modal modal_type_preview ${
				props.isOpen ? "modal_is-open" : ""
			}`}
		>
			<div className='modal__body modal__body_type_preview'>
				<button
					type='button'
					className='modal__close-btn'
					onClick={props.onClose}
				></button>
				<img className='modal__img' src={props.card.link} alt={props.card.name} />
				<h2 className='modal__caption'>{props.card.name}</h2>
			</div>
			<div className='modal__overlay' onClick={props.onClose}></div>
		</div>
	);
}
