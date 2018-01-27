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
} from "../actions/types"

const initialState = {
    manager_first_name: "",
    manager_last_name: "",
    manager_email: "",
    manager_phone: "",
    center_name: "",
    center_address: "",
    center_address2: "",
    center_zip_code: "",
    center_city: "",
    center_phone: "",
    center_description: "",
    center_nb_subscribers: "",
    center_nb_followers: "",
    manager_keep_first_name: "",
    manager_keep_last_name: "",
    manager_keep_email: "",
    manager_keep_phone: "",
    center_keep_name: "",
    center_keep_address: "",
    center_keep_address2: "",
    center_keep_zip_code: "",
    center_keep_city: "",
    center_keep_phone: "",
    center_keep_description: "",
    showAlert: false,
    alertTitle: "",
    alertText: "",
    showManagerPictureModal: false,
    showCenterPictureModal: false,
    manager_picture_preview: "/img/folder.svg",
    center_picture_preview: "/img/folder.svg",
    manager_picture: "",
    center_picture: "",
    publications: [],
    current_publication: ""
};

export default (state = initialState, action) => {
    switch (action.type) {
        case DISPLAY_ALERT:
            return {
                ...state,
                showAlert: true,
                alertTitle: action.payload.alertTitle,
                alertText: action.payload.alertText
            };
        case DISMISS_ALERT:
            return {
                ...state,
                showAlert: false,
                alertTitle: "",
                alertText: ""
            };
        case DISPLAY_MANAGER_PICTURE_MODAL:
            return {
                ...state,
                showManagerPictureModal: true
            };
        case DISMISS_MANAGER_PICTURE_MODAL:
            return {
                ...state,
                showManagerPictureModal: false
            };
        case DISPLAY_CENTER_PICTURE_MODAL:
            return {
                ...state,
                showCenterPictureModal: true
            };
        case DISMISS_CENTER_PICTURE_MODAL:
            return {
                ...state,
                showCenterPictureModal: false
            };
        case SET_MANAGER_INFO:
            return {
                ...state,
                manager_first_name: action.payload.manager_first_name,
                manager_last_name: action.payload.manager_last_name,
                manager_email: action.payload.manager_email,
                manager_phone: action.payload.manager_phone,
            };
        case SET_CENTER_INFO:
            return {
                ...state,
                center_name: action.payload.center_name,
                center_description: action.payload.center_description,
                center_address: action.payload.center_address,
                center_address2: action.payload.center_address2,
                center_zip_code: action.payload.center_zip_code,
                center_city: action.payload.center_city,
                center_phone: action.payload.center_phone
            };
        case RESET_MANAGER_CENTER_INFO:
            return {
                ...state,
                manager_first_name: state.manager_keep_first_name,
                manager_last_name: state.manager_keep_last_name,
                manager_email: state.manager_keep_email,
                manager_phone: state.manager_keep_phone,
                center_name: state.center_keep_name,
                center_address: state.center_keep_address,
                center_address2: state.center_keep_address2,
                center_zip_code: state.center_keep_zip_code,
                center_city: state.center_keep_city,
                center_phone: state.center_keep_phone,
                center_description: state.center_keep_description
            };
        case SET_MANAGER_KEEP_INFO:
            return {
                ...state,
                manager_keep_first_name: state.manager_first_name,
                manager_keep_last_name: state.manager_last_name,
                manager_keep_email: state.manager_email,
                manager_keep_phone: state.manager_phone
            };
        case SET_CENTER_KEEP_INFO:
            return {
                ...state,
                center_keep_name: state.center_name,
                center_keep_address: state.center_address,
                center_keep_address2: state.center_address2,
                center_keep_zip_code: state.center_zip_code,
                center_keep_city: state.center_city,
                center_keep_phone: state.center_phone,
                center_keep_description: state.center_description
            };
        case SET_FIRST_NAME:
            return {
                ...state,
                manager_first_name: action.payload
            };
        case SET_LAST_NAME:
            return {
                ...state,
                manager_last_name: action.payload
            };
        case SET_PHONE:
            return {
                ...state,
                manager_phone: action.payload
            };
        case SET_EMAIL:
            return {
                ...state,
                manager_email: action.payload
            };
        case SET_NAME:
            return {
                ...state,
                center_name: action.payload
            };
        case SET_DESCRIPTION:
            return {
                ...state,
                center_description: action.payload
            };
        case SET_ADDRESS:
            return {
                ...state,
                center_address: action.payload
            };
        case SET_ADDRESS_SECOND:
            return {
                ...state,
                center_address_second: action.payload
            };
        case SET_ZIP_CODE:
            return {
                ...state,
                center_zip_code: action.payload
            };
        case SET_CITY:
            return {
                ...state,
                center_city: action.payload
            };
        case SET_CENTER_PHONE:
            return {
                ...state,
                center_phone: action.payload
            };
        case SET_MANAGER_PICTURE_PREVIEW:
            return {
                ...state,
                manager_picture_preview: action.payload
            };
        case SET_CENTER_PICTURE_PREVIEW:
            return {
                ...state,
                center_picture_preview: action.payload
            };
        case SET_MANAGER_PICTURE:
            return {
                ...state,
                manager_picture: action.payload
            };
        case SET_CENTER_PICTURE:
            return {
                ...state,
                center_picture: action.payload
            };
        case SET_PUBLICATIONS:
            return {
                ...state,
                publications: action.payload
            };
        case ADD_PUBLICATION:
            let tmp = state.publications;
            tmp.unshift(action.payload);
            return {
                ...state,
                publications: tmp
            };
        case SET_CURRENT_PUBLICATION:
            return {
                ...state,
                current_publication: action.payload
            };
        case RESET_PROFILE_INFO:
            return {
                ...state,
                manager_first_name: "",
                manager_last_name: "",
                manager_email: "",
                manager_phone: "",
                center_name: "",
                center_address: "",
                center_address2: "",
                center_zip_code: "",
                center_city: "",
                center_phone: "",
                center_description: "",
                center_nb_subscribers: "",
                center_nb_followers: "",
                manager_keep_first_name: "",
                manager_keep_last_name: "",
                manager_keep_email: "",
                manager_keep_phone: "",
                center_keep_name: "",
                center_keep_address: "",
                center_keep_address2: "",
                center_keep_zip_code: "",
                center_keep_city: "",
                center_keep_phone: "",
                center_keep_description: "",
                manager_picture_preview: "",
                center_picture_preview: "",
                manager_picture: "",
                center_picture: "",
                publications: [],
                current_publication: ""
            };
        default:
            return state;
    }
}