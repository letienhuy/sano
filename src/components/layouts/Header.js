import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import LoadingBar from 'react-redux-loading-bar';

export class Header extends Component {
    static propTypes = {
        className: PropTypes.string,
        hideToggle: PropTypes.bool,
    }
    handleToggle = () => {
        let parentToggle = document.querySelector('.toggle-navigation');
        let sidebar = document.querySelector('.sidebar');
        let toggledClass = parentToggle.classList.item(1);
        if(toggledClass){
            parentToggle.classList.remove('toggled');
            sidebar.classList.remove('sidebar-active');
        }else{
            parentToggle.classList.add('toggled');
            sidebar.classList.add('sidebar-active');
        }
    }
    render() {
        return (
            <header className="bg-black">
                {this.props.hideToggle ? null : (
                    <div className="toggle-navigation">
                        <button className="btn-toggle" onClick={this.handleToggle}>
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
            </header>
        )
    }
}

const mapStateToProps = (state) => ({
    
});

export default connect(mapStateToProps)(Header);
