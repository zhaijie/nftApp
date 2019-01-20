/**
 * Created by Administrator on 2019/1/3 0027.
 */
import React from 'react'
import {View, Text, TouchableHighlight, Animated} from "react-native";

import {formViewStyle} from '../../style/formStyle'
import InputComponent from '../component/InputComponent';
import ButtonComponent from '../component/ButtonComponent';
import {updateTradePwd} from '../../api/FormServer';
import {toastShow} from '../../utils/ToastUtil';
import {checkInput, setButtonState, animatedHandle} from '../../utils/Utiil'


export default class TradePasswordView extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            tradePasswordParams: {
                oldPassword: '',
                newPassword: '',
                againNewPassword: ''
            },
            fadeAnim: {
                oldPassword: new Animated.Value(0),
                newPassword: new Animated.Value(0),
                againNewPassword: new Animated.Value(0),
            },
        }
    }

    render() {
        return (
            <View style={[formViewStyle.phoneContainer, {paddingTop: 0}]}>
                <View style={[formViewStyle.inputContent]}>
                    <Animated.Text style={[formViewStyle.inputText,
                        {
                            opacity: this.state.fadeAnim.oldPassword,
                            transform: [{
                                translateY: this.state.fadeAnim.oldPassword.interpolate({
                                    inputRange: [0, 1],
                                    outputRange: [30, 0]
                                })
                            }]
                        }
                    ]}>请输入原交易密码</Animated.Text>
                    <InputComponent
                        password={true} explain="请输入原交易密码"
                        valueChange={(value) => this.inputWatch(value, 'oldPassword')}
                        inputFocus={() => this.fadeIn('oldPassword')} inputBlur={() => this.fadeOut('oldPassword')}/>
                    <Text style={[formViewStyle.inputCode, formViewStyle.codeText]}
                          onPress={() => this.props.navigation.navigate('ForgetTradePwdView')}
                    >忘记交易密码</Text>
                </View>

                <View style={formViewStyle.inputContent}>
                    <Animated.Text style={[formViewStyle.inputText,
                        {
                            opacity: this.state.fadeAnim.newPassword,
                            transform: [{
                                translateY: this.state.fadeAnim.newPassword.interpolate({
                                    inputRange: [0, 1],
                                    outputRange: [30, 0]
                                })
                            }]
                        }
                    ]}>请设置新交易密码</Animated.Text>

                    <InputComponent
                        password={true} explain="请设置新交易密码"
                        valueChange={(value) => this.inputWatch(value, 'newPassword')}
                        inputFocus={() => this.fadeIn('newPassword')} inputBlur={() => this.fadeOut('newPassword')}/>
                </View>

                <View style={formViewStyle.inputContent}>
                    <Animated.Text style={[formViewStyle.inputText,
                        {
                            opacity: this.state.fadeAnim.againNewPassword,
                            transform: [{
                                translateY: this.state.fadeAnim.againNewPassword.interpolate({
                                    inputRange: [0, 1],
                                    outputRange: [30, 0]
                                })
                            }]
                        }
                    ]}>请重复新交易密码</Animated.Text>

                    <InputComponent
                        password={true} explain="请重复新交易密码"
                        valueChange={(value) => this.inputWatch(value, 'againNewPassword')}
                        inputFocus={() => this.fadeIn('againNewPassword')}
                        inputBlur={() => this.fadeOut('againNewPassword')}/>
                </View>


                <ButtonComponent title="重置交易密码" handle={this.submitHandle}
                                 addStyle={[{
                                     borderRadius: 22,
                                     marginTop: 35
                                 }, this.state.buttonState ? '' : formViewStyle.disabledButton]}/>

                <View style={{marginTop: 16}}>
                    <Text>温馨提示</Text>
                    <Text style={{marginTop: 8}}>交易密码必须为6位数字，不可含有字母或符号。</Text>
                </View>
            </View>
        )
    }

    inputWatch = (value, type) => {
        setButtonState.call(this, this.state.tradePasswordParams, value, type);
    };


    fadeIn = (type) => {
        animatedHandle.call(this, 1, type)
    };

    fadeOut = (type) => {
        animatedHandle.call(this, 0, type)
    };

    submitHandle = () => {
        for (let key in this.state.tradePasswordParams) {
            if (!checkInput('tradePwd', this.state.tradePasswordParams[key])) return;
        }

        //判断是否一致
        if (this.state.tradePasswordParams.tradePassword !== this.state.tradePasswordParams.againTradePassword) {
            toastShow('两次交易密码不一致');
            return
        }

        let params = {
            oldPassword: this.state.tradePasswordParams.oldPassword,
            newPassword: this.state.tradePasswordParams.newPassword
        };

        updateTradePwd(params, () => {
            toastShow('修改成功');
            this.props.navigation.goBack()
        })
    }

}