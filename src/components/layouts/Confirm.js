import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const SHOW_CONFIRM = "SHOW_CONFIRM";
const HIDE_CONFIRM = "HIDE_CONFIRM";

export class Confirm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hidden: true
        }
    }
    componentWillReceiveProps(newProps){
        const { showConfirmBox } = newProps.confirm;
        if(showConfirmBox){
            setTimeout(() => {
                this.setState({hidden: false});
            }, 100)
        }
    }
    handleClose = () => {
        this.setState({hidden: true});
        setTimeout(() => this.props.dispatch(hideConfirm()), 100)
    }
    handleClickButton = (func) => {
        if(typeof func === "function"){
            func();
        }
        this.handleClose();
    }
    render() {
        const { hidden } = this.state;
        const {showConfirmBox, title, message, buttons} = this.props.confirm;
        if(showConfirmBox)
            return (
                <div className="confirm-component">
                    <div className="confirm-wrap">
                        <div className={`confirm-container ${hidden ? null : 'active'}`}>
                            <div className="confirm-title">{title}</div>
                            <button className="confirm-close" onClick={this.handleClose}>
                                <span className="icon-bar"></span>
                                <span className="icon-bar"></span>
                            </button>
                            <div className="confirm-text">
                                {message}
                            </div>
                            <div className="confirm-button">
                                {buttons.map(({title, onClick, style}, key) => {
                                    return(
                                        <div className="confirm-button_item" key={key}>
                                            <button style={style} onClick={() => this.handleClickButton(onClick)}>{title}</button>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            )
        return(
            <div></div>
        )
    }
}

const mapStateToProps = (state) => ({
    confirm: state.confirmReducer
});
export default connect(mapStateToProps)(Confirm);

export const confirmReducer = (state = {
    showConfirmBox: false,
    title: null,
    message: null,
    buttons: []
}, action) => {
    switch(action.type){
        case SHOW_CONFIRM:
            return {
                ...state,
                ...action
            };
        case HIDE_CONFIRM:
            return {
                ...state,
                ...action
            };
        default:
            return state;
    }
}
export const showConfirm = ({title, message, buttons}) => {
    return {
        type: SHOW_CONFIRM,
        showConfirmBox: true,
        title,
        message,
        buttons
    }
}

export const hideConfirm = () => {
    return {
        type: HIDE_CONFIRM,
        showConfirmBox: false,
        title: null,
        message: null,
        buttons: []
    }
}

