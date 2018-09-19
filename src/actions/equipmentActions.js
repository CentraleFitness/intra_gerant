import {
    DISPLAY_ALERT,
    DISMISS_ALERT,
    SET_MODULES,
    SET_MODULE_STATES
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

export const setModules = (value) => {
    return {
        type: SET_MODULES,
        payload: value
    };
};

export const setModuleStates = (value) => {
    return {
        type: SET_MODULE_STATES,
        payload: value
    };
};

