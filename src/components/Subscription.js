import React from 'react';
import {
    Panel,
    Glyphicon,
    FormControl,
    Button,
    Modal
} from 'react-bootstrap';
import {browserHistory} from 'react-router';

import QRCode from 'qrcode.react';

import Texts from "../utils/Texts";
import Fields from "../utils/Fields";
import Communication from "../utils/Communication";
import Paths from "../utils/Paths";
import Status from "../utils/Status";

import "../styles/Contact.css"

class Subscription extends React.Component {

    constructor() {
        super();

        this.state = {
            fitness_center_id: "",
            showAlert: false,
            alertTitle: "",
            alertText: ""
        };
    }

    componentWillMount() {
        this.getFitnessCenterId();
    }

    getFitnessCenterId() {
        let params = {};

        params[Fields.TOKEN] = localStorage.getItem("token");

        let me = this;

        let communication = new Communication('post', Paths.HOST + Paths.GET_FITNESS_CENTER_ID, params);
        communication.sendRequest(
            function (response) {
                if (response.status === 200) {
                    if (response.data.code === Status.GENERIC_OK.code) {

                        me.setState({
                            fitness_center_id: response.data.fitness_center_id
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

                        if (Status.AUTH_ERROR_ACCOUNT_INACTIVE.code === response.data.code) {
                            localStorage.removeItem("token");
                            browserHistory.replace('/auth');
                        }
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

    handleAlertDismiss() {
        this.setState({
            showAlert: false,
            alertTitle: "",
            alertText: ""
        });
    }

    render() {
        return (
            <Panel header={<div><Glyphicon glyph="qrcode" /> {Texts.AFFILIATION.text_fr}</div>} bsStyle="primary">

                <div style={{textAlign: "center"}}>
                    <QRCode size={255} value={this.state.fitness_center_id} />
                    <h1>Affiliation à la salle !</h1>
                </div>

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
                        <Button onClick={this.handleAlertDismiss.bind(this)}><Glyphicon glyph="remove" /> {Texts.FERMER.text_fr}</Button>
                    </Modal.Footer>
                </Modal>
            </Panel>
        );
    }
}

export default Subscription;