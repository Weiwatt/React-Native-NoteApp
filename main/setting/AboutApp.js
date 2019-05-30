/**
 * Created by Watt on 2019/05/10
 * 笔记的关于我们界面
 */

import React, { Component } from 'react';

import {
    View,
    Text,
    TouchableOpacity
} from 'react-native';


export default class AboutApp extends Component {


    render(){

        return <View style = {{flex:1, backgroundColor:'#f3f3f3'}}>
            <View style = {{height:SCREEN_HEIGHT >= 812 ? 88 : 64, width:SCREEN_WIDTH, backgroundColor:APPThemeColor, flexDirection:'row'}}>
                <View style = {{flex:0.2, alignItems:'center', justifyContent:'center'}} >
                    <TouchableOpacity
                        style = {{width:40, height:20, marginTop:ISIPHONEX ? 40 : 30}}
                        activeOpacity = {0.8}
                        onPress = {() => {
                            this.props.navigation.goBack();
                        }}
                    >
                        <Text style = {{color:'#fff', fontSize:AdaptionTool.Font(17,15)}} allowFontScaling={false}>
                            {`<返回`}
                        </Text>
                    </TouchableOpacity>
                </View>
                <View style = {{flex:0.6, alignItems:'center', justifyContent:'center', paddingTop:ISIPHONEX ? 40 : 30}} >
                    <Text allowFontScaling={false} style = {{fontSize:18, color:'#fff'}}>
                        关于我们
                    </Text>
                </View>
                <View style = {{flex:0.2}} />
            </View>
            <View style = {{margin:20, alignItems:'center'}}>
                <Text allowFontScaling={false} style = {{fontSize:AdaptionTool.Font(20,17), textAlign:'center'}}>
                    {`当前版本是${global.AppVerStion}`}
                </Text>
            </View>
        </View>
    }

}