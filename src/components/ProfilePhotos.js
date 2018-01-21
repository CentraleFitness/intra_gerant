import React from 'react';
import {
    Grid,
    Row,
    Col,
    Thumbnail,
    Panel,
    Modal,
    Button,
    OverlayTrigger,
    Popover,
    FormControl,
    FormGroup,
    ControlLabel,
    HelpBlock
} from 'react-bootstrap';

import '../styles/ProfilePhotos.css';

class ProfilePhotos extends React.Component {

    constructor(props) {
        super(props);

        var photos = [
            {id: 0, src: "/img/user.png", title: "Toujours la 1", description: "Eh oui, on est toujours la !"},
            {id: 1, src: "/img/store.png", title: "Toujours la 2", description: "Eh oui, on est toujours la ! 2"},
            {id: 2, src: "/img/user.png", title: "Toujours la 3", description: "Eh oui, on est toujours la ! 3"},
            {id: 3, src: "/img/store.png", title: "Toujours la 4", description: "Eh oui, on est toujours la ! 4"},
            {id: 4, src: "/img/user.png", title: "Toujours la 5", description: "Eh oui, on est toujours la ! 5"},
            {id: 5, src: "/img/store.png", title: "Toujours la 6", description: "Eh oui, on est toujours la ! 6"}
        ];

        this.state = {
            showPhotoModal: false,
            photos: photos,
            curTitle: "",
            curSrc: "",
            curDescription: ""
        };
    }

    onPhotoClick(curItem) {
        this.setState({
            showPhotoModal: true,
            curTitle: curItem.title,
            curSrc: curItem.src,
            curDescription: curItem.description
        });
    }

    onPhotoCloseClick() {
        this.setState({
            showPhotoModal: false
        });
    }

    render() {

        return (
            <Panel>
                <Panel>
                    <Grid>
                    <Row>
                    <Col xs={6} sm={6} md={6} lg={6}>
                        <FormGroup controlId="formControlsFile">
                            <ControlLabel>Sélectionner une image</ControlLabel>
                            <FormControl type="file" inputRef={ref => this.managerUpdateImageRef = ref}/>
                            <HelpBlock>Format autorisés : PNG JPG</HelpBlock>
                        </FormGroup>
                    </Col>
                    <Col xs={6} sm={6} md={6} lg={6}>
                        <Button>Ajouter</Button>
                    </Col>
                    </Row>
                    </Grid>
                </Panel>
                <Grid fluid={true}>
                    <Row>
                        {
                            this.state.photos.map((item) => (
                                <span style={{cursor:"pointer"}} key={item.id} onClick={this.onPhotoClick.bind(this, item)}>
                                    <OverlayTrigger trigger={["hover", "focus"]} placement="top" overlay={
                                        <Popover title={item.title} id={"PhotoPopover"}>
                                            <strong>{item.description}</strong>
                                        </Popover>
                                    }>
                                        <Col xs={2} sm={2} md={2} lg={2}>
                                            <Thumbnail alt={item.title} src={item.src}/>
                                        </Col>
                                    </OverlayTrigger>
                                </span>
                            ))
                        }
                    </Row>
                </Grid>

                <Modal className={"photoModal"} show={this.state.showPhotoModal} onHide={this.onPhotoCloseClick.bind(this)}>
                    <Modal.Header closeButton>
                        <Modal.Title>{this.state.curTitle}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Thumbnail alt={this.state.curTitle} src={this.state.curSrc} />
                        <FormControl.Static className={"photoModalBody"}>
                            {this.state.curDescription}
                        </FormControl.Static>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.onPhotoCloseClick.bind(this)}>Fermer</Button>
                    </Modal.Footer>
                </Modal>

            </Panel>
        );
    }
}

export default ProfilePhotos;