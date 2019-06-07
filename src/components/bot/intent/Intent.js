import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../../layout/Header';
import SidebarBot from '../../layout/sidebar/SidebarBot';
import Scroll from 'simplebar-react';
import Breadcrum from '../../layout/Breadcrum';

export class Intent extends Component {
    static propTypes = {
    }

    render() {
        return (
            <div>
                <Header/>
                <SidebarBot/>
                <Scroll className="container">
                    <Breadcrum final="KỊCH BẢN"/>
                    <div className="description-alt">
                        <button className="btn">Tạo kịch bản</button>
                    </div>
                </Scroll>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    bot: state.botReducer
});

export default connect(mapStateToProps)(Intent);
