
/**
 * Created by Watt on 2019/05/08
 * 笔记的设置界面
 */

import React, { Component } from 'react';

import {
    View,
    Text,
    StyleSheet,
    AsyncStorage,
    Alert,
    DeviceEventEmitter,
    Modal,
    TouchableOpacity,
    ImageBackground,
    Image,
} from 'react-native';

import SettingBtn from "../comment/SettingBtn";
import RNInfoView from '../comment/RNTipsView'; //自定义的视图

const deleDataArr = [require('../img/delete/deletData0.png'), require('../img/delete/deletData1.png'),require('../img/delete/deletData2.png'),require('../img/delete/deletData3.png'),require('../img/delete/deletData4.png')];
const themeDataArr = [require('../img/theme/theme0.png'), require('../img/theme/theme1.png'), require('../img/theme/theme2.png'), require('../img/theme/theme3.png'), require('../img/theme/theme4.png') ];
const aboutDataArr = [require('../img/about/aboutus0.png'), require('../img/about/aboutus1.png'),require('../img/about/aboutus2.png'),require('../img/about/aboutus3.png'),require('../img/about/aboutus4.png')];

export default  class SettingVC extends Component{


    constructor(props){

        super(props);

        this.state = ({
            isShowChangeThemeColor:false,  //是否弹出底部颜色选择的视图
        })

    }

    render(){

        const { navigate } = this.props.navigation;

        return <View style = {{flex:1, backgroundColor:'#f3f3f3'}}>
            <View style = {{height:SCREEN_HEIGHT >= 812 ? 88 : 64, width:SCREEN_WIDTH, backgroundColor:APPThemeColor, flexDirection:'row'}}>
                <View style = {{flex:0.2, alignItems:'center', justifyContent:'center'}} />
                <View style = {{flex:0.6, alignItems:'center', justifyContent:'center', paddingTop:30}} >
                    <Text style = {{fontSize:18, color:'#fff'}}  allowFontScaling={false}>
                        设置
                    </Text>
                </View>
                <View style = {{flex:0.2}} />
            </View>
            <SettingBtn
                style = {{marginTop:50}}
                imgurlPath = {deleDataArr[global.ThemeColorTag]}
                btnText={'删除所有的日记'}
                SettingBtnClick = {() => {

                    AsyncStorage.getItem(CacheListKey, (error, result) => {
                        if (!error) {

                            if (result !== '' && result !== null) {

                                Alert.alert(
                                    '温馨提示',
                                    '是否要清空所有的日记!',
                                    [
                                        {
                                            text: '是', onPress: () => {

                                                AsyncStorage.removeItem(CacheListKey,(error) => {

                                                    if (!error){
                                                        this.refs.RNInfoTips && this.refs.RNInfoTips.showSuccess('清除日记成功!', 1)
                                                        DeviceEventEmitter.emit('UploadNoteSuccessNotification', [], 'clear'); //发出通知。传入空数组
                                                    }

                                                });
                                            }
                                        },

                                        {
                                            text: '否', onPress: ()=>{

                                            }
                                        }
                                    ]
                                )

                            }
                            else {
                                this.refs.RNInfoTips && this.refs.RNInfoTips.showInfo('当前的日记记录为空!', 1)
                            }
                        }

                    });

                }}
            />
            <SettingBtn
                imgurlPath = {themeDataArr[global.ThemeColorTag]}
                btnText={'更换APP的主题'}
                SettingBtnClick = {() => {
                    this.setState({
                        isShowChangeThemeColor:!this.state.isShowChangeThemeColor,
                    })
                }}
            />
            <SettingBtn
                imgurlPath = {aboutDataArr[global.ThemeColorTag]}
                btnText={'关于我们'}
                SettingBtnClick = {() => {

                    this.props.navigation.navigate('AboutUS',{title:'关于我们'});
                }}
            />
            <Modal
                visible={this.state.isShowChangeThemeColor}
                animationType={'slide'}
                transparent={true}
                onRequestClose={() => {
                }}
            >
               <TouchableOpacity
                   activeOpacity = {1} style = {{flex:1, backgroundColor:'rgba(0,0,0,0)'}}
                   onPress = {() => {
                     this.setState({
                        isShowChangeThemeColor:!this.state.isShowChangeThemeColor,
                     })
                  }}>
                   <View style = {{bottom:ISIPHONEX ? 30 : 0, position:'absolute', width:SCREEN_WIDTH, height:110, backgroundColor:'#fff'}}>
                       <View style = {{height:30, justifyContent:'center', paddingLeft:15, borderBottomWidth:1, borderBottomColor:'#d3d3d3'}}>
                           <Text allowFontScaling={false} style = {{fontSize:AdaptionTool.Font(17,14)}}>
                               选择应用主题风格(修改后下次启动后生效)
                           </Text>
                       </View>
                       <View style = {{height:80, flexDirection:'row'}}>
                           <TouchableOpacity activeOpacity = {0.8} style = {styles.themeColorViewStyle} onPress = {()=> this._colorPickSelect(0)}>
                               <ImageBackground style = {[styles.themeColorBackStyle ,{backgroundColor:'#14bc80'}]}>
                                   {global.ThemeColorTag == 0 ? <Image style = {{width:30, height:30}} source = {require('../img/themeColorSelect.png')}/> : null}
                               </ImageBackground>
                           </TouchableOpacity>
                           <TouchableOpacity activeOpacity = {0.8} style = {styles.themeColorViewStyle} onPress = {()=> this._colorPickSelect(1)}>
                               <ImageBackground style = {[styles.themeColorBackStyle, {backgroundColor:"#313a3e"}]}>
                                   {global.ThemeColorTag == 1 ? <Image style = {{width:30, height:30}} source = {require('../img/themeColorSelect.png')}/> : null}
                               </ImageBackground>
                           </TouchableOpacity>
                           <TouchableOpacity activeOpacity = {0.8} style = {styles.themeColorViewStyle} onPress = {()=> this._colorPickSelect(2)}>
                               <ImageBackground style = {[styles.themeColorBackStyle, {backgroundColor:'#4aabec'}]}>
                                   {global.ThemeColorTag == 2 ? <Image style = {{width:30, height:30}} source = {require('../img/themeColorSelect.png')}/> : null}
                               </ImageBackground>
                           </TouchableOpacity>
                           <TouchableOpacity activeOpacity = {0.8} style = {styles.themeColorViewStyle} onPress = {()=> this._colorPickSelect(3)}>
                               <ImageBackground style = {[styles.themeColorBackStyle, {backgroundColor:'#e79bab'}]}>
                                   {global.ThemeColorTag == 3 ? <Image style = {{width:30, height:30}} source = {require('../img/themeColorSelect.png')}/> : null}
                               </ImageBackground>
                           </TouchableOpacity>
                           <TouchableOpacity activeOpacity = {0.8} style = {styles.themeColorViewStyle} onPress = {()=> this._colorPickSelect(4)}>
                               <ImageBackground style = {[styles.themeColorBackStyle,{backgroundColor:'#F1ABC2'}]}>
                                   {global.ThemeColorTag == 4 ? <Image style = {{width:30, height:30}} source = {require('../img/themeColorSelect.png')}/> : null}
                               </ImageBackground>
                           </TouchableOpacity>
                       </View>
                   </View>
               </TouchableOpacity>
            </Modal>
            <RNInfoView ref='RNInfoTips'/>
        </View>
    }

    _colorPickSelect = (tag) => {

        AsyncStorage.setItem(CacheThemeColorKey, JSON.stringify(tag), (error) => {

            if (!error){
                global.ThemeColorTag = tag;
                this.refs.RNInfoTips && this.refs.RNInfoTips.showSuccess('主题颜色设置成功', 1);
            }
        })

        this.setState({
            isShowChangeThemeColor:!this.state.isShowChangeThemeColor,
        })
    }

}

const styles = StyleSheet.create({

    themeColorViewStyle:{
        flex:0.2,
        alignItems:'center',
        justifyContent:'center',
    },

    themeColorBackStyle:{
        width:60,
        height:60,
        borderRadius:30,
        alignItems:'center',
        justifyContent:'center',
    }
})
