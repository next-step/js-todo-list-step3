import CreateElement from '../../lib/CreateElement.js';
import { postTeam } from '../../endpoint/team/controller.js';
import { validateName } from '../../lib/validators.js';
import { dispatch } from '../../store/team.js';

const AddTeam = () => {

  const dom = CreateElement('div', { className: 'add-team-button-container' });

  const createTeamHandler = async(validator) => {
    const name = prompt('새로운 팀원 이름을 입력해주세요');
    if (name === null) return;

    const result = await validator(name, createTeamHandler);
    if (result) {
      await postTeam({ name });
      dispatch.teamList();
    }
  };

  dom.addEventListener('click', () => createTeamHandler(validateName));


  const render = () => {
    dom.innerHTML = `
      <button id="add-team-button" class="ripple">
        <span class="material-icons">add</span>
      </button>
    `;
  };
  render();

  return dom;
};

export default AddTeam;

