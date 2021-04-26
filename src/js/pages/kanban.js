import API from '../utils/API.js'
import AddMember from '../components/kanban/AddMember.js'

// function App () {
//   const $todoApps = document.querySelector('.todoapp-list-container')
//   $todoApps.addEventListener('click', e => {
//     const $target = e.target
//     const targetClassList = $target.classList
//     if (targetClassList.contains('chip')) {
//       const $chipSelect = $target.closest('.chip-container').querySelector('select')
//       $target.classList.add('hidden')
//       $chipSelect.classList.remove('hidden')
//     }
//   })
// }

const Kanban = () => {
  const UrlParams = new URLSearchParams(window.location.search)
  const TeamId = UrlParams.get('id')

  const handleAddUser = async () => {
    const newMemberName = prompt('새로운 팀원 이름을 입력해주세요')
    const result = await API.postMember(newMemberName, TeamId)
    console.log(result)
  }

  const init = () => {
    AddMember({ onAdd: handleAddUser })
  }

  init()
}

Kanban()
