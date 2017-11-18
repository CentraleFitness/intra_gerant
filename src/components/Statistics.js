import React from 'react';
import { Panel, Glyphicon } from 'react-bootstrap';

class Statistics extends React.Component {
    render() {
        return (
            <Panel header={<div><Glyphicon glyph="stats" /> Statistiques de la salle</div>} bsStyle="primary">
                Statistics
            </Panel>
        );
    }
}

export default Statistics;