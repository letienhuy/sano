import React, { Component } from 'react';
import { connect } from 'react-redux';
import {BrowserRouter as Router, Link} from 'react-router-dom';
import Header from '../layouts/Header';
import Sidebar from '../layouts/Sidebar';

export class Bot extends Component {

    componentDidMount() {
    }
    render() {
        return (
            <div>
                <Header/>
                <Sidebar/>
                <section className="container">
                    
                </section>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    auth: state.userReducer
});

export default connect(mapStateToProps)(Bot);
