import {
    DISPLAY_ALERT,
    DISMISS_ALERT,
    SET_EMAIL,
    SET_PASSWORD,
    SET_REMEMBER
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

export const setEmail = (value) => {
    return {
        type: SET_EMAIL,
        payload: value
    };
};

export const setPassword = (value) => {
    return {
        type: SET_PASSWORD,
        payload: value
    };
};

export const setRemember = (value) => {
    return {
        type: SET_REMEMBER,
        payload: value
    };
};