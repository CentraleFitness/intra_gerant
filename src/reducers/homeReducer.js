import {
    DISPLAY_ALERT,
    DISMISS_ALERT,
    SET_HOME_SUMMARY
} from "../actions/types"

const initialState = {
    center_name: "",
    manager_first_name: "",
    manager_last_name: "",
    nb_subscribers: 0,
    events: [],
    showAlert: false,
    alertTitle: "",
    alertText: ""
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
        case SET_HOME_SUMMARY:
            return {
                ...state,
                center_name: action.payload.center_name,
                manager_first_name: action.payload.manager_first_name,
                manager_last_name: action.payload.manager_last_name,
                nb_subscribers: action.payload.nb_subscribers,
                events: action.payload.events
            };
        default:
            return state;
    }
}