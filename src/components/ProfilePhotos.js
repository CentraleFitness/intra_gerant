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
    Image
} from 'react-bootstrap';

import Texts from "../utils/Texts";
import Dates from "../utils/Dates";
import Fields from "../utils/Fields";
import Communication from "../utils/Communication";
import Status from "../utils/Status";
import Paths from "../utils/Paths";

import '../styles/Profile.css';
import '../styles/ProfilePhotos.css';

class ProfilePhotos extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            showPhotoModal: false,
            photos: [],
            current_title: "",
            current_source: "",
            current_description: "",
            current_creation_date: 0,
            showAlert: false,
            alertTitle: "",
            alertText: "",
            picture_title: "",
            picture_description: "",
            picture_preview: "/img/folder.svg"
        };
    }

    componentWillMount() {
        this.getAlbum();
    }

    onPhotoClick(curItem) {
        this.setState({
            showPhotoModal: true,
            current_title: curItem.title,
            current_creation_date: curItem.creation_date,
            current_source: curItem.picture,
            current_description: curItem.description
        });
    }

    onAddPhotoClick() {

        if (this.centerAddPictureRef.value === "") {
            this.setState({
                showAlert: true,
                alertTitle: Texts.ERREUR_TITRE.text_fr,
                alertText: Texts.ERR_CHOISIR_UNE_IMAGE.text_fr
            });
        } else {
            this.addPicture(this.state.picture_preview);
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

                        me.setState({
                            photos: response.data.album
                        });

                    } else {

                        let message = "";
                        for (let key in Status) {
                            if (Status[key].code === response.data.code) {
                                message = Status[key].message_fr;
                                break;
                            }
                        }

                        me.setState({
                            showAlert: true,
                            alertTitle: Texts.ERREUR_TITRE.text_fr,
                            alertText: message
                        });
                    }
                } else {
                    me.setState({
                        showAlert: true,
                        alertTitle: Texts.ERREUR_TITRE.text_fr,
                        alertText: Texts.ERR_RESEAU.text_fr
                    });
                }
            },
            function (error) {
                me.setState({
                    showAlert: true,
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
        params[Fields.TITLE] = this.state.picture_title;
        params[Fields.DESCRIPTION] = this.state.picture_description;

        let me = this;

        let communication = new Communication('post', Paths.HOST + Paths.CENTER_INCREASE_ALBUM, params);
        communication.sendRequest(
            function (response) {
                if (response.status === 200) {
                    if (response.data.code === Status.GENERIC_OK.code) {

                        let tmp = me.state.photos;
                        tmp.push({
                            title: me.state.picture_title,
                            description: me.state.picture_description,
                            picture: me.state.picture_preview
                        });
                        me.setState({
                            photos: tmp
                        });

                    } else {

                        let message = "";
                        for (let key in Status) {
                            if (Status[key].code === response.data.code) {
                                message = Status[key].message_fr;
                                break;
                            }
                        }

                        me.setState({
                            showAlert: true,
                            alertTitle: Texts.ERREUR_TITRE.text_fr,
                            alertText: message
                        });
                    }
                } else {
                    me.setState({
                        showAlert: true,
                        alertTitle: Texts.ERREUR_TITRE.text_fr,
                        alertText: Texts.ERR_RESEAU.text_fr
                    });
                }
            },
            function (error) {
                me.setState({
                    showAlert: true,
                    alertTitle: Texts.ERREUR_TITRE.text_fr,
                    alertText: Texts.ERR_RESEAU.text_fr
                });
            }
        );
    }

    onPhotoCloseClick() {
        this.setState({
            showPhotoModal: false,
            current_title: "",
            current_source: "",
            current_creation_date: 0,
            current_description: ""
        });
    }

    handleAlertDismiss() {
        this.setState({
            showAlert: false,
            alertTitle: "",
            alertText: ""
        });
    }

    handlePictureTitleChange(event) {
        this.setState({
            picture_title: event.target.value
        });
    }

    handlePictureDescriptionChange(event) {
        this.setState({
            picture_description: event.target.value
        });
    }

    onUpdatePictureFile() {
        let me = this;
        let reader = new FileReader();
        reader.readAsDataURL(this.centerAddPictureRef.files[0]);
        reader.addEventListener("load", function () {
            me.setState({
                picture_preview: reader.result
            });
        }, false);
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
                                <FormControl
                                    type="text"
                                    placeholder={Texts.TITRE.text_fr}
                                    value={this.state.picture_title}
                                    onChange={this.handlePictureTitleChange.bind(this)}
                                />
                                <FormControl
                                    componentClass="textarea"
                                    placeholder={Texts.DESCRIPTION.text_fr}
                                    value={this.state.picture_description}
                                    onChange={this.handlePictureDescriptionChange.bind(this)}
                                />
                                <Button
                                    className={"center-block"}
                                    onClick={this.onAddPhotoClick.bind(this)}
                                >
                                    {Texts.AJOUTER.text_fr}
                                </Button>
                            </Col>
                            <Col xs={2} sm={3} md={5} lg={5}>
                                <Image
                                    src={this.state.picture_preview}
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
                            this.state.photos.map((item) => (
                                <span
                                    style={{cursor:"pointer"}}
                                    key={item.picture_id}
                                    onClick={this.onPhotoClick.bind(this, item)}
                                >
                                    <OverlayTrigger trigger={["hover", "focus"]} placement="top" overlay={
                                        <Popover title={item.title} id={"PhotoPopover"}>
                                            <strong>{item.description}</strong>
                                        </Popover>
                                    }>
                                        <Col xs={2} sm={2} md={2} lg={2}>
                                            <Thumbnail
                                                alt={item.title}
                                                src={item.picture}
                                                className={"center-block profileImage"}
                                            />
                                        </Col>
                                    </OverlayTrigger>
                                </span>
                            ))
                        }
                    </Row>
                </Grid>

                <Modal className={"photoModal"} show={this.state.showPhotoModal} onHide={this.onPhotoCloseClick.bind(this)}>
                    <Modal.Header closeButton>
                        <Modal.Title>{this.state.current_title}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Thumbnail alt={this.state.current_title} src={this.state.current_source} />
                        <em>{Dates.format(this.state.current_creation_date)}</em>
                        <FormControl.Static className={"photoModalBody"}>
                            {this.state.current_description}
                        </FormControl.Static>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.onPhotoCloseClick.bind(this)}>{Texts.FERMER.text_fr}</Button>
                    </Modal.Footer>
                </Modal>

                <Modal show={this.state.showAlert} bsSize={"small"} onHide={this.handleAlertDismiss.bind(this)}>
                    <Modal.Header closeButton>
                        <Modal.Title>{this.state.alertTitle}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <FormControl.Static>
                            {this.state.alertText}
                        </FormControl.Static>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.handleAlertDismiss.bind(this)}>{Texts.FERMER.text_fr}</Button>
                    </Modal.Footer>
                </Modal>

            </Panel>
        );
    }
}

export default ProfilePhotos;