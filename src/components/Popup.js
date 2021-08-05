import React from "react";
import { createPortal } from "react-dom";
import "./styles/Popup.css";

const popupRoot = document.getElementById("popup");

export const Popup = ({ isOpen, character, closePopup }) => {
  if (!isOpen) {
    return null;
  }

  const jsx = (
    <div className="popup-box">
      <div className="box">
        <h1>{character.name}</h1>
        <h3>Gender: {character.gender}</h3>
        <h3>Specie: {character.species}</h3>
        <span className="close-icon" onClick={closePopup}>
          X
        </span>
      </div>
    </div>
  );

  return createPortal(jsx, popupRoot);
};
