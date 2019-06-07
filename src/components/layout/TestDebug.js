import React, { Component } from 'react';
import { connect } from 'react-redux';
import { HIDE_DEBUG } from '../../constants/bot.constants';
import Scroll from 'simplebar-react';

export class TestDebug extends Component {
    static propTypes = {
        
    }
    componentDidMount() {
        const { selectedBot } = this.props.bot;
        if(selectedBot){
        }
    }
    
    handleClose = () => {
        this.props.dispatch({type: HIDE_DEBUG});
    }
    render() {
        const { selectedBot , showDebug } = this.props.bot;
        if(selectedBot)
            return (
                <section className={`test-debug ${showDebug ? 'show' : ''}`}>
                    <div className="test-head">
                        <span>Dùng thử</span>
                        <button className="close" onClick={this.handleClose}>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                        </button>
                    </div>
                    <div className="test-container">
                        <Scroll className="messages">
                            <div className="messages-item in">
                                <img src="" alt=""/>
                                <span className="text">
                                    Lorem Lorem Lorem Lorem Lorem
                                </span>
                            </div>
                            <div className="messages-item out">
                                <span className="text">
                                    Lorem Lorem Lorem Lorem Lorem
                                </span>
                            </div>
                        </Scroll>
                        <div className="input-message">
                            <i className="fal fa-paper-plane"></i>
                            <input type="text" placeholder="Nhập tin nhắn"/>
                        </div>
                    </div>
                </section>
            )
        return(
            <div></div>
        )
    }
}

const mapStateToProps = (state) => ({
    bot: state.botReducer
});

export default connect(mapStateToProps)(TestDebug);
