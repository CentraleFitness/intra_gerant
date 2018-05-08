import {
    SET_ACTIVITIES,
    SET_CUSTOM_PROGRAMS,
    SET_INITIAL_CUSTOM_PROGRAMS,
    ADD_CUSTOM_PROGRAM,
    DELETE_CUSTOM_PROGRAM,
    UPDATE_CUSTOM_PROGRAM
} from "./types"

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

export const deleteCustomProgram = (id) => {
    return {
        type: DELETE_CUSTOM_PROGRAM,
        payload: id
    };
};
