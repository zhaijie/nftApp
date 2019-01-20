/**
 * Created by Administrator on 2018/12/27 0009.
 */

import {Alert} from 'react-native'
import {toastShow} from '../utils/ToastUtil'
import StorageUtil from '../utils/StorageUtil'

import RootNavigation from '../RootNavigation'


export const api = 'http://47.244.119.193:8585';
let Authorization = null;

export function postHttp(url, params, successCallBack) {
    let headers = {};

    if (Authorization === null && url !== '/login') {
        StorageUtil.getItem('token').then((data) => {
            Authorization = data;
            headers.Authorization = data;
            toFetch(url, 'POST', params, successCallBack, headers);
        })
    } else {
        headers.Authorization = Authorization;
        toFetch(url, 'POST', params, successCallBack, headers);
    }
}

export function resultHandle(data, successCallBack) {
    //请先登录
    if (data.retcode + '' === '10003') {
        Alert.alert(
            '温馨提示',
            '请先登录',
            [
                {
                    text: '去登陆', onPress: () => {
                    StorageUtil.clear().then(() => {
                        RootNavigation.dispatch();
                    })
                }
                }],
            {cancelable: false}
        );
        return
    }
    let resultState = (data.retcode + '' === '0');
    if (resultState && successCallBack) {
        successCallBack(data.data, data.msg);
        return
    }

    if (!resultState && data.msg) {
        toastShow(data.msg);
        // successCallBack(false, data.msg);
    }
}

export function toFetch(url, method, params, successCallBack, header) {
    let param;
    switch (url) {
        case '/login':
            param = JSON.stringify(params);
            break;

        case'/app/user/seniorAuthentication':  //文件上传
            header['Content-Type'] = 'multipart/form-data;charset=utf-8';
            param = new FormData();
            let file1 = {
                uri: params.oneAddress.uri,
                type: 'application/octet-stream',
                name: params.oneAddress.fileName
            };
            let file2 = {
                uri: params.twoAddress.uri,
                type: 'application/octet-stream',
                name: params.oneAddress.fileName
            };
            let file3 = {
                uri: params.threeAddress.uri,
                type: 'application/octet-stream',
                name: params.oneAddress.fileName
            };
            param.append("oneAddress", file1);
            param.append("twoAddress", file2);
            param.append("threeAddress", file3);
            break;
        default:
            if (params !== '') {
                param = new FormData();
                for (let k in params) {
                    param.append(k, params[k]);
                }
            }
    }
    fetch(api + url, {
        method: method,
        headers: header,
        body: param
    }).then((response) => response.json()).then((responseJSON) => {
        resultHandle(responseJSON, successCallBack);
    }).catch((error) => {
        console.warn("error = " + error)
    });
}


