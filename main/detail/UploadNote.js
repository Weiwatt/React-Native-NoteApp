
/**
 * Created by Watt on 2019/05/08
 * 发布笔记的界面
 */

import React, { Component } from 'react';

import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    TextInput,
    AsyncStorage,
    DeviceEventEmitter,
    Keyboard,
} from 'react-native';

import Moment from 'moment';
import RNTipsView from '../comment/RNTipsView';
import NormalBtn from '../comment/NormalBtn';


export default  class UploadNote extends Component{

    constructor(props){
        super(props);

        this.state = ({
            noteTitle:'', //笔记的标题
            noteContent:'', //笔记的内容
            noteUploadTime:'',//笔记发布的时间
            cacheDataArr:props.navigation.state.params.listData ? props.navigation.state.params.listData : [], //上一页面的列表
        })
    }

    render(){

        return <TouchableOpacity activeOpacity = {1} onPress = {()=>{Keyboard.dismiss()}}style = {{flex:1, backgroundColor:'#f3f3f3'}}>
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
                        发布日记
                    </Text>
                </View>
                <View style = {{flex:0.2}} />
            </View>

            <View style = {{width:SCREEN_WIDTH - 30, height:30, margin:15, borderWidth:1, borderRadius:5, borderColor:'#d3d3d3'}}>
                <TextInput
                    style = {{marginLeft:15}}
                    allowFontScaling={false}
                    multiline={true}
                    maxLength={30}
                    placeholder={'输入记录的标题'}
                    returnKeyType={'default'}
                    clearButtonMode={'while-editing'}
                    keyboardType={'default'}
                    onChangeText = {(text) => {
                        this.state.noteTitle = text;
                    }}/>
            </View>

            <View  style = {{width:SCREEN_WIDTH - 30, height:150, margin:15, borderWidth:1, borderRadius:5, borderColor:'#d3d3d3'}}>
                <TextInput
                    style = {{marginLeft:15}}
                    allowFontScaling={false}
                    multiline={true}
                    numberOfLines={0}
                    placeholder={'输入要记录的内容'}
                    returnKeyType={'done'}
                    clearButtonMode={'while-editing'}
                    keyboardType={'default'}
                    maxLength={200}
                    onChangeText = {(text) => {
                        this.state.noteContent = text;
                    }}
                />
            </View>
            <NormalBtn
                style = {{width:SCREEN_WIDTH - 40, height:44, borderRadius:5,  margin:20}}
                btnTitle = {'发布日记'}
                NormalBtnOnPress = {()=> {

                    Keyboard.dismiss();

                    if (this.state.noteTitle == ''){

                        this.refs.RNShowInfoView && this.refs.RNShowInfoView.showInfo('日记的标题不能为空!',1)
                        return;
                    }
                    else if (this.state.noteContent == ''){

                        this.refs.RNShowInfoView && this.refs.RNShowInfoView.showInfo('日记的内容不能为空!',1)
                        return;
                    }
                    else {

                        this.refs.RNShowInfoView && this.refs.RNShowInfoView.showLoading('正在发布日记...');

                        setTimeout(()=>{

                            this.refs.RNShowInfoView && this.refs.RNShowInfoView.dissmiss();
                            this._saveNoteToLocal();


                        },1000)

                    }

                }}
            />
            <RNTipsView ref='RNShowInfoView'/>
        </TouchableOpacity>
    }

    _saveNoteToLocal = () => {

        let date = new Date();
        let zhouji = date.getDay();
        let timeSteam = Moment(Moment().toDate().getTime()).format("YYYY-MM-DD HH:mm:ss");
        let riqiArr = timeSteam.split(' ');
        let riqi = riqiArr[0];
        let timeStr = riqiArr[1];
        let zhoujiStr = '';

        switch (zhouji){

            case 1:
                zhoujiStr = '周一';
                break;

            case 2:
                zhoujiStr = '周二';
                break;

            case 3:
                zhoujiStr = '周三';
                break;

            case 4:
                zhoujiStr = '周四';
                break;

            case 5:
                zhoujiStr = '周五';
                break;

            case 6:
                zhoujiStr = '周六';
                break;

            case 7:
                zhoujiStr = '周七';
                break;

        }

        let cacheDataObject = {title:this.state.noteTitle, content:this.state.noteContent, yearday:riqi, xingqi:zhoujiStr, time:timeStr};
        this.state.cacheDataArr.splice(0,0,cacheDataObject); //每次新增的数据都插入第一个位置
        let cacheJsonData = JSON.stringify(this.state.cacheDataArr);
        AsyncStorage.setItem(CacheListKey, cacheJsonData, (error) => {

            if (!error){

                DeviceEventEmitter.emit('UploadNoteSuccessNotification', this.state.cacheDataArr , 'upload');
                this.props.navigation.goBack();
            }
        })
    }

}

const styles = StyleSheet.create({

});