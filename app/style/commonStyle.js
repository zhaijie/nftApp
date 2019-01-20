/**
 * Created by Administrator on 2018/12/27 0014.
 */
import {Dimensions} from 'react-native';


export const commonStyle = {
    /** color **/
    // 常用颜色
    color: '#188C3F',
    priceColor: '#FC403B',
    errColor: '#FC403B',

    //按钮点击背景颜色
    buttonClickColor: '#C1E1CC',
    modalTopBg: '#C1E1CC',

    bgColor: '#F5F6FA', // 默认背景颜色
    fontColor: '#333', // 默认字体颜色
    subColor: '#ccc',
    placeholderColor: '#ccc',
    defaultInputBorderColor: '#eee',
    defaultBorderColor:'#eee',
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    clear: 'transparent',
    borderRadius: 5,

    // /** space **/
    // // 上边距
    marginTop25: 25,
    // // 左边距
    // marginLeft: 10,
    // // 下边距
    // marginBotton: 10,
    // // 右边距
    // marginRight: 10,
    // // 内边距
    padding: 12,
    // // 导航的leftItem的左间距
    // navMarginLeft: 15,
    // // 导航的rightItem的右间距
    // navMarginRight: 15,
    //
    // /** width **/
    // // 导航栏左右按钮image宽度
    // navImageWidth: 25,
    // // 边框线宽度
    // borderWidth: 1,
    // // 分割线高度
    // lineWidth: 0.8,
    //
    // /** height **/
    // // 导航栏的高度
    // navHeight: Platform.OS === 'ios' ? 64 : 56,
    // // 导航栏顶部的状态栏高度
    // navStatusBarHeight: Platform.OS === 'ios' ? 20 : 0,
    // // 导航栏除掉状态栏的高度
    // navContentHeight: Platform.OS === 'ios' ? 44 : 56,

    // /** opacity **/
    // // mask
    // modalOpacity: 0.3,
    // // touchableOpacity
    // taOpacity: 0.1,
    //
    // /** 定位 **/
    absolute: 'absolute',
    relative: 'relative',

    /** flex **/
    around: 'space-around',
    between: 'space-between',
    end: 'flex-end',
    center: 'center',
    row: 'row'
};