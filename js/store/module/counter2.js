import {createAction} from "../../core/redux/index.js";

const ACTION = "INCREAMENT";



export const increament1 = createAction(ACTION);


const initialState = {
    number: 0,
    count1 : 0
};

// Reducer 정의
export default function hello (state = initialState, /* action */ { type, payload }) {
    console.log('counter2')
    switch (type) {
        case ACTION:
            return {
                ...state,
                count1: state.count1 + 1 || 0,
            }
        default:
            return { ...state };
    }
}
