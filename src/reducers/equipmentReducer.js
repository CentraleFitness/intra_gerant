import {
    SET_MODULES,
    SET_MODULE_STATES
} from "../actions/types"

const initialState = {
    modules: [],
    module_states: []
};

export default (state = initialState, action) => {
    switch (action.type) {
        case SET_MODULES:
            return {
                ...state,
                modules: action.payload
            };
        case SET_MODULE_STATES:
            return {
                ...state,
                module_states: action.payload
            };
        default:
            return state;
    }
}