import React from 'react';
import {LinkContainer} from 'react-router-bootstrap';
import { connect } from 'react-redux';

import {
    Panel,
    Nav,
    NavItem,
    Glyphicon,
    Col
} from 'react-bootstrap';

import Texts from "../utils/Texts";

import "../styles/Menu.css"

class Menu extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            active_key: "home"
        }
    }

    handleSelect(key) {
        this.setState({
            active_key: key
        })
    }

    render() {
        return (
            <Col xs={0} sm={0} md={0} lg={0}>
                <Panel className={"menu"}>
                    <Nav bsStyle="pills" stacked activeKey={this.state.active_key} onSelect={this.handleSelect.bind(this)}>
                        <LinkContainer to={"/home"}>
                            <NavItem eventKey={"home"}>
                                <Glyphicon glyph="home" />&nbsp;&nbsp;{Texts.ACCUEIL.text_fr}
                            </NavItem>
                        </LinkContainer>

                        <LinkContainer to={"/subscription"}>
                            <NavItem eventKey={"subscription"}>
                                <Glyphicon glyph="qrcode" />&nbsp;&nbsp;{Texts.AFFILIATION.text_fr}
                            </NavItem>
                        </LinkContainer>

                        <LinkContainer to={"/profile"}>
                            <NavItem eventKey={"profile"}>
                                <Glyphicon glyph="user" />&nbsp;&nbsp;{Texts.PROFIL.text_fr}
                            </NavItem>
                        </LinkContainer>
                        <LinkContainer to={"/statistics"}>
                            <NavItem eventKey={"statistics"}>
                                <Glyphicon glyph="stats" />&nbsp;&nbsp;{Texts.STATISTIQUES.text_fr}
                            </NavItem>
                        </LinkContainer>
                        <LinkContainer to={"/events"}>
                            <NavItem eventKey={"events"}>
                                <Glyphicon glyph="calendar" />&nbsp;&nbsp;{Texts.EVENEMENTS.text_fr}
                            </NavItem>
                        </LinkContainer>
                        <LinkContainer to={"/customprograms"}>
                            <NavItem eventKey={"customprograms"}>
                                <Glyphicon glyph="time" />&nbsp;&nbsp;{Texts.PROGRAMMES.text_fr}
                            </NavItem>
                        </LinkContainer>
                        <LinkContainer to={"/display"}>
                            <NavItem eventKey={"display"}>
                                <Glyphicon glyph="blackboard" />&nbsp;&nbsp;{Texts.AFFICHAGE.text_fr}
                            </NavItem>
                        </LinkContainer>
                        <LinkContainer to={"/equipment"}>
                            <NavItem eventKey={"equipment"}>
                                <Glyphicon glyph="list" />&nbsp;&nbsp;{Texts.EQUIPEMENTS.text_fr}
                            </NavItem>
                        </LinkContainer>
                        <LinkContainer to={"/contact"}>
                            <NavItem eventKey={"contact"}>
                                <Glyphicon glyph="envelope" />&nbsp;&nbsp;{Texts.CONTACT.text_fr}
                            </NavItem>
                        </LinkContainer>
                        {
                            this.props.is_principal === true &&

                            <LinkContainer to={"/validation"}>
                                <NavItem eventKey={"validation"}>
                                    <Glyphicon glyph="ok" />&nbsp;&nbsp;{Texts.VALIDATION.text_fr}
                                </NavItem>
                            </LinkContainer>
                        }
                    </Nav>
                </Panel>
            </Col>
        );
    }
}

function mapStateToProps(state) {
    return {
        is_principal: state.global.is_principal
    };
}

export default connect(mapStateToProps, {

})(Menu);