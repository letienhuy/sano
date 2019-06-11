import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Validation } from '../../../helpers/helper';
import { HashLoader } from 'react-spinners';
import { createIntent } from '../../../actions/intent.action';

export class CreateIntent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            intent: {
                name: null,
                description: null,
                bot_id: null,
                domain_id: null
            },
            errors: []
        }
        this.validate = new Validation();
    }
    
    handleSubmit = (e) => {
        e.preventDefault();
        const { intent } = this.state;
        const { selectedBot } = this.props.bot;
        this.setState({errors: null});
        let errors = this.validate.validateAll({
            name: intent.name,
        }, ["Vui lòng nhập tên kịch bản"]);
        if(typeof errors === "object"){
            this.setState({errors});
            return;
        }
        intent.bot_id = selectedBot._id;
        this.props.dispatch(createIntent(intent));
    }
    handleNameChange = () => {
        const { intent } = this.state;
        intent.name = this.inputName.value.trim();
        this.setState({intent});
    }
    handleDescChange = () => {
        const { intent } = this.state;
        intent.description = this.inputDesc.value;
        this.setState({intent});
    }

    render() {
        const { loading } = this.props.intent;
        return (
            <div className="form-container">
                <form className="form-group" ref={el => this.formCreate = el} onSubmit={this.handleSubmit}>
                    <div className="input-group">
                        <label htmlFor="name">Tên kịch bản</label>
                        <input type="text" ref={el => this.inputName = el} onChange={this.handleNameChange}/>
                        {this.validate.error('name', this.state.errors)}
                    </div>
                    <div className="input-group">
                        <label htmlFor="name">Mô tả kịch bản</label>
                        <input ref={el => this.inputDesc = el} onChange={this.handleDescChange}/>
                    </div>
                    <div className="input-group">
                        <button className="btn">{loading ?
                            <HashLoader
                                sizeUnit={"px"}
                                size={20}
                                color={'#ffffff'}
                                loading={loading}/>
                            : 'Tạo kịch bản'}</button>
                    </div>
                </form>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    bot: state.botReducer,
    intent: state.intentReducer,
});

export default connect(mapStateToProps)(CreateIntent);
