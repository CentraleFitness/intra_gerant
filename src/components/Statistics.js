import React from 'react';
import {
    Panel,
    Glyphicon, Col, Thumbnail
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

    componentWillMount() {
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

                        if (me !== undefined)
                            me.props.setStatistics({
                                production_day: response.data.production_day,
                                production_month: response.data.production_month,
                                production_year: response.data.production_year,
                                production_total: response.data.production_total,

                                average_by_module: response.data.average_by_module,

                                nb_subscribers: response.data.nb_subscribers,

                                frequentation_day: response.data.frequentation_day,
                                frequentation_month: response.data.frequentation_month,
                                frequentation_year: response.data.frequentation_year
                            });
                        if (me !== undefined)
                            me.props.setStatisticsIsLoad();

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
                console.log(error.name + " " + error.message + " " + error.stack);
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
                <Col xs={12} sm={12} md={12} lg={12} >
                    <Panel header={<div><Glyphicon glyph="info-sign" /> {Texts.GENERAL.text_fr} </div>} style={{textAlign: "center"}}>

                        <Col xs={12} sm={12} md={4} lg={4} >
                            <Thumbnail style={{textAlign: "center"}}>
                                <h4>{Texts.PRODUCTION_TOTALE.text_fr}</h4>
                                <h3>
                                    {
                                        this.props.production_total !== undefined ?

                                        this.props.production_total + " kWh"
                                            :
                                        "0 kWh"
                                    }
                                </h3>
                            </Thumbnail>
                        </Col>

                        <Col xs={12} sm={12} md={4} lg={4} >
                            <Thumbnail style={{textAlign: "center"}}>
                                <h4>{Texts.NOMBRE_D_INSCRIT.text_fr}</h4>
                                <h3>
                                    {
                                        this.props.nb_subscribers !== undefined ?

                                        this.props.nb_subscribers
                                            :
                                        "0"
                                    }
                                </h3>
                            </Thumbnail>
                        </Col>

                        <Col xs={12} sm={12} md={4} lg={4} >
                            <Thumbnail style={{textAlign: "center"}}>
                                <h4>{Texts.MOYENNE_PAR_MODULE.text_fr}</h4>
                                <h3>
                                    {
                                        this.props.average_by_module !== undefined ?

                                        this.props.average_by_module + " kWh"
                                            :
                                        "0 kWh"
                                    }
                                </h3>
                            </Thumbnail>
                        </Col>

                    </Panel>
                </Col>
                <Col xs={12} sm={12} md={6} lg={6} >
                    <Panel header={<div><Glyphicon glyph="flash" /> {Texts.ENERGIE_PRODUITE.text_fr} </div>} style={{textAlign: "center"}}>

                        <div>
                            <Thumbnail style={{textAlign: "center"}}>
                                <h4>{Texts.CE_JOUR.text_fr}</h4>
                                <h3>
                                    {
                                        this.props.production_day !== undefined ?

                                        this.props.production_day + " kWh"
                                            :
                                        "0 kWh"
                                    }
                                </h3>
                            </Thumbnail>
                        </div>

                        <div>
                            <Thumbnail style={{textAlign: "center"}}>
                                <h4>{Texts.CE_MOIS.text_fr}</h4>
                                <h3>
                                    {
                                        this.props.production_month !== undefined ?

                                        this.props.production_month + " kWh"
                                            :
                                        "0 kWh"
                                    }
                                </h3>
                            </Thumbnail>
                        </div>

                        <div>
                            <Thumbnail style={{textAlign: "center"}}>
                                <h4>{Texts.CETTE_ANNEE.text_fr}</h4>
                                <h3>
                                    {
                                        this.props.production_year !== undefined ?

                                            this.props.production_year + " kWh"
                                            :
                                            "0 kWh"
                                    }
                                </h3>
                            </Thumbnail>
                        </div>

                    </Panel>
                </Col>
                <Col xs={12} sm={12} md={6} lg={6} >
                    <Panel header={<div><Glyphicon glyph="user" /> {Texts.NOUVEAUX_UTILISATEURS.text_fr} </div>} style={{textAlign: "center"}}>

                        <div>
                            <Thumbnail style={{textAlign: "center"}}>
                                <h4>{Texts.CE_JOUR.text_fr}</h4>
                                <h3>
                                    {
                                        this.props.frequentation_day !== undefined ?

                                        this.props.frequentation_day
                                            :
                                        0
                                    }
                                </h3>
                            </Thumbnail>
                        </div>

                        <div>
                            <Thumbnail style={{textAlign: "center"}}>
                                <h4>{Texts.CE_MOIS.text_fr}</h4>
                                <h3>
                                    {
                                        this.props.frequentation_month !== undefined ?

                                        this.props.frequentation_month
                                            :
                                        0
                                    }
                                    </h3>
                            </Thumbnail>
                        </div>

                        <div>
                            <Thumbnail style={{textAlign: "center"}}>
                                <h4>{Texts.CETTE_ANNEE.text_fr}</h4>
                                <h3>
                                    {
                                        this.props.frequentation_year !== undefined ?

                                            this.props.frequentation_year
                                            :
                                            0
                                    }
                                </h3>
                            </Thumbnail>
                        </div>

                    </Panel>
                </Col>
            </Panel>
        );
    }
}

function mapStateToProps(state) {
    return {

        production_day: state.statistics.production_day,
        production_month: state.statistics.production_month,
        production_year: state.statistics.production_year,
        production_total: state.statistics.production_total,

        average_by_module: state.statistics.average_by_module,

        nb_subscribers: state.statistics.nb_subscribers,

        frequentation_day: state.statistics.frequentation_day,
        frequentation_month: state.statistics.frequentation_month,
        frequentation_year: state.statistics.frequentation_year,

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