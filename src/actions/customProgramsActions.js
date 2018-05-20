import {
    DISPLAY_ALERT,
    DISMISS_ALERT,
    SET_ACTIVITIES,
    SET_CUSTOM_PROGRAMS,
    SET_INITIAL_CUSTOM_PROGRAMS,
    ADD_CUSTOM_PROGRAM,
    DELETE_CUSTOM_PROGRAM,
    UPDATE_CUSTOM_PROGRAM,
    UPDATE_CUSTOM_PROGRAM_AVAILABILITY,
    SET_CUSTOM_PROGRAMS_AVAILABILITIES,
    RESET_CUSTOM_PROGRAMS_AVAILABILITIES,
    DISPLAY_CUSTOM_PROGRAM_MODAL,
    DISPLAY_CUSTOM_PROGRAM_EDIT_MODAL,
    DISMISS_CUSTOM_PROGRAM_MODAL,
    SET_CUSTOM_PROGRAM_MODAL_CURRENT_NAME,
    SET_CUSTOM_PROGRAM_MODAL_CURRENT_PICTURE,
    SET_CUSTOM_PROGRAM_MODAL_CURRENT_NB_ACTIVITIES,
    SET_CUSTOM_PROGRAM_MODAL_CURRENT_TOTAL_TIME,
    SET_CUSTOM_PROGRAM_MODAL_CURRENT_ACTIVITIES,
    ADD_TO_CUSTOME_PROGRAMME_MODAL_CURRENT_ACTIVITIES,
    DELETE_TO_CUSTOME_PROGRAMME_MODAL_CURRENT_ACTIVITIES,
    SET_CUSTOM_PROGRAM_MODAL_CURRENT_AVAILABLE,
    DISPLAY_DELETE_CONFIRM,
    DISMISS_DELETE_CONFIRM,

    SET_FILTER_CUSTOM_PROGRAM_KEYWORDS,
    SET_FILTER_CUSTOM_PROGRAM_NUMBER_ACTIVITIES,
    SET_FILTER_CUSTOM_PROGRAM_TOTAL_DURATION,
    SET_FILTER_CUSTOM_PROGRAM_AVAILABLE,
    SET_FILTER_CUSTOM_PROGRAM_UNAVAILABLE,
    RESET_FILTER_CUSTOM_PROGRAM
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

export const setActivities = (activities) => {
    return {
        type: SET_ACTIVITIES,
        payload: activities
    };
};

export const setCustomPrograms = (custom_programs) => {
    return {
        type: SET_CUSTOM_PROGRAMS,
        payload: custom_programs
    };
};

export const setInitialCustomPrograms = (custom_programs) => {
    return {
        type: SET_INITIAL_CUSTOM_PROGRAMS,
        payload: custom_programs
    };
};

export const addCustomProgram = (custom_program) => {
    return {
        type: ADD_CUSTOM_PROGRAM,
        payload: custom_program
    };
};

export const updateCustomProgram = (custom_program) => {
    return {
        type: UPDATE_CUSTOM_PROGRAM,
        payload: custom_program
    };
};

export const updateCustomProgramAvailability = (info) => {
    return {
        type: UPDATE_CUSTOM_PROGRAM_AVAILABILITY,
        payload: info
    };
};

export const setCustomProgramsAvailabilities = (custom_programs) => {
    return {
        type: SET_CUSTOM_PROGRAMS_AVAILABILITIES,
        payload: custom_programs
    };
};

export const resetCustomProgramsAvailabilities = (info) => {
    return {
        type: RESET_CUSTOM_PROGRAMS_AVAILABILITIES,
        payload: info
    };
};

export const deleteCustomProgram = (id) => {
    return {
        type: DELETE_CUSTOM_PROGRAM,
        payload: id
    };
};

export const displayCustomProgramModal = () => {
    return {
        type: DISPLAY_CUSTOM_PROGRAM_MODAL
    };
};

export const displayCustomProgramEditModal = (program) => {
    return {
        type: DISPLAY_CUSTOM_PROGRAM_EDIT_MODAL,
        payload: program
    };
};


export const dismissCustomProgramModal = () => {
    return {
        type: DISMISS_CUSTOM_PROGRAM_MODAL
    };
};

export const setCustomProgramModalCurrentName = (value) => {
    return {
        type: SET_CUSTOM_PROGRAM_MODAL_CURRENT_NAME,
        payload: value
    };
};

export const setCustomProgramModalCurrentPicture = (value) => {
    return {
        type: SET_CUSTOM_PROGRAM_MODAL_CURRENT_PICTURE,
        payload: value
    };
};

export const setCustomProgramModalCurrentNbActivities = (value) => {
    return {
        type: SET_CUSTOM_PROGRAM_MODAL_CURRENT_NB_ACTIVITIES,
        payload: value
    };
};

export const setCustomProgramModalCurrentTotalTime = (value) => {
    return {
        type: SET_CUSTOM_PROGRAM_MODAL_CURRENT_TOTAL_TIME,
        payload: value
    };
};

export const setCustomProgramModalCurrentActivities = (value) => {
    return {
        type: SET_CUSTOM_PROGRAM_MODAL_CURRENT_ACTIVITIES,
        payload: value
    };
};

export const addToCurrentActivities = (activity) => {
    return {
        type: ADD_TO_CUSTOME_PROGRAMME_MODAL_CURRENT_ACTIVITIES,
        payload: activity
    };
};

export const deleteToCurrentActivities = (activity) => {
    return {
        type: DELETE_TO_CUSTOME_PROGRAMME_MODAL_CURRENT_ACTIVITIES,
        payload: activity
    };
};

export const setCustomProgramModalCurrentAvailable = (value) => {
    return {
        type: SET_CUSTOM_PROGRAM_MODAL_CURRENT_AVAILABLE,
        payload: value
    };
};

export const displayCustomProgramDeleteConfirm = (value) => {
    return {
        type: DISPLAY_DELETE_CONFIRM,
        payload: value
    };
};


export const dismissCustomProgramDeleteConfirm = () => {
    return {
        type: DISMISS_DELETE_CONFIRM
    };
};

export const setFilterCustomProgramKeywords = (value) => {
    return {
        type: SET_FILTER_CUSTOM_PROGRAM_KEYWORDS,
        payload: value
    };
};


export const setFilterCustomProgramNumberActivities = (value) => {
    return {
        type: SET_FILTER_CUSTOM_PROGRAM_NUMBER_ACTIVITIES,
        payload: value
    };
};


export const setFilterCustomProgramTotalDuration = (value) => {
    return {
        type: SET_FILTER_CUSTOM_PROGRAM_TOTAL_DURATION,
        payload: value
    };
};


export const setFilterCustomProgramAvailable = (value) => {
    return {
        type: SET_FILTER_CUSTOM_PROGRAM_AVAILABLE,
        payload: value
    };
};


export const setFilterCustomProgramUnavailable = (value) => {
    return {
        type: SET_FILTER_CUSTOM_PROGRAM_UNAVAILABLE,
        payload: value
    };
};

export const resetFilterCustomProgram = () => {
    return {
        type: RESET_FILTER_CUSTOM_PROGRAM
    };
};