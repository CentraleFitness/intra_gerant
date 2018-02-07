import React from 'react';
import {
    Modal,
    Button,
    FormGroup,
    Col,
    FormControl,
    ControlLabel,
    Form,
    Checkbox,
    Image,
    Glyphicon
} from 'react-bootstrap';
import {browserHistory} from 'react-router';
import { connect } from 'react-redux';

import {
    displayAlert,
    dismissAlert,
    setEmail,
    setPassword,
    setRemember
} from "../actions/loginActions";

import Communication from '../utils/Communication';
import Paths from '../utils/Paths';
import Fields from '../utils/Fields';
import Status from '../utils/Status';
import Texts from '../utils/Texts';
import Validator from "../utils/Validator";

import '../styles/Login.css';

class Login extends React.Component {

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

        let communication = new Communication('post', Paths.HOST + Paths.AUTHENTICATION_TOKEN, params);
        communication.sendRequest(
            function (response) {
                if (response.status === 200 && response.data.code === Status.AUTH_SUCCESS.code) {
                    browserHistory.replace("/");
                }
            },
            function (error) {
            }
        );
    }

    handleEmailChange(event) {
        this.props.setEmail(event.target.value);
    }

    handlePasswordChange(event) {
        this.props.setPassword(event.target.value);
    }

    handleRememberChange(event) {
        this.props.setRemember(event.target.checked);
    }

    handleLoginClick() {

        if (!Validator.email(this.props.email) ||
            !Validator.password(this.props.password)) {

            this.props.displayAlert({
                alertTitle: Texts.ERREUR_TITRE.text_fr,
                alertText: Texts.ERR_REMPLIR_TOUS_CHAMPS.text_fr
            });

            return;
        }

        this.login();
    }

    login() {
        let params = {};

        params[Fields.EMAIL] = this.props.email;
        params[Fields.PASSWORD] = this.props.password;

        let me = this;

        let communication = new Communication('post', Paths.HOST + Paths.AUTHENTICATION, params);
        communication.sendRequest(
            function (response) {
                if (response.status === 200) {
                    if (response.data.code === Status.AUTH_SUCCESS.code) {

                        me.props.displayAlert({
                            alertTitle: Texts.CONNEXION_TITRE.text_fr,
                            alertText: Status.AUTH_SUCCESS.message_fr
                        });

                        localStorage.setItem('token', response.data.token);

                        setTimeout(function() {
                            me.props.dismissAlert();
                            browserHistory.replace('/');
                        }, 750);
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

    handleRegisterClick() {

        this.props.setEmail("");
        this.props.setPassword("");
        browserHistory.push('/register');
    }

    handleAlertDismiss() {
        this.props.dismissAlert();
    }

    handleKeyPressed(event) {
        if (event.key === 'Enter') {
            this.handleLoginClick();
        }
    }

    getValidationState(field) {

        let value;
        switch (field) {
            case "email":
                value = this.props.email;
                break;
            case "password":
                value = this.props.password;
                break;
            default:
                return "warning";
        }

        if (field === "password") {

            if (Validator.password(value))
                return "success";

        } else if (field === "email") {

            if (Validator.email(value))
                return "success";
        }
        return "warning";
    }

    render() {
        return (

            <div>
                <Modal className="wrapper" show={true}>
                    <Modal.Header>
                        <Modal.Title>{Texts.CENTRALE_FITNESS.text_fr + " - " + Texts.INTRA_GERANT.text_fr}</Modal.Title>
                        <Modal.Title>{Texts.CONNEXION_TITRE.text_fr}</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>

                        <Image
                            src={"/img/logo_cf.svg"}
                            rounded
                            responsive={true}

                            className={"center-block logo"}
                        />

                        <Form horizontal>
                            <FormGroup controlId="formHorizontalEmail" validationState={this.getValidationState('email')}>
                                <Col componentClass={ControlLabel} sm={3}>
                                    {Texts.EMAIL.text_fr}
                                </Col>
                                <Col sm={9}>
                                    <FormControl
                                        value={this.props.email}
                                        type="email"
                                        placeholder={Texts.EMAIL.text_fr}
                                        onChange={ this.handleEmailChange.bind(this) }
                                        onKeyPress={this.handleKeyPressed.bind(this)}
                                    />
                                </Col>
                            </FormGroup>

                            <FormGroup controlId="formHorizontalPassword" validationState={this.getValidationState('password')}>
                                <Col componentClass={ControlLabel} sm={3}>
                                    {Texts.MDP.text_fr}
                                </Col>
                                <Col sm={9}>
                                    <FormControl
                                        value={this.props.password}
                                        type="password"
                                        placeholder={Texts.MDP.text_fr}
                                        onChange={ this.handlePasswordChange.bind(this) }
                                        onKeyPress={this.handleKeyPressed.bind(this)}
                                    />
                                </Col>
                            </FormGroup>

                            <FormGroup>
                                <Col smOffset={2} sm={10}>
                                    <Checkbox
                                        value={this.props.remember}
                                        onChange={this.handleRememberChange.bind(this)}
                                    >
                                        {Texts.SE_SOUVENIR.text_fr}
                                    </Checkbox>
                                </Col>
                            </FormGroup>

                        </Form>
                    </Modal.Body>

                    <Modal.Footer>
                        <Button bsStyle="success" onClick={this.handleRegisterClick.bind(this)}>
                            <Glyphicon glyph="wrench" /> {Texts.CREER_COMPTE.text_fr}
                        </Button>
                        <Button><Glyphicon glyph="warning-sign" /> {Texts.MDP_OUBLIE.text_fr}</Button>
                        <Button bsStyle="primary" onClick={this.handleLoginClick.bind(this)}>
                            <Glyphicon glyph="log-in" /> {Texts.CONNEXION_TITRE.text_fr}
                        </Button>
                    </Modal.Footer>

                </Modal>

                <Modal show={this.props.showAlert} bsSize={"small"} onHide={this.handleAlertDismiss.bind(this)}>
                    <Modal.Header closeButton>
                        <Modal.Title>{this.props.alertTitle}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <FormControl.Static>
                            {this.props.alertText}
                        </FormControl.Static>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.handleAlertDismiss.bind(this)}><Glyphicon glyph="remove" /> {Texts.FERMER.text_fr}</Button>
                    </Modal.Footer>
                </Modal>
            </div>

        );
    }
}

function mapStateToProps(state) {
    return {
        email: state.login.email,
        password: state.login.password,
        remember: state.login.remember,
        showAlert: state.login.showAlert,
        alertText: state.login.alertText,
        alertTitle: state.login.alertTitle
    };
}

export default connect(mapStateToProps, {
    displayAlert,
    dismissAlert,
    setEmail,
    setPassword,
    setRemember
})(Login);