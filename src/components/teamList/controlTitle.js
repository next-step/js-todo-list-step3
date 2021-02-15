export const onControlTitle = ({target}) => {
    if(!target.classList.contains('card')) return;
    const $userTitleStrong = document.querySelector('#user-title strong');
    $userTitleStrong.innerHTML = target.innerText;
}