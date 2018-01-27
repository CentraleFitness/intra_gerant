import React from 'react';
import { Panel, Glyphicon } from 'react-bootstrap';

import Texts from "../utils/Texts";

class Statistics extends React.Component {
    render() {
        return (
            <Panel header={<div><Glyphicon glyph="stats" /> {Texts.STATISTIQUES_SALLE.text_fr}</div>} bsStyle="primary">
                {Texts.STATISTIQUES.text_fr}
            </Panel>
        );
    }
}

export default Statistics;