import {
    SET_EMAIL,
    SET_PASSWORD,
    SET_REMEMBER
} from "../actions/types"

const initialState = {
    email: "",
    password: "",
    remember: false
};

export default (state = initialState, action) => {
    switch (action.type) {
        case SET_EMAIL:
            return {
                ...state,
                email: action.payload
            };
        case SET_PASSWORD:
            return {
                ...state,
                password: action.payload
            };
        case SET_REMEMBER:
            return {
                ...state,
                remember: action.payload
            };
        default:
            return state;
    }
}