/*@jsx Reilly.createElement */
import Reilly from 'reilly';

function AddMemberButton({ onAddMember }) {
  return (
    <li className="add-user-button-container">
      <button id="add-user-button" className="ripple" onclick={onAddMember}>
        <span className="material-icons">add</span>
      </button>
    </li>
  );
}

export default AddMemberButton;
