/**
 * Created by Administrator on 2019/1/2 0027.
 */
import React from 'react'
import {View, Text, SectionList, TouchableHighlight, DeviceEventEmitter} from "react-native"

import {settingViewStyle} from '../style/settingStyle'
import StorageUtil from '../utils/StorageUtil'
import {cipherText, setRoot} from '../utils/Utiil'
import {toastShow} from '../utils/ToastUtil'
import {logout} from '../api/FormServer'

export default class SettingView extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            listData: [
                {
                    key: '1', data: [
                    {id: '11', title: '实名认证', right: '', link: 'RealNameView'},
                    {id: '12', title: '登录密码', right: '', link: 'SetPasswordView'},
                    {id: '13', title: '交易密码', right: '', link: ''},
                    {id: '14', title: '手机号码', right: '', link: 'PhoneView'},
                ]
                }, {
                    key: '2', data: [
                        {id: '21', title: '管理收货地址', right: '未设置', link: ''}
                    ]
                }, {
                    key: '3', data: [
                        {id: '31', title: '客服中心', right: '', link: 'CustomerView'},
                        {id: '32', title: '意见反馈', right: '', link: 'SuggestionView'},
                    ]
                }, {
                    key: '4', data: [
                        {id: '41', title: '关于我们', right: '', link: 'AboutView'},
                        {id: '42', title: '下载APP', right: '', link: 'DownloadView'},
                    ]
                },
            ]
        }
    }

    componentWillMount() {
        this.init();
    }

    init = () => {
        StorageUtil.getItem('userInfo').then((data) => {
            let temp = this.state.listData;
            let userInfo = JSON.parse(data);

            temp[0].data[3].right = cipherText(userInfo.account);

            //是否设置交易密码
            if (userInfo.ispwd + '' === '1') {
                temp[0].data[2].right = '未设置';
                temp[0].data[2].link = 'SetTradePasswordView';
            } else {
                temp[0].data[2].right = '';
                temp[0].data[2].link = 'TradePasswordView';
            }
            //是否初级实名认证
            if (userInfo.isAuthority + '' === '1') {
                temp[0].data[0].right = '未认证';
            } else {
                if (userInfo.senior + '' === '1') {
                    temp[0].data[0].right = '已初级认证';
                } else {
                    temp[0].data[0].right = '已认证';
                    temp[0].data[0].link = 'RealNameOkView';
                }
            }
            this.setState({listData: temp});
        });
    };

    componentDidMount() {
        DeviceEventEmitter.addListener('listDataChange', () => {
            this.init()
        });
    }

    render() {
        return (
            <View style={settingViewStyle.container}>
                <SectionList
                    sections={this.state.listData}
                    keyExtractor={(item, index) => item.id}
                    SectionSeparatorComponent={
                        this._SeparatorComponent
                    }
                    ItemSeparatorComponent={() =>
                        <View style={settingViewStyle.listBorder}/>
                    }
                    renderItem={this.listItem}/>

            </View>
        )
    }

    //每个SectionList之间的空隙
    _SeparatorComponent = (item) => {
        if (!item.leadingItem && item.section.key === this.state.listData[0].key) {
            return (<View/>)
        }
        if (!item.trailingItem && item.section.key === this.state.listData[this.state.listData.length - 1].key) {
            return (
                <View style={settingViewStyle.quit}>
                    <Text style={settingViewStyle.quitText} onPress={this.quit}>
                        安全退出
                    </Text>
                </View>
            )
        }
        return (<View style={settingViewStyle.listSpacing}/>)
    };

    listItem = ({item}) => {
        return (
            <TouchableHighlight underlayColor={'#000'} onPress={() => this.props.navigation.navigate(item.link)}>
                <View style={settingViewStyle.listItem}>
                    <View>
                        <Text style={settingViewStyle.listTitle}>
                            {item.title}
                        </Text>
                    </View>

                    <View>
                        <Text style={settingViewStyle.rightText}>
                            {item.right}
                        </Text>
                    </View>
                </View>
            </TouchableHighlight>)
    };

    quit = () => {
        logout(() => {
            toastShow('退出成功');
            this.props.navigation.dispatch(setRoot('LoginView'));
            StorageUtil.clear();
        })
    }


}

