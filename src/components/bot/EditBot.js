import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {BOT_NORMAL} from '../../constants/bot.constants';
import { Validation } from '../../helpers/helper';
import Select from 'react-select';
import { editBot } from '../../actions/bot.actions';
import { HashLoader } from 'react-spinners';

export class EditBot extends Component {
    static propTypes = {
        botItem: PropTypes.object.isRequired,
        listLanguages: PropTypes.array.isRequired,
        listBuiltIns: PropTypes.array.isRequired,
    }
    constructor(props) {
        super(props);
        this.state = {
            bot: {
                name: null,
                description: null,
                type: null,
                language_id: null,
                builtin_bot_id: null
            },
            typeOptions: [
                {
                    value: BOT_NORMAL,
                    label: "Bot cơ bản"
                }
            ],
            languageOptions: [],
            builtInOptions: [],
            errors: null
        }
        this.validate = new Validation();
    }

    componentDidMount() {
        const { botItem, listLanguages, listBuiltIns } = this.props;
        let languageOptions = [];
        let builtInOptions = [];
        listLanguages.map((opt) => 
            languageOptions.push({
                value: opt._id,
                label: opt.name
            })
        );
        listBuiltIns.map((opt) => 
            builtInOptions.push({
                value: opt._id,
                label: opt.name
            })
        );
        this.setState({bot: JSON.parse(JSON.stringify(botItem)), languageOptions, builtInOptions});
        this.inputName.value = botItem.name;
        this.inputDesc.value = botItem.description;
        this.typeSelect.setState({value: this.state.typeOptions.filter((obj) => obj.value === botItem.type)});
        this.languageSelect.setState({value: languageOptions.filter((obj) => obj.value === botItem.language_id)});
        this.builtInSelect.setState({value: builtInOptions.filter((obj) => obj.value === botItem.builtin_bot_id)});
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
    handleTemplateChange = (value) => {
        const { bot } = this.state;
        bot.templateBotId = value.value;
        this.setState({bot});
    }
    handleLanguageChange = (value) => {
        let builtIn = this.props.listBuiltIns.filter((obj) => { return obj.language_id === value.value });
        let options = [];
        builtIn.map((item) => 
            options.push({
                value: item._id,
                label: item.name
            })
        );
        const { bot } = this.state;
        bot.language_id = value.value;
        bot.builtin_bot_id = null;
        this.builtInSelect.setState({value: null});
        this.setState({
            builtInOptions: options,
            bot: bot
        });
    }
    handleBuiltInChange = (value) => {
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
        this.props.dispatch(editBot(bot));
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
                            <Select isDisabled={true}/>
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
                            <Select ref={el => this.builtInSelect = el} options={this.state.builtInOptions} onChange={this.handleBuiltInChange}/>
                        </div>
                    </div>
                    <div className="input-group">
                        <button className="btn">{loading ?
                            <HashLoader
                                sizeUnit={"px"}
                                size={20}
                                color={'#ffffff'}
                                loading={loading}/>
                            : 'Lưu thay đổi'}</button>
                    </div>
                </form>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    bot: state.botReducer
});

export default connect(mapStateToProps)(EditBot);
