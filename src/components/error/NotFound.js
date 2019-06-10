import React, {Component} from 'react';
import { withRouter, Link } from 'react-router-dom';
import '../../assets/404.css';

class NotFound extends Component {
    render() {
        return (
            <div style={{
                display: 'flex',
                alignItems:'center'
            }}>
                <div className="wrapper-404">
                    <h1 className="h1-404">Hmm.</h1>
                    <p className="p-404">Có vẻ như bạn đã đi nhầm hướng, hãy để chúng tôi đưa bạn về nhà!</p>
                    <div className="buttons">
                        <a className="a-404" style={{cursor: "pointer"}} onClick={() => this.props.history.goBack()}>Trở về</a>
                        <Link className="a-404" to="/">Trang chủ</Link><br/>
                    </div>
                </div>
                <div className="space-404">
                    <div className="blackhole-404"/>
                    <div className="ship-404"/>
                </div>
            </div>
        )
    }
}

export default withRouter(NotFound);