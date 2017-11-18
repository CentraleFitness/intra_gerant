import React from 'react';
import {LinkContainer} from 'react-router-bootstrap';
import {Panel, Nav, NavItem, Glyphicon } from 'react-bootstrap';

import "../styles/Menu.css"

class Menu extends React.Component {

    render() {
        return (
            <Panel>
                <Nav bsStyle="pills" stacked activeKey={1}>
                    <LinkContainer to={"/home"}>
                        <NavItem eventKey={1}><Glyphicon glyph="home" />&nbsp;&nbsp;Accueil</NavItem>
                    </LinkContainer>
                    <LinkContainer to={"/profile"}>
                        <NavItem eventKey={1}><Glyphicon glyph="user" />&nbsp;&nbsp;Profil</NavItem>
                    </LinkContainer>
                    <LinkContainer to={"/statistics"}>
                        <NavItem eventKey={1}><Glyphicon glyph="stats" />&nbsp;&nbsp;Statistiques</NavItem>
                    </LinkContainer>
                </Nav>
            </Panel>
        );
    }
}

export default Menu;