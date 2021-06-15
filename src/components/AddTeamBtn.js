/* @jsx createElement */
import { createElement } from 'react';

const AddTeamBtn = ({ onAddTeam }) => {
  return (
    <div className="add-team-button-container">
      <button id="add-team-button" className="ripple" onclick={onAddTeam}>
        <span className="material-icons">add</span>
      </button>
    </div>
  );
};

export default AddTeamBtn;
