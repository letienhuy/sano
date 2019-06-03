import React, {Component} from 'react';
import {ClimbingBoxLoader} from 'react-spinners';

export default class Loading extends Component {
    render() {
        return (
            <div className="loading-fullscreen">
                <ClimbingBoxLoader
                    sizeUnit="px"
                    size={15}
                    color="#117EBF"
                    loading={this.props.loading}/>
            </div>
        )
    }
}
