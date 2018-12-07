import React from 'react';
import {
    Modal,
    Form,
    FormGroup,
    Col,
    FormControl,
    ControlLabel,
    Button,
    HelpBlock,
    Glyphicon,
    Panel, Checkbox
} from 'react-bootstrap';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';

import {
    setFirstName,
    setLastName,
    setPhone,
    setEmail,
    setPassword,
    setConfirmPassword,
    setName,
    setSiret,
    setDescription,
    setAddress,
    setAddressSecond,
    setZipCode,
    setCity,
    setCenterPhone,
    resetRegisterInfo,
    setCreateFitnessCenter
} from "../actions/registerActions";

import {
    displayAlert,
    dismissAlert,

    setIsPrincipal
} from "../actions/globalActions"

import Fields from "../utils/Fields";
import Status from "../utils/Status";
import Texts from "../utils/Texts";
import Paths from "../utils/Paths";
import Communication from "../utils/Communication";
import Validator from "../utils/Validator";

import '../styles/Login.css';

class Register extends React.Component {

    componentWillMount() {
        this.checkAuthToken();
    }

    checkAuthToken() {
        let token = localStorage.getItem('token');

        if (token === null) {
            return;
        }

        let params = {};

        params[Fields.TOKEN] = token;

        let me = this;
        let communication = new Communication('post', Paths.HOST + Paths.AUTHENTICATION_TOKEN, params);
        communication.sendRequest(
            function (response) {
                if (response.status === 200 && response.data.code === Status.AUTH_SUCCESS.code) {
                    me.props.setIsPrincipal(response.data.is_principal);
                    browserHistory.replace("/");
                }
            },
            function (error) {
            }
        );
    }

    handleRegisterClick() {

        if (!Validator.name(this.props.first_name) ||
            !Validator.name(this.props.last_name) ||
            (this.props.create_fitness_center && !Validator.description(this.props.name)) ||
            !Validator.siret(this.props.siret) ||
            (this.props.create_fitness_center && !Validator.description(this.props.description)) ||
            (this.props.create_fitness_center && !Validator.name(this.props.city)) ||
            (this.props.create_fitness_center && !Validator.address(this.props.address)) ||
            (this.props.create_fitness_center && this.props.address_second !== "" && !Validator.address(this.props.address_second)) ||
            !Validator.phoneNumber(this.props.phone) ||
            (this.props.create_fitness_center && this.props.center_phone !== "" && !Validator.phoneNumber(this.props.center_phone)) ||
            (this.props.create_fitness_center && !Validator.zipCode(this.props.zip_code)) ||
            !Validator.password(this.props.password) ||
            !Validator.password(this.props.confirm_password) ||
            !Validator.email(this.props.email)) {

            this.props.displayAlert({
                alertTitle: Texts.ERREUR_TITRE.text_fr,
                alertText: Texts.ERR_REMPLIR_TOUS_CHAMPS.text_fr
            });

            return;
        }

        if (this.props.password !== this.props.confirm_password) {

            this.props.displayAlert({
                alertTitle: Texts.ERREUR_TITRE.text_fr,
                alertText: Texts.ERR_CONFIRM_MDP.text_fr
            });

            return;
        }

        if (this.props.create_fitness_center === true) {
            this.register();
        } else {
            this.registerManagerOnly();
        }
    }

    register() {
        let params = {};

        params[Fields.FIRSTNAME] = this.props.first_name;
        params[Fields.LASTNAME] = this.props.last_name;
        params[Fields.PHONE] = this.props.phone;
        params[Fields.EMAIL] = this.props.email;
        params[Fields.PASSWORD] = this.props.password;
        params[Fields.NAME] = this.props.name;
        params[Fields.SIRET] = this.props.siret;
        params[Fields.DESCRIPTION] = this.props.description;
        params[Fields.ADDRESS] = this.props.address;
        if (this.props.address_second !== "" && this.props.address_second !== null) {
            params[Fields.ADDRESS_SECOND] = this.props.address_second;
        }
        params[Fields.ZIP_CODE] = this.props.zip_code;
        params[Fields.CITY] = this.props.city;
        if (this.props.center_phone !== "" && this.props.center_phone !== null) {
            params[Fields.CENTER_PHONE] = this.props.center_phone;
        }

        let me = this;

        let communication = new Communication('post', Paths.HOST + Paths.REGISTRATION, params);
        communication.sendRequest(
            function (response) {
                if (response.status === 200) {
                    if (response.data.code === Status.REG_SUCCESS.code) {

                        me.props.displayAlert({
                            alertTitle: Texts.CREATION_COMPTE_TITRE.text_fr,
                            alertText: Status.REG_SUCCESS.message_fr
                        });

                        me.props.resetRegisterInfo();

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

    registerManagerOnly(token) {
        let params = {};

        params[Fields.FIRSTNAME] = this.props.first_name;
        params[Fields.LASTNAME] = this.props.last_name;
        params[Fields.PHONE] = this.props.phone;
        params[Fields.EMAIL] = this.props.email;
        params[Fields.PASSWORD] = this.props.password;
        params[Fields.SIRET] = this.props.siret;

        let me = this;

        let communication = new Communication('post', Paths.HOST + Paths.MANAGER_REGISTRATION, params);
        communication.sendRequest(
            function (response) {
                if (response.status === 200) {
                    if (response.data.code === Status.REG_SUCCESS.code) {

                        me.props.displayAlert({
                            alertTitle: Texts.CREATION_COMPTE_TITRE.text_fr,
                            alertText: Status.REG_SUCCESS.message_fr
                        });

                        me.props.resetRegisterInfo();


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

    handleKeyPressed(event) {
        if (event.key === 'Enter') {
            this.handleRegisterClick();
        }
    }

    getValidationState(field) {

        let value;
        switch (field) {
            case "first_name":
                value = this.props.first_name;
                break;
            case "last_name":
                value = this.props.last_name;
                break;
            case "phone":
                value = this.props.phone;
                break;
            case "email":
                value = this.props.email;
                break;
            case "password":
                value = this.props.password;
                break;
            case "confirm_password":
                value = this.props.confirm_password;
                break;
            case "name":
                value = this.props.name;
                break;
            case "siret":
                value = this.props.siret;
                break;
            case "description":
                value = this.props.description;
                break;
            case "address":
                value = this.props.address;
                break;
            case "address_second":
                value = this.props.address_second;
                break;
            case "zip_code":
                value = this.props.zip_code;
                break;
            case "city":
                value = this.props.city;
                break;
            case "center_phone":
                value = this.props.center_phone;
                break;
            default:
                return "warning";
        }

        if (field === "first_name" || field === "last_name" || field === "city") {

            if (Validator.name(value))
                return "success";

        } else if (field === "description" || field === "name") {

            if (Validator.description(value))
                return "success";

        } else if (field === "address" || field === "address_second") {

            if (Validator.address(value))
                return "success";

        } else if (field === "phone" || field === "center_phone") {

            if (Validator.phoneNumber(value))
                return "success";

        } else if (field === "zip_code") {

            if (Validator.zipCode(value))
                return "success";

        } else if (field === "password" || field === "confirm_password") {

            if (Validator.password(value))
                return "success";

        } else if (field === "email") {

            if (Validator.email(value))
                return "success";

        } else if (field === "siret") {
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

    handlePasswordChange(event) {
        this.props.setPassword(event.target.value);
    }

    handleConfirmPasswordChange(event) {
        this.props.setConfirmPassword(event.target.value);
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

    handleCreateFitnessCenterChange(event) {
        this.props.setCreateFitnessCenter(event.target.checked);
    }

    handleAlertDismiss() {
        if (this.props.alertText === Status.REG_SUCCESS.message_fr) {
            browserHistory.replace('/auth');
        }
        this.props.dismissAlert();
    }

    render() {
        return (
            <div>
                <Modal className="wrapper" show={true}>
                    <Modal.Header>
                        <Modal.Title>{Texts.CENTRALE_FITNESS.text_fr + " - " + Texts.INTRA_GERANT.text_fr}</Modal.Title>
                        <Modal.Title>{Texts.CREATION_COMPTE_TITRE.text_fr}</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>

                        <Form horizontal>

                            <div align={"right"}>{Texts.INFORMATIONS_OBLIGATOIRE.text_fr}</div>

                            <h4>{Texts.GERANT.text_fr}</h4>

                            <FormGroup controlId="formHorizontalFirstName" validationState={this.getValidationState('first_name')}>
                                <Col componentClass={ControlLabel} sm={4}>
                                    {Texts.PRENOM.text_fr + " *"}
                                </Col>
                                <Col sm={7}>
                                    <FormControl
                                        value={this.props.first_name}
                                        onChange={this.handleFirstNameChange.bind(this)}
                                        onKeyPress={this.handleKeyPressed.bind(this)}
                                        type="text"
                                        placeholder={Texts.PRENOM.text_fr}
                                    />
                                </Col>
                            </FormGroup>

                            <FormGroup controlId="formHorizontalLastName" validationState={this.getValidationState('last_name')}>
                                <Col componentClass={ControlLabel} sm={4}>
                                    {Texts.NOM.text_fr + " *"}
                                </Col>
                                <Col sm={7}>
                                    <FormControl
                                        value={this.props.last_name}
                                        onChange={this.handleLastNameChange.bind(this)}
                                        onKeyPress={this.handleKeyPressed.bind(this)}
                                        type="text"
                                        placeholder={Texts.NOM.text_fr}
                                    />
                                </Col>
                            </FormGroup>

                            <FormGroup controlId="formHorizontalPhone" validationState={this.getValidationState('phone')}>
                                <Col componentClass={ControlLabel} sm={4}>
                                    {Texts.TELEPHONE.text_fr + " *"}
                                </Col>
                                <Col sm={7}>
                                    <FormControl
                                        value={this.props.phone}
                                        onChange={this.handlePhoneChange.bind(this)}
                                        onKeyPress={this.handleKeyPressed.bind(this)}
                                        type="text"
                                        placeholder={Texts.TELEPHONE.text_fr}
                                    />
                                </Col>
                            </FormGroup>

                            <FormGroup controlId="formHorizontalEmail" validationState={this.getValidationState('email')}>
                                <Col componentClass={ControlLabel} sm={4}>
                                    {Texts.EMAIL.text_fr + " *"}
                                </Col>
                                <Col sm={7}>
                                    <FormControl
                                        value={this.props.email}
                                        onChange={this.handleEmailChange.bind(this)}
                                        onKeyPress={this.handleKeyPressed.bind(this)}
                                        type="email"
                                        placeholder={Texts.EMAIL.text_fr}
                                    />
                                </Col>
                            </FormGroup>

                            <FormGroup controlId="formHorizontalPassword" validationState={this.getValidationState('password')}>
                                <Col componentClass={ControlLabel} sm={4}>
                                    {Texts.MDP.text_fr + " *"}
                                </Col>
                                <Col sm={7}>
                                    <FormControl
                                        value={this.props.password}
                                        onChange={this.handlePasswordChange.bind(this)}
                                        onKeyPress={this.handleKeyPressed.bind(this)}
                                        type="password"
                                        placeholder={Texts.MDP.text_fr}
                                    />
                                    <HelpBlock>{Texts.REGLE_MDP.text_fr}</HelpBlock>
                                </Col>
                            </FormGroup>

                            <FormGroup controlId="formHorizontalConfirmPassword" validationState={this.getValidationState('confirm_password')}>
                                <Col componentClass={ControlLabel} sm={4}>
                                    {Texts.CONFIRM_MDP.text_fr + " *"}
                                </Col>
                                <Col sm={7}>
                                    <FormControl
                                        value={this.props.confirm_password}
                                        onChange={this.handleConfirmPasswordChange.bind(this)}
                                        onKeyPress={this.handleKeyPressed.bind(this)}
                                        type="password"
                                        placeholder={Texts.CONFIRM_MDP.text_fr}
                                    />
                                </Col>
                            </FormGroup>

                            <FormGroup controlId="formHorizontalCreateClub">
                                <Col componentClass={ControlLabel} sm={4}>
                                    {Texts.CREER_UNE_SALLE_DE_SPORT.text_fr}
                                </Col>
                                <Col sm={7}>
                                    <Checkbox
                                        value={this.props.create_fitness_center}
                                        onChange={this.handleCreateFitnessCenterChange.bind(this)}
                                    />
                                </Col>
                            </FormGroup>



                            <br/><br/>



                            <Panel hidden={this.props.create_fitness_center}>
                                <h4>{Texts.SALLE_SPORT.text_fr}</h4>

                                <FormGroup controlId="formHorizontalSiretC" validationState={this.getValidationState('siret')}>
                                    <Col componentClass={ControlLabel} xs={4} sm={4} md={4} lg={4}>
                                        {Texts.NUMERO_DE_SIRET_DE_LA_SALLE_EXISTANTE.text_fr + " *"}
                                    </Col>
                                    <Col xs={8} sm={8} md={8} lg={8}>
                                        <FormControl
                                            value={this.props.siret}
                                            onChange={this.handleSiretChange.bind(this)}
                                            onKeyPress={this.handleKeyPressed.bind(this)}
                                            type="text"
                                            placeholder={Texts.NUMERO_DE_SIRET.text_fr}
                                        />
                                    </Col>
                                </FormGroup>
                            </Panel>



                            <Panel hidden={!this.props.create_fitness_center}>
                                <h4>{Texts.SALLE_SPORT.text_fr}</h4>

                                <FormGroup controlId="formHorizontalName" validationState={this.getValidationState('name')}>
                                    <Col componentClass={ControlLabel} sm={4}>
                                        {Texts.NOM_SALLE.text_fr + " *"}
                                    </Col>
                                    <Col sm={7}>
                                        <FormControl
                                            value={this.props.name}
                                            onChange={this.handleNameChange.bind(this)}
                                            onKeyPress={this.handleKeyPressed.bind(this)}
                                            type="text"
                                            placeholder={Texts.NOM_SALLE.text_fr}
                                        />
                                    </Col>
                                </FormGroup>

                                <FormGroup controlId="formHorizontalSiret" validationState={this.getValidationState('siret')}>
                                    <Col componentClass={ControlLabel} sm={4}>
                                        {Texts.NUMERO_DE_SIRET.text_fr + " *"}
                                    </Col>
                                    <Col sm={7}>
                                        <FormControl
                                            value={this.props.siret}
                                            onChange={this.handleSiretChange.bind(this)}
                                            onKeyPress={this.handleKeyPressed.bind(this)}
                                            type="text"
                                            placeholder={Texts.NUMERO_DE_SIRET.text_fr}
                                        />
                                    </Col>
                                </FormGroup>

                                <FormGroup controlId="formHorizontalDescription" validationState={this.getValidationState('description')}>
                                    <Col componentClass={ControlLabel} sm={4}>
                                        {Texts.DESCRIPTION.text_fr + " *"}
                                    </Col>
                                    <Col sm={7}>
                                        <FormControl
                                            value={this.props.description}
                                            onChange={this.handleDescriptionChange.bind(this)}
                                            onKeyPress={this.handleKeyPressed.bind(this)}
                                            componentClass="textarea"
                                            type="text"
                                            placeholder={Texts.DESCRIPTION.text_fr}
                                        />
                                    </Col>
                                </FormGroup>

                                <FormGroup controlId="formHorizontalAddress" validationState={this.getValidationState('address')}>
                                    <Col componentClass={ControlLabel} sm={4}>
                                        {Texts.ADRESSE.text_fr + " *"}
                                    </Col>
                                    <Col sm={7}>
                                        <FormControl
                                            value={this.props.address}
                                            onChange={this.handleAddressChange.bind(this)}
                                            onKeyPress={this.handleKeyPressed.bind(this)}
                                            type="text"
                                            placeholder={Texts.ADRESSE.text_fr}
                                        />
                                    </Col>
                                </FormGroup>

                                <FormGroup controlId="formHorizontalAddressSecond" validationState={this.getValidationState('address_second')}>
                                    <Col componentClass={ControlLabel} sm={4}>
                                        {Texts.ADRESSE_COMP.text_fr}
                                    </Col>
                                    <Col sm={7}>
                                        <FormControl
                                            value={this.props.address_second}
                                            onChange={this.handleAddressSecondChange.bind(this)}
                                            onKeyPress={this.handleKeyPressed.bind(this)}
                                            type="text"
                                            placeholder={Texts.ADRESSE_COMP.text_fr}
                                        />
                                    </Col>
                                </FormGroup>

                                <FormGroup controlId="formHorizontalZipCode" validationState={this.getValidationState('zip_code')}>
                                    <Col componentClass={ControlLabel} sm={4}>
                                        {Texts.CODE_POSTAL.text_fr + " *"}
                                    </Col>
                                    <Col sm={7}>
                                        <FormControl
                                            value={this.props.zip_code}
                                            onChange={this.handleZipCodeChange.bind(this)}
                                            onKeyPress={this.handleKeyPressed.bind(this)}
                                            type="text"
                                            placeholder={Texts.CODE_POSTAL.text_fr}
                                        />
                                    </Col>
                                </FormGroup>

                                <FormGroup controlId="formHorizontalCity" validationState={this.getValidationState('city')}>
                                    <Col componentClass={ControlLabel} sm={4}>
                                        {Texts.VILLE.text_fr + " *"}
                                    </Col>
                                    <Col sm={7}>
                                        <FormControl
                                            value={this.props.city}
                                            onChange={this.handleCityChange.bind(this)}
                                            onKeyPress={this.handleKeyPressed.bind(this)}
                                            type="text"
                                            placeholder={Texts.VILLE.text_fr}
                                        />
                                    </Col>
                                </FormGroup>

                                <FormGroup controlId="formHorizontalPhoneCenter" validationState={this.getValidationState('center_phone')}>
                                    <Col componentClass={ControlLabel} sm={4}>
                                        {Texts.TELEPHONE_SALLE.text_fr}
                                    </Col>
                                    <Col sm={7}>
                                        <FormControl
                                            value={this.props.center_phone}
                                            onChange={this.handleCenterPhoneChange.bind(this)}
                                            onKeyPress={this.handleKeyPressed.bind(this)}
                                            type="text"
                                            placeholder={Texts.TELEPHONE_SALLE.text_fr}
                                        />
                                    </Col>
                                </FormGroup>
                            </Panel>

                        </Form>
                    </Modal.Body>

                    <Modal.Footer>
                        <Button bsStyle="primary" onClick={this.handleRegisterClick.bind(this)}><Glyphicon glyph="ok" /> {Texts.CONFIRMER.text_fr}</Button>
                    </Modal.Footer>

                </Modal>

                <Modal show={this.props.showAlert} bsSize={"small"} onHide={this.handleAlertDismiss.bind(this)}>
                    <Modal.Header closeButton >
                        <Modal.Title>{this.props.alertTitle}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <FormControl.Static>
                            {this.props.alertText}
                        </FormControl.Static>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.handleAlertDismiss.bind(this)}><Glyphicon glyph="remove" />{Texts.FERMER.text_fr}</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        first_name: state.register.first_name,
        last_name: state.register.last_name,
        phone : state.register.phone,
        email: state.register.email,
        password: state.register.password,
        confirm_password: state.register.confirm_password,
        create_fitness_center: state.register.create_fitness_center,
        name: state.register.name,
        siret: state.register.siret,
        description: state.register.description,
        address: state.register.address,
        address_second: state.register.address_second,
        zip_code: state.register.zip_code,
        city: state.register.city,
        center_phone: state.register.center_phone,

        showAlert: state.global.showAlert,
        alertText: state.global.alertText,
        alertTitle: state.global.alertTitle
    };
}

export default connect(mapStateToProps, {
    displayAlert,
    dismissAlert,

    setIsPrincipal,

    setFirstName,
    setLastName,
    setPhone,
    setEmail,
    setPassword,
    setConfirmPassword,
    setName,
    setSiret,
    setDescription,
    setAddress,
    setAddressSecond,
    setZipCode,
    setCity,
    setCenterPhone,
    resetRegisterInfo,
    setCreateFitnessCenter
})(Register);