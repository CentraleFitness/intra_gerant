import React from 'react';
import {
    Grid,
    Row,
    Col
} from 'react-bootstrap';

import Menu from './Menu'
import TopBar from "./TopBar";

import "../styles/Dashboard.css"

class Dashboard extends React.Component {

    render() {
        return (
            <Grid fluid={true}>
                <Row>
                    <Col xs={12} sm={12} md={12} lg={12}>
                        <TopBar/>
                    </Col>
                </Row>
                <Row>
                    <Col xs={2} sm={2} md={2} lg={2}>
                        <Menu/>
                    </Col>
                    <Col xs={10} sm={10} md={10} lg={10}>
                        {this.props.children}
                    </Col>
                </Row>
            </Grid>
        );
    }
}

export default Dashboard;