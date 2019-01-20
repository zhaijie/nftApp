/**
 * Created by Administrator on 2018/12/27 0008.
 */
import React from 'react';
import {createStackNavigator} from 'react-navigation';

import StackNavigatorConfig from './StackNavigatorConfig';
import TabBar from './TabBarConfig';
import LoginView from '../view/LoginView';
import RegisterView from '../view/RegisterView';
import SettingView from '../view/SettingView';
import TransferView from '../view/TransferView';
import MemberView from '../view/MemberView';
import MemberUpgradeView from '../view/MemberUpgradeView';
import SafeView from '../view/SafeView';
import InviteView from '../view/InviteView';
import RecordView from '../view/RecordView';
import RecordDetailView from '../view/RecordDetailView';


import AboutView from '../view/setting/AboutView'
import SetPasswordView from '../view/setting/SetPasswordView';
import ForgetPasswordView from '../view/setting/ForgetPasswordView';
import ResetPasswordView from '../view/setting/ResetPasswordView';
import PrimaryNameView from '../view/setting/PrimaryNameView';
import PhoneView from '../view/setting/PhoneView';
import ChangePhoneView from '../view/setting/ChangePhoneView';
import PhoneStopView from '../view/setting/PhoneStopView';
import TradePasswordView from '../view/setting/TradePasswordView';
import SetTradePasswordView from '../view/setting/SetTradePasswordView';
import SeniorNameView from '../view/setting/SeniorNameView';
import RealNameView from '../view/setting/RealNameView';
import RealNameOkView from '../view/setting/RealNameOkView';
import ResetTradePwdView from '../view/setting/ResetTradePwdView';
import ForgetTradePwdView from '../view/setting/ForgetTradePwdView';
import DownloadView from '../view/setting/DownloadView';
import SuggestionListView from '../view/setting/SuggestionListView';
import SuggestionView from '../view/setting/SuggestionView';
import CustomerView from '../view/setting/CustomerView';

const RouteConfigs = createStackNavigator(
    {
        TabView: {
            screen: TabBar,
            navigationOptions: ({navigation}) => ({
                header: null, //隐藏标题
                // headerLeft: null, //隐藏返回按钮
                gesturesEnabled: false //是否支持滑动返回手势，iOS默认支持，安卓默认关闭
            })
        },
        LoginView: {
            screen: LoginView,
            navigationOptions: ({navigation}) => ({
                header: null //隐藏标题
            })
        },
        RegisterView: {
            screen: RegisterView,
            navigationOptions: ({navigation}) => ({
                title: '手机号注册',
            }),
        },
        ForgetPasswordView: {
            screen: ForgetPasswordView,
            navigationOptions: ({navigation}) => ({
                title: '忘记登录密码',
            }),
        },
        ResetPasswordView: {
            screen: ResetPasswordView,
            navigationOptions: ({navigation}) => ({
                title: '重置登录密码',
            }),
        },
        SettingView: {
            screen: SettingView,
            navigationOptions: ({navigation}) => ({
                title: '账号设置',
            }),
        },
        PhoneView: {
            screen: PhoneView,
            navigationOptions: ({navigation}) => ({
                title: '手机号码',
            }),
        },
        PhoneStopView: {
            screen: PhoneStopView,
            navigationOptions: ({navigation}) => ({
                title: '手机号码停用',
            }),
        },
        ChangePhoneView: {
            screen: ChangePhoneView,
            navigationOptions: ({navigation}) => ({
                title: '更换手机号码',
            }),
        },
        SetTradePasswordView: {
            screen: SetTradePasswordView,
            navigationOptions: ({navigation}) => ({
                title: '设置交易密码',
            }),
        },
        TradePasswordView: {
            screen: TradePasswordView,
            navigationOptions: ({navigation}) => ({
                title: '重置交易密码',
            }),
        },
        SetPasswordView: {
            screen: SetPasswordView,
            navigationOptions: ({navigation}) => ({
                title: '重置登录密码',
            }),
        },
        SeniorNameView: {
            screen: SeniorNameView,
            navigationOptions: ({navigation}) => ({
                title: '高级认证',
            }),
        },
        PrimaryNameView: {
            screen: PrimaryNameView,
            navigationOptions: ({navigation}) => ({
                title: '初级认证',
            }),
        },
        RealNameView: {
            screen: RealNameView,
            navigationOptions: ({navigation}) => ({
                title: '实名认证',
            }),
        },

        RealNameOkView: {
            screen: RealNameOkView,
            navigationOptions: ({navigation}) => ({
                title: '实名认证',
            }),
        },

        ForgetTradePwdView: {
            screen: ForgetTradePwdView,
            navigationOptions: ({navigation}) => ({
                title: '忘记交易密码',
            }),
        },
        ResetTradePwdView: {
            screen: ResetTradePwdView,
            navigationOptions: ({navigation}) => ({
                title: '重置交易密码',
            }),
        },
        TransferView: {
            screen: TransferView,
            navigationOptions: ({navigation}) => ({
                title: '积分划转',
            }),
        },
        RecordView: {
            screen: RecordView,
            navigationOptions: ({navigation}) => ({
                title: '交易记录',
            }),
        },
        RecordDetailView: {
            screen: RecordDetailView,
            navigationOptions: ({navigation}) => ({
                title: '记录详情',
            }),
        },
        MemberView: {
            screen: MemberView,
            navigationOptions: ({navigation}) => ({
                title: '会员中心',
            }),
        },
        MemberUpgradeView: {
            screen: MemberUpgradeView,
            navigationOptions: ({navigation}) => ({
                title: '会员升级方式',
            }),
        },
        AboutView: {
            screen: AboutView,
            navigationOptions: ({navigation}) => ({
                title: '关于我们',
            }),
        },
        CustomerView: {
            screen: CustomerView,
            navigationOptions: ({navigation}) => ({
                title: '客服中心',
            }),
        },
        DownloadView: {
            screen: DownloadView,
            navigationOptions: ({navigation}) => ({
                title: 'APP下载',
            }),
        },
        SuggestionListView: {
            screen: SuggestionListView,
            navigationOptions: ({navigation}) => ({
                title: '我的反馈',
            }),
        },
        SuggestionView: {
            screen: SuggestionView,
            navigationOptions: ({navigation}) => ({
                title: '意见反馈',
            }),
        },
        SafeView: {
            screen: SafeView,
            navigationOptions: ({navigation}) => ({
                title: '加盟业绩',
            }),
        },
        InviteView: {
            screen: InviteView,
            navigationOptions: ({navigation}) => ({
                title: '邀请好友',
            }),
        },
    },
    StackNavigatorConfig
);
export default RouteConfigs;

