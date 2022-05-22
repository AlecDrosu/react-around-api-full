import React from "react";
import successIcon from "../images/success.png";
import failIcon from "../images/fail.png";

export default function InfoTooltip(props) {
  return (
    <section
      className={`modal ${props.isOpen ? "modal_is-open" : ""}`}
      id="first__modal"
    >
      <div className="modal__body">
        <button
          type="button"
          className="modal__close-btn"
          onClick={props.onClose}
        ></button>
        {props.status === "success" ? (
          <form className="form" onSubmit={props.onSubmit}>
            <img className="modal__icon" src={successIcon} alt="Success" />
            <h2 className="modal__message">
              Success! You have now been registered.
            </h2>
          </form>
        ) : (
          <form className="form" onSubmit={props.onSubmit}>
            <img className="modal__icon" src={failIcon} alt="Success" />
            <h2 className="modal__message">
              Oops, something went wrong! Please try again.
            </h2>
          </form>
        )}
      </div>
      <div className="modal__overlay" onClick={props.onClose}></div>
    </section>
  );
}
