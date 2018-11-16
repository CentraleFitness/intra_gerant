import React from 'react';
import {
    Panel,
    Glyphicon,
    Modal,
    FormControl,
    Button,
    FormGroup,
    Table
} from 'react-bootstrap';
import { connect } from 'react-redux';
import {browserHistory} from 'react-router';

import {
    setModules,
    setModuleStates
} from "../actions/equipmentActions";

import {
    displayAlert,
    dismissAlert,
    setModulesIsLoad,
    setModuleStatesIsLoad
} from "../actions/globalActions";

import Communication from "../utils/Communication";
import Paths from '../utils/Paths';
import Fields from '../utils/Fields';
import Status from '../utils/Status';
import Texts from '../utils/Texts';

class Equipment extends React.Component {

    componentWillMount() {
        if (this.props.module_states_is_load === false) {
            this.getModuleStates();
        }
        if (this.props.modules_is_load === false) {
            this.getModules();
        }
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

                        if (me !== undefined)
                            me.props.setModules(response.data.modules);
                        if (me !== undefined)
                            me.props.setModulesIsLoad();

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

                        if (me !== undefined)
                            me.props.setModuleStates(response.data.module_states);
                        if (me !== undefined)
                            me.props.setModuleStatesIsLoad();

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

    getStateLabel(id) {
        let text = "EN COURS D'ENVOI";
        this.props.module_states.map(function (item) {
            if (item._id === id) {
                text = item.text_fr.toUpperCase();
                return item;
            }
            return null;
        });
        return text;
    }

    getStateColor(id) {
        let idx = 0;
        let i = 0;
        let colors = [];
        colors[0] = "#FFB122";
        colors[1] = "#0000C8";
        colors[2] = "#0000C8";
        colors[3] = "#4DBD26";
        colors[4] = "#FF0000";

        this.props.module_states.map(function (item) {
            if (item._id === id) {
                idx = i;
                return item;
            }
            ++i;
            return null;
        });
        return colors[idx];
    }

    render() {

        return (
            <div>
                <Panel header={<div><Glyphicon glyph="list" /> {Texts.EQUIPEMENTS.text_fr}</div>} bsStyle="primary">
                    <form>
                        <FormGroup>
                            <FormControl.Static style={{textAlign: "center", fontSize: 17}}>
                                {Texts.EXPLICATION_EQUIPEMENT.text_fr}
                            </FormControl.Static>
                        </FormGroup>
                    </form>
                    <Table>
                        <thead style={{textAlign: "center"}}>
                            <tr>
                                <th style={{textAlign: "center"}}>UUID</th>
                                <th style={{textAlign: "center"}}>{Texts.TYPE_DE_MACHINE.text_fr}</th>
                                <th style={{textAlign: "center"}}>{Texts.ETAT.text_fr}</th>
                            </tr>
                        </thead>
                        <tbody>
                        {
                            this.props.modules && this.props.modules.map((item) => (
                                <tr key={item._id}>
                                    <td style={{textAlign: "center"}}>{item.UUID}</td>
                                    <td style={{textAlign: "center"}}>{item.machine_type}</td>
                                    <td style={{textAlign: "center"}}>
                                        <span style={{color: this.getStateColor(item.module_state_id)}}>{this.getStateLabel(item.module_state_id)}</span>
                                    </td>
                                </tr>
                            ))
                        }
                        </tbody>
                    </Table>
                </Panel>

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
        modules: state.equipment.modules,
        module_states: state.equipment.module_states,

        showAlert: state.global.showAlert,
        alertTitle: state.global.alertTitle,
        alertText: state.global.alertText,

        modules_is_load: state.global.modules_is_load,
        module_states_is_load: state.global.module_states_is_load
    };
}

export default connect(mapStateToProps, {

    displayAlert,
    dismissAlert,
    setModules,
    setModuleStates,

    setModulesIsLoad,
    setModuleStatesIsLoad

})(Equipment);