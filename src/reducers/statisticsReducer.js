import {
    DISPLAY_ALERT,
    DISMISS_ALERT,
    SET_STATISTICS
} from "../actions/types"

const initialState = {
    showAlert: false,
    alertTitle: "",
    alertText: "",
    production_day: 0,
    production_month: 0,
    frequentation_day: 0,
    frequentation_month: 0
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
        case SET_STATISTICS:
            return {
                ...state,
                production_day: action.payload.production_day,
                production_month: action.payload.production_month,
                frequentation_day: action.payload.frequentation_day,
                frequentation_month: action.payload.frequentation_month
            };
        default:
            return state;
    }
}