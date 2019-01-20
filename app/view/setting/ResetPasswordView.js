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

import {forgetPwd} from '../../api/FormServer'
import {toastShow} from '../../utils/ToastUtil'
import {checkInput, setButtonState, animatedHandle, setRoot} from '../../utils/Utiil'

let navigation;
export default class ResetPasswordView extends React.Component {

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
            seeState: true, //密文状态
            againSeeState: true,
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
                        ]}>请设置新登录密码</Animated.Text>
                        <InputComponent
                            explain="请设置新登录密码" password={this.state.seeState}
                            valueChange={(value) => this.inputWatch(value, 'passWord')}
                            inputFocus={() => this.fadeIn('passWord')} inputBlur={() => this.fadeOut('passWord')}/>

                        <TouchableHighlight
                            style={[formViewStyle.seeImg, this.state.seeState ? '' : formViewStyle.isSeeImg]}
                            underlayColor={'#fff'} onPress={() => {
                            this.setState({seeState: !this.state.seeState});
                        }}
                        >
                            <Image style={{width: 16, height: this.state.seeState ? 8 : 16}}
                                   source={this.state.seeState ? require('../../image/icon_see_no.png') : require('../../image/icon_see_ok.png')}/>
                        </TouchableHighlight>
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
                            explain="请重复新交易密码" password={this.state.againSeeState}
                            valueChange={(value) => this.inputWatch(value, 'againPassWord')}
                            inputFocus={() => this.fadeIn('againPassWord')}
                            inputBlur={() => this.fadeOut('againPassWord')}/>

                        <TouchableHighlight
                            style={[formViewStyle.seeImg, this.state.againSeeState ? '' : formViewStyle.isSeeImg]}
                            underlayColor={'#fff'} onPress={() => {
                            this.setState({againSeeState: !this.state.againSeeState});
                        }}
                        >
                            <Image style={{width: 16, height: this.state.againSeeState ? 8 : 16}}
                                   source={this.state.againSeeState ? require('../../image/icon_see_no.png') : require('../../image/icon_see_ok.png')}/>
                        </TouchableHighlight>
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
                        <Text>登录密码必须设置为6~12位，可由数字、字母或符号组成。</Text>
                    </View>

                </View>

                <ModalComponent modalState={this.state.alertState} text="登录" title="重置密码成功"/>
            </View>
        )
    }

    //表单提交
    submitHandle = () => {
        if (!checkInput('passWord', this.state.resetParams['passWord'])) return;
        if (!checkInput('passWord', this.state.resetParams['againPassWord'])) return;

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

        forgetPwd(params, () => {
            this.setState({alertState: true});
            setTimeout(() => {
                this.setState({alertState: false});
                this.reSetRouter();
            }, 3000);
        });
    };

    inputWatch = (value, type) => {
        setButtonState.call(this, this.state.resetParams, value, type);
    };

    //跳转到LoginView
    reSetRouter = () => {
        navigation.dispatch(setRoot('LoginView'));
    };

    fadeIn = (type) => {
        animatedHandle.call(this, 1, type)
    };

    fadeOut = (type) => {
        animatedHandle.call(this, 0, type)
    };
}