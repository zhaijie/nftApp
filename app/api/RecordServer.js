/**
 * Created by Administrator on 2019/1/7 0005.
 */
import {postHttp} from './Http'

//现金交易记录
export function cashRecord(params, successCallBack) {
    postHttp('/app/asset/cashRecord', params, function (data) {
        successCallBack(data)
    })
}

//现金交易详情
export function getCashRecordDetails(params, successCallBack) {
    postHttp('/app/asset/getCashRecordDetails', params, function (data) {
        successCallBack(data)
    })
}

//积分交易记录
export function integralRecord(params, successCallBack) {
    postHttp('/app/asset/integralRecord', params, function (data) {
        successCallBack(data)
    })
}

//积分交易详情
export function getIntegralRecordDetails(params, successCallBack) {
    postHttp('/app/asset/getIntegralRecordDetails', params, function (data) {
        successCallBack(data)
    })
}

