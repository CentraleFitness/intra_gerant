import React from 'react';
import {browserHistory} from 'react-router';
import { connect } from 'react-redux';

import Communication from '../utils/Communication';
import Paths from '../utils/Paths';
import Status from '../utils/Status';
import Fields from '../utils/Fields';

import {
    setIsPrincipal
} from '../actions/globalActions'

class EnsureLoggedInContainer extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isAuthenticate: false
        };
    }

    componentDidMount() {

        this.checkAuthToken();
    }

    checkAuthToken() {
        let token = localStorage.getItem('token');

        if (token === null) {
            browserHistory.replace("/auth");
        }

        let params = {};

        params[Fields.TOKEN] = token;

        let me = this;

        let communication = new Communication('post', Paths.HOST + Paths.AUTHENTICATION_TOKEN, params);
        communication.sendRequest(
            function (response) {
                if (response.status === 200 && response.data.code === Status.AUTH_SUCCESS.code) {

                    me.props.setIsPrincipal(response.data.is_principal);
                    me.setState({
                        isAuthenticate: true
                    });

                } else {
                    browserHistory.replace("/auth");
                }
            },
            function (error) {
                browserHistory.replace("/auth");
            }
        );
    }

    render() {
        if (this.state.isAuthenticate) {
            return this.props.children
        } else {
            return null
        }
    }
}

function mapStateToProps(state) {
    return {

    };
}

export default connect(mapStateToProps, {
    setIsPrincipal
})(EnsureLoggedInContainer);