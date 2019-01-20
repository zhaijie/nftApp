/**
 * Created by Administrator on 2019/1/3 0027.
 */
import React from 'react'
import {View, Text, TouchableHighlight, Animated} from "react-native";

import {formViewStyle} from '../../style/formStyle'
import InputComponent from '../component/InputComponent';
import ButtonComponent from '../component/ButtonComponent';
import {checkInput, setButtonState, animatedHandle, clearTimer} from '../../utils/Utiil'
import StorageUtil from '../../utils/StorageUtil'
import {toastShow} from '../../utils/ToastUtil'
import {checkIdentity} from '../../api/FormServer'

let userInfo;
export default class PhoneView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            phoneParams: {
                idCard: ''
            },
            fadeAnim: {
                idCard: new Animated.Value(0),
            },
            codeText: '获取验证码',
            name: '',
            phone: ''
        }
    }

    componentWillMount() {
        StorageUtil.getItem('userInfo').then((data) => {
            userInfo = JSON.parse(data);
            this.setState({
                name: userInfo.name,
                phone: userInfo.account
            });

        })
    }

    render() {
        return (
            <View style={formViewStyle.phoneContainer}>

                <Text>已初级实名认证，认证姓名：</Text>
                <Text style={formViewStyle.phone}>{this.state.name}</Text>

                <View style={[formViewStyle.inputContent]}>
                    <Animated.Text style={[formViewStyle.inputText,
                        {
                            opacity: this.state.fadeAnim.idCard,
                            transform: [{
                                translateY: this.state.fadeAnim.idCard.interpolate({
                                    inputRange: [0, 1],
                                    outputRange: [30, 0]
                                })
                            }]
                        }
                    ]}>请输入身份证号码</Animated.Text>
                    <InputComponent
                        explain="请输入身份证号码" valueChange={(value) => this.inputWatch(value, 'idCard')}
                        inputFocus={() => this.fadeIn('idCard')} inputBlur={() => this.fadeOut('idCard')}/>
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

    submitHandle = () => {
        if (!checkInput('idCard', this.state.phoneParams.idCard)) return;

        checkIdentity({idCard: this.state.phoneParams.idCard}, () => {
            this.props.navigation.navigate('ChangePhoneView', {oldPhone: this.state.phone});
            clearTimer()
        });
    }

}