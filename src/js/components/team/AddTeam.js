const AddTeam = ({ onAdd }) => {
  const AddTeamButtonElement = document.getElementById('add-team-button')

  AddTeamButtonElement.addEventListener('click', onAdd)
}

export default AddTeam
