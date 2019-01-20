/**
 * Created by Administrator on 2019/1/5 0005.
 */
import React from 'react';
import {View, Text, Image, FlatList} from "react-native";

import {customerStyle} from  '../../style/settingStyle'
import {getCustomerService} from '../../api/SuggestionServer'

export default class CustomerView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            listData: []
        }
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
            <View>
                <Image source={require('../../image/user/customer.png')} style={customerStyle.customerBg}/>
                <FlatList
                    data={this.state.listData}
                    keyExtractor={(item) => item.id}
                    renderItem={this._renderItem}
                />
            </View>
        )
    }

    _renderItem = ({item}) => {
        return (
            <View style={customerStyle.listItem}>
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