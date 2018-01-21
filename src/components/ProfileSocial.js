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

import '../styles/ProfileSocial.css';

class ProfileSocial extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            comments: []
        };
        //Surement temporaire
        this.commentCpt = 0;
    }

    onPublishClick() {

        if (this.currentCommentRef.value.length <= 0)
            return;

        let comments = this.state.comments;
        let today = new Date();
        let dd = today.getDate();
        let mm = today.getMonth() + 1;
        let yyyy = today.getFullYear();
        let hh = today.getHours();
        let mn = today.getMinutes();
        let ss = today.getSeconds();

        comments.unshift(
            {
                id: this.commentCpt++,
                text: this.currentCommentRef.value,
                author: "You",
                time: (dd > 9 ? dd : ('0' + dd)) + "/" +
                        (mm > 9 ? mm : ('0' + mm)) + "/" +
                        yyyy + " " +
                        (hh > 9 ? hh : ('0' + hh)) + ":" +
                        (mn > 9 ? mn : ('0' + mn)) + ":" +
                        (ss > 9 ? ss : ('0' + ss))
            }
        );
        this.setState({
            comments: comments
        });
        this.currentCommentRef.value = "";
    }

    handleCurrentCommentChange(event) {
        this.setState({
            currentComment: (event.target.value)
        });
    }

    render() {

        return (
            <Panel>
                <Panel>
                    <Col sm={2}>
                        <Image src={"/img/store.png"} rounded responsive={true} thumbnail={true}/>
                    </Col>
                    <Col sm={3}>
                        <FormGroup>
                            <ControlLabel>{this.props.club_name}</ControlLabel>
                            <FormControl.Static>
                                {this.props.manager_email}
                            </FormControl.Static>
                            <FormControl.Static>
                                <Glyphicon glyph="heart" /> <strong>{this.props.club_nb_subscribers}</strong> Abonnés
                            </FormControl.Static>
                            <FormControl.Static>
                                <Glyphicon glyph="star" /> <strong>{this.props.club_nb_followers}</strong> Suivent
                            </FormControl.Static>
                        </FormGroup>
                    </Col>
                    <Col sm={7}>
                        <FormControl.Static>
                            {this.props.club_description}
                        </FormControl.Static>
                    </Col>
                </Panel>
                <Panel>
                    <FormControl
                        componentClass="textarea"
                        placeholder="Publier quelque chose ..."
                        onBlur={ this.handleCurrentCommentChange.bind(this) }
                        inputRef={ref => this.currentCommentRef = ref}
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
                            <Glyphicon glyph="ok" /> Publier
                        </Button>
                    </Col>
                </Panel>
                <Panel className={"commentsZone"}>
                    {
                        this.state.comments.map((item) => (
                            <div key={item.id}>
                                <em>{item.author} - {item.time}</em>
                                <Well>{item.text}</Well>
                            </div>
                        ))
                    }
                </Panel>
            </Panel>
        );
    }
}

export default ProfileSocial;