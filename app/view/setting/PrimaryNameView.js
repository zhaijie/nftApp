/**
 * Created by Administrator on 2019/1/3 0027.
 */
import React from 'react'
import {View, Text, Image, TouchableHighlight, Animated} from "react-native"

import {realNameStyle} from '../../style/realNameStyle'
import ButtonComponent from '../component/ButtonComponent';
import InputComponent from "../component/InputComponent";
import {checkInput, setButtonState, animatedHandle} from '../../utils/Utiil'
import {toastShow} from '../../utils/ToastUtil'
import StorageUtil from '../../utils/StorageUtil'
import {primaryName} from '../../api/FormServer'

export default class PrimaryNameView extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            primaryParams: {
                name: '',
                idCard: ''
            },
            mode: true, //true 为身份证
            fadeAnim: {
                name: new Animated.Value(0),
                idCard: new Animated.Value(0),
            },
            buttonState: false
        }
    }

    render() {
        return (
            <View style={realNameStyle.primary}>
                <View style={realNameStyle.primaryMode}>
                    <Text style={realNameStyle.modeText}>认证方式</Text>

                    <TouchableHighlight underlayColor={'#fff'} onPress={() => this.setState({mode: true})}>
                        <View style={realNameStyle.primaryMode}>
                            <Image style={realNameStyle.modeIcon}
                                   source={this.state.mode ? require('../../image/user/icon_yuan.png') : require('../../image/user/icon_yuann.png')}/>
                            <Text
                                style={[realNameStyle.modeText, this.state.mode ? realNameStyle.modeTextActive : '']}>身份证</Text>
                        </View>
                    </TouchableHighlight>

                    <TouchableHighlight underlayColor={'#fff'} onPress={() => this.setState({mode: false})}>
                        <View style={realNameStyle.primaryMode}>
                            <Image style={realNameStyle.modeIcon}
                                   source={this.state.mode ? require('../../image/user/icon_yuann.png') : require('../../image/user/icon_yuan.png')}/>
                            <Text
                                style={[realNameStyle.modeText, this.state.mode ? '' : realNameStyle.modeTextActive]}>护照</Text>
                        </View>
                    </TouchableHighlight>
                </View>

                <View style={realNameStyle.inputContent}>
                    <Animated.Text style={[realNameStyle.inputText,
                        {
                            opacity: this.state.fadeAnim.name,
                            transform: [{
                                translateY: this.state.fadeAnim.name.interpolate({
                                    inputRange: [0, 1],
                                    outputRange: [30, 0]
                                })
                            }]
                        }
                    ]}>请输入真实姓名</Animated.Text>

                    <InputComponent
                        explain="请输入真实姓名" valueChange={(value) => this.inputWatch(value, 'name')}
                        inputFocus={() => this.fadeIn('name')} inputBlur={() => this.fadeOut('name')}/>
                </View>

                <View style={realNameStyle.inputContent}>
                    <Animated.Text style={[realNameStyle.inputText,
                        {
                            opacity: this.state.fadeAnim.idCard,
                            transform: [{
                                translateY: this.state.fadeAnim.idCard.interpolate({
                                    inputRange: [0, 1],
                                    outputRange: [30, 0]
                                })
                            }]
                        }
                    ]}>请输入证件号码</Animated.Text>

                    <InputComponent
                        explain="请输入证件号码" valueChange={(value) => this.inputWatch(value, 'idCard')}
                        inputFocus={() => this.fadeIn('idCard')} inputBlur={() => this.fadeOut('idCard')}/>
                </View>

                <ButtonComponent title="确定提交" handle={this.submitHandle}
                                 addStyle={[{
                                     borderRadius: 22,
                                     marginTop: 32
                                 }, this.state.buttonState ? '' : realNameStyle.disabledButton]}/>


                <View style={realNameStyle.remindBox}>
                    <Text>免责声明</Text>
                    <Text style={{marginTop: 8}}>如果因个人使用不合法的、不正确的或盗用他人的身份证信息进行实名认证而造成的损失，将由用户本人自行承担。</Text>
                </View>

            </View>
        )
    }

    inputWatch = (value, type) => {
        setButtonState.call(this, this.state.primaryParams, value, type);
    };


    fadeIn = (type) => {
        animatedHandle.call(this, 1, type)
    };

    fadeOut = (type) => {
        animatedHandle.call(this, 0, type)
    };

    submitHandle = () => {
        //获取请求参数
        let params = {};
        for (let key in this.state.primaryParams) {
            if (!checkInput(key, this.state.primaryParams[key])) return;
            params[key] = this.state.primaryParams[key];
        }
        params.type = this.state.mode ? 'SFZ' : 'HZ';

        primaryName(params, () => {
            //更新缓存
            StorageUtil.getItem('userInfo').then(data => {
                let userInfo = JSON.parse(data);
                userInfo.name = this.state.primaryParams.name;
                userInfo.isAuthority = '2';
                StorageUtil.setItem('userInfo', JSON.stringify(userInfo))
            });
            toastShow('初级认证成功');
            this.props.navigation.replace('SeniorNameView');
        })
    }
}