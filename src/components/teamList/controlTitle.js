export const initControlTitle = () => {
    const $teamCard = document.querySelector('.team-list-container');
    $teamCard.addEventListener('mouseover', onControlTitle);
};

const onControlTitle = ({target}) => {
    if(!target.classList.contains('card')) return;
    const $userTitleStrong = document.querySelector('#user-title strong');
    $userTitleStrong.innerHTML = target.innerText;
}