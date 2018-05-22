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
} from "../actions/types"

const initialState = {
    first_name: "",
    last_name: "",
    phone : "",
    email: "",
    password: "",
    confirm_password: "",
    name: "",
    description: "",
    address: "",
    address_second: "",
    zip_code: "",
    city: "",
    center_phone: "",
    showAlert: false,
    alertText: "",
    alertTitle: ""
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
        case SET_FIRST_NAME:
            return {
                ...state,
                first_name: action.payload
            };
        case SET_LAST_NAME:
            return {
                ...state,
                last_name: action.payload
            };
        case SET_PHONE:
            return {
                ...state,
                phone: action.payload
            };
        case SET_EMAIL:
            return {
                ...state,
                email: action.payload
            };
        case SET_PASSWORD:
            return {
                ...state,
                password: action.payload
            };
        case SET_CONFIRM_PASSWORD:
            return {
                ...state,
                confirm_password: action.payload
            };
        case SET_NAME:
            return {
                ...state,
                name: action.payload
            };
        case SET_DESCRIPTION:
            return {
                ...state,
                description: action.payload
            };
        case SET_ADDRESS:
            return {
                ...state,
                address: action.payload
            };
        case SET_ADDRESS_SECOND:
            return {
                ...state,
                address_second: action.payload
            };
        case SET_ZIP_CODE:
            return {
                ...state,
                zip_code: action.payload
            };
        case SET_CITY:
            return {
                ...state,
                city: action.payload
            };
        case SET_CENTER_PHONE:
            return {
                ...state,
                center_phone: action.payload
            };
        case RESET_REGISTER_INFO:
            return {
                ...state,
                first_name: "",
                last_name: "",
                phone : "",
                email: "",
                password: "",
                confirm_password: "",
                name: "",
                description: "",
                address: "",
                address_second: "",
                zip_code: "",
                city: "",
                center_phone: ""
            };
        default:
            return state;
    }
}