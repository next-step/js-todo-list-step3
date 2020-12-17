import { createAction } from '../../core/redux';

const ACTION_INCR = 'INCREAMENT/COUNTER';

export const increament = createAction(ACTION_INCR);

const initialState = {
  number: 0,
  count: 0,
};

// Reducer 정의
export default function counter(state = initialState, /* action */ { type, payload }) {
  console.log('counter1');
  switch (type) {
    case ACTION_INCR:
      return {
        ...state,
        count: state.count + 1 || 0,
      };
    default:
      return { ...state };
  }
}
