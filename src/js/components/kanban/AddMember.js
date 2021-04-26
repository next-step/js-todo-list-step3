const AddMember = ({ onAdd }) => {
  const AddMemberButtonElement = document.getElementById('add-member-button')

  AddMemberButtonElement.addEventListener('click', onAdd)
}

export default AddMember
