/**
 * Created by Administrator on 2019/1/3 0027.
 */
import React from 'react'
import {View, Text, TouchableHighlight, Animated} from "react-native";

import {formViewStyle} from '../../style/formStyle'
import InputComponent from '../component/InputComponent';
import ButtonComponent from '../component/ButtonComponent';
import {checkInput, getCodeUtil, setButtonState, animatedHandle, clearTimer} from '../../utils/Utiil'
import StorageUtil from '../../utils/StorageUtil'
import {toastShow} from '../../utils/ToastUtil'
import {checkCode} from '../../api/FormServer'

let userInfo;
export default class PhoneView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            phoneParams: {
                code: ''
            },
            fadeAnim: {
                code: new Animated.Value(0),
            },
            codeText: '获取验证码',
            phone: '',
        }
    }

    componentWillMount() {
        StorageUtil.getItem('userInfo').then((data) => {
            userInfo = JSON.parse(data);
            this.setState({phone: userInfo.account});

        })
    }

    render() {
        return (
            <View style={formViewStyle.phoneContainer}>

                <Text>已绑定手机号</Text>
                <Text style={formViewStyle.phone}>{this.state.phone}</Text>

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

                <ButtonComponent title="下一步" handle={this.submitHandle}
                                 addStyle={[{
                                     borderRadius: 22,
                                     marginTop: 35
                                 }, this.state.buttonState ? '' : formViewStyle.disabledButton]}/>

                <Text style={{marginTop: 16}}>
                    如更换手机号码已停用，
                    <Text style={formViewStyle.protocolTitle}
                          onPress={this.goChangePhone }>请点击这里更换</Text>
                </Text>

            </View>
        )
    }

    goChangePhone = () => {
        if (userInfo.isAuthority === '1') {
            toastShow('请先实名认证');
        } else {
            this.props.navigation.navigate('ChangePhoneView')
        }
    };

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
        let params = {
            phone: this.state.phone,
            type: 4,
        };

        //获取短信验证码
        getCodeUtil.call(this, params)
    };

    submitHandle = () => {
        if (!checkInput('code', this.state.phoneParams.code)) return;

        let params = {
            phone: this.state.phone,
            type: 4,
            code: this.state.phoneParams.code
        };
        checkCode(params, () => {
            this.props.navigation.navigate('ChangePhoneView', {oldPhone: this.state.phone});
            clearTimer()
        });
    }

}