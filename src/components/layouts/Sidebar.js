import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {Link, withRouter} from 'react-router-dom';
import { route, setActive } from '../../routes';

export class Sidebar extends Component {
    componentDidMount(){
        
    }
    
    render() {
        return (
            <section className="sidebar">
                <div className="sidebar-wrap">
                    <ul className="sidebar-container">
                        <li className={setActive('home')}>
                            <i className="fal fa-home"></i>
                            <Link to={route('home')}>Trang chủ</Link>
                        </li>
                        <li  className={setActive('bot')}>
                            <i className="fal fa-tire"></i>
                            <Link to={route('bot')}>Trợ lý ảo GeniX</Link>
                        </li>
                        <li  className={setActive('analytic')}>
                            <i className="fal fa-chart-line"></i>
                            <Link to={route('analytic')}>Thống kê dữ liệu</Link>
                        </li>
                    </ul>
                </div>
            </section>
        )
    }
}

const mapStateToProps = (state) => ({
    auth: state.userReducer,
    bot: state.botReducer,
});

export default withRouter(connect(mapStateToProps)(Sidebar));
