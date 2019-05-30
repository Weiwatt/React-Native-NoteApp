/**
 * Created by Watt on 2019/05/08
 * 一些全局配置的参数
 */


import {
    Dimensions
} from 'react-native';

import Adaption from './Adaption';  //适配宽高和文字大小的工具

let { width, height } = Dimensions.get('window');

// 获取屏幕宽度  使用： 例  SCREEN_WIDTH
global.SCREEN_WIDTH = width;
// 获取屏幕高度  使用： 例  SCREEN_HEIGHT
global.SCREEN_HEIGHT = height;
//App主题色
global.APPThemeColor = '#14bc80';
//判断是否是iphone X 机型以上
global.ISIPHONEX = SCREEN_HEIGHT >= 812 ? true : false;
//缓存到本地的列表的key
global.CacheListKey = 'CacheListKey';
//缓存到本地主题颜色的key
global.CacheThemeColorKey = 'CacheThemeColorKey';
//全局使用的适配工具
global.AdaptionTool = Adaption;
//一个全局的主题色数组
global.ThemeColorArr = ['#14bc80','#313a3e','#4aabec','#e79bab','#F1ABC2'];
//一个全局的主题色的下标。默认为0
global.ThemeColorTag = 0;
//当前APP的版本号
global.AppVerStion = 'V1.0.8';
