import React from 'react';
import {
    Panel,
    Glyphicon,
    Modal,
    FormControl,
    Button,
    Table,
    OverlayTrigger,
    Tooltip,
    Form,
    FormGroup
} from 'react-bootstrap';
import { connect } from 'react-redux';
import {browserHistory} from 'react-router';

import {
    displayAlert,
    dismissAlert,

    setSecondaryManagersIsLoad
} from "../actions/globalActions";

import {
    setSecondaryManagers,
    displayManagerUpdateConfirm,
    dismissManagerUpdateConfirm,

    setValidateManager,
    setManagerActivity
} from "../actions/validationActions";

import Texts from "../utils/Texts";
import Communication from "../utils/Communication";
import Status from "../utils/Status";
import Fields from "../utils/Fields";
import Paths from "../utils/Paths";
import Dates from "../utils/Dates";

class Validation extends React.Component {

    componentWillMount() {
        if (this.props.secondary_managers_is_load === false) {
            this.getSecondaryManagers();
        }
    }

    getSecondaryManagers() {
        let params = {};

        params[Fields.TOKEN] = localStorage.getItem("token");

        let me = this;

        let communication = new Communication('post', Paths.HOST + Paths.GET_SECONDARY_MANAGERS, params);
        communication.sendRequest(
            function (response) {
                if (response.status === 200) {
                    if (response.data.code === Status.GENERIC_OK.code) {

                        if (me !== undefined) {
                            me.props.setSecondaryManagers(response.data.managers);
                            me.props.setSecondaryManagersIsLoad();
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

    setActivity(item) {
        let params = {};

        params[Fields.TOKEN] = localStorage.getItem("token");
        params[Fields.FITNESS_CENTER_MANAGER_ID] = item._id;
        params[Fields.IS_ACTIVE] = !item.is_active;

        let me = this;

        let communication = new Communication("post", Paths.HOST + Paths.MANAGER_ACTIVITY, params);
        communication.sendRequest(
            function (response) {
                if (response.status === 200) {
                    if (response.data.code === Status.GENERIC_OK.code) {

                        if (me !== undefined) {
                            me.props.setManagerActivity({
                                _id: item._id,
                                is_active: !item.is_active,
                                time: new Date().getTime(),
                                last_update_admin_id: response.data.administrator_id,
                                last_update_admin_name: response.data.administrator_name
                            });
                            me.props.dismissManagerUpdateConfirm();
                            me.forceUpdate();
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

    setValidation(item, is_validated) {
        let params = {};

        params[Fields.TOKEN] = localStorage.getItem("token");
        params[Fields.FITNESS_CENTER_MANAGER_ID] = item._id;
        params[Fields.IS_VALIDATED] = is_validated;

        let me = this;

        let communication = new Communication("post", Paths.HOST + Paths.MANAGER_VALIDATION, params);
        communication.sendRequest(
            function (response) {
                if (response.status === 200) {
                    if (response.data.code === Status.GENERIC_OK.code) {

                        if (me !== undefined) {
                            me.props.setValidateManager({
                                _id: item._id,
                                is_validated: is_validated,
                                time: new Date().getTime(),
                                validator_admin_id: response.data.administrator_id,
                                validator_admin_name: response.data.administrator_name
                            });
                            me.props.dismissManagerUpdateConfirm();
                            me.forceUpdate();
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
        this.props.dismissAlert();
    }

    getValidateOverlay(item) {
        return (
            <Tooltip id={"tooltip_validate"}>
                {Texts.VALIDER_LE_COMPTE.text_fr}
            </Tooltip>
        );
    }

    getRefuseOverlay(item) {
        return (
            <Tooltip id={"tooltip_refuse"}>
                {Texts.REFUSER_LE_COMPTE.text_fr}
            </Tooltip>
        );
    }

    getValidatedOverlay(item) {
        return (
            <Tooltip id={"tooltip_validated"}>
                {
                    Texts.LE_COMPTE_A_ETE_VALIDE_LE.text_fr + " " +
                    Dates.format(item.validation_date) + " " +
                    Texts.PAR.text_fr + " " +
                    item.validator_admin_name +
                    " (" + (item.validator_admin_is_manager ? Texts.GERANT.text_fr : Texts.ADMIN.text_fr) + ") "
                }
            </Tooltip>
        );
    }

    getRefusedOverlay(item) {
        return (
            <Tooltip id={"tooltip_refused"}>
                {
                    Texts.LE_COMPTE_A_ETE_REFUSE_LE.text_fr + " " +
                    Dates.format(item.validation_date) + " " +
                    Texts.PAR.text_fr + " " +
                    item.validator_admin_name +
                    " (" + (item.validator_admin_is_manager ? Texts.GERANT.text_fr : Texts.ADMIN.text_fr) + ") "
                }
            </Tooltip>
        );
    }

    getSetActiveOverlay(item) {
        return (
            <Tooltip id={"tooltip_set_active"}>
                {
                    Texts.RENDU_INACTIF_PAR.text_fr + " " +
                    item.last_update_admin_name +
                    " (" + (item.last_update_admin_is_manager ? Texts.GERANT.text_fr : Texts.ADMIN.text_fr) + ") " +
                    Texts.LE.text_fr + " " +
                    Dates.format(item.last_update_activity)
                }
            </Tooltip>
        );
    }

    getSetInactiveOverlay(item) {
        return (
            <Tooltip id={"tooltip_set_inactive"}>
                {
                    Texts.RENDU_ACTIF_PAR.text_fr + " " +
                    item.last_update_admin_name +
                    " (" + (item.last_update_admin_is_manager ? Texts.GERANT.text_fr : Texts.ADMIN.text_fr) + ") " +
                    Texts.LE.text_fr + " " +
                    Dates.format(item.last_update_activity)
                }
            </Tooltip>
        );
    }

    validateClick(item) {
        if (item.is_validated === false && item.is_refused === false) {
            this.props.displayManagerUpdateConfirm({
                update_confirm_title: Texts.VALIDER_CE_COMPTE.text_fr + " ?",
                update_confirm_text: Texts.ETES_VOUS_SUR_DE_VOULOIR_VALIDER_CE_COMPTE.text_fr + " ?",
                update_confirm_is_validation: true,
                update_confirm_id: item._id,
                update_confirm_name: item.first_name + " " + item.last_name,
                update_confirm_is_active: item.is_active,
                update_confirm_is_validated: true
            });
        }
    }

    refuseClick(item) {
        if (item.is_validated === false && item.is_refused === false) {
            this.props.displayManagerUpdateConfirm({
                update_confirm_title: Texts.REFUSER_CE_COMPTE.text_fr + " ?",
                update_confirm_text: Texts.ETES_VOUS_SUR_DE_VOULOIR_REFUSER_CE_COMPTE.text_fr + " ?",
                update_confirm_is_validation: true,
                update_confirm_id: item._id,
                update_confirm_name: item.first_name + " " + item.last_name,
                update_confirm_is_active: item.is_active,
                update_confirm_is_validated: false
            });
        }
    }

    setActiveClick(item) {
        if (item.is_validated === true && item.is_active === false) {
            this.props.displayManagerUpdateConfirm({
                update_confirm_title: Texts.RENDRE_ACTIF_CE_COMPTE.text_fr + " ?",
                update_confirm_text: Texts.ETES_VOUS_SUR_DE_VOULOIR_RENDRE_ACTIF_CE_COMPTE.text_fr + " ?",
                update_confirm_is_validation: false,
                update_confirm_id: item._id,
                update_confirm_name: item.first_name + " " + item.last_name,
                update_confirm_is_active: item.is_active,
                update_confirm_is_validated: item.is_validated
            });
        }
    }

    setInactiveClick(item) {
        if (item.is_validated === true && item.is_active === true) {
            this.props.displayManagerUpdateConfirm({
                update_confirm_title: Texts.RENDRE_INACTIF_CE_COMPTE.text_fr + " ?",
                update_confirm_text: Texts.ETES_VOUS_SUR_DE_VOULOIR_RENDRE_INACTIF_CE_COMPTE.text_fr + " ?",
                update_confirm_is_validation: false,
                update_confirm_id: item._id,
                update_confirm_name: item.first_name + " " + item.last_name,
                update_confirm_is_active: item.is_active,
                update_confirm_is_validated: item.is_validated
            });
        }
    }

    handleUpdateConfirmDismiss() {
        this.props.dismissManagerUpdateConfirm();
    }

    confirmUpdateModal() {
        if (this.props.update_confirm_is_validation === true) {
            this.setValidation({
                _id: this.props.update_confirm_id
            }, this.props.update_confirm_is_validated);
        } else {
            this.setActivity({
                _id: this.props.update_confirm_id,
                is_active: this.props.update_confirm_is_active
            });
        }
    }

    render() {
        return (
            <Panel header={<div><Glyphicon glyph="ok" /> {Texts.VALIDATION.text_fr}</div>} bsStyle="primary">
                <Form>
                    <FormGroup>
                        <FormControl.Static style={{textAlign: "center", fontSize: 17}}>
                            {Texts.EXPLICATION_VALIDATION.text_fr}
                        </FormControl.Static>
                    </FormGroup>
                </Form>
                <Table responsive>
                    <thead>
                    <tr>
                        <th>{Texts.PRENOM.text_fr}</th>
                        <th>{Texts.NOM.text_fr}</th>
                        <th>{Texts.EMAIL.text_fr}</th>
                        <th>{Texts.DATE_DE_CREATION.text_fr}</th>
                        <th style={{textAlign: "center"}}>{Texts.VALIDATION.text_fr}</th>
                        <th style={{textAlign: "center"}}>{Texts.ACTIVITE.text_fr}</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        this.props.secondary_managers !== undefined && this.props.secondary_managers.map((item) => (
                            <tr key={item._id}>
                                <td style={{verticalAlign: "middle"}}>{item.first_name}</td>
                                <td style={{verticalAlign: "middle"}}>{item.last_name}</td>
                                <td style={{verticalAlign: "middle"}}>{item.email_address}</td>
                                <td style={{verticalAlign: "middle"}}>{Dates.formatDateOnly(item.creation_date)}</td>
                                <td style={{verticalAlign: "middle", textAlign: "center"}}>
                                    {
                                        item.is_refused === false && item.is_validated === false &&

                                        (<OverlayTrigger placement="bottom" overlay={this.getValidateOverlay(item)}>
                                            <Button onClick={this.validateClick.bind(this, item)}>
                                                <span style={{color: "green"}}>
                                                    <Glyphicon glyph="ok" />
                                                </span>&nbsp;
                                                {Texts.VALIDER.text_fr}
                                            </Button>
                                        </OverlayTrigger>)
                                    }
                                    {
                                        item.is_refused === false && item.is_validated === false &&
                                        (
                                            <span>&nbsp;</span>
                                        )
                                    }
                                    {
                                        item.is_refused === false && item.is_validated === false &&

                                        (<OverlayTrigger placement="bottom" overlay={this.getRefuseOverlay(item)}>
                                            <Button onClick={this.refuseClick.bind(this, item)}>
                                                &nbsp;
                                                <span style={{color: "red"}}>
                                                    <Glyphicon glyph="remove" />
                                                </span>&nbsp;
                                                {Texts.REFUSER.text_fr}
                                            </Button>
                                        </OverlayTrigger>)
                                    }
                                    {
                                        item.is_validated === true &&

                                        <OverlayTrigger placement="bottom" overlay={this.getValidatedOverlay(item)}>
                                            <span style={{color: "green"}}>
                                                {Texts.VALIDE.text_fr + " ( " + Dates.formatDateOnly(item.validation_date) + " )"}
                                            </span>
                                        </OverlayTrigger>
                                    }
                                    {
                                        item.is_refused === true &&

                                        <OverlayTrigger placement="bottom" overlay={this.getRefusedOverlay(item)}>
                                            <span style={{color: "red"}}>
                                                {Texts.REFUSE.text_fr + " ( " + Dates.formatDateOnly(item.validation_date) + " )"}
                                            </span>
                                        </OverlayTrigger>
                                    }
                                </td>
                                <td style={{verticalAlign: "middle", textAlign: "center"}}>
                                    {
                                        item.is_validated === true && item.is_active === false &&

                                        (<OverlayTrigger placement="bottom" overlay={this.getSetActiveOverlay(item)}>
                                            <Button onClick={this.setActiveClick.bind(this, item)}>
                                                <span style={{color: "blue"}}>
                                                    <Glyphicon glyph="off" />
                                                </span>&nbsp;
                                                {Texts.RENDRE_ACTIF.text_fr}
                                            </Button>
                                        </OverlayTrigger>)
                                    }
                                    {
                                        item.is_validated === true && item.is_active === true &&

                                        (<OverlayTrigger placement="bottom" overlay={this.getSetInactiveOverlay(item)}>
                                            <Button onClick={this.setInactiveClick.bind(this, item)}>
                                                <span style={{color: "red"}}>
                                                    <Glyphicon glyph="off" />
                                                </span>&nbsp;
                                                {Texts.RENDRE_INACTIF.text_fr}
                                            </Button>
                                        </OverlayTrigger>)
                                    }
                                </td>
                            </tr>
                        ))
                    }
                    </tbody>
                </Table>

                <Modal show={this.props.show_update_confirm} onHide={this.handleUpdateConfirmDismiss.bind(this)}>
                    <Modal.Header closeButton>
                        <Modal.Title>{this.props.update_confirm_title}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <FormControl.Static style={{textAlign: "center"}}>
                            {this.props.update_confirm_text}<br/><br/>
                            {this.props.update_confirm_name}
                        </FormControl.Static>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.handleUpdateConfirmDismiss.bind(this)}>
                            <Glyphicon glyph="remove" /> {Texts.FERMER.text_fr}
                        </Button>
                        <Button bsStyle={"primary"} onClick={this.confirmUpdateModal.bind(this)}>
                            <Glyphicon glyph="ok" /> {Texts.CONFIRMER.text_fr}
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

            </Panel>
        );
    }
}

function mapStateToProps(state) {
    return {
        //Validation
        secondary_managers: state.validation.secondary_managers,
        show_update_confirm: state.validation.show_update_confirm,
        update_confirm_title: state.validation.update_confirm_title,
        update_confirm_text: state.validation.update_confirm_text,
        update_confirm_is_validation: state.validation.update_confirm_is_validation,
        update_confirm_id: state.validation.update_confirm_id,
        update_confirm_name: state.validation.update_confirm_name,
        update_confirm_is_active: state.validation.update_confirm_is_active,
        update_confirm_is_validated: state.validation.update_confirm_is_validated,

        //Global
        showAlert: state.global.showAlert,
        alertTitle: state.global.alertTitle,
        alertText: state.global.alertText,

        secondary_managers_is_load: state.global.secondary_managers_is_load
    };
}

export default connect(mapStateToProps, {
    displayAlert,
    dismissAlert,
    setSecondaryManagersIsLoad,

    setSecondaryManagers,
    displayManagerUpdateConfirm,
    dismissManagerUpdateConfirm,

    setValidateManager,
    setManagerActivity


})(Validation);