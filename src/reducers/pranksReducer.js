import { ADD_FETCHED_DATA, ADD_SEARCHED_DATA } from '../actions/types';

const INIT_STATE = {
  pranks: [],
}

export default function pranksReducer(state = INIT_STATE, action) {
    switch (action.type) {

        case ADD_FETCHED_DATA:
            return action.payload;//{...state, pranks: [...state.pranks, action.payload] };
        case ADD_SEARCHED_DATA:
            return action.payload;
        default:
            return state;
    }
}
