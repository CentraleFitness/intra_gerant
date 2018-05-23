import React from 'react';
import {
    Tabs,
    Tab,
    Modal,
    FormControl,
    Button,
    Glyphicon
} from 'react-bootstrap';
import { connect } from 'react-redux';

import {
    displayAlert,
    dismissAlert,
    setManagerInfo,
    setCenterInfo,
    resetManagerCenterInfo,
    setManagerKeepInfo,
    setCenterKeepInfo,
    setFirstName,
    setLastName,
    setPhone,
    setEmail,
    setName,
    setDescription,
    setAddress,
    setAddressSecond,
    setZipCode,
    setCity,
    setCenterPhone,
    setCenterPicture
} from "../actions/profileActions";

import {
    setManagerProfileIsLoad,
    setCenterProfileIsLoad,
    setCenterPictureIsLoad
} from "../actions/globalActions";

import ProfileSocial from "./ProfileSocial";
import ProfilePhotos from "./ProfilePhotos";
import ProfileInfo from "./ProfileInfo";

import Communication from "../utils/Communication";
import Paths from '../utils/Paths';
import Fields from '../utils/Fields';
import Status from '../utils/Status';
import Texts from '../utils/Texts';

class Profile extends React.Component {

    componentDidMount() {
        if (this.props.manager_profile_is_load === false) {
            this.getManagerProfile();
        }
        if (this.props.center_profile_is_load === false) {
            this.getCenterProfile();
        }
        if (this.props.center_picture_is_load === false) {
            this.getCenterPicture();
        }
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

                        if (me !== undefined) {
                            me.props.setManagerInfo({
                                manager_first_name: response.data[Fields.FIRSTNAME],
                                manager_last_name: response.data[Fields.LASTNAME],
                                manager_email: response.data[Fields.EMAIL],
                                manager_phone: response.data[Fields.PHONE]
                            });
                        }

                        if (me !== undefined)
                            me.props.setManagerKeepInfo();
                        if (me !== undefined)
                            me.props.setManagerProfileIsLoad();

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

    getCenterProfile() {
        let params = {};

        params[Fields.TOKEN] = localStorage.getItem("token");

        let me = this;

        let communication = new Communication('post', Paths.HOST + Paths.CENTER_GET_PROFILE, params);
        communication.sendRequest(
            function (response) {
                if (response.status === 200) {
                    if (response.data.code === Status.GENERIC_OK.code) {

                        if (me !== undefined) {
                            me.props.setCenterInfo({
                                center_name: response.data[Fields.NAME],
                                center_address: response.data[Fields.ADDRESS],
                                center_address2: (response.data[Fields.ADDRESS_SECOND] === null ? "" : response.data[Fields.ADDRESS_SECOND]),
                                center_zip_code: response.data[Fields.ZIP_CODE],
                                center_city: response.data[Fields.CITY],
                                center_phone: (response.data[Fields.PHONE] === null ? "" : response.data[Fields.PHONE]),
                                center_description: response.data[Fields.DESCRIPTION],
                                center_nb_subscribers: response.data[Fields.NB_SUBSCRIBERS]
                            });
                        }

                        if (me !== undefined)
                            me.props.setCenterKeepInfo();
                        if (me !== undefined)
                            me.props.setCenterProfileIsLoad();

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

    getCenterPicture() {
        let params = {};

        params[Fields.TOKEN] = localStorage.getItem("token");

        let me = this;

        let communication = new Communication('post', Paths.HOST + Paths.CENTER_GET_PICTURE, params);
        communication.sendRequest(
            function (response) {
                if (response.status === 200) {
                    if (response.data.code === Status.GENERIC_OK.code) {

                        if (me !== undefined)
                            me.props.setCenterPicture(response.data[Fields.PICTURE]);
                        if (me !== undefined)
                            me.props.setCenterPictureIsLoad();

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

    handleLeaveProfileInfo() {
        this.props.resetManagerCenterInfo();
    }

    handleAlertDismiss() {
        this.props.dismissAlert();
    }

    render() {

        return (
            <div>

                <Tabs
                    defaultActiveKey={"social"}
                    id={"profileTabs"}
                >
                    <Tab.Pane eventKey={"social"} title={Texts.SOCIAL_TITRE.text_fr}>
                        <ProfileSocial />
                    </Tab.Pane>
                    <Tab.Pane eventKey={"photos"} title={Texts.PHOTOS_TITRE.text_fr}>
                        <ProfilePhotos/>
                    </Tab.Pane>
                    <Tab.Pane eventKey={"infos"} title={Texts.INFOS_TITRE.text_fr} onExit={this.handleLeaveProfileInfo.bind(this)}>
                        <ProfileInfo />
                    </Tab.Pane>
                </Tabs>

                <Modal show={this.props.showAlert} bsSize={"small"} onHide={this.handleAlertDismiss.bind(this)}>
                    <Modal.Header closeButton >
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
        manager_first_name: state.profile.manager_first_name,
        manager_last_name: state.profile.manager_last_name,
        manager_email: state.profile.manager_email,
        manager_phone: state.profile.manager_phone,
        center_name: state.profile.center_name,
        center_address: state.profile.center_address,
        center_address2: state.profile.center_address2,
        center_zip_code: state.profile.center_zip_code,
        center_city: state.profile.center_city,
        center_phone: state.profile.center_phone,
        center_description: state.profile.center_description,
        center_nb_subscribers: state.profile.center_nb_subscribers,
        center_nb_followers: state.profile.center_nb_followers,
        showAlert: state.profile.showAlert,
        alertTitle: state.profile.alertTitle,
        alertText: state.profile.alertText,

        manager_profile_is_load: state.global.manager_profile_is_load,
        center_profile_is_load: state.global.center_profile_is_load,
        center_picture_is_load: state.global.center_picture_is_load
    };
}

export default connect(mapStateToProps, {
    displayAlert,
    dismissAlert,
    setManagerInfo,
    setCenterInfo,
    setManagerKeepInfo,
    setCenterKeepInfo,
    resetManagerCenterInfo,
    setFirstName,
    setLastName,
    setPhone,
    setEmail,
    setName,
    setDescription,
    setAddress,
    setAddressSecond,
    setZipCode,
    setCity,
    setCenterPhone,
    setCenterPicture,

    setManagerProfileIsLoad,
    setCenterProfileIsLoad,
    setCenterPictureIsLoad
})(Profile);