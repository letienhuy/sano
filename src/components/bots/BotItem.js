import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteBot } from '../../actions/bot.actions';
import { HashLoader } from 'react-spinners';
import Skeleton from 'react-skeleton-loader';
import { showConfirm } from '../layouts/Confirm';

export class BotItem extends Component {
    static propTypes = {
        item: PropTypes.object.isRequired
    }
    constructor(props) {
        super(props);
        this.state = {
            skeleton: true
        }
    }
    
    componentDidMount() {
        setTimeout(() => {
            this.setState({skeleton: false});
        }, 500);
    }
    

    handleDelete = () => {
        const bot = this.props.item;
        this.props.dispatch(showConfirm({
            title: "Xoá trợ lý ảo",
            message: <div>Xác nhận xoá trợ lý ảo <b>{bot.name}</b></div>,
            buttons: [
                {
                    title: "Xoá",
                    style: {backgroundColor: '#ff0000'},
                    onClick: () => this.props.dispatch(deleteBot(bot._id))
                },
                {
                    title: "Huỷ"
                }
            ]
        }));
        //this.props.dispatch(deleteBot(botId));
    }
    render() {
        const { skeleton } = this.state;
        const { _id, name, description, created_at, language, updated_at} = this.props.item;
        const { loading , deleteList } = this.props.bot;
        if(skeleton)
            return(
                <div className="grid-item with-border">
                    <Skeleton borderRadius={0} width="100%" height="25px"/>
                    <Skeleton borderRadius={0} width="100%"/>
                    <Skeleton borderRadius={0} width="130px" height="15px"/>
                    <hr/>
                    <Skeleton borderRadius={0} width="100%" height="15px"/>
                    <Skeleton borderRadius={0} width="100%" height="15px"/>
                </div>
            )
        return (
            <div className="grid-item with-border">
                {deleteList.find((id) => id === _id) ? 
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
                <div className="timeline"><b>Ngôn ngữ:</b> <span>{language ? language.name : 'Mặc định'}</span></div>
                <hr/>
                <div className="timeline"><b>Updated: </b><span>{updated_at}</span></div>
                <div className="timeline"><b>Created: </b><span>{created_at}</span></div>
                <button className="btn-action">
                    <span className="icon-bar"></span>
                    <span className="icon-bar"></span>
                    <span className="icon-bar"></span>
                </button>
                <div className="action-menu show">
                    <span onClick={() => this.props.onEdit()}>Sửa</span>
                    <span className="color-red" onClick={this.handleDelete}>Xoá</span>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    bot: state.botReducer
});

export default connect(mapStateToProps)(BotItem);
