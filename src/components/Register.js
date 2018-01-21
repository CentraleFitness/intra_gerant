import React from 'react';
import {
    Modal,
    Form,
    FormGroup,
    Col,
    FormControl,
    ControlLabel,
    Button
} from 'react-bootstrap';
import {browserHistory} from 'react-router';

import Fields from "../utils/Fields";
import Communication from "../utils/Communication";
import Status from "../utils/Status";
import Texts from "../utils/Texts";
import Paths from "../utils/Paths";

import '../styles/Login.css';

class Register extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            first_name: "",
            last_name: "",
            phone : "",
            email: "",
            password: "",
            confirm_password: "",
            name: "",
            description: "",
            address: "",
            address_second: "",
            zip_code: "",
            city: "",
            center_phone: "",
            showLoginModal: true,
            showAlert: false,
            alertText: "",
            alertTitle: ""
        };
    }

    handleRegisterClick() {

        if (this.state.first_name === null || this.state.first_name === "" ||
            this.state.last_name === null || this.state.last_name === "" ||
            this.state.phone === null || this.state.phone === "" ||
            this.state.email === null || this.state.email === "" ||
            this.state.password === null || this.state.password === "" ||
            this.state.confirm_password === null || this.state.confirm_password === "" ||
            this.state.name === null || this.state.name === "" ||
            this.state.description === null || this.state.description === "" ||
            this.state.address === null || this.state.address === "" ||
            this.state.zip_code === null || this.state.zip_code === "" ||
            this.state.city === null || this.state.city === "") {

            this.setState({
                showAlert: true,
                alertTitle: Texts.ERREUR_TITRE.text_fr,
                alertText: Texts.ERR_REMPLIR_TOUS_CHAMPS.text_fr
            });

            return;
        }

        if (this.state.password !== this.state.confirm_password) {

            this.setState({
                showAlert: true,
                alertTitle: Texts.ERREUR_TITRE.text_fr,
                alertText: Texts.ERR_CONFIRM_MDP.text_fr
            });

            return;
        }

        this.register();
    }

    register() {
        let params = {};

        params[Fields.FIRSTNAME] = this.state.first_name;
        params[Fields.LASTNAME] = this.state.last_name;
        params[Fields.PHONE] = this.state.phone;
        params[Fields.EMAIL] = this.state.email;
        params[Fields.PASSWORD] = this.state.password;

        let me = this;

        let communication = new Communication('post', Paths.HOST + Paths.REGISTRATION, params);
        communication.sendRequest(
            function (response) {
                if (response.status === 200) {
                    if (response.data.code === Status.REG_SUCCESS.code) {

                        me.registerCenter(response.data.token);

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

    registerCenter(token) {
        let params = {};

        params[Fields.TOKEN] = token;
        params[Fields.NAME] = this.state.name;
        params[Fields.DESCRIPTION] = this.state.description;
        params[Fields.ADDRESS] = this.state.address;
        if (this.state.address_second !== "" && this.state.address_second !== null) {
            params[Fields.ADDRESS_SECOND] = this.state.address_second;
        }
        params[Fields.ZIP_CODE] = this.state.zip_code;
        params[Fields.CITY] = this.state.city;
        if (this.state.center_phone !== "" && this.state.center_phone !== null) {
            params[Fields.PHONE] = this.state.center_phone;
        }

        let me = this;

        let communication = new Communication('post', Paths.HOST + Paths.CENTER_REGISTER, params);
        communication.sendRequest(
            function (response) {
                if (response.status === 200) {
                    if (response.data.code === Status.CTR_REG_SUCCESS.code) {

                        me.setState({
                            showAlert: true,
                            alertTitle: Texts.CREATION_COMPTE_TITRE.text_fr,
                            alertText: Status.REG_SUCCESS.message_fr
                        });

                        localStorage.setItem('token', token);

                        setTimeout(function(){ browserHistory.replace('/'); }, 750);


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

    getValidationState(field) {

        let value;
        switch (field) {
            case "first_name":
                value = this.state.first_name;
                break;
            case "last_name":
                value = this.state.last_name;
                break;
            case "phone":
                value = this.state.phone;
                break;
            case "email":
                value = this.state.email;
                break;
            case "password":
                value = this.state.password;
                break;
            case "confirm_password":
                value = this.state.confirm_password;
                break;
            case "name":
                value = this.state.name;
                break;
            case "description":
                value = this.state.description;
                break;
            case "address":
                value = this.state.address;
                break;
            case "address_second":
                value = this.state.address_second;
                break;
            case "zip_code":
                value = this.state.zip_code;
                break;
            case "city":
                value = this.state.city;
                break;
            case "center_phone":
                value = this.state.center_phone;
                break;
        }

        if (field === "first_name" || field === "last_name" ||
            field === "name" || field === "description" ||
            field === "address" || field === "address_second" || field === "city") {

            if (value.length === 0)
                return 'warning';
            else
                return 'success';

        } else if (field === "phone" || field === "center_phone") {

            return 'warning';

        } else if (field === "zip_code") {

            if (value.length === 5)
                return 'success';
            else
                return 'warning';

        } else if (field === "password" || field === "confirm_password") {

            if (value.length >= 8)
                return 'success';
            else
                return 'warning';

        } else if (field === "email") {

            return 'warning';

        }
        return null;
    }

    handleFirstNameChange(event) {
        this.setState({
            first_name: event.target.value
        });
    }

    handleLastNameChange(event) {
        this.setState({
            last_name: event.target.value
        });
    }

    handlePhoneChange(event) {
        this.setState({
            phone: event.target.value
        });
    }

    handleEmailChange(event) {
        this.setState({
            email: event.target.value
        });
    }

    handlePasswordChange(event) {
        this.setState({
            password: event.target.value
        });
    }

    handleConfirmPasswordChange(event) {
        this.setState({
            confirm_password: event.target.value
        });
    }

    handleNameChange(event) {
        this.setState({
            name: event.target.value
        });
    }

    handleDescriptionChange(event) {
        this.setState({
            description: event.target.value
        });
    }

    handleAddressChange(event) {
        this.setState({
            address: event.target.value
        });
    }

    handleAddressSecondChange(event) {
        this.setState({
            address_second: event.target.value
        });
    }

    handleZipCodeChange(event) {
        this.setState({
            zip_code: event.target.value
        });
    }

    handleCityChange(event) {
        this.setState({
            city: event.target.value
        });
    }

    handleCenterPhoneChange(event) {
        this.setState({
            center_phone: event.target.value
        });
    }

    handleAlertDismiss() {
        this.setState({
            showAlert: false,
            alertTitle: "",
            alertText: ""
        });
    }

    render() {
        return (
            <div>
                <Modal className="wrapper" show={this.state.showLoginModal}>
                    <Modal.Header>
                        <Modal.Title>Centrale Fitness - Intranet G&eacute;rant</Modal.Title>
                        <Modal.Title>Création du compte</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>

                        <Form horizontal>

                            <div align={"right"}>* Informations obligatoires</div>

                            <h4>Gérant</h4>

                            <FormGroup controlId="formHorizontalFirstName" validationState={this.getValidationState('first_name')}>
                                <Col componentClass={ControlLabel} sm={4}>
                                    Prénom *
                                </Col>
                                <Col sm={7}>
                                    <FormControl value={this.state.first_name} onChange={this.handleFirstNameChange.bind(this)} type="text" placeholder="Prénom"/>
                                </Col>
                            </FormGroup>

                            <FormGroup controlId="formHorizontalLastName" validationState={this.getValidationState('last_name')}>
                                <Col componentClass={ControlLabel} sm={4}>
                                    Nom *
                                </Col>
                                <Col sm={7}>
                                    <FormControl value={this.state.last_name} onChange={this.handleLastNameChange.bind(this)} type="text" placeholder="Nom"/>
                                </Col>
                            </FormGroup>

                            <FormGroup controlId="formHorizontalPhone" validationState={this.getValidationState('phone')}>
                                <Col componentClass={ControlLabel} sm={4}>
                                    Téléphone *
                                </Col>
                                <Col sm={7}>
                                    <FormControl value={this.state.phone} onChange={this.handlePhoneChange.bind(this)} type="text" placeholder="Téléphone"/>
                                </Col>
                            </FormGroup>

                            <FormGroup controlId="formHorizontalEmail" validationState={this.getValidationState('email')}>
                                <Col componentClass={ControlLabel} sm={4}>
                                    Email *
                                </Col>
                                <Col sm={7}>
                                    <FormControl value={this.state.email} onChange={this.handleEmailChange.bind(this)} type="email" placeholder="Email"/>
                                </Col>
                            </FormGroup>

                            <FormGroup controlId="formHorizontalPassword" validationState={this.getValidationState('password')}>
                                <Col componentClass={ControlLabel} sm={4}>
                                    Mot de passe *
                                </Col>
                                <Col sm={7}>
                                    <FormControl value={this.state.password} onChange={this.handlePasswordChange.bind(this)} type="password" placeholder="Mot de passe"/>
                                </Col>
                            </FormGroup>

                            <FormGroup controlId="formHorizontalConfirmPassword" validationState={this.getValidationState('confirm_password')}>
                                <Col componentClass={ControlLabel} sm={4}>
                                    Confirmer mot de passe *
                                </Col>
                                <Col sm={7}>
                                    <FormControl value={this.state.confirm_password} onChange={this.handleConfirmPasswordChange.bind(this)} type="password" placeholder="Mot de passe"/>
                                </Col>
                            </FormGroup>

                            <br/><br/>
                            <h4>Salle de sport</h4>

                            <FormGroup controlId="formHorizontalName" validationState={this.getValidationState('name')}>
                                <Col componentClass={ControlLabel} sm={4}>
                                    Nom *
                                </Col>
                                <Col sm={7}>
                                    <FormControl value={this.state.name} onChange={this.handleNameChange.bind(this)} type="text" placeholder="Nom"/>
                                </Col>
                            </FormGroup>

                            <FormGroup controlId="formHorizontalDescription" validationState={this.getValidationState('description')}>
                                <Col componentClass={ControlLabel} sm={4}>
                                    Description *
                                </Col>
                                <Col sm={7}>
                                    <FormControl value={this.state.description} onChange={this.handleDescriptionChange.bind(this)} componentClass="textarea" type="text" placeholder="Description"/>
                                </Col>
                            </FormGroup>

                            <FormGroup controlId="formHorizontalAddress" validationState={this.getValidationState('address')}>
                                <Col componentClass={ControlLabel} sm={4}>
                                    Adresse *
                                </Col>
                                <Col sm={7}>
                                    <FormControl value={this.state.address} onChange={this.handleAddressChange.bind(this)} type="text" placeholder="Adresse"/>
                                </Col>
                            </FormGroup>

                            <FormGroup controlId="formHorizontalAddressSecond" validationState={this.getValidationState('address_second')}>
                                <Col componentClass={ControlLabel} sm={4}>
                                    Adresse complément
                                </Col>
                                <Col sm={7}>
                                    <FormControl value={this.state.address_second} onChange={this.handleAddressSecondChange.bind(this)} type="text" placeholder="Adresse complément"/>
                                </Col>
                            </FormGroup>

                            <FormGroup controlId="formHorizontalZipCode" validationState={this.getValidationState('zip_code')}>
                                <Col componentClass={ControlLabel} sm={4}>
                                    Code postal *
                                </Col>
                                <Col sm={7}>
                                    <FormControl value={this.state.zip_code} onChange={this.handleZipCodeChange.bind(this)} type="text" placeholder="Code postal"/>
                                </Col>
                            </FormGroup>

                            <FormGroup controlId="formHorizontalCity" validationState={this.getValidationState('city')}>
                                <Col componentClass={ControlLabel} sm={4}>
                                    Ville *
                                </Col>
                                <Col sm={7}>
                                    <FormControl value={this.state.city} onChange={this.handleCityChange.bind(this)} type="text" placeholder="Ville"/>
                                </Col>
                            </FormGroup>

                            <FormGroup controlId="formHorizontalPhoneCenter" validationState={this.getValidationState('center_phone')}>
                                <Col componentClass={ControlLabel} sm={4}>
                                    Téléphone
                                </Col>
                                <Col sm={7}>
                                    <FormControl value={this.state.center_phone} onChange={this.handleCenterPhoneChange.bind(this)} type="text" placeholder="Téléphone"/>
                                </Col>
                            </FormGroup>

                        </Form>
                    </Modal.Body>

                    <Modal.Footer>
                        <Button bsStyle="primary" onClick={this.handleRegisterClick.bind(this)}>Confirmer</Button>
                    </Modal.Footer>

                </Modal>

                <Modal show={this.state.showAlert} bsSize={"small"}>
                    <Modal.Header closeButton onHide={this.handleAlertDismiss.bind(this)}>
                        <Modal.Title>{this.state.alertTitle}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <FormControl.Static>
                            {this.state.alertText}
                        </FormControl.Static>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.handleAlertDismiss.bind(this)}>Close</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}

export default Register;