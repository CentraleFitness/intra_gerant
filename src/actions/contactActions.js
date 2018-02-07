import {
    DISPLAY_ALERT,
    DISMISS_ALERT,
    SET_FEEDBACKS,
    SET_INITIAL_FEEDBACKS,
    ADD_FEEDBACK,
    SET_STATUS,
    SET_FILTER_KEYWORDS,
    SET_FILTER_STATUS,
    SET_FEEDBACK_TITLE,
    SET_FEEDBACK_DESCRIPTION,
    DISPLAY_FEEDBACK_MODAL,
    DISMISS_FEEDBACK_MODAL,
    DISPLAY_FEEDBACK_EDIT_MODAL
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

export const setFeedbacks = (feedbacks) => {
    return {
        type: SET_FEEDBACKS,
        payload: feedbacks
    };
};

export const setInitialFeedbacks = (feedbacks) => {
    return {
        type: SET_INITIAL_FEEDBACKS,
        payload: feedbacks
    };
};

export const addFeedback = (feedback) => {
    return {
        type: ADD_FEEDBACK,
        payload: feedback
    };
};

export const setStatus = (status) => {
    return {
        type: SET_STATUS,
        payload: status
    };
};

export const setFilterKeywords = (value) => {
    return {
        type: SET_FILTER_KEYWORDS,
        payload: value
    };
};

export const setFilterStatus = (value) => {
    return {
        type: SET_FILTER_STATUS,
        payload: value
    };
};

export const setFeedbackTitle = (value) => {
    return {
        type: SET_FEEDBACK_TITLE,
        payload: value
    };
};

export const setFeedbackDescription = (value) => {
    return {
        type: SET_FEEDBACK_DESCRIPTION,
        payload: value
    };
};

export const displayFeedbackModal = (feedbackModalInfo) => {
    return {
        type: DISPLAY_FEEDBACK_MODAL,
        payload: feedbackModalInfo
    };
};

export const dismissFeedbackModal = () => {
    return {
        type: DISMISS_FEEDBACK_MODAL
    };
};

export const displayFeedbackEditModal = (feedbackModalInfo) => {
    return {
        type: DISPLAY_FEEDBACK_EDIT_MODAL,
        payload: feedbackModalInfo
    };
};