import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import { Redirect } from 'react-router-dom';
import Header from '../layouts/Header';
import { login } from '../../actions/user.actions';
import { HashLoader } from 'react-spinners';

export class Login extends Component {
    static propTypes = {}
    componentDidMount() {}

    handleSubmit = (event) => {
        event.preventDefault();
        const {dispatch} = this.props;
        dispatch(login(this.nameInput.value, this.passwordInput.value));
    }
    render() {
        const {user, accessToken, loading, message, error} = this.props.auth;
        if (user && accessToken) {
            return <Redirect to="/"/>
        }
        return (
            <div>
                <Header className="bg-black" hideToggle={true}/>
                <div className="container">
                    <div className="login">
                        <div className="login-wrap">
                            <div className="login-form">
                                <div className="form-container">
                                    <h1 className="form-heading">
                                        <span>Login to Genix</span>
                                    </h1>
                                    <form ref={(el) => this.loginForm = el} onSubmit={this.handleSubmit}>
                                        <span
                                            style={{
                                                color: error
                                                    ? "red"
                                                    : "green"
                                            }}>{message}</span>
                                        <div className="input-container">
                                            <label htmlFor="username">Tài khoản</label>
                                            <input
                                                type="text"
                                                ref={(el) => this.nameInput = el}
                                                placeholder="Tài khoản hoặc email"/>
                                        </div>
                                        <div className="input-container">
                                            <label htmlFor="password">Mật khẩu</label>
                                            <input
                                                type="password"
                                                ref={(el) => this.passwordInput = el}
                                                placeholder="Mật khẩu"/>
                                        </div>
                                        <div className="checkbox-wrapper">
                                            <input type="checkbox" id="checkbox"/>
                                            <label htmlFor="checkbox">
                                                <span>Nhớ tài khoản?</span>
                                            </label>
                                        </div>
                                        <button className="btn login-btn">
                                            {
                                                loading
                                                    ? <HashLoader
                                                            sizeUnit={"px"}
                                                            size={20}
                                                            color={'#ffffff'}
                                                            loading={loading}
                                                        />
                                                    : "Đăng nhập"
                                            }
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    auth: state.userReducer
});

export default connect(mapStateToProps)(Login);
