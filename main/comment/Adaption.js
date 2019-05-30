
/**
 * Created by Watt on 2019/05/09
 * 适配iOS所有尺寸的工具类
 */

import { Dimensions } from 'react-native';

//这里获取到屏幕的宽高
const  {width, height} = Dimensions.get('window');

const BaseWidth = 414;
const BaseHeight = 736;

const AdaptionWidth = width / BaseWidth;
const AdaptionHeight = (height >= 812 ? (height - 34 - 22) : height) / BaseHeight;

export default {

    // 传一个你想要的字体大小，和一个你期待适配后的字体不能小于的字体大小
    // 使用：fontSize: Adaption.Font(17, 15)
    Font(mainFont, minFont) {
        return  (mainFont * AdaptionWidth) <= minFont ? minFont : mainFont * AdaptionWidth;
    },

    Height(height) {
        return height * AdaptionHeight;
    },

    Width(width) {
        return width * AdaptionWidth;
    },
}