/**
 * Created by Administrator on 2019/1/3 0027.
 */
import React from 'react'
import {View, Text, Animated, DeviceEventEmitter} from "react-native";

import {formViewStyle} from '../../style/formStyle'
import InputComponent from '../component/InputComponent';
import ButtonComponent from '../component/ButtonComponent';
import {checkInput, setButtonState, animatedHandle} from '../../utils/Utiil'
import {toastShow} from '../../utils/ToastUtil'
import StorageUtil from '../../utils/StorageUtil'
import {setTradePwd} from '../../api/FormServer'

export default class SetTradePasswordView extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            tradePasswordParams: {
                tradePassword: '',
                againTradePassword: '',
            },
            fadeAnim: {
                tradePassword: new Animated.Value(0),
                againTradePassword: new Animated.Value(0),
            },
            buttonState: false
        }
    }

    render() {
        return (
            <View style={formViewStyle.phoneContainer}>
                <Text style={{fontSize: 21}}>您暂未设置交易密码，请设置交易密码！</Text>
                <View style={formViewStyle.inputContent}>
                    <Animated.Text style={[formViewStyle.inputText,
                        {
                            opacity: this.state.fadeAnim.tradePassword,
                            transform: [{
                                translateY: this.state.fadeAnim.tradePassword.interpolate({
                                    inputRange: [0, 1],
                                    outputRange: [30, 0]
                                })
                            }]
                        }
                    ]}>请设置交易密码</Animated.Text>

                    <InputComponent
                        explain="请设置交易密码" valueChange={(value) => this.inputWatch(value, 'tradePassword')}
                        inputFocus={() => this.fadeIn('tradePassword')} password={true}
                        inputBlur={() => this.fadeOut('tradePassword')}/>
                </View>

                <View style={formViewStyle.inputContent}>
                    <Animated.Text style={[formViewStyle.inputText,
                        {
                            opacity: this.state.fadeAnim.againTradePassword,
                            transform: [{
                                translateY: this.state.fadeAnim.againTradePassword.interpolate({
                                    inputRange: [0, 1],
                                    outputRange: [30, 0]
                                })
                            }]
                        }
                    ]}>请重复交易密码</Animated.Text>

                    <InputComponent
                        explain="请重复交易密码" valueChange={(value) => this.inputWatch(value, 'againTradePassword')}
                        inputFocus={() => this.fadeIn('againTradePassword')} password={true}
                        inputBlur={() => this.fadeOut('againTradePassword')}/>
                </View>

                <ButtonComponent title="确定" handle={this.submitHandle}
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

        setTradePwd({password: this.state.tradePasswordParams.tradePassword}, () => {
            StorageUtil.setItem('ispwd', '2');
            StorageUtil.getItem('userInfo').then((data) => {
                let userInfo = JSON.parse(data);
                userInfo.ispwd = '2';
                StorageUtil.setItem('userInfo', JSON.stringify(userInfo)).then(() => DeviceEventEmitter.emit('listDataChange'));
            });
            toastShow('设置成功');
            this.props.navigation.replace('TradePasswordView');
        })
    }
}