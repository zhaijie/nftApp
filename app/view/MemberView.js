/**
 * Created by Administrator on 2019/1/5 0005.
 */
import React from 'react';
import {View, Text, ScrollView, Image, Dimensions, ImageBackground, TouchableHighlight} from "react-native";
import {BoxShadow} from 'react-native-shadow'

import {getGrade, getUpgradeFeeList} from '../api/FormServer'
import {memberStyle} from '../style/memberStyle'
import ButtonComponent from './component/ButtonComponent'

let levelScrollItemWidth = Math.floor(Dimensions.get('window').width * .872);
let currentScroll;
let upgradeList;
let upgradeListCopy;

export default class MemberView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            preScrollRange: 0,
            currentIndex: 0,
            scrollRange: levelScrollItemWidth + 13,
            scrollDom: null,
            upgradeDom: null,
            isMoreLevel: null
        };
    }

    componentWillMount() {
        getGrade(data => {
            this.renderLevelScroll(data.item.grade);
        });

        getUpgradeFeeList(data => {
            upgradeListCopy = JSON.parse(JSON.stringify(data.reverse()));
            upgradeList = data;
            this.renderUpgrade(upgradeList);
            this.setState({isMoreLevel: <Text style={memberStyle.upgradeTitle}>升级为会员享受更多权益</Text>})
        })
    }

    render() {
        return (
            <View style={{flex: 1}}>
                <ScrollView style={memberStyle.memberScroll}>
                    <ScrollView
                        snapToAlignment='start'
                        snapToInterval={this.state.scrollRange}
                        style={memberStyle.levelScroll}
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        pagingEnabled={true}
                        onMomentumScrollEnd={this.memberScrollEnd}>
                        {this.state.scrollDom}
                    </ScrollView>

                    <View style={memberStyle.upgradeTop}/>
                    <View style={memberStyle.upgrade}>
                        {this.state.isMoreLevel}
                        {this.state.upgradeDom}
                    </View>
                </ScrollView>
                <BoxShadow setting={shadowOpt2}>
                    <View style={memberStyle.goUpgrade}>
                        <ButtonComponent title='升级会员等级'
                                         handle={() => this.props.navigation.navigate('MemberUpgradeView')}/>
                    </View>
                </BoxShadow>
            </View>
        )
    }

    renderUpgrade(upgradeList) {
        let temp = [];
        upgradeList.forEach((v) => {
            temp.push(
                <BoxShadow key={v.memberlevel} setting={shadowOpt}>
                    <TouchableHighlight underlayColor="transparent" onPress={() => this.selectUpgradeItem(v)}>
                        <View style={[memberStyle.upgradeItem, v.state ? memberStyle.upgradeItemActive : '']}>
                            <Image style={{width: 16, height: 16}}
                                   source={v.state ? require('../image/user/icon_yuan.png') : require('../image/user/icon_yuann.png')}
                            />
                            <View style={memberStyle.upgradeDec}>
                                <Text style={{fontSize: 15}}>{v.memberlevel}</Text>
                                <Text style={memberStyle.upgradeEquity}>有效期为{v.validity}，升级赠送{v.give}积分</Text>
                            </View>

                            <Text style={memberStyle.upgradePrice}>{v.fee}元</Text>
                        </View>
                    </TouchableHighlight>
                </BoxShadow>
            )
        });
        this.setState({upgradeDom: temp})
    }

    renderLevelScroll(currentLevel) {
        let levelArr = [
            {title: '普通用户', bgImg: require('../image/member/user_level1.png'), time: ''},
            {title: '农创微店', bgImg: require('../image/member/user_level2.png'), time: ''},
            {title: '渠道合伙人', bgImg: require('../image/member/user_level3.png'), time: ''},
            {title: '品牌孵化站', bgImg: require('../image/member/user_level4.png'), time: ''},
            {title: '区(县)服务中心', bgImg: require('../image/member/user_level5.png'), time: ''},
            {
                title: '市(地)管理中心',
                bgImg: require('../image/member/user_level6.png'),
                time: '',
                addStyle: {marginRight: 24}
            },
        ];

        let temp = [];

        levelArr.forEach((v, i) => {
            temp.push(
                <ImageBackground key={v.title} source={v.bgImg} style={[memberStyle.levelScrollItem, v.addStyle]}>
                    <View style={memberStyle.levelBox}>
                        <Text style={memberStyle.levelText}>{v.title}</Text>
                        {this.showCurrentLevel(v.title, currentLevel)}
                    </View>

                    <View style={memberStyle.equity}>
                        {this.showTime(v.time)}
                        <Text style={{color: '#fff'}}>{i === 0 ? '非会员暂无相关权益' : '升级享受更多权益'}</Text>
                    </View>
                </ImageBackground>)
        });
        this.setState({scrollDom: temp})
    }

    selectUpgradeItem = (v) => {
        for (let i = 0; i < upgradeList.length; i++) {
            if (v.memberlevel === upgradeList[i].memberlevel) {
                upgradeList[i].state = true;
            } else {
                upgradeList[i].state = false;
            }
        }
        this.renderUpgrade(upgradeList)
    };

    switchScroll = (current) => {
        upgradeList = upgradeListCopy.slice(current, upgradeListCopy.length);
        this.renderUpgrade(upgradeList);
        if (current === upgradeListCopy.length) {
            this.setState({
                isMoreLevel: <View style={memberStyle.levelTop}>
                    <Image source={require('../image/member/icon_max.png')} style={memberStyle.levelTopImg}/>
                    <Text style={{fontSize: 21}}>当前已为最高等级会员</Text>
                    <Text>更多等级及权益敬请期待</Text>
                </View>
            })
        } else {
            this.setState({isMoreLevel: <Text style={memberStyle.upgradeTitle}>升级为会员享受更多权益</Text>})
        }
    };

    //显示会员到期时间
    showTime = (time) => {
        return (time ? <Text style={memberStyle.equityTime}>有效期至：{time}</Text> : null)
    };

    //显示当前等级
    showCurrentLevel = (level, currentLevel) => {
        return ((level === currentLevel) ? <Text style={memberStyle.is_level}>当前等级</Text> : null)
    };

    memberScrollEnd = (event) => {
        currentScroll = Math.floor(event.nativeEvent.contentOffset.x);

        if (currentScroll < levelScrollItemWidth + 13) {
            this.setState({scrollRange: levelScrollItemWidth + 13})
        } else {
            this.setState({scrollRange: levelScrollItemWidth + 15})
        }

        if (this.state.preScrollRange === 0 && currentScroll === (levelScrollItemWidth + 12)) {
            this.state.currentIndex++;
            this.state.preScrollRange = currentScroll;
            this.switchScroll(this.state.currentIndex);
            return
        }

        if (this.state.preScrollRange < currentScroll) {
            this.state.currentIndex++;
        }

        if (this.state.preScrollRange > currentScroll) {
            this.state.currentIndex--;
        }
        this.switchScroll(this.state.currentIndex);
        this.state.preScrollRange = currentScroll;
    }
}

const shadowOpt = {
    width: Dimensions.get('window').width * .91,
    height: 74,
    color: "#333",
    border: 3,
    radius: 5,
    opacity: 0.08,
    x: 0,
    y: 0,
    style: {marginTop: 12}
};

const shadowOpt2 = {
    width: Dimensions.get('window').width,
    height: 60,
    color: "#333",
    border: 3,
    opacity: .1,
    x: 0,
    y: 0,
    style: {
        position: 'absolute',
        bottom: 0,
    }
};