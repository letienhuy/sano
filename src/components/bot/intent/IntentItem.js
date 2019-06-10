import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { HashLoader } from 'react-spinners';
import { showConfirm } from '../../layout/Confirm';
import { deleteIntent, cloneIntent, selectIntent } from '../../../actions/intent.action';
import { route } from '../../../routes';

export class IntentItem extends Component {
    static propTypes = {
        item: PropTypes.object.isRequired
    }

    handleItemClick = () => {
        const { item , dispatch, history } = this.props;
        dispatch(selectIntent(item));
        history.push(route('bot.intent.sample'));
    }

    handleDelete = () => {
        const { item , dispatch } = this.props;
        dispatch(showConfirm({
            title: "Xoá kịch bản",
            message: <div>Xác nhận xoá kịch bản <b>{item.name}</b></div>,
            buttons: [
                {
                    title: "Xoá",
                    style: {background: '#ff0000'},
                    onClick: () => dispatch(deleteIntent(item._id))
                },
                {
                    title: "Huỷ"
                }
            ]
        }));
    }

    handleClone = () => {
        const { item, dispatch, history } = this.props;
        dispatch(cloneIntent(item._id));
        history.push(route('bot.intent.sample'))
    }
    render() {
        const { _id, name, description, created_at, updated_at} = this.props.item;
        const { deleteList } = this.props.intent;
        return (
            <div className="grid-item with-border">
                <div onClick={this.handleItemClick}>
                    {deleteList.find((id) => id === _id) ? 
                        <div className="load-deleting">
                            <HashLoader
                                sizeUnit={"px"}
                                size={30}
                                color={'#117EBF'}
                                loading={true}
                            />
                        </div> : null}
                    <h2 className="grid-item_title">{name}</h2>
                    <span className="grid-item_description">{description}</span>
                    <hr/>
                    <div className="grid-item_timeline"><b>Updated: </b><span>{updated_at}</span></div>
                    <div className="grid-item_timeline"><b>Created: </b><span>{created_at}</span></div>
                </div>
                <button className="btn-action">
                    <span className="icon-bar"></span>
                    <span className="icon-bar"></span>
                    <span className="icon-bar"></span>
                </button>
                <div className="action-menu show">
                    <span onClick={this.handleClone}><i className="fal fa-clone"></i> Sao chép</span>
                    <span className="color-red" onClick={this.handleDelete}><i className="fal fa-trash"></i> Xoá</span>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    intent: state.intentReducer
});

export default withRouter(connect(mapStateToProps)(IntentItem));
