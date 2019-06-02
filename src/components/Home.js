import React, { Component } from 'react';
import {BrowserRouter as Router, Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Header } from './layouts/Header';
import {route} from '../routes';
import Loading from './layouts/Loading';

export class Home extends Component {
    static propTypes = {
        
    }

    componentDidMount() {
    }
    
    render() {
        return (
            <Router>
                <Header className="bg-black" isToggleSidebar={true}/>
                <section className="sidebar">
                    <div className="sidebar-wrap">
                        <ul className="sidebar-container">
                            <li className="active">
                                <i className="fal fa-home"></i>
                                <Link to={route('home')}>Trang chủ</Link>
                            </li>
                            <li>
                                <i className="fal fa-robot"></i>
                                <Link to={route('bot')}>Quản lý Bot</Link>
                            </li>
                            <li>
                                <i className="fal fa-analytics"></i>
                                <a href="">Analytics</a>
                            </li>
                        </ul>
                    </div>
                </section>
                <section className="container">
                    <Loading/>
                </section>
            </Router>
        )
    }
}

const mapStateToProps = (state) => ({
    user: state.userReducer
});

export default connect(mapStateToProps)(Home)
