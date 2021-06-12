/* @jsx createElement */
import { createElement } from '../lib/React';

const AddTeamBtn = () => {
  return (
    <div className="add-team-button-container">
      <button id="add-team-button" className="ripple">
        <span className="material-icons">add</span>
      </button>
    </div>
  );
};

export default AddTeamBtn;
