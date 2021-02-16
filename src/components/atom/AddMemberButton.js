/*@jsx Reilly.createElement */
import Reilly from 'reilly';

function AddMemberButton({ onAddMember }) {
  return (
    <li class="add-user-button-container">
      <button id="add-user-button" class="ripple" onclick={onAddMember}>
        <span class="material-icons">add</span>
      </button>
    </li>
  );
}

export default AddMemberButton;
