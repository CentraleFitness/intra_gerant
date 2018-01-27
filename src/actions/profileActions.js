import {
    DISPLAY_ALERT,
    DISMISS_ALERT,
    DISPLAY_MANAGER_PICTURE_MODAL,
    DISMISS_MANAGER_PICTURE_MODAL,
    DISPLAY_CENTER_PICTURE_MODAL,
    DISMISS_CENTER_PICTURE_MODAL,
    SET_MANAGER_INFO,
    SET_CENTER_INFO,
    RESET_MANAGER_CENTER_INFO,
    SET_MANAGER_KEEP_INFO,
    SET_CENTER_KEEP_INFO,
    SET_FIRST_NAME,
    SET_LAST_NAME,
    SET_PHONE,
    SET_EMAIL,
    SET_NAME,
    SET_DESCRIPTION,
    SET_ADDRESS,
    SET_ADDRESS_SECOND,
    SET_ZIP_CODE,
    SET_CITY,
    SET_CENTER_PHONE,
    SET_MANAGER_PICTURE_PREVIEW,
    SET_CENTER_PICTURE_PREVIEW,
    SET_MANAGER_PICTURE,
    SET_CENTER_PICTURE,
    SET_PUBLICATIONS,
    ADD_PUBLICATION,
    SET_CURRENT_PUBLICATION,
    RESET_PROFILE_INFO
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

export const displayManagerPictureModal = () => {
    return {
        type: DISPLAY_MANAGER_PICTURE_MODAL
    };
};

export const dismissManagerPictureModal = () => {
    return {
        type: DISMISS_MANAGER_PICTURE_MODAL
    };
};

export const displayCenterPictureModal = () => {
    return {
        type: DISPLAY_CENTER_PICTURE_MODAL
    };
};

export const dismissCenterPictureModal = () => {
    return {
        type: DISMISS_CENTER_PICTURE_MODAL
    };
};

export const setManagerInfo = (managerInfo) => {
    return {
        type: SET_MANAGER_INFO,
        payload: managerInfo
    };
};

export const setCenterInfo = (centerInfo) => {
    return {
        type: SET_CENTER_INFO,
        payload: centerInfo
    };
};

export const resetManagerCenterInfo = () => {
    return {
        type: RESET_MANAGER_CENTER_INFO
    };
};

export const setManagerKeepInfo = () => {
    return {
        type: SET_MANAGER_KEEP_INFO
    };
};

export const setCenterKeepInfo = () => {
    return {
        type: SET_CENTER_KEEP_INFO
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

export const setManagerPicturePreview = (value) => {
    return {
        type: SET_MANAGER_PICTURE_PREVIEW,
        payload: value
    };
};

export const setCenterPicturePreview = (value) => {
    return {
        type: SET_CENTER_PICTURE_PREVIEW,
        payload: value
    };
};

export const setManagerPicture = (value) => {
    return {
        type: SET_MANAGER_PICTURE,
        payload: value
    };
};

export const setCenterPicture = (value) => {
    return {
        type: SET_CENTER_PICTURE,
        payload: value
    };
};

export const setPublications = (publications) => {
    return {
        type: SET_PUBLICATIONS,
        payload: publications
    };
};

export const addPublication = (publication) => {
    return {
        type: ADD_PUBLICATION,
        payload: publication
    };
};

export const setCurrentPublication = (value) => {
    return {
        type: SET_CURRENT_PUBLICATION,
        payload: value
    };
};

export const resetProfileInfo = () => {
    return {
        type: RESET_PROFILE_INFO
    };
};
