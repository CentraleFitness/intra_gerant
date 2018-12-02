import React from 'react';
import {
    Panel,
    Glyphicon,
    Modal,
    FormControl,
    Button,
    Col,
    ListGroup,
    ListGroupItem
} from 'react-bootstrap';
import { connect } from 'react-redux';
import {browserHistory} from 'react-router';

import {
    displayAlert,
    dismissAlert,
    setHomeSummaryIsLoad,
    setStatisticsIsLoad,
    setModulesIsLoad,
    setModuleStatesIsLoad
} from "../actions/globalActions";

import {
    setHomeSummary
} from "../actions/homeActions";

import {
    setStatistics
} from "../actions/statisticsActions";

import {
    setModules,
    setModuleStates
} from "../actions/equipmentActions";

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
        if (this.props.statistics_is_load === false) {
            this.getStatistics();
        }
        if (this.props.modules_is_load === false) {
            this.getModules();
        }
        if (this.props.module_states_is_load === false) {
            this.getModuleStates();
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

                        if (me !== undefined)
                            me.props.setHomeSummary({
                                center_name: response.data.center_name,
                                manager_first_name: response.data.manager_first_name,
                                manager_last_name: response.data.manager_last_name,
                                nb_subscribers: response.data.nb_subscribers,
                                events: response.data.events
                            });
                        if (me !== undefined)
                            me.props.setHomeSummaryIsLoad();

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
                                production_year: response.data.production_year,
                                production_total: response.data.production_total,

                                average_by_module: response.data.average_by_module,

                                nb_subscribers: response.data.nb_subscribers,

                                frequentation_day: response.data.frequentation_day,
                                frequentation_month: response.data.frequentation_month,
                                frequentation_year: response.data.frequentation_year
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

    getModules() {
        let params = {};

        params[Fields.TOKEN] = localStorage.getItem("token");

        let me = this;

        let communication = new Communication('post', Paths.HOST + Paths.GET_MODULES, params);
        communication.sendRequest(
            function (response) {
                if (response.status === 200) {
                    if (response.data.code === Status.GENERIC_OK.code) {

                        if (me !== undefined) {
                            me.props.setModules(response.data.modules);
                            me.props.setModulesIsLoad();
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

    getModuleStates() {
        let params = {};

        params[Fields.TOKEN] = localStorage.getItem("token");

        let me = this;

        let communication = new Communication('post', Paths.HOST + Paths.GET_MODULE_STATES, params);
        communication.sendRequest(
            function (response) {
                if (response.status === 200) {
                    if (response.data.code === Status.GENERIC_OK.code) {

                        if (me !== undefined) {
                            me.props.setModuleStates(response.data.module_states);
                            me.props.setModuleStatesIsLoad();
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

    handleAlertDismiss() {
        this.props.dismissAlert();
    }

    getStateName(state_id) {
        let obj = this.props.module_states.find(function (itm) {
            return itm._id === state_id;
        });
        return obj === undefined ? "" : obj.text_fr;
    }

    getStateStyle(state_code) {
        let style = "";
        switch (state_code) {
            case 0:
                style = "warning";
                break;
            case 1:
                style = "info";
                break;
            case 2:
                style = "info";
                break;
            case 3:
                style = "success";
                break;
            case 4:
                style = "danger";
                break;
            default:
                style = "danger";
                break;
        }
        return style;
    }

    render() {
        return (
            <Panel header={<div><Glyphicon glyph="home" /> {Texts.ACCUEIL.text_fr}</div>} bsStyle="primary">

                <Panel style={{textAlign: "center"}}>
                    <Col xs={12} sm={6} md={4} lg={4} >
                        <Panel style={{textAlign: "center"}}>
                            <h4>{Texts.PRODUIT_AUJOURDHUI.text_fr}</h4>
                            <h3>
                                {parseFloat(this.props.production_day).toFixed(2) + " " + (this.props.production_day > 999.99 ? "k" : "") + "W"}
                            </h3>
                        </Panel>
                    </Col>
                    <Col xs={12} sm={6} md={4} lg={4} >
                        <Panel style={{textAlign: "center"}}>
                            <h4>{Texts.NOMBRE_D_INSCRIT.text_fr}</h4>
                            <h3>{this.props.nb_subscribers}</h3>
                        </Panel>
                    </Col>
                    <Col xs={12} sm={6} md={4} lg={4} >
                        <Panel style={{textAlign: "center"}}>
                            <h4>{Texts.NOUVEAUX_UTILISATEURS_AUJOURDHUI.text_fr}</h4>
                            <h3>{this.props.frequentation_day}</h3>
                        </Panel>
                    </Col>
                </Panel>

                <Col xs={12} sm={12} md={6} lg={6} >
                    <Panel header={<div><Glyphicon glyph="list" /> {Texts.MODULES.text_fr} </div>} style={{textAlign: "center"}}>
                        <ListGroup>
                        {
                            this.props.modules.map((item) => (
                                (
                                    <ListGroupItem bsStyle={this.getStateStyle(item.module_state_code)} key={item._id}>
                                        <span className={"pull-left"}>{item.UUID + " => " + item.machine_type}</span>
                                        &nbsp;
                                        <span className={"pull-right"}>{"[ " + this.getStateName(item.module_state_id) + " ]"} </span>
                                    </ListGroupItem>
                                )
                            ))
                        }
                        </ListGroup>
                    </Panel>
                </Col>
                <Col xs={12} sm={12} md={6} lg={6} >
                    <Panel header={<div><Glyphicon glyph="calendar" /> {Texts.EVENEMENTS.text_fr} </div>} style={{textAlign: "center"}}>
                        <div>
                        {
                            this.props.events.map((item) => (
                                (
                                    <div key={item._id}>
                                        <Panel style={{textAlign: "center"}}>
                                            <h4>{item.title}</h4>
                                            <p>
                                                <span>{Dates.formatDateOnly(item.start_date)}</span> {" - "}
                                                <span>{Dates.formatDateOnly(item.end_date)}</span>
                                            </p>
                                            <p>
                                                <span>{Texts.NOMBRE_D_INSCRIT.text_fr + " : " + item.nb_subscribers}</span>
                                            </p>
                                        </Panel>
                                    </div>
                                )
                            ))
                        }
                        </div>
                    </Panel>
                </Col>

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
        //Home
        center_name: state.home.center_name,
        manager_first_name: state.home.manager_first_name,
        manager_last_name: state.home.manager_last_name,
        nb_subscribers: state.home.nb_subscribers,
        events: state.home.events,

        //Statistics
        production_day: state.statistics.production_day,
        production_month: state.statistics.production_month,
        frequentation_day: state.statistics.frequentation_day,
        frequentation_month: state.statistics.frequentation_month,

        //Modules
        modules: state.equipment.modules,
        module_states: state.equipment.module_states,

        //Global
        showAlert: state.global.showAlert,
        alertTitle: state.global.alertTitle,
        alertText: state.global.alertText,

        home_summary_is_load: state.global.home_summary_is_load,
        statistics_is_load: state.global.statistics_is_load,
        modules_is_load: state.global.modules_is_load,
        module_states_is_load: state.global.module_states_is_load
    };
}

export default connect(mapStateToProps, {
    //Home
    displayAlert,
    dismissAlert,
    setHomeSummary,

    //Statistics
    setStatistics,

    //Modules
    setModules,
    setModuleStates,

    //Global
    setHomeSummaryIsLoad,
    setStatisticsIsLoad,
    setModulesIsLoad,
    setModuleStatesIsLoad

})(Home);