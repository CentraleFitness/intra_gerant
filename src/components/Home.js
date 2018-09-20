import React from 'react';
import {
    Panel,
    Glyphicon,
    Modal,
    FormControl,
    Button,
    Thumbnail, FormGroup
} from 'react-bootstrap';
import QRCode from 'qrcode.react';
import { connect } from 'react-redux';

import {
    setHomeSummaryIsLoad
} from "../actions/globalActions";

import {
    displayAlert,
    dismissAlert,
    setHomeSummary
} from "../actions/homeActions";

import Texts from "../utils/Texts";
import Communication from "../utils/Communication";
import Status from "../utils/Status";
import Fields from "../utils/Fields";
import Paths from "../utils/Paths";
import Dates from "../utils/Dates";

class Home extends React.Component {

    componentWillMount() {
        if (this.props.home_summary_is_load === false) {
            this.getHomeSummary();
        }
    }

    getHomeSummary() {
        let params = {};

        params[Fields.TOKEN] = localStorage.getItem("token");

        let me = this;

        let communication = new Communication('post', Paths.HOST + Paths.GET_HOME_SUMMARY, params);
        communication.sendRequest(
            function (response) {
                if (response.status === 200) {
                    if (response.data.code === Status.GENERIC_OK.code) {

                        if (me !== undefined) {
                            me.props.setHomeSummary({
                                fitness_center_id: response.data.fitness_center_id,
                                nb_subscribers: response.data.nb_subscribers,
                                events: response.data.events
                            });
                            me.props.setHomeSummaryIsLoad();
                        }

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
                if (me !== undefined) {
                    me.props.displayAlert({
                        alertTitle: Texts.ERREUR_TITRE.text_fr,
                        alertText: Texts.ERR_RESEAU.text_fr
                    });
                }
            }
        );
    }

    handleAlertDismiss() {
        this.dismissAlert();
    }

    render() {
        return (
            <Panel header={<div><Glyphicon glyph="home" /> {Texts.ACCUEIL.text_fr}</div>} bsStyle="primary">

                <div style={{textAlign: "center"}}>
                    <QRCode size={255} value={this.props.fitness_center_id} />
                    <h1>Affiliation à la salle !</h1>
                </div>
                <Thumbnail style={{textAlign: "center"}} >
                    <h4>{this.props.nb_subscribers + " " + Texts.ABONNE.text_fr + (this.props.nb_subscribers > 0 ? "s" : "")}</h4>
                </Thumbnail>
                <form>
                    <FormGroup>
                        <FormControl.Static style={{textAlign: "center", fontSize: 19}}>
                            <Glyphicon glyph="arrow-down" /> {Texts.EVENEMENTS_A_VENIR.text_fr} <Glyphicon glyph="arrow-down" />
                        </FormControl.Static>
                    </FormGroup>
                </form>
                {
                    this.props.events.map((item) => (
                        (
                            <div key={item._id}>
                            <Thumbnail style={{textAlign: "center"}}>
                                <h4>{item.title}</h4>
                                <p>
                                    <span>{Dates.formatDateOnly(item.start_date)}</span> {" - "}
                                    <span>{Dates.formatDateOnly(item.end_date)}</span>
                                </p>
                                <p>
                                    <span>{Texts.NOMBRE_D_INSCRIT.text_fr + " : " + item.nb_subscribers}</span>
                                </p>
                            </Thumbnail>
                            </div>
                        )
                    ))
                }

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

            </Panel>
        );
    }
}

function mapStateToProps(state) {
    return {
        fitness_center_id: state.home.fitness_center_id,
        nb_subscribers: state.home.nb_subscribers,
        events: state.home.events,
        showAlert: state.home.showAlert,
        alertTitle: state.home.alertTitle,
        alertText: state.home.alertText,

        //Global
        home_summary_is_load: state.global.home_summary_is_load
    };
}

export default connect(mapStateToProps, {
    displayAlert,
    dismissAlert,
    setHomeSummary,

    //global
    setHomeSummaryIsLoad

})(Home);