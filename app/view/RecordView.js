/**
 * Created by Administrator on 2019/1/5 0005.
 */
import React from 'react';
import {View, Text, SectionList, TouchableHighlight} from "react-native";

import AssetComponent from "./component/AssetComponent";
import {recordStyle} from '../style/recordStyle';

import {cashRecord, integralRecord} from '../api/RecordServer'

let navigation;
let params = {start: 1, offset: 10, type: '1', isNext: 1};
export default class RecordView extends React.Component {
    static navigationOptions = ({navigation}) => {
        if (!navigation.state.params) {
            return
        }

        let title = navigation.state.params.type === 'integral' ? '积分' : '现金';
        return ({
            headerTitle: '我的' + title,
            headerRight: <Text style={{fontSize: 14, color: '#999', marginRight: 16}}>
                {title}攻略
            </Text>
        })
    };

    constructor(props) {
        super(props);
        this.state = {
            recordTabIndex: '1',
            type: '',
            listData: [],
            refreshingState: true
        };
    }

    componentWillMount() {
        this.getRecordData(this.props.navigation.state.params.type);
    }

    render() {
        navigation = this.props.navigation;
        return (
            <View style={{flex: 1}}>
                {this.headerComponent()}

                <SectionList
                    sections={this.state.listData}
                    keyExtractor={(item) => item.id}
                    renderItem={this._renderItem}
                    renderSectionHeader={this.sectionHeader}
                    ListFooterComponent={this.showFooter}
                    refreshing={this.state.refreshingState}
                    onEndReachedThreshold={0.001}
                    onEndReached={this.upLoad}
                    ItemSeparatorComponent={() =>
                        <View style={recordStyle.listBorder}/>
                    }
                />
            </View>
        )
    }

    //上拉加载
    upLoad = () => {
        if (params.isNext && this.state.refreshingState === false) {
            this.setState({refreshingState: true});
            params.start++;
            this.getRecordData()
        }
    };

    sectionHeader = (item) => {
        let index = item.section.yearsTime.indexOf('-');
        return (<Text style={recordStyle.recordMonth}>
            {item.section.yearsTime.substring(0, index) + '年' + item.section.yearsTime.substring(index + 1) + '月'}
        </Text>)
    };

    headerComponent = () => {
        let tabArr = {
            integral: [
                {id: '1', title: '全部记录'},
                {id: '2', title: '收入记录'},
                {id: '3', title: '支出记录'},
            ],
            cash: [
                {id: '1', title: '全部记录'},
                {id: '2', title: '获取记录'},
                {id: '3', title: '使用记录'},
            ]
        };

        let tabDom = [];

        if (!this.state.type) {
            return null
        }

        tabArr[this.state.type].forEach((v) => {
            tabDom.push(
                <Text key={v.title} style={this.state.recordTabIndex === v.id ? recordStyle.recordTabActive : ''}
                      onPress={() => this.switchTab(v)}>
                    {v.title}
                </Text>
            )
        });

        return (
            <View>
                <AssetComponent
                    navigation={navigation}
                    isEnd={this.state.type === 'integral'}
                    isStartHandle={() => {
                        this.props.navigation.setParams({type: 'cash'});
                        this.getRecordData('cash')
                    }}
                    isEndHandle={() => {
                        this.props.navigation.setParams({type: 'integral'});
                        this.getRecordData('integral')
                    }}/>
                <View style={recordStyle.recordTab}>
                    {tabDom}
                </View>
            </View>
        )
    };

    //设置尾部
    showFooter = () => {
        //判断是否加载中
        if (this.state.refreshingState) {
            return (
                <View style={{marginTop: 15, alignItems: 'center', marginBottom: 10}}>
                    <Text style={{color: '#ccc'}}>数据加载中......</Text>
                </View>
            )
        }

        let text = params.isNext ? '加载更多' : '没有更多记录了';
        return (
            <View style={{marginTop: 15, alignItems: 'center', marginBottom: 10}}>
                <Text style={{color: '#ccc'}}>{text}</Text>
            </View>
        )
    };

    _renderItem = ({item}) => {
        return (
            <TouchableHighlight underlayColor={'#eee'}
                                onPress={() => navigation.navigate('RecordDetailView', {
                                    recordId: item.id,
                                    type: this.state.type,
                                    incomeSpending: item.incomeSpending
                                })}>
                <View style={recordStyle.recordItem}>
                    <View style={recordStyle.recordItemRow}>
                        <Text style={{fontSize: 15}}>{item.type}</Text>
                        <Text style={{fontSize: 15, fontWeight: 'bold'}}>
                            {item.incomeSpending + '' === '1' ? '+' : '-'}{item.number}元
                        </Text>
                    </View>
                    <View style={recordStyle.recordItemRow}>
                        <Text style={recordStyle.recordItemTime}>{item.time}</Text>
                        <Text style={recordStyle.recordItemTime}>{item.status}</Text>
                    </View>
                </View>
            </TouchableHighlight>
        )
    };

    //获取交易记录
    getRecordData = (type) => {
        this.state.type = type;
        params.type = this.state.recordTabIndex;
        params.isNext = 1;
        params.offset = type === 'cash' ? 10 : 1;

        if (this.state.type === 'integral') {
            integralRecord(params, (data) => {
                params.isNext = data.isNext;
                if (data.items) {
                    data.items.forEach((v, i) => {
                        data.items[i].data = data.items[i].cash;
                    });
                    this.setState({
                        listData: data.items,
                        refreshingState: false
                    })
                }
            });
        } else {
            cashRecord(params, (data) => {
                params.isNext = data.isNext;
                if (data.items) {
                    data.items.forEach((v, i) => {
                        data.items[i].data = data.items[i].cash;
                    });
                    this.setState({
                        listData: data.items,
                        refreshingState: false
                    })
                }
            });
        }
    };

    //tab切换
    switchTab = (v) => {
        this.setState({recordTabIndex: v.id}, () => {
            this.getRecordData(this.state.type)
        })
    }
}


