/**
 * Created by Administrator on 2018/12/27 0013.
 */
import React from 'react';
import {View, Text, Image, ScrollView, ImageBackground, SectionList, TouchableHighlight} from "react-native";

import {userViewStyle} from '../style/userStyle'

import AssetComponent from './component/AssetComponent'
import StorageUtil from '../utils/StorageUtil'
import {cipherText} from '../utils/Utiil'

let navigation;
export default class UserView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            amountTotal: '0.00',
            integralTotal: '0',
            amountTotalShow: false,
            integralTotalShow: false,
            phone: '',
            level: '',
            hasMas: false,
            listData: []
        };
    }

    componentWillMount() {
        StorageUtil.getItem('userInfo').then((data) => {
            let _this = this;
            let userInfo = JSON.parse(data);
            this.setState({
                phone: cipherText(userInfo.account),
                level: userInfo.grade,
                listData: [{
                    key: '1',
                    data: [{id: '11', title: '银行卡', icon: require('../image/user/icon_card.png'), link: ''}]
                }, {
                    key: '2', data: [{
                        id: '21',
                        title: '会员中心',
                        icon: require('../image/user/icon_member.png'),
                        link: 'MemberView',
                        params: {level: this.state.level}
                    }, {
                        id: '22',
                        title: '加盟业绩',
                        icon: require('../image/user/icon_performance.png'),
                        link: 'SafeView', params: {level: userInfo.grade}
                    },
                        {
                            id: '23',
                            title: '总销售额',
                            icon: require('../image/user/icon_sale.png'),
                            link: 'SafeView',
                            params: {currentIndex: 1}
                        }]
                },
                    {
                        key: '3',
                        data: [{
                            id: '31',
                            title: '邀请好友',
                            icon: require('../image/user/icon_invite.png'),
                            link: 'InviteView'
                        }]
                    },
                    {
                        key: '4', data: [
                        {id: '41', title: '购物车', icon: require('../image/user/icon_cart.png'), link: ''},
                        {id: '42', title: '我的订单', icon: require('../image/user/icon_order.png'), link: ''}]
                    },
                ]

            })
        });
    }

    render() {
        let orderState = this.getOrderState();
        navigation = this.props.navigation;
        return (
            <ScrollView style={userViewStyle.container}>
                <View style={userViewStyle.userTopTile}>
                    <View style={{position: 'relative'}}>
                        <Image source={require('../image/user/icon_message.png')} style={userViewStyle.userTopImg}/>
                        <Text style={this.hasMas ? userViewStyle.remindSpot : ''}> </Text>
                    </View>
                    <TouchableHighlight underlayColor={'#fff'} onPress={() => navigation.navigate('SettingView')}>
                        <Image source={require('../image/user/icon_set.png')} style={userViewStyle.userTopImg}/>
                    </TouchableHighlight>
                </View>

                <View style={userViewStyle.userInfo}>
                    <Text style={userViewStyle.userPhone}>{this.state.phone}</Text>
                    <View style={userViewStyle.userGrade}>
                        <Image source={require('../image/user/icon_huiy.png')} style={userViewStyle.gradeImg}/>
                        <Text style={userViewStyle.smallTitle}>
                            {this.state.level}
                        </Text>
                    </View>
                </View>

                <AssetComponent navigation={navigation}/>

                <SectionList
                    sections={this.state.listData}
                    keyExtractor={(item, index) => item.id}
                    SectionSeparatorComponent={
                        this._SeparatorComponent
                    }
                    ItemSeparatorComponent={() =>
                        <View style={userViewStyle.listBorder}/>
                    }
                    renderItem={this.listItem}/>

                <View style={{backgroundColor: '#fff', marginBottom: 30}}>
                    <View style={userViewStyle.userOrder}>
                        {orderState}
                    </View>
                </View>
            </ScrollView>
        )
    }

    //每个SectionList之间的空隙
    _SeparatorComponent = (item) => {
        if (!item.leadingItem && item.section.key === this.state.listData[0].key) {
            return (<View/>)
        }
        if (!item.trailingItem && item.section.key === this.state.listData[this.state.listData.length - 1].key) {
            return (<View/>)
        }
        return (<View style={userViewStyle.listSpacing}/>)
    };

    //list列表
    listItem = ({item}) => {
        return (
            <TouchableHighlight underlayColor={'#fff'}
                                onPress={() => this.props.navigation.navigate(item.link, item.params)}>
                <View style={userViewStyle.listItem}>
                    <View style={{flexDirection: 'row'}}>
                        <Image source={item.icon} style={userViewStyle.listIcon}/>
                        <Text>
                            {item.title}
                        </Text>
                    </View>
                    <View stlye={{textAlign: 'right'}}>
                        <Image source={require('../image/icon_next.png')} style={{width: 8, height: 12}}/>
                    </View>
                </View>
            </TouchableHighlight>)
    };

    //订单状态列表
    getOrderState = () => {
        let temp = [];
        let state = [
            {title: '待支付', icon: require('../image/user/order_dzf.png')},
            {title: '待发货', icon: require('../image/user/order_dfh.png')},
            {title: '待收货', icon: require('../image/user/order_dsh.png')},
            {title: '晒单', icon: require('../image/user/order_conmments.png')},
            {title: '售后', icon: require('../image/user/order_afterSales.png')},
        ];

        state.forEach((val, index) => {
            temp.push(
                <View style={userViewStyle.userOrderItem} key={index}>
                    <Image source={val.icon} style={{width: 18, height: 18}}/>
                    <Text style={userViewStyle.orderItemTitle}>{val.title}</Text>
                </View>
            )
        });
        return temp
    };
}