import {
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
    DISPLAY_FEEDBACK_EDIT_MODAL,
    SET_FEEDBACK_CURRENT_RESPONSE,
    ADD_FEEDBACK_RESPONSE
} from "../actions/types"

const initialState = {
    centrale_fitness_email: "centrale-fitness@outlook.fr",
    centrale_fitness_phone: "+33 6 18 31 60 87",
    feedbacks: [],
    initial_feedbacks: [],
    status: [],
    filter_keywords: "",
    filter_status: 0,

    showFeedbackModal: false,
    feedback_id: "",
    feedback_title: "",
    feedback_responses: [],
    feedback_fitness_manager_name: "",
    feedback_state_code: -1,
    feedback_description: "",
    feedback_update_date: -1,
    feedback_modal_title_enabled: true,
    feedback_modal_description_enabled: true,
    feedback_modal_confirm_button_enabled: true,
    feedback_current_response: ""
};

export default (state = initialState, action) => {
    switch (action.type) {
        case SET_FEEDBACKS:
            return {
                ...state,
                feedbacks: action.payload
            };
        case SET_INITIAL_FEEDBACKS:
            return {
                ...state,
                initial_feedbacks: action.payload
            };
        case ADD_FEEDBACK:
            let tmp_feedbacks = state.initial_feedbacks;
            tmp_feedbacks.unshift(action.payload);
            return {
                ...state,
                feedbacks: tmp_feedbacks,
                initial_feedbacks: tmp_feedbacks
            };
        case SET_STATUS:
            return {
                ...state,
                status: action.payload
            };
        case SET_FILTER_KEYWORDS:
            return {
                ...state,
                filter_keywords: action.payload
            };
        case SET_FILTER_STATUS:
            return {
                ...state,
                filter_status: action.payload
            };
        case SET_FEEDBACK_TITLE:
            return {
                ...state,
                feedback_title: action.payload
            };
        case SET_FEEDBACK_DESCRIPTION:
            return {
                ...state,
                feedback_description: action.payload
            };
        case DISPLAY_FEEDBACK_MODAL:
            return {
                ...state,
                showFeedbackModal: true,
                feedback_id: "",
                feedback_responses: [],
                feedback_update_date: -1,
                feedback_state_code: -1,
                feedback_modal_title_enabled: true,
                feedback_modal_description_enabled: true,
                feedback_modal_confirm_button_enabled: true
            };
        case DISMISS_FEEDBACK_MODAL:
            return {
                ...state,
                showFeedbackModal: false,
                feedback_title: "",
                feedback_responses: [],
                feedback_id: "",
                feedback_fitness_manager_name: "",
                feedback_update_date: -1,
                feedback_state_code: -1,
                feedback_description: "",
                feedback_modal_title_enabled: false,
                feedback_modal_description_enabled: false,
                feedback_modal_confirm_button_enabled: false
            };
        case DISPLAY_FEEDBACK_EDIT_MODAL:
            return {
                ...state,
                showFeedbackModal: true,
                feedback_id: action.payload.feedback_id,
                feedback_responses: action.payload.feedback_responses,
                feedback_update_date: action.payload.feedback_update_date,
                feedback_title: action.payload.feedback_title,
                feedback_fitness_manager_name: action.payload.feedback_fitness_manager_name,
                feedback_description: action.payload.feedback_description,
                feedback_state_code: action.payload.feedback_state_code,
                feedback_modal_title_enabled: false,
                feedback_modal_description_enabled: false,
                feedback_modal_confirm_button_enabled: false
            };
        case SET_FEEDBACK_CURRENT_RESPONSE:
            return {
                ...state,
                feedback_current_response: action.payload
            };
        case ADD_FEEDBACK_RESPONSE:
            let tmp_feedback_update = state.initial_feedbacks;
            let index = tmp_feedback_update.findIndex(function (item) {
                return item._id === action.payload._id;
            });

            tmp_feedback_update[index].responses.push({
                content: action.payload.content,
                date: action.payload.date,
                author: action.payload.author,
                is_admin: action.payload.is_admin
            });

            tmp_feedback_update[index].feedback_state_code = action.payload.feedback_state;
            tmp_feedback_update[index].update_date = action.payload.date;

            return {
                ...state,
                feedback_current_response: "",
                feedbacks: tmp_feedback_update,
                initial_feedbacks: tmp_feedback_update
            };

        default:
            return state;
    }
}