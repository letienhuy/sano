import React, { Component } from 'react';
import { HashLoader } from 'react-spinners';

export default class BtnLoading extends Component {
    render() {
        return (
            <HashLoader
                sizeUnit={"px"}
                size={20}
                color={'#ffffff'}
                loading={this.props.loading}
            />
        )
    }
}
