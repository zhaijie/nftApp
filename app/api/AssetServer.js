/**
 * Created by Administrator on 2019/1/5 0010.
 */
import {postHttp} from './Http'

//我的现金总额
export function getAmountTotal(successCallBack) {
    postHttp('/app/asset/getAmountTotal', '', function (data) {
        successCallBack(data)
    })
}

//我的积分总额
export function getIntegralTotal(successCallBack) {
    postHttp('/app/asset/getIntegralTotal', '', function (data) {
        successCallBack(data)
    })
}

//获取积分划转配置参数
export function getDealConfig(successCallBack) {
    postHttp('/app/asset/getDealConfig', '', function (data) {
        successCallBack(data)
    })
}

//积分划转
export function addFundsTransfer(params, successCallBack) {
    postHttp('/app/asset/addFundsTransfer', params, function (data) {
        successCallBack(data)
    })
}

//获取加盟业绩
export function getAchievement(params, successCallBack) {
    postHttp('/app/user/getLevelAccumulatedJoiningPerformance', params, function (data) {
        successCallBack(data)
    })
}

//获取加盟业绩总额
export function getJoiningPerformanceSum(params, successCallBack) {
    postHttp('/app/user/getJoiningPerformanceSum', params, function (data) {
        successCallBack(data)
    })
}
