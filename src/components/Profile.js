import React from 'react';
import {
    Tabs,
    Tab,
    Modal,
    FormControl,
    Button
} from 'react-bootstrap';

import ProfileSocial from "./ProfileSocial";
import ProfilePhotos from "./ProfilePhotos";
import ProfileInfo from "./ProfileInfo";

import Communication from "../utils/Communication";
import Paths from '../utils/Paths';
import Fields from '../utils/Fields';
import Status from '../utils/Status';
import Texts from '../utils/Texts';

class Profile extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            manager_first_name: "",
            manager_last_name: "",
            manager_email: "",
            manager_phone: "",
            club_name: "",
            club_address: "",
            club_address2: "",
            club_zip_code: "",
            club_city: "",
            club_phone: "",
            club_description: "",
            club_nb_subscribers: "",
            club_nb_followers: "",
            showAlert: false,
            alertTitle: "",
            alertText: ""
        };
    }

    componentWillMount() {
        this.getManagerProfile();
        this.getCenterProfile();
    }

    getManagerProfile() {
        let params = {};

        params[Fields.TOKEN] = localStorage.getItem("token");

        let me = this;

        let communication = new Communication('post', Paths.HOST + Paths.MANAGER_GET_PROFILE, params);
        communication.sendRequest(
            function (response) {
                if (response.status === 200) {
                    if (response.data.code === Status.GENERIC_OK.code) {

                        me.setState({
                            manager_first_name: response.data[Fields.FIRSTNAME],
                            manager_last_name: response.data[Fields.LASTNAME],
                            manager_email: response.data[Fields.EMAIL],
                            manager_phone: response.data[Fields.PHONE]
                        });

                    } else {

                        let message = "";
                        for (let key in Status) {
                            if (Status[key].code === response.data.code) {
                                message = Status[key].message_fr;
                                break;
                            }
                        }

                        me.setState({
                            showAlert: true,
                            alertTitle: Texts.ERREUR_TITRE.text_fr,
                            alertText: message
                        });
                    }
                } else {
                    me.setState({
                        showAlert: true,
                        alertTitle: Texts.ERREUR_TITRE.text_fr,
                        alertText: Texts.ERR_RESEAU.text_fr
                    });
                }
            },
            function (error) {
                me.setState({
                    showAlert: true,
                    alertTitle: Texts.ERREUR_TITRE.text_fr,
                    alertText: Texts.ERR_RESEAU.text_fr
                });
            }
        );
    }

    getCenterProfile() {
        let params = {};

        params[Fields.TOKEN] = localStorage.getItem("token");

        let me = this;

        let communication = new Communication('post', Paths.HOST + Paths.CENTER_GET_PROFILE, params);
        communication.sendRequest(
            function (response) {
                if (response.status === 200) {
                    if (response.data.code === Status.GENERIC_OK.code) {

                        me.setState({
                            club_name: response.data[Fields.NAME],
                            club_address: response.data[Fields.ADDRESS],
                            club_address2: response.data[Fields.ADDRESS_SECOND],
                            club_zip_code: response.data[Fields.ZIP_CODE],
                            club_city: response.data[Fields.CITY],
                            club_phone: response.data[Fields.PHONE],
                            club_description: response.data[Fields.DESCRIPTION]
                        });

                    } else {

                        let message = "";
                        for (let key in Status) {
                            if (Status[key].code === response.data.code) {
                                message = Status[key].message_fr;
                                break;
                            }
                        }

                        me.setState({
                            showAlert: true,
                            alertTitle: Texts.ERREUR_TITRE.text_fr,
                            alertText: message
                        });
                    }
                } else {
                    me.setState({
                        showAlert: true,
                        alertTitle: Texts.ERREUR_TITRE.text_fr,
                        alertText: Texts.ERR_RESEAU.text_fr
                    });
                }
            },
            function (error) {
                me.setState({
                    showAlert: true,
                    alertTitle: Texts.ERREUR_TITRE.text_fr,
                    alertText: Texts.ERR_RESEAU.text_fr
                });
            }
        );
    }

    handleAlertDismiss() {
        this.setState({
            showAlert: false,
            alertTitle: "",
            alertText: ""
        });
    }

    render() {

        return (
            <div>

                <Tabs defaultActiveKey={1} id={"profileTabs"}>
                    <Tab eventKey={1} title={Texts.SOCIAL_TITRE.text_fr}>
                        <ProfileSocial
                            manager_email={this.state.manager_email}
                            club_name={this.state.club_name}
                            club_nb_subscribers={this.state.club_nb_subscribers}
                            club_nb_followers={this.state.club_nb_followers}
                            club_description={this.state.club_description}
                        />
                    </Tab>
                    <Tab eventKey={2} title={Texts.PHOTOS_TITRE.text_fr}>
                        <ProfilePhotos/>
                    </Tab>
                    <Tab eventKey={3} title={Texts.INFOS_TITRE.text_fr}>
                        <ProfileInfo
                            manager_first_name={this.state.manager_first_name}
                            manager_last_name={this.state.manager_last_name}
                            manager_email={this.state.manager_email}
                            manager_phone={this.state.manager_phone}
                            club_name={this.state.club_name}
                            club_address={this.state.club_address}
                            club_address2={this.state.club_address2}
                            club_zip_code={this.state.club_zip_code}
                            club_city={this.state.club_city}
                            club_phone={this.state.club_phone}
                            club_description={this.state.club_description}
                        />
                    </Tab>
                </Tabs>

                <Modal show={this.state.showAlert} bsSize={"small"}>
                    <Modal.Header closeButton onHide={this.handleAlertDismiss.bind(this)}>
                        <Modal.Title>{this.state.alertTitle}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <FormControl.Static>
                            {this.state.alertText}
                        </FormControl.Static>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.handleAlertDismiss.bind(this)}>Close</Button>
                    </Modal.Footer>
                </Modal>

            </div>
        );
    }
}

export default Profile;