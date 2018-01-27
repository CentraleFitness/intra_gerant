import React from 'react';
import { Panel, Glyphicon } from 'react-bootstrap';

import Texts from "../utils/Texts";

class Home extends React.Component {
    render() {
        return (
            <Panel header={<div><Glyphicon glyph="home" /> {Texts.ACCUEIL.text_fr}</div>} bsStyle="primary">
                {Texts.ACCUEIL.text_fr}
            </Panel>
        );
    }
}

export default Home;