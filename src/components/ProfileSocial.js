import React from 'react';
import {
    Panel,
    Col,
    Image,
    ControlLabel,
    FormGroup,
    FormControl
} from 'react-bootstrap';

class ProfileSocial extends React.Component {

    render() {

        return (
            <Panel>
                <Panel>
                    <Col sm={2}>
                        <Image src={"/img/store.png"} rounded responsive={true} thumbnail={true}/>
                    </Col>
                    <Col sm={8}>
                        <FormGroup>
                            <ControlLabel>Static text</ControlLabel>
                            <FormControl.Static>
                                email@example.com
                            </FormControl.Static>
                        </FormGroup>
                    </Col>
                </Panel>
            </Panel>
        );
    }
}

export default ProfileSocial;