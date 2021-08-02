/* @jsx createElement */
import { createElement } from 'react';

const AddUserBtn = ({ onAddMember }) => {
  return (
    <li className="add-user-button-container">
      <button id="add-user-button" className="ripple" onclick={onAddMember}>
        <span className="material-icons">add</span>
      </button>
    </li>
  );
};

export default AddUserBtn;
