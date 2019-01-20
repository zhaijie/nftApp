/**
 * Created by Administrator on 2018/12/27 0009.
 */
import React from 'react';
import {createBottomTabNavigator} from 'react-navigation';

import HomeView from "../view/HomeView";
import InformationView from "../view/InformationView";
import ActivityView from "../view/ActivityView";
import UserView from "../view/UserView";
import TabBarItemComponent from "../view/component/TabBarItemComponent";

const TabBar = createBottomTabNavigator({
    Home: {
        screen: HomeView,
        navigationOptions: ({navigation}) => ({
            tabBarLabel: '商城',
            tabBarIcon: ({focused, tintColor}) => (
                focused ?
                    <TabBarItemComponent icon={(require('../image/icon_tab_home1.png'))}/> :
                    <TabBarItemComponent icon={(require('../image/icon_tab_home2.png'))}/>
            )
        }),
    },
    InformationView: {
        screen: InformationView,
        navigationOptions: ({navigation}) => ({
            tabBarLabel: '资讯',
            tabBarIcon: ({focused, tintColor}) => (
                focused ?
                    <TabBarItemComponent icon={(require('../image/icon_tab_information1.png'))}/> :
                    <TabBarItemComponent icon={(require('../image/icon_tab_information2.png'))}/>
            )
        }),
    },
    ActivityView: {
        screen: ActivityView,
        navigationOptions: ({navigation}) => ({
            tabBarLabel: '活动',
            tabBarIcon: ({focused, tintColor}) => (
                focused ?
                    <TabBarItemComponent icon={(require('../image/icon_tab_market1.png'))}/> :
                    <TabBarItemComponent icon={(require('../image/icon_tab_market2.png'))}/>
            )
        }),
    },
    Mine: {
        screen: UserView,
        navigationOptions: ({navigation}) => ({
            tabBarLabel: '我的',
            tabBarIcon: ({focused, tintColor}) => (
                focused ?
                    <TabBarItemComponent icon={(require('../image/icon_tab_user1.png'))}/> :
                    <TabBarItemComponent icon={(require('../image/icon_tab_user2.png'))}/>
            )
        }),
    },
}, {
    initialRouteName: 'Mine',
    swipeEnabled: true,
    animationEnabled: true,
    backBehavior: null,
    tabBarOptions: {
        activeTintColor: '#188C3F',
    }
});

export default TabBar;
