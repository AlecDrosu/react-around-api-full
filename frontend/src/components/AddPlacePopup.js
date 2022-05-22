import PopupWithForm from "./PopupWithForm.js";
import React from "react";

export default function AddPlacePopup(props) {
	const [name, setName] = React.useState("");
	const [link, setLink] = React.useState("");

	React.useEffect(() => {
		setName("");
		setLink("");
	}, [props.isOpen]);

	function handleAddPlacePopup(evt) {
		evt.preventDefault();
		props.onAddPlacePopup({ name, link });
	}

	function handleChageName(evt) {
		setName(evt.target.value);
	}

	function handleChageLink(evt) {
		setLink(evt.target.value);
	}

	return (
		<PopupWithForm
			name='add'
			title='New Place'
			submit='Create'
			isOpen={props.isOpen}
			onClose={props.onClose}
			onSubmit={handleAddPlacePopup}
		>
			<label className='form__label'>
				<input
					type='text'
					name='name'
					id='title'
					className='form__input form__input_type_title'
					placeholder='Title'
					required
					minLength='1'
					maxLength='30'
					onChange={handleChageName}
					value={name}
				/>
				<span className='form__error' id='title-error'></span>
			</label>
			<label className='form__label'>
				<input
					type='url'
					name='link'
					id='link'
					className='form__input form__input_type_link'
					placeholder='Image Link'
					required
					onChange={handleChageLink}
					value={link}
				/>
				<span className='form__error' id='link-error'></span>
			</label>
		</PopupWithForm>
	);
}
