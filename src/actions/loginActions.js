import {
    SET_EMAIL,
    SET_PASSWORD,
    SET_REMEMBER
} from "./types"

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