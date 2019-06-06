import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteBot, cloneBot } from '../../actions/bot.actions';
import { HashLoader } from 'react-spinners';
import Skeleton from 'react-skeleton-loader';
import { showConfirm } from '../layouts/Confirm';
import { BOT_SKELETON_STOP } from '../../constants/bot.constants';

export class BotItem extends Component {
    static propTypes = {
        item: PropTypes.object.isRequired
    }

    handleDelete = () => {
        const { item , dispatch } = this.props;
        dispatch(showConfirm({
            title: "Xoá trợ lý ảo",
            message: <div>Xác nhận xoá trợ lý ảo <b>{item.name}</b></div>,
            buttons: [
                {
                    title: "Xoá",
                    style: {backgroundColor: '#ff0000'},
                    onClick: () => dispatch(deleteBot(item._id))
                },
                {
                    title: "Huỷ"
                }
            ]
        }));
    }

    handleClone = () => {
        const { item, dispatch } = this.props;
        dispatch(cloneBot(item._id));
    }
    render() {
        const { _id, name, description, created_at, language, updated_at} = this.props.item;
        const { deleteList } = this.props.bot;
        return (
            <div className="grid-item with-border">
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
                <div className="grid-item_timeline"><b>Ngôn ngữ:</b> <span>{language ? language.name : 'Mặc định'}</span></div>
                <hr/>
                <div className="grid-item_timeline"><b>Updated: </b><span>{updated_at}</span></div>
                <div className="grid-item_timeline"><b>Created: </b><span>{created_at}</span></div>
                <button className="btn-action">
                    <span className="icon-bar"></span>
                    <span className="icon-bar"></span>
                    <span className="icon-bar"></span>
                </button>
                <div className="action-menu show">
                    <span onClick={this.handleClone}><i className="fal fa-clone"></i> Sao chép</span>
                    <span onClick={() => this.props.onEdit()}><i className="fal fa-pen"></i> Sửa</span>
                    <span className="color-red" onClick={this.handleDelete}><i className="fal fa-trash"></i> Xoá</span>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    bot: state.botReducer
});

export default connect(mapStateToProps)(BotItem);
