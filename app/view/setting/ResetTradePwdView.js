/**
 *  * Created by Administrator on 2018/12/27 0013.
 */
import React from 'react';
import {View, Text, Image, TouchableHighlight, Animated} from "react-native";
import {NavigationActions, StackActions} from 'react-navigation';


import {formViewStyle} from '../../style/formStyle';
import InputComponent from '../component/InputComponent';
import ButtonComponent from '../component/ButtonComponent';
import ModalComponent from '../component/ModalComponent';

import {forgetTradePwd} from '../../api/FormServer'
import {toastShow} from '../../utils/ToastUtil'
import {checkInput, setButtonState, animatedHandle} from '../../utils/Utiil'

let navigation;
export default class ResetTradePwdView extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            resetParams: {
                passWord: '',
                againPassWord: '',
            },
            phone: '',
            code: '',
            buttonState: false, //按钮是否可点
            alertState: false,
            fadeAnim: {
                passWord: new Animated.Value(0),
                againPassWord: new Animated.Value(0),
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
                                opacity: this.state.fadeAnim.passWord,
                                transform: [{
                                    translateY: this.state.fadeAnim.passWord.interpolate({
                                        inputRange: [0, 1],
                                        outputRange: [30, 0]
                                    })
                                }]
                            }
                        ]}>请设置新交易密码</Animated.Text>
                        <InputComponent
                            explain="请设置新交易密码" password={true}
                            valueChange={(value) => this.inputWatch(value, 'passWord')}
                            inputFocus={() => this.fadeIn('passWord')} inputBlur={() => this.fadeOut('passWord')}/>
                    </View>

                    <View style={formViewStyle.inputContent}>
                        <Animated.Text style={[formViewStyle.inputText,
                            {
                                opacity: this.state.fadeAnim.againPassWord,
                                transform: [{
                                    translateY: this.state.fadeAnim.againPassWord.interpolate({
                                        inputRange: [0, 1],
                                        outputRange: [30, 0]
                                    })
                                }]
                            }
                        ]}>请重复新交易密码</Animated.Text>
                        <InputComponent
                            explain="请重复新交易密码" password={true}
                            valueChange={(value) => this.inputWatch(value, 'againPassWord')}
                            inputFocus={() => this.fadeIn('againPassWord')}
                            inputBlur={() => this.fadeOut('againPassWord')}/>

                    </View>

                    <View style={formViewStyle.inputContent}>
                        <ButtonComponent title="确定" handle={this.submitHandle}
                                         addStyle={[{
                                             borderRadius: 22,
                                             marginTop: 25
                                         }, this.state.buttonState ? '' : formViewStyle.disabledButton]}/>
                    </View>

                    <View style={formViewStyle.remindText}>
                        <Text style={formViewStyle.remindTitle}>温馨提示</Text>
                        <Text>交易密码必须设置为6数字，不可含有字母或符号。</Text>
                    </View>

                </View>

                <ModalComponent modalState={this.state.alertState} text="登录" title="重置交易密码成功"/>
            </View>
        )
    }

    //表单提交
    submitHandle = () => {

        if (!checkInput('tradePwd', this.state.resetParams['passWord'])) return;
        if (!checkInput('tradePwd', this.state.resetParams['againPassWord'])) return;

        //判断两次密码是否一致
        if (this.state.resetParams.passWord !== this.state.resetParams.againPassWord) {
            toastShow.show('两次密码不一致');
            return
        }

        let params = {
            phone: navigation.state.params.phone,
            passWord: this.state.resetParams.passWord,
            code: navigation.state.params.code,
        };

        forgetTradePwd(params, () => {
            this.setState({alertState: true});
            setTimeout(() => {
                this.setState({alertState: false});
                navigation.navigate('TradePasswordView');
            }, 3000);
        });
    };

    inputWatch = (value, type) => {
        setButtonState.call(this, this.state.resetParams, value, type);
    };

    //跳转到LoginView
    reSetRouter = () => {
        const resetAction = StackActions.reset({
            index: 0,
            actions: [
                NavigationActions.navigate({routeName: 'LoginView'}),
            ],
        });
        navigation.dispatch(resetAction);
    };

    fadeIn = (type) => {
        animatedHandle.call(this, 1, type)
    };

    fadeOut = (type) => {
        animatedHandle.call(this, 0, type)
    };
}