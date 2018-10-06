import {
    DISPLAY_ALERT,
    DISMISS_ALERT,
    SET_STATISTICS
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

export const setStatistics = (value) => {
    return {
        type: SET_STATISTICS,
        payload: value
    };
};