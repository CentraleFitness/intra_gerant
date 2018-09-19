import {
    DISPLAY_ALERT,
    DISMISS_ALERT,
    SET_MODULES,
    SET_MODULE_STATES
} from "../actions/types"

const initialState = {
    showAlert: false,
    alertTitle: "",
    alertText: "",
    modules: [],
    module_states: []
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
        case SET_MODULES:
            console.log("elelelelleleellelelelele", action.payload);
            return {
                ...state,
                modules: action.payload
            };
        case SET_MODULE_STATES:
            return {
                ...state,
                module_states: action.payload
            };
        default:
            return state;
    }
}