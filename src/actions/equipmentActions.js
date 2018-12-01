import {
    SET_MODULES,
    SET_MODULE_STATES,
    SET_MODULE_RECEIVED
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

export const setModuleReceived = (infos) => {
    return {
        type: SET_MODULE_RECEIVED,
        payload: infos
    };
};

