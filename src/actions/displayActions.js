import {
    SET_DISPLAY_CONFIGURATION,
    SET_UPDATE_KEEP_DISPLAY_CONFIGURATION,
    SET_KEEP_EVENTS,
    SET_SELECTED_EVENTS,
    SET_SHOW_EVENTS,
    SET_SHOW_NEWS,
    SET_NEWS_TYPE,
    SET_SHOW_GLOBAL_PERFORMANCES,
    SET_PERFORMANCES_TYPE,
    SET_SHOW_RANKING_DISCIPLINE,
    SET_RANKING_DISCIPLINE_TYPE,
    SET_SHOW_GLOBAL_RANKING,
    SET_NATIONAL_PRODUCTION_RANK
} from "./types"

export const setDisplayConfiguration = (value) => {
    return {
        type: SET_DISPLAY_CONFIGURATION,
        payload: value
    };
};

export const setUpdateKeepDisplayConfiguration = () => {
    return {
        type: SET_UPDATE_KEEP_DISPLAY_CONFIGURATION
    };
};

export const setKeepEvents = (value) => {
    return {
        type: SET_KEEP_EVENTS,
        payload: value
    };
};

export const setSelectedEvents = (value) => {
    return {
        type: SET_SELECTED_EVENTS,
        payload: value
    };
};

export const setShowEvents = (value) => {
    return {
        type: SET_SHOW_EVENTS,
        payload: value
    };
};

export const setShowNews = (value) => {
    return {
        type: SET_SHOW_NEWS,
        payload: value
    };
};

export const setNewsType = (value) => {
    return {
        type: SET_NEWS_TYPE,
        payload: value
    };
};


export const setShowGlobalPerformances = (value) => {
    return {
        type: SET_SHOW_GLOBAL_PERFORMANCES,
        payload: value
    };
};

export const setPerformancesType = (value) => {
    return {
        type: SET_PERFORMANCES_TYPE,
        payload: value
    };
};

export const setShowRankingDiscipline = (value) => {
    return {
        type: SET_SHOW_RANKING_DISCIPLINE,
        payload: value
    };
};

export const setRankingDisciplineType = (value) => {
    return {
        type: SET_RANKING_DISCIPLINE_TYPE,
        payload: value
    };
};


export const setShowGlobalRanking = (value) => {
    return {
        type: SET_SHOW_GLOBAL_RANKING,
        payload: value
    };
};

export const setShowNationalProductionRank = (value) => {
    return {
        type: SET_NATIONAL_PRODUCTION_RANK,
        payload: value
    };
};