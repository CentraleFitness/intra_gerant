import {
    DISPLAY_ALERT,
    DISMISS_ALERT,
    DISPLAY_DELETE_CONFIRM,
    DISMISS_DELETE_CONFIRM,
    SET_EVENTS,
    SET_SELECTED_EVENTS,
    ADD_EVENT,
    DELETE_EVENT,
    UPDATE_EVENT,
    SET_INITIAL_EVENTS,
    SET_FILTER_EVENTS_KEYWORDS,
    SET_FILTER_EVENTS_START_DATE,
    SET_FILTER_EVENTS_END_DATE,
    SET_FILTER_EVENTS_STATUS,
    SET_FILTER_EVENTS_SUBSCRIBERS_SELECT,
    SET_FILTER_EVENTS_NUMBER_SUBSCRIBERS,
    RESET_FILTERS,
    DISPLAY_EVENT_MODAL,
    DISPLAY_EVENT_EDIT_MODAL,
    DISMISS_EVENT_MODAL,
    SET_EVENT_MODAL_CURRENT_TITLE,
    SET_EVENT_MODAL_CURRENT_DESCRIPTION,
    SET_EVENT_MODAL_CURRENT_START_DATE,
    SET_EVENT_MODAL_CURRENT_END_DATE,
    SET_EVENT_MODAL_CURRENT_PICTURE,
    SET_DELETION_CAUSE,
    SET_EVENT_LAST_POST
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

export const displayDeleteConfirm = (id) => {
    return {
        type: DISPLAY_DELETE_CONFIRM,
        payload: id
    };
};

export const dismissDeleteConfirm = () => {
    return {
        type: DISMISS_DELETE_CONFIRM
    };
};

export const setEvents = (events) => {
    return {
        type: SET_EVENTS,
        payload: events
    };
};

export const setSelectedEvents = (events) => {
    return {
        type: SET_SELECTED_EVENTS,
        payload: events
    };
};

export const setInitialEvents = (events) => {
    return {
        type: SET_INITIAL_EVENTS,
        payload: events
    };
};

export const addEvent = (event) => {
    return {
        type: ADD_EVENT,
        payload: event
    };
};

export const updateEvent = (event) => {
    return {
        type: UPDATE_EVENT,
        payload: event
    };
};

export const deleteEvent = (id) => {
    return {
        type: DELETE_EVENT,
        payload: id
    };
};

export const setFilterEventsKeywords = (value) => {
    return {
        type: SET_FILTER_EVENTS_KEYWORDS,
        payload: value
    };
};

export const setFilterEventsStartDate = (value) => {
    return {
        type: SET_FILTER_EVENTS_START_DATE,
        payload: value
    };
};

export const setFilterEventsEndDate = (value) => {
    return {
        type: SET_FILTER_EVENTS_END_DATE,
        payload: value
    };
};

export const setFilterEventsStatus = (value) => {
    return {
        type: SET_FILTER_EVENTS_STATUS,
        payload: value
    };
};

export const setFilterEventsSubscribersSelect = (value) => {
    return {
        type: SET_FILTER_EVENTS_SUBSCRIBERS_SELECT,
        payload: value
    };
};

export const setFilterEventsNumberSubscribers = (value) => {
    return {
        type: SET_FILTER_EVENTS_NUMBER_SUBSCRIBERS,
        payload: value
    };
};

export const resetFilters = () => {
    return {
        type: RESET_FILTERS
    };
};

export const displayEventModal = () => {
    return {
        type: DISPLAY_EVENT_MODAL
    };
};

export const displayEventEditModal = (event) => {
    return {
        type: DISPLAY_EVENT_EDIT_MODAL,
        payload: event
    };
};

export const dismissEventModal = () => {
    return {
        type: DISMISS_EVENT_MODAL
    };
};

export const setEventModalCurrentTitle = (value) => {
    return {
        type: SET_EVENT_MODAL_CURRENT_TITLE,
        payload: value
    };
};

export const setEventModalCurrentDescription = (value) => {
    return {
        type: SET_EVENT_MODAL_CURRENT_DESCRIPTION,
        payload: value
    };
};

export const setEventModalCurrentStartDate = (value) => {
    return {
        type: SET_EVENT_MODAL_CURRENT_START_DATE,
        payload: value
    };
};

export const setEventModalCurrentEndDate = (value) => {
    return {
        type: SET_EVENT_MODAL_CURRENT_END_DATE,
        payload: value
    };
};

export const setEventModalCurrentPicture = (value) => {
    return {
        type: SET_EVENT_MODAL_CURRENT_PICTURE,
        payload: value
    };
};

export const setDeletionCause = (value) => {
    return {
        type: SET_DELETION_CAUSE,
        payload: value
    };
};

export const setEventLastPost = (item) => {
    return {
        type: SET_EVENT_LAST_POST,
        payload: item
    };
};