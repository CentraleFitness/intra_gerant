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
    OverlayTrigger,
    Modal,
    HelpBlock
} from 'react-bootstrap';

class ProfileInfo extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            showManagerModal: false,
            showClubModal: false,
            manager_first_name: this.props.manager_first_name,
            manager_last_name: this.props.manager_last_name,
            manager_email: this.props.manager_email,
            manager_phone: this.props.manager_phone,
            club_name: this.props.club_name,
            club_address: this.props.club_address,
            club_address2: this.props.club_address2,
            club_zip_code: this.props.club_zip_code,
            club_city: this.props.club_city,
            club_phone: this.props.club_phone,
            club_description: this.props.club_description
        };
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            manager_first_name: nextProps.manager_first_name,
            manager_last_name: nextProps.manager_last_name,
            manager_email: nextProps.manager_email,
            manager_phone: nextProps.manager_phone,
            club_name: nextProps.club_name,
            club_address: nextProps.club_address,
            club_address2: nextProps.club_address2,
            club_zip_code: nextProps.club_zip_code,
            club_city: nextProps.club_city,
            club_phone: nextProps.club_phone,
            club_description: nextProps.club_description
        });
    }

    onUpdateManagerImageClick() {
        this.setState({
            showManagerModal: true
        });
    }

    onUpdateManagerImageSaveClick() {
        this.setState({
            showManagerModal: false
        });
        console.log(this.managerUpdateImageRef.value);
        //plus dautre chose
    }

    onUpdateManagerImageCloseClick() {
        this.setState({
            showManagerModal: false
        });
    }

    onUpdateClubImageClick() {
        this.setState({
            showClubModal: true
        });
    }

    onUpdateClubImageSaveClick() {
        this.setState({
            showClubModal: false
        });
        console.log(this.clubUpdateImageRef.value);
        //plus dautre chose
    }

    onUpdateClubImageCloseClick() {
        this.setState({
            showClubModal: false
        });
    }

    onResetClick() {
        this.managerFirstNameRef.value = this.props.manager_first_name;
        this.managerLastNameRef.value = this.props.manager_last_name;
        this.managerEmailRef.value = this.props.manager_email;
        this.managerPhoneRef.value = this.props.manager_phone;
        this.clubNameRef.value = this.props.club_name;
        this.clubAdressRef.value = this.props.club_address;
        this.clubAdress2Ref.value = this.props.club_address2;
        this.clubZipCodeRef.value = this.props.club_zip_code;
        this.clubCityRef.value = this.props.club_city;
        this.clubPhoneRef.value = this.props.club_phone;
        this.clubDescriptionRef.value = this.props.club_description;
    }

    onSaveClick() {
        console.log(this.managerFirstNameRef.value);
        console.log(this.managerLastNameRef.value);
        console.log(this.managerEmailRef.value);
        console.log(this.managerPhoneRef.value);
        console.log(this.clubNameRef.value);
        console.log(this.clubAdressRef.value);
        console.log(this.clubAdress2Ref.value);
        console.log(this.clubZipCodeRef.value);
        console.log(this.clubCityRef.value);
        console.log(this.clubPhoneRef.value);
        console.log(this.clubDescriptionRef.value);
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
                            <Col xs={6} sm={6} md={8} lg={8}>
                                <Form horizontal>
                                    <FormGroup controlId="formHorizontalText">
                                        <Col componentClass={ControlLabel} sm={2}>
                                            Prénom
                                        </Col>
                                        <Col sm={8}>
                                            <FormControl
                                                type="text"
                                                placeholder="Prénom"
                                                value={this.state.manager_first_name}
                                                inputRef={ref => this.managerFirstNameRef = ref}
                                            />
                                        </Col>
                                    </FormGroup>

                                    <FormGroup controlId="formHorizontalText">
                                        <Col componentClass={ControlLabel} sm={2}>
                                            Nom
                                        </Col>
                                        <Col sm={8}>
                                            <FormControl
                                                type="text"
                                                placeholder="Nom"
                                                value={this.state.manager_last_name}
                                                inputRef={ref => this.managerLastNameRef = ref}
                                            />
                                        </Col>
                                    </FormGroup>

                                    <FormGroup controlId="formHorizontalEmail">
                                        <Col componentClass={ControlLabel} sm={2}>
                                            Email
                                        </Col>
                                        <Col sm={8}>
                                            <FormControl
                                                type="email"
                                                placeholder="Email"
                                                value={this.state.manager_email}
                                                inputRef={ref => this.managerEmailRef = ref}
                                            />
                                        </Col>
                                    </FormGroup>
                                    <FormGroup controlId="formHorizontalText">
                                        <OverlayTrigger trigger={["hover", "focus"]} placement="top" overlay={popoverPhone}>
                                            <Col componentClass={ControlLabel} sm={2}>
                                                Téléphone *
                                            </Col>
                                        </OverlayTrigger>
                                        <Col sm={8}>
                                            <FormControl
                                                type="text"
                                                placeholder="Téléphone"
                                                value={this.state.manager_phone}
                                                inputRef={ref => this.managerPhoneRef = ref}
                                            />
                                        </Col>
                                    </FormGroup>
                                </Form>
                            </Col>
                            <Col xs={6} sm={6} md={4} lg={4}>
                                <Image
                                    src={"/img/user.png"}
                                    circle
                                    responsive={true}
                                    thumbnail={true}
                                    className={"profileImage"}
                                />
                                <Button
                                    block
                                    onClick={this.onUpdateManagerImageClick.bind(this)}
                                >
                                    <Glyphicon glyph="picture" /> Modifier image
                                </Button>
                            </Col>
                        </Row>
                    </Grid>

                    <Modal show={this.state.showManagerModal} onHide={this.onUpdateManagerImageCloseClick.bind(this)}>
                        <Modal.Header closeButton>
                            <Modal.Title>Modifier l'image de profil gérant</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <FormGroup controlId="formControlsFile">
                                <ControlLabel>Sélectionner une image</ControlLabel>
                                <FormControl type="file" inputRef={ref => this.managerUpdateImageRef = ref}/>
                                <HelpBlock>Format autorisés : PNG JPG</HelpBlock>
                            </FormGroup>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button onClick={this.onUpdateManagerImageCloseClick.bind(this)}>Fermer</Button>
                            <Button bsStyle="primary" onClick={this.onUpdateManagerImageSaveClick.bind(this)}>Sauvegarder</Button>
                        </Modal.Footer>
                    </Modal>

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
                                            <FormControl
                                                type="text"
                                                placeholder="Nom de la salle"
                                                value={this.state.club_name}
                                                inputRef={ref => this.clubNameRef = ref}
                                            />
                                        </Col>
                                    </FormGroup>

                                    <FormGroup controlId="formHorizontalText">
                                        <Col componentClass={ControlLabel} sm={2}>
                                            Adresse
                                        </Col>
                                        <Col sm={8}>
                                            <FormControl
                                                type="text"
                                                placeholder="Adresse"
                                                value={this.state.club_address}
                                                inputRef={ref => this.clubAdressRef = ref}
                                            />
                                        </Col>
                                    </FormGroup>

                                    <FormGroup controlId="formHorizontalText">
                                        <Col componentClass={ControlLabel} sm={2}>
                                            Adresse
                                        </Col>
                                        <Col sm={8}>
                                            <FormControl
                                                type="text"
                                                placeholder="Adresse suplémentaire"
                                                value={this.state.club_address2}
                                                inputRef={ref => this.clubAdress2Ref = ref}
                                            />
                                        </Col>
                                    </FormGroup>
                                    <FormGroup controlId="formHorizontalNumber">
                                        <Col componentClass={ControlLabel} sm={2}>
                                            Code postale
                                        </Col>
                                        <Col sm={8}>
                                            <FormControl
                                                type="number"
                                                placeholder="Code postale"
                                                value={this.state.club_zip_code}
                                                inputRef={ref => this.clubZipCodeRef = ref}
                                            />
                                        </Col>
                                    </FormGroup>
                                    <FormGroup controlId="formHorizontalText">
                                        <Col componentClass={ControlLabel} sm={2}>
                                            Ville
                                        </Col>
                                        <Col sm={8}>
                                            <FormControl
                                                type="text"
                                                placeholder="Ville"
                                                value={this.state.club_city}
                                                inputRef={ref => this.clubCityRef = ref}
                                            />
                                        </Col>
                                    </FormGroup>
                                    <FormGroup controlId="formHorizontalText">
                                        <Col componentClass={ControlLabel} sm={2}>
                                            Téléphone
                                        </Col>
                                        <Col sm={8}>
                                            <FormControl
                                                type="text"
                                                placeholder="Téléphone"
                                                value={this.state.club_phone}
                                                inputRef={ref => this.clubPhoneRef = ref}
                                            />
                                        </Col>
                                    </FormGroup>
                                    <FormGroup controlId="formControlsTextarea">
                                        <Col componentClass={ControlLabel} sm={2}>
                                            Description
                                        </Col>
                                        <Col sm={8}>
                                            <FormControl
                                                componentClass="textarea"
                                                placeholder="Description"
                                                value={this.state.club_description}
                                                inputRef={ref => this.clubDescriptionRef = ref}
                                            />
                                        </Col>
                                    </FormGroup>
                                </Form>
                            </Col>
                            <Col xs={2} sm={2} md={2} lg={2}>
                                <Image
                                    src={"/img/store.png"}
                                    rounded
                                    responsive={true}
                                    thumbnail={true}
                                />
                                <Button
                                    block
                                    onClick={this.onUpdateClubImageClick.bind(this)}
                                >
                                    <Glyphicon glyph="picture" /> Modifier image
                                </Button>
                            </Col>
                        </Row>
                    </Grid>

                    <Modal show={this.state.showClubModal} onHide={this.onUpdateClubImageCloseClick.bind(this)}>
                        <Modal.Header closeButton>
                            <Modal.Title>Modifier l'image de la salle</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <FormGroup controlId="formControlsFile">
                                <ControlLabel>Sélectionner une image</ControlLabel>
                                <FormControl type="file" inputRef={ref => this.clubUpdateImageRef = ref}/>
                                <HelpBlock>Format autorisés : PNG JPG</HelpBlock>
                            </FormGroup>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button onClick={this.onUpdateClubImageCloseClick.bind(this)}>Fermer</Button>
                            <Button bsStyle="primary" onClick={this.onUpdateClubImageSaveClick.bind(this)}>Sauvegarder</Button>
                        </Modal.Footer>
                    </Modal>

                </Panel>
                <Col xs={4} sm={4} md={4} lg={4}>
                </Col>
                <Col xs={2} sm={2} md={2} lg={2}>
                    <Button
                        block
                        onClick={this.onResetClick.bind(this)}
                    >
                        <Glyphicon glyph="repeat" /> Réinitialiser
                    </Button>
                </Col>
                <Col xs={2} sm={2} md={2} lg={2}>
                    <Button
                        block
                        bsStyle="primary"
                        onClick={this.onSaveClick.bind(this)}
                    >
                        <Glyphicon glyph="floppy-disk" /> Sauvegarder
                    </Button>
                </Col>
                <Col xs={4} sm={4} md={4} lg={4}>
                </Col>
            </Panel>
        );
    }
}

export default ProfileInfo;