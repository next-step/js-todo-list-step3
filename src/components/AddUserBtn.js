/* @jsx createElement */
import { createElement } from '../lib/React';

const AddUserBtn = () => {
  return (
    <li className="add-user-button-container">
      <button id="add-user-button" className="ripple">
        <span className="material-icons">add</span>
      </button>
    </li>
  );
};

export default AddUserBtn;
