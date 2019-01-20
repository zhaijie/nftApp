/**
 * Created by Administrator on 2018/12/28 0028.
 */
import {Animated, Easing} from "react-native"
import {NavigationActions, StackActions} from 'react-navigation';

import {toastShow} from './ToastUtil'
import {getMessageCode} from '../api/FormServer'

let getCodeState = false;

export function checkPhone(phone) {
    let check_phone_number = /^1\d{10}$/;
    if (phone.length === 0) {
        toastShow('手机号码不能为空');
        return false;
    }
    if (phone.length !== 11) {
        toastShow('请输入有效的手机号码');
        return false;
    }
    if (!phone.match(check_phone_number)) {
        toastShow('请输入有效的手机号码');
        return false;
    }
    return true;
}

export function checkNull(val, text) {
    if (val.length === 0) {
        toastShow(text + '不为空');
        return false;
    }
    return true;
}

export function checkTradePwd(val) {
    if (val.length === 0) {
        toastShow('交易密码不为空');
        return false;
    }

    if (val.length !== 6) {
        toastShow('交易密码为6位数字');
        return false;
    }
    return true;
}

export function checkInput(key, val) {
    let state = true;
    switch (key) {
        case 'account':
            state = checkPhone(val);
            break;
        case 'phone':
            state = checkPhone(val);
            break;
        case 'passWord':
            state = checkNull(val, '登录密码');
            break;
        case 'imgCode':
            state = checkNull(val, '图形验证码');
            break;
        case 'code':
            state = checkNull(val, '验证码');
            break;
        case 'name':
            state = checkNull(val, '姓名');
            break;
        case 'idCard':
            state = checkNull(val, '证件号码');
            break;
        case 'tradePwd':
            state = checkTradePwd(val);
            break;
    }
    return state;
}

let timer = null;
export function getCodeUtil(params) {

    if (getCodeState) {
        toastShow('请勿重复操作');
        return
    }
    getMessageCode(params, () => {
        getCodeState = true;
        //倒计时
        let second = 60;
        this.setState({codeText: second + 's'});
        timer = setInterval(() => {
            second--;
            if (second === 0) {
                clearTimeout(timer);
                this.setState({codeText: '重新获取'});
                getCodeState = false;
                return
            }
            this.setState({codeText: second + 's'});
        }, 1000)
    });
}

export function clearTimer() {
    getCodeState = false;
    window.clearInterval(timer);
    timer = null
}

export function setButtonState(data, value, type) {
    data[type] = value;
    for (let key in data) {
        if (data[key] === '') {
            if (this.state.buttonState) {
                this.setState({buttonState: false});
            }
            return
        }
    }
    this.setState({buttonState: true});
}

export function animatedHandle(val, type) {
    Animated.timing(//随时间变化而执行的动画类型
        this.state.fadeAnim[type],//动画中的变量值
        {
            toValue: val,
            duration: 200,
            easing: Easing.linear
        }
    ).start()
}

export function cipherText(text) {
    let text1 = text.substring(0, 3);
    let text2 = text.substring(text.length - 4, text.length);
    return text1 + '*****' + text2
}

export function setRoot(view) {
    return StackActions.reset({
        index: 0,
        actions: [
            NavigationActions.navigate({routeName: view}),
        ],
    });
}
