/*@jsx Reilly.createElement */
import Reilly from 'reilly';

function AddTeamButton({ onclick }) {
  return (
    <div class="add-team-button-container">
      <button id="add-team-button" class="ripple" onclick={onclick}>
        <span class="material-icons">add</span>
      </button>
    </div>
  );
}

export default AddTeamButton;
