/**
 * Created by Administrator on 2018/10/12 0012.
 */

import React, {Component} from 'react';
import {StyleSheet, View, Modal, Text, TextInput} from 'react-native';

import {commonStyle} from '../../style/commonStyle'
import ButtonComponent from './ButtonComponent'

class TransferPwdAlertComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            passwordMaxLength: 6,
            passwordLength: 0,
            passwordAlert: false,
            password: ''
        }
    }


    render() {
        return (
            <Modal animationType="fade" transparent={true} visible={this.props.passwordAlert}
                   onRequestClose={() => {
                   }}>
                <TextInput style={transferPwdStyle.input} autoFocus={this.props.passwordAlert}
                           keyboardType="numeric" maxLength={6}
                           onChangeText={(value) => {
                               if (this.props.valueChange) {
                                   this.props.valueChange(value)
                               }
                               this.setState({password: value})
                           }}/>
                <View style={transferPwdStyle.alert}>
                    <View style={transferPwdStyle.passwordBox}>
                        <Text style={transferPwdStyle.passwordTitle}>请输入交易密码</Text>
                        <View style={transferPwdStyle.passwordInputBox}>
                            {this.renderItem()}
                        </View>


                        <Text style={transferPwdStyle.forgetPassword}>忘记交易密码</Text>

                        <View style={transferPwdStyle.btnBox}>

                            <ButtonComponent title="取消" handle={this.cancelHandle}
                                             addStyle={[transferPwdStyle.cancelBtn, transferPwdStyle.transferBtn]}
                                             color={commonStyle.color}/>

                            <ButtonComponent title="确定" handle={this.confirmHandle}
                                             addStyle={[transferPwdStyle.transferBtn, {marginLeft: 12}]}/>
                        </View>
                    </View>
                </View>
            </Modal>
        )
    }

    renderItem() {
        let tempDom = [];
        for (let i = 0; i < 6; i++) {
            tempDom.push(
                <Text key={i}
                      style={[transferPwdStyle.passwordInput, this.state.password.length === i ? transferPwdStyle.passwordInputActive : '']}>
                    {this.state.password.length >= i + 1 ? '*' : ''}
                </Text>)
        }
        return tempDom;
    }


    cancelHandle = () => {
        if (this.props.cancel) this.props.cancel();
        this.setState({password: ''});
    };

    confirmHandle = () => {
        if (this.props.confirm) this.props.confirm();
        this.setState({password: ''});
    }

}

const transferPwdStyle = StyleSheet.create({
    alert: {
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        alignItems: 'center',
        justifyContent: 'center'
    },

    passwordBox: {
        width: 311,
        height: 195,
        marginHorizontal: 32,
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 16,
        alignItems: commonStyle.center
    },
    passwordTitle: {
        marginTop: 7,
        marginBottom: 23,
        fontSize: 18,
    },
    passwordInputBox: {
        flexDirection: commonStyle.row
    },
    passwordInput: {
        width: 44,
        height: 44,
        lineHeight: 44,
        borderWidth: 0,
        backgroundColor: '#eee',
        marginLeft: 3,
        borderRadius: 1,
        fontSize: 18,
        textAlign: commonStyle.center
    },
    passwordInputActive: {
        borderWidth: 1,
        borderColor: commonStyle.color
    },
    input: {
        opacity: 0,
        height: 0,
        width: 0
    },
    forgetPassword: {
        color: commonStyle.color,
        textAlign: 'right',
        width: '100%',
        marginTop: 3
    },
    btnBox: {
        justifyContent: commonStyle.around,
        flexDirection: commonStyle.row
    },
    transferBtn: {
        height: 36,
        width: 134,
        borderRadius: 2
    },
    cancelBtn: {
        borderColor: commonStyle.color,
        borderWidth: 1,
        backgroundColor: '#fff',
    }
});
export default TransferPwdAlertComponent