/**
 * Created by Administrator on 2018/12/27 0013.
 */
import React from 'react';
import {View, Text, Image, TouchableHighlight, Animated} from "react-native";

import {formViewStyle} from '../style/formStyle';
import InputComponent from './component/InputComponent';
import ButtonComponent from './component/ButtonComponent';
import ModalComponent from './component/ModalComponent';

import {api} from '../api/Http'
import {register} from '../api/FormServer'
import {checkInput, getCodeUtil, setButtonState, animatedHandle, clearTimer} from '../utils/Utiil'

let navigation;
export default class RegisterView extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            registerParams: {
                account: '',
                code: '',
                passWord: '',
                imgCode: '',
            },
            userCode: '', //邀请码
            imgCodeUrl: api + '/app/user/imageCode?time=' + new Date().getTime(),
            codeText: '获取验证码',
            buttonState: false, //按钮是否可点
            seeState: true, //明文状态
            alertState: false,
            fadeAnim: {
                account: new Animated.Value(0),
                passWord: new Animated.Value(0),
                imgCode: new Animated.Value(0),
                code: new Animated.Value(0),
                inviteCode: new Animated.Value(0)
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
                                opacity: this.state.fadeAnim.account,
                                transform: [{
                                    translateY: this.state.fadeAnim.account.interpolate({
                                        inputRange: [0, 1],
                                        outputRange: [30, 0]
                                    })
                                }]
                            }
                        ]}>请输入手机号码</Animated.Text>

                        <InputComponent
                            explain="请输入手机号码" valueChange={(value) => this.inputWatch(value, 'account')}
                            inputFocus={() => this.fadeIn('account')} inputBlur={() => this.fadeOut('account')}/>
                    </View>

                    <View style={formViewStyle.inputContent}>
                        <Animated.Text style={[formViewStyle.inputText,
                            {
                                opacity: this.state.fadeAnim.passWord,
                                transform: [{
                                    translateY: this.state.fadeAnim.passWord.interpolate({
                                        inputRange: [0, 1],
                                        outputRange: [30, 0]
                                    })
                                }]
                            }
                        ]}>请输入6-12位登录密码</Animated.Text>

                        <InputComponent
                            explain="请输入6-12位登录密码" password={this.state.seeState}
                            valueChange={(value) => this.inputWatch(value, 'passWord')}
                            inputFocus={() => this.fadeIn('passWord')} inputBlur={() => this.fadeOut('passWord')}/>

                        <TouchableHighlight
                            style={[formViewStyle.seeImg, this.state.seeState ? '' : formViewStyle.isSeeImg]}
                            underlayColor={'#fff'} onPress={() => {
                            this.setState({seeState: !this.state.seeState});
                        }}>
                            <Image style={{width: 16, height: this.state.seeState ? 8 : 16}}
                                   source={this.state.seeState ? require('../image/icon_see_no.png') : require('../image/icon_see_ok.png')}/>
                        </TouchableHighlight>
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


                    <View style={[formViewStyle.inputContent, formViewStyle.marginTop30]}>
                        <Animated.Text style={[formViewStyle.inputText,
                            {
                                opacity: this.state.fadeAnim.inviteCode,
                                transform: [{
                                    translateY: this.state.fadeAnim.inviteCode.interpolate({
                                        inputRange: [0, 1],
                                        outputRange: [30, 0]
                                    })
                                }]
                            }
                        ]}>请输入邀请码(选填)</Animated.Text>
                        <InputComponent
                            explain="请输入邀请码(选填)" valueChange={(value) => this.state.userCode = value}
                            inputFocus={() => this.fadeIn('inviteCode')} inputBlur={() => this.fadeOut('inviteCode')}/>
                    </View>


                    <View style={formViewStyle.inputContent}>
                        <ButtonComponent title="注册" handle={this.submitHandle}
                                         addStyle={[{
                                             marginBottom: 17
                                         }, this.state.buttonState ? '' : formViewStyle.disabledButton]}/>

                        <Text>
                            点击注册即同意
                            <Text style={formViewStyle.protocolTitle}>《农富通注册协议》</Text>
                        </Text>

                    </View>
                </View>

                <ModalComponent modalState={this.state.alertState} text="登录" title="恭喜您注册成功"/>
            </View>
        )
    }

    //表单提交
    submitHandle = () => {
        let params = {};
        for (let key in this.state.registerParams) {
            if (!checkInput(key, this.state.registerParams[key])) return;
            params[key] = this.state.registerParams[key];
        }

        params.userCode = this.state.userCode;
        register(params, () => {
            this.setState({alertState: true});
            setTimeout(() => {
                this.setState({alertState: false});
                clearTimer();
                navigation.goBack();
            }, 3100);
        })
    };

    inputWatch = (value, type) => {
        setButtonState.call(this, this.state.registerParams, value, type);
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
        if (!checkInput('phone', this.state.registerParams.account)) return;
        if (!checkInput('imgCode', this.state.registerParams.imgCode)) return;

        let params = {
            phone: this.state.registerParams.account,
            type: 1,
            imageCode: this.state.registerParams.imgCode
        };

        //获取短信验证码
        getCodeUtil.call(this, params)
    }
}