import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteBot } from '../../actions/bot.actions';
import { HashLoader } from 'react-spinners';

export class BotItem extends Component {
    static propTypes = {
        data: PropTypes.object
    }
    constructor(props) {
        super(props);
    }
    handleDelete = (botId) => {
        this.props.dispatch(deleteBot(botId));
    }
    render() {
        const { _id, name, description, created_at, language} = this.props.item;
        const { loading , deleteList } = this.props.bot;
        return (
            <div className="grid-item with-border">
                {loading && deleteList.find((id) => id === _id) ? 
                    <div className="load-deleting">
                        <HashLoader
                            sizeUnit={"px"}
                            size={30}
                            color={'#117EBF'}
                            loading={loading}
                        />
                    </div> : null}
                <h2 className="title">{name}</h2>
                <span className="description">{description}</span>
                <div className="timeline"><b>Ngôn ngữ:</b> <span>{language.name}</span></div>
                <div className="timeline"><b>Đã tạo: </b><span>{created_at}</span></div>
                <button className="btn-action">
                    <span className="icon-bar"></span>
                    <span className="icon-bar"></span>
                    <span className="icon-bar"></span>
                </button>
                <div className="action-menu show">
                    <span>Sửa</span>
                    <span className="color-red" onClick={() => this.handleDelete(_id)}>Xoá</span>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    bot: state.botReducer
});

export default connect(mapStateToProps)(BotItem);
