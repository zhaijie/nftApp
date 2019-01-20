/**
 * Created by Administrator on 2019/1/3 0027.
 */
import React from 'react'
import {View, Text, Animated} from "react-native";

import {formViewStyle} from '../../style/formStyle'
import InputComponent from '../component/InputComponent';
import ButtonComponent from '../component/ButtonComponent';
import {updatePhone} from '../../api/FormServer'
import {toastShow} from '../../utils/ToastUtil'
import StorageUtil from '../../utils/StorageUtil'
import {checkInput, getCodeUtil, setButtonState, animatedHandle, setRoot, clearTimer} from '../../utils/Utiil'


export default class ChangePhoneView extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            phoneParams: {
                newPhone: '',
                code: ''
            },
            fadeAnim: {
                newPhone: new Animated.Value(0),
                code: new Animated.Value(0),
            },
            codeText: '获取验证码',
        }
    }

    render() {
        return (
            <View style={[formViewStyle.phoneContainer, {paddingTop: 0}]}>
                <View style={formViewStyle.inputContent}>
                    <Animated.Text style={[formViewStyle.inputText,
                        {
                            opacity: this.state.fadeAnim.newPhone,
                            transform: [{
                                translateY: this.state.fadeAnim.newPhone.interpolate({
                                    inputRange: [0, 1],
                                    outputRange: [30, 0]
                                })
                            }]
                        }
                    ]}>请输入手机号码</Animated.Text>

                    <InputComponent
                        explain="请输入手机号码" valueChange={(value) => this.inputWatch(value, 'newPhone')}
                        inputFocus={() => this.fadeIn('newPhone')} inputBlur={() => this.fadeOut('newPhone')}/>
                </View>

                <View style={[formViewStyle.inputContent]}>
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

                <ButtonComponent title="确定" handle={this.submitHandle}
                                 addStyle={[{
                                     marginTop: 35
                                 }, this.state.buttonState ? '' : formViewStyle.disabledButton]}/>

            </View>
        )
    }

    inputWatch = (value, type) => {
        setButtonState.call(this, this.state.phoneParams, value, type);
    };


    fadeIn = (type) => {
        animatedHandle.call(this, 1, type)
    };

    fadeOut = (type) => {
        animatedHandle.call(this, 0, type)
    };

    //获取验证码
    getCode = () => {
        if (!checkInput('phone', this.state.phoneParams.newPhone)) return;
        let params = {
            phone: this.state.phoneParams.newPhone,
            type: 5,
        };

        //获取短信验证码
        getCodeUtil.call(this, params)
    };

    submitHandle = () => {
        if (!checkInput('phone', this.state.phoneParams.newPhone)) return;
        if (!checkInput('code', this.state.phoneParams.code)) return;

        let params = {
            oldPhone: this.props.navigation.state.params.oldPhone,
            newPhone: this.state.phoneParams.newPhone,
            code: this.state.phoneParams.code
        };

        updatePhone(params, () => {
            clearTimer();
            toastShow('修改成功, 请重新登录');
            StorageUtil.clear();
            this.props.navigation.dispatch(setRoot('LoginView'))
        })
    }

}