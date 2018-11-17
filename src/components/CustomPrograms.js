import React from 'react';
import ReactDOM from 'react-dom';
import {
    Panel,
    Glyphicon,
    Table,
    Image,
    Checkbox,
    Col,
    Form,
    FormControl,
    FormGroup,
    Button,
    ControlLabel,
    Radio,
    Modal,
    HelpBlock,
    ButtonGroup
} from 'react-bootstrap';
import { connect } from 'react-redux';
import {browserHistory} from 'react-router';

import {
    setActivities,
    setCustomPrograms,
    setInitialCustomPrograms,
    addCustomProgram,
    updateCustomProgram,
    updateCustomProgramAvailability,
    setCustomProgramsAvailabilities,
    resetCustomProgramsAvailabilities,
    deleteCustomProgram,
    displayCustomProgramModal,
    displayCustomProgramEditModal,
    dismissCustomProgramModal,
    setCustomProgramModalCurrentName,
    setCustomProgramModalCurrentPicture,
    setCustomProgramModalCurrentNbActivities,
    setCustomProgramModalCurrentTotalTime,
    setCustomProgramModalCurrentActivities,
    setCustomProgramModalCurrentAvailable,
    addToCurrentActivities,
    deleteToCurrentActivities,
    displayCustomProgramDeleteConfirm,
    dismissCustomProgramDeleteConfirm,

    setFilterCustomProgramKeywords,
    setFilterCustomProgramNumberActivities,
    setFilterCustomProgramTotalDuration,
    setFilterCustomProgramAvailable,
    setFilterCustomProgramUnavailable,
    resetFilterCustomProgram

} from "../actions/customProgramsActions";

import {
    displayAlert,
    dismissAlert,
    setCustomProgramsActivitiesIsLoad,
    setCustomProgramsIsLoad
} from "../actions/globalActions";

import Dates from "../utils/Dates";
import Texts from "../utils/Texts";
import Communication from "../utils/Communication";
import Status from "../utils/Status";
import Fields from "../utils/Fields";
import Paths from "../utils/Paths";
import Validator from "../utils/Validator";

import "../styles/CustomPrograms.css";

class CustomPrograms extends React.Component {

    componentWillMount() {
        if (this.props.custom_programs_activities_is_load === false) {
            this.getCustomProgramsActivities();
        }
        if (this.props.custom_programs_is_load === false) {
            this.getCustomPrograms();
        }
    }

    getCustomProgramsActivities() {
        let params = {};

        params[Fields.TOKEN] = localStorage.getItem("token");

        let me = this;

        let communication = new Communication('post', Paths.HOST + Paths.GET_ACTIVITIES, params);
        communication.sendRequest(
            function (response) {
                if (response.status === 200) {
                    if (response.data.code === Status.GENERIC_OK.code) {

                        if (me !== undefined)
                            me.props.setActivities(response.data.activities);
                        if (me !== undefined)
                            me.props.setCustomProgramsActivitiesIsLoad();

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
                console.log(error.response.status);
                if (me !== undefined) {
                    me.props.displayAlert({
                        alertTitle: Texts.ERREUR_TITRE.text_fr,
                        alertText: Texts.ERR_RESEAU.text_fr
                    });
                }
            }
        );
    }

    getCustomPrograms() {

        let params = {};

        params[Fields.TOKEN] = localStorage.getItem("token");

        let me = this;

        let communication = new Communication('post', Paths.HOST + Paths.GET_CUSTOM_PROGRAMS, params);
        communication.sendRequest(
            function (response) {
                if (response.status === 200) {
                    if (response.data.code === Status.GENERIC_OK.code) {

                        if (me !== undefined)
                            me.props.setCustomPrograms(JSON.parse(JSON.stringify(response.data.custom_programs)));
                        if (me !== undefined)
                            me.props.setInitialCustomPrograms(JSON.parse(JSON.stringify(response.data.custom_programs)));
                        if (me !== undefined)
                            me.props.setCustomProgramsIsLoad();

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
                console.log(error.response.status);
                if (me !== undefined) {
                    me.props.displayAlert({
                        alertTitle: Texts.ERREUR_TITRE.text_fr,
                        alertText: Texts.ERR_RESEAU.text_fr
                    });
                }
            }
        );
    }

    deleteCustomProgram() {

        let params = {};

        params[Fields.TOKEN] = localStorage.getItem("token");
        params[Fields.CUSTOM_PROGRAM_ID] = this.props.delete_id;

        let me = this;

        let communication = new Communication('post', Paths.HOST + Paths.DELETE_CUSTOM_PROGRAM, params);
        communication.sendRequest(
            function (response) {
                if (response.status === 200) {
                    if (response.data.code === Status.GENERIC_OK.code) {

                        me.props.deleteCustomProgram(me.props.delete_id);
                        me.props.dismissCustomProgramDeleteConfirm();

                        me.filterKeyWord(me.props.filter_keywords);

                        me.forceUpdate();

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
                console.log(error);
                me.props.displayAlert({
                    alertTitle: Texts.ERREUR_TITRE.text_fr,
                    alertText: Texts.ERR_RESEAU.text_fr
                });
            }
        );
    }

    createUpdateCustomProgram() {
        let params = {};

        params[Fields.TOKEN] = localStorage.getItem("token");
        if (this.props.current_id !== "") {
            params[Fields.CUSTOM_PROGRAM_ID] = this.props.current_id;
        }
        if (this.customProgramPictureRef.value !== "") {
            params[Fields.PICTURE] = this.props.current_picture;
        }
        params[Fields.NAME] = this.props.current_name;
        params[Fields.NB_ACTIVITIES] = this.props.current_nb_activities;
        params[Fields.TOTAL_TIME] = this.props.current_total_time;
        params[Fields.AVAILABLE] = this.props.current_available;
        params[Fields.ACTIVITIES] = this.props.current_activities;

        let me = this;

        let communication = new Communication('post', Paths.HOST +
            (this.props.current_id === "" ? Paths.ADD_CUSTOM_PROGRAM : Paths.UPDATE_CUSTOM_PROGRAM), params);
        communication.sendRequest(
            function (response) {
                if (response.status === 200) {
                    if (response.data.code === Status.GENERIC_OK.code) {

                        //CREATION
                        if (me.props.current_id === "") {

                            let now = new Date();
                            me.props.addCustomProgram({
                                _id: response.data.custom_program_id,
                                picture: me.props.current_picture,
                                name: me.props.current_name,
                                nb_activities: me.props.current_nb_activities,
                                total_time: me.props.current_total_time,
                                available: me.props.current_available,
                                activities: me.props.current_activities,
                                creation_date: now.getTime(),
                                update_date: now.getTime()
                            });

                            //UPDATE
                        } else {

                            let now = new Date();
                            me.props.updateCustomProgram({
                                _id: me.props.current_id,
                                picture: me.props.current_picture,
                                name: me.props.current_name,
                                nb_activities: me.props.current_nb_activities,
                                total_time: me.props.current_total_time,
                                available: me.props.current_available,
                                activities: me.props.current_activities,
                                update_date: now.getTime()
                            });

                        }

                        me.filterKeyWord(me.props.filter_keywords);
                        me.handleCustomProgramModalDismiss();

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

    updateCustomProgramsAvailabilities(custom_programs) {

        let params = {};

        params[Fields.TOKEN] = localStorage.getItem("token");
        params[Fields.CUSTOM_PROGRAMS] = custom_programs;

        let me = this;

        let communication = new Communication('post', Paths.HOST + Paths.SET_CUSTOM_PROGRAMS_AVAILABILITY, params);
        communication.sendRequest(
            function (response) {
                if (response.status === 200) {
                    if (response.data.code === Status.GENERIC_OK.code) {

                        me.props.setCustomProgramsAvailabilities(custom_programs);
                        me.filterKeyWord(me.props.filter_keywords);
                        me.forceUpdate();

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
                console.log(error);
                me.props.displayAlert({
                    alertTitle: Texts.ERREUR_TITRE.text_fr,
                    alertText: Texts.ERR_RESEAU.text_fr
                });
            }
        );
    }

    onCreateProgramClick() {
        this.props.displayCustomProgramModal();
    }

    onEditCustomProgramClick(item, event) {
        this.props.displayCustomProgramEditModal({
            current_id: item._id,
            current_picture: item.picture,
            current_name: item.name,
            current_nb_activities: item.nb_activities,
            current_total_time: item.total_time,
            current_activities: item.activities,
            current_available: item.available
        });
    }

    handleCustomProgramModalConfirm() {

        if (!Validator.description(this.props.current_name)) {

            this.props.displayAlert({
                alertTitle: Texts.ERREUR_TITRE.text_fr,
                alertText: Texts.ERR_REMPLIR_TOUS_CHAMPS.text_fr
            });

            return;
        }

        if (this.props.current_nb_activities < 2) {

            this.props.displayAlert({
                alertTitle: Texts.ERREUR_TITRE.text_fr,
                alertText: Texts.PROGRAMME_NE_CONTIENT_QUUNE_SEULE_ACTIVITE.text_fr
            });

            return;
        }

        if (this.props.current_name !== this.props.keep_current_name ||
            (this.props.current_picture !== this.props.keep_current_picture) ||
            this.props.current_nb_activities !== this.props.keep_current_nb_activities ||
            this.props.current_total_time !== this.props.keep_current_total_time ||
            this.props.current_available !== this.props.keep_current_available ||
            JSON.stringify(this.props.current_activities) !== JSON.stringify(this.props.keep_current_activities)) {

            this.createUpdateCustomProgram();
        } else {
            this.handleCustomProgramModalDismiss();
        }
    }

    onItemAvailabilityChange(item, event) {
        console.log("=====>", event.target.checked);
        this.props.updateCustomProgramAvailability({
            _id: item._id,
            available: event.target.checked
        });
        this.forceUpdate();
    }

    handleAlertDismiss() {
        this.props.dismissAlert();
    }

    handleCustomProgramModalDismiss() {
        this.props.dismissCustomProgramModal();
    }

    getValidationStateName() {
        if (Validator.name(this.props.current_name))
            return "success";
        return "warning";
    }

    onCurrentNameChange(event) {
        this.props.setCustomProgramModalCurrentName(event.target.value);
    }

    onCurrentPictureChange() {
        let me = this;
        if (this.customProgramPictureRef.files.length > 0) {
            let reader = new FileReader();
            reader.readAsDataURL(this.customProgramPictureRef.files[0]);
            reader.addEventListener("load", function () {
                me.props.setCustomProgramModalCurrentPicture(reader.result);
            }, false);
        }
    }

    onCurrentAvailableChange(event) {
        this.props.setCustomProgramModalCurrentAvailable(event.target.checked);
    }

    onAddActivityClick() {
        const activity = ReactDOM.findDOMNode(this.selectActivityInputRef).value;
        const duration = ReactDOM.findDOMNode(this.selectActivityDurationInputRef).value;
        const duration_sec = ReactDOM.findDOMNode(this.selectActivityDurationSecInputRef).value;

        if (activity === "" || activity === null ||
            ((duration === "" || duration === null) && (duration_sec === "" || duration_sec === null)) ||
            (duration === 0 && duration_sec === 0)) {

            return;
        }

        let idx = this.props.activities.findIndex(function (item) {
            return (item._id === activity);
        });

        if (idx === -1) {
            return;
        }

        this.props.addToCurrentActivities({
            _id: this.props.activities[idx]._id,
            name: this.props.activities[idx].name,
            time: ((parseInt((duration === "" || duration === null) ? 0 : duration, 10) * 60) + parseInt((duration_sec === "" || duration_sec === null) ? 0 : duration_sec, 10)),
            icon: this.props.activities[idx].icon
        });

        let total_duration = 0;
        this.props.current_activities.forEach(function(cur) {
            total_duration += cur.time;
        });

        this.props.setCustomProgramModalCurrentNbActivities(this.props.current_activities.length);
        this.props.setCustomProgramModalCurrentTotalTime(total_duration);

        this.forceUpdate();
    }

    checkIfAvailabilityHasBeenUpdated(item) {
        if (item !== undefined) {
            let index_a = this.props.initial_custom_programs.findIndex(function (cur) {
                if (cur === undefined) {
                    return false;
                }
                return (cur._id === item._id);
            });
            let index_b = this.props.custom_programs.findIndex(function (cur) {
                if (cur === undefined) {
                    return false;
                }
                return (cur._id === item._id);
            });

            if (index_a === -1 || index_b === -1
                || this.props.initial_custom_programs[index_a] === undefined ||
                this.props.custom_programs[index_b] === undefined) {
                return false;
            }

            return this.props.initial_custom_programs[index_a].available !== this.props.custom_programs[index_b].available;
        } else {
            return false;
        }
    }

    onDeleteCustomProgram(item) {
        this.props.displayCustomProgramDeleteConfirm(item._id);
    }

    handleDeleteConfirmDismiss() {
        this.props.dismissCustomProgramDeleteConfirm();
    }

    confirmCustomProgramDelete() {
        this.deleteCustomProgram();
    }

    onSaveAvailabilities() {
        let index;
        let custom_programs = [];
        let me = this;
        this.props.custom_programs.forEach(function (cur) {
            index = me.props.initial_custom_programs.findIndex(function (itm) {
                return itm._id === cur._id;
            });
            if (cur.available !== me.props.initial_custom_programs[index].available) {
                custom_programs.push({
                    _id: cur._id,
                    available: cur.available
                });
            }
        });

        if (custom_programs.length > 0) {
            this.updateCustomProgramsAvailabilities(custom_programs);
        }
    }

    onResetAvailabilities() {
        this.props.resetCustomProgramsAvailabilities();
    }

    keyWordFilterChange(event) {
        this.props.setFilterCustomProgramKeywords(event.target.value);
        this.filterKeyWord(event.target.value);
    }

    filterKeyWord(value) {
        let me = this;
        let updatedPrograms = this.props.initial_custom_programs;
        updatedPrograms = updatedPrograms.filter(function(item){
            return me.getAvailableBool(me.props.filter_available, item) && me.getKeywordsBool(value, item) &&
                me.getUnavailableBool(me.props.filter_unavailable, item) &&
                me.getNumberActivitiesBool(me.props.filter_number_activities, item) &&
                me.getTotalDurationBool(me.props.filter_total_duration, item);
        });
        this.props.setCustomPrograms(JSON.parse(JSON.stringify(updatedPrograms)));
    }

    getKeywordsBool(value, item) {
        return (item.name.toLowerCase().search(value.toLowerCase()) !== -1);
    }

    availableFilterChange(event) {
        this.props.setFilterCustomProgramUnavailable(false);
        this.props.setFilterCustomProgramAvailable(true);
        this.filterAvailable(true, false);
    }

    filterAvailable(value_available, value_unavailable) {
        let me = this;
        let updatedPrograms = this.props.initial_custom_programs;
        updatedPrograms = updatedPrograms.filter(function(item){
            return me.getAvailableBool(value_available, item) &&
                me.getKeywordsBool(me.props.filter_keywords, item) &&
                me.getUnavailableBool(value_unavailable, item) &&
                me.getNumberActivitiesBool(me.props.filter_number_activities, item) &&
                me.getTotalDurationBool(me.props.filter_total_duration, item);
        });
        this.props.setCustomPrograms(JSON.parse(JSON.stringify(updatedPrograms)));
    }

    getAvailableBool(value, item) {
        return (value === false || (value === true && item.available === true));
    }

    unavailableFilterChange(event) {
        this.props.setFilterCustomProgramUnavailable(true);
        this.props.setFilterCustomProgramAvailable(false);
        this.filterAvailable(false, true);
    }

    getUnavailableBool(value, item) {
        return (value === false || (value === true && item.available === false));
    }

    numberActivitiesFilterChange(event) {
        if (event.target.value !== "") {
            this.props.setFilterCustomProgramNumberActivities(event.target.value);
            this.filterNumberActivities(event.target.value);
        } else {
            this.props.setFilterCustomProgramNumberActivities(0);
            this.filterNumberActivities(0);
        }
    }

    filterNumberActivities(value) {
        let me = this;
        let updatedPrograms = this.props.initial_custom_programs;
        updatedPrograms = updatedPrograms.filter(function(item){
            return me.getAvailableBool(me.props.filter_available, item) &&
                me.getKeywordsBool(me.props.filter_keywords, item) &&
                me.getUnavailableBool(me.props.filter_unavailable, item) &&
                me.getNumberActivitiesBool(value, item) &&
                me.getTotalDurationBool(me.props.filter_total_duration, item);
        });
        this.props.setCustomPrograms(JSON.parse(JSON.stringify(updatedPrograms)));
    }

    getNumberActivitiesBool(value, item) {
        return (item.nb_activities >= value);
    }

    totalDurationFilterChange(event) {
        if (event.target.value !== "") {
            this.props.setFilterCustomProgramTotalDuration(event.target.value);
            this.filterTotalDuration(event.target.value);
        } else {
            this.props.setFilterCustomProgramTotalDuration(0);
            this.filterTotalDuration(0);
        }
    }

    filterTotalDuration(value) {
        let me = this;
        let updatedPrograms = this.props.initial_custom_programs;
        updatedPrograms = updatedPrograms.filter(function(item){
            return me.getAvailableBool(me.props.filter_available, item) &&
                me.getKeywordsBool(me.props.filter_keywords, item) &&
                me.getUnavailableBool(me.props.filter_unavailable, item) &&
                me.getNumberActivitiesBool(me.props.filter_number_activities, item) &&
                me.getTotalDurationBool(value, item);
        });
        this.props.setCustomPrograms(JSON.parse(JSON.stringify(updatedPrograms)));
    }

    getTotalDurationBool(value, item) {
        return (item.total_time >= value);
    }

    resetFilters() {
        this.props.resetFilterCustomProgram();
        this.props.setCustomPrograms(JSON.parse(JSON.stringify(this.props.initial_custom_programs)));
        this.forceUpdate();
    }

    setCurrentNbActivitiesAndTime(item, index) {
        let total_duration = 0;
        let nb_activities = 0;
        this.props.current_activities.forEach(function(cur, idx) {
            if (cur._id !== item._id ||
                cur.time !== item.time ||
                idx !== index) {
                total_duration += cur.time;
                nb_activities++;
            }
        });

        this.props.setCustomProgramModalCurrentNbActivities(nb_activities);
        this.props.setCustomProgramModalCurrentTotalTime(total_duration);
    }

    handleDeleteActivity(item, index) {
        this.props.deleteToCurrentActivities({
            _id: item._id,
            time: item.time,
            index: index
        });
        this.setCurrentNbActivitiesAndTime(item, index);
        this.forceUpdate();
    }

    render() {
        return (
            <Panel header={<div><Glyphicon glyph="time" /> {Texts.PROGRAMMES_PERSONNALISES.text_fr}</div>} bsStyle="primary">
                <Panel>
                        <Panel header={<div><Glyphicon glyph="filter" /> {Texts.FILTRE.text_fr}</div>}>
                            <Form horizontal>
                                <Col xs={12} sm={12} md={6} lg={6}>
                                    <FormGroup>
                                        <Col componentClass={ControlLabel} xs={12} sm={12} md={3} lg={3}>
                                            {Texts.PAR_NOM.text_fr}
                                        </Col>
                                        <Col xs={12} sm={12} md={7} lg={7}>
                                            <FormControl
                                                type="text"
                                                placeholder={Texts.NOM.text_fr}
                                                value={this.props.filter_keywords}
                                                onChange={this.keyWordFilterChange.bind(this)}
                                            />
                                        </Col>
                                    </FormGroup>
                                    <FormGroup>
                                        <Col componentClass={ControlLabel} xs={12} sm={12} md={4} lg={4}>
                                            {Texts.PAR_DISPONIBILITE.text_fr}
                                        </Col>
                                        <Col xs={0} sm={0} md={1} lg={1}>

                                        </Col>
                                        <Col xs={12} sm={12} md={6} lg={6}>
                                            <Radio name="filterAvailability" inline onChange={this.availableFilterChange.bind(this)} checked={this.props.filter_available}>
                                                {Texts.DISPONIBLE.text_fr}
                                            </Radio>{' '}
                                            <Radio name="filterAvailability" inline onChange={this.unavailableFilterChange.bind(this)} checked={this.props.filter_unavailable}>
                                                {Texts.INDISPONIBLE.text_fr}
                                            </Radio>{' '}
                                        </Col>
                                    </FormGroup>
                                </Col>
                                <Col xs={12} sm={12} md={6} lg={6}>
                                    <FormGroup>
                                        <Col componentClass={ControlLabel} xs={12} sm={12} md={5} lg={5}>
                                            {Texts.PAR_NOMBRE_D_ACTIVITES.text_fr}
                                        </Col>
                                        <Col xs={12} sm={12} md={7} lg={7}>
                                            <FormControl
                                                type="number"
                                                min={0}
                                                placeholder={Texts.NOMBRE_D_ACTIVITES.text_fr}
                                                value={this.props.filter_number_activities}
                                                onChange={this.numberActivitiesFilterChange.bind(this)}
                                            />
                                        </Col>
                                    </FormGroup>
                                    <FormGroup>
                                        <Col componentClass={ControlLabel} xs={12} sm={12} md={5} lg={5}>
                                            {Texts.PAR_DUREE_TOTALE.text_fr + ' (min)'}
                                        </Col>
                                        <Col xs={12} sm={12} md={7} lg={7}>
                                            <FormControl
                                                type="number"
                                                min={0}
                                                placeholder={Texts.DUREE.text_fr + ' (min)'}
                                                value={this.props.filter_total_duration}
                                                onChange={this.totalDurationFilterChange.bind(this)}
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
                        </Button>
                        <Button
                            className={"pull-right"}
                            onClick={this.onCreateProgramClick.bind(this)}
                        >
                            <Glyphicon glyph="plus" />  {Texts.CREER_UN_PROGRAMME.text_fr}
                        </Button>
                </Panel>
                <Table striped bordered condensed hover responsive>
                    <thead>
                        <tr>
                            <th>
                                <h3>{Texts.IMAGE.text_fr}</h3>
                            </th>
                            <th>
                                <h3>{Texts.NOM.text_fr}</h3>
                            </th>
                            <th>
                                <h3>{Texts.NOMBRE_D_ACTIVITES.text_fr}</h3>
                            </th>
                            <th>
                                <h3>{Texts.DUREE_TOTALE.text_fr}</h3>
                            </th>
                            <th>
                                <h3>{Texts.ACTIVITES.text_fr}</h3>
                            </th>
                            <th>
                                <h3>{Texts.DISPONIBLE.text_fr}</h3>
                            </th>
                            <th>
                                <h3>{Texts.ACTION.text_fr}</h3>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                        this.props.custom_programs.map((item) => (
                            <tr key={item._id}
                            >
                                <td onClick={this.onEditCustomProgramClick.bind(this, item)}
                                    style={{cursor: "pointer"}}
                                >
                                    <Image
                                        src={(item.picture && item.picture !== "" ?  item.picture : "/img/program.svg")}
                                        className={"programImage center-block"}
                                    />
                                </td>
                                <td onClick={this.onEditCustomProgramClick.bind(this, item)}
                                    style={{cursor: "pointer"}}
                                >
                                    {item.name}
                                </td>
                                <td onClick={this.onEditCustomProgramClick.bind(this, item)}
                                     style={{cursor: "pointer"}}
                                >
                                    {item.nb_activities}
                                </td>
                                <td onClick={this.onEditCustomProgramClick.bind(this, item)}
                                    style={{cursor: "pointer"}}
                                >
                                    {Dates.formatMinutesDuration(item.total_time)}
                                </td>
                                <td onClick={this.onEditCustomProgramClick.bind(this, item)}
                                    style={{cursor: "pointer"}}
                                >
                                {
                                    item.activities.map((activity_a, index) => (
                                        <div key={"A" + activity_a._id + index}>
                                            <Image
                                                src={activity_a.icon}
                                            />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{activity_a.name} {Dates.formatMinutesDuration(activity_a.time)}
                                        </div>
                                    ))
                                }
                                </td>
                                <td>
                                    <Checkbox checked={item.available} onChange={this.onItemAvailabilityChange.bind(this, item)}>
                                        <span hidden={!this.checkIfAvailabilityHasBeenUpdated(item)} style={{color: "red", fontSize: 14}}>{"( " + Texts.MODIFIE.text_fr + " )"}</span>
                                    </Checkbox>
                                </td>
                                <td>
                                    <Button onClick={this.onDeleteCustomProgram.bind(this, item)}>
                                        <Glyphicon glyph="trash" /> {Texts.SUPPRIMER.text_fr}
                                    </Button>
                                </td>
                            </tr>
                        ))
                    }
                    </tbody>
                </Table>

                <ButtonGroup className={"pull-right"}>
                    <Button onClick={this.onResetAvailabilities.bind(this)}>
                        <Glyphicon glyph="refresh" /> {Texts.REINITIALISER_LES_DISPONIBILITES.text_fr}
                    </Button>
                    <Button onClick={this.onSaveAvailabilities.bind(this)}>
                        <Glyphicon glyph="ok" /> {Texts.ENREGISTRER_LES_DISPONIBILITES.text_fr}
                    </Button>
                </ButtonGroup>


                <Modal show={this.props.showCustomProgramModal} onHide={this.handleCustomProgramModalDismiss.bind(this)} bsSize={"large"}>
                    <Modal.Header closeButton>
                        <Modal.Title className={"blockEllipsis"}>
                            {(this.props.current_id === "" ?
                                Texts.CREER_UN_PROGRAMME.text_fr :
                                (Texts.PROGRAMME.text_fr + " - " + this.props.current_name))}
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
                            <FormGroup validationState={this.getValidationStateName()}>
                                <Col componentClass={ControlLabel} xs={12} sm={12} md={3} lg={3}>
                                    {Texts.NOM.text_fr}
                                </Col>
                                <Col xs={12} sm={12} md={6} lg={6}>
                                    <FormControl
                                        type="text"
                                        placeholder={Texts.NOM.text_fr}
                                        value={this.props.current_name}
                                        onChange={this.onCurrentNameChange.bind(this)}
                                    />
                                </Col>
                            </FormGroup>
                            <FormGroup>
                                <Col componentClass={ControlLabel} xs={12} sm={12} md={3} lg={3}>
                                    {Texts.SELECTIONNER_IMG.text_fr}
                                </Col>
                                <Col xs={12} sm={12} md={6} lg={6}>
                                    <FormControl
                                        type="file"
                                        accept=".png,.jpg,.svg"
                                        inputRef={ref => this.customProgramPictureRef = ref}
                                        onChange={this.onCurrentPictureChange.bind(this)}
                                    />
                                    <HelpBlock>{Texts.FORMATS_AUTORISES.text_fr}</HelpBlock>
                                </Col>
                            </FormGroup>
                            <FormGroup>
                                <Col componentClass={ControlLabel} xs={12} sm={12} md={3} lg={3}>

                                </Col>
                                <Col xs={12} sm={12} md={6} lg={6}>
                                    <Checkbox checked={this.props.current_available} onChange={this.onCurrentAvailableChange.bind(this)}>
                                        {Texts.RENDRE_DISPONIBLE.text_fr}
                                    </Checkbox>
                                </Col>
                            </FormGroup>
                            <FormGroup>
                                <Col componentClass={ControlLabel} xs={12} sm={12} md={3} lg={3}>
                                    {Texts.AJOUTER_UNE_ACTIVITE.text_fr}
                                </Col>
                                <Col xs={12} sm={12} md={2} lg={2}>
                                    <FormControl componentClass="select" inputRef={ ref => this.selectActivityInputRef = ref }>
                                        {
                                            this.props.activities.map((activity_b, index) => (
                                                <option key={"B" + activity_b._id + index} value={activity_b._id}>
                                                    {activity_b.name}
                                                </option>
                                            ))
                                        }
                                    </FormControl>
                                </Col>
                                <Col xs={12} sm={12} md={2} lg={2}>
                                    <FormControl type="number" placeholder={Texts.DUREE.text_fr + " (min)"} inputRef={ ref => this.selectActivityDurationInputRef = ref }/>
                                </Col>
                                <Col xs={12} sm={12} md={2} lg={2}>
                                    <FormControl type="number" placeholder={Texts.DUREE.text_fr + " (sec)"} inputRef={ ref => this.selectActivityDurationSecInputRef = ref }/>
                                </Col>
                                <Col xs={12} sm={12} md={1} lg={1}>
                                    <Button onClick={this.onAddActivityClick.bind(this)}>
                                        <Glyphicon glyph="plus" /> {Texts.AJOUTER.text_fr}
                                    </Button>
                                </Col>
                            </FormGroup>
                        </Form>
                        <Table striped bordered condensed hover responsive>
                            <thead>
                            <tr>
                                <th style={{width: 15 + "%"}}>
                                    <h3>{Texts.ICONE.text_fr}</h3>
                                </th>
                                <th>
                                    <h3>{Texts.NOM.text_fr}</h3>
                                </th>
                                <th>
                                    <h3>{Texts.DUREE.text_fr}</h3>
                                </th>
                                <th>
                                    <h3>{Texts.ACTION.text_fr}</h3>
                                </th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                this.props.current_activities.map((item_ca, index) => (
                                    <tr key={"C" + item_ca._id + index}
                                    >
                                        <td style={{ textAlign: "center"}}>
                                            <Image
                                                src={item_ca.icon}
                                            />
                                        </td>
                                        <td>
                                            {item_ca.name}
                                        </td>
                                        <td>
                                            {Dates.formatMinutesDuration(item_ca.time)}
                                        </td>
                                        <td style={{ textAlign: "center"}}>
                                            <Button onClick={this.handleDeleteActivity.bind(this, item_ca, index)}>
                                                <Glyphicon glyph="remove" />
                                            </Button>
                                        </td>
                                    </tr>
                                ))
                            }
                            </tbody>
                        </Table>

                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.handleCustomProgramModalDismiss.bind(this)}>
                            <Glyphicon glyph="remove" /> {Texts.FERMER.text_fr}
                        </Button>
                        <Button
                            bsStyle={"primary"}
                            onClick={this.handleCustomProgramModalConfirm.bind(this)}
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
                        <Modal.Title>{Texts.SUPPRIMER_UN_PROGRAMME_PRERSONNALISE.text_fr}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <FormControl.Static>
                            {Texts.ETES_VOUS_SUR_DE_VOULOIR_SUPPRIMER_CE_PROGRAMME.text_fr}
                        </FormControl.Static>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.handleDeleteConfirmDismiss.bind(this)}>
                            <Glyphicon glyph="remove" /> {Texts.FERMER.text_fr}
                        </Button>
                        <Button onClick={this.confirmCustomProgramDelete.bind(this)}>
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
        activities: state.custom_programs.activities,
        custom_programs: state.custom_programs.custom_programs,
        initial_custom_programs: state.custom_programs.initial_custom_programs,
        showCustomProgramModal: state.custom_programs.showCustomProgramModal,
        current_id: state.custom_programs.current_id,
        current_name: state.custom_programs.current_name,
        current_picture: state.custom_programs.current_picture,
        current_nb_activities: state.custom_programs.current_nb_activities,
        current_total_time: state.custom_programs.current_total_time,
        current_activities: state.custom_programs.current_activities,
        current_available: state.custom_programs.current_available,
        keep_current_name: state.custom_programs.keep_current_name,
        keep_current_picture: state.custom_programs.keep_current_picture,
        keep_current_nb_activities: state.custom_programs.keep_current_nb_activities,
        keep_current_total_time: state.custom_programs.keep_current_total_time,
        keep_current_activities: state.custom_programs.keep_current_activities,
        keep_current_available: state.custom_programs.keep_current_available,

        showDeleteConfirm: state.custom_programs.showDeleteConfirm,
        delete_id: state.custom_programs.delete_id,

        filter_keywords: state.custom_programs.filter_keywords,
        filter_number_activities: state.custom_programs.filter_number_activities,
        filter_total_duration: state.custom_programs.filter_total_duration,
        filter_available: state.custom_programs.filter_available,
        filter_unavailable: state.custom_programs.filter_unavailable,

        showAlert: state.global.showAlert,
        alertTitle: state.global.alertTitle,
        alertText: state.global.alertText,

        custom_programs_activities_is_load: state.global.custom_programs_activities_is_load,
        custom_programs_is_load: state.global.custom_programs_is_load
    };
}

export default connect(mapStateToProps, {
    displayAlert,
    dismissAlert,
    setActivities,
    setCustomPrograms,
    setInitialCustomPrograms,
    addCustomProgram,
    updateCustomProgram,
    updateCustomProgramAvailability,
    setCustomProgramsAvailabilities,
    resetCustomProgramsAvailabilities,
    deleteCustomProgram,
    displayCustomProgramModal,
    displayCustomProgramEditModal,
    dismissCustomProgramModal,
    setCustomProgramModalCurrentName,
    setCustomProgramModalCurrentPicture,
    setCustomProgramModalCurrentNbActivities,
    setCustomProgramModalCurrentTotalTime,
    setCustomProgramModalCurrentActivities,
    setCustomProgramModalCurrentAvailable,
    addToCurrentActivities,
    deleteToCurrentActivities,
    displayCustomProgramDeleteConfirm,
    dismissCustomProgramDeleteConfirm,

    setFilterCustomProgramKeywords,
    setFilterCustomProgramNumberActivities,
    setFilterCustomProgramTotalDuration,
    setFilterCustomProgramAvailable,
    setFilterCustomProgramUnavailable,
    resetFilterCustomProgram,

    setCustomProgramsActivitiesIsLoad,
    setCustomProgramsIsLoad
})(CustomPrograms);