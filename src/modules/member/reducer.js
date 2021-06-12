import { GET_MEMBERS, GET_MEMBERS_ERROR, GET_MEMBERS_SUCCESS } from './action';

const initialState = {
  loading: false,
  members: null,
  error: null,
};

export default function member(state = initialState, action) {
  switch (action.type) {
    case GET_MEMBERS:
      return {
        ...state,
        loading: true,
      };
    case GET_MEMBERS_SUCCESS:
      return {
        ...state,
        members: action.payload,
      };
    case GET_MEMBERS_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
}
