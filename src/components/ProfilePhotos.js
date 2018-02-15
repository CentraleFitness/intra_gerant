import React from 'react';
import {
    Grid,
    Row,
    Col,
    Thumbnail,
    Panel,
    Modal,
    Button,
    OverlayTrigger,
    Popover,
    FormControl,
    FormGroup,
    ControlLabel,
    HelpBlock,
    Image,
    Glyphicon
} from 'react-bootstrap';
import { connect } from 'react-redux';

import {
    displayAlert,
    dismissAlert,
    displayPhotoModal,
    dismissPhotoModal,
    setPhotos,
    addPhoto,
    setPictureTitle,
    setPictureDescription,
    setPicturePreview,
    displayDeletePictureConfirm,
    dismissDeletePictureConfirm,
    deletePhoto
} from "../actions/profileActions";

import {
    setAlbumIsLoad
} from "../actions/globalActions";

import Texts from "../utils/Texts";
import Dates from "../utils/Dates";
import Fields from "../utils/Fields";
import Communication from "../utils/Communication";
import Status from "../utils/Status";
import Paths from "../utils/Paths";

import '../styles/Profile.css';
import '../styles/ProfilePhotos.css';

class ProfilePhotos extends React.Component {

    componentDidMount() {
        if (this.props.album_is_load === false) {
            this.getAlbum();
        }
    }

    onPhotoClick(curItem) {
        this.props.displayPhotoModal({
            current_title: curItem.title,
            current_creation_date: curItem.creation_date,
            current_source: curItem.picture,
            current_description: curItem.description
        });
    }

    onAddPhotoClick() {

        if (this.centerAddPictureRef.value === "") {
            this.props.displayAlert({
                alertTitle: Texts.ERREUR_TITRE.text_fr,
                alertText: Texts.ERR_CHOISIR_UNE_IMAGE.text_fr
            });
        } else {
            this.addPicture(this.props.picture_preview);
        }
    }

    getAlbum() {
        let params = {};

        params[Fields.TOKEN] = localStorage.getItem("token");

        let me = this;

        let communication = new Communication('post', Paths.HOST + Paths.CENTER_GET_ALBUM, params);
        communication.sendRequest(
            function (response) {
                if (response.status === 200) {
                    if (response.data.code === Status.GENERIC_OK.code) {

                        me.props.setPhotos(response.data.album);
                        me.props.setAlbumIsLoad();

                    } else {

                        let message = "";
                        for (let key in Status) {
                            if (Status[key].code === response.data.code) {
                                message = Status[key].message_fr;
                                break;
                            }
                        }

                        me.props.displayAlert({
                            alertTitle: Texts.ERREUR_TITRE.text_fr,
                            alertText: message
                        });
                    }
                } else {
                    me.props.displayAlert({
                        alertTitle: Texts.ERREUR_TITRE.text_fr,
                        alertText: Texts.ERR_RESEAU.text_fr
                    });
                }
            },
            function (error) {
                me.props.displayAlert({
                    alertTitle: Texts.ERREUR_TITRE.text_fr,
                    alertText: Texts.ERR_RESEAU.text_fr
                });
            }
        );
    }

    addPicture(picture) {
        let params = {};

        params[Fields.TOKEN] = localStorage.getItem("token");
        params[Fields.PICTURE] = picture;
        params[Fields.TITLE] = this.props.picture_title;
        params[Fields.DESCRIPTION] = this.props.picture_description;

        let me = this;

        let communication = new Communication('post', Paths.HOST + Paths.CENTER_INCREASE_ALBUM, params);
        communication.sendRequest(
            function (response) {
                if (response.status === 200) {
                    if (response.data.code === Status.GENERIC_OK.code) {

                        let now = new Date();
                        me.props.addPhoto({
                            title: me.props.picture_title,
                            description: me.props.picture_description,
                            picture: me.props.picture_preview,
                            creation_date: now.getTime(),
                            picture_id: response.data.picture_id
                        });
                        me.props.setPictureTitle("");
                        me.props.setPictureDescription("");
                        me.props.setPicturePreview("/img/folder.svg");
                        me.centerAddPictureRef.value = "";

                    } else {

                        let message = "";
                        for (let key in Status) {
                            if (Status[key].code === response.data.code) {
                                message = Status[key].message_fr;
                                break;
                            }
                        }

                        me.props.displayAlert({
                            alertTitle: Texts.ERREUR_TITRE.text_fr,
                            alertText: message
                        });
                    }
                } else {
                    me.props.displayAlert({
                        alertTitle: Texts.ERREUR_TITRE.text_fr,
                        alertText: Texts.ERR_RESEAU.text_fr
                    });
                }
            },
            function (error) {
                me.props.displayAlert({
                    alertTitle: Texts.ERREUR_TITRE.text_fr,
                    alertText: Texts.ERR_RESEAU.text_fr
                });
            }
        );
    }

    deletePicture() {
        let params = {};

        params[Fields.TOKEN] = localStorage.getItem("token");
        params[Fields.PICTURE_ID] = this.props.delete_picture_id;

        let me = this;

        let communication = new Communication('post', Paths.HOST + Paths.CENTER_DECREASE_ALBUM, params);
        communication.sendRequest(
            function (response) {
                if (response.status === 200) {
                    if (response.data.code === Status.GENERIC_OK.code) {

                        me.props.deletePhoto(me.props.delete_picture_id);
                        me.handleDeletePictureConfirmDismiss();

                    } else {

                        let message = "";
                        for (let key in Status) {
                            if (Status[key].code === response.data.code) {
                                message = Status[key].message_fr;
                                break;
                            }
                        }

                        me.props.displayAlert({
                            alertTitle: Texts.ERREUR_TITRE.text_fr,
                            alertText: message
                        });
                    }
                } else {
                    me.props.displayAlert({
                        alertTitle: Texts.ERREUR_TITRE.text_fr,
                        alertText: Texts.ERR_RESEAU.text_fr
                    });
                }
            },
            function (error) {
                me.props.displayAlert({
                    alertTitle: Texts.ERREUR_TITRE.text_fr,
                    alertText: Texts.ERR_RESEAU.text_fr
                });
            }
        );
    }

    onPhotoCloseClick() {
        this.props.dismissPhotoModal();
    }

    handlePictureTitleChange(event) {
        this.props.setPictureTitle(event.target.value);
    }

    handlePictureDescriptionChange(event) {
        this.props.setPictureDescription(event.target.value);
    }

    onUpdatePictureFile() {
        let me = this;
        let reader = new FileReader();
        reader.readAsDataURL(this.centerAddPictureRef.files[0]);
        reader.addEventListener("load", function () {
            me.props.setPicturePreview(reader.result);
        }, false);
    }

    onPhotoDelete(item) {
        console.log(item);
        this.props.displayDeletePictureConfirm(item.picture_id);
    }

    handleDeletePictureConfirmDismiss() {
        this.props.dismissDeletePictureConfirm();
    }

    confirmPictureDelete() {
        this.deletePicture()
    }

    render() {

        return (
            <Panel>
                <Panel>
                    <Grid>
                        <Row>
                            <Col xs={8} sm={6} md={3} lg={3}>
                                <FormGroup controlId="formControlsFile">
                                    <ControlLabel>{Texts.SELECTIONNER_IMG.text_fr}</ControlLabel>
                                    <FormControl
                                        type="file"
                                        accept=".png,.jpg,.svg"
                                        inputRef={ref => this.centerAddPictureRef = ref}
                                        onChange={this.onUpdatePictureFile.bind(this)}
                                    />
                                    <HelpBlock>{Texts.FORMATS_AUTORISES.text_fr}</HelpBlock>
                                </FormGroup>
                            </Col>
                            <Col xs={2} sm={3} md={4} lg={4}>
                                <FormGroup controlId="formControlsTitle">
                                    <FormControl
                                        type="text"
                                        placeholder={Texts.TITRE.text_fr}
                                        value={this.props.picture_title}
                                        onChange={this.handlePictureTitleChange.bind(this)}
                                    />
                                </FormGroup>
                                <FormGroup controlId="formControlsDescription">
                                    <FormControl
                                        componentClass="textarea"
                                        placeholder={Texts.DESCRIPTION.text_fr}
                                        value={this.props.picture_description}
                                        onChange={this.handlePictureDescriptionChange.bind(this)}
                                    />
                                </FormGroup>
                                <Button
                                    className={"center-block"}
                                    onClick={this.onAddPhotoClick.bind(this)}
                                >
                                    <Glyphicon glyph="plus" /> {Texts.AJOUTER.text_fr}
                                </Button>
                            </Col>
                            <Col xs={2} sm={3} md={5} lg={5}>
                                <Image
                                    src={this.props.picture_preview}
                                    rounded
                                    responsive={true}
                                    thumbnail={true}
                                    className={"center-block profileImage"}
                                />
                            </Col>
                        </Row>
                    </Grid>
                </Panel>
                <Grid fluid={true}>
                    <Row>
                        {
                            this.props.photos.map((item) => (
                                <span
                                    style={{cursor:"pointer"}}
                                    key={item.picture_id}
                                >

                                        <Col xs={2} sm={2} md={2} lg={2}>
                                            <a onClick={this.onPhotoDelete.bind(this, item)} className={"pull-right cross-background"}><Glyphicon glyph="remove" /></a>
                                            <OverlayTrigger trigger={["hover", "focus"]} placement="top" overlay={
                                                <Popover title={item.title} id={"PhotoPopover"} className={"blockEllipsis"}>
                                                    <strong className={"showNewLine"}>{item.description}</strong>
                                                </Popover>
                                            }>
                                                <Thumbnail
                                                    alt={item.title}
                                                    src={item.picture}
                                                    onClick={this.onPhotoClick.bind(this, item)}
                                                    className={"center-block profileImage"}
                                                />
                                            </OverlayTrigger>
                                        </Col>

                                </span>
                            ))
                        }
                    </Row>
                </Grid>

                <Modal className={"photoModal"} show={this.props.showPhotoModal} onHide={this.onPhotoCloseClick.bind(this)}>
                    <Modal.Header closeButton>
                        <Modal.Title className={"blockEllipsis"}>{this.props.current_title}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Thumbnail alt={this.props.current_title} src={this.props.current_source} />
                        <em>{Texts.AJOUTER_LE.text_fr + " " + Dates.format(this.props.current_creation_date)}</em>
                        <FormControl.Static className={"photoModalBody showNewLine"}>
                            {this.props.current_description}
                        </FormControl.Static>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.onPhotoCloseClick.bind(this)}><Glyphicon glyph="remove" /> {Texts.FERMER.text_fr}</Button>
                    </Modal.Footer>
                </Modal>

                <Modal show={this.props.showDeletePictureConfirm} bsSize={"small"} onHide={this.handleDeletePictureConfirmDismiss.bind(this)}>
                    <Modal.Header closeButton>
                        <Modal.Title>{Texts.SUPPRIMER_UNE_PHOTO.text_fr}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <FormControl.Static>
                            {Texts.ETES_VOUS_SUR_DE_VOULOIR_SUPPRIMER_CETTE_PHOTO.text_fr}
                        </FormControl.Static>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.handleDeletePictureConfirmDismiss.bind(this)}>
                            <Glyphicon glyph="remove" /> {Texts.FERMER.text_fr}
                        </Button>
                        <Button onClick={this.confirmPictureDelete.bind(this)}>
                            <Glyphicon glyph="ok" /> {Texts.CONFIRMER.text_fr}
                        </Button>
                    </Modal.Footer>
                </Modal>

            </Panel>
        );
    }
}

function mapStateToProps(state) {
    return {
        showPhotoModal: state.profile.showPhotoModal,
        photos: state.profile.photos,
        current_title: state.profile.current_title,
        current_source: state.profile.current_source,
        current_description: state.profile.current_description,
        current_creation_date: state.profile.current_creation_date,
        picture_title: state.profile.picture_title,
        picture_description: state.profile.picture_description,
        picture_preview: state.profile.picture_preview,

        delete_picture_id: state.profile.delete_picture_id,
        showDeletePictureConfirm: state.profile.showDeletePictureConfirm,

        album_is_load: state.global.album_is_load
    };
}

export default connect(mapStateToProps, {
    displayAlert,
    dismissAlert,
    displayPhotoModal,
    dismissPhotoModal,
    setPhotos,
    addPhoto,
    setPictureTitle,
    setPictureDescription,
    setPicturePreview,
    displayDeletePictureConfirm,
    dismissDeletePictureConfirm,
    deletePhoto,

    setAlbumIsLoad
})(ProfilePhotos);