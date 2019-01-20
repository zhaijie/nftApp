/**
 *  * Created by Administrator on 2018/12/27 0013.
 */
import React from 'react';
import {View, Text, Image, TouchableHighlight, Animated} from "react-native";

import {formViewStyle} from '../../style/formStyle';
import InputComponent from './../component/InputComponent';
import ButtonComponent from './../component/ButtonComponent';

import {api} from '../../api/Http'
import {checkCode} from '../../api/FormServer'
import {checkInput, getCodeUtil, setButtonState, animatedHandle, clearTimer} from '../../utils/Utiil'

let navigation;
export default class ForgetTradePwdView extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            codeParams: {
                phone: '',
                imgCode: '',
                code: ''
            },
            imgCodeUrl: api + '/app/user/imageCode?time=' + new Date().getTime(),
            codeText: '获取验证码',
            buttonState: false, //按钮是否可点
            fadeAnim: {
                phone: new Animated.Value(0),
                imgCode: new Animated.Value(0),
                code: new Animated.Value(0),
            },
        };
    }

    render() {
        navigation = this.props.navigation;
        return (
            <View style={formViewStyle.formBox}>
                <View style={[formViewStyle.inputBox]}>
                    <View style={formViewStyle.inputContent}>
                        <Animated.Text style={[formViewStyle.inputText,
                            {
                                opacity: this.state.fadeAnim.phone,
                                transform: [{
                                    translateY: this.state.fadeAnim.phone.interpolate({
                                        inputRange: [0, 1],
                                        outputRange: [30, 0]
                                    })
                                }]
                            }
                        ]}>手机号码</Animated.Text>

                        <InputComponent
                            explain="请输入手机号码" valueChange={(value) => this.inputWatch(value, 'phone')}
                            inputFocus={() => this.fadeIn('phone')} inputBlur={() => this.fadeOut('phone')}/>
                    </View>

                    <View style={[formViewStyle.inputContent, formViewStyle.marginTop30]}>
                        <Animated.Text style={[formViewStyle.inputText,
                            {
                                opacity: this.state.fadeAnim.imgCode,
                                transform: [{
                                    translateY: this.state.fadeAnim.imgCode.interpolate({
                                        inputRange: [0, 1],
                                        outputRange: [30, 0]
                                    })
                                }]
                            }
                        ]}>请输出图形验证码</Animated.Text>

                        <InputComponent
                            explain="请输出图形验证码" valueChange={(value) => this.inputWatch(value, 'imgCode')}
                            inputFocus={() => this.fadeIn('imgCode')} inputBlur={() => this.fadeOut('imgCode')}/>

                        <TouchableHighlight
                            style={[formViewStyle.inputCode, {marginTop: -42}]} underlayColor={'#fff'}
                            onPress={() => {
                                this.setState({imgCodeUrl: api + '/app/user/imageCode?time=' + new Date().getTime()});
                            }}>
                            <Image source={{uri: this.state.imgCodeUrl}} style={formViewStyle.codeImg}/>
                        </TouchableHighlight>
                    </View>

                    <View style={[formViewStyle.inputContent, formViewStyle.marginTop30]}>
                        <Animated.Text style={[formViewStyle.inputText,
                            {
                                opacity: this.state.fadeAnim.code,
                                transform: [{
                                    translateY: this.state.fadeAnim.code.interpolate({
                                        inputRange: [0, 1],
                                        outputRange: [30, 0]
                                    })
                                }]
                            }
                        ]}>请输入验证码</Animated.Text>

                        <InputComponent
                            explain="请输入验证码" valueChange={(value) => this.inputWatch(value, 'code')}
                            inputFocus={() => this.fadeIn('code')} inputBlur={() => this.fadeOut('code')}/>

                        <Text style={[formViewStyle.inputCode, formViewStyle.codeText]}
                              onPress={this.getCode}>{this.state.codeText}</Text>
                    </View>

                    <View style={formViewStyle.inputContent}>
                        <ButtonComponent title="重置交易密码" handle={this.submitHandle}
                                         addStyle={[{
                                             borderRadius: 22,
                                             marginTop: 25
                                         }, this.state.buttonState ? '' : formViewStyle.disabledButton]}/>
                    </View>
                </View>
            </View>
        )
    }

    //表单提交
    submitHandle = () => {
        for (let key in this.state.codeParams) {
            if (!checkInput(key, this.state.codeParams[key])) return;
        }
        let params = {
            phone: this.state.codeParams.phone,
            type: 3,
            code: this.state.codeParams.code
        };

        checkCode(params, () => {
            clearTimer();
            navigation.navigate('ResetTradePwdView',
                {
                    phone: this.state.codeParams.phone,
                    code: this.state.codeParams.code
                });
        });
    };

    inputWatch = (value, type) => {
        setButtonState.call(this, this.state.codeParams, value, type);
    };

    fadeIn = (type) => {
        animatedHandle.call(this, 1, type)
    };

    fadeOut = (type) => {
        animatedHandle.call(this, 0, type)
    };


    //获取验证码
    getCode = () => {
        //获取请求参数
        if (!checkInput('phone', this.state.codeParams.phone)) return;
        if (!checkInput('imgCode', this.state.codeParams.imgCode)) return;

        let params = {
            phone: this.state.codeParams.phone,
            type: 3,
            imageCode: this.state.codeParams.imgCode
        };

        //获取短信验证码
        getCodeUtil.call(this, params)
    }
}