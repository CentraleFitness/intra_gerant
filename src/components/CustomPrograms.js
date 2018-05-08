import React from 'react';
import {
    Panel,
    Glyphicon,
    Table,
    Image,
    Checkbox,
    Col,
    Form,
    FormControl,
    FormGroup,
    Button,
    ControlLabel,
    Radio
} from 'react-bootstrap';
import { connect } from 'react-redux';

import {
    setActivities,
    setCustomPrograms,
    setInitialCustomPrograms,
    addCustomProgram,
    updateCustomProgram,
    deleteCustomProgram
} from "../actions/customProgramsActions";

import {
    setCustomProgramsActivitiesIsLoad,
    setCustomProgramsIsLoad
} from "../actions/globalActions";

import Texts from "../utils/Texts";

class CustomPrograms extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        if (this.props.custom_programs_activities_is_load === false) {
            this.getCustomProgramsActivities();
        }
        if (this.props.custom_programs_is_load === false) {
            this.getCustomPrograms();
        }
    }

    getCustomProgramsActivities() {
        let activities =[
            {_id: 1, name: "Abdos", icon: "/img/abdos.png"},
            {_id: 2, name: "Pompes", icon: "/img/pompes.png"},
            {_id: 3, name: "Push-up", icon: "/img/bicycle-rider.png"},
            {_id: 4, name: "Elliptique", icon: "/img/bicycle-rider.png"}
        ];

        this.props.setActivities(activities);
        this.props.setCustomProgramsActivitiesIsLoad();
    }

    getCustomPrograms() {

        let custom_programs =[
            {
                _id: 1,
                image: "/img/program.svg",
                name: "Program 1",
                nb_activities: 4,
                total_time: "2 hours",
                activities: [
                    {_id: 1, name: "Abdos", time: "30 min", icon: "/img/abdos.png"},
                    {_id: 2, name: "Pompes", time: "30 min", icon: "/img/pompes.png"},
                    {_id: 3,name: "Push-up", time: "30 min", icon: "/img/bicycle-rider.png"},
                    {_id: 4, name: "Elliptique", time: "30 min", icon: "/img/bicycle-rider.png"}
                ],
                available: true
            },
            {
                _id: 2,
                image: "/img/program.svg",
                name: "Program 2",
                nb_activities: 2,
                total_time: "1 hours",
                activities: [
                    {_id: 1, name: "Abdos", time: "30 min", icon: "/img/bicycle-rider.png"},
                    {_id: 2, name: "Pompes", time: "30 min", icon: "/img/bicycle-rider.png"}
                ],
                available: false
            }
        ];

        this.props.setCustomPrograms(custom_programs);
        this.props.setInitialCustomPrograms(custom_programs);
        this.props.setCustomProgramsIsLoad();
    }

    onTableRowClick(item, event) {
        console.log('onTableRowClick', item, event);
    }

    onCreateProgramClick() {

    }

    render() {
        return (
            <Panel header={<div><Glyphicon glyph="time" /> {Texts.PROGRAMMES_PERSONNALISES.text_fr}</div>} bsStyle="primary">
                <Panel>
                        <Panel header={<div><Glyphicon glyph="filter" /> {Texts.FILTRE.text_fr}</div>}>
                            <Form horizontal>
                                <Col xs={12} sm={12} md={6} lg={6}>
                                    <FormGroup>
                                        <Col componentClass={ControlLabel} xs={4} sm={4} md={4} lg={4}>
                                            {Texts.PAR_NOM.text_fr}
                                        </Col>
                                        <Col xs={7} sm={7} md={7} lg={7}>
                                            <FormControl
                                                type="text"
                                                placeholder={Texts.NOM.text_fr}
                                                //value={this.props.filter_keywords}
                                                //onChange={this.keyWordFilterChange.bind(this)}
                                            />
                                        </Col>
                                    </FormGroup>
                                    <FormGroup>
                                        <Col componentClass={ControlLabel} xs={4} sm={4} md={4} lg={4}>
                                            {Texts.PAR_DISPONIBILITE.text_fr}
                                        </Col>
                                        <Col xs={1} sm={1} md={1} lg={1}>

                                        </Col>
                                        <Col xs={6} sm={6} md={6} lg={6}>
                                            <Radio name="filterAvailability" inline>
                                                {Texts.DISPONIBLE.text_fr}
                                            </Radio>{' '}
                                            <Radio name="filterAvailability" inline>
                                                {Texts.INDISPONIBLE.text_fr}
                                            </Radio>{' '}
                                        </Col>
                                    </FormGroup>
                                </Col>
                                <Col xs={12} sm={12} md={6} lg={6}>
                                    <FormGroup>
                                        <Col componentClass={ControlLabel} xs={4} sm={4} md={4} lg={4}>
                                            {Texts.PAR_NOMBRE_D_ACTIVITES.text_fr}
                                        </Col>
                                        <Col xs={8} sm={8} md={8} lg={8}>
                                            <FormControl
                                                type="number"
                                                min={0}
                                                //value={this.props.filter_number_subscribers}
                                                //onChange={this.numberSubscribersFilterChange.bind(this)}
                                            />
                                        </Col>
                                    </FormGroup>
                                    <FormGroup>
                                        <Col componentClass={ControlLabel} xs={4} sm={4} md={4} lg={4}>
                                            {Texts.PAR_DUREE_TOTALE.text_fr}
                                        </Col>
                                        <Col xs={4} sm={4} md={4} lg={4}>
                                            <FormControl
                                                type="number"
                                                min={0}
                                                placeholder={Texts.DUREE.text_fr + ' (min)'}
                                                //value={this.props.filter_number_subscribers}
                                                //onChange={this.numberSubscribersFilterChange.bind(this)}
                                            />
                                        </Col>
                                    </FormGroup>
                                </Col>
                            </Form>
                        </Panel>
                        <Button
                            //onClick={this.resetFilters.bind(this)}
                        >
                            <Glyphicon glyph="refresh" /> {Texts.REINITIALISER_LES_FILTRES.text_fr}
                        </Button>
                        <Button
                            className={"pull-right"}
                            onClick={this.onCreateProgramClick.bind(this)}
                        >
                            <Glyphicon glyph="plus" />  {Texts.CREER_UN_PROGRAMME.text_fr}
                        </Button>
                </Panel>
                <Table striped bordered condensed hover>
                    <thead>
                        <tr>
                            <th>
                                <h3>{Texts.IMAGE.text_fr}</h3>
                            </th>
                            <th>
                                <h3>{Texts.NOM.text_fr}</h3>
                            </th>
                            <th>
                                <h3>{Texts.NOMBRE_D_ACTIVITES.text_fr}</h3>
                            </th>
                            <th>
                                <h3>{Texts.DUREE_TOTALE.text_fr}</h3>
                            </th>
                            <th>
                                <h3>{Texts.ACTIVITES.text_fr}</h3>
                            </th>
                            <th>
                                <h3>{Texts.DISPONIBLE.text_fr}</h3>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                        this.props.custom_programs.map((item) => (
                            <tr key={item._id}
                            >
                                <td onClick={this.onTableRowClick.bind(this, item)}
                                    style={{cursor: "pointer"}}
                                >
                                    <Image
                                        src={item.image}
                                    />
                                </td>
                                <td onClick={this.onTableRowClick.bind(this, item)}
                                    style={{cursor: "pointer"}}
                                >
                                    {item.name}
                                </td>
                                <td onClick={this.onTableRowClick.bind(this, item)}
                                     style={{cursor: "pointer"}}
                                >
                                    {item.nb_activities}
                                </td>
                                <td onClick={this.onTableRowClick.bind(this, item)}
                                    style={{cursor: "pointer"}}
                                >
                                    {item.total_time}
                                </td>
                                <td onClick={this.onTableRowClick.bind(this, item)}
                                    style={{cursor: "pointer"}}
                                >
                                {
                                    item.activities.map((activity) => (
                                        <div key={activity._id}>
                                            <Image
                                                src={activity.icon}
                                            />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{activity.name} {activity.time}
                                        </div>
                                    ))
                                }
                                </td>
                                <td>
                                    <Checkbox checked={item.available}>

                                    </Checkbox>
                                </td>
                            </tr>
                        ))
                    }
                    </tbody>
                </Table>
            </Panel>
        );
    }
}

function mapStateToProps(state) {
    return {
        custom_programs: state.custom_programs.custom_programs,
        initial_custom_programs: state.custom_programs.initial_custom_programs,

        custom_programs_activities_is_load: state.global.custom_programs_activities_is_load,
        custom_programs_is_load: state.global.custom_programs_is_load
    };
}

export default connect(mapStateToProps, {
    setActivities,
    setCustomPrograms,
    setInitialCustomPrograms,
    addCustomProgram,
    updateCustomProgram,
    deleteCustomProgram,

    setCustomProgramsActivitiesIsLoad,
    setCustomProgramsIsLoad
})(CustomPrograms);