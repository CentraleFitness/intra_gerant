import React from 'react';
import {
    Grid,
    Row,
    Col,
    Thumbnail,
    Panel
} from 'react-bootstrap';

class ProfilePhotos extends React.Component {

    render() {

        return (
            <Panel>
                <Grid>
                    <Row>
                        <Col xs={6} md={3}>
                            <Thumbnail href="#" alt="171x180" src="/img/user.png" />
                        </Col>
                        <Col xs={6} md={3}>
                            <Thumbnail href="#" alt="171x180" src="/img/user.png" />
                        </Col>
                        <Col xs={6} md={3}>
                            <Thumbnail href="#" alt="171x180" src="/img/user.png" />
                        </Col>
                    </Row>
                </Grid>
            </Panel>
        );
    }
}

export default ProfilePhotos;