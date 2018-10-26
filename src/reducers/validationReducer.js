import {
    SET_SECONDARY_MANAGERS,
    DISPLAY_MANAGER_UPDATE_CONFIRM,
    DISMISS_MANAGER_UPDATE_CONFIRM,
    SET_MANAGER_ACTIVITY,
    SET_VALIDATE_MANAGER

} from "../actions/types"

const initialState = {
    secondary_managers: [],

    show_update_confirm: false,
    update_confirm_title: "",
    update_confirm_text: "",
    update_confirm_is_validation: false,
    update_confirm_id: "",
    update_confirm_name: "",
    update_confirm_is_active: false,
    update_confirm_is_validated: false
};

export default (state = initialState, action) => {
    switch (action.type) {
        case SET_SECONDARY_MANAGERS:
            return {
                ...state,
                secondary_managers: action.payload
            };
        case DISPLAY_MANAGER_UPDATE_CONFIRM:
            return {
                ...state,
                show_update_confirm: true,
                update_confirm_title: action.payload.update_confirm_title,
                update_confirm_text: action.payload.update_confirm_text,
                update_confirm_is_validation: action.payload.update_confirm_is_validation,
                update_confirm_id: action.payload.update_confirm_id,
                update_confirm_name: action.payload.update_confirm_name,
                update_confirm_is_active: action.payload.update_confirm_is_active,
                update_confirm_is_validated: action.payload.update_confirm_is_validated
            };
        case DISMISS_MANAGER_UPDATE_CONFIRM:
            return {
                ...state,
                show_update_confirm: initialState.show_update_confirm,
                update_confirm_title: initialState.update_confirm_title,
                update_confirm_text: initialState.update_confirm_text,
                update_confirm_is_validation: initialState.update_confirm_is_validation,
                update_confirm_id: initialState.update_confirm_id,
                update_confirm_name: initialState.update_confirm_name,
                update_confirm_is_active: initialState.update_confirm_is_active,
                update_confirm_is_validated: initialState.update_confirm_is_validated
            };
        case SET_MANAGER_ACTIVITY:

            let tmp_manager_activity_update = state.secondary_managers;
            let index = tmp_manager_activity_update.findIndex(function (item) {
                return item._id === action.payload._id;
            });
            if (index !== -1) {
                tmp_manager_activity_update[index].is_active = action.payload.is_active;
                tmp_manager_activity_update[index].last_update_activity = action.payload.time;
                tmp_manager_activity_update[index].last_update_admin_id = action.payload.last_update_admin_id;
                tmp_manager_activity_update[index].last_update_admin_name = action.payload.last_update_admin_name;
                tmp_manager_activity_update[index].last_update_admin_is_manager = true;
            }
            return {
                ...state,
                secondary_managers: tmp_manager_activity_update
            };
        case SET_VALIDATE_MANAGER:

            let tmp_manager_validation_update = state.secondary_managers;
            let index_val = tmp_manager_validation_update.findIndex(function (item) {
                return item._id === action.payload._id;
            });
            if (index_val !== -1) {
                if (action.payload.is_validated === true) {
                    tmp_manager_validation_update[index_val].is_active = true;
                    tmp_manager_validation_update[index_val].is_validated = true;
                    tmp_manager_validation_update[index_val].is_refused = false;

                    tmp_manager_validation_update[index_val].last_update_activity = action.payload.time;
                    tmp_manager_validation_update[index_val].last_update_admin_id = action.payload.validator_admin_id;
                    tmp_manager_validation_update[index_val].last_update_admin_name = action.payload.validator_admin_name;
                    tmp_manager_validation_update[index_val].last_update_admin_is_manager = true;
                } else {
                    tmp_manager_validation_update[index_val].is_active = false;
                    tmp_manager_validation_update[index_val].is_validated = false;
                    tmp_manager_validation_update[index_val].is_refused = true;
                }
                tmp_manager_validation_update[index_val].validation_date = action.payload.time;
                tmp_manager_validation_update[index_val].validator_admin_id = action.payload.validator_admin_id;
                tmp_manager_validation_update[index_val].validator_admin_name = action.payload.validator_admin_name;
                tmp_manager_validation_update[index_val].validator_admin_is_manager = true;


            }
            return {
                ...state,
                secondary_managers: tmp_manager_validation_update
            };
        default:
            return state;
    }
}