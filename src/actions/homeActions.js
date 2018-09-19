import {
    DISPLAY_ALERT,
    DISMISS_ALERT,
    SET_HOME_SUMMARY
} from "./types"

export const displayAlert = (alertInfo) => {
    return {
        type: DISPLAY_ALERT,
        payload: alertInfo
    };
};

export const dismissAlert = () => {
    return {
        type: DISMISS_ALERT
    };
};

export const setHomeSummary = (value) => {
    return {
        type: SET_HOME_SUMMARY,
        payload: value
    };
};