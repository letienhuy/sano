import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { SHOW_DEBUG } from '../../constants/bot.constants';

export class Breadcrum extends Component {
    static propTypes = {
        breadcrum: PropTypes.array,
        final: PropTypes.string.isRequired
    }
    handleShowDebug = () => {
        this.props.dispatch({type: SHOW_DEBUG});
    }
    render() {
        return (
            <div className="breadcrum">
                <ul className="breadcrum-wrap">
                    <li>
                        <Link to="/">Trang chủ</Link>
                    </li>
                    <li>
                        <Link to="/bot">Trợ lý ảo</Link>
                    </li>
                    {
                        this.props.breadcrum ?
                        this.breadcrum.map((item, key) => {
                            return (
                                <li key={key}>
                                    <Link to={item.url}>{item.title}</Link>
                                </li>
                            )
                        })
                        :null
                    }
                    <li>
                        <span>{this.props.final}</span>
                    </li>
                </ul>
                <div className="use-trial">
                    <button className="btn btn-gradient" onClick={this.handleShowDebug}>Dùng thử</button>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    bot: state.botReducer
});

export default connect(mapStateToProps)(Breadcrum);
