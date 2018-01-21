import React from 'react';
import {
    Modal,
    Button,
    FormGroup,
    Col,
    FormControl,
    ControlLabel,
    Form,
    Checkbox
} from 'react-bootstrap';
import {browserHistory} from 'react-router';

import Communication from '../utils/Communication';
import Paths from '../utils/Paths';
import Fields from '../utils/Fields';
import Status from '../utils/Status';
import Texts from '../utils/Texts';

import '../styles/Login.css';

class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            remember: false,
            showLoginModal: true,
            showAlert: false,
            alertText: "",
            alertTitle: ""
        };
    }

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
        this.setState({
            email: event.target.value
        });
    }

    handlePasswordChange(event) {
        this.setState({
            password: event.target.value
        });
    }

    handleRememberChange(event) {
        this.setState({
            remember: (event.target.checked)
        });
    }

    handleLoginClick() {

        if (this.state.email === null || this.state.email === "" ||
            this.state.password === null || this.state.password === "") {

            this.setState({
                showAlert: true,
                alertTitle: Texts.ERREUR_TITRE.text_fr,
                alertText: Texts.ERR_REMPLIR_TOUS_CHAMPS.text_fr
            });

            return;
        }

        this.login();
    }

    login() {
        let params = {};

        params[Fields.EMAIL] = this.state.email;
        params[Fields.PASSWORD] = this.state.password;

        let me = this;

        let communication = new Communication('post', Paths.HOST + Paths.AUTHENTICATION, params);
        communication.sendRequest(
            function (response) {
                if (response.status === 200) {
                    if (response.data.code === Status.AUTH_SUCCESS.code) {

                        me.setState({
                            showAlert: true,
                            alertTitle: Texts.CONNEXION_TITRE.text_fr,
                            alertText: Status.AUTH_SUCCESS.message_fr
                        });

                        localStorage.setItem('token', response.data.token);

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

    handleRegisterClick() {

        browserHistory.push('/register');
    }

    handleAlertDismiss() {
        this.setState({
            showAlert: false,
            alertTitle: "",
            alertText: ""
        });
    }

    handleKeyPressed(event) {
        if (event.key === 'Enter') {
            this.handleLoginClick();
        }
    }

    render() {

        return (

            <div>
                <Modal className="wrapper" show={this.state.showLoginModal}>
                    <Modal.Header>
                        <Modal.Title>Centrale Fitness - Intranet G&eacute;rant</Modal.Title>
                        <Modal.Title>Connexion</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>

                        <Form horizontal>
                            <FormGroup controlId="formHorizontalEmail">
                                <Col componentClass={ControlLabel} sm={3}>
                                    Email
                                </Col>
                                <Col sm={9}>
                                    <FormControl type="email" placeholder="Email" onBlur={ this.handleEmailChange.bind(this) } onKeyPress={this.handleKeyPressed.bind(this)} />
                                </Col>
                            </FormGroup>

                            <FormGroup controlId="formHorizontalPassword">
                                <Col componentClass={ControlLabel} sm={3}>
                                    Mot de passe
                                </Col>
                                <Col sm={9}>
                                    <FormControl type="password" placeholder="Mot de passe" onBlur={ this.handlePasswordChange.bind(this) } onKeyPress={this.handleKeyPressed.bind(this)}/>
                                </Col>
                            </FormGroup>

                            <FormGroup>
                                <Col smOffset={2} sm={10}>
                                    <Checkbox onChange={this.handleRememberChange.bind(this)}>Se souvenir de moi</Checkbox>
                                </Col>
                            </FormGroup>

                        </Form>
                    </Modal.Body>

                    <Modal.Footer>
                        <Button bsStyle="success" onClick={this.handleRegisterClick.bind(this)}>Cr&eacute;er un compte</Button>
                        <Button>Mot de passe oubli&eacute;</Button>
                        <Button bsStyle="primary" onClick={this.handleLoginClick.bind(this)}>Connexion</Button>
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

export default Login;