import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Skeleton from 'react-skeleton-loader';

export class BotItem extends Component {
    static propTypes = {
        data: PropTypes.object
    }
    constructor(props) {
        super(props);
        this.state = {
            name: null,
            description: false,
            created_at: null
        }
    }
    componentDidMount() {
        const { name, description, created_at} = this.props.data;
        setTimeout(() => {
            this.setState({name, description, created_at});
        }, 1000);
    }
    
    render() {
        const { name, description, created_at} = this.state;
        return (
            <div className="grid-item with-border">
                <h2 className="title">{name || <Skeleton/>}</h2>
                <span className="description">{description === false ? <Skeleton/> : description}</span>
                {
                    created_at ? (<div className="timeline"> <b>Đã tạo: </b><span>{created_at}</span> </div>): <Skeleton width="100%"/>
                }
                <button className="btn-action">
                    <span className="icon-bar"></span>
                    <span className="icon-bar"></span>
                    <span className="icon-bar"></span>
                </button>
                <div className="action-menu show">
                    <span>Sửa</span>
                    <span className="color-red">Xoá</span>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    
});

export default connect(mapStateToProps)(BotItem);
