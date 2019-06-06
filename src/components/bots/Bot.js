import React, {Component} from 'react';
import {connect} from 'react-redux';
import Header from '../layouts/Header';
import Sidebar from '../layouts/Sidebar';
import {fetchBots} from '../../actions/bot.actions';
import * as API from '../../helpers/API';
import BotItem from './BotItem';
import CreateBot from './CreateBot';
import EditBot from './EditBot';
import Modal from '../layouts/Modal';
import {BOT_TEMPLATE, BOT_BUILTIN} from '../../constants/bot.constants';

export class Bot extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isToggle: false,
            isToggleEdit: false,
            botItem: null,
            listLanguages: [],
            listTemplates: [],
            listBuiltIns: []
        }
    }

    componentDidMount() {
        const {list} = this.props.bot;
        if (!list.length) 
            this
                .props
                .dispatch(fetchBots());
        this.fetchSomeData();
    }
    fetchSomeData = () => {
        API
            .fetchListLanguage()
            .then((data) => {
                this.setState({listLanguages: data.data.data});
            });
        API
            .fetchListTemplate(BOT_TEMPLATE)
            .then((data) => {
                this.setState({listTemplates: data.data.data});
            });
        API
            .fetchListTemplate(BOT_BUILTIN)
            .then((data) => {
                this.setState({listBuiltIns: data.data.data})
            });
    }
    handleLoadMore = () => {
        const {currentPage, totalPages} = this.props.bot;
        if (currentPage < totalPages) 
            this
                .props
                .dispatch(fetchBots(currentPage + 1));
        }
    render() {
        const {list} = this.props.bot;
        return (
            <div>
                <Header/>
                <Sidebar/>
                <section className="container">
                    <div className="description">
                        <h1>
                            Quản lý trợ lý ảo GeniX
                        </h1>
                        <span>
                            Quản lý các trợ lý ảo đã tạo, tạo trợ lý ảo mới
                        </span>
                        <button className="btn" onClick={() => this.setState({isToggle: true})}>Tạo bot mới</button>
                    </div>
                    <div className="grid-fluid">
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
                </section>
                <Modal
                    isToggle={this.state.isToggle}
                    onClose={() => this.setState({isToggle: false})}
                    title="Tạo trợ lý ảo mới">
                    <CreateBot
                        listLanguages={this.state.listLanguages}
                        listBuiltIns={this.state.listBuiltIns}
                        listTemplates={this.state.listTemplates}/>
                </Modal>
                <Modal
                    isToggle={this.state.isToggleEdit}
                    onClose={() => this.setState({isToggleEdit: false, botItem: null})}
                    title="Cập nhật trợ lý ảo">
                    {
                        this.state.botItem
                            ? <EditBot
                                    botItem={this.state.botItem}
                                    listLanguages={this.state.listLanguages}
                                    listBuiltIns={this.state.listBuiltIns}/>
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
