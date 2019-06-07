import React, {Component} from 'react';
import {connect} from 'react-redux';
import Header from '../layout/Header';
import Sidebar from '../layout/sidebar/Sidebar';
import {fetchBots} from '../../actions/bot.actions';
import BotItem from './BotItem';
import CreateBot from './CreateBot';
import EditBot from './EditBot';
import Modal from '../layout/Modal';
import Skeleton from 'react-skeleton-loader';
import {isEmpty} from 'lodash';
import Scroll from 'simplebar-react';

export class Bot extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isToggleCreate: false,
            isToggleEdit: false,
            botItem: null
        }
    }

    componentDidMount() {
        const { list } = this.props.bot;
        if (isEmpty(list)){
            this.props.dispatch(fetchBots());
        }
    }
    
    handleLoadMore = () => {
        const {currentPage, totalPages} = this.props.bot;
        if (currentPage < totalPages) 
            this.props.dispatch(fetchBots(currentPage + 1));
        }
    render() {
        const { list, cloneList, listBuiltIns, listLanguages, listTemplates } = this.props.bot;
        const { isToggleCreate, isToggleEdit, botItem } = this.state;
        return (
            <div>
                <Header/>
                <Sidebar/>
                <Scroll className="container">
                    <div className="description">
                        <h1>
                            Quản lý trợ lý ảo GeniX
                        </h1>
                        <span>
                            Quản lý các trợ lý ảo đã tạo, tạo trợ lý ảo mới
                        </span>
                        <button className="btn" onClick={() => this.setState({isToggleCreate: true})}>Tạo bot mới</button>
                    </div>
                    <div className="grid-fluid">
                        {
                            cloneList.map((item, key) => {
                                return(
                                    <div className="col-3" key={key}>
                                        <div className="grid-item with-border">
                                            <Skeleton borderRadius={0} width="100%" height="25px"/>
                                            <Skeleton borderRadius={0} width="100%"/>
                                            <Skeleton borderRadius={0} width="130px" height="15px"/>
                                            <hr/>
                                            <Skeleton borderRadius={0} width="100%" height="15px"/>
                                            <Skeleton borderRadius={0} width="100%" height="15px"/>
                                        </div>
                                    </div>
                                )
                            })
                        }
                        {
                            list.map((item, key) => {
                                return (
                                    <div key={key} className="col-3">
                                        <BotItem
                                            item={item}
                                            onEdit={() => this.setState({botItem: item, isToggleEdit: true})}/>
                                    </div>
                                )
                            })
                        }
                    </div>
                </Scroll>
                <Modal
                    isToggle={isToggleCreate}
                    onClose={() => this.setState({isToggleCreate: false})}
                    title="Tạo trợ lý ảo mới">
                    <CreateBot
                        listLanguages={listLanguages}
                        listBuiltIns={listBuiltIns}
                        listTemplates={listTemplates}/>
                </Modal>
                <Modal
                    isToggle={isToggleEdit}
                    onClose={() => this.setState({isToggleEdit: false, botItem: null})}
                    title={botItem ? "Sửa " + botItem.name  : "Cập nhật trợ lý ảo"}>
                    {
                        botItem
                            ? <EditBot
                                    botItem={botItem}
                                    listLanguages={listLanguages}
                                    listBuiltIns={listBuiltIns}/>
                            : null
                    }
                </Modal>
            </div>
        )
    }
}

const mapStateToProps = (state) => (
    {auth: state.userReducer, bot: state.botReducer}
);

export default connect(mapStateToProps)(Bot);
