import {
    DISPLAY_ALERT,
    DISMISS_ALERT,
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
} from "../actions/types"

const initialState = {
    showAlert: false,
    alertTitle: "",
    alertText: "",

    news_type_store: [
        {value: 'sport', label: "Sport"},
        {value: 'ecologie', label: "Ecologie"},
        {value: 'locale', label: "Locale"}
    ],

    ranking_discipline_type_store: [
        {value: 'running', label: "Course"},
        {value: 'elliptic', label: "Elliptique"},
        {value: 'pulldown', label: "Développé nuque"},
        {value: 'biking', label: "Biking"}
    ],

    periodicity_store: [
        "Hebdomadaire",
        "Mensuel"
    ],

    show_events: false,
    events: [],
    selected_events: [],
    show_news: false,
    news_type: "",
    show_global_performances: false,
    performances_type: "",
    show_ranking_discipline: false,
    ranking_discipline_type: "",
    show_global_ranking: false,
    show_national_production_rank: false,

    has_changed: false,

    keep_show_events: false,
    keep_events: [],
    keep_selected_events: [],
    keep_show_news: false,
    keep_news_type: "",
    keep_show_global_performances: false,
    keep_performances_type: "",
    keep_show_ranking_discipline: false,
    keep_ranking_discipline_type: "",
    keep_show_global_ranking: false,
    keep_show_national_production_rank: false
};

export default (state = initialState, action) => {
    let has_changed = (
        ((action.type === SET_SHOW_EVENTS && action.payload !== state.keep_show_events) ||
            state.show_events !== state.keep_show_events) ||
        ((action.type === SET_SHOW_NEWS && action.payload !== state.keep_show_news) ||
            state.show_news !== state.keep_show_news) ||
        ((action.type === SET_SHOW_GLOBAL_PERFORMANCES && action.payload !== state.keep_show_global_performances) ||
            state.show_global_performances !== state.keep_show_global_performances) ||
        ((action.type === SET_SHOW_RANKING_DISCIPLINE && action.payload !== state.keep_show_ranking_discipline) ||
            state.show_ranking_discipline !== state.keep_show_ranking_discipline) ||
        ((action.type === SET_SHOW_GLOBAL_RANKING && action.payload !== state.keep_show_global_ranking) ||
            state.show_global_ranking !== state.keep_show_global_ranking) ||
        ((action.type === SET_NATIONAL_PRODUCTION_RANK && action.payload !== state.keep_show_national_production_rank) ||
            state.show_national_production_rank !== state.keep_show_national_production_rank)
    );

    switch (action.type) {
        case DISPLAY_ALERT:
            return {
                ...state,
                showAlert: true,
                alertTitle: action.payload.alertTitle,
                alertText: action.payload.alertText
            };
        case DISMISS_ALERT:
            return {
                ...state,
                showAlert: false,
                alertTitle: "",
                alertText: ""
            };
        case SET_DISPLAY_CONFIGURATION:
            return {
                ...state,

                show_events: action.payload.show_events,
                selected_events: action.payload.selected_events,
                show_news: action.payload.show_news,
                news_type: action.payload.news_type,
                show_global_performances: action.payload.show_global_performances,
                performances_type: action.payload.performances_type,
                show_ranking_discipline: action.payload.show_ranking_discipline,
                ranking_discipline_type: action.payload.ranking_discipline_type,
                show_global_ranking: action.payload.show_global_ranking,
                show_national_production_rank: action.payload.show_national_production_rank,

                keep_show_events: action.payload.show_events,
                keep_selected_events: action.payload.selected_events,
                keep_show_news: action.payload.show_news,
                keep_news_type: action.payload.news_type,
                keep_show_global_performances: action.payload.show_global_performances,
                keep_performances_type: action.payload.performances_type,
                keep_show_ranking_discipline: action.payload.show_ranking_discipline,
                keep_ranking_discipline_type: action.payload.ranking_discipline_type,
                keep_show_global_ranking: action.payload.show_global_ranking,
                keep_show_national_production_rank: action.payload.show_national_production_rank
            };
        case SET_UPDATE_KEEP_DISPLAY_CONFIGURATION:
            return {
                ...state,

                keep_show_events: state.show_events,
                keep_show_news: state.show_news,
                keep_news_type: state.news_type,
                keep_show_global_performances: state.show_global_performances,
                keep_performances_type: state.performances_type,
                keep_show_ranking_discipline: state.show_ranking_discipline,
                keep_ranking_discipline_type: state.ranking_discipline_type,
                keep_show_global_ranking: state.show_global_ranking,
                keep_show_national_production_rank: state.show_national_production_rank
            };
        case SET_KEEP_EVENTS:
            return {
                ...state,
                keep_events: action.payload
            };
        case SET_SHOW_EVENTS:
            return {
                ...state,
                show_events: action.payload,
                has_changed: has_changed
            };
        case SET_SHOW_NEWS:
            return {
                ...state,
                show_news: action.payload,
                has_changed: has_changed
            };
        case SET_NEWS_TYPE:
            return {
                ...state,
                news_type: action.payload,
                has_changed: has_changed
            };
        case SET_SHOW_GLOBAL_PERFORMANCES:
            return {
                ...state,
                show_global_performances: action.payload,
                has_changed: has_changed
            };
        case SET_PERFORMANCES_TYPE:
            return {
                ...state,
                performances_type: action.payload,
                has_changed: has_changed
            };
        case SET_SHOW_RANKING_DISCIPLINE:
            return {
                ...state,
                show_ranking_discipline: action.payload,
                has_changed: has_changed
            };
        case SET_RANKING_DISCIPLINE_TYPE:
            return {
                ...state,
                ranking_discipline_type: action.payload,
                has_changed: has_changed
            };
        case SET_SHOW_GLOBAL_RANKING:
            return {
                ...state,
                show_global_ranking: action.payload,
                has_changed: has_changed
            };
        case SET_NATIONAL_PRODUCTION_RANK:
            return {
                ...state,
                show_national_production_rank: action.payload,
                has_changed: has_changed
            };
        default:
            return state;
    }
}