/**
 * Created by Administrator on 2019/1/8 0008.
 */
import {StyleSheet} from "react-native";
import {commonStyle} from './commonStyle';

let levelScrollItemWidth = Math.floor(commonStyle.width * .872);
let levelTopImgWidth = commonStyle.width * 0.6;

export const memberStyle = StyleSheet.create({

    memberScroll: {
        // height: commonStyle.height - 60
    },

    levelScroll: {
        paddingVertical: 12,
        paddingHorizontal: 16
    },
    levelScrollItem: {
        width: levelScrollItemWidth,
        height: levelScrollItemWidth * .49,
        marginHorizontal: 8,
        padding: 24
    },
    levelScrollItemImg: {
        width: '100%',
        height: '100%'
    },
    levelBox: {
        flexDirection: commonStyle.row,
        justifyContent: commonStyle.between,
    },
    levelText: {
        color: '#fff',
        fontSize: 20,
        height: 22,
        lineHeight: 22,
        fontWeight: 'bold'
    },
    is_level: {
        width: 74,
        height: 22,
        lineHeight: 22,
        borderRadius: 11,
        fontSize: 12,
        backgroundColor: 'rgba(0,0,0,.1)',
        color: '#fff',
        textAlign: commonStyle.center
    },
    equity: {
        flex: 1,
        justifyContent: commonStyle.end
    },
    equityTime: {
        fontSize: 12,
        color: '#D5d5d5',
        marginBottom: 5
    },

    upgrade: {
        padding: 16,
        paddingBottom: 80
    },

    upgradeTop: {
        backgroundColor: commonStyle.bgColor,
        height: 12,
        width: '100%'
    },
    upgradeTitle: {
        borderLeftWidth: 4,
        borderColor: commonStyle.color,
        height: 18,
        lineHeight: 18,
        fontSize: 17,
        fontWeight: 'bold',
        paddingLeft: 12
    },
    upgradeItem: {
        borderRadius: 5,
        height: 75,
        justifyContent: commonStyle.between,
        alignItems: commonStyle.center,
        flexDirection: commonStyle.row,
        position: commonStyle.relative,
        paddingHorizontal: 12,
        backgroundColor: '#fff'
    },
    upgradeItemActive: {
        borderWidth: 1,
        borderColor: commonStyle.color
    },
    upgradeDec: {
        position: commonStyle.absolute,
        left: 40
    },
    upgradeEquity: {
        color: '#999',
        fontSize: 12,
        marginTop: 3
    },
    upgradePrice: {
        fontSize: 17,
        fontWeight: 'bold'
    },
    goUpgrade: {
        backgroundColor: '#fff',
        height: 60,
        paddingHorizontal: 16,
        paddingVertical: 8,
        width: commonStyle.width,
    },
    levelTop: {
        marginTop: 60,
        alignItems: commonStyle.center
    },
    levelTopImg: {
        width: levelTopImgWidth,
        height: levelTopImgWidth * .62,
        marginBottom: 22
    }
});


export const memberUpgradeStyle = StyleSheet.create({
    memberUpgradeBg: {
        width: commonStyle.width,
        height: commonStyle.width * .24
    },
    rule: {
        paddingVertical: 13,
        paddingHorizontal: 16
    },
    ruleText: {
        fontSize: 15,
        fontWeight: 'bold',
        marginBottom: 20
    },
    line: {
        width: '100%',
        height: 12,
        backgroundColor: commonStyle.bgColor
    },
    explain: {
        color: '#ccc',
        textAlign: commonStyle.center,
        marginTop: 34
    }
});