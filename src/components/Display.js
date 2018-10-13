import React from 'react';
import {
    Panel,
    Glyphicon,
    Modal,
    FormControl,
    Button,
    FormGroup,
    Checkbox
} from 'react-bootstrap';
import Select from 'react-select';
import { connect } from 'react-redux';
import {browserHistory} from 'react-router';

import {
    setDisplayConfiguration,
    setUpdateKeepDisplayConfiguration,
    setShowEvents,
    setKeepEvents,
    setShowNews,
    setNewsType,
    setShowGlobalPerformances,
    setPerformancesType,
    setShowRankingDiscipline,
    setRankingDisciplineType,
    setShowGlobalRanking,
    setShowNationalProductionRank
} from "../actions/displayActions";

import {
    setEvents,
    setSelectedEvents,
    setInitialEvents
} from "../actions/eventsActions";

import {
    displayAlert,
    dismissAlert,
    setDisplayConfigurationIsLoad,
    setEventsIsLoad
} from "../actions/globalActions";

import Communication from "../utils/Communication";
import Paths from '../utils/Paths';
import Fields from '../utils/Fields';
import Status from '../utils/Status';
import Texts from '../utils/Texts';
import ListGroup from "react-bootstrap/es/ListGroup";
import ListGroupItem from "react-bootstrap/es/ListGroupItem";
import Dates from "../utils/Dates";

class Display extends React.Component {

    componentWillMount() {
        if (this.props.display_configuration_is_load === false) {
            this.getDisplayConfiguration();
        }
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
                            me.props.setKeepEvents(rev_events);
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
                console.log(error);
                if (me !== undefined) {
                    me.props.displayAlert({
                        alertTitle: Texts.ERREUR_TITRE.text_fr,
                        alertText: Texts.ERR_RESEAU.text_fr
                    });
                }
            }
        );
    }

    getDisplayConfiguration() {
        let params = {};

        params[Fields.TOKEN] = localStorage.getItem("token");

        let me = this;

        let communication = new Communication('post', Paths.HOST + Paths.GET_DISPLAY_CONFIGURATION, params);
        communication.sendRequest(
            function (response) {
                if (response.status === 200) {
                    if (response.data.code === Status.GENERIC_OK.code) {

                        if (me !== undefined) {
                            me.props.setDisplayConfiguration({
                                show_events: response.data.show_events,
                                selected_events: response.data.selected_events,
                                show_news: response.data.show_news,
                                news_type: response.data.news_type,
                                show_global_performances: response.data.show_global_performances,
                                performances_type: response.data.performances_type,
                                show_ranking_discipline: response.data.show_ranking_discipline,
                                ranking_discipline_type: response.data.ranking_discipline_type,
                                show_global_ranking: response.data.show_global_ranking,
                                show_national_production_rank: response.data.show_national_production_rank
                            });
                            me.props.setDisplayConfigurationIsLoad();
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

    updateDisplayConfiguration() {
        let params = {};
        let selected = [];

        this.props.events.map(function(item) {
            if (item.selected === true) {
                selected.push(item._id);
                return item;
            }
            return null;
        });

        params[Fields.TOKEN] = localStorage.getItem("token");

        params["show_events"] = this.props.show_events;
        params["selected_events"] = selected;

        params["show_news"] = this.props.show_news;
        params["news_type"] = this.props.news_type;

        params["show_global_performances"] = this.props.show_global_performances;
        params["performances_type"] = this.props.performances_type;

        params["show_ranking_discipline"] = this.props.show_ranking_discipline;
        params["ranking_discipline_type"] = this.props.ranking_discipline_type;

        params["show_global_ranking"] = this.props.show_global_ranking;

        params["show_national_production_rank"] = this.props.show_national_production_rank;

        let me = this;

        let communication = new Communication('post', Paths.HOST + Paths.UPDATE_DISPLAY_CONFIGURATION, params);
        communication.sendRequest(
            function (response) {
                if (response.status === 200) {
                    if (response.data.code === Status.GENERIC_OK.code) {

                        if (me !== undefined) {
                            me.props.setKeepEvents(me.props.events.slice());
                            me.props.setUpdateKeepDisplayConfiguration();
                            me.props.displayAlert({
                                alertTitle: Texts.CONFIGURATION_MISE_A_JOUR.text_fr,
                                alertText: Texts.CONFIGURATION_MISE_A_JOUR.text_fr
                            });
                        }

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

    handleAlertDismiss() {
        this.props.dismissAlert();
    }

    handleShowEventsChange(event) {
        this.props.setShowEvents(event.target.checked);
    }

    handleShowNewsChange(event) {
        this.props.setShowNews(event.target.checked);
    }

    handleShowGlobalPerformancesChange(event) {
        this.props.setShowGlobalPerformances(event.target.checked);
    }

    handleShowRankingDisciplineChange(event) {
        this.props.setShowRankingDiscipline(event.target.checked);
    }

    handleShowGlobalRankingChange(event) {
        this.props.setShowGlobalRanking(event.target.checked);
    }

    handleShowNationalProductionRankChange(event) {
        this.props.setShowNationalProductionRank(event.target.checked);
    }

    handleSaveConfiguration() {

        let one_selected_event = false;
        this.props.events.map(function (item) {
            if (item.selected === true) {
                one_selected_event = true;
                return item;
            }
            return null;
        });

        if ((this.props.show_events === true && !one_selected_event) ||
            (this.props.show_news === true && (this.props.news_type === "" || this.props.news_type === null)) ||
            (this.props.show_global_performances === true && (this.props.performances_type === "" || this.props.performances_type === null)) ||
            (this.props.show_ranking_discipline === true && (this.props.ranking_discipline_type === "" || this.props.ranking_discipline_type === null))) {

            this.props.displayAlert({
                alertTitle: Texts.ERREUR_TITRE.text_fr,
                alertText: Texts.ERR_REMPLIR_TOUS_CHAMPS.text_fr
            });

            return;
        }

        let selected_events_ok = true;

        if (this.props.show_events !== this.props.keep_show_events ||
            (this.props.show_news !== this.props.keep_show_news) ||
            this.props.news_type !== this.props.keep_news_type ||
            this.props.show_global_performances !== this.props.keep_show_global_performances ||
            this.props.performances_type !== this.props.keep_performances_type ||
            this.props.show_ranking_discipline !== this.props.keep_show_ranking_discipline ||
            this.props.ranking_discipline_type !== this.props.keep_ranking_discipline_type ||
            this.props.show_global_ranking !== this.props.keep_show_global_ranking ||
            this.props.show_national_production_rank !== this.props.keep_show_national_production_rank || selected_events_ok) {

            this.updateDisplayConfiguration();
        }
    }

    newsTypeSelectChange(selected) {
        if (selected)
            this.props.setNewsType(selected.value);
        else
            this.props.setNewsType("");
    }

    disciplineTypeSelectChange(selected) {
        if (selected)
            this.props.setRankingDisciplineType(selected.value);
        else
            this.props.setRankingDisciplineType("");
    }

    performancesTypeSelectChange(selected) {
        if (selected)
            this.props.setPerformancesType(selected.value);
        else
            this.props.setPerformancesType("");
    }

    selectedEventChange(id, event) {
        this.props.setSelectedEvents({
            _id: id,
            checked: event.target.checked
        });
        this.forceUpdate()
    }

    render() {

        return (
            <div>
                <Panel header={<div><Glyphicon glyph="blackboard" /> {Texts.CONFIGURATION_DE_L_AFFICHAGE.text_fr}</div>} bsStyle="primary">
                    <form>
                        <FormGroup>
                            <FormControl.Static style={{textAlign: "center", fontSize: 17}}>
                                {Texts.EXPLICATIONS_CONFIGURATION_DE_L_AFFICHAGE.text_fr.part1}
                            </FormControl.Static>
                            <FormControl.Static style={{textAlign: "center", fontSize: 17}}>
                                {Texts.EXPLICATIONS_CONFIGURATION_DE_L_AFFICHAGE.text_fr.part2}
                            </FormControl.Static>
                        </FormGroup>
                    </form>
                    <Panel>
                        <FormGroup>
                            <span style={{fontSize: 18}}>
                                <Checkbox checked={this.props.show_events} onChange={this.handleShowEventsChange.bind(this)}>
                                    {Texts.AFFICHER_LES_EVENEMENTS.text_fr}
                                    <span hidden={this.props.show_events === this.props.keep_show_events} style={{color: "red", fontSize: 14}}> {"( " + Texts.MODIFIE.text_fr + " )"}</span>
                                </Checkbox>
                            </span>
                            <Panel hidden={!this.props.show_events}>
                                <ListGroup>
                                    {
                                        this.props.events && this.props.events.map((item) => (
                                            <ListGroupItem key={item._id}>
                                                <Checkbox checked={item.selected} onChange={this.selectedEventChange.bind(this, item._id)}> {item.title + " ( " + Dates.formatDateOnly(item.start_date) + " - " + Dates.formatDateOnly(item.end_date) + ")"} </Checkbox>
                                            </ListGroupItem>
                                        ))
                                    }
                                </ListGroup>
                            </Panel>
                        </FormGroup>

                        <FormGroup>
                            <span style={{fontSize: 18}}>
                                <Checkbox checked={this.props.show_news} onChange={this.handleShowNewsChange.bind(this)}>
                                    {Texts.AFFICHER_LES_ACTUALITES.text_fr}
                                    <span hidden={this.props.show_news === this.props.keep_show_news && this.props.news_type === this.props.keep_news_type} style={{color: "red", fontSize: 14}}> {"( " + Texts.MODIFIE.text_fr + " )"}</span>
                                </Checkbox>
                            </span>
                            <Panel hidden={!this.props.show_news}>
                                <Select
                                    clearable={false}
                                    value={this.props.news_type}
                                    placeholder={Texts.TYPE_D_ACTUALITE.text_fr}
                                    onChange={this.newsTypeSelectChange.bind(this)}
                                    options={this.props.news_type_store}
                                />
                            </Panel>
                        </FormGroup>

                        <FormGroup>
                            <span style={{fontSize: 18}}>
                                <Checkbox checked={this.props.show_global_performances} onChange={this.handleShowGlobalPerformancesChange.bind(this)}>
                                    {Texts.AFFICHER_LES_PERFORMANCES_GLOBALES.text_fr}
                                    <span hidden={this.props.show_global_performances === this.props.keep_show_global_performances && this.props.performances_type === this.props.keep_performances_type} style={{color: "red", fontSize: 14}}> {"( " + Texts.MODIFIE.text_fr + " )"}</span>
                                </Checkbox>
                            </span>
                            <Panel hidden={!this.props.show_global_performances}>
                                <Select
                                    clearable={false}
                                    value={this.props.performances_type}
                                    placeholder={Texts.TYPE_D_ACTIVITE.text_fr}
                                    onChange={this.performancesTypeSelectChange.bind(this)}
                                    options={this.props.ranking_discipline_type_store}
                                />
                            </Panel>
                        </FormGroup>

                        <FormGroup>
                            <span style={{fontSize: 18}}>
                                <Checkbox checked={this.props.show_ranking_discipline} onChange={this.handleShowRankingDisciplineChange.bind(this)}>
                                    {Texts.AFFICHER_LES_CLASSEMENTS_PAR_ACTIVITE.text_fr}
                                    <span hidden={this.props.show_ranking_discipline === this.props.keep_show_ranking_discipline && this.props.ranking_discipline_type === this.props.keep_ranking_discipline_type} style={{color: "red", fontSize: 14}}> {"( " + Texts.MODIFIE.text_fr + " )"}</span>
                                </Checkbox>
                            </span>
                            <Panel hidden={!this.props.show_ranking_discipline}>
                                <Select
                                    clearable={false}
                                    value={this.props.ranking_discipline_type}
                                    placeholder={Texts.TYPE_D_ACTIVITE.text_fr}
                                    onChange={this.disciplineTypeSelectChange.bind(this)}
                                    options={this.props.ranking_discipline_type_store}
                                />
                            </Panel>
                        </FormGroup>

                        <FormGroup>
                            <span style={{fontSize: 18}}>
                                <Checkbox checked={this.props.show_global_ranking} onChange={this.handleShowGlobalRankingChange.bind(this)}>
                                    {Texts.AFFICHER_LE_CLASSEMENT_GLOBAL.text_fr}
                                    <span hidden={this.props.show_global_ranking === this.props.keep_show_global_ranking} style={{color: "red", fontSize: 14}}> {"( " + Texts.MODIFIE.text_fr + " )"}</span>
                                </Checkbox>
                            </span>
                        </FormGroup>

                        <FormGroup>
                            <span style={{fontSize: 18}}>
                                <Checkbox checked={this.props.show_national_production_rank} onChange={this.handleShowNationalProductionRankChange.bind(this)}>
                                    {Texts.AFFICHER_LE_RANG_NATIONAL_DE_PRODUCTION.text_fr}
                                    <span hidden={this.props.show_national_production_rank === this.props.keep_show_national_production_rank} style={{color: "red", fontSize: 14}}> {"( " + Texts.MODIFIE.text_fr + " )"}</span>
                                </Checkbox>
                            </span>
                        </FormGroup>

                        <Button

                            bsStyle={"primary"}
                            onClick={this.handleSaveConfiguration.bind(this)}
                        >
                            {Texts.SAUVEGARDER.text_fr}
                        </Button>
                    </Panel>
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

        news_type_store: state.display.news_type_store,
        ranking_discipline_type_store: state.display.ranking_discipline_type_store,

        show_events: state.display.show_events,
        events: state.events.initial_events,
        selected_events: state.display.selected_events,
        show_news: state.display.show_news,
        news_type: state.display.news_type,
        show_global_performances: state.display.show_global_performances,
        performances_type: state.display.performances_type,
        show_ranking_discipline: state.display.show_ranking_discipline,
        ranking_discipline_type: state.display.ranking_discipline_type,
        show_global_ranking: state.display.show_global_ranking,
        show_national_production_rank: state.display.show_national_production_rank,

        has_changed: state.display.has_changed,

        keep_show_events: state.display.keep_show_events,
        keep_events: state.display.keep_events,
        keep_selected_events: state.display.keep_selected_events,
        keep_show_news: state.display.keep_show_news,
        keep_news_type: state.display.keep_news_type,
        keep_show_global_performances: state.display.keep_show_global_performances,
        keep_performances_type: state.display.keep_performances_type,
        keep_show_ranking_discipline: state.display.keep_show_ranking_discipline,
        keep_ranking_discipline_type: state.display.keep_ranking_discipline_type,
        keep_show_global_ranking: state.display.keep_show_global_ranking,
        keep_show_national_production_rank: state.display.keep_show_national_production_rank,

        //Global

        showAlert: state.global.showAlert,
        alertTitle: state.global.alertTitle,
        alertText: state.global.alertText,

        display_configuration_is_load: state.global.display_configuration_is_load,
        events_is_load: state.global.events_is_load
    };
}

export default connect(mapStateToProps, {
    displayAlert,
    dismissAlert,
    setDisplayConfiguration,
    setUpdateKeepDisplayConfiguration,
    setEvents,
    setInitialEvents,
    setSelectedEvents,
    setShowEvents,
    setKeepEvents,
    setShowNews,
    setNewsType,
    setShowGlobalPerformances,
    setPerformancesType,
    setShowRankingDiscipline,
    setRankingDisciplineType,
    setShowGlobalRanking,
    setShowNationalProductionRank,

    //global
    setDisplayConfigurationIsLoad,
    setEventsIsLoad

})(Display);