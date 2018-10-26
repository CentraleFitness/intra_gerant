import {
    SET_FIRST_NAME,
    SET_LAST_NAME,
    SET_PHONE,
    SET_EMAIL,
    SET_PASSWORD,
    SET_CONFIRM_PASSWORD,
    SET_NAME,
    SET_SIRET,
    SET_DESCRIPTION,
    SET_ADDRESS,
    SET_ADDRESS_SECOND,
    SET_ZIP_CODE,
    SET_CITY,
    SET_CENTER_PHONE,
    RESET_REGISTER_INFO,
    SET_CREATE_FITNESS_CENTER
} from "./types"

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

export const setSiret = (value) => {
    return {
        type: SET_SIRET,
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

export const setCreateFitnessCenter = (value) => {
    return {
        type: SET_CREATE_FITNESS_CENTER,
        payload: value
    };
};

export const resetRegisterInfo = () => {
    return {
        type: RESET_REGISTER_INFO
    };
};