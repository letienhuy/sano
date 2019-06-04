import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

export class CreateBot extends Component {
    componentDidMount() {
    }
    render() {
        return (
            <div className="form-container">
                <form className="form-group">
                    <div className="input-group">
                        <label htmlFor="name">Tên bot</label>
                        <input type="text"/>
                    </div>
                    <div className="input-group">
                        <label htmlFor="name">Mô tả bot</label>
                        <textarea name="name" defaultValue={""}/>
                    </div>
                    <div className="input-group">
                        <div className="selectbox mg-right-30">
                            <select>
                                <option value="value">Item 1</option>
                                <option value="value">Item 2</option>
                                <option value="value">Item 3</option>
                            </select>
                            <i className="fal fa-chevron-down"/>
                        </div>
                        <div className="selectbox">
                            <select>
                                <option value="value">Item 1</option>
                                <option value="value">Item 2</option>
                                <option value="value">Item 3</option>
                            </select>
                            <i className="fal fa-chevron-down"/>
                        </div>
                    </div>
                    <div className="input-group">
                        <div className="selectbox mg-right-30">
                            <select>
                                <option value="value">Item 1</option>
                                <option value="value">Item 2</option>
                                <option value="value">Item 3</option>
                            </select>
                            <i className="fal fa-chevron-down"/>
                        </div>
                        <div className="selectbox">
                            <select>
                                <option value="value">Item 1</option>
                                <option value="value">Item 2</option>
                                <option value="value">Item 3</option>
                            </select>
                            <i className="fal fa-chevron-down"/>
                        </div>
                    </div>
                    <div className="input-group">
                        <button className="btn">Tạo bot mới</button>
                    </div>
                </form>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({

});

export default connect(mapStateToProps)(CreateBot);
