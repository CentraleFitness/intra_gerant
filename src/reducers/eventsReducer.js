import {
    DISPLAY_ALERT,
    DISMISS_ALERT,
    DISPLAY_DELETE_CONFIRM,
    DISMISS_DELETE_CONFIRM,
    SET_EVENTS,
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
    SET_DELETION_CAUSE
} from "../actions/types"

const initialState = {
    events: [],
    inital_events: [],
    filter_keywords: "",
    filter_start_date: "",
    filter_end_date: "",
    filter_status: [1, 2],
    initial_filter_status: [1, 2],
    filter_subscribers_select: "superieur",
    filter_number_subscribers: 0,
    showAlert: false,
    alertTitle: "",
    alertText: "",
    showEventModal: false,

    showDeleteConfirm: false,
    delete_id: "",
    deletion_cause: "",

    current_id: "",
    current_picture: "",
    current_title: "",
    current_description: "",
    current_start_date: "",
    current_end_date: "",
    current_update_date: "",

    keep_current_picture: "",
    keep_current_title: "",
    keep_current_description: "",
    keep_current_start_date: "",
    keep_current_end_date: ""
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
        case DISPLAY_DELETE_CONFIRM:
            return {
                ...state,
                showDeleteConfirm: true,
                deletion_cause: "",
                delete_id: action.payload
            };
        case DISMISS_DELETE_CONFIRM:
            return {
                ...state,
                showDeleteConfirm: false,
                deletion_cause: "",
                delete_id: ""
            };
        case SET_EVENTS:
            return {
                ...state,
                events: action.payload
            };
        case SET_INITIAL_EVENTS:
            return {
                ...state,
                initial_events: action.payload
            };
        case ADD_EVENT:
            let tmp_events = state.initial_events;
            tmp_events.unshift(action.payload);
            return {
                ...state,
                events: tmp_events,
                initial_events: tmp_events
            };
        case UPDATE_EVENT:
            let tmp_events_update = state.events;
            let index = tmp_events_update.findIndex(function (item) {
                return item._id === action.payload._id;
            });
            tmp_events_update[index].title = action.payload.title;
            tmp_events_update[index].description = action.payload.description;
            tmp_events_update[index].start_date = action.payload.start_date;
            tmp_events_update[index].end_date = action.payload.end_date;
            tmp_events_update[index].update_date = action.payload.update_date;
            tmp_events_update[index].picture = action.payload.picture;
            return {
                ...state,
                events: tmp_events_update,
                initial_events: tmp_events_update
            };
        case DELETE_EVENT:
            let tmp_events_delete = state.initial_events;
            let index_delete = tmp_events_delete.findIndex(function (item) {
                return item._id === action.payload;
            });
            delete tmp_events_delete[index_delete];
            return {
                ...state,
                events: tmp_events_delete,
                initial_events: tmp_events_delete
            };
        case SET_FILTER_EVENTS_KEYWORDS:
            return {
                ...state,
                filter_keywords: action.payload
            };
        case SET_FILTER_EVENTS_START_DATE:
            return {
                ...state,
                filter_start_date: action.payload
            };
        case SET_FILTER_EVENTS_END_DATE:
            return {
                ...state,
                filter_end_date: action.payload
            };
        case SET_FILTER_EVENTS_STATUS:
            return {
                ...state,
                filter_status: action.payload
            };
        case SET_FILTER_EVENTS_SUBSCRIBERS_SELECT:
            return {
                ...state,
                filter_subscribers_select: action.payload
            };
        case SET_FILTER_EVENTS_NUMBER_SUBSCRIBERS:
            return {
                ...state,
                filter_number_subscribers: action.payload
            };
        case RESET_FILTERS:
            return {
                ...state,
                filter_keywords: initialState.filter_keywords,
                filter_start_date: initialState.filter_start_date,
                filter_end_date: initialState.filter_end_date,
                filter_status: initialState.filter_status,
                filter_subscribers_select: initialState.filter_subscribers_select,
                filter_number_subscribers: initialState.filter_number_subscribers
            };
        case DISPLAY_EVENT_MODAL:
            return {
                ...state,
                showEventModal: true,
                current_id: "",
                current_picture: "",
                current_title: "",
                current_description: "",
                current_start_date: "",
                current_end_date: "",
                current_update_date: "",

                keep_current_picture: "",
                keep_current_title: "",
                keep_current_description: "",
                keep_current_start_date: "",
                keep_current_end_date: ""
            };
        case DISPLAY_EVENT_EDIT_MODAL:
            return {
                ...state,
                showEventModal: true,
                current_id: action.payload.current_id,
                current_picture: action.payload.current_picture,
                current_title: action.payload.current_title,
                current_description: action.payload.current_description,
                current_start_date: action.payload.current_start_date,
                current_end_date: action.payload.current_end_date,
                current_update_date: action.payload.current_update_date,

                keep_current_picture: action.payload.current_picture,
                keep_current_title: action.payload.current_title,
                keep_current_description: action.payload.current_description,
                keep_current_start_date: action.payload.current_start_date,
                keep_current_end_date: action.payload.current_end_date
            };
        case DISMISS_EVENT_MODAL:
            return {
                ...state,
                showEventModal: false,
                current_id: "",
                current_picture: "",
                current_title: "",
                current_description: "",
                current_start_date: "",
                current_end_date: "",
                current_update_date: "",

                keep_current_picture: "",
                keep_current_title: "",
                keep_current_description: "",
                keep_current_start_date: "",
                keep_current_end_date: ""
            };
        case SET_EVENT_MODAL_CURRENT_TITLE:
            return {
                ...state,
                current_title: action.payload
            };
        case SET_EVENT_MODAL_CURRENT_DESCRIPTION:
            return {
                ...state,
                current_description: action.payload
            };
        case SET_EVENT_MODAL_CURRENT_START_DATE:
            return {
                ...state,
                current_start_date: action.payload
            };
        case SET_EVENT_MODAL_CURRENT_END_DATE:
            return {
                ...state,
                current_end_date: action.payload
            };
        case SET_EVENT_MODAL_CURRENT_PICTURE:
            return {
                ...state,
                current_picture: action.payload
            };
        case SET_DELETION_CAUSE:
            return {
                ...state,
                deletion_cause: action.payload
            };
        default:
            return state;
    }
}