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
    SET_CUSTOM_PROGRAM_MODAL_CURRENT_AVAILABLE,
    DISPLAY_DELETE_CONFIRM,
    DISMISS_DELETE_CONFIRM
} from "../actions/types"

const initialState = {
    activities: [],
    custom_programs: [],
    initial_custom_programs: [],
    showAlert: false,
    alertTitle: "",
    alertText: "",
    showCustomProgramModal: false,
    current_id: "",
    current_name: "",
    current_picture: "",
    current_nb_activities: 0,
    current_total_time: "",
    current_activities: [],
    current_available: false,
    keep_current_name: "",
    keep_current_picture: "",
    keep_current_nb_activities: 0,
    keep_current_total_time: "",
    keep_current_activities: [],
    keep_current_available: false,
    showDeleteConfirm: false,
    delete_id: ""
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
        case SET_ACTIVITIES:
            return {
                ...state,
                activities: action.payload
            };
        case SET_CUSTOM_PROGRAMS:
            return {
                ...state,
                custom_programs: action.payload
            };
        case SET_INITIAL_CUSTOM_PROGRAMS:
            return {
                ...state,
                initial_custom_programs: action.payload
            };
        case ADD_CUSTOM_PROGRAM:
            let tmp_custom_programs = state.initial_custom_programs;
            tmp_custom_programs.unshift(action.payload);
            return {
                ...state,
                custom_programs: tmp_custom_programs,
                initial_custom_programs: tmp_custom_programs
            };
        case UPDATE_CUSTOM_PROGRAM:
            let tmp_custom_programs_update = state.initial_custom_programs;
            let index = tmp_custom_programs_update.findIndex(function (item) {
                return item._id === action.payload._id;
            });
            tmp_custom_programs_update[index].picture = action.payload.picture;
            tmp_custom_programs_update[index].name = action.payload.name;
            tmp_custom_programs_update[index].nb_activities = action.payload.nb_activities;
            tmp_custom_programs_update[index].total_time = action.payload.total_time;
            tmp_custom_programs_update[index].activities = action.payload.activities;
            tmp_custom_programs_update[index].available = action.payload.available;
            return {
                ...state,
                custom_programs: tmp_custom_programs_update,
                initial_custom_programs: tmp_custom_programs_update
            };
        case UPDATE_CUSTOM_PROGRAM_AVAILABILITY:
            let tmp_custom_programs_update_availability = state.custom_programs;
            let index_availability = tmp_custom_programs_update_availability.findIndex(function (item) {
                return item._id === action.payload._id;
            });
            tmp_custom_programs_update_availability[index_availability].available = action.payload.available;
            return {
                ...state,
                custom_programs: tmp_custom_programs_update_availability
            };
        case RESET_CUSTOM_PROGRAMS_AVAILABILITIES:
            let tmp_custom_programs_reset = JSON.parse(JSON.stringify(state.initial_custom_programs));
            return {
                ...state,
                custom_programs: tmp_custom_programs_reset
            };
        case DELETE_CUSTOM_PROGRAM:
            let tmp_custom_programs_delete = state.initial_custom_programs;
            let index_delete = tmp_custom_programs_delete.findIndex(function (item) {
                return item._id === action.payload;
            });
            delete tmp_custom_programs_delete[index_delete];
            return {
                ...state,
                custom_programs: tmp_custom_programs_delete,
                initial_custom_programs: tmp_custom_programs_delete
            };

        case DISPLAY_CUSTOM_PROGRAM_MODAL:
            return {
                ...state,

                showCustomProgramModal: true,
                current_id: "",
                current_name: "",
                current_picture: "",
                current_nb_activities: 0,
                current_total_time: "",
                current_activities: [],
                current_available: false,

                keep_current_name: "",
                keep_current_picture: "",
                keep_current_nb_activities: 0,
                keep_current_total_time: "",
                keep_current_activities: [],
                keep_current_available: false
            };
        case DISPLAY_CUSTOM_PROGRAM_EDIT_MODAL:
            return {
                ...state,

                showCustomProgramModal: true,
                current_id: action.payload.current_id,
                current_name: action.payload.current_name,
                current_picture: action.payload.current_picture,
                current_nb_activities: action.payload.current_nb_activities,
                current_total_time: action.payload.current_total_time,
                current_activities: action.payload.current_activities.slice(0),
                current_available: action.payload.current_available,

                keep_current_name: action.payload.current_name,
                keep_current_picture: action.payload.current_picture,
                keep_current_nb_activities: action.payload.current_nb_activities,
                keep_current_total_time: action.payload.current_total_time,
                keep_current_activities: action.payload.current_activities.slice(0),
                keep_current_available: action.payload.current_available
            };
        case DISMISS_CUSTOM_PROGRAM_MODAL:
            return {
                ...state,
                showCustomProgramModal: false,
                current_id: "",
                current_name: "",
                current_picture: "",
                current_nb_activities: 0,
                current_total_time: "",
                current_activities: [],
                current_available: false,

                keep_current_name: "",
                keep_current_picture: "",
                keep_current_nb_activities: 0,
                keep_current_total_time: "",
                keep_current_activities: [],
                keep_current_available: false
            };
        case SET_CUSTOM_PROGRAM_MODAL_CURRENT_NAME:
            return {
                ...state,
                current_name: action.payload
            };
        case SET_CUSTOM_PROGRAM_MODAL_CURRENT_PICTURE:
            return {
                ...state,
                current_picture: action.payload
            };
        case SET_CUSTOM_PROGRAM_MODAL_CURRENT_NB_ACTIVITIES:
            return {
                ...state,
                current_nb_activities: action.payload
            };
        case SET_CUSTOM_PROGRAM_MODAL_CURRENT_TOTAL_TIME:
            return {
                ...state,
                current_total_time: action.payload
            };
        case SET_CUSTOM_PROGRAM_MODAL_CURRENT_ACTIVITIES:
            return {
                ...state,
                current_activities: action.payload
            };
        case ADD_TO_CUSTOME_PROGRAMME_MODAL_CURRENT_ACTIVITIES:
            let tmp_current_activities = state.current_activities;
            tmp_current_activities.push(action.payload);
            return {
                ...state,
                current_activities: tmp_current_activities
            };
        case SET_CUSTOM_PROGRAM_MODAL_CURRENT_AVAILABLE:
            return {
                ...state,
                current_available: action.payload
            };
        case DISPLAY_DELETE_CONFIRM:
            return {
                ...state,
                showDeleteConfirm: true,
                delete_id: action.payload
            };
        case DISMISS_DELETE_CONFIRM:
            return {
                ...state,
                showDeleteConfirm: false,
                delete_id: ""
            };
        default:
            return state;
    }
}