
/**
 * Created by Watt on 2019/05/09
 * 中转视图。进入首页前在这里配置
 */

import React, { Component } from 'react';
import {
    AsyncStorage,
    View,
    Text,
} from 'react-native';

import './main/comment/global';  //global文件必须先加载。要不然会报错
import AppVC from './App';
import CodePush from 'react-native-code-push';  //引入热更新

// let codePushOptions = {
//
//     //设置检查更新的频率
//     //ON_APP_RESUME APP恢复到前台的时候
//     //ON_APP_START APP开启的时候
//     //MANUAL 手动检查
//     checkFrequency: CodePush.CheckFrequency.ON_APP_START
// }

const CODE_PUSH_PRODUCTION_KEY = 'i2uVHv4Qz_OZrsTrItGkMQaKJQYQ515dc9c8-69de-4aee-9826-e9b3975e533d';

class RootVC extends Component{

    constructor(props){
        super(props);

        this.state = ({
            isEnterApp:false,
            finished: false,
            finishedPage: false,
            syncMessage: '正在检查更新...',
            lauchImgUri: '',
            type: 0,
            isShowEnterUrlPage: false,
            waiting: false,
            enterMessage: '',
        })
    }


    /** U更新被静默下载，并在重新启动（推荐） */

    checkUpdate(){

        //用户点击OK后下载更新
        CodePush.checkForUpdate(CODE_PUSH_PRODUCTION_KEY).then((update) => {

            if (!update) {
                if (this.isUpdate) {
                    return;
                }
                this.setState({ syncMessage: `当前是最新版本${global.AppVerStion}` })
                this.isUpdate = true;
                this._enterAppVC();

            } else {

                CodePush.sync(
                    {installMode: CodePush.InstallMode.IMMEDIATE, deploymentKey:CODE_PUSH_PRODUCTION_KEY },
                    this.codePushStatusDidChange.bind(this),
                    this.codePushDownloadDidProgress.bind(this)
                ).catch((e) => {
                    if (this.isUpdate) {
                        return;
                    }
                    this.isUpdate = true;
                    this._enterAppVC();
                })
            }
        }).catch((err) => {
            if (this.isUpdate) {
                return;
            }
            this.isUpdate = true;

        })
    }

    //下载资源包
    codePushDownloadDidProgress(progress) {
        this.setState({
            syncMessage: `正在下载新配置${(progress.receivedBytes / progress.totalBytes * 100.001).toFixed(2)}%`
        })
    }

    //CodePush状态改变
    codePushStatusDidChange(syncStatus) {
        let isStart = false
        switch (syncStatus) {
            case CodePush.SyncStatus.CHECKING_FOR_UPDATE:
                this.setState({
                    syncMessage: "正在检查更新...",
                });
                break;
            case CodePush.SyncStatus.DOWNLOADING_PACKAGE:
                this.setState({
                    syncMessage: "正在更新资源包...",
                });
                break;
            case CodePush.SyncStatus.AWAITING_USER_ACTION:
                this.syncMessage = 'Awaiting user action'
                break;
            case CodePush.SyncStatus.INSTALLING_UPDATE:
                this.setState({
                    syncMessage: "正在安装最新资源包...",
                });
                break;
            case CodePush.SyncStatus.UP_TO_DATE:
                isStart = true;
                this.setState({
                    syncMessage: "应用已经更新到最新版本.",
                });
                break;
            case CodePush.SyncStatus.UPDATE_INSTALLED:
                this.setState({
                    syncMessage: "应用更新完成,等待重新启动",
                });
                break;
            case CodePush.SyncStatus.UNKNOWN_ERROR:
                this.setState({
                    syncMessage: "应用更新出错,请退出程序重新启动!"
                });
                isStart = true;
                break;
        }
        if (isStart) {
            this.isUpdate = true;
            this._enterAppVC();
        }
    }

    _enterAppVC (){

        setTimeout(()=> {
            this.setState({isEnterApp:true});
        },800);
    }

    componentWillMount() {
        this.checkUpdate(); //开始检查更新
    }

    componentDidMount(){

        //获取主题色的配置
        AsyncStorage.getItem(CacheThemeColorKey, (error, result) => {

            if (!error) {

                if (result !== '' && result !== null) {

                    let tagStr = JSON.parse(result);
                    global.ThemeColorTag = parseInt(tagStr, 10);
                    global.APPThemeColor = global.ThemeColorArr[global.ThemeColorTag];
                }
                else {
                    AsyncStorage.setItem(CacheThemeColorKey, '0', (error) => {

                        if (!error){
                            global.ThemeColorTag = 0;
                            global.APPThemeColor = global.ThemeColorArr[ThemeColorTag];
                        }
                    })
                }
            }
        })

    }

    render(){

        if (this.state.isEnterApp == true) {
             return <AppVC/>
            // return <View style = {{flex:1, alignItems:'center', justifyContent:'center'}}>
            //     <Text style = {{fontSize:20}} allowFontScaling={false}>
            //         我是用来测试的CodePush的代码
            //     </Text>
            // </View>
        }
        else {
            return <View style = {{flex:1,  justifyContent:'flex-end', marginBottom:50, alignItems:'center'}}>
                <Text style = {{color:'gray'}} allowFontScaling = {false}>
                    {this.state.syncMessage}
                </Text>
            </View>
        }
    }

}

export default RootVC;

console.disableYellowBox = true;