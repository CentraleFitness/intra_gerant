import React from 'react';
import {
    Panel,
    Glyphicon,
    Grid,
    Row,
    Col,
    Image,
    Button,
    Form,
    FormGroup,
    FormControl,
    ControlLabel,
    Popover,
    OverlayTrigger,
    Modal,
    HelpBlock
} from 'react-bootstrap';
import { connect } from 'react-redux';
import {browserHistory} from 'react-router';

import {
    displayManagerPictureModal,
    dismissManagerPictureModal,
    displayCenterPictureModal,
    dismissCenterPictureModal,
    setManagerInfo,
    setCenterInfo,
    resetManagerCenterInfo,
    setManagerKeepInfo,
    setCenterKeepInfo,
    setFirstName,
    setLastName,
    setPhone,
    setEmail,
    setName,
    setSiret,
    setDescription,
    setAddress,
    setAddressSecond,
    setZipCode,
    setCity,
    setCenterPhone,
    setManagerPicturePreview,
    setCenterPicturePreview,
    setManagerPicture,
    setCenterPicture
} from "../actions/profileActions";

import {
    displayAlert,
    dismissAlert,
    setManagerPictureIsLoad
} from "../actions/globalActions";

import Texts from "../utils/Texts";
import Paths from "../utils/Paths";
import Communication from "../utils/Communication";
import Fields from "../utils/Fields";
import Status from "../utils/Status";
import Validator from "../utils/Validator";

import "../styles/Profile.css";

class ProfileInfo extends React.Component {

    componentWillMount() {
        if (this.props.manager_picture_is_load === false) {
            this.getManagerPicture();
        }
    }

    onUpdateManagerImageClick() {
        this.props.displayManagerPictureModal();
    }

    onUpdateManagerPictureFile() {
        let me = this;
        if (this.managerPictureInputFile.files.length > 0) {
            let reader = new FileReader();
            reader.readAsDataURL(this.managerPictureInputFile.files[0]);
            reader.addEventListener("load", function () {
                me.props.setManagerPicturePreview(reader.result);
            }, false);
        } else {
            me.props.setManagerPicturePreview("");
        }
    }

    onUpdateManagerImageSaveClick() {
        if (this.managerPictureInputFile.value === "") {

            this.props.displayAlert({
                alertTitle: Texts.ERREUR_TITRE.text_fr,
                alertText: Texts.ERR_CHOISIR_UNE_IMAGE.text_fr
            });

        } else {
            this.updateManagerPicture(this.props.manager_picture_preview);
            this.onUpdateManagerImageCloseClick();
        }
    }

    onUpdateManagerImageCloseClick() {
        this.props.setManagerPicturePreview("");
        this.props.dismissManagerPictureModal();
    }

    onUpdateCenterImageClick() {
        this.props.displayCenterPictureModal();
    }

    onUpdateCenterPictureFile() {
        let me = this;
        if (this.centerPictureInputFile.files.length > 0) {
            let reader = new FileReader();
            reader.readAsDataURL(this.centerPictureInputFile.files[0]);
            reader.addEventListener("load", function () {
                me.props.setCenterPicturePreview(reader.result);

            }, false);
        } else {
            me.props.setCenterPicturePreview("");
        }
    }

    onUpdateCenterImageSaveClick() {
        if (this.centerPictureInputFile.value === "") {

            this.props.displayAlert({
                alertTitle: Texts.ERREUR_TITRE.text_fr,
                alertText: Texts.ERR_CHOISIR_UNE_IMAGE.text_fr
            });

        } else {
            this.updateCenterPicture(this.props.center_picture_preview);
            this.onUpdateCenterImageCloseClick();
        }
    }

    onUpdateCenterImageCloseClick() {
        this.props.setCenterPicturePreview("");
        this.props.dismissCenterPictureModal();
    }

    onResetClick() {
        this.props.resetManagerCenterInfo();
    }

    checkUpdateManager() {
        return (this.props.manager_first_name !== this.props.manager_keep_first_name ||
            this.props.manager_last_name !== this.props.manager_keep_last_name ||
            this.props.manager_email !== this.props.manager_keep_email ||
            this.props.manager_phone !== this.props.manager_keep_phone);
    }

    checkUpdateCenter() {
        return (this.props.center_name !== this.props.center_keep_name ||
            this.props.center_address !== this.props.center_keep_address ||
            this.props.center_address2 !== this.props.center_keep_address2 ||
            this.props.center_zip_code !== this.props.center_keep_zip_code ||
            this.props.center_city !== this.props.center_keep_city ||
            this.props.center_phone !== this.props.center_keep_phone ||
            this.props.center_description !== this.props.center_keep_description);
    }

    onSaveClick() {

        if (!Validator.name(this.props.manager_first_name) ||
            !Validator.name(this.props.manager_last_name) ||
            !Validator.description(this.props.center_name) ||
            !Validator.description(this.props.center_description) ||
            !Validator.name(this.props.center_city) ||
            !Validator.address(this.props.center_address) ||
            (this.props.center_address2 !== "" && this.props.center_address2 !== null && !Validator.address(this.props.center_address2)) ||
            !Validator.phoneNumber(this.props.manager_phone) ||
            (this.props.center_phone !== "" && this.props.center_phone === null && !Validator.phoneNumber(this.props.center_phone)) ||
            !Validator.zipCode(this.props.center_zip_code) ||
            !Validator.email(this.props.manager_email)) {

            this.props.displayAlert({
                alertTitle: Texts.ERREUR_TITRE.text_fr,
                alertText: Texts.ERR_REMPLIR_TOUS_CHAMPS.text_fr
            });

            return;
        }

        let updateCenter = this.checkUpdateCenter();

        if (this.checkUpdateManager()) {

            this.updateManagerProfile(updateCenter);
        }

        if (this.checkUpdateCenter()) {

            this.updateCenterProfile();
        }
    }

    updateManagerProfile(updateCenter) {
        let params = {};

        params[Fields.TOKEN] = localStorage.getItem("token");
        params[Fields.FIRSTNAME] = this.props.manager_first_name;
        params[Fields.LASTNAME] = this.props.manager_last_name;
        params[Fields.PHONE] = this.props.manager_phone;

        let me = this;

        let communication = new Communication('post', Paths.HOST + Paths.MANAGER_UPDATE_PROFILE, params);
        communication.sendRequest(
            function (response) {
                if (response.status === 200) {
                    if (response.data.code === Status.GENERIC_OK.code) {

                        me.props.setManagerKeepInfo();

                        if (!updateCenter) {
                            me.props.displayAlert({
                                alertTitle: Texts.PROFIL.text_fr,
                                alertText: Texts.PROFIL_A_BIEN_ETE_MIS_A_JOUR.text_fr
                            });
                        }

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

                        if (Status.AUTH_ERROR_ACCOUNT_INACTIVE.code === response.data.code) {
                            localStorage.removeItem("token");
                            browserHistory.replace('/auth');
                        }
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

    updateCenterProfile() {
        let params = {};

        params[Fields.TOKEN] = localStorage.getItem("token");
        params[Fields.NAME] = this.props.center_name;
        params[Fields.DESCRIPTION] = this.props.center_description;
        params[Fields.ADDRESS] = this.props.center_address;
        if (this.props.center_address2 !== "" && this.props.center_address2 !== null) {
            params[Fields.ADDRESS_SECOND] = this.props.center_address2;
        }
        params[Fields.ZIP_CODE] = this.props.center_zip_code;
        params[Fields.CITY] = this.props.center_city;
        if (this.props.center_phone !== "" && this.props.center_phone !== null) {
            params[Fields.PHONE] = this.props.center_phone;
        }

        let me = this;

        let communication = new Communication('post', Paths.HOST + Paths.CENTER_UPDATE_PROFILE, params);
        communication.sendRequest(
            function (response) {
                if (response.status === 200) {
                    if (response.data.code === Status.GENERIC_OK.code) {

                        me.props.setCenterKeepInfo();

                        me.props.displayAlert({
                            alertTitle: Texts.PROFIL.text_fr,
                            alertText: Texts.PROFIL_A_BIEN_ETE_MIS_A_JOUR.text_fr
                        });

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

                        if (Status.AUTH_ERROR_ACCOUNT_INACTIVE.code === response.data.code) {
                            localStorage.removeItem("token");
                            browserHistory.replace('/auth');
                        }
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

    getManagerPicture() {
        let params = {};

        params[Fields.TOKEN] = localStorage.getItem("token");

        let me = this;

        let communication = new Communication('post', Paths.HOST + Paths.MANAGER_GET_PICTURE, params);
        communication.sendRequest(
            function (response) {
                if (response.status === 200) {
                    if (response.data.code === Status.GENERIC_OK.code) {

                        if (me !== undefined)
                            me.props.setManagerPicture(response.data[Fields.PICTURE]);
                        if (me !== undefined)
                            me.props.setManagerPictureIsLoad();

                    } else {

                        let message = "";
                        for (let key in Status) {
                            if (Status[key].code === response.data.code) {
                                message = Status[key].message_fr;
                                break;
                            }
                        }

                        if (me !== undefined) {
                            me.props.displayAlert({
                                alertTitle: Texts.ERREUR_TITRE.text_fr,
                                alertText: message
                            });

                            if (Status.AUTH_ERROR_ACCOUNT_INACTIVE.code === response.data.code) {
                                localStorage.removeItem("token");
                                browserHistory.replace('/auth');
                            }
                        }
                    }
                } else {
                    if (me !== undefined) {
                        me.props.displayAlert({
                            alertTitle: Texts.ERREUR_TITRE.text_fr,
                            alertText: Texts.ERR_RESEAU.text_fr
                        });
                    }
                }
            },
            function (error) {
                console.log(error.response.status);
                if (me !== undefined) {
                    me.props.displayAlert({
                        alertTitle: Texts.ERREUR_TITRE.text_fr,
                        alertText: Texts.ERR_RESEAU.text_fr
                    });
                }
            }
        );
    }

    updateManagerPicture(picture) {
        let params = {};

        params[Fields.TOKEN] = localStorage.getItem("token");
        params[Fields.PICTURE] = picture;

        let me = this;

        let communication = new Communication('post', Paths.HOST + Paths.MANAGER_UPDATE_PICTURE, params);
        communication.sendRequest(
            function (response) {
                if (response.status === 200) {
                    if (response.data.code === Status.GENERIC_OK.code) {

                        me.props.setManagerPicture(picture);

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

                        if (Status.AUTH_ERROR_ACCOUNT_INACTIVE.code === response.data.code) {
                            localStorage.removeItem("token");
                            browserHistory.replace('/auth');
                        }
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

    updateCenterPicture(picture) {
        let params = {};

        params[Fields.TOKEN] = localStorage.getItem("token");
        params[Fields.PICTURE] = picture;

        let me = this;

        let communication = new Communication('post', Paths.HOST + Paths.CENTER_UPDATE_PICTURE, params);
        communication.sendRequest(
            function (response) {
                if (response.status === 200) {
                    if (response.data.code === Status.GENERIC_OK.code) {

                        me.props.setCenterPicture(picture);

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

                        if (Status.AUTH_ERROR_ACCOUNT_INACTIVE.code === response.data.code) {
                            localStorage.removeItem("token");
                            browserHistory.replace('/auth');
                        }
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

    getValidationState(field) {

        let value;
        switch (field) {
            case "manager_first_name":
                value = this.props.manager_first_name;
                break;
            case "manager_last_name":
                value = this.props.manager_last_name;
                break;
            case "manager_phone":
                value = this.props.manager_phone;
                break;
            case "manager_email":
                value = this.props.manager_email;
                break;
            case "center_name":
                value = this.props.center_name;
                break;
            case "center_siret":
                value = this.props.center_siret;
                break;
            case "center_description":
                value = this.props.center_description;
                break;
            case "center_address":
                value = this.props.center_address;
                break;
            case "center_address_second":
                value = this.props.center_address2;
                break;
            case "center_zip_code":
                value = this.props.center_zip_code;
                break;
            case "center_city":
                value = this.props.center_city;
                break;
            case "center_phone":
                value = this.props.center_phone;
                break;
            default:
                return "warning";
        }

        if (field === "manager_first_name" || field === "manager_last_name" || field === "center_city") {

            if (Validator.name(value))
                return "success";

        } else if (field === "center_description" || field === "center_name") {

            if (Validator.description(value))
                return "success";

        } else if (field === "center_address" || field === "center_address_second") {

            if (Validator.address(value))
                return "success";

        } else if (field === "manager_phone" || field === "center_phone") {

            if (Validator.phoneNumber(value))
                return "success";

        } else if (field === "center_zip_code") {

            if (Validator.zipCode(value))
                return "success";

        } else if (field === "manager_email") {

            if (Validator.email(value))
                return "success";
        } else if (field === "center_siret") {

            if (Validator.siret(value))
                return "success";
        }
        return "warning";
    }

    handleFirstNameChange(event) {
        this.props.setFirstName(event.target.value);
    }

    handleLastNameChange(event) {
        this.props.setLastName(event.target.value);
    }

    handlePhoneChange(event) {
        this.props.setPhone(event.target.value);
    }

    handleEmailChange(event) {
        this.props.setEmail(event.target.value);
    }

    handleNameChange(event) {
        this.props.setName(event.target.value);
    }

    handleSiretChange(event) {
        this.props.setSiret(event.target.value);
    }

    handleDescriptionChange(event) {
        this.props.setDescription(event.target.value);
    }

    handleAddressChange(event) {
        this.props.setAddress(event.target.value);
    }

    handleAddressSecondChange(event) {
        this.props.setAddressSecond(event.target.value);
    }

    handleZipCodeChange(event) {
        this.props.setZipCode(event.target.value);
    }

    handleCityChange(event) {
        this.props.setCity(event.target.value);
    }

    handleCenterPhoneChange(event) {
        this.props.setCenterPhone(event.target.value);
    }

    render() {

        const popoverPhone = (
            <Popover title={Texts.TELEPHONE.text_fr} id={"ProfilePopoverPhone"}>
                <strong>{Texts.NUMERO_PAS_VISIBLE.text_fr}</strong>
            </Popover>
        );

        return (
            <Panel>
                <Panel header={<div><Glyphicon glyph="user" /> {Texts.PROFIL.text_fr + " " + Texts.GERANT.text_fr}</div>} bsStyle="primary">
                    <Grid fluid={true}>
                        <Row>
                            <Col xs={9} sm={9} md={9} lg={9}>
                                <Form horizontal>
                                    <FormGroup controlId="formHorizontalFirstName" validationState={this.getValidationState('manager_first_name')}>
                                        <Col componentClass={ControlLabel} sm={2}>
                                            {Texts.PRENOM.text_fr}
                                        </Col>
                                        <Col sm={8}>
                                            <FormControl
                                                type="text"
                                                placeholder={Texts.PRENOM.text_fr}
                                                value={this.props.manager_first_name}
                                                onChange={this.handleFirstNameChange.bind(this)}
                                            />
                                        </Col>
                                    </FormGroup>

                                    <FormGroup controlId="formHorizontalLastName" validationState={this.getValidationState('manager_last_name')}>
                                        <Col componentClass={ControlLabel} sm={2}>
                                            {Texts.NOM.text_fr}
                                        </Col>
                                        <Col sm={8}>
                                            <FormControl
                                                type="text"
                                                placeholder={Texts.NOM.text_fr}
                                                value={this.props.manager_last_name}
                                                onChange={this.handleLastNameChange.bind(this)}
                                            />
                                        </Col>
                                    </FormGroup>

                                    <FormGroup controlId="formHorizontalEmail" validationState={this.getValidationState('manager_email')}>
                                        <Col componentClass={ControlLabel} sm={2}>
                                            {Texts.EMAIL.text_fr}
                                        </Col>
                                        <Col sm={8}>
                                            <FormControl
                                                readOnly
                                                type="email"
                                                placeholder={Texts.EMAIL.text_fr}
                                                value={this.props.manager_email}
                                                onChange={this.handleEmailChange.bind(this)}
                                            />
                                        </Col>
                                    </FormGroup>
                                    <FormGroup controlId="formHorizontalPhone"  validationState={this.getValidationState('manager_phone')}>
                                        <OverlayTrigger trigger={["hover", "focus"]} placement="top" overlay={popoverPhone}>
                                            <Col componentClass={ControlLabel} sm={2}>
                                                {Texts.TELEPHONE.text_fr + " *"}
                                            </Col>
                                        </OverlayTrigger>
                                        <Col sm={8}>
                                            <FormControl
                                                type="text"
                                                placeholder={Texts.TELEPHONE.text_fr}
                                                value={this.props.manager_phone}
                                                onChange={this.handlePhoneChange.bind(this)}
                                            />
                                        </Col>
                                    </FormGroup>
                                </Form>
                            </Col>
                            <Col xs={2} sm={2} md={2} lg={2}>
                                <Image
                                    src={(this.props.manager_picture === "" ? "/img/user.svg" : this.props.manager_picture)}
                                    circle
                                    responsive={true}
                                    thumbnail={true}
                                    className={"center-block profileImage"}
                                />
                                <Button
                                    block
                                    onClick={this.onUpdateManagerImageClick.bind(this)}
                                >
                                    <Glyphicon glyph="picture" /> {Texts.MODIFIER_IMG.text_fr}
                                </Button>
                            </Col>
                        </Row>
                    </Grid>

                    <Modal show={this.props.showManagerPictureModal} onHide={this.onUpdateManagerImageCloseClick.bind(this)}>
                        <Modal.Header closeButton>
                            <Modal.Title>{Texts.MODIFIER_IMG_PROFIL_GERANT.text_fr}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <FormGroup controlId="formControlsManagerPictureFile">
                                <ControlLabel>
                                    {Texts.SELECTIONNER_IMG.text_fr}
                                    </ControlLabel>
                                <FormControl
                                    type="file"
                                    accept=".png,.jpg,.svg"
                                    inputRef={ref => this.managerPictureInputFile = ref}
                                    onChange={this.onUpdateManagerPictureFile.bind(this)}
                                />
                                <HelpBlock>
                                    {Texts.FORMATS_AUTORISES.text_fr}
                                </HelpBlock>
                                <Image
                                    src={this.props.manager_picture_preview}
                                    circle
                                    responsive={true}
                                    thumbnail={true}
                                    className={"center-block profileImage"}
                                />
                            </FormGroup>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button onClick={this.onUpdateManagerImageCloseClick.bind(this)}><Glyphicon glyph="remove" /> {Texts.FERMER.text_fr}</Button>
                            <Button bsStyle="primary" onClick={this.onUpdateManagerImageSaveClick.bind(this)}><Glyphicon glyph="floppy-disk" /> {Texts.SAUVEGARDER.text_fr}</Button>
                        </Modal.Footer>
                    </Modal>

                </Panel>

                <Panel header={<div><Glyphicon glyph="info-sign" /> {Texts.PROFIL_SALLE.text_fr}</div>} bsStyle="primary">
                    <Grid fluid={true}>
                        <Row>
                            <Col xs={9} sm={9} md={9} lg={9}>
                                <Form horizontal>
                                    <FormGroup controlId="formHorizontalName" validationState={this.getValidationState('center_name')}>
                                        <Col componentClass={ControlLabel} sm={2}>
                                            {Texts.NOM_SALLE.text_fr}
                                        </Col>
                                        <Col sm={8}>
                                            <FormControl
                                                type="text"
                                                placeholder={Texts.NOM_SALLE.text_fr}
                                                value={this.props.center_name}
                                                onChange={this.handleNameChange.bind(this)}
                                            />
                                        </Col>
                                    </FormGroup>

                                    <FormGroup controlId="formHorizontalSiret" validationState={this.getValidationState('center_siret')}>
                                        <Col componentClass={ControlLabel} sm={2}>
                                            {Texts.NUMERO_DE_SIRET.text_fr}
                                        </Col>
                                        <Col sm={8}>
                                            <FormControl
                                                readOnly
                                                type="text"
                                                placeholder={Texts.NUMERO_DE_SIRET.text_fr}
                                                value={this.props.center_siret}
                                                onChange={this.handleSiretChange.bind(this)}
                                            />
                                        </Col>
                                    </FormGroup>

                                    <FormGroup controlId="formHorizontalAddress" validationState={this.getValidationState('center_address')}>
                                        <Col componentClass={ControlLabel} sm={2}>
                                            {Texts.ADRESSE.text_fr}
                                        </Col>
                                        <Col sm={8}>
                                            <FormControl
                                                type="text"
                                                placeholder={Texts.ADRESSE.text_fr}
                                                value={this.props.center_address}
                                                onChange={this.handleAddressChange.bind(this)}
                                            />
                                        </Col>
                                    </FormGroup>

                                    <FormGroup controlId="formHorizontalAddressSecond" validationState={this.getValidationState('center_address_second')}>
                                        <Col componentClass={ControlLabel} sm={2}>
                                            {Texts.ADRESSE_COMP.text_fr}
                                        </Col>
                                        <Col sm={8}>
                                            <FormControl
                                                type="text"
                                                placeholder={Texts.ADRESSE_COMP_FACULTATIVE.text_fr}
                                                value={this.props.center_address2}
                                                onChange={this.handleAddressSecondChange.bind(this)}
                                            />
                                        </Col>
                                    </FormGroup>
                                    <FormGroup controlId="formHorizontalZipCode" validationState={this.getValidationState('center_zip_code')}>
                                        <Col componentClass={ControlLabel} sm={2}>
                                            {Texts.CODE_POSTAL.text_fr}
                                        </Col>
                                        <Col sm={8}>
                                            <FormControl
                                                type="text"
                                                placeholder={Texts.CODE_POSTAL.text_fr}
                                                value={this.props.center_zip_code}
                                                onChange={this.handleZipCodeChange.bind(this)}
                                            />
                                        </Col>
                                    </FormGroup>
                                    <FormGroup controlId="formHorizontalCity" validationState={this.getValidationState('center_city')}>
                                        <Col componentClass={ControlLabel} sm={2}>
                                            {Texts.VILLE.text_fr}
                                        </Col>
                                        <Col sm={8}>
                                            <FormControl
                                                type="text"
                                                placeholder={Texts.VILLE.text_fr}
                                                value={this.props.center_city}
                                                onChange={this.handleCityChange.bind(this)}
                                            />
                                        </Col>
                                    </FormGroup>
                                    <FormGroup controlId="formHorizontalCenterPhone" validationState={this.getValidationState('center_phone')}>
                                        <Col componentClass={ControlLabel} sm={2}>
                                            {Texts.TELEPHONE_SALLE.text_fr}
                                        </Col>
                                        <Col sm={8}>
                                            <FormControl
                                                type="text"
                                                placeholder={Texts.TELEPHONE_SALLE_FACULTATIF.text_fr}
                                                value={this.props.center_phone}
                                                onChange={this.handleCenterPhoneChange.bind(this)}
                                            />
                                        </Col>
                                    </FormGroup>
                                    <FormGroup controlId="formControlsDescription" validationState={this.getValidationState('center_description')}>
                                        <Col componentClass={ControlLabel} sm={2}>
                                            {Texts.DESCRIPTION.text_fr}
                                        </Col>
                                        <Col sm={8}>
                                            <FormControl
                                                componentClass="textarea"
                                                placeholder={Texts.DESCRIPTION.text_fr}
                                                value={this.props.center_description}
                                                onChange={this.handleDescriptionChange.bind(this)}
                                            />
                                        </Col>
                                    </FormGroup>
                                </Form>
                            </Col>
                            <Col xs={2} sm={2} md={2} lg={2}>
                                <Image
                                    src={(this.props.center_picture === "" ? "/img/store.svg" : this.props.center_picture)}
                                    rounded
                                    responsive={true}
                                    thumbnail={true}
                                    className={"center-block profileImage"}
                                />
                                <Button
                                    block
                                    onClick={this.onUpdateCenterImageClick.bind(this)}
                                >
                                    <Glyphicon glyph="picture" /> {Texts.MODIFIER_IMG.text_fr}
                                </Button>
                            </Col>
                        </Row>
                    </Grid>

                    <Modal show={this.props.showCenterPictureModal} onHide={this.onUpdateCenterImageCloseClick.bind(this)}>
                        <Modal.Header closeButton>
                            <Modal.Title>{Texts.MODIFIER_IMG_SALLE.text_fr}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <FormGroup controlId="formControlsCenterPictureFile">
                                <ControlLabel>
                                    {Texts.SELECTIONNER_IMG.text_fr}
                                </ControlLabel>
                                <FormControl
                                    type="file"
                                    accept=".png,.jpg,.svg"
                                    inputRef={ref => this.centerPictureInputFile = ref}
                                    onChange={this.onUpdateCenterPictureFile.bind(this)}
                                />
                                <HelpBlock>
                                    {Texts.FORMATS_AUTORISES.text_fr}
                                </HelpBlock>
                                <Image
                                    src={this.props.center_picture_preview}
                                    rounded
                                    responsive={true}
                                    thumbnail={true}
                                    className={"center-block profileImage"}
                                />
                            </FormGroup>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button onClick={this.onUpdateCenterImageCloseClick.bind(this)}><Glyphicon glyph="remove" /> {Texts.FERMER.text_fr}</Button>
                            <Button bsStyle="primary" onClick={this.onUpdateCenterImageSaveClick.bind(this)}><Glyphicon glyph="floppy-disk" /> {Texts.SAUVEGARDER.text_fr}</Button>
                        </Modal.Footer>
                    </Modal>

                </Panel>
                <Col xs={4} sm={4} md={4} lg={4}>
                </Col>
                <Col xs={2} sm={2} md={2} lg={2}>
                    <Button
                        block
                        onClick={this.onResetClick.bind(this)}
                    >
                        <Glyphicon glyph="repeat" /> {Texts.REINITIALISER.text_fr}
                    </Button>
                </Col>
                <Col xs={2} sm={2} md={2} lg={2}>
                    <Button
                        block
                        bsStyle="primary"
                        onClick={this.onSaveClick.bind(this)}
                    >
                        <Glyphicon glyph="floppy-disk" /> {Texts.SAUVEGARDER.text_fr}
                    </Button>
                </Col>
                <Col xs={4} sm={4} md={4} lg={4}>
                </Col>
            </Panel>
        );
    }
}

function mapStateToProps(state) {
    return {
        manager_first_name: state.profile.manager_first_name,
        manager_last_name: state.profile.manager_last_name,
        manager_email: state.profile.manager_email,
        manager_phone: state.profile.manager_phone,

        center_name: state.profile.center_name,
        center_siret: state.profile.center_siret,
        center_address: state.profile.center_address,
        center_address2: state.profile.center_address2,
        center_zip_code: state.profile.center_zip_code,
        center_city: state.profile.center_city,
        center_phone: state.profile.center_phone,
        center_description: state.profile.center_description,
        center_nb_subscribers: state.profile.center_nb_subscribers,
        center_nb_followers: state.profile.center_nb_followers,

        manager_keep_first_name: state.profile.manager_keep_first_name,
        manager_keep_last_name: state.profile.manager_keep_last_name,
        manager_keep_email: state.profile.manager_keep_email,
        manager_keep_phone: state.profile.manager_keep_phone,

        center_keep_name: state.profile.center_keep_name,
        center_keep_siret: state.profile.center_keep_siret,
        center_keep_address: state.profile.center_keep_address,
        center_keep_address2: state.profile.center_keep_address2,
        center_keep_zip_code: state.profile.center_keep_zip_code,
        center_keep_city: state.profile.center_keep_city,
        center_keep_phone: state.profile.center_keep_phone,
        center_keep_description: state.profile.center_keep_description,

        showManagerPictureModal: state.profile.showManagerPictureModal,
        showCenterPictureModal: state.profile.showCenterPictureModal,

        manager_picture_preview: state.profile.manager_picture_preview,
        center_picture_preview: state.profile.center_picture_preview,

        manager_picture: state.profile.manager_picture,
        center_picture: state.profile.center_picture,

        showAlert: state.global.showAlert,
        alertTitle: state.global.alertTitle,
        alertText: state.global.alertText,

        manager_picture_is_load: state.global.manager_picture_is_load
    };
}

export default connect(mapStateToProps, {
    displayAlert,
    dismissAlert,
    displayManagerPictureModal,
    dismissManagerPictureModal,
    displayCenterPictureModal,
    dismissCenterPictureModal,
    setManagerInfo,
    setCenterInfo,
    resetManagerCenterInfo,
    setManagerKeepInfo,
    setCenterKeepInfo,
    setFirstName,
    setLastName,
    setPhone,
    setEmail,
    setName,
    setSiret,
    setDescription,
    setAddress,
    setAddressSecond,
    setZipCode,
    setCity,
    setCenterPhone,
    setManagerPicturePreview,
    setCenterPicturePreview,
    setManagerPicture,
    setCenterPicture,

    setManagerPictureIsLoad
})(ProfileInfo);