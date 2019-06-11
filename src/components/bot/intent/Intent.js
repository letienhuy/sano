import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../../layout/Header';
import SidebarBot from '../../layout/sidebar/SidebarBot';
import Scroll from 'simplebar-react';
import Breadcrum from '../../layout/Breadcrum';
import { fetchIntents } from '../../../actions/intent.action';
import Skeleton from 'react-skeleton-loader';
import IntentItem from './IntentItem';
import Modal from '../../layout/Modal';
import CreateIntent from './CreateIntent';
import {isEmpty} from 'lodash';

export class Intent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isToggleCreate: false,
        }
    }
    
    componentDidMount() {
        const { dispatch } = this.props;
        const { selectedBot } = this.props.bot;
        const { list } = this.props.intent;
        if(selectedBot && isEmpty(list)){
            dispatch(fetchIntents(selectedBot._id));
        }
    }
    componentWillReceiveProps(nextProps){
        
    }
    render() {
        const { isToggleCreate } = this.state;
        const { list, cloneList } = this.props.intent;
        return (
            <div>
                <Header/>
                <SidebarBot/>
                <Scroll className="container">
                    <Breadcrum final="KỊCH BẢN"/>
                    <div className="description-alt">
                        <button className="btn" onClick={() => this.setState({isToggleCreate: true})}>Tạo kịch bản</button>
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
                <Modal
                    isToggle={isToggleCreate}
                    onClose={() => this.setState({isToggleCreate: false})}
                    title="Tạo kịch bản mới">
                    <CreateIntent/>
                </Modal>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    bot: state.botReducer,
    intent: state.intentReducer
});

export default connect(mapStateToProps)(Intent);
