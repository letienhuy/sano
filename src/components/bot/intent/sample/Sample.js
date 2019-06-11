import React, { Component } from 'react';
import { connect } from 'react-redux';
import Scroll from 'simplebar-react'
import Header from '../../../layout/Header';
import SidebarBot from '../../../layout/sidebar/SidebarBot';
import axios from 'axios';
import * as url from '../../../../constants/url.constants';
import { showLoading, hideLoading } from 'react-redux-loading-bar';
import { Validation } from '../../../../helpers/helper';

export class Sample extends Component {
    constructor(props) {
        super(props);
        this.state = {
            checkAll: false,
            listSamples: [],
            listNewSamples: [],
            listUpdateSamples: [],
            listCheckall: [],
            newSample: '',
            errors: []
        }
        this.validate = new Validation();
    }
    
    componentDidMount(){
        const { selectedIntent } = this.props.intent;
        if(selectedIntent){
            this.fetchListIntentSample((selectedIntent._id));
        }
    }

    async fetchListIntentSample(intentId) {
        let accessToken = localStorage.getItem('accessToken');
        try{
            this.props.dispatch(showLoading());
            const result = await axios.get(url.INTENT_URL+'/'+ intentId + url.FETCH_LIST_INTENT_SAMPLE, {
                headers: {
                    "Authorization": `Bearer ${accessToken}`
                }
            });
            this.setState({listSamples: result.data.data});
        }finally{
            this.props.dispatch(hideLoading());
        }
    }
    handleAddSample = () => {
        const { listSamples, listNewSamples, newSample } = this.state;
        this.setState({errors: null});
        let errors = this.validate.validateAll({name: newSample.trim()}, ["Vui lòng nhập câu kích hoạt"]);
        if(typeof errors === 'object'){
            this.setState({errors});
            return;
        }
        listNewSamples.push(newSample);
        listSamples.unshift({name: newSample});
        this.inputSample.value = '';
        this.setState({listSamples, listNewSamples, newSample : ''});
    }
    hanldeKeyDown = (e) => {
        if(e.keyCode === 13){
            this.handleAddSample();
        }
    }
    handleCheckall = (e) => {
        let doc = document.querySelectorAll('td .checkbox-wrapper input[type="checkbox"]');
        doc.forEach((el) => {
            el.checked = e.target.checked;
        });
    }
    render() {
        const { listSamples, errors } = this.state;
        return (
            <div>
                <Header/>
                <SidebarBot/>
                <Scroll className="container">
                    <div className="description-alt">
                        <div className="form-container">
                            <div className="form-group">
                                <div className="input-group">
                                    <label htmlFor="">Thêm câu kích hoạt</label>
                                    <input type="text" ref={(el) => this.inputSample = el} onChange={() => this.setState({newSample: this.inputSample.value})} onKeyDown={this.hanldeKeyDown}/>
                                    {this.validate.error('name', errors)}
                                </div>
                                <button className="btn" onClick={this.handleAddSample}>Thêm</button>
                            </div>
                        </div>
                    </div>
                    <div className="table">
                        <table cellSpacing="0" cellPadding="0">
                            <thead>
                                <tr>
                                    <th>
                                        <div className="checkbox-wrapper mg-top-0">
                                            <input type="checkbox" id="check-all" onChange={this.handleCheckall}/>
                                            <label htmlFor="check-all">Câu kích hoạt ({listSamples.length})</label>
                                        </div>
                                    </th>
                                    <th>Thời gian</th>
                                </tr>
                            </thead>
                            <tbody>
                                {listSamples.map((item, key) => {
                                    return(
                                        <tr key={key}>
                                            <td>
                                                <div className="checkbox-wrapper mg-top-0">
                                                    <input type="checkbox" data-id={item._id ? item._id : null} id={`checkbox-sample-${key}`}/>
                                                    <label htmlFor={`checkbox-sample-${key}`}></label>
                                                    <span>{item.name}</span>
                                                    <span className="mg-left-10"><i className="fal fa-pencil"></i></span>
                                                </div>
                                            </td>
                                            <td>
                                                {item.updated_at}
                                            </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                </Scroll>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    bot: state.botReducer,
    intent: state.intentReducer,
});
export default connect(mapStateToProps)(Sample);
