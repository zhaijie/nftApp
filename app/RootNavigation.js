/**
 * Created by Administrator on 2018/12/27 0030.
 */
import React from 'react'
import {connect} from 'react-redux'
import {BackHandler, Platform, Alert, Linking} from "react-native"
import {NavigationActions} from 'react-navigation';
import DeviceInfo from 'react-native-device-info';

import AppNavigation from './router/AppNavigation'
import {toastShow} from './utils/ToastUtil';
import {setRoot} from './utils/Utiil';

import {getVersion} from  './api/FormServer'

import StorageUtil from  './utils/StorageUtil'

let navigation;
class RootNavigation extends React.Component {

    constructor(props) {
        super(props);
        this.lastBackPressed = 0;
    }

    static dispatch() {
        navigation(setRoot('LoginView'))
    }

    render() {
        navigation = this.props.dispatch;
        return (<AppNavigation state={this.props.nav} dispatch={this.props.dispatch}/>
        )
    }

    componentDidMount() {
        // StorageUtil.getItem('isLogin').then((login) => {
        //     if (login !== '1') return;
        //     getVersion({version: DeviceInfo.getVersion()}, (data) => {
        //         if (data.item) {
        //             Alert.alert(
        //                 '版本更新',
        //                 data.item.updateContent,
        //                 [
        //                     {text: '退出', onPress: () => BackHandler.exitApp()},
        //                     {
        //                         text: '更新', onPress: () => {
        //                         BackHandler.exitApp();
        //                         Linking.openURL('https://www.baidu.com/')
        //                     }
        //                     },
        //                 ],
        //                 {cancelable: false}
        //             );
        //         }
        //     });
        // });

        if (Platform.OS === 'android') {
            BackHandler.addEventListener('backPress', this.onBackAndroid);
        }
    }


    componentWillUnmount() {
        if (Platform.OS === 'android') {
            BackHandler.removeEventListener('backPress', this.onBackAndroid);
        }
    }

    onBackAndroid = () => {
        const {dispatch, nav} = this.props;
        if (nav.index === 0) {
            if (this.lastBackPressed && this.lastBackPressed + 2000 >= Date.now()) {
                //最近2秒内按过back键，可以退出应用。
                BackHandler.exitApp();
                return false;
            }
            this.lastBackPressed = Date.now();
            toastShow('再按一次退出应用');
            return true;
        }

        dispatch(NavigationActions.back());
        return true;
    };

}
const mapStateToProps = state => ({nav: state.nav});
export default connect(mapStateToProps)(RootNavigation)
