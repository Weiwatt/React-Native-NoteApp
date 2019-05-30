
/**
 * Created by Watt on 2019/05/08
 * 笔记详情界面
 */

import React, { Component } from 'react';

import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
} from 'react-native';


export default  class NoteDetail extends Component{

    constructor(props){
        super(props);

        this.state = ({
            noteData:props.navigation.state.params.noteModel,
        })
    }

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
                        日记详情
                    </Text>
                </View>
                <View style = {{flex:0.2}} />
            </View>
            <View style = {{margin:10}}>
                <Text style = {{color:'#434343', fontSize:AdaptionTool.Font(16,14)}} allowFontScaling={false} >
                    {this.state.noteData.yearday} <Text style = {{}} allowFontScaling={false} >
                    {`   ${this.state.noteData.time}`} <Text style = {{}} allowFontScaling={false} >
                    {`   ${this.state.noteData.xingqi}`}
                        </Text>
                    </Text>
                </Text>
            </View>
            <View style = {{marginLeft:10, marginTop:5}}>
                <Text style = {{color:'black', fontSize:AdaptionTool.Font(18,16)}} allowFontScaling={false} >
                    {this.state.noteData.title}
                </Text>
            </View>
            <View style = {{marginLeft:10, marginTop:20}}>
                <Text style = {{color:'black', fontSize:AdaptionTool.Font(20,18)}} allowFontScaling={false} >
                    {this.state.noteData.content}
                </Text>
            </View>
        </View>
    }

}

const styles = StyleSheet.create({


})
