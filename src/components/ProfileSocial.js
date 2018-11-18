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
    Modal
} from 'react-bootstrap';
import { connect } from 'react-redux';
import {browserHistory} from 'react-router';

import {
    setCurrentPublication,
    setPublications,
    setPublicationLikedByMe,
    addPublication,
    deletePublication,
    displayPublicationDeleteConfirm,
    dismissPublicationDeleteConfirm
} from "../actions/profileActions";

import {
    displayAlert,
    dismissAlert,
    setPublicationsIsLoad
} from "../actions/globalActions";

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

    constructor(props) {
        super(props);
        this.state = {
            showPostModal: false,
            publication: {},
            showCommentArea: false,
            current_comment: ""
        };
    }

    componentWillMount() {
        if (this.props.publications_is_load === false) {
            this.getPublications();
        }
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

                        if (me !== undefined)
                            me.props.setPublications(response.data.publications.reverse());
                        if (me !== undefined)
                            me.props.setPublicationsIsLoad();

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

    onPublishClick() {

        if (!Validator.description(this.props.current_publication)) {
            return;
        }

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
                            _id: response.data.publication_id,
                            content: me.props.current_publication,
                            date: now.getTime(),
                            comments: [],
                            nb_comments: 0,
                            nb_likes: 0,
                            isMine: true,
                            is_center: true,
                            type: "PUBLICATION",
                            posterName: response.data.posterName,
                            posterPicture: response.data.posterPicture
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

    deletePublication() {

        let params = {};

        params[Fields.TOKEN] = localStorage.getItem("token");
        params[Fields.PUBLICATION_ID] = this.props.delete_publication_id;

        let me = this;

        let communication = new Communication('post', Paths.HOST + Paths.CENTER_DELETE_PUBLICATION, params);
        communication.sendRequest(
            function (response) {
                if (response.status === 200) {
                    if (response.data.code === Status.GENERIC_OK.code) {

                        me.props.deletePublication(me.props.delete_publication_id);
                        me.handleDeletePublicationConfirmDismiss();

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

    handleCurrentCommentChange(event) {
        this.props.setCurrentPublication(event.target.value);
    }

    onPublicationDelete(item) {
        this.props.displayPublicationDeleteConfirm(item._id);
    }

    handleDeletePublicationConfirmDismiss() {
        this.props.dismissPublicationDeleteConfirm();
    }

    confirmPublicationDelete() {
        this.deletePublication();
    }

    handleShowPostDisplay(item, isComment = false) {
        this.setState({
            showPostModal: true,
            publication: item,
            showCommentArea: isComment === true,
            current_comment: ""
        });
    }

    handleShowPostDismiss() {
        this.setState({
            showPostModal: false,
            publication: {},
            showCommentArea: false,
            current_comment: ""
        });
    }

    handleModalCurrentCommentChange(event) {
        this.setState({
            current_comment: event.target.value
        });
    }

    onCommentClick() {
        this.setState({
            showCommentArea: false,
            current_comment: ""
        });
    }

    handleShowCommentArea() {
        this.setState({
            showCommentArea: this.state.showCommentArea === false
        });
    }

    handleLikeClick(item) {
        this.props.setPublicationLikedByMe(item);
    }

    displayPost(item, isPost = true, isModal = false) {

        return (
            <div key={item._id}>

                {
                    (this.props.updatePublications === true || this.props.updatePublications === false) &&

                    <div className={"showNewLine " + (isPost === true ? "post" : "post-comment")}>

                        <h5>
                            <Image
                                className={"post-image"}
                                src={
                                    (item.is_center === true ?
                                        (item.posterPicture === "" ? "/img/store.svg" : item.posterPicture)
                                        :
                                        (item.posterPicture === "" ? "/img/user.svg" : item.posterPicture))

                                }
                            />
                            &nbsp;{item.posterName} <em>{" ( " + Dates.format(item.date) + " ) "}</em>
                        </h5>

                        {
                            item.type === "EVENT" &&

                            <div>
                                <h4>{Texts.EVENEMENT.text_fr + " : " + item.title}</h4>
                                <h5>{Dates.formatDateOnly(item.start_date) + " - " + Dates.formatDateOnly(item.end_date)}</h5>
                            </div>
                        }
                        {
                            item.type === "PHOTO" &&

                            <h4>{item.title}</h4>
                        }

                        <p>{item.content}</p>

                        {
                            (item.type === "PHOTO" ||
                                item.type === "EVENT") &&

                            <div>
                                <Image
                                    alt={item.title}
                                    src={item.picture}
                                    className={"profileImage"}
                                />
                            </div>
                        }

                        <div>

                            <div style={{textAlign: "center", fontSize: "16px", verticalAlign: "text-top"}}>

                                {
                                    isPost === true &&

                                    <div>
                                    <span>
                                        <Glyphicon glyph="heart"/>
                                        &nbsp;
                                        {item.nb_likes}
                                        &nbsp;
                                        &nbsp;
                                    </span>
                                        {
                                            isModal === true ?

                                                <span>
                                            <Glyphicon glyph="comment"/>
                                                    &nbsp;
                                                    {item.nb_comments}
                                                    &nbsp;
                                        </span>

                                                :

                                                <a className={"post-button"} onClick={this.handleShowPostDisplay.bind(this, item)}>
                                            <span>
                                                <Glyphicon glyph="comment"/>
                                                &nbsp;
                                                {item.nb_comments}
                                                &nbsp;
                                            </span>
                                                </a>
                                        }

                                    </div>
                                }
                                {
                                    isPost === true &&

                                    <a className={"post-button"} onClick={this.handleLikeClick.bind(this, item)}>
                                        {
                                            item.likedByMe === true ?

                                                <span>
                                                <Glyphicon glyph="heart"/>
                                                    &nbsp;
                                                    {Texts.JE_NAIME_PAS.text_fr}
                                            </span>

                                                :

                                                <span>
                                                <Glyphicon glyph="heart-empty"/>
                                                    &nbsp;
                                                    {Texts.JAIME.text_fr}
                                            </span>
                                        }
                                    </a>
                                }
                                &nbsp;
                                &nbsp;
                                {
                                    isPost === true &&

                                    <a className={"post-button"} onClick={
                                        isModal === true ? this.handleShowCommentArea.bind(this) : this.handleShowPostDisplay.bind(this, item, true)
                                    }>
                                    <span style={{verticalAlign: "text-top"}}>
                                    <Glyphicon glyph="comment"/>
                                        &nbsp;
                                        {Texts.COMMENTER.text_fr}
                                    </span>
                                    </a>
                                }
                                &nbsp;
                                &nbsp;
                                {
                                    item.isMine === true &&

                                    <a
                                        onClick={this.onPublicationDelete.bind(this, item)}
                                        className={"post-button cross-background"}
                                    >

                                    <span style={{verticalAlign: "text-top"}}>
                                        <Glyphicon glyph="remove"/>
                                        &nbsp;
                                        {Texts.SUPPRIMER.text_fr}
                                    </span>
                                    </a>
                                }
                            </div>
                        </div>
                    </div>
                }
            </div>
        );
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
                                <Glyphicon glyph="heart" /> <strong>{this.props.center_nb_subscribers}</strong>{" " + Texts.ABONNE.text_fr + (this.props.center_nb_subscribers <= 1 ? "" : "s")}
                            </FormControl.Static>
                            <FormControl.Static>
                                <Glyphicon glyph="star" /> <strong>{this.props.center_nb_followers}</strong>{" " + (this.props.center_nb_subscribers <= 1 ? Texts.SUIT.text_fr : Texts.SUIVENT.text_fr)}
                            </FormControl.Static>
                        </FormGroup>
                    </Col>
                    <Col sm={7}>
                        <FormControl.Static className={"showNewLine"}>
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
                            <Glyphicon glyph="send" /> {Texts.PUBLIER.text_fr}
                        </Button>
                    </Col>
                </Panel>
                <Panel className={"commentsZone"}>
                    {
                        this.props.publications.map((item) => (
                            this.displayPost(item)
                        ))
                    }
                </Panel>

                <Modal backdrop={"static"} show={this.state.showPostModal} bsSize={"large"} onHide={this.handleShowPostDismiss.bind(this)} autoFocus={true}>
                    <Modal.Header closeButton>
                        <Modal.Title>{Texts.PUBLICATION_DE.text_fr + " " + this.state.publication.posterName}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Panel>
                        {
                            this.displayPost(this.state.publication, true, true)
                        }
                            <Panel>
                                <Panel hidden={this.state.showCommentArea === false}>
                                    <FormControl
                                        componentClass="textarea"
                                        placeholder={Texts.COMMENTER.text_fr + " ..."}
                                        value={this.state.current_comment}
                                        onChange={ this.handleModalCurrentCommentChange.bind(this) }
                                    />
                                    <Col sm={10}>

                                    </Col>
                                    <Col sm={2}>
                                        <Button
                                            block
                                            bsStyle="primary"
                                            className={"submitButton"}
                                            onClick={this.onCommentClick.bind(this)}
                                        >
                                            <Glyphicon glyph="send" /> {Texts.COMMENTER.text_fr}
                                        </Button>
                                    </Col>
                                </Panel>
                            {
                                this.state.publication.comments !== undefined &&

                                this.state.publication.comments.map((item) => (
                                    this.displayPost(item, false, true)
                                ))
                            }
                            </Panel>
                        </Panel>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.handleShowPostDismiss.bind(this)}>
                            <Glyphicon glyph="remove" /> {Texts.FERMER.text_fr}
                        </Button>
                    </Modal.Footer>
                </Modal>

                <Modal show={this.props.showDeletePublicationConfirm} bsSize={"small"} onHide={this.handleDeletePublicationConfirmDismiss.bind(this)}>
                    <Modal.Header closeButton>
                        <Modal.Title>{Texts.SUPPRIMER_UNE_PUBLICATION.text_fr}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <FormControl.Static>
                            {Texts.ETES_VOUS_SUR_DE_VOULOIR_SUPPRIMER_CETTE_PUBLICATION.text_fr}
                        </FormControl.Static>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.handleDeletePublicationConfirmDismiss.bind(this)}>
                            <Glyphicon glyph="remove" /> {Texts.FERMER.text_fr}
                        </Button>
                        <Button onClick={this.confirmPublicationDelete.bind(this)}>
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
        manager_email: state.profile.manager_email,
        center_name: state.profile.center_name,
        center_description: state.profile.center_description,
        center_nb_subscribers: state.profile.center_nb_subscribers,
        center_nb_followers: state.profile.center_nb_followers,

        publications: state.profile.publications,
        updatePublications: state.profile.updatePublications,
        current_publication: state.profile.current_publication,
        center_picture: state.profile.center_picture,

        showDeletePublicationConfirm: state.profile.showDeletePublicationConfirm,
        delete_publication_id: state.profile.delete_publication_id,

        showAlert: state.global.showAlert,
        alertTitle: state.global.alertTitle,
        alertText: state.global.alertText,

        publications_is_load: state.global.publications_is_load
    };
}

export default connect(mapStateToProps, {
    displayAlert,
    dismissAlert,

    setCurrentPublication,
    setPublicationLikedByMe,
    setPublications,
    addPublication,
    deletePublication,
    displayPublicationDeleteConfirm,
    dismissPublicationDeleteConfirm,

    setPublicationsIsLoad
})(ProfileSocial);