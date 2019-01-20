/**
 * Created by Administrator on 2019/1/5 0005.
 */
import React from 'react';
import {View, Text, SectionList, Image} from "react-native";
import {BoxShadow} from 'react-native-shadow'

import SwitchComponent from "./component/SwitchComponent";
import {safeStyle, shadowOpt} from '../style/safeStyle'
import {getAchievement, getJoiningPerformanceSum} from '../api/AssetServer'
import ButtonComponent from "./component/ButtonComponent";

let switchList = [
    {title: '部门加盟业绩'},
    {title: '全国加盟业绩'}
];
let params = [
    {type: 'BM', start: 1, offset: 10, isNext: true},
    {type: 'QG', start: 1, offset: 10, isNext: true}
];

let achievement = [{
    temp: {},
    achievementList: [],
    achievementIndex: 0,
}, {
    temp: {},
    achievementList: [],
    achievementIndex: 0,
}];
let currentIndex;
export default class JoinInView extends React.Component {

    static navigationOptions = ({navigation, screenProps}) => {
        if (navigation.state.params.currentIndex) {
            return ({
                headerTitle: '全国销售总额'
            })
        }
    };

    constructor(props) {
        super(props);
        currentIndex = this.props.navigation.state.params.currentIndex;
        this.state = {
            currentIndex: currentIndex || 0,
            bmAchievementList: [],
            bmAchievementTotal: 0,
            qgAchievementList: [],
            qgAchievementTotal: 0,
            refreshingState: true,
        };
    }

    componentWillMount() {
        if (this.props.navigation.state.params.level !== '普通用户') this.getAchievementData();
    }

    render() {
        if (this.props.navigation.state.params.level === '普通用户') {
            return (<View style={safeStyle.not_join}>
                <Image source={require('../image/not_join.png')} style={safeStyle.not_img}/>
                <Text style={{marginTop: 25}}>您目前为非会员，无法查看加盟业绩</Text>
                <ButtonComponent title="升级会员" addStyle={safeStyle.levelBtn}
                                 handle={() => this.props.navigation.navigate('MemberView')}/>
            </View>)
        }

        let listData = this.state.currentIndex === 0 ? this.state.bmAchievementList : this.state.qgAchievementList;

        return (
            <View style={safeStyle.joinInBox}>
                <SectionList
                    ListHeaderComponent={this.headerComponent}
                    sections={listData}
                    keyExtractor={(item) => item.year + item.month}
                    renderItem={this._renderItem}
                    onEndReached={this.upLoad}
                    onEndReachedThreshold={0.001}
                    ListFooterComponent={this.showFooter}
                    refreshing={this.state.refreshingState}
                    SectionSeparatorComponent={() => (<View style={{height: 6}}/>)}
                />
            </View>
        )
    }

    //上拉加载
    upLoad = () => {
        if (params[this.state.currentIndex].isNext && this.state.refreshingState === false) {
            this.setState({refreshingState: true});
            params[this.state.currentIndex].start++;
            this.getAchievementData()
        }
    };

    _renderItem = ({item}) => {
        return (
            <View style={safeStyle.listItem}>
                <View>
                    <Text>
                        {item.year}.{item.month}{this.state.currentIndex === 0 ? '部门' : '全国'}累计加盟业绩
                    </Text>
                </View>

                <View>
                    <Text style={safeStyle.rightText}>
                        {item.monthSum.toFixed(2)}
                    </Text>
                </View>
            </View>
        )
    };

    //页头数据
    headerComponent = () => {
        return (
            <View>
                {!currentIndex &&
                <View style={safeStyle.switchBox}>
                    <SwitchComponent switchList={switchList} handle={this.switchHandle}/>
                </View>
                }
                <BoxShadow setting={shadowOpt}>
                    <View style={safeStyle.joinInCountBox}>
                        <Text>{this.state.currentIndex === 0 ? '部门' : '全国'}累计加盟业绩（￥）</Text>
                        <Text style={safeStyle.joinInCount}>
                            ￥{(!this.state.currentIndex ? this.state.bmAchievementTotal : this.state.qgAchievementTotal).toFixed(2)}
                        </Text>
                    </View>
                </BoxShadow>
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

        let text = params[this.state.currentIndex].isNext ? '加载更多' : '没有更多了';
        return (
            <View style={{marginTop: 15, alignItems: 'center', marginBottom: 10}}>
                <Text style={{color: '#ccc'}}>{text}</Text>
            </View>
        )
    };

    //tab切换
    switchHandle = (currentIndex) => {
        this.setState({
            currentIndex: currentIndex,
        }, () => {
            if (!this.state.qgAchievementList.length) {
                getJoiningPerformanceSum({type: params[this.state.currentIndex].type}, (data) => {
                    this.setState({qgAchievementTotal: data.sum});
                });
                this.getAchievementData();
            }
        });
    };

    //获取业绩数据
    getAchievementData = () => {
        this.setState({refreshingState: true});
        //业绩数据请求
        getAchievement(params[this.state.currentIndex], data => {
            params[this.state.currentIndex].isNext = data.list.isNext;
            if (data.list.items) {
                //业绩数据整合
                data.list.items.forEach((v) => {
                    if (achievement[this.state.currentIndex].temp[v.year] === undefined) {
                        achievement[this.state.currentIndex].temp[v.year] = achievement[this.state.currentIndex].achievementIndex;
                        let achievementTemp = {};
                        achievementTemp.year = v.year;
                        achievementTemp.data = [];
                        achievementTemp.data.push(v);
                        achievement[this.state.currentIndex].achievementList[achievement[this.state.currentIndex].achievementIndex] = achievementTemp;
                        achievement[this.state.currentIndex].achievementIndex++;
                    } else {
                        achievement[this.state.currentIndex].achievementList.forEach((v2) => {
                            if (v2.year === v.year) {
                                achievement[this.state.currentIndex].achievementList[achievement[this.state.currentIndex].temp[v.year]].data.push(v);
                            }
                        })
                    }
                });

                if (this.state.currentIndex) {
                    this.setState({
                        qgAchievementList: achievement[this.state.currentIndex].achievementList,
                        qgAchievementTotal: data.allsum,
                    });
                } else {
                    this.setState({
                        bmAchievementList: achievement[this.state.currentIndex].achievementList,
                        bmAchievementTotal: data.allsum,
                    });
                }
                setTimeout(() => {
                    this.setState({
                        refreshingState: false
                    })
                }, 500)
            }
        })
    }
}