/**
 * Created by Administrator on 2019/1/5 0005.
 */
import React from 'react';
import {View, Text, TextInput, Modal} from "react-native";

import  {transferStyle} from '../style/transferStyle'
import InputComponent from "./component/InputComponent";
import ButtonComponent from "./component/ButtonComponent";
import {getUserByPhone} from '../api/FormServer'
import {getDealConfig, addFundsTransfer} from '../api/AssetServer'

import {toastShow} from '../utils/ToastUtil'
import TransferPwdAlertComponent from "./component/TransferPwdAlertComponent";

export default class TransferView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isFocus: false,
            transferNum: '',
            errorText: null,
            buttonState: false, //按钮是否可点
            integralTotal: 0,
            dealConfig: {},
            transferUserInfo: {},
            passwordAlert: false,
            transferPassword: '',
            phone: ''
        };
    }

    static navigationOptions = ({navigation, screenProps}) => {
        return ({
            headerRight: <Text onPress={() => navigation.navigate('RecordView', {type: 'integral'})}
                               style={{fontSize: 14, color: '#999', marginRight: 16}}>
                积分记录
            </Text>
        })
    };

    componentWillMount() {
        // this.props.navigation.state.params.integralTotal
        this.setState({integralTotal: 1000});
        getDealConfig((data) => {
            this.setState({
                dealConfig: data
            })
        })
    }

    render() {
        return (
            <View>
                <View style={transferStyle.transferBox}>
                    <View style={transferStyle.transferInputBox}>
                        <View style={transferStyle.transferNum}>
                            <Text style={{fontSize: 15}}>转出数量</Text>
                            <Text style={{color: '#FEBC45'}}>可用积分：{this.state.integralTotal}</Text>
                        </View>

                        <TextInput underlineColorAndroid="transparent" placeholder={this.state.isFocus ? '' : '请输入转账金额'}
                                   defaultValue={this.state.transferNum} onFocus={() => this.setState({isFocus: true})}
                                   onBlur={() => this.setState({isFocus: false})} keyboardType='numeric'
                                   onChangeText={(val) => this.transferInputWatch(val)}
                                   style={[transferStyle.transferInput, this.state.isFocus ? transferStyle.transferInputFocus : '', this.state.transferNum ? transferStyle.transferInputFocus : '']}/>

                        <Text
                            style={[transferStyle.errorRemind, this.state.errorText ? {backgroundColor: 'rgba(252,64,59,.2)'} : '']}>
                            {this.state.errorText}
                        </Text>
                    </View>
                </View>

                <View style={{paddingHorizontal: 17}}>

                    <View style={transferStyle.infoInputItem}>
                        <Text style={transferStyle.infoInputText}>接收人手机</Text>
                        <InputComponent explain="请输入接收人手机号码" height={48} addStyle={transferStyle.infoInput}
                                        maxLength={11} valueChange={(val) => this.phoneInputWatch(val)}/>
                    </View>

                    <View style={transferStyle.infoInputItem}>
                        <Text style={transferStyle.infoInputText}>接收人姓名</Text>
                        <InputComponent height={48} addStyle={transferStyle.infoInput} editable={false}
                                        defaultValue={this.state.transferUserInfo.userName}/>
                    </View>

                    <ButtonComponent title="确认转出" handle={this.showTransferAlert} addStyle={[{
                        marginVertical: 16
                    }, this.state.buttonState ? '' : transferStyle.disabledButton]}/>

                    <View>
                        <Text style={{color: '#999', marginBottom: 5}}>温馨提示</Text>
                        <View style={transferStyle.remindItem}>
                            <Text style={{color: '#999'}}>1、</Text>
                            <Text style={{color: '#999'}}>积分划转双方必须为已注册且已实名用户</Text>
                        </View>
                        <View style={transferStyle.remindItem}>
                            <Text style={{color: '#999'}}>2、</Text>
                            <Text style={{color: '#999'}}>单笔转出最低数量<Text
                                style={transferStyle.remindColor}>{this.state.dealConfig.integralMinFunds} 积分，</Text>
                                最高数量<Text
                                    style={transferStyle.remindColor}>{this.state.dealConfig.integralMaxFunds}积分。</Text>
                            </Text>
                        </View>
                        <View style={transferStyle.remindItem}>
                            <Text style={{color: '#999'}}>3、</Text>
                            <Text style={{color: '#999'}}>转出手续为转出数量的费率<Text
                                style={transferStyle.remindColor}>{this.state.dealConfig.integralFv}%，</Text>最小转账手续费为数量
                                <Text style={transferStyle.remindColor}>{this.state.dealConfig.integralPerLimit}
                                    积分。</Text></Text>
                        </View>
                        <View style={transferStyle.remindItem}>
                            <Text style={{color: '#999'}}>4、</Text>
                            <Text style={{color: '#999'}}>正常情况下1个工作日到账，最多不超过3个工作日,节假日顺延。</Text>
                        </View>
                    </View>
                </View>

                <TransferPwdAlertComponent passwordAlert={this.state.passwordAlert}
                                           cancel={() => this.setState({passwordAlert: false})}
                                           confirm={this.transferSubmit} valueChange={(val) => {
                    this.state.transferPassword = val
                }}
                />

            </View>
        )
    }

    transferInputWatch = (val) => {
        this.state.transferNum = val.replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3');
        this.setButtonState();
        if (parseFloat(this.state.transferNum) > parseFloat(this.state.integralTotal)) {
            this.setState({errorText: '您输入的积分数量超过可用积分数量'});
        } else {
            this.setState({errorText: null});
        }
    };

    phoneInputWatch = (val) => {
        this.state.phone = val;
        this.setState({transferUserInfo: {}});
        if (val.length === 11) {
            let check_phone_number = /^1\d{10}$/;
            if (!val.match(check_phone_number)) {
                toastShow('请输入正确的手机号码');
                return false;
            }

            getUserByPhone({phone: val}, (data) => {
                if (data.item) {
                    this.setState({transferUserInfo: data.item});
                    this.setButtonState();
                }
            })
        }
    };

    setButtonState = () => {
        if (this.state.transferNum && this.state.transferUserInfo.userId) {
            this.setState({buttonState: true})
        } else {
            this.setState({buttonState: false})
        }
    };


    showTransferAlert = () => {

        if (!this.state.transferNum) {
            this.setState({errorText: '请输入划转积分数量'});
            return
        }

        if (parseFloat(this.state.transferNum) < parseFloat(this.state.dealConfig.integralMinFunds)) {
            this.setState({errorText: '您输入的积分数量小于最小转出数量'});
            return
        }

        if (!this.state.phone.match(/^1\d{10}$/)) {
            this.setState({errorText: '请输入正确的接收人号码'});
            return
        }

        if (!this.state.transferUserInfo.userId) {
            this.setState({errorText: '积分划转对方必须为已注册且已实名用户'});
            return
        }

        this.setState({passwordAlert: true})
    };

    //提交划转
    transferSubmit = () => {

        let params = {
            number: this.state.transferNum,
            password: this.state.transferPassword,
            recipientUserId: this.state.transferUserInfo.userId,
        };

        addFundsTransfer(params, (data) => {
            console.warn(data)
            // this.props.navigation.navigate('RecordDetailView')
        })
    }
}