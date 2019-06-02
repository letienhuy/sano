import React, { Component } from 'react';
import { ClimbingBoxLoader } from 'react-spinners';

export default class Loading extends Component {
    render() {
        return (
            <div className="loading-fullscreen">
                <ClimbingBoxLoader
                css={`
                    display: block;
                    margin: 0 auto;
                `}
                sizeUnit={"px"}
                size={15}
                color={'#117EBF'}
                loading={true}
                />
            </div>
        )
    }
}
