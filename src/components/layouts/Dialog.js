import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

export class Dialog extends Component {
    static propTypes = {
    }

    render() {
        return (
            <div>
                
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    dialog: state.dialogReducer
});

export default connect(mapStateToProps)(Dialog);
