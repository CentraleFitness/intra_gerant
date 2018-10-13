import {
    SET_MODULES,
    SET_MODULE_STATES
} from "./types"

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

