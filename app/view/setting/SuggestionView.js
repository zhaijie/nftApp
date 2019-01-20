/**
 * Created by Administrator on 2019/1/5 0005.
 */
import React from 'react';
import {View, Text, TextInput} from "react-native";

import {suggestionStyle} from '../../style/settingStyle'
import ButtonComponent from "../component/ButtonComponent";
import {toastShow} from '../../utils/ToastUtil'
import {addSuggestion} from '../../api/SuggestionServer'

export default class SuggestionView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            suggestionValue: '',
            contact: ''
        };
    }

    render() {
        return (
            <View>
                <View style={suggestionStyle.topBg}/>

                <View style={{paddingHorizontal: 16}}>
                    <View style={suggestionStyle.inputBox}>
                        <TextInput style={suggestionStyle.suggestionInput}
                                   placeholder="请输入您的宝贵意见，我们将不断改进!"
                                   maxLength={100}
                                   underlineColorAndroid='transparent'
                                   multiline={true}
                                   numberOfLines={8}

                                   onChangeText={(value) => this.setState({suggestionValue: value})}
                        />
                    </View>

                    <TextInput style={suggestionStyle.contactInput}
                               placeholder="请留下您的手机号/邮箱/QQ(选填)"
                               underlineColorAndroid='transparent'
                               onChangeText={value => this.state.contact = value}
                    />

                    <ButtonComponent title="提交意见" handle={this.submitSuggestion}/>

                    <ButtonComponent title="我的反馈"
                                     addStyle={suggestionStyle.goListBtn}
                                     color='#188C3F'
                                     handle={() => this.props.navigation.navigate('SuggestionListView')}
                    />
                </View>
            </View>
        )
    }

    submitSuggestion = () => {
        console.warn(this.state.suggestionValue);
        if (!this.state.suggestionValue) {
            toastShow('请输入您的宝贵意见');
            return
        }

        let params = {
            content: this.state.suggestionValue,
            contact: ''
        };
        addSuggestion(params, () => {
            toastShow('感谢您的宝贵意见');
            this.props.navigation.goBack()
        })


    }

}