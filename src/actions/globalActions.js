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


export const setStatisticsIsLoad = () => {
    return {
        type: SET_STATISTICS_IS_LOAD
    };
};

export const setDisplayConfigurationIsLoad = () => {
    return {
        type: SET_DISPLAY_CONFIGURATION_IS_LOAD
    };
};


export const setHomeSummaryIsLoad = () => {
    return {
        type: SET_HOME_SUMMARY_IS_LOAD
    };
};


export const setCustomProgramsIsLoad = () => {
    return {
        type: SET_CUSTOM_PROGRAMS_IS_LOAD
    };
};

export const setModulesIsLoad = () => {
    return {
        type: SET_MODULES_IS_LOAD
    };
};

export const setModuleStatesIsLoad = () => {
    return {
        type: SET_MODULE_STATES_IS_LOAD
    };
};

export const setCustomProgramsActivitiesIsLoad = () => {
    return {
        type: SET_CUSTOM_PROGRAMS_ACTIVITIES_IS_LOAD
    };
};


export const setFeedbacksIsLoad = () => {
    return {
        type: SET_FEEDBACKS_IS_LOAD
    };
};

export const setFeedbacksStatusIsLoad = () => {
    return {
        type: SET_FEEDBACKS_STATUS_IS_LOAD
    };
};

export const setEventsIsLoad = () => {
    return {
        type: SET_EVENTS_IS_LOAD
    };
};

export const setManagerProfileIsLoad = () => {
    return {
        type: SET_MANAGER_PROFILE_IS_LOAD
    };
};

export const setCenterProfileIsLoad = () => {
    return {
        type: SET_CENTER_PROFILE_IS_LOAD
    };
};

export const setCenterPictureIsLoad = () => {
    return {
        type: SET_CENTER_PICTURE_IS_LOAD
    };
};

export const setManagerPictureIsLoad = () => {
    return {
        type: SET_MANAGER_PICTURE_IS_LOAD
    };
};

export const setPublicationsIsLoad = () => {
    return {
        type: SET_PUBLICATIONS_IS_LOAD
    };
};

export const setAlbumIsLoad = () => {
    return {
        type: SET_ALBUM_IS_LOAD
    };
};

export const setStatisticsIsNotLoad = () => {
    return {
        type: SET_STATISTICS_IS_NOT_LOAD
    };
};

export const setDisplayConfigurationIsNotLoad = () => {
    return {
        type: SET_DISPLAY_CONFIGURATION_IS_NOT_LOAD
    };
};

export const setHomeSummaryIsNotLoad = () => {
    return {
        type: SET_HOME_SUMMARY_IS_NOT_LOAD
    };
};

export const setCustomProgramsIsNotLoad = () => {
    return {
        type: SET_CUSTOM_PROGRAMS_IS_NOT_LOAD
    };
};

export const setModulesIsNotLoad = () => {
    return {
        type: SET_MODULES_IS_NOT_LOAD
    };
};

export const setModuleStatesIsNotLoad = () => {
    return {
        type: SET_MODULE_STATES_IS_NOT_LOAD
    };
};

export const setCustomProgramsActivitiesIsNotLoad = () => {
    return {
        type: SET_CUSTOM_PROGRAMS_ACTIVITIES_IS_NOT_LOAD
    };
};

export const setFeedbacksIsNotLoad = () => {
    return {
        type: SET_FEEDBACKS_IS_NOT_LOAD
    };
};

export const setFeedbacksStatusIsNotLoad = () => {
    return {
        type: SET_FEEDBACKS_STATUS_IS_NOT_LOAD
    };
};

export const setEventsIsNotLoad = () => {
    return {
        type: SET_EVENTS_IS_NOT_LOAD
    };
};

export const setManagerProfileIsNotLoad = () => {
    return {
        type: SET_MANAGER_PROFILE_IS_NOT_LOAD
    };
};

export const setCenterProfileIsNotLoad = () => {
    return {
        type: SET_CENTER_PROFILE_IS_NOT_LOAD
    };
};

export const setCenterPictureIsNotLoad = () => {
    return {
        type: SET_CENTER_PICTURE_IS_NOT_LOAD
    };
};

export const setManagerPictureIsNotLoad = () => {
    return {
        type: SET_MANAGER_PICTURE_IS_NOT_LOAD
    };
};

export const setPublicationsIsNotLoad = () => {
    return {
        type: SET_PUBLICATIONS_IS_NOT_LOAD
    };
};

export const setAlbumIsNotLoad = () => {
    return {
        type: SET_ALBUM_IS_NOT_LOAD
    };
};