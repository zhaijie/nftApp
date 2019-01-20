/**
 * Created by Administrator on 2019/1/5 0005.
 */
import {postHttp} from './Http'

//客服信息
export function getCustomerService(successCallBack) {
    postHttp('/app/asset/getCustomerService', '', function (data) {
        successCallBack(data)
    })
}

//获取下载链接
export function getDownload(successCallBack) {
    postHttp('/app/user/getDownload', '', function (data) {
        successCallBack(data)
    })
}

//添加意见反馈
export function addSuggestion(params, successCallBack) {
    postHttp('/app/feedback/add', params, function (data) {
        successCallBack(data)
    })
}

//获取意见反馈列表
export function suggestionList(params, successCallBack) {
    postHttp('/app/feedback/opinionList', params, function (data) {
        successCallBack(data)
    })
}

export function delSuggestion(params, successCallBack) {
    postHttp('/app/feedback/updateOpinion', params, function (data) {
        successCallBack(data)
    })
}







