
/**
 * Created by Watt on 2019/05/09
 * 笔记设置界面通用的按钮
 */

import React, { Component } from  'react';

import {
    TouchableOpacity,
    Text,
    View,
    Image,
} from 'react-native';
import Adaption from "./Adaption";

export default class SettingBtn extends Component {

    constructor(props){

        super(props);

    }

    render(){

      return  <TouchableOpacity
          activeOpacity = {0.8}
          style = {[this.props.style,{height:AdaptionTool.Height(60,40), borderBottomWidth:1, borderTopWidth:1, borderColor:'#dbdbdb', width:SCREEN_WIDTH, flexDirection:'row'}]}
          onPress = {()=> this.props.SettingBtnClick ? this.props.SettingBtnClick() : null}
          >
            <View style = {{flex:0.2, justifyContent:'center', alignItems:'center'}}>
                <Image style = {{width:Adaption.Width(44), height:Adaption.Width(44)}} source = {this.props.imgurlPath}/>
            </View>
            <View style = {{flex:0.6, justifyContent:'center'}}>
                <Text allowFontScaling={false}>
                    {this.props.btnText}
                </Text>
            </View>
            <View style = {{flex:0.2, alignItems:'center', justifyContent:'center'}}>
                <Image style = {{width:Adaption.Width(40), height:Adaption.Width(40)}} source = {require('../img/rightRow.png')}/>
            </View>
        </TouchableOpacity>
    }

}