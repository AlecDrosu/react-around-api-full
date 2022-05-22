import PopupWithForm from "./PopupWithForm.js";

export default function PopupWithConfirm(props) {
	function handleSubmit(evt) {
		evt.preventDefault();
		props.onConfirm();
	}

	return (
		<PopupWithForm
			name='delete'
			title='Are you sure?'
			submit='Delete'
			isOpen={props.isOpen}
			onClose={props.onClose}
			onSubmit={handleSubmit}
		></PopupWithForm>
	);
}
