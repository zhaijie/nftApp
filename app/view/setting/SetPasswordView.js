/**
 * Created by Administrator on 2019/1/3 0027.
 */
import React from 'react'
import {View, Text, Animated} from "react-native";

import {formViewStyle} from '../../style/formStyle'
import InputComponent from '../component/InputComponent';
import ButtonComponent from '../component/ButtonComponent';
import {checkInput, setButtonState, animatedHandle, setRoot} from '../../utils/Utiil'
import {toastShow} from '../../utils/ToastUtil'
import StorageUtil from '../../utils/StorageUtil'
import {updatePwd} from '../../api/FormServer'

export default class SetPasswordView extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            passwordParams: {
                oldPassword: '',
                newPassword: '',
                againNewPassword: ''
            },
            fadeAnim: {
                oldPassword: new Animated.Value(0),
                newPassword: new Animated.Value(0),
                againNewPassword: new Animated.Value(0),
            },
            buttonState: false
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
                    ]}>请输入原登录密码</Animated.Text>
                    <InputComponent
                        explain="请输入原登录密码" password={true}
                        valueChange={(value) => this.inputWatch(value, 'oldPassword')}
                        inputFocus={() => this.fadeIn('oldPassword')} inputBlur={() => this.fadeOut('oldPassword')}/>
                    <Text
                        style={[formViewStyle.inputCode, formViewStyle.codeText]}
                        onPress={() => this.props.navigation.navigate('ForgetPasswordView')}
                    >
                        忘记密码
                    </Text>
                </View>

                <View style={[formViewStyle.inputContent, formViewStyle.marginTop30]}>
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
                    ]}>请设置新登录密码</Animated.Text>

                    <InputComponent
                        explain="请设置新登录密码" password={true}
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
                    ]}>请重复新登录密码</Animated.Text>

                    <InputComponent
                        explain="请重复新登录密码" password={true}
                        valueChange={(value) => this.inputWatch(value, 'againNewPassword')}
                        inputFocus={() => this.fadeIn('againNewPassword')}
                        inputBlur={() => this.fadeOut('againNewPassword')}/>
                </View>


                <ButtonComponent title="重置登录密码" handle={this.submitHandle}
                                 addStyle={[{
                                     borderRadius: 22,
                                     marginTop: 35
                                 }, this.state.buttonState ? '' : formViewStyle.disabledButton]}/>

                <View style={{marginTop: 16}}>
                    <Text>温馨提示</Text>
                    <Text style={{marginTop: 8}}>登录密码必须设置为6~12位，可由数字、字母或符号组成。</Text>
                </View>
            </View>
        )
    }

    inputWatch = (value, type) => {
        setButtonState.call(this, this.state.passwordParams, value, type);
    };


    fadeIn = (type) => {
        animatedHandle.call(this, 1, type)
    };

    fadeOut = (type) => {
        animatedHandle.call(this, 0, type)
    };

    submitHandle = () => {
        for (let key in this.state.passwordParams) {
            if (!checkInput('passWord', this.state.passwordParams[key])) return;
        }

        //判断是否一致
        if (this.state.passwordParams.newPassword !== this.state.passwordParams.againNewPassword) {
            toastShow('两次密码不一致');
            return
        }

        let params = {
            oldPassword: this.state.passwordParams.oldPassword,
            newPassword: this.state.passwordParams.newPassword
        };

        updatePwd(params, () => {
            toastShow('修改成功,请重新登录');
            StorageUtil.clear();
            this.props.navigation.dispatch(setRoot('LoginView'));
        });
    }

}