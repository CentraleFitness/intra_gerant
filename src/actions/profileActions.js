import {
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
    SET_SIRET,
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
    SET_PUBLICATION_LIKED_BY_ME,
    SET_PUBLICATION_REPORTED_BY_ME,
    PUBLICATION_ADD_COMMENT,
    PUBLICATION_DELETE_COMMENT,
    ADD_PUBLICATION,
    SET_CURRENT_PUBLICATION,
    DELETE_PUBLICATION,
    DISPLAY_PUBLICATION_DELETE_CONFIRM,
    DISMISS_PUBLICATION_DELETE_CONFIRM,
    SET_EVENT_PUBLICATIONS_IS_DELETED,

    RESET_PROFILE_INFO,

    DISPLAY_DELETE_PICTURE_CONFIRM,
    DISMISS_DELETE_PICTURE_CONFIRM,

    DISPLAY_PHOTO_MODAL,
    DISMISS_PHOTO_MODAL,
    SET_PHOTOS,
    ADD_PHOTO,
    DELETE_PHOTO,
    DELETE_PUBLICATION_PHOTO,
    DELETE_PHOTO_PUBLICATION,
    SET_PICTURE_TITLE,
    SET_PICTURE_DESCRIPTION,
    SET_PICTURE_PREVIEW
} from "./types"

export const displayManagerPictureModal = () => {
    return {
        type: DISPLAY_MANAGER_PICTURE_MODAL
    };
};

export const dismissManagerPictureModal = () => {
    return {
        type: DISMISS_MANAGER_PICTURE_MODAL
    };
};

export const displayCenterPictureModal = () => {
    return {
        type: DISPLAY_CENTER_PICTURE_MODAL
    };
};

export const dismissCenterPictureModal = () => {
    return {
        type: DISMISS_CENTER_PICTURE_MODAL
    };
};

export const setManagerInfo = (managerInfo) => {
    return {
        type: SET_MANAGER_INFO,
        payload: managerInfo
    };
};

export const setCenterInfo = (centerInfo) => {
    return {
        type: SET_CENTER_INFO,
        payload: centerInfo
    };
};

export const resetManagerCenterInfo = () => {
    return {
        type: RESET_MANAGER_CENTER_INFO
    };
};

export const setManagerKeepInfo = () => {
    return {
        type: SET_MANAGER_KEEP_INFO
    };
};

export const setCenterKeepInfo = () => {
    return {
        type: SET_CENTER_KEEP_INFO
    };
};

export const setFirstName = (value) => {
    return {
        type: SET_FIRST_NAME,
        payload: value
    };
};

export const setLastName = (value) => {
    return {
        type: SET_LAST_NAME,
        payload: value
    };
};

export const setPhone = (value) => {
    return {
        type: SET_PHONE,
        payload: value
    };
};

export const setEmail = (value) => {
    return {
        type: SET_EMAIL,
        payload: value
    };
};

export const setName = (value) => {
    return {
        type: SET_NAME,
        payload: value
    };
};

export const setSiret = (value) => {
    return {
        type: SET_SIRET,
        payload: value
    };
};

export const setDescription = (value) => {
    return {
        type: SET_DESCRIPTION,
        payload: value
    };
};

export const setAddress = (value) => {
    return {
        type: SET_ADDRESS,
        payload: value
    };
};

export const setAddressSecond = (value) => {
    return {
        type: SET_ADDRESS_SECOND,
        payload: value
    };
};

export const setZipCode = (value) => {
    return {
        type: SET_ZIP_CODE,
        payload: value
    };
};

export const setCity = (value) => {
    return {
        type: SET_CITY,
        payload: value
    };
};

export const setCenterPhone = (value) => {
    return {
        type: SET_CENTER_PHONE,
        payload: value
    };
};

export const setManagerPicturePreview = (value) => {
    return {
        type: SET_MANAGER_PICTURE_PREVIEW,
        payload: value
    };
};

export const setCenterPicturePreview = (value) => {
    return {
        type: SET_CENTER_PICTURE_PREVIEW,
        payload: value
    };
};

export const setManagerPicture = (value) => {
    return {
        type: SET_MANAGER_PICTURE,
        payload: value
    };
};

export const setCenterPicture = (value) => {
    return {
        type: SET_CENTER_PICTURE,
        payload: value
    };
};





export const setPublications = (publications) => {
    return {
        type: SET_PUBLICATIONS,
        payload: publications
    };
};

export const setPublicationLikedByMe = (publication) => {
    return {
        type: SET_PUBLICATION_LIKED_BY_ME,
        payload: publication
    };
};

export const setEventPublicationsIsDeleted = (event_id) => {
    return {
        type: SET_EVENT_PUBLICATIONS_IS_DELETED,
        payload: event_id
    };
};

export const setPublicationReportedByMe = (publication) => {
    return {
        type: SET_PUBLICATION_REPORTED_BY_ME,
        payload: publication
    };
};


export const publicationAddComment = (infos) => {
    return {
        type: PUBLICATION_ADD_COMMENT,
        payload: infos
    };
};

export const publicationDeleteComment = (infos) => {
    return {
        type: PUBLICATION_DELETE_COMMENT,
        payload: infos
    };
};


export const addPublication = (publication) => {
    return {
        type: ADD_PUBLICATION,
        payload: publication
    };
};

export const deletePublication = (id) => {
    return {
        type: DELETE_PUBLICATION,
        payload: id
    };
};

export const displayPublicationDeleteConfirm = (ids) => {
    return {
        type: DISPLAY_PUBLICATION_DELETE_CONFIRM,
        payload: ids
    };
};

export const dismissPublicationDeleteConfirm = () => {
    return {
        type: DISMISS_PUBLICATION_DELETE_CONFIRM
    };
};

export const setCurrentPublication = (value) => {
    return {
        type: SET_CURRENT_PUBLICATION,
        payload: value
    };
};






export const resetProfileInfo = () => {
    return {
        type: RESET_PROFILE_INFO
    };
};

export const displayPhotoModal = (photoModalInfo) => {
    return {
        type: DISPLAY_PHOTO_MODAL,
        payload: photoModalInfo
    };
};

export const dismissPhotoModal = () => {
    return {
        type: DISMISS_PHOTO_MODAL
    };
};

export const setPhotos = (photos) => {
    return {
        type: SET_PHOTOS,
        payload: photos
    };
};

export const addPhoto = (photo) => {
    return {
        type: ADD_PHOTO,
        payload: photo
    };
};

export const setPictureTitle = (value) => {
    return {
        type: SET_PICTURE_TITLE,
        payload: value
    };
};

export const setPictureDescription = (value) => {
    return {
        type: SET_PICTURE_DESCRIPTION,
        payload: value
    };
};

export const setPicturePreview = (value) => {
    return {
        type: SET_PICTURE_PREVIEW,
        payload: value
    };
};

export const displayDeletePictureConfirm = (id) => {
    return {
        type: DISPLAY_DELETE_PICTURE_CONFIRM,
        payload: id
    };
};

export const dismissDeletePictureConfirm = () => {
    return {
        type: DISMISS_DELETE_PICTURE_CONFIRM
    };
};

export const deletePhoto = (id) => {
    return {
        type: DELETE_PHOTO,
        payload: id
    };
};

export const deletePhotoPublication = (id) => {
    return {
        type: DELETE_PHOTO_PUBLICATION,
        payload: id
    };
};

export const deletePublicationPhoto = (id) => {
    return {
        type: DELETE_PUBLICATION_PHOTO,
        payload: id
    };
};
