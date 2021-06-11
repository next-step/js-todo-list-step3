/* @jsx createElement */
import { createElement } from '../lib/React';

const AddUserBtn = () => {
  return (
    <div className="add-user-button-container">
      <button id="add-user-button" className="ripple">
        <span className="material-icons">add</span>
      </button>
    </div>
  );
};

export default AddUserBtn;
