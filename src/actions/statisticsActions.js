import {
    SET_STATISTICS
} from "./types"

export const setStatistics = (value) => {
    return {
        type: SET_STATISTICS,
        payload: value
    };
};