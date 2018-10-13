import React from 'react';
import {
    Panel,
    Glyphicon
} from 'react-bootstrap';

import { connect } from 'react-redux';
import {browserHistory} from 'react-router';

import {
    setStatistics
} from "../actions/statisticsActions";

import {
    displayAlert,
    dismissAlert,
    setStatisticsIsLoad
} from "../actions/globalActions";

import Texts from "../utils/Texts";

import '../styles/Statistics.css';
import Status from "../utils/Status";
import Paths from "../utils/Paths";
import Communication from "../utils/Communication";
import Fields from "../utils/Fields";

class Statistics extends React.Component {

    componentDidMount() {
        if (this.props.statistics_is_load === false) {
            this.getStatistics();
        }
    }

    getStatistics() {
        let params = {};

        params[Fields.TOKEN] = localStorage.getItem("token");

        let me = this;

        let communication = new Communication('post', Paths.HOST + Paths.GET_STATISTICS, params);
        communication.sendRequest(
            function (response) {
                if (response.status === 200) {
                    if (response.data.code === Status.GENERIC_OK.code) {

                        if (me !== undefined) {
                            me.props.setStatistics({
                                production_day: response.data.production_day,
                                production_month: response.data.production_month,
                                frequentation_day: response.data.frequentation_day,
                                frequentation_month: response.data.frequentation_month
                            });
                            me.props.setStatisticsIsLoad();
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
                if (me !== undefined) {
                    me.props.displayAlert({
                        alertTitle: Texts.ERREUR_TITRE.text_fr,
                        alertText: Texts.ERR_RESEAU.text_fr
                    });
                }
            }
        );
    }

    render() {
        return (
            <Panel header={<div><Glyphicon glyph="stats" /> {Texts.STATISTIQUES_SALLE.text_fr}</div>} bsStyle="primary">
                <div>
                    {"Production / jour " + this.props.production_day + " Watt" + (this.props.production_day > 1 ? "s" : "")}<br />
                    {"Production / mois " + this.props.production_month + " Watt" + (this.props.production_month > 1 ? "s" : "")}<br />
                    {"Frequentation / jour " + this.props.frequentation_day + " Utilisateur" + (this.props.frequentation_day > 1 ? "s" : "")}<br />
                    {"Frequentation / mois " + this.props.frequentation_month + " Utilisateur" + (this.props.frequentation_month > 1 ? "s" : "")}
                </div>
            </Panel>
        );
    }
}

function mapStateToProps(state) {
    return {

        production_day: state.statistics.production_day,
        production_month: state.statistics.production_month,
        frequentation_day: state.statistics.frequentation_day,
        frequentation_month: state.statistics.frequentation_month,

        showAlert: state.global.showAlert,
        alertTitle: state.global.alertTitle,
        alertText: state.global.alertText,

        statistics_is_load: state.global.statistics_is_load
    };
}

export default connect(mapStateToProps, {
    displayAlert,
    dismissAlert,
    setStatistics,

    setStatisticsIsLoad
})(Statistics);