import React from "react";

export default function PopupWithForm(props) {
	return (
		<section
			className={`modal modal_type_${props.name} ${
				props.isOpen ? "modal_is-open" : ""
			}`}
			id='first__modal'
		>
			<div className='modal__body'>
				<button
					type='button'
					className='modal__close-btn'
					onClick={props.onClose}
				></button>
				<h2 className='modal__title'>{props.title}</h2>
				<form className='form' onSubmit={props.onSubmit}>
					{props.children}
					<button type='submit' className='form__submit'>
						{props.submit}
					</button>
				</form>
			</div>
			<div className='modal__overlay' onClick={props.onClose}></div>
		</section>
	);
}
