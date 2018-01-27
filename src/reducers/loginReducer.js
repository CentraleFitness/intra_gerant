import {
    DISPLAY_ALERT,
    DISMISS_ALERT,
    SET_EMAIL,
    SET_PASSWORD,
    SET_REMEMBER
} from "../actions/types"

const initialState = {
    email: "",
    password: "",
    remember: false,
    showAlert: false,
    alertText: "",
    alertTitle: ""
};

export default (state = initialState, action) => {
    switch (action.type) {
        case DISPLAY_ALERT:
            return {
                ...state,
                showAlert: true,
                alertTitle: action.payload.alertTitle,
                alertText: action.payload.alertText
            };
        case DISMISS_ALERT:
            return {
                ...state,
                showAlert: false,
                alertTitle: "",
                alertText: ""
            };
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