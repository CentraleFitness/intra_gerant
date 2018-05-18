const Paths = {
    HOST: "http://localhost:5445",

    REGISTRATION: "/registration",

    AUTHENTICATION: "/authentication",
    AUTHENTICATION_TOKEN: "/authentication/token",

    MANAGER_GET_PROFILE: "/manager/get/profile",
    MANAGER_GET_PICTURE: "/manager/get/picture",
    MANAGER_UPDATE_PROFILE: "/manager/update/profile",
    MANAGER_UPDATE_PASSWORD: "/manager/update/password",
    MANAGER_UPDATE_PICTURE: "/manager/update/picture",

    CENTER_REGISTER: "/club/register",
    CENTER_GET_PROFILE: "/club/get/profile",
    CENTER_UPDATE_PROFILE: "/club/update/profile",
    CENTER_GET_PICTURE: "/club/get/picture",
    CENTER_UPDATE_PICTURE: "/club/update/picture",

    CENTER_INCREASE_ALBUM: "/club/increase/album",
    CENTER_DECREASE_ALBUM: "/club/decrease/album",
    CENTER_GET_ALBUM: "/club/get/album",

    CENTER_ADD_PUBLICATION: "/club/add/publication",
    CENTER_DELETE_PUBLICATION: "/club/delete/publication",
    CENTER_GET_PUBLICATIONS: "/club/get/publications",

    ADD_FEEDBACK: "/manager/add/feedback",
    GET_FEEDBACKS: "/manager/get/feedbacks",
    GET_FEEDBACK_STATES: "/manager/get/feedbackstates",

    ADD_EVENT: "/center/add/event",
    GET_EVENTS: "/center/get/events",
    UPDATE_EVENT: "/center/update/event",
    DELETE_EVENT: "/center/delete/event",

    SET_CUSTOM_PROGRAMS_AVAILABILITY: "/center/set/customprogramavailability",
    ADD_CUSTOM_PROGRAM: "/center/add/customprogram",
    UPDATE_CUSTOM_PROGRAM: "/center/update/customprogram",
    GET_CUSTOM_PROGRAMS: "/center/get/customprograms",
    DELETE_CUSTOM_PROGRAM: "/center/delete/customprogram",
    GET_ACTIVITIES: "/center/get/activities",

    GET_FITNESS_CENTER_ID: "/center/get/id",
};

export default Paths;