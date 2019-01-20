/**
 * Created by Administrator on 2018/12/27 0013.
 */
import React from 'react'
import {View, Text, Image, Animated} from "react-native"
import {NavigationActions, StackActions} from 'react-navigation';
import SplashScreen from 'react-native-splash-screen'

import {formViewStyle} from '../style/formStyle'
import InputComponent from './component/InputComponent'
import ButtonComponent from './component/ButtonComponent'

import {login} from '../api/FormServer'
import {toastShow} from '../utils/ToastUtil'
import StorageUtil from '../utils/StorageUtil'
import {checkInput, setButtonState, animatedHandle, setRoot} from '../utils/Utiil'


let navigation;
export default class LoginView extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            buttonState: false,
            fadeAnim: {
                username: new Animated.Value(0),
                password: new Animated.Value(0),
            }
        };
    }

    componentWillMount() {
        navigation = this.props.navigation;
        //隐藏启动图
        StorageUtil.getItem('isLogin').then((data) => {
            if (data === '1') {
                navigation.dispatch(setRoot('TabView'));
            }

            //隐藏启动图
            let timeoutTimer = setTimeout(function () {
                SplashScreen.hide();
                clearTimeout(timeoutTimer);
                timeoutTimer = null;
            }, 1000)
        });
    }

    //跳转到tabView
    jumpToTab = () => {
        let action = StackActions.reset({
            index: 0,
            actions: [
                NavigationActions.navigate({routeName: 'TabView'}),
            ],
        });

        navigation.dispatch(action);
    };

    render() {
        return (
            <View style={formViewStyle.formBox}>
                <View style={formViewStyle.loginImgBox}>
                    <Image source={require('../image/logo.png')} style={formViewStyle.loginImg}/>
                </View>

                <View style={[formViewStyle.inputBox]}>
                    <View style={formViewStyle.inputContent}>
                        <Animated.Text style={[formViewStyle.inputText,
                            {
                                opacity: this.state.fadeAnim.username,
                                transform: [{
                                    translateY: this.state.fadeAnim.username.interpolate({
                                        inputRange: [0, 1],
                                        outputRange: [30, 0]
                                    })
                                }]
                            }
                        ]}>
                            请输入手机号码
                        </Animated.Text>
                        <InputComponent
                            explain="请输入手机号码" valueChange={(value) => this.inputWatch(value, 'username')}
                            inputFocus={() => this.fadeIn('username')} inputBlur={() => this.fadeOut('username')}
                        />
                    </View>

                    <View style={formViewStyle.inputContent}>
                        <Animated.Text style={[formViewStyle.inputText,
                            {
                                opacity: this.state.fadeAnim.password,
                                transform: [{
                                    translateY: this.state.fadeAnim.password.interpolate({
                                        inputRange: [0, 1],
                                        outputRange: [30, 0]
                                    })
                                }]
                            }
                        ]}>请输入登录密码
                        </Animated.Text>
                        <InputComponent
                            explain="请输入登录密码" password={true}
                            valueChange={(value) => this.inputWatch(value, 'password')}
                            inputFocus={() => this.fadeIn('password')} inputBlur={() => this.fadeOut('password')}/>
                    </View>
                    <View style={formViewStyle.inputContent}>
                        <ButtonComponent title="登录" handle={this.submitHandle}
                                         addStyle={[this.state.buttonState ? '' : formViewStyle.disabledButton]}/>
                    </View>

                    <View style={formViewStyle.jumpOperation}>
                        <View style={[formViewStyle.jumpItem]}>
                            <Text style={formViewStyle.jumpForget}
                                  onPress={() => navigation.navigate('ForgetPasswordView')}>
                                忘记密码
                            </Text>
                        </View>

                        <View style={[formViewStyle.jumpItem]}>
                            <Text style={formViewStyle.jumpRegister} onPress={() => {
                                navigation.navigate('RegisterView');
                            }}>
                                免费注册
                            </Text>
                        </View>
                    </View>
                </View>
            </View>
        )
    }

    //表单提交
    submitHandle = () => {
        //请求参数
        if (!checkInput('phone', this.state.username)) return;
        if (!checkInput('passWord', this.state.password)) return;

        let params = {
            username: this.state.username,
            password: this.state.password,
        };

        login(params, (data, msg) => {
            if (data) {
                toastShow('登录成功');
                navigation.dispatch(setRoot('TabView'));
            } else {
                toastShow(msg);
            }
        })
    };

    fadeIn = (type) => {
        animatedHandle.call(this, 1, type)
    };

    fadeOut = (type) => {
        animatedHandle.call(this, 0, type)
    };

    inputWatch = (value, type) => {
        setButtonState.call(this, this.state, value, type);
    };
}