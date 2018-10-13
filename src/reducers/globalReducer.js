import {
    DISPLAY_ALERT,
    DISMISS_ALERT,

    SET_STATISTICS_IS_LOAD,
    SET_DISPLAY_CONFIGURATION_IS_LOAD,
    SET_HOME_SUMMARY_IS_LOAD,
    SET_CUSTOM_PROGRAMS_IS_LOAD,
    SET_MODULES_IS_LOAD,
    SET_MODULE_STATES_IS_LOAD,
    SET_CUSTOM_PROGRAMS_ACTIVITIES_IS_LOAD,
    SET_FEEDBACKS_IS_LOAD,
    SET_FEEDBACKS_STATUS_IS_LOAD,
    SET_EVENTS_IS_LOAD,
    SET_MANAGER_PROFILE_IS_LOAD,
    SET_CENTER_PROFILE_IS_LOAD,
    SET_CENTER_PICTURE_IS_LOAD,
    SET_MANAGER_PICTURE_IS_LOAD,
    SET_PUBLICATIONS_IS_LOAD,
    SET_ALBUM_IS_LOAD,

    SET_STATISTICS_IS_NOT_LOAD,
    SET_DISPLAY_CONFIGURATION_IS_NOT_LOAD,
    SET_HOME_SUMMARY_IS_NOT_LOAD,
    SET_CUSTOM_PROGRAMS_IS_NOT_LOAD,
    SET_MODULES_IS_NOT_LOAD,
    SET_MODULE_STATES_IS_NOT_LOAD,
    SET_CUSTOM_PROGRAMS_ACTIVITIES_IS_NOT_LOAD,
    SET_FEEDBACKS_IS_NOT_LOAD,
    SET_FEEDBACKS_STATUS_IS_NOT_LOAD,
    SET_EVENTS_IS_NOT_LOAD,
    SET_MANAGER_PROFILE_IS_NOT_LOAD,
    SET_CENTER_PROFILE_IS_NOT_LOAD,
    SET_CENTER_PICTURE_IS_NOT_LOAD,
    SET_MANAGER_PICTURE_IS_NOT_LOAD,
    SET_PUBLICATIONS_IS_NOT_LOAD,
    SET_ALBUM_IS_NOT_LOAD
} from "../actions/types"

const initialState = {
    showAlert: false,
    alertTitle: "",
    alertText: "",

    statistics_is_load: false,
    display_configuration_is_load: false,
    home_summary_is_load: false,
    custom_programs_is_load: false,
    modules_is_load: false,
    module_states_is_load: false,
    custom_programs_activities_is_load: false,
    feedbacks_is_load: false,
    feedbacks_status_is_load: false,
    events_is_load: false,
    manager_profile_is_load: false,
    center_profile_is_load: false,
    center_picture_is_load: false,
    manager_picture_is_load: false,
    publications_is_load: false,
    album_is_load: false
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

        case SET_STATISTICS_IS_LOAD:
            return {
                ...state,
                statistics_is_load: true
            };
        case SET_DISPLAY_CONFIGURATION_IS_LOAD:
            return {
                ...state,
                display_configuration_is_load: true
            };
        case SET_HOME_SUMMARY_IS_LOAD:
            return {
                ...state,
                home_summary_is_load: true
            };
        case SET_CUSTOM_PROGRAMS_IS_LOAD:
            return {
                ...state,
                custom_programs_is_load: true
            };
        case SET_MODULES_IS_LOAD:
            return {
                ...state,
                modules_is_load: true
            };
        case SET_MODULE_STATES_IS_LOAD:
            return {
                ...state,
                module_states_is_load: true
            };
        case SET_CUSTOM_PROGRAMS_ACTIVITIES_IS_LOAD:
            return {
                ...state,
                custom_programs_activities_is_load: true
            };
        case SET_FEEDBACKS_IS_LOAD:
            return {
                ...state,
                feedbacks_is_load: true
            };
        case SET_FEEDBACKS_STATUS_IS_LOAD:
            return {
                ...state,
                feedbacks_status_is_load: true
            };
        case SET_EVENTS_IS_LOAD:
            return {
                ...state,
                events_is_load: true
            };
        case SET_MANAGER_PROFILE_IS_LOAD:
            return {
                ...state,
                manager_profile_is_load: true
            };
        case SET_CENTER_PROFILE_IS_LOAD:
            return {
                ...state,
                center_profile_is_load: true
            };
        case SET_CENTER_PICTURE_IS_LOAD:
            return {
                ...state,
                center_picture_is_load: true
            };
        case SET_MANAGER_PICTURE_IS_LOAD:
            return {
                ...state,
                manager_picture_is_load: true
            };
        case SET_PUBLICATIONS_IS_LOAD:
            return {
                ...state,
                publications_is_load: true
            };
        case SET_ALBUM_IS_LOAD:
            return {
                ...state,
                album_is_load: true
            };
        case SET_STATISTICS_IS_NOT_LOAD:
            return {
                ...state,
                statistics_is_load: false
            };
        case SET_DISPLAY_CONFIGURATION_IS_NOT_LOAD:
            return {
                ...state,
                display_configuration_is_load: false
            };
        case SET_HOME_SUMMARY_IS_NOT_LOAD:
            return {
                ...state,
                home_summary_is_load: false
            };
        case SET_CUSTOM_PROGRAMS_IS_NOT_LOAD:
            return {
                ...state,
                custom_programs_is_load: false
            };
        case SET_MODULES_IS_NOT_LOAD:
            return {
                ...state,
                modules_is_load: false
            };
        case SET_MODULE_STATES_IS_NOT_LOAD:
            return {
                ...state,
                module_states_is_load: false
            };
        case SET_CUSTOM_PROGRAMS_ACTIVITIES_IS_NOT_LOAD:
            return {
                ...state,
                custom_programs_activities_is_load: false
            };
        case SET_FEEDBACKS_IS_NOT_LOAD:
            return {
                ...state,
                feedbacks_is_load: false
            };
        case SET_FEEDBACKS_STATUS_IS_NOT_LOAD:
            return {
                ...state,
                feedbacks_status_is_load: false
            };
        case SET_EVENTS_IS_NOT_LOAD:
            return {
                ...state,
                events_is_load: false
            };
        case SET_MANAGER_PROFILE_IS_NOT_LOAD:
            return {
                ...state,
                manager_profile_is_load: false
            };
        case SET_CENTER_PROFILE_IS_NOT_LOAD:
            return {
                ...state,
                center_profile_is_load: false
            };
        case SET_CENTER_PICTURE_IS_NOT_LOAD:
            return {
                ...state,
                center_picture_is_load: false
            };
        case SET_MANAGER_PICTURE_IS_NOT_LOAD:
            return {
                ...state,
                manager_picture_is_load: false
            };
        case SET_PUBLICATIONS_IS_NOT_LOAD:
            return {
                ...state,
                publications_is_load: false
            };
        case SET_ALBUM_IS_NOT_LOAD:
            return {
                ...state,
                album_is_load: false
            };
        default:
            return state;
    }
}