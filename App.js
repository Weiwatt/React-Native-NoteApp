/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import { Image} from 'react-native';
import { TabNavigator, StackNavigator } from 'react-navigation';
import NoteVC from './main/note/NoteVC';  //笔记首页
import SettVC from './main/setting/SettingVC';//设置界面
import UploadVC from './main/detail/UploadNote';//发布日记页面
import NoteDetailVC from './main/detail/NoteDetail';//日记详情页面
import AboutVC from './main/setting/AboutApp';  //关于我们界面

const noteImagePathArr = [require('./main/img/note/note_select0.png'),require('./main/img/note/note_select1.png'),require('./main/img/note/note_select2.png'),require('./main/img/note/note_select3.png'),require('./main/img/note/note_select4.png')];
const settImagePathArr = [require('./main/img/setting/setting_select0.png'),require('./main/img/setting/setting_select1.png'),require('./main/img/setting/setting_select2.png'),require('./main/img/setting/setting_select3.png'),require('./main/img/setting/setting_select4.png'),];

let MainTab = TabNavigator({

    Home: {
        screen: NoteVC,
        navigationOptions: () => ({
            tabBarLabel: '日记',
            tabBarIcon: ({ focused }) => (

                <Image
                    source={!focused ? require('./main/img/note/note_nomarl.png') : noteImagePathArr[global.ThemeColorTag]}
                    style={{width:24, height:24}}
                />
            ),
        }),
    },
    Setting: {
        screen: SettVC,
        navigationOptions: () => ({

            tabBarLabel: '设置',
            tabBarIcon: ({ focused }) => (
                <Image
                    source={!focused ? require('./main/img/setting/setting_normal.png') : settImagePathArr[global.ThemeColorTag]}
                    style={{ width:24, height:24}}
                />
            ),

        }),
    },
},
    {
        animationEnabled: false,
        // 是否在更改标签时显示动画。
        tabBarPosition: 'bottom', // 显示在底端，android 默认是显示在页面顶端的
        swipeEnabled: false, // 是否允许在标签之间进行滑动。
        lazy: true, // 是否根据需要懒惰呈现标签，而不是提前制作，意思是在app打开的时候将底部标签栏全部加载，默认false,推荐改成true哦。
        backBehavior: 'none', // 按 back 键是否跳转到第一个 Tab， none 为不跳转
        tabBarOptions: {
            // iOS属性
            // 因为第二个tabbar是在页面中创建的，所以前景色的设置对其无效，当然也可以通过设置tintColor使其生效
            activeTintColor: 'black',
            inactiveTintColor: 'black', // label和icon的前景色 不活跃状态下(未选中)。
            activeBackgroundColor: '#ffffff', //label和icon的背景色 活跃状态下（选中） 。
            inactiveBackgroundColor: '#ffffff', // label和icon的背景色 不活跃状态下（未选中）。
            showLabel: true, // 是否显示label，默认开启。
            style: {
                height: 49,
                backgroundColor: '#fff', // TabBar 背景色
            }, // tabbar的样式。
            labelStyle: {fontSize: 13}, //label的样式。
            // 安卓属性
            showIcon: true, // 是否显示图标，默认关闭。
            upperCaseLabel: false, // 是否使标签大写，默认为true。
        },
    }
);


const MainNav = StackNavigator({

    Home : {
      screen: MainTab,
    },

    Upload: {
        screen: UploadVC,
    },

    NoteDetail:{
        screen: NoteDetailVC,
    },

    AboutUS: {
        screen:AboutVC,
    },

    initialRouteName:'Home',

    }, {
    navigationOptions : {
      header:null,
    }
    },)

export default MainNav;