/**
 * Created by Watt on 2019/05/09
 * 笔记应用所有页面通用的主题背景色的按钮
 */

import React, { Component } from 'react';

import {
    TouchableOpacity,
    Text,
} from 'react-native';

export default class NormalBtn extends Component{

    render(){

        return <TouchableOpacity
            style = { [this.props.style , {backgroundColor:APPThemeColor, alignItems:'center', justifyContent:'center'}]}
            activeOpacity={0.8}
            onPress = {() => {this.props.NormalBtnOnPress ? this.props.NormalBtnOnPress() : null}}>
            <Text allowFontScaling={false} style = {{backgroundColor:'rgba(0,0,0,0)', color:'#fff'}}>
                {this.props.btnTitle}
            </Text>
        </TouchableOpacity>
    }

}