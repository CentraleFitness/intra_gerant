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

import '../styles/Login.css';

class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            remember: false
        };
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

    handleLoginClick(event) {
        console.log(this.state);
    }

    render() {

        return (

            <Modal.Dialog className="wrapper">
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
                                <FormControl type="email" placeholder="Email" onBlur={ this.handleEmailChange.bind(this) } />
                            </Col>
                        </FormGroup>

                        <FormGroup controlId="formHorizontalPassword">
                            <Col componentClass={ControlLabel} sm={3}>
                                Mot de passe
                            </Col>
                            <Col sm={9}>
                                <FormControl type="password" placeholder="Mot de passe" onBlur={ this.handlePasswordChange.bind(this) } />
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
                    <Button>Mot de passe oubli&eacute;</Button>
                    <Button bsStyle="primary" onClick={this.handleLoginClick.bind(this)}>Connexion</Button>
                </Modal.Footer>

            </Modal.Dialog>
        );
    }
}

export default Login;