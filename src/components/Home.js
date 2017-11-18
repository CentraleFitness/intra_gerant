import React from 'react';
import { Panel, Glyphicon } from 'react-bootstrap';

class Home extends React.Component {
    render() {
        return (
            <Panel header={<div><Glyphicon glyph="home" /> Acceuil</div>} bsStyle="primary">
                Home
            </Panel>
        );
    }
}

export default Home;