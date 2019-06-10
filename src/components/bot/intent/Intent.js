import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../../layout/Header';
import SidebarBot from '../../layout/sidebar/SidebarBot';
import Scroll from 'simplebar-react';
import Breadcrum from '../../layout/Breadcrum';
import { isEmpty } from 'lodash';
import { fetchIntents } from '../../../actions/intent.action';
import IntentItem from './IntentItem';
import Skeleton from 'react-skeleton-loader';

export class Intent extends Component {
    static propTypes = {
    }
    componentDidMount() {
        const { dispatch } = this.props;
        const { selectedBot } = this.props.bot;
        if(selectedBot){
            dispatch(fetchIntents(selectedBot._id));
        }
    }
    
    render() {
        const { list, cloneList } = this.props.intent;
        return (
            <div>
                <Header/>
                <SidebarBot/>
                <Scroll className="container">
                    <Breadcrum final="KỊCH BẢN"/>
                    <div className="description-alt">
                        <button className="btn">Tạo kịch bản</button>
                    </div>
                    <div className="grid-fluid">
                        {
                            cloneList.map((item, key) => {
                                return(
                                    <div className="col-3" key={key}>
                                        <div className="grid-item with-border">
                                            <Skeleton borderRadius={0} width="100%" height="20px"/>
                                            <Skeleton borderRadius={0} width="100%" height="12px"/>
                                            <hr/>
                                            <Skeleton borderRadius={0} width="100%" height="12px"/>
                                            <Skeleton borderRadius={0} width="100%" height="12px"/>
                                        </div>
                                    </div>
                                )
                            })
                        }
                        {
                            list.map((item, key) => {
                                return(
                                    <div key={key} className="col-3">
                                        <IntentItem item={item}/>
                                    </div>
                                )
                            })
                        }
                    </div>
                </Scroll>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    bot: state.botReducer,
    intent: state.intentReducer
});

export default connect(mapStateToProps)(Intent);
