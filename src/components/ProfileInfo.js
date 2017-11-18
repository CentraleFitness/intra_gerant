import React from 'react';
import {
    Panel,
    Glyphicon,
    Grid,
    Row,
    Col,
    Image,
    Button,
    Form,
    FormGroup,
    FormControl,
    ControlLabel,
    Popover,
    OverlayTrigger
} from 'react-bootstrap';

class ProfileInfo extends React.Component {

    constructor(props) {
        super(props);

        console.log('tototototoot');
        console.log(props);
    }

    render() {

        const popoverPhone = (
            <Popover title="Téléphone" id={"ProfilePopoverPhone"}>
                <strong>Votre numéro de téléphone ne sera pas visible par les autres utilisateurs.</strong>
            </Popover>
        );

        return (
            <Panel>
                <Panel header={<div><Glyphicon glyph="user" /> Profil Gérant</div>} bsStyle="primary">
                    <Grid fluid={true}>
                        <Row>
                            <Col xs={9} sm={9} md={9} lg={9}>
                                <Form horizontal>
                                    <FormGroup controlId="formHorizontalText">
                                        <Col componentClass={ControlLabel} sm={2}>
                                            Prénom
                                        </Col>
                                        <Col sm={8}>
                                            <FormControl type="text" placeholder="Prénom" defaultValue={this.props.manager_first_name}/>
                                        </Col>
                                    </FormGroup>

                                    <FormGroup controlId="formHorizontalText">
                                        <Col componentClass={ControlLabel} sm={2}>
                                            Nom
                                        </Col>
                                        <Col sm={8}>
                                            <FormControl type="text" placeholder="Nom" defaultValue={this.props.manager_last_name}/>
                                        </Col>
                                    </FormGroup>

                                    <FormGroup controlId="formHorizontalEmail">
                                        <Col componentClass={ControlLabel} sm={2}>
                                            Email
                                        </Col>
                                        <Col sm={8}>
                                            <FormControl type="email" placeholder="Email" defaultValue={this.props.manager_email}/>
                                        </Col>
                                    </FormGroup>
                                    <FormGroup controlId="formHorizontalNumber">
                                        <OverlayTrigger trigger={["hover", "focus"]} placement="top" overlay={popoverPhone}>
                                            <Col componentClass={ControlLabel} sm={2}>
                                                Téléphone *
                                            </Col>
                                        </OverlayTrigger>
                                        <Col sm={8}>
                                            <FormControl type="number" placeholder="Téléphone" />
                                        </Col>
                                    </FormGroup>
                                </Form>
                            </Col>
                            <Col xs={2} sm={2} md={2} lg={2}>
                                <Image src={"/img/user.png"} circle responsive={true} thumbnail={true} className={"profileImage"}/>
                                <Button block><Glyphicon glyph="pencil" /> Modifier image</Button>
                            </Col>
                        </Row>
                    </Grid>
                </Panel>

                <Panel header={<div><Glyphicon glyph="info-sign" /> Profil de la Salle</div>} bsStyle="primary">
                    <Grid fluid={true}>
                        <Row>
                            <Col xs={9} sm={9} md={9} lg={9}>
                                <Form horizontal>
                                    <FormGroup controlId="formHorizontalText">
                                        <Col componentClass={ControlLabel} sm={2}>
                                            Nom de la salle
                                        </Col>
                                        <Col sm={8}>
                                            <FormControl type="text" placeholder="Nom de la salle" />
                                        </Col>
                                    </FormGroup>

                                    <FormGroup controlId="formHorizontalText">
                                        <Col componentClass={ControlLabel} sm={2}>
                                            Adresse
                                        </Col>
                                        <Col sm={8}>
                                            <FormControl type="text" placeholder="Adresse" />
                                        </Col>
                                    </FormGroup>

                                    <FormGroup controlId="formHorizontalText">
                                        <Col componentClass={ControlLabel} sm={2}>
                                            Adresse
                                        </Col>
                                        <Col sm={8}>
                                            <FormControl type="text" placeholder="Adresse suplémentaire" />
                                        </Col>
                                    </FormGroup>
                                    <FormGroup controlId="formHorizontalNumber">
                                        <Col componentClass={ControlLabel} sm={2}>
                                            Code postale
                                        </Col>
                                        <Col sm={8}>
                                            <FormControl type="number" placeholder="Code postale" />
                                        </Col>
                                    </FormGroup>
                                    <FormGroup controlId="formHorizontalText">
                                        <Col componentClass={ControlLabel} sm={2}>
                                            Ville
                                        </Col>
                                        <Col sm={8}>
                                            <FormControl type="number" placeholder="Ville" />
                                        </Col>
                                    </FormGroup>
                                    <FormGroup controlId="formHorizontalNumber">
                                        <Col componentClass={ControlLabel} sm={2}>
                                            Téléphone
                                        </Col>
                                        <Col sm={8}>
                                            <FormControl type="number" placeholder="Téléphone" />
                                        </Col>
                                    </FormGroup>
                                    <FormGroup controlId="formControlsTextarea">
                                        <Col componentClass={ControlLabel} sm={2}>
                                            Description
                                        </Col>
                                        <Col sm={8}>
                                            <FormControl componentClass="textarea" placeholder="Description" />
                                        </Col>
                                    </FormGroup>
                                </Form>
                            </Col>
                            <Col xs={2} sm={2} md={2} lg={2}>
                                <Image src={"/img/store.png"} rounded responsive={true} thumbnail={true}/>
                                <Button block><Glyphicon glyph="pencil" /> Modifier image</Button>
                            </Col>
                        </Row>
                    </Grid>
                </Panel>
                <Col xs={6} sm={6} md={6} lg={6}>
                    <Button block><Glyphicon glyph="repeat" /> Réinitialiser</Button>
                </Col>
                <Col xs={6} sm={6} md={6} lg={6}>
                    <Button block bsStyle="primary"><Glyphicon glyph="floppy-disk" /> Sauvegarder</Button>
                </Col>
            </Panel>
        );
    }
}

export default ProfileInfo;