import React, {Component} from 'react';
import {connect} from 'react-redux';
import Header from '../layouts/Header';
import Sidebar from '../layouts/Sidebar';
import {fetchBots} from '../../actions/bot.actions';
import {BotItem} from './BotItem';
import CreateBot from './CreateBot';
import Modal from '../layouts/Modal';
import cogoToast from 'cogo-toast';

export class Bot extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isToggleCreate: false
        }
    }

    componentDidMount() {
        this.props.dispatch(fetchBots());
        window.addEventListener('scroll', (e) => {
            console.log(e);
        });
    }
    handleLoadMore = () => {
        const { currentPage, totalPages } = this.props.bot;
        if(currentPage < totalPages)
            this.props.dispatch(fetchBots(currentPage+1));
    }
    render() {
        const { list, message, error } = this.props.bot;
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
                        <button className="btn" onClick={this.handleLoadMore}>Next</button>
                        <button className="btn" onClick={() => this.setState({isToggleCreate: true})}>Tạo bot mới</button>
                    </div>
                    <div className="grid-fluid">
                        {
                            list.map((item, key) => {
                                return (
                                    <div key={key} className="col-3">
                                        <BotItem data={item}/>
                                    </div>
                                )
                            })
                        }
                    </div>
                </section>
                <Modal
                    isToggle={this.state.isToggleCreate}
                    onClose={() => this.setState({isToggleCreate: false})}
                    title="Tạo bot mới
                ">
                    <CreateBot {...this.props}/>
                </Modal>
            </div>
        )
    }
}

const mapStateToProps = (state) => (
    {auth: state.userReducer, bot: state.botReducer}
);

export default connect(mapStateToProps)(Bot);
