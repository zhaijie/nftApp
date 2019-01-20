/**
 * Created by Administrator on 2018/12/27 0010.
 */
import {postHttp} from './Http'
import StorageUtil from '../utils/StorageUtil'

//登录
export function login(param, successCallBack) {
    postHttp('/login', param, function (data, msg) {
        //存储用户信息
        StorageUtil.setItem('token', data.tmd);
        StorageUtil.setItem('isLogin', '1');
        StorageUtil.setItem('username', param.username);
        StorageUtil.setItem('ispwd', data.ispwd);
        StorageUtil.setItem('isAuthority', data.isAuthority);
        StorageUtil.setItem('userInfo', JSON.stringify(data));
        successCallBack(data, msg)
    })
}

//获取短信验证码
export function getMessageCode(param, successCallBack) {
    postHttp('/app/user/getCode', param, function (data) {
        successCallBack(data)
    })
}

//注册
export function register(param, successCallBack) {
    postHttp('/app/user/register', param, function (data) {
        successCallBack(data)
    })
}

//校验短信验证码
export function checkCode(param, successCallBack) {
    postHttp('/app/user/checkCode', param, function (data) {
        successCallBack(data)
    })
}

//忘记登录密码
export function forgetPwd(param, successCallBack) {
    postHttp('/app/user/forgetPwd', param, function (data) {
        successCallBack(data)
    })
}

//重置登录密码
export function updatePwd(param, successCallBack) {
    postHttp('/app/user/updatePwd', param, function () {
        successCallBack()
    })
}

//初级实名认证
export function primaryName(param, successCallBack) {
    postHttp('/app/user/authentication', param, function () {
        successCallBack()
    })
}

//高级实名认证
export function seniorAuthentication(param, successCallBack) {
    postHttp('/app/user/seniorAuthentication', param, function () {
        successCallBack()
    })
}

//高级实名认证状态
export function isRealAuth(successCallBack) {
    postHttp('/app/user/isRealAuth', '', function (data) {
        successCallBack(data)
    })
}

//安全退出
export function logout(successCallBack) {
    postHttp('/app/user/logout', '', function () {
        successCallBack()
    })
}

//设置交易密码
export function setTradePwd(params, successCallBack) {
    postHttp('/app/user/setTradePwd', params, function () {
        successCallBack()
    })
}

//修改交易密码
export function updateTradePwd(params, successCallBack) {
    postHttp('/app/user/updateTradePwd', params, function () {
        successCallBack()
    })
}


//忘记交易密码
export function forgetTradePwd(params, successCallBack) {
    postHttp('/app/user/forgetTradePwd', params, function () {
        successCallBack()
    })
}

//更换手机
export function updatePhone(params, successCallBack) {
    postHttp('/app/user/updatePhone', params, function () {
        successCallBack()
    })
}

//根据手机号码查询用户名
export function getUserByPhone(params, successCallBack) {
    postHttp('/app/user/getUserByPhone', params, function (data) {
        successCallBack(data)
    })
}

//获取用户等级
export function getGrade(successCallBack) {
    postHttp('/app/team/getGrade', '', function (data) {
        successCallBack(data)
    })
}

//身份证验证
export function checkIdentity(params, successCallBack) {
    postHttp('/app/user/checkIdentity', params, function (data) {
        successCallBack(data)
    })
}


//会员升级费用信息
export function getUpgradeFeeList(successCallBack) {
    postHttp('/app/user/getMembershipUpgradeFeeList', '', function (data) {
        successCallBack(data)
    })
}


export function getVersion(parasm, successCallBack) {
    postHttp('/app/user/getVersion', parasm, function (data) {
        successCallBack(data)
    })
}




