import {
    SET_MODULES,
    SET_MODULE_STATES,
    SET_MODULE_RECEIVED
} from "../actions/types"

const initialState = {
    modules: [],
    updateGrid: false,
    module_states: []
};

export default (state = initialState, action) => {
    switch (action.type) {
        case SET_MODULES:
            return {
                ...state,
                modules: action.payload,
                updateGrid: (state.updateGrid === false)
            };
        case SET_MODULE_STATES:
            return {
                ...state,
                module_states: action.payload
            };
        case SET_MODULE_RECEIVED:
            let modules = state.modules;
            let index = modules.findIndex(function (item) {
                return item._id === action.payload.module_id;
            });
            modules[index].module_state_id = action.payload.module_state_id;
            modules[index].module_state_code = action.payload.module_state_code;
            return {
                ...state,
                modules: modules,
                updateGrid: (state.updateGrid === false)
            };
        default:
            return state;
    }
}