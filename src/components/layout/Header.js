import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import LoadingBar from 'react-redux-loading-bar';
import Confirm from './Confirm';
import TestDebug from './TestDebug';

export class Header extends Component {
    static propTypes = {
        className: PropTypes.string,
        hideToggle: PropTypes.bool,
    }
    hanldeToggle = () => {
        document.querySelector('.toggle-navigation').classList.toggle('toggled')
        document.querySelector('.sidebar').classList.toggle('sidebar-active')
    }
    render() {
        return (
            <header className="bg-black">
                {this.props.hideToggle ? null : (
                    <div className="toggle-navigation">
                        <button className="btn-toggle" onClick={this.hanldeToggle}>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                        </button>
                    </div>
                )}
                <div className="head-logo">
                    <span>GENIX</span>
                </div>
                <LoadingBar style={{ backgroundColor: '#f94854', height: '3px' }}/>
                <Confirm/>
                <TestDebug/>
            </header>
        )
    }
}

const mapStateToProps = (state) => ({
    
});

export default connect(mapStateToProps)(Header);
