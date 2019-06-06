import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import SimpleBar from 'simplebar-react';

export class Modal extends Component {
    static propTypes = {
        isToggle: PropTypes.bool.isRequired,
        onClose: PropTypes.func.isRequired
    }

    handleClose = () => {
        this.props.onClose();
    }
    render() {
        const { isToggle, title, children } = this.props;
        return (
            <SimpleBar className={`modal-page ${isToggle ? 'show' : ''}`}>
                <div className="modal-head">
                    <button className="btn-back" onClick={this.handleClose}>
                        <i className="fal fa-arrow-left"/>
                    </button>
                    <span className="title">
                        {title}
                    </span>
                </div>
                <div className="modal-container">
                    <button className="close" onClick={this.handleClose}>
                        <span className="icon-bar"/>
                        <span className="icon-bar"/>
                    </button>
                    <div className="modal-wrap">
                    {children}
                    </div>
                </div>
            </SimpleBar>

        )
    }
}

const mapStateToProps = (state) => ({
    
});

export default connect(mapStateToProps)(Modal);
 