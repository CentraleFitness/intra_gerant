import {
    SET_SECONDARY_MANAGERS,
    DISPLAY_MANAGER_UPDATE_CONFIRM,
    DISMISS_MANAGER_UPDATE_CONFIRM,
    SET_MANAGER_ACTIVITY,
    SET_VALIDATE_MANAGER

} from "./types"

export const setSecondaryManagers = (secondary_managers) => {
    return {
        type: SET_SECONDARY_MANAGERS,
        payload: secondary_managers
    };
};

export const displayManagerUpdateConfirm = (confirm_info) => {
    return {
        type: DISPLAY_MANAGER_UPDATE_CONFIRM,
        payload: confirm_info
    };
};

export const dismissManagerUpdateConfirm = () => {
    return {
        type: DISMISS_MANAGER_UPDATE_CONFIRM
    };
};

export const setManagerActivity = (manager) => {
    return {
        type: SET_MANAGER_ACTIVITY,
        payload: manager
    };
};

export const setValidateManager = (manager) => {
    return {
        type: SET_VALIDATE_MANAGER,
        payload: manager
    };
};