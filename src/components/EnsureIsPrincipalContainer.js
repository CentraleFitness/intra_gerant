import React from 'react';
import { connect } from 'react-redux';

class EnsureIsPrincipalContainer extends React.Component {

    render() {
        if (this.props.is_principal) {
            return this.props.children
        } else {
            return null
        }
    }
}

function mapStateToProps(state) {
    return {
        is_principal: state.global.is_principal
    };
}

export default connect(mapStateToProps, {

})(EnsureIsPrincipalContainer);