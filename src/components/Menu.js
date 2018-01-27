import React from 'react';
import {LinkContainer} from 'react-router-bootstrap';
import {Panel, Nav, NavItem, Glyphicon } from 'react-bootstrap';

import Texts from "../utils/Texts";

import "../styles/Menu.css"

class Menu extends React.Component {

    render() {
        return (
            <Panel className={"menu"}>
                <Nav bsStyle="pills" stacked activeKey={1}>
                    <LinkContainer to={"/home"}>
                        <NavItem eventKey={1}><Glyphicon glyph="home" />&nbsp;&nbsp;{Texts.ACCUEIL.text_fr}</NavItem>
                    </LinkContainer>
                    <LinkContainer to={"/profile"}>
                        <NavItem eventKey={1}><Glyphicon glyph="user" />&nbsp;&nbsp;{Texts.PROFIL.text_fr}</NavItem>
                    </LinkContainer>
                    <LinkContainer to={"/statistics"}>
                        <NavItem eventKey={1}><Glyphicon glyph="stats" />&nbsp;&nbsp;{Texts.STATISTIQUES.text_fr}</NavItem>
                    </LinkContainer>
                </Nav>
            </Panel>
        );
    }
}

export default Menu;