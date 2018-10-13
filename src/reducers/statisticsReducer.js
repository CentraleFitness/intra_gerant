import {
    SET_STATISTICS
} from "../actions/types"

const initialState = {
    production_day: 0,
    production_month: 0,
    frequentation_day: 0,
    frequentation_month: 0
};

export default (state = initialState, action) => {
    switch (action.type) {
        case SET_STATISTICS:
            return {
                ...state,
                production_day: action.payload.production_day,
                production_month: action.payload.production_month,
                frequentation_day: action.payload.frequentation_day,
                frequentation_month: action.payload.frequentation_month
            };
        default:
            return state;
    }
}