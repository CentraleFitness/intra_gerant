import {
    SET_CUSTOM_PROGRAMS_IS_LOAD,
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

    SET_CUSTOM_PROGRAMS_IS_NOT_LOAD,
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
    custom_programs_is_load: false,
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
        case SET_CUSTOM_PROGRAMS_IS_LOAD:
            return {
                ...state,
                custom_programs_is_load: true
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
        case SET_CUSTOM_PROGRAMS_IS_NOT_LOAD:
            return {
                ...state,
                custom_programs_is_load: false
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