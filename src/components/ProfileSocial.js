import React from 'react';
import {
    Panel,
    Col,
    Image,
    ControlLabel,
    FormGroup,
    FormControl,
    Glyphicon,
    Button,
    Well
} from 'react-bootstrap';
import { connect } from 'react-redux';

import {
    setCurrentPublication,
    setPublications,
    addPublication,
    displayAlert
} from "../actions/profileActions";

import Dates from "../utils/Dates";
import Texts from "../utils/Texts";
import Fields from "../utils/Fields";
import Communication from "../utils/Communication";
import Paths from "../utils/Paths";
import Status from "../utils/Status";
import Validator from "../utils/Validator";

import '../styles/ProfileSocial.css';
import '../styles/Profile.css';

class ProfileSocial extends React.Component {

    componentWillMount() {
        this.getPublications();
    }

    getPublications() {
        let params = {};

        params[Fields.TOKEN] = localStorage.getItem("token");

        let me = this;

        let communication = new Communication('post', Paths.HOST + Paths.CENTER_GET_PUBLICATIONS, params);
        communication.sendRequest(
            function (response) {
                if (response.status === 200) {
                    if (response.data.code === Status.GENERIC_OK.code) {

                        me.props.setPublications(response.data.publications.reverse());

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

    onPublishClick() {

        if (!Validator.description(this.props.current_publication))
            return;

        this.addPublication();
    }

    addPublication() {
        let params = {};

        params[Fields.TOKEN] = localStorage.getItem("token");
        params[Fields.TEXT] = this.props.current_publication;

        let me = this;

        let communication = new Communication('post', Paths.HOST + Paths.CENTER_ADD_PUBLICATION, params);
        communication.sendRequest(
            function (response) {
                if (response.status === 200) {
                    if (response.data.code === Status.GENERIC_OK.code) {

                        let now = new Date();
                        me.props.addPublication({
                            text: me.props.current_publication,
                            creation_date: now.getTime()
                        });
                        me.props.setCurrentPublication("");

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

    handleCurrentCommentChange(event) {
        this.props.setCurrentPublication(event.target.value);
    }

    render() {

        return (
            <Panel>
                <Panel>
                    <Col sm={2}>
                        <Image
                            src={(this.props.center_picture === "" ? "/img/store.svg" : this.props.center_picture)}
                            rounded
                            responsive={true}
                            thumbnail={true}
                            className={"center-block profileImage"}
                        />
                    </Col>
                    <Col sm={3}>
                        <FormGroup>
                            <ControlLabel>{this.props.center_name}</ControlLabel>
                            <FormControl.Static>
                                {this.props.manager_email}
                            </FormControl.Static>
                            <FormControl.Static>
                                <Glyphicon glyph="heart" /> <strong>{this.props.center_nb_subscribers}</strong> Abonnés
                            </FormControl.Static>
                            <FormControl.Static>
                                <Glyphicon glyph="star" /> <strong>{this.props.center_nb_followers}</strong> Suivent
                            </FormControl.Static>
                        </FormGroup>
                    </Col>
                    <Col sm={7}>
                        <FormControl.Static>
                            {this.props.center_description}
                        </FormControl.Static>
                    </Col>
                </Panel>
                <Panel>
                    <FormControl
                        componentClass="textarea"
                        placeholder={Texts.PUBLIER_QQCHOSE.text_fr}
                        value={this.props.current_publication}
                        onChange={ this.handleCurrentCommentChange.bind(this) }
                    />
                    <Col sm={10}>

                    </Col>
                    <Col sm={2}>
                        <Button
                            block
                            bsStyle="primary"
                            className={"submitButton"}
                            onClick={this.onPublishClick.bind(this)}
                        >
                            <Glyphicon glyph="ok" /> {Texts.PUBLIER.text_fr}
                        </Button>
                    </Col>
                </Panel>
                <Panel className={"commentsZone"}>
                    {
                        this.props.publications.map((item) => (
                            <div key={item.creation_date}>
                                <em>{Dates.format(item.creation_date)}</em>
                                <Well>{item.text}</Well>
                            </div>
                        ))
                    }
                </Panel>
            </Panel>
        );
    }
}

function mapStateToProps(state) {
    return {
        manager_email: state.profile.manager_email,
        center_name: state.profile.center_name,
        center_description: state.profile.center_description,
        center_nb_subscribers: state.profile.center_nb_subscribers,
        center_nb_followers: state.profile.center_nb_followers,
        publications: state.profile.publications,
        current_publication: state.profile.current_publication,
        center_picture: state.profile.center_picture
    };
}

export default connect(mapStateToProps, {
    setCurrentPublication,
    setPublications,
    addPublication,
    displayAlert
})(ProfileSocial);