import { ADD_CATEGORY_DATA } from '../actions/types';

const INIT_STATE = {
  categories: [],
}

export default function categoriesReducer(state = INIT_STATE, action) {
    switch (action.type) {

        case ADD_CATEGORY_DATA:
            return action.payload;
        default:
            return state;
    }
}
