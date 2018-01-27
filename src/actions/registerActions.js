import {
    DISPLAY_ALERT,
    DISMISS_ALERT,
    SET_FIRST_NAME,
    SET_LAST_NAME,
    SET_PHONE,
    SET_EMAIL,
    SET_PASSWORD,
    SET_CONFIRM_PASSWORD,
    SET_NAME,
    SET_DESCRIPTION,
    SET_ADDRESS,
    SET_ADDRESS_SECOND,
    SET_ZIP_CODE,
    SET_CITY,
    SET_CENTER_PHONE,
    RESET_REGISTER_INFO
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

export const setFirstName = (value) => {
    return {
        type: SET_FIRST_NAME,
        payload: value
    };
};

export const setLastName = (value) => {
    return {
        type: SET_LAST_NAME,
        payload: value
    };
};

export const setPhone = (value) => {
    return {
        type: SET_PHONE,
        payload: value
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

export const setConfirmPassword = (value) => {
    return {
        type: SET_CONFIRM_PASSWORD,
        payload: value
    };
};

export const setName = (value) => {
    return {
        type: SET_NAME,
        payload: value
    };
};

export const setDescription = (value) => {
    return {
        type: SET_DESCRIPTION,
        payload: value
    };
};

export const setAddress = (value) => {
    return {
        type: SET_ADDRESS,
        payload: value
    };
};

export const setAddressSecond = (value) => {
    return {
        type: SET_ADDRESS_SECOND,
        payload: value
    };
};

export const setZipCode = (value) => {
    return {
        type: SET_ZIP_CODE,
        payload: value
    };
};

export const setCity = (value) => {
    return {
        type: SET_CITY,
        payload: value
    };
};

export const setCenterPhone = (value) => {
    return {
        type: SET_CENTER_PHONE,
        payload: value
    };
};

export const resetRegisterInfo = () => {
    return {
        type: RESET_REGISTER_INFO
    };
};