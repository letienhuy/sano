import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Link, withRouter, Redirect} from 'react-router-dom';
import { route, setActive } from '../../../routes';

export class SidebarBot extends Component {
    render() {
        const { selectedBot } = this.props.bot;
        if(!selectedBot) return <Redirect to={route('bot')}/>;
        return (
            <section className="sidebar">
                <div className="sidebar-wrap">
                    <div className="sidebar-head">
                        <span>{selectedBot.name}</span>
                    </div>
                    <ul className="sidebar-container">
                        <li className={setActive('bot.intent')}>
                            <i className="fal fa-scroll"></i>
                            <Link to={route('bot.intent')}>Kịch bản</Link>
                        </li>
                        <li className={setActive('bot.entity')}>
                            <i className="fal fa-box-open"></i>
                            <a href="/">Thực thể</a>
                        </li>
                        <li className={setActive('bot.inbox')}>
                            <i className="fal fa-comment-alt"></i>
                            <a href="/">Hội thoại</a>
                        </li>
                        <li className={setActive('bot.knowledge')}>
                            <i className="fal fa-brain"></i>
                            <a href="/">Tri thức</a>
                        </li>
                        <li className={setActive('bot.integration')}>
                            <i className="fal fa-atom"></i>
                            <a href="/">Tích hợp</a>
                        </li>
                        <li className={setActive('bot.training')}>
                            <i className="fal fa-chalkboard-teacher"></i>
                            <a href="/">Huấn luyện bot</a>
                        </li>
                        <li className={setActive('bot.rating')}>
                            <i className="fal fa-star-half-alt"></i>
                            <a href="/">Đánh giá</a>
                        </li>
                        <li className={setActive('bot.customer')}>
                            <i className="fal fa-users"></i>
                            <a href="/">Quản lý khách hàng</a>
                        </li>
                    </ul>
                </div>
            </section>
        )
    }
}

const mapStateToProps = (state) => ({
    bot: state.botReducer,
});

export default withRouter(connect(mapStateToProps)(SidebarBot));
