const MINIMUM_INPUT_LENGTH = 2;

export const isEnterKey = (v) => v === "Enter";
export const isEscKey = (v) => v === "Escape";
export const isCanceled = (v) => v === "null";
export const isEnoughLength = (v) => {
    if(v.length < MINIMUM_INPUT_LENGTH){
        alert(`${MINIMUM_INPUT_LENGTH} 글자 이상 입력해주세요!`);
        return true;
    }
    else return false;
}