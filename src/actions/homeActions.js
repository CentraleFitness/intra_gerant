import {
    SET_HOME_SUMMARY
} from "./types"

export const setHomeSummary = (value) => {
    return {
        type: SET_HOME_SUMMARY,
        payload: value
    };
};