import React from 'react';
import {
    Navbar,
    Nav,
    MenuItem,
    NavDropdown,
    Glyphicon
} from 'react-bootstrap';

import '../styles/TopBar.css';

class TopBar extends React.Component {
    render() {
        return (
            <Navbar collapseOnSelect className={"topBar"} fixedTop={true} inverse={true}>
                <Navbar.Header>
                    <Navbar.Brand>
                        <a href="/home">Centrale Fitness</a>
                    </Navbar.Brand>
                    <Navbar.Toggle />
                </Navbar.Header>
                <Navbar.Collapse>
                    <Nav pullRight>
                        <NavDropdown eventKey={3} title={<Glyphicon glyph="cog" />} id="basic-nav-dropdown">
                            <MenuItem eventKey={3.1}><Glyphicon glyph="pencil" />&nbsp;Modifier le mot de passe</MenuItem>
                            <MenuItem divider />
                            <MenuItem eventKey={3.2}><Glyphicon glyph="log-out" />&nbsp;Se déconnecter</MenuItem>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        );
    }
}

export default TopBar;