import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import { BOT_NORMAL } from '../../constants/bot.constants';
import { Validation } from '../../helpers/helper';
import Select from 'react-select';
import { createNewBot } from '../../actions/bot.actions';
import { HashLoader } from 'react-spinners';
import { isEqual } from 'lodash';

export class CreateBot extends Component {
    static propTypes = {
        listLanguages: PropTypes.array.isRequired,
        listBuiltIns: PropTypes.array.isRequired,
        listTemplates: PropTypes.array.isRequired,
    }
    constructor(props) {
        super(props);
        this.state = {
            bot: {
                name: null,
                description: null,
                type: null,
                language_id: null,
                builtin_bot_id: null,
                templateBotId: null
            },
            typeOptions: [
                {
                    value: BOT_NORMAL,
                    label: "Bot cơ bản"
                }
            ],
            languageOptions: [],
            templateOptions: [],
            buildInOptions: [],
            errors: null
        }
        this.validate = new Validation();
    }
    componentWillReceiveProps(newProps){
        const { listLanguages, listTemplates } = newProps;
        const { list } = newProps.bot;
        if(!isEqual(list, this.props.bot.list)){
            this.clearFormData();
        }
    
        if(listLanguages.length && listTemplates.length){
            let languageOptions = [];
            let templateOptions = [];
            listLanguages.map((opt) => 
                languageOptions.push({
                    value: opt._id,
                    label: opt.name
                })
            );
            listTemplates.map((opt) => 
                templateOptions.push({
                    value: opt._id,
                    label: opt.name
                })
            );
            this.setState({languageOptions, templateOptions});
        }
    }
    handleNameChange = () => {
        const { bot } = this.state;
        bot.name = this.inputName.value;
        this.setState({bot});
    }
    handleDescChange = () => {
        const { bot } = this.state;
        bot.description = this.inputDesc.value;
        this.setState({bot});
    }
    handleTypeChange = (value) => {
        const { bot } = this.state;
        bot.type = value.value;
        this.setState({bot});
    }
    handleTemplateChange = (value) => {
        const { bot } = this.state;
        bot.templateBotId = value.value;
        this.setState({bot});
    }
    handleLanguageChange = (value) => {
        let buildIn = this.props.listBuiltIns.filter((obj) => { return obj.language_id === value.value });
        let options = [];
        buildIn.map((item) => 
            options.push({
                value: item._id,
                label: item.name
            })
        );
        const { bot } = this.state;
        bot.language_id = value.value;
        bot.builtin_bot_id = null;
        this.buildInSelect.setState({value: null});
        this.setState({
            buildInOptions: options,
            bot: bot
        });
    }
    handleBuildInChange = (value) => {
        const { bot } = this.state;
        bot.builtin_bot_id = value.value;
        this.setState({bot});
    }
    handleSubmit = (event) => {
        event.preventDefault();
        const { bot } = this.state;
        this.setState({errors: null});
        let errors = this.validate.validateAll({
            name: bot.name,
            type: bot.type,
            language_id: bot.language_id,
        }, ["Vui lòng nhập tên trợ lý ảo", "Vui lòng chọn loại", "Vui lòng chọn ngôn ngữ"]);
        if(typeof errors === "object"){
            this.setState({errors});
            return;
        }
        this.props.dispatch(createNewBot(bot));
    }
    clearFormData = () => {
        this.setState({bot: { name: null, description: null, type: null, language_id: null, builtin_bot_id: null, templateBotId: null }});
        this.inputName.value = "";
        this.inputDesc.value = "";
        this.typeSelect.setState({value: null});
        this.templateSelect.setState({value: null});
        this.languageSelect.setState({value: null});
        this.buildInSelect.setState({value: null});
    }
    render() {
        const { loading } = this.props.bot;
        return (
            <div className="form-container">
                <form className="form-group" ref={el => this.formCreate = el} onSubmit={this.handleSubmit}>
                    <div className="input-group">
                        <label htmlFor="name">Tên trợ lý ảo</label>
                        <input type="text" ref={el => this.inputName = el} onChange={this.handleNameChange}/>
                        {this.validate.error('name', this.state.errors)}
                    </div>
                    <div className="input-group">
                        <label htmlFor="name">Mô tả trợ lý</label>
                        <textarea ref={el => this.inputDesc = el} onChange={this.handleDescChange}/>
                    </div>
                    <div className="input-group d-flex">
                        <div className="d-inline-block">
                            <label >
                                Loại
                            </label>
                            <Select ref={el => this.typeSelect = el} options={this.state.typeOptions} onChange={this.handleTypeChange}/>
                            {this.validate.error('type', this.state.errors)}
                        </div>
                        <div className="d-inline-block mg-left-40">
                            <label>
                                Mẫu
                            </label>
                            <Select ref={el => this.templateSelect = el} options={this.state.templateOptions} onChange={this.handleTemplateChange}/>
                        </div>
                    </div>
                    <div className="input-group d-flex">
                        <div className="d-inline-block">
                            <label >
                                Ngôn ngữ
                            </label>
                            <Select ref={el => this.languageSelect = el} options={this.state.languageOptions} onChange={this.handleLanguageChange}/>
                            {this.validate.error('language_id', this.state.errors)}
                        </div>
                        <div className="d-inline-block mg-left-40">
                            <label>
                                Bot tham chiếu
                            </label>
                            <Select ref={el => this.buildInSelect = el} options={this.state.buildInOptions} onChange={this.handleBuildInChange}/>
                        </div>
                    </div>
                    <div className="input-group">
                        <button className="btn">{loading ?
                            <HashLoader
                                sizeUnit={"px"}
                                size={20}
                                color={'#ffffff'}
                                loading={loading}/>
                            : 'Tạo trợ lý ảo mới'}</button>
                    </div>
                </form>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    bot: state.botReducer
});

export default connect(mapStateToProps)(CreateBot);
