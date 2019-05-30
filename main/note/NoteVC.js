
/**
 * Created by Watt on 2019/05/08
 * 笔记的首页
 */

import React, { Component } from 'react';

import {
    View,
    FlatList,
    Text,
    Image,
    TouchableOpacity,
    DeviceEventEmitter,
    AsyncStorage,
} from 'react-native';

import RNTipsView from '../comment/RNTipsView';
import NormalBtn from '../comment/NormalBtn';;

export default  class NoteVC extends Component{

    constructor(props){

        super(props);

        this.state = ({
            dataSource:[], //数据源

        })
    }

    componentDidMount(){

        //进入首页检查本地是否有缓存了日记列表
        AsyncStorage.getItem(CacheListKey, (error, result) => {
            if (!error) {

                if (result !== '' && result !== null) {

                    let listArr = JSON.parse(result);
                    this.setState({
                        dataSource:listArr,
                    })
                }
            }

        });

        //收到通知刷新当前页面
        this.subscription = DeviceEventEmitter.addListener('UploadNoteSuccessNotification', (dataList, statues) => {

            this.setState({
                dataSource:dataList,
            })

            //发布日记成功才会弹出的提示
            if (statues == 'upload'){

                setTimeout(()=>{
                    this.refs.RNInfoView && this.refs.RNInfoView.showSuccess('发布日记成功!',2)
                },500)
            }
        })

    }


    //组件将要移除时走的方法
    componentWillUnmount() {

        if (typeof(this.subscription) == 'object') {
            this.subscription && this.subscription.remove();
        }

    }


    _renderItemView = (item) => {

        let timeArr = item.item.yearday.split('-');
        let pastTime = `${item.item.xingqi}\n${timeArr[0]}.${timeArr[1]}`;

        return <TouchableOpacity activeOpacity={0.6} style = {{width:SCREEN_WIDTH, height:100, flexDirection:'row'}} onPress = {() => {
            this.props.navigation.navigate('NoteDetail', {noteModel:item.item})
        }}>
            <View style = {{flex: 0.25, alignItems:'center', justifyContent:'center'}}>
                <Text allowFontScaling={false} style = {{fontSize:21, fontWeight:'100'}}>
                    {timeArr[2]} <Text allowFontScaling={false} style = {{fontSize:15, color:'#434343'}}>
                    {pastTime}
                </Text>
                </Text>
            </View>
            <View style = {{width:10, height:100, alignItems:'center'}}>
                <View style = {{width:1, height:25, backgroundColor:'#d3d3d3'}}/>
                <View style = {{width:16, height:16, borderRadius:8, borderColor:'#d3d3d3', borderWidth:1}}/>
                <View style = {{width:1, height:59, backgroundColor:'#d3d3d3'}}/>
            </View>
            <View style = {{flex:0.05}}/>
            <View style = {{flex: 0.70,  backgroundColor:'#fff', borderWidth:1, borderRadius:5, borderColor:'#fff', marginTop:10, marginBottom:10, marginRight:10}}>
                <View style = {{height:60}}>
                    <Text allowFontScaling={false} style = {{margin:10, fontSize:18}}>
                        {item.item.title}
                    </Text>
                </View>
                <View style = {{height:20}}>
                    <Text allowFontScaling={false} style = {{color:'#d3d3d3', fontSize:12, marginLeft:10}}>
                        {`记录的时间: ${item.item.time}`}
                    </Text>
                </View>
            </View>
        </TouchableOpacity>

    }

    _listEmptyComponent() {

        return <View style = {{alignItems:'center', paddingTop:SCREEN_HEIGHT/2 - 150}}>
            <Image style = {{width:100, height:100}} source = {require('../img/noDataImg.png')}/>
            <Text allowFontScaling={false} style = {{fontSize:AdaptionTool.Font(16,14)}}>
                暂无日记
            </Text>
            <NormalBtn
               style = {{width:90, height:30, borderRadius:5, margin:10}}
               btnTitle = {'去写日记'}
               NormalBtnOnPress = {() => {
                   this.props.navigation.navigate('Upload',{title:'发布日记', listData:this.state.dataSource});
               }}
            />
        </View>

    }

    render(){

        const { navigator } = this.props.navigation;

        return <View style = {{flex:1, backgroundColor:'#fff'}}>
            <View style = {{height:ISIPHONEX ? 88 : 64, width:SCREEN_WIDTH, backgroundColor:APPThemeColor, flexDirection:'row'}}>
                <View style = {{flex:0.2}} />
                <View style = {{flex:0.6, alignItems:'center', justifyContent:'center', paddingTop:ISIPHONEX ? 35 : 25}} >
                    <Text style = {{fontSize:18, color:'#fff'}} allowFontScaling={false}>
                        日记
                    </Text>
                </View>
                <View style = {{flex:0.2, alignItems:'flex-end', justifyContent:'center'}} >
                    <TouchableOpacity
                        style = {{width:40, height:20, marginTop:ISIPHONEX ? 35 : 25}}
                        onPress = {() => {

                            this.props.navigation.navigate('Upload',{title:'发布日记', listData:this.state.dataSource});
                        }}
                    >
                        <Image style = {{width:24, height:24}} source = {require('../img/uploadNote.png')}/>
                    </TouchableOpacity>
                </View>
            </View>
           <FlatList
                style = {{backgroundColor:'#EDF5F7'}}
                renderItem={this._renderItemView}
                data={this.state.dataSource}
                ListEmptyComponent={this._listEmptyComponent()}
            />
            <RNTipsView ref='RNInfoView'/>
        </View>
    }

}