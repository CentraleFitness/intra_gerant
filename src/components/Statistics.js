import React from 'react';
import {
    Panel,
    Glyphicon,
    Grid,
    Row,
    Col,
    Thumbnail
} from 'react-bootstrap';

import Texts from "../utils/Texts";

import '../styles/Statistics.css';

class Statistics extends React.Component {
    constructor(props) {
        super(props);
        let data = {
            labels: ["January", "February", "March", "April", "May", "June", "July"],
            datasets: [
                {
                    label: "My First dataset",
                    fillColor: "rgba(220,220,220,0.2)",
                    strokeColor: "rgba(220,220,220,1)",
                    pointColor: "rgba(220,220,220,1)",
                    pointStrokeColor: "#fff",
                    pointHighlightFill: "#fff",
                    pointHighlightStroke: "rgba(220,220,220,1)",
                    data: [65, 59, 80, 81, 56, 55, 40]
                },
                {
                    label: "My Second dataset",
                    fillColor: "rgba(151,187,205,0.2)",
                    strokeColor: "rgba(151,187,205,1)",
                    pointColor: "rgba(151,187,205,1)",
                    pointStrokeColor: "#fff",
                    pointHighlightFill: "#fff",
                    pointHighlightStroke: "rgba(151,187,205,1)",
                    data: [28, 48, 40, 19, 86, 27, 90]
                }
            ]
        };

        this.state = {
            data: data,
            options: {}
        };
    }

    render() {
        return (
            <Panel header={<div><Glyphicon glyph="stats" /> {Texts.STATISTIQUES_SALLE.text_fr}</div>} bsStyle="primary">
                <div>

                </div>
            </Panel>
        );
    }
}

export default Statistics;