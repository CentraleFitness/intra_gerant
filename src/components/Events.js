import React from 'react';
import {
    Panel,
    Glyphicon,
    ControlLabel,
    Col,
    Form,
    FormControl,
    FormGroup,
    ToggleButton,
    ToggleButtonGroup,
    Button,
    Grid,
    Row,
    Thumbnail,
    Image,
    Badge,
    Modal,
    HelpBlock,
    Label
} from 'react-bootstrap';
import Select from 'react-select';
import { connect } from 'react-redux';

import {
    displayAlert,
    dismissAlert,
    displayDeleteConfirm,
    dismissDeleteConfirm,
    setEvents,
    setInitialEvents,
    addEvent,
    updateEvent,
    deleteEvent,
    setFilterEventsStartDate,
    setFilterEventsEndDate,
    setFilterEventsKeywords,
    setFilterEventsNumberSubscribers,
    setFilterEventsStatus,
    setFilterEventsSubscribersSelect,
    resetFilters,
    displayEventModal,
    displayEventEditModal,
    dismissEventModal,
    setEventModalCurrentTitle,
    setEventModalCurrentDescription,
    setEventModalCurrentStartDate,
    setEventModalCurrentEndDate,
    setEventModalCurrentPicture,
    setDeletionCause
} from "../actions/eventsActions";

import {
    setEventsIsLoad
} from "../actions/globalActions";

import Texts from "../utils/Texts";
import Dates from "../utils/Dates";
import Fields from "../utils/Fields";
import Communication from "../utils/Communication";
import Paths from "../utils/Paths";
import Status from "../utils/Status";
import Validator from "../utils/Validator";

import 'react-select/dist/react-select.css';
import "../styles/Events.css";

class Events extends React.Component {

    componentDidMount() {
        if (this.props.events_is_load === false) {
            this.getEvents();
        }
    }

    getEvents() {
        let params = {};

        params[Fields.TOKEN] = localStorage.getItem("token");

        let me = this;

        let communication = new Communication('post', Paths.HOST + Paths.GET_EVENTS, params);
        communication.sendRequest(
            function (response) {
                if (response.status === 200) {
                    if (response.data.code === Status.GENERIC_OK.code) {

                        let rev_events = response.data.events.reverse();
                        if (me !== undefined)
                            me.props.setEvents(rev_events);
                        if (me !== undefined)
                            me.props.setInitialEvents(rev_events);
                        if (me !== undefined)
                            me.filterStatus(me.props.filter_status);
                        if (me !== undefined)
                            me.props.setEventsIsLoad();

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

    createUpdateEvent() {
        let params = {};

        params[Fields.TOKEN] = localStorage.getItem("token");
        if (this.props.current_id !== "") {
            params[Fields.EVENT_ID] = this.props.current_id;
        }
        if (this.eventPictureRef.value !== "") {
            params[Fields.PICTURE] = this.props.current_picture;
        }
        params[Fields.TITLE] = this.props.current_title;
        params[Fields.DESCRIPTION] = this.props.current_description;
        params[Fields.START_DATE] = this.props.current_start_date;
        params[Fields.END_DATE] = this.props.current_end_date;

        let me = this;

        let communication = new Communication('post', Paths.HOST +
            (this.props.current_id === "" ? Paths.ADD_EVENT : Paths.UPDATE_EVENT), params);
        communication.sendRequest(
            function (response) {
                if (response.status === 200) {
                    if (response.data.code === Status.GENERIC_OK.code) {

                        //CREATION
                        if (me.props.current_id === "") {

                            let now = new Date();
                            me.props.addEvent({
                                _id: response.data.event_id,
                                picture: me.props.current_picture,
                                title: me.props.current_title,
                                description: me.props.current_description,
                                start_date: me.props.current_start_date,
                                end_date: me.props.current_end_date,
                                creation_date: now.getTime(),
                                update_date: now.getTime(),
                                nb_subscribers: 0
                            });

                            //UPDATE
                        } else {

                            let now = new Date();
                            me.props.updateEvent({
                                _id: me.props.current_id,
                                picture: me.props.current_picture,
                                title: me.props.current_title,
                                description: me.props.current_description,
                                start_date: me.props.current_start_date,
                                end_date: me.props.current_end_date,
                                update_date: now.getTime(),
                                nb_subscribers: response.data.nb_subscribers
                            });

                        }

                        me.filterStatus(me.props.filter_status);
                        me.handleEventModalDismiss();

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

    deleteEvent() {
        let params = {};

        params[Fields.TOKEN] = localStorage.getItem("token");
        params[Fields.EVENT_ID] = this.props.delete_id;
        params[Fields.DELETION_CAUSE] = this.props.deletion_cause;

        let me = this;

        let communication = new Communication('post', Paths.HOST + Paths.DELETE_EVENT, params);
        communication.sendRequest(
            function (response) {
                if (response.status === 200) {
                    if (response.data.code === Status.GENERIC_OK.code) {

                        me.props.deleteEvent(me.props.delete_id);
                        me.filterStatus(me.props.filter_status);
                        me.handleDeleteConfirmDismiss();

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

    handleAlertDismiss() {
        this.props.dismissAlert();
    }

    keyWordFilterChange(event) {
        this.props.setFilterEventsKeywords(event.target.value);
        this.filterKeyWord(event.target.value);
    }

    filterKeyWord(value) {
        let me = this;
        let updatedEvents = this.props.initial_events;
        updatedEvents = updatedEvents.filter(function(item){
            return me.getStatusBool(me.props.filter_status, item) && me.getKeywordsBool(value, item) &&
                me.getNbSubscribersBool(me.props.filter_subscribers_select, me.props.filter_number_subscribers, item) &&
                me.getPeriodBool(me.props.filter_start_date, me.props.filter_end_date, item);
        });
        this.props.setEvents(updatedEvents);
    }

    filterStartDateChange(event) {
        if (event.target.value !== "") {
            let date = new Date(event.target.value).getTime();
            this.props.setFilterEventsStartDate(date);
            this.filterStartDate(date);
        } else {
            this.props.setFilterEventsStartDate("");
            this.filterStartDate("");
        }
    }

    filterStartDate(value) {
        let me = this;
        let updatedEvents = this.props.initial_events;
        updatedEvents = updatedEvents.filter(function(item){
            return me.getStatusBool(me.props.filter_status, item) && me.getKeywordsBool(me.props.filter_keywords, item) &&
                me.getNbSubscribersBool(me.props.filter_subscribers_select, me.props.filter_number_subscribers, item) &&
                me.getPeriodBool(value, me.props.filter_end_date, item);
        });
        this.props.setEvents(updatedEvents);
    }

    filterEndDateChange(event) {
        if (event.target.value !== "") {
            let date = new Date(event.target.value).getTime();
            this.props.setFilterEventsEndDate(date);
            this.filterEndDate(date);
        } else {
            this.props.setFilterEventsEndDate("");
            this.filterEndDate("");
        }
    }

    filterEndDate(value) {
        let me = this;
        let updatedEvents = this.props.initial_events;
        updatedEvents = updatedEvents.filter(function(item){
            return me.getStatusBool(me.props.filter_status, item) && me.getKeywordsBool(me.props.filter_keywords, item) &&
                me.getNbSubscribersBool(me.props.filter_subscribers_select, me.props.filter_number_subscribers, item) &&
                me.getPeriodBool(me.props.filter_start_date, value, item);
        });
        this.props.setEvents(updatedEvents);
    }

    subscribersFilterSelectChange(selected) {
        this.props.setFilterEventsSubscribersSelect(selected.value);
        this.filterSubscribersSelect(selected.value);
    }

    filterSubscribersSelect(value) {
        let me = this;
        let updatedEvents = this.props.initial_events;
        updatedEvents = updatedEvents.filter(function(item){
            return me.getStatusBool(me.props.filter_status, item) && me.getKeywordsBool(me.props.filter_keywords, item) &&
                me.getNbSubscribersBool(value, me.props.filter_number_subscribers, item) &&
                me.getPeriodBool(me.props.filter_start_date, me.props.filter_end_date, item);
        });
        this.props.setEvents(updatedEvents);
    }

    numberSubscribersFilterChange(event) {
        if (event.target.value !== "") {
            this.props.setFilterEventsNumberSubscribers(event.target.value);
            this.filterNumberSubscribers(event.target.value);
        }
    }

    filterNumberSubscribers(value) {
        let me = this;
        let updatedEvents = this.props.initial_events;
        updatedEvents = updatedEvents.filter(function(item){
            return me.getStatusBool(me.props.filter_status, item) && me.getKeywordsBool(me.props.filter_keywords, item) &&
                me.getNbSubscribersBool(me.props.filter_subscribers_select, value, item) &&
                me.getPeriodBool(me.props.filter_start_date, me.props.filter_end_date, item);
        });
        this.props.setEvents(updatedEvents);
    }

    statusFilterChange(option) {
        this.props.setFilterEventsStatus(option);
        this.filterStatus(option);
    }

    filterStatus(value) {
        let me = this;
        let updatedEvents = this.props.initial_events;
        updatedEvents = updatedEvents.filter(function(item){
            return me.getStatusBool(value, item) && me.getKeywordsBool(me.props.filter_keywords, item) &&
                me.getNbSubscribersBool(me.props.filter_subscribers_select, me.props.filter_number_subscribers, item) &&
                me.getPeriodBool(me.props.filter_start_date, me.props.filter_end_date, item);
        });
        this.props.setEvents(updatedEvents);
    }

    getStatusBool(value, item) {
        let now = new Date().getTime();
        let stat1 = (value.indexOf(1) !== -1),
            stat2 = (value.indexOf(2) !== -1),
            stat3 = (value.indexOf(3) !== -1);
        return ((stat1 && stat2 && stat3) ||
            (stat1 && now <= item.start_date) ||
            (stat2 && item.start_date <= now && now <= item.end_date) ||
            (stat3 && item.end_date <= now));
    }

    getKeywordsBool(value, item) {
        return ((item.title.toLowerCase().search(value.toLowerCase()) !== -1) ||
            (item.description.toLowerCase().search(value.toLowerCase()) !== -1));
    }

    getNbSubscribersBool(value_select, value, item) {
        return ((value_select === "inferieur" && item.nb_subscribers <= value) ||
            (value_select === "egal" && item.nb_subscribers === value) ||
            (value_select === "superieur" && item.nb_subscribers >= value));
    }

    getPeriodBool(value_start, value_end, item) {
        return ((value_start === "" || value_end === "") ||
            (value_start <= item.start_date && item.start_date <= value_end) ||
            (value_start <= item.end_date && item.end_date <= value_end));
    }

    resetFilters() {
        this.props.resetFilters();
        this.props.setEvents(this.props.initial_events);
        this.filterStatus(this.props.filter_status);
    }

    handleEventModalDismiss() {
        this.props.dismissEventModal();
    }

    handleEventModalConfirm() {
        if (!Validator.description(this.props.current_title) ||
            !Validator.description(this.props.current_description) ||
            !Validator.date(this.props.current_start_date) ||
            !Validator.date(this.props.current_end_date)) {

            this.props.displayAlert({
                alertTitle: Texts.ERREUR_TITRE.text_fr,
                alertText: Texts.ERR_REMPLIR_TOUS_CHAMPS.text_fr
            });

            return;
        }

        if (this.props.current_start_date > this.props.current_end_date) {

            this.props.displayAlert({
                alertTitle: Texts.ERREUR_TITRE.text_fr,
                alertText: Texts.LA_DATE_DE_FIN_PRECEDE_LA_DATE_DE_DEBUT.text_fr
            });

            return;
        }

        if (this.props.current_title !== this.props.keep_current_title ||
            (this.props.current_picture !== this.props.keep_current_picture) ||
            this.props.current_description !== this.props.keep_current_description ||
            this.props.current_start_date !== this.props.keep_current_start_date ||
            this.props.current_end_date !== this.props.keep_current_end_date) {

            this.createUpdateEvent();
        } else {
            this.handleEventModalDismiss();
        }
    }

    createEventClick() {
        this.props.displayEventModal();
    }

    editEventClick(item) {
        this.props.displayEventEditModal({
            current_id: item._id,
            current_picture: item.picture,
            current_title: item.title,
            current_description: item.description,
            current_start_date: item.start_date,
            current_end_date: item.end_date,
            current_update_date: item.update_date
        });
    }

    deleteEventClick(item) {
        this.props.displayDeleteConfirm(item._id);
    }

    onCurrentTitleChange(event) {
        this.props.setEventModalCurrentTitle(event.target.value);
    }

    onCurrentDescriptionChange(event) {
        this.props.setEventModalCurrentDescription(event.target.value);
    }

    onCurrentStartDateChange(event) {
        if (event.target.value !== "") {
            let date = new Date(event.target.value).getTime();
            this.props.setEventModalCurrentStartDate(date);
        } else {
            this.props.setEventModalCurrentStartDate("");
        }
    }

    onCurrentEndDateChange(event) {
        if (event.target.value !== "") {
            let date = new Date(event.target.value).getTime();
            this.props.setEventModalCurrentEndDate(date);
        } else {
            this.props.setEventModalCurrentEndDate("");
        }
    }

    onCurrentPictureChange() {
        let me = this;
        if (this.eventPictureRef.files.length > 0) {
            let reader = new FileReader();
            reader.readAsDataURL(this.eventPictureRef.files[0]);
            reader.addEventListener("load", function () {
                me.props.setEventModalCurrentPicture(reader.result);
            }, false);
        }
    }

    getValidationState(field) {

        let value;
        switch (field) {
            case "title":
                value = this.props.current_title;
                break;
            case "description":
                value = this.props.current_description;
                break;
            case "start_date":
                value = this.props.current_start_date;
                break;
            case "end_date":
                value = this.props.current_end_date;
                break;
            default:
                return "warning";
        }

        if (field === "title" || field === "description") {

            if (Validator.description(value))
                return "success";

        } else if (field === "start_date" || field === "end_date") {
            if (Validator.date(value))
                return "success";
        }
        return "warning";
    }

    handleDeleteConfirmDismiss() {
        this.props.dismissDeleteConfirm();
    }

    confirmEventDelete() {
        this.deleteEvent();
    }

    getStatusStyle(start_date, end_date) {
        let now = new Date().getTime();
        if (now <= start_date || (start_date === 1 && end_date === "")) {
            return "warning";
        } else if ((start_date <= now && now <= end_date) || (start_date === 2 && end_date === "")) {
            return "primary";
        } else if (end_date <= now || (start_date === 3 && end_date === "")) {
            return "danger";
        } else {
            return "default";
        }
    }

    getStatusName(start_date, end_date) {
        let now = new Date().getTime();
        if (now <= start_date || (start_date === 1 && end_date === "")) {
            return Texts.A_VENIR.text_fr;
        } else if ((start_date <= now && now <= end_date) || (start_date === 2 && end_date === "")) {
            return Texts.EN_COURS.text_fr;
        } else if (end_date <= now || (start_date === 3 && end_date === "")) {
            return Texts.TERMINE.text_fr;
        } else {
            return "";
        }
    }

    handleEventDeletionCauseChange(event) {
        this.props.setDeletionCause(event.target.value);
    }

    render() {

        const inferieur_a = Texts.INFERIEUR_A.text_fr;
        const egal_a = Texts.EGAL_A.text_fr;
        const superieur_a = Texts.SUPERIEUR_A.text_fr;

        return (
            <Panel header={<div><Glyphicon glyph="calendar" /> {Texts.EVENEMENTS.text_fr}</div>} bsStyle="primary">
                <Panel>
                    <Panel header={<div><Glyphicon glyph="filter" /> {Texts.FILTRE.text_fr}</div>}>
                        <Form horizontal>
                            <Col xs={12} sm={12} md={6} lg={6}>
                                <FormGroup>
                                    <Col componentClass={ControlLabel} xs={3} sm={3} md={3} lg={3}>
                                        {Texts.PAR_MOTS_CLEFS.text_fr}
                                    </Col>
                                    <Col xs={9} sm={9} md={9} lg={9}>
                                        <FormControl
                                            type="text"
                                            placeholder={Texts.MOTS_CLEFS.text_fr}
                                            value={this.props.filter_keywords}
                                            onChange={this.keyWordFilterChange.bind(this)}
                                        />
                                    </Col>
                                </FormGroup>
                                <FormGroup>
                                    <Col componentClass={ControlLabel} xs={3} sm={3} md={3} lg={3}>
                                        {Texts.PAR_PERIODE.text_fr + ", " + Texts.DE.text_fr + " :"}
                                    </Col>
                                    <Col xs={4} sm={4} md={4} lg={4}>
                                        <FormControl
                                            type="date"
                                            format={"dd/mm/YYYY"}
                                            min={"2018-02-02"}
                                            value={Dates.formatYYYYmmDD(this.props.filter_start_date)}
                                            onChange={this.filterStartDateChange.bind(this)}
                                        />
                                    </Col>
                                    <Col componentClass={ControlLabel} xs={1} sm={1} md={1} lg={1}>
                                        {Texts.A.text_fr + " :"}
                                    </Col>
                                    <Col xs={4} sm={4} md={4} lg={4}>
                                        <FormControl
                                            type="date"
                                            format={"dd/mm/YYYY"}
                                            min={"2018-02-02"}
                                            value={Dates.formatYYYYmmDD(this.props.filter_end_date)}
                                            onChange={this.filterEndDateChange.bind(this)}
                                        />
                                    </Col>
                                </FormGroup>
                            </Col>
                            <Col xs={12} sm={12} md={6} lg={6}>
                                <FormGroup>
                                    <Col componentClass={ControlLabel} xs={4} sm={4} md={4} lg={4}>
                                        {Texts.PAR_STATUS.text_fr}
                                    </Col>
                                    <Col xs={8} sm={8} md={8} lg={8}>
                                        <ToggleButtonGroup
                                            type="checkbox"
                                            name="date"
                                            value={this.props.filter_status}
                                            defaultValue={this.props.initial_filter_status}
                                            onChange={this.statusFilterChange.bind(this)}
                                        >
                                            <ToggleButton value={1} bsStyle={this.getStatusStyle(1, "")}>{this.getStatusName(1, "")}</ToggleButton>
                                            <ToggleButton value={2} bsStyle={this.getStatusStyle(2, "")}>{this.getStatusName(2, "")}</ToggleButton>
                                            <ToggleButton value={3} bsStyle={this.getStatusStyle(3, "")}>{this.getStatusName(3, "")}</ToggleButton>
                                        </ToggleButtonGroup>
                                    </Col>
                                </FormGroup>
                                <FormGroup>
                                    <Col componentClass={ControlLabel} xs={4} sm={4} md={4} lg={4}>
                                        {Texts.PAR_NOMBRE_D_INSCRIT.text_fr}
                                    </Col>
                                    <Col xs={4} sm={4} md={4} lg={4}>
                                        <Select
                                            clearable={false}
                                            value={this.props.filter_subscribers_select}
                                            onChange={this.subscribersFilterSelectChange.bind(this)}
                                            options={[
                                                { value: 'inferieur', label: inferieur_a },
                                                { value: 'egal', label: egal_a },
                                                { value: 'superieur', label: superieur_a }
                                            ]}
                                        />
                                    </Col>
                                    <Col xs={4} sm={4} md={4} lg={4}>
                                        <FormControl
                                            type="number"
                                            min={0}
                                            value={this.props.filter_number_subscribers}
                                            onChange={this.numberSubscribersFilterChange.bind(this)}
                                        />
                                    </Col>
                                </FormGroup>
                            </Col>
                        </Form>
                    </Panel>
                    <Button
                        onClick={this.resetFilters.bind(this)}
                    >
                        <Glyphicon glyph="refresh" /> {Texts.REINITIALISER_LES_FILTRES.text_fr}
                    </Button>&nbsp;
                    <Button
                        className={"pull-right"}
                        onClick={this.createEventClick.bind(this)}
                    >
                        <Glyphicon glyph="plus" /> {Texts.CREER_UN_EVENEMENT.text_fr}
                    </Button>
                </Panel>
                <Grid fluid={true}>
                    <Row>
                        {
                            this.props.events.map((item) => (
                                <Col key={item._id} xs={12} md={3}>
                                    <Thumbnail>
                                        <Image
                                            src={(item.picture && item.picture !== "" ? item.picture : "/img/calendar.svg")}
                                            alt="Event picture"
                                            className={"eventImage center-block"}
                                        />
                                        <h4 className={"blockEllipsis"}>{item.title}</h4>
                                        <Label bsStyle={this.getStatusStyle(item.start_date, item.end_date)}>
                                            {this.getStatusName(item.start_date, item.end_date)}
                                        </Label>
                                        <h5>{Dates.formatDateOnly(item.start_date) + " - " + Dates.formatDateOnly(item.end_date)}</h5>
                                        <p>
                                            {Texts.NOMBRE_D_INSCRIT.text_fr + " : "}<Badge>{item.nb_subscribers}</Badge>
                                        </p>
                                        <div>
                                            <Button

                                                bsStyle="primary"
                                                onClick={this.editEventClick.bind(this, item)}
                                            >
                                                <Glyphicon glyph="pencil" /> {Texts.EDITER.text_fr}
                                            </Button>&nbsp;
                                            <Button
                                                bsStyle="danger"
                                                onClick={this.deleteEventClick.bind(this, item)}
                                            >
                                                <Glyphicon glyph="remove" /> {Texts.SUPPRIMER.text_fr}
                                            </Button>
                                        </div>
                                    </Thumbnail>
                                </Col>
                            ))
                        }
                    </Row>
                </Grid>

                <Modal show={this.props.showEventModal} onHide={this.handleEventModalDismiss.bind(this)} bsSize={"large"}>
                    <Modal.Header closeButton>
                        <Modal.Title className={"blockEllipsis"}>
                            {(this.props.current_id === "" ?
                                Texts.CREER_UN_EVENEMENT.text_fr :
                                (Texts.EVENEMENT.text_fr + " - " + this.props.current_title))}
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <FormGroup>
                            <Image
                                src={(this.props.current_picture === "" ? "/img/preview.svg" : this.props.current_picture)}
                                rounded
                                responsive={true}
                                thumbnail={true}
                                className={"center-block " + (this.props.current_picture === "" ? "previewImageNotSelected" : "previewImage")}
                            />
                            <HelpBlock className={"helpBlock"}>{(this.props.current_picture === "" ? Texts.PAS_DIMAGE_SELECTIONNE.text_fr : "")}</HelpBlock>
                        </FormGroup>
                        <Form horizontal>
                            <FormGroup validationState={this.getValidationState('title')}>
                                <Col componentClass={ControlLabel} xs={3} sm={3} md={3} lg={3}>
                                    {Texts.TITRE.text_fr}
                                </Col>
                                <Col xs={6} sm={6} md={6} lg={6}>
                                    <FormControl
                                        type="text"
                                        placeholder={Texts.TITRE.text_fr}
                                        value={this.props.current_title}
                                        onChange={this.onCurrentTitleChange.bind(this)}
                                    />
                                </Col>
                            </FormGroup>
                            <FormGroup validationState={this.getValidationState('start_date')}>
                                <Col componentClass={ControlLabel} xs={3} sm={3} md={3} lg={3}>
                                    {Texts.DATE_DE_DEBUT.text_fr}
                                </Col>
                                <Col xs={6} sm={6} md={6} lg={6}>
                                    <FormControl
                                        type="date"
                                        format={"dd/mm/YYYY"}
                                        value={Dates.formatYYYYmmDD(this.props.current_start_date)}
                                        onChange={this.onCurrentStartDateChange.bind(this)}
                                    />
                                </Col>
                            </FormGroup>
                            <FormGroup validationState={this.getValidationState('end_date')}>
                                <Col componentClass={ControlLabel} xs={3} sm={3} md={3} lg={3}>
                                    {Texts.DATE_DE_FIN.text_fr}
                                </Col>
                                <Col xs={6} sm={6} md={6} lg={6}>
                                    <FormControl
                                        type="date"
                                        format={"dd/mm/YYYY"}
                                        value={Dates.formatYYYYmmDD(this.props.current_end_date)}
                                        onChange={this.onCurrentEndDateChange.bind(this)}
                                    />
                                </Col>
                            </FormGroup>
                            <FormGroup>
                                <Col xs={3} sm={3} md={3} lg={3}>

                                </Col>
                                <Col xs={6} sm={6} md={6} lg={6}>
                                    <ControlLabel>{Texts.SELECTIONNER_IMG.text_fr}</ControlLabel>
                                    <FormControl
                                        type="file"
                                        accept=".png,.jpg,.svg"
                                        inputRef={ref => this.eventPictureRef = ref}
                                        onChange={this.onCurrentPictureChange.bind(this)}
                                    />
                                    <HelpBlock>{Texts.FORMATS_AUTORISES.text_fr}</HelpBlock>
                                </Col>
                            </FormGroup>
                            <FormGroup validationState={this.getValidationState('description')}>
                                <Col componentClass={ControlLabel} xs={3} sm={3} md={3} lg={3}>
                                    {Texts.DESCRIPTION.text_fr}
                                </Col>
                                <Col xs={6} sm={6} md={6} lg={6}>
                                    <FormControl
                                        rows={6}
                                        placeholder={Texts.DESCRIPTION.text_fr}
                                        componentClass="textarea"
                                        value={this.props.current_description}
                                        onChange={this.onCurrentDescriptionChange.bind(this)}
                                    />
                                </Col>
                            </FormGroup>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.handleEventModalDismiss.bind(this)}>
                            <Glyphicon glyph="remove" /> {Texts.FERMER.text_fr}
                        </Button>
                        <Button
                            bsStyle={"primary"}
                            onClick={this.handleEventModalConfirm.bind(this)}
                        >
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
                        <Button onClick={this.handleAlertDismiss.bind(this)}>
                            <Glyphicon glyph="remove" /> {Texts.FERMER.text_fr}
                        </Button>
                    </Modal.Footer>
                </Modal>

                <Modal show={this.props.showDeleteConfirm} onHide={this.handleDeleteConfirmDismiss.bind(this)}>
                    <Modal.Header closeButton>
                        <Modal.Title>{Texts.SUPPRIMER_UN_EVENEMENT.text_fr}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <FormControl.Static>
                            {Texts.ETES_VOUS_SUR_DE_VOULOIR_SUPPRIMER_CET_EVENEMENT.text_fr}<br/>
                            {Texts.VOUS_POUVEZ_PRECISER_LA_RAISON_DE_CETTE_SUPPRESSION.text_fr}
                        </FormControl.Static>
                        <FormGroup>
                            <FormControl
                                rows={6}
                                componentClass="textarea"
                                placeholder={Texts.RAISON_DE_LA_SUPPRESSION.text_fr}
                                value={this.props.deletion_cause}
                                onChange={this.handleEventDeletionCauseChange.bind(this)}
                            />
                        </FormGroup>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.handleDeleteConfirmDismiss.bind(this)}>
                            <Glyphicon glyph="remove" /> {Texts.FERMER.text_fr}
                        </Button>
                        <Button onClick={this.confirmEventDelete.bind(this)}>
                            <Glyphicon glyph="ok" /> {Texts.CONFIRMER.text_fr}
                        </Button>
                    </Modal.Footer>
                </Modal>

            </Panel>
        );
    }
}

function mapStateToProps(state) {
    return {
        showAlert: state.events.showAlert,
        alertTitle: state.events.alertTitle,
        alertText: state.events.alertText,
        events: state.events.events,
        initial_events: state.events.initial_events,
        filter_keywords: state.events.filter_keywords,
        filter_start_date: state.events.filter_start_date,
        filter_end_date: state.events.filter_end_date,
        filter_status: state.events.filter_status,
        initial_filter_status: state.events.initial_filter_status,
        filter_subscribers_select: state.events.filter_subscribers_select,
        filter_number_subscribers: state.events.filter_number_subscribers,
        showEventModal: state.events.showEventModal,

        showDeleteConfirm: state.events.showDeleteConfirm,
        delete_id: state.events.delete_id,
        deletion_cause: state.events.deletion_cause,

        current_id: state.events.current_id,
        current_picture: state.events.current_picture,
        current_title: state.events.current_title,
        current_description: state.events.current_description,
        current_start_date: state.events.current_start_date,
        current_end_date: state.events.current_end_date,
        current_update_date: state.events.current_update_date,

        keep_current_picture: state.events.keep_current_picture,
        keep_current_title: state.events.keep_current_title,
        keep_current_description: state.events.keep_current_description,
        keep_current_start_date: state.events.keep_current_start_date,
        keep_current_end_date: state.events.keep_current_end_date,

        events_is_load: state.global.events_is_load
    };
}

export default connect(mapStateToProps, {
    displayAlert,
    dismissAlert,
    displayDeleteConfirm,
    dismissDeleteConfirm,
    setEvents,
    setInitialEvents,
    addEvent,
    updateEvent,
    deleteEvent,
    setFilterEventsStartDate,
    setFilterEventsEndDate,
    setFilterEventsKeywords,
    setFilterEventsNumberSubscribers,
    setFilterEventsStatus,
    setFilterEventsSubscribersSelect,
    resetFilters,
    displayEventModal,
    displayEventEditModal,
    dismissEventModal,
    setEventModalCurrentTitle,
    setEventModalCurrentDescription,
    setEventModalCurrentStartDate,
    setEventModalCurrentEndDate,
    setEventModalCurrentPicture,
    setDeletionCause,

    setEventsIsLoad
})(Events);