import React from 'react';
import {
    Panel,
    Glyphicon,
    Col,
    FormGroup,
    FormControl,
    ControlLabel,
    Form,
    Button,
    ToggleButton,
    ToggleButtonGroup,
    ListGroup,
    ListGroupItem,
    Modal,
    Label, Grid
} from 'react-bootstrap';
import { connect } from 'react-redux';
import {browserHistory} from 'react-router';

import {
    displayAlert,
    dismissAlert,
    setFeedbacksIsLoad,
    setFeedbacksStatusIsLoad
} from "../actions/globalActions";

import {
    setFeedbacks,
    setInitialFeedbacks,
    addFeedback,
    setStatus,
    setFilterKeywords,
    setFilterStatus,
    setFeedbackTitle,
    setFeedbackDescription,
    displayFeedbackModal,
    dismissFeedbackModal,
    displayFeedbackEditModal,
    setFeedbackCurrentResponse,
    addFeedbackResponse
} from "../actions/contactActions";

import Texts from "../utils/Texts";
import Fields from "../utils/Fields";
import Communication from "../utils/Communication";
import Validator from "../utils/Validator";
import Dates from "../utils/Dates";
import Paths from "../utils/Paths";
import Status from "../utils/Status";

import "../styles/Contact.css"

class Contact extends React.Component {

    componentWillMount() {
        if (this.props.feedbacks_status_is_load === false) {
            this.getStatus();
        }
        if (this.props.feedbacks_is_load === false) {
            this.getFeedbacks();
        }
    }

    keyWordFilterChange(event) {
        this.props.setFilterKeywords(event.target.value);
        this.filterKeyWord(event.target.value);
    }

    filterKeyWord(value) {
        let me = this;
        let updatedFeedbacks = this.props.initial_feedbacks;
        updatedFeedbacks = updatedFeedbacks.filter(function(item){
            return (((item.title.toLowerCase().search(value.toLowerCase()) !== -1) ||
                (item.description.toLowerCase().search(value.toLowerCase()) !== -1)) &&
                (me.props.filter_status === 0 || item.feedback_state === me.props.filter_status));
        });
        this.props.setFeedbacks(updatedFeedbacks);
    }

    statusFilterChange(value) {
        this.props.setFilterStatus(value);
        this.filterStatus(value);
    }

    filterStatus(value) {
        let me = this;
        let updatedFeedbacks = this.props.initial_feedbacks;
        if (updatedFeedbacks !== undefined) {
            updatedFeedbacks = updatedFeedbacks.filter(function (item) {
                return ((value === 0 || item.feedback_state === value) &&
                    ((item.title.toLowerCase().search(me.props.filter_keywords.toLowerCase()) !== -1) ||
                        (item.description.toLowerCase().search(me.props.filter_keywords.toLowerCase()) !== -1)));
            });
        }
        this.props.setFeedbacks(updatedFeedbacks);
    }

    postAFeedbackClick() {
        this.props.displayFeedbackModal({});
    }

    handleFeedbackTitleChange(event) {
        this.props.setFeedbackTitle(event.target.value);
    }

    handleFeedbackDescriptionChange(event) {
        this.props.setFeedbackDescription(event.target.value);
    }

    handleFeedbackModalDismiss() {
        this.props.dismissFeedbackModal();
    }

    handleAlertDismiss() {
        this.props.dismissAlert();
    }

    handleFeedbackModalConfirm() {
        if (!Validator.description(this.props.feedback_title) ||
            !Validator.description(this.props.feedback_description)) {
            this.props.displayAlert({
                alertTitle: Texts.ERREUR_TITRE.text_fr,
                alertText: Texts.ERR_REMPLIR_TOUS_CHAMPS.text_fr
            });
            return;
        }
        this.addFeedback();
    }

    addFeedback() {
        let params = {};

        params[Fields.TOKEN] = localStorage.getItem("token");
        params[Fields.TITLE] = this.props.feedback_title;
        params[Fields.DESCRIPTION] = this.props.feedback_description;

        let me = this;

        let communication = new Communication('post', Paths.HOST + Paths.ADD_FEEDBACK, params);
        communication.sendRequest(
            function (response) {
                if (response.status === 200) {
                    if (response.data.code === Status.GENERIC_OK.code) {

                        let now = new Date();
                        me.props.addFeedback({
                            _id: response.data.feedback_id,
                            title: me.props.feedback_title,
                            description: me.props.feedback_description,
                            feedback_state: 1,
                            responses: [],
                            fitness_manager_name: response.data.fitness_manager_name,
                            creation_date: now.getTime(),
                            update_date: now.getTime()
                        });

                        me.filterStatus(me.props.filter_status);

                        me.handleFeedbackModalDismiss();

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

                        if (Status.AUTH_ERROR_ACCOUNT_INACTIVE.code === response.data.code) {
                            localStorage.removeItem("token");
                            browserHistory.replace('/auth');
                        }
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

    addFeedbackResponse() {
        let params = {};

        params[Fields.TOKEN] = localStorage.getItem("token");
        params[Fields.CONTENT] = this.props.feedback_current_response;
        params[Fields.FEEDBACK_ID] = this.props.feedback_id;

        let me = this;

        let communication = new Communication('post', Paths.HOST + Paths.ADD_RESPONSE_FEEDBACK, params);
        communication.sendRequest(
            function (response) {
                if (response.status === 200) {
                    if (response.data.code === Status.GENERIC_OK.code) {

                        let now = new Date();
                        me.props.addFeedbackResponse({
                            _id: me.props.feedback_id,
                            feedback_state: 1,
                            is_admin: false,
                            content: me.props.feedback_current_response,
                            date: now.getTime(),
                            author: response.data.fitness_manager_name
                        });

                        me.filterStatus(me.props.filter_status);

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

                        if (Status.AUTH_ERROR_ACCOUNT_INACTIVE.code === response.data.code) {
                            localStorage.removeItem("token");
                            browserHistory.replace('/auth');
                        }
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

    getStatus() {

        let params = {};

        params[Fields.TOKEN] = localStorage.getItem("token");

        let me = this;

        let communication = new Communication('post', Paths.HOST + Paths.GET_FEEDBACK_STATES, params);
        communication.sendRequest(
            function (response) {
                if (response.status === 200) {
                    if (response.data.code === Status.GENERIC_OK.code) {

                        if (me !== undefined)
                            me.props.setStatus(response.data.feedback_states);
                        if (me !== undefined)
                            me.props.setFeedbacksStatusIsLoad();

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

    getFeedbacks() {
        let params = {};

        params[Fields.TOKEN] = localStorage.getItem("token");

        let me = this;

        let communication = new Communication('post', Paths.HOST + Paths.GET_FEEDBACKS, params);
        communication.sendRequest(
            function (response) {
                if (response.status === 200) {
                    if (response.data.code === Status.GENERIC_OK.code) {

                        let rev_feedbacks = response.data.feedbacks;//.reverse();
                        if (me !== undefined)
                            me.props.setFeedbacks(rev_feedbacks);
                        if (me !== undefined)
                            me.props.setInitialFeedbacks(rev_feedbacks);
                        if (me !== undefined)
                            me.props.setFeedbacksIsLoad();

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

    getStatusName(feedback_state) {
        if (feedback_state > 0) {
            let obj = this.props.status.find(function (itm) {
                return itm.code === feedback_state;
            });
            return obj.text_fr;
        }
        return "";
    }

    handleFeedbackCurrentResponseChange(event) {
        this.props.setFeedbackCurrentResponse(event.target.value);
    }

    getStatusStyle(feedback_state) {
        let style = "";
        switch (feedback_state) {
            case 1:
                style = "info";
                break;
            case 2:
                style = "warning";
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

    getValidationState(field) {

        let value;
        switch (field) {
            case "title":
                value = this.props.feedback_title;
                break;
            case "description":
                value = this.props.feedback_description;
                break;
            default:
                return "warning";
        }

        if (field === "title" || field === "description") {

            if (Validator.description(value))
                return "success";

        }
        return "warning";
    }

    handleFeedbackOnClick(item) {
        this.props.displayFeedbackEditModal({
            feedback_id: item._id,
            feedback_title: item.title,
            feedback_state_code: item.feedback_state,
            feedback_description: item.description,
            feedback_update_date: item.update_date,
            feedback_responses: item.responses,
            feedback_fitness_manager_name: item.fitness_manager_name
        });
    }

    handleFeedbackResponseSend() {
        if (this.props.feedback_current_response.length > 0) {
            this.addFeedbackResponse();
        }
    }

    displayresponse(item) {

        return (
            <div key={item.date}>
                <div className={"showNewLine response"}>
                    <span style={{fontWeight: "bold"}}>
                        {
                            item.author + " - " +
                            (item.is_admin ? Texts.ADMIN.text_fr : Texts.GERANT.text_fr)
                        }
                    </span>
                    <br />
                    <em>{Dates.format(item.date)}</em>
                    <br />
                    <br />
                    {item.content}
                </div>
            </div>
        );
    }

    render() {
        return (
            <Panel header={<div><Glyphicon glyph="envelope" /> {Texts.CONTACT.text_fr}</div>} bsStyle="primary">
                <Panel>
                    <Col xs={12} sm={12} md={9} lg={9}>
                        <Panel header={<div><Glyphicon glyph="filter" /> {Texts.FILTRE.text_fr}</div>}>
                            <Form horizontal>
                                <FormGroup>
                                    <Col componentClass={ControlLabel} xs={12} sm={12} md={2} lg={2}>
                                        {Texts.PAR_MOTS_CLEFS.text_fr}
                                    </Col>
                                    <Col xs={12} sm={12} md={10} lg={10}>
                                        <FormControl
                                            type="text"
                                            placeholder={Texts.MOTS_CLEFS.text_fr}
                                            value={this.props.filter_keywords}
                                            onChange={this.keyWordFilterChange.bind(this)}
                                        />
                                    </Col>
                                </FormGroup>
                                <FormGroup>
                                    <Col componentClass={ControlLabel} xs={12} sm={12} md={2} lg={2}>
                                        {Texts.PAR_STATUS.text_fr}
                                    </Col>
                                    <Col xs={12} sm={12} md={10} lg={10}>
                                        <ToggleButtonGroup
                                            type="radio"
                                            name="status"
                                            value={this.props.filter_status}
                                            defaultValue={0}
                                            onChange={this.statusFilterChange.bind(this)}
                                        >
                                            <ToggleButton value={0}>{Texts.TOUS.text_fr}</ToggleButton>
                                            {
                                                this.props.status && this.props.status.map((item) => (
                                                    <ToggleButton
                                                        key={item.code}
                                                        bsStyle={this.getStatusStyle(item.code)}
                                                        value={item.code}
                                                    >
                                                        {item.text_fr}
                                                    </ToggleButton>
                                                ))
                                            }
                                        </ToggleButtonGroup>
                                    </Col>
                                </FormGroup>
                            </Form>
                        </Panel>
                        <Button
                            className={"pull-right"}
                            onClick={this.postAFeedbackClick.bind(this)}
                        >
                            <Glyphicon glyph="comment" />  {Texts.FAIRE_UN_RETOUR_DINFORMATION.text_fr}
                        </Button>
                    </Col>
                    <Col xs={12} sm={12} md={3} lg={3}>
                        <Panel header={Texts.CENTRALE_FITNESS.text_fr}>
                            <Form horizontal>
                                <FormGroup>
                                    <Col componentClass={ControlLabel} xs={2} sm={2} md={2} lg={2}>
                                        <Glyphicon glyph="envelope" />
                                    </Col>
                                    <Col xs={10} sm={10} md={10} lg={10}>
                                        <FormControl.Static>
                                            <a href={"mailto:" + this.props.centrale_fitness_email}>
                                                {this.props.centrale_fitness_email}
                                            </a>
                                        </FormControl.Static>
                                    </Col>
                                </FormGroup>
                                <FormGroup>
                                    <Col componentClass={ControlLabel} xs={2} sm={2} md={2} lg={2}>
                                        <Glyphicon glyph="earphone" />
                                    </Col>
                                    <Col xs={10} sm={10} md={10} lg={10}>
                                        <FormControl.Static>
                                            <a href={"callto:" + this.props.centrale_fitness_phone}>
                                                {this.props.centrale_fitness_phone}
                                            </a>
                                        </FormControl.Static>
                                    </Col>
                                </FormGroup>
                            </Form>
                        </Panel>
                    </Col>
                </Panel>
                <ListGroup>
                    {
                        this.props.feedbacks !== undefined &&

                        this.props.feedbacks.map((item) => (
                            <ListGroupItem
                                key={item._id}
                                header={item.title}
                                bsStyle={this.getStatusStyle(item.feedback_state)}
                                onClick={this.handleFeedbackOnClick.bind(this, item)}
                                className={"showNewLine"}
                            >
                                {item.description}
                                <br />
                                <em>
                                    {
                                        "( " + item.fitness_manager_name + " - " +
                                        Texts.DERNIERE_MODIFICATION.text_fr + " : " +
                                        Dates.format(item.update_date) + " )"
                                    }
                                </em>
                            </ListGroupItem>
                        ))
                    }
                </ListGroup>

                <Modal show={this.props.showFeedbackModal} onHide={this.handleFeedbackModalDismiss.bind(this)}>
                    <Modal.Header closeButton>
                        <Modal.Title>
                            {Texts.RETOUR_DINFORMATION.text_fr + " "}
                            {
                                this.props.feedback_state_code > 0 &&
                                <Label hidden={this.props.feedback_state_code === -1}
                                       bsStyle={this.getStatusStyle(this.props.feedback_state_code)}>{this.getStatusName(this.props.feedback_state_code)}</Label>
                            }
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <FormControl.Static hidden={this.props.feedback_id === ""}>
                            <span style={{fontWeight: "bold"}}>{Texts.GERANT.text_fr + " : "}</span>
                            {this.props.feedback_fitness_manager_name}
                        </FormControl.Static>
                        <FormControl.Static hidden={this.props.feedback_id === ""}>
                            <span style={{fontWeight: "bold"}}>{Texts.DERNIERE_MODIFICATION.text_fr + " : "}</span>
                            {Dates.format(this.props.feedback_update_date)}
                        </FormControl.Static>
                        {
                            this.props.feedback_id === "" &&

                            <Form>
                                <FormGroup controlId="formControlsTitle" validationState={this.getValidationState('title')}>
                                    <FormControl
                                        readOnly={!this.props.feedback_modal_title_enabled}
                                        type="text"
                                        placeholder={Texts.OBJET.text_fr}
                                        value={this.props.feedback_title}
                                        onChange={this.handleFeedbackTitleChange.bind(this)}
                                    />
                                </FormGroup>

                                <FormGroup controlId="formControlsDescription" validationState={this.getValidationState('description')}>
                                    <FormControl
                                        readOnly={!this.props.feedback_modal_description_enabled}
                                        rows={6}
                                        componentClass="textarea"
                                        placeholder={Texts.DESCRIPTION.text_fr}
                                        value={this.props.feedback_description}
                                        onChange={this.handleFeedbackDescriptionChange.bind(this)}
                                    />
                                </FormGroup>
                            </Form>
                        }
                        {
                            this.props.feedback_id !== "" &&

                            <Form>
                                <FormGroup>
                                    <FormControl.Static>
                                            <span style={{fontWeight: "bold"}}>{Texts.OBJET.text_fr + " : "}</span>
                                            {this.props.feedback_title}
                                    </FormControl.Static>
                                    <FormControl.Static>
                                            {this.props.feedback_description}
                                    </FormControl.Static>
                                    {
                                        this.props.feedback_responses.map((item) => (
                                            this.displayresponse(item)
                                        ))
                                    }
                                </FormGroup>
                                <div className={"response"}>
                                    <FormGroup>
                                        <FormControl
                                            componentClass="textarea"
                                            rows={2}
                                            placeholder={Texts.REPONSE.text_fr}
                                            value={this.props.feedback_current_response}
                                            onChange={this.handleFeedbackCurrentResponseChange.bind(this)}
                                        />
                                    </FormGroup>
                                    <Grid fluid>
                                        <Button
                                            className={"pull-right"}
                                            bsStyle={"primary"}
                                            onClick={this.handleFeedbackResponseSend.bind(this)}
                                        >
                                            <Glyphicon glyph="send" /> {Texts.REPONDRE.text_fr}
                                        </Button>
                                    </Grid>
                                </div>
                            </Form>
                        }
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.handleFeedbackModalDismiss.bind(this)}><Glyphicon glyph="remove" /> {Texts.FERMER.text_fr}</Button>
                        {
                            this.props.feedback_modal_confirm_button_enabled === true &&

                            <Button
                                disabled={!this.props.feedback_modal_confirm_button_enabled}
                                bsStyle={"primary"}
                                onClick={this.handleFeedbackModalConfirm.bind(this)}
                            >
                                <Glyphicon glyph="ok" /> {Texts.CONFIRMER.text_fr}
                            </Button>
                        }
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
        centrale_fitness_email: state.contact.centrale_fitness_email,
        centrale_fitness_phone: state.contact.centrale_fitness_phone,
        feedbacks: state.contact.feedbacks,
        initial_feedbacks: state.contact.initial_feedbacks,
        status: state.contact.status,
        filter_keywords: state.contact.filter_keywords,
        filter_status: state.contact.filter_status,

        showFeedbackModal: state.contact.showFeedbackModal,
        feedback_id: state.contact.feedback_id,
        feedback_title: state.contact.feedback_title,
        feedback_responses: state.contact.feedback_responses,
        feedback_fitness_manager_name: state.contact.feedback_fitness_manager_name,
        feedback_description: state.contact.feedback_description,
        feedback_modal_title_enabled: state.contact.feedback_modal_title_enabled,
        feedback_modal_description_enabled: state.contact.feedback_modal_description_enabled,
        feedback_modal_confirm_button_enabled: state.contact.feedback_modal_confirm_button_enabled,
        feedback_update_date: state.contact.feedback_update_date,
        feedback_state_code: state.contact.feedback_state_code,
        feedback_current_response: state.contact.feedback_current_response,

        showAlert: state.global.showAlert,
        alertTitle: state.global.alertTitle,
        alertText: state.global.alertText,

        feedbacks_is_load: state.global.feedbacks_is_load,
        feedbacks_status_is_load: state.global.feedbacks_status_is_load
    };
}

export default connect(mapStateToProps, {
    displayAlert,
    dismissAlert,
    setFeedbacks,
    setInitialFeedbacks,
    addFeedback,
    setStatus,
    setFilterKeywords,
    setFilterStatus,
    setFeedbackTitle,
    setFeedbackDescription,
    displayFeedbackModal,
    dismissFeedbackModal,
    displayFeedbackEditModal,
    setFeedbackCurrentResponse,
    addFeedbackResponse,

    setFeedbacksIsLoad,
    setFeedbacksStatusIsLoad
})(Contact);