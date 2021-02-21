/*@jsx Reilly.createElement */
import Reilly from 'reilly';

function AddTeamButton({ onclick }) {
  return (
    <div className="add-team-button-container">
      <button id="add-team-button" className="ripple" onClick={onclick}>
        <span className="material-icons">add</span>
      </button>
    </div>
  );
}

export default AddTeamButton;
