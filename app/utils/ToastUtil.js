/**
 * Created by Administrator on 2018/12/27 0013.
 */
import React, {
    Component,
} from 'react';
import InitApp from '../../App'
import ToastView from '../view/component/ToastComponent'

let defaultTime = 2000;

export function toastShow(msg, time) {
    let showTime = time ? time : defaultTime;
    InitApp.setView(<ToastView
        message={msg}
        time={showTime}
        onDismiss={() => {
            InitApp.setView()
        }}/>)
}

