/**
 * Created by Administrator on 2019/1/5 0005.
 */
import React from 'react';
import {View, Text, Image, FlatList, ScrollView} from "react-native";

import {memberUpgradeStyle} from '../style/memberStyle'
import {customerStyle} from  '../style/settingStyle'
import {getCustomerService} from '../api/SuggestionServer'

export default class MemberUpgradeView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            listData: []
        };
    }

    componentWillMount() {
        getCustomerService((data) => {
            this.setState({
                listData: [
                    {id: '1', title: '微信客服', val: data.item.wx},
                    {id: '2', title: 'QQ客服', val: data.item.qq},
                    {id: '3', title: '电话客服', val: data.item.phone},
                    {id: '4', title: '邮箱客服', val: data.item.email}
                ]
            });
        })
    }

    render() {
        return (
            <ScrollView>
                <Image source={require('../image/member/member_banner.png')}
                       style={memberUpgradeStyle.memberUpgradeBg}/>
                <View style={memberUpgradeStyle.rule}>
                    <Text style={memberUpgradeStyle.ruleText}>会员升级规则</Text>

                    <Text style={{fontSize: 15}}>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;会员升级各级别需要缴纳相应的加盟费用并需提供营业执照等相关资料；
                    </Text>
                    <Text style={{fontSize: 15}}>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;升级不同级别有不同商品奖励、期权奖励或积分奖励。
                    </Text>
                </View>

                <View style={memberUpgradeStyle.line}/>

                <View style={memberUpgradeStyle.rule}>
                    <Text style={memberUpgradeStyle.ruleText}>升级方法</Text>
                    <Text style={{fontSize: 15, marginBottom: 15}}>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;本会员升级方式采用线下升级的方式，具体的升级规则、加盟费及奖励规则请联系以下客服进行咨询升级：
                    </Text>

                    <FlatList
                        data={this.state.listData}
                        keyExtractor={(item) => item.id}
                        renderItem={this._renderItem}
                    />

                    <Text style={memberUpgradeStyle.explain}>
                        本会员升级规则最终解释权归农富通所有
                    </Text>
                </View>
            </ScrollView>
        )
    }

    _renderItem = ({item}) => {
        return (
            <View style={[customerStyle.listItem, {marginHorizontal: 0}]}>
                <View>
                    <Text style={customerStyle.listTitle}>
                        {item.title}
                    </Text>
                </View>

                <View>
                    <Text style={customerStyle.rightText}>
                        {item.val}
                    </Text>
                </View>
            </View>
        )
    }
}