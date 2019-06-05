import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {BOT_BUILTIN, BOT_NORMAL, BOT_TEMPLATE} from '../../constants/bot.constants';
import * as API from '../../helpers/API';
import { Validation } from '../../helpers/helper';
import Select from 'react-select';
import { createNewBot } from '../../actions/bot.actions';
import { HashLoader } from 'react-spinners';

export class CreateBot extends Component {
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
            listLanguages: [],
            listTemplates: [],
            listBuildIns: [],
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

    componentDidMount() {
        this.fetchListLanguage();
        this.fetchListTemplate(BOT_TEMPLATE);
        this.fetchListBuildIn(BOT_BUILTIN);
    }
    fetchListLanguage = async () => {
        try {
            const data = await API.fetchListLanguage();
            let options = [];
            data.data.data.map((opt) => {
                options.push({
                    value: opt._id,
                    label: opt.name
                });
            });
            this.setState({listLanguages: data.data.data, languageOptions: options});
        } catch (e) {}
    }
    fetchListTemplate = async (template) => {
        try {
            const data = await API.fetchListTemplate(template);
            let options = [{
                value: "",
                label: "Chọn bot mẫu"
            }];
            data.data.data.map((opt) => {
                options.push({
                    value: opt._id,
                    label: opt.name
                });
            });
            this.setState({listTemplates: data.data.data, templateOptions: options});
        } catch (e) {}
    }
    fetchListBuildIn = async (template) => {
        try {
            const data = await API.fetchListTemplate(template);
            this.setState({listBuildIns: data.data.data})
        } catch (e) {}
    }
    handleLanguageChange = (value) => {
        let buildIn = this.state.listBuildIns.filter((obj) => { return obj.language_id === value.value });
        let options = [
            {
                value: "",
                label: "Chọn bot tham chiếu"
            }
        ];
        buildIn.map((item) => {
            options.push({
                value: item._id,
                label: item.name
            });
        });
        this.state.bot.language_id = value.value;
        this.setState({
            buildInOptions: options
        });
    }
    handleSubmit = (event) => {
        event.preventDefault();
        this.setState({errors: null});
        let errors = this.validate.validateAll({
            name: this.state.bot.name,
            type: this.state.bot.type,
            language_id: this.state.bot.language_id,
        }, ["Vui lòng nhập tên trợ lý ảo", "Vui lòng chọn kiểu trợ lý", "Vui lòng chọn ngôn ngữ"]);
        if(typeof errors === "object"){
            this.setState({errors});
            return;
        }
        this.botDesc.value = "";
        this.botName.value = "";
        this.props.dispatch(createNewBot(this.state.bot));
    }
    render() {
        const { loading } = this.props.bot;
        return (
            <div className="form-container">
                <form className="form-group" onSubmit={this.handleSubmit}>
                    <div className="input-group">
                        <label htmlFor="name">Tên trợ lý ảo</label>
                        <input type="text" ref={el => this.botName = el} onChange={(e) => this.state.bot.name = e.target.value}/>
                        {this.validate.error('name', this.state.errors)}
                    </div>
                    <div className="input-group">
                        <label htmlFor="name">Mô tả trợ lý</label>
                        <textarea onChange={(e) => this.state.bot.description = e.target.value} ref={el => this.botDesc = el}/>
                    </div>
                    <div className="input-group d-flex">
                        <div className="d-inline-block">
                            <label >
                                Loại
                            </label>
                            <Select options={this.state.typeOptions} onChange={(e) => this.state.bot.type = e.value}/>
                            {this.validate.error('type', this.state.errors)}
                        </div>
                        <div className="d-inline-block mg-left-40">
                            <label>
                                Mẫu
                            </label>
                            <Select options={this.state.templateOptions} onChange={(e) => this.state.bot.templateBotId = e.value}/>
                        </div>
                    </div>
                    <div className="input-group d-flex">
                        <div className="d-inline-block">
                            <label >
                                Ngôn ngữ
                            </label>
                            <Select options={this.state.languageOptions} onChange={this.handleLanguageChange}/>
                            {this.validate.error('language_id', this.state.errors)}
                        </div>
                        <div className="d-inline-block mg-left-40">
                            <label>
                                Bot tham chiếu
                            </label>
                            <Select options={this.state.buildInOptions} onChange={(e) => this.state.bot.builtin_bot_id = e.value}/>
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
