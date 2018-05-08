import {
    SET_ACTIVITIES,
    SET_CUSTOM_PROGRAMS,
    SET_INITIAL_CUSTOM_PROGRAMS,
    ADD_CUSTOM_PROGRAM,
    DELETE_CUSTOM_PROGRAM,
    UPDATE_CUSTOM_PROGRAM
} from "../actions/types"

const initialState = {
    activities: [],
    custom_programs: [],
    initial_custom_programs: []
};

export default (state = initialState, action) => {
    switch (action.type) {
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
            tmp_custom_programs.push(action.payload);
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
            tmp_custom_programs_update[index].image = action.payload.image;
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
        default:
            return state;
    }
}