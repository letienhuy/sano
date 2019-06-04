import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

export class TestDebug extends Component {
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
    
});

export default connect(mapStateToProps)(TestDebug);
