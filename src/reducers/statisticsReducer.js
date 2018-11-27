import {
    SET_STATISTICS
} from "../actions/types"

const initialState = {
    updateGrid: false,

    production_day: 0,
    production_month: 0,
    production_year: 0,
    production_total: 0,

    average_by_module: 0,

    nb_subscribers: 0,

    frequentation_day: 0,
    frequentation_month: 0,
    frequentation_year: 0
};

export default (state = initialState, action) => {
    switch (action.type) {
        case SET_STATISTICS:
            return {
                ...state,
                updateGrid: state.updateGrid === false,

                production_day: action.payload.production_day,
                production_month: action.payload.production_month,
                production_year: action.payload.production_year,
                production_total: action.payload.production_total,

                average_by_module: action.payload.average_by_module,

                nb_subscribers: action.payload.nb_subscribers,

                frequentation_day: action.payload.frequentation_day,
                frequentation_month: action.payload.frequentation_month,
                frequentation_year: action.payload.frequentation_year
            };
        default:
            return state;
    }
}