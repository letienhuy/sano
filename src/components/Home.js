import React, { Component } from 'react';
import { connect } from 'react-redux';
import Sidebar from './layout/sidebar/Sidebar';
import Header from './layout/Header';

export class Home extends Component {

    componentDidMount() {
    }
    
    render() {
        return (
            <div>
                <Header/>
                <Sidebar/>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    auth: state.userReducer
});

export default connect(mapStateToProps)(Home);
