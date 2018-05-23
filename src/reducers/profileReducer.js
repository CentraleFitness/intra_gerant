import {
    DISPLAY_ALERT,
    DISMISS_ALERT,
    DISPLAY_MANAGER_PICTURE_MODAL,
    DISMISS_MANAGER_PICTURE_MODAL,
    DISPLAY_CENTER_PICTURE_MODAL,
    DISMISS_CENTER_PICTURE_MODAL,
    SET_MANAGER_INFO,
    SET_CENTER_INFO,
    RESET_MANAGER_CENTER_INFO,
    SET_MANAGER_KEEP_INFO,
    SET_CENTER_KEEP_INFO,
    SET_FIRST_NAME,
    SET_LAST_NAME,
    SET_PHONE,
    SET_EMAIL,
    SET_NAME,
    SET_DESCRIPTION,
    SET_ADDRESS,
    SET_ADDRESS_SECOND,
    SET_ZIP_CODE,
    SET_CITY,
    SET_CENTER_PHONE,
    SET_MANAGER_PICTURE_PREVIEW,
    SET_CENTER_PICTURE_PREVIEW,
    SET_MANAGER_PICTURE,
    SET_CENTER_PICTURE,

    SET_PUBLICATIONS,
    ADD_PUBLICATION,
    SET_CURRENT_PUBLICATION,
    DELETE_PUBLICATION,
    DISPLAY_PUBLICATION_DELETE_CONFIRM,
    DISMISS_PUBLICATION_DELETE_CONFIRM,

    RESET_PROFILE_INFO,

    DISPLAY_DELETE_PICTURE_CONFIRM,
    DISMISS_DELETE_PICTURE_CONFIRM,

    DISPLAY_PHOTO_MODAL,
    DISMISS_PHOTO_MODAL,
    SET_PHOTOS,
    ADD_PHOTO,
    DELETE_PHOTO,
    SET_PICTURE_TITLE,
    SET_PICTURE_DESCRIPTION,
    SET_PICTURE_PREVIEW
} from "../actions/types"

const initialState = {
    manager_first_name: "",
    manager_last_name: "",
    manager_email: "",
    manager_phone: "",
    center_name: "",
    center_address: "",
    center_address2: "",
    center_zip_code: "",
    center_city: "",
    center_phone: "",
    center_description: "",
    center_nb_subscribers: 0,
    center_nb_followers: 0,
    manager_keep_first_name: "",
    manager_keep_last_name: "",
    manager_keep_email: "",
    manager_keep_phone: "",
    center_keep_name: "",
    center_keep_address: "",
    center_keep_address2: "",
    center_keep_zip_code: "",
    center_keep_city: "",
    center_keep_phone: "",
    center_keep_description: "",
    showAlert: false,
    alertTitle: "",
    alertText: "",
    showManagerPictureModal: false,
    showCenterPictureModal: false,
    manager_picture_preview: "/img/folder.svg",
    center_picture_preview: "/img/folder.svg",
    manager_picture: "",
    center_picture: "",
    publications: [],
    current_publication: "",

    delete_publication_id: "",
    showDeletePublicationConfirm: false,

    delete_picture_id: "",
    showDeletePictureConfirm: false,

    showPhotoModal: false,
    photos: [],
    current_title: "",
    current_source: "",
    current_description: "",
    current_creation_date: 0,
    picture_title: "",
    picture_description: "",
    picture_preview: "/img/folder.svg"
};

export default (state = initialState, action) => {
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
        case DISPLAY_MANAGER_PICTURE_MODAL:
            return {
                ...state,
                showManagerPictureModal: true
            };
        case DISMISS_MANAGER_PICTURE_MODAL:
            return {
                ...state,
                showManagerPictureModal: false
            };
        case DISPLAY_CENTER_PICTURE_MODAL:
            return {
                ...state,
                showCenterPictureModal: true
            };
        case DISMISS_CENTER_PICTURE_MODAL:
            return {
                ...state,
                showCenterPictureModal: false
            };
        case SET_MANAGER_INFO:
            return {
                ...state,
                manager_first_name: action.payload.manager_first_name,
                manager_last_name: action.payload.manager_last_name,
                manager_email: action.payload.manager_email,
                manager_phone: action.payload.manager_phone,
            };
        case SET_CENTER_INFO:
            return {
                ...state,
                center_name: action.payload.center_name,
                center_description: action.payload.center_description,
                center_address: action.payload.center_address,
                center_address2: action.payload.center_address2,
                center_zip_code: action.payload.center_zip_code,
                center_city: action.payload.center_city,
                center_phone: action.payload.center_phone,
                center_nb_subscribers: action.payload.center_nb_subscribers
            };
        case RESET_MANAGER_CENTER_INFO:
            return {
                ...state,
                manager_first_name: state.manager_keep_first_name,
                manager_last_name: state.manager_keep_last_name,
                manager_email: state.manager_keep_email,
                manager_phone: state.manager_keep_phone,
                center_name: state.center_keep_name,
                center_address: state.center_keep_address,
                center_address2: state.center_keep_address2,
                center_zip_code: state.center_keep_zip_code,
                center_city: state.center_keep_city,
                center_phone: state.center_keep_phone,
                center_description: state.center_keep_description
            };
        case SET_MANAGER_KEEP_INFO:
            return {
                ...state,
                manager_keep_first_name: state.manager_first_name,
                manager_keep_last_name: state.manager_last_name,
                manager_keep_email: state.manager_email,
                manager_keep_phone: state.manager_phone
            };
        case SET_CENTER_KEEP_INFO:
            return {
                ...state,
                center_keep_name: state.center_name,
                center_keep_address: state.center_address,
                center_keep_address2: state.center_address2,
                center_keep_zip_code: state.center_zip_code,
                center_keep_city: state.center_city,
                center_keep_phone: state.center_phone,
                center_keep_description: state.center_description
            };
        case SET_FIRST_NAME:
            return {
                ...state,
                manager_first_name: action.payload
            };
        case SET_LAST_NAME:
            return {
                ...state,
                manager_last_name: action.payload
            };
        case SET_PHONE:
            return {
                ...state,
                manager_phone: action.payload
            };
        case SET_EMAIL:
            return {
                ...state,
                manager_email: action.payload
            };
        case SET_NAME:
            return {
                ...state,
                center_name: action.payload
            };
        case SET_DESCRIPTION:
            return {
                ...state,
                center_description: action.payload
            };
        case SET_ADDRESS:
            return {
                ...state,
                center_address: action.payload
            };
        case SET_ADDRESS_SECOND:
            return {
                ...state,
                center_address2: action.payload
            };
        case SET_ZIP_CODE:
            return {
                ...state,
                center_zip_code: action.payload
            };
        case SET_CITY:
            return {
                ...state,
                center_city: action.payload
            };
        case SET_CENTER_PHONE:
            return {
                ...state,
                center_phone: action.payload
            };
        case SET_MANAGER_PICTURE_PREVIEW:
            return {
                ...state,
                manager_picture_preview: action.payload
            };
        case SET_CENTER_PICTURE_PREVIEW:
            return {
                ...state,
                center_picture_preview: action.payload
            };
        case SET_MANAGER_PICTURE:
            return {
                ...state,
                manager_picture: action.payload
            };
        case SET_CENTER_PICTURE:
            return {
                ...state,
                center_picture: action.payload
            };
        case SET_PUBLICATIONS:
            return {
                ...state,
                publications: action.payload
            };
        case ADD_PUBLICATION:
            let tmp_publications = state.publications;
            tmp_publications.unshift(action.payload);
            return {
                ...state,
                publications: tmp_publications
            };
        case DELETE_PUBLICATION:
            let tmp_publications_delete = state.publications;
            let index_publications_delete = tmp_publications_delete.findIndex(function (item) {
                return item._id === action.payload;
            });
            delete tmp_publications_delete[index_publications_delete];
            return {
                ...state,
                publications: tmp_publications_delete
            };
        case DISPLAY_PUBLICATION_DELETE_CONFIRM:
            return {
                ...state,
                showDeletePublicationConfirm: true,
                delete_publication_id: action.payload
            };
        case DISMISS_PUBLICATION_DELETE_CONFIRM:
            return {
                ...state,
                showDeletePublicationConfirm: false,
                delete_publication_id: ""
            };
        case SET_CURRENT_PUBLICATION:
            return {
                ...state,
                current_publication: action.payload
            };
        case RESET_PROFILE_INFO:
            return {
                ...state,
                manager_first_name: "",
                manager_last_name: "",
                manager_email: "",
                manager_phone: "",
                center_name: "",
                center_address: "",
                center_address2: "",
                center_zip_code: "",
                center_city: "",
                center_phone: "",
                center_description: "",
                center_nb_subscribers: "",
                center_nb_followers: "",
                manager_keep_first_name: "",
                manager_keep_last_name: "",
                manager_keep_email: "",
                manager_keep_phone: "",
                center_keep_name: "",
                center_keep_address: "",
                center_keep_address2: "",
                center_keep_zip_code: "",
                center_keep_city: "",
                center_keep_phone: "",
                center_keep_description: "",
                manager_picture_preview: "",
                center_picture_preview: "",
                manager_picture: "",
                center_picture: "",
                publications: [],
                current_publication: "",
                showPhotoModal: false,
                photos: [],
                current_title: "",
                current_source: "",
                current_description: "",
                current_creation_date: 0,
                picture_title: "",
                picture_description: "",
                picture_preview: "/img/folder.svg"
            };
        case DISPLAY_PHOTO_MODAL:
            return {
                ...state,
                showPhotoModal: true,
                current_title: action.payload.current_title,
                current_source: action.payload.current_source,
                current_description: action.payload.current_description,
                current_creation_date: action.payload.current_creation_date
            };
        case DISMISS_PHOTO_MODAL:
            return {
                ...state,
                showPhotoModal: false,
                current_title: "",
                current_source: "",
                current_description: "",
                current_creation_date: 0
            };
        case SET_PHOTOS:
            return {
                ...state,
                photos: action.payload
            };
        case ADD_PHOTO:
            let tmp_photos = state.photos;
            tmp_photos.push(action.payload);
            return {
                ...state,
                photos: tmp_photos
            };
        case DELETE_PHOTO:
            let tmp_photos_delete = state.photos;
            let index_delete = tmp_photos_delete.findIndex(function (item) {
                return item.picture_id === action.payload;
            });
            delete tmp_photos_delete[index_delete];
            return {
                ...state,
                photos: tmp_photos_delete
            };
        case SET_PICTURE_TITLE:
            return {
                ...state,
                picture_title: action.payload
            };
        case SET_PICTURE_DESCRIPTION:
            return {
                ...state,
                picture_description: action.payload
            };
        case SET_PICTURE_PREVIEW:
            return {
                ...state,
                picture_preview: action.payload
            };
        case DISPLAY_DELETE_PICTURE_CONFIRM:
            return {
                ...state,
                showDeletePictureConfirm: true,
                delete_picture_id: action.payload
            };
        case DISMISS_DELETE_PICTURE_CONFIRM:
            return {
                ...state,
                showDeletePictureConfirm: false,
                delete_picture_id: ""
            };
        default:
            return state;
    }
}