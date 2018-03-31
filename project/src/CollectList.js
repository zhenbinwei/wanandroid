/**
 * @File         : CollectList.js
 *
 * @Author       : weizhenbin
 * @Time         : 2018/3/26 16:29
 */
import React, {Component} from 'react';
import {
    Button, FlatList, Image, StatusBar,
    StyleSheet,
    Text, TouchableOpacity,
    View, ViewPagerAndroid,Dimensions,BackHandler
} from 'react-native';
import Colors from "./Colors";
import ItemDivideComponent from "./views/ItemDivideComponent";
import TitleBar from "./views/TitleBar";
import EmptyComponent from "./views/EmptyComponent";
import CollectListItem from "./views/CollectListItem";


let page=0;
const itemDivide=()=>(<ItemDivideComponent/>)
export default class CollectList extends Component<Props> {

    componentDidMount() {
        //  this.get();
    }

    get() {
        fetch(this.getApi(), {
            method: 'GET',
        }).then((response) => {
            return response.json()
        }).then((responsJson) => {
            if(page===0){
                this.setState({
                    data: responsJson.data.datas,
                    refreshing:false
                });
            }else {
                this.state.data.push(...responsJson.data.datas);
                this.setState({
                    refreshing:false
                });
            }
        }).catch((err) => {//2
            console.error(err);
        });
    }




    unCollect(id,originId){
        let formData = new FormData();
        formData.append("originId",originId);
        fetch(this.unCollectApi(id), {
            method: 'POST',
            body: formData
        }).then((response) => {
            return response.json()
        }).then((responsJson) => {
            if(responsJson.errorCode===0){
                //取消收藏成功
                this.delData(id)
            }
            this.setState({
                data:this.state.data
            });
        }).catch((err) => {//2
            //console.error(err);
        });
    }

    delData(id){
        let index=-1;
        for (let i in this.state.data) {
            if(this.state.data[i].id===id){
                index=i;
            }
        }
        if(index>=0){
            this.state.data.splice(index,1)
        }
    }

    getApi(){
        return 'http://www.wanandroid.com/lg/collect/list/'+page+'/json'
    }

    unCollectApi(id){
        return 'http://www.wanandroid.com/lg/uncollect/'+id+'/json'
    }
    constructor(props) {
        super(props);
        page=0;
        this.state = {
            data: [],
            refreshing:true
        }
    }

    _renderItem = ({item}) => (
        <CollectListItem
            {...this.props}
            item={item}
            unCollect={(id,originId)=> this.unCollect(id,originId)}/>
    );

    render() {

        return (
            <View style={{flex: 1,backgroundColor:Colors.zColor2}}>
                <TitleBar
                    {...this.props}
                    centerText={'我的收藏'}
                    rightView={<TouchableOpacity  onPress={
                        ()=>{
                            this.props.navigation.navigate('Search')
                        }
                    }
                    >
                        <Image
                            style={{width:25,height:25}}
                            source={require('../res/search.png')}
                        />
                    </TouchableOpacity>}
                    onLeftPress={
                        ()=>{
                            BackHandler.exitApp()
                        }
                    }
                />
                <FlatList
                    /*getItemLayout={(data, index) => ( {length: 63, offset: 63 * index, index} )}*/
                    data={this.state.data}
                    keyExtractor={
                        (item) => {
                            return item.id
                        }
                    }
                    ListEmptyComponent={<EmptyComponent/>}
                    ItemSeparatorComponent={itemDivide}
                    renderItem={this._renderItem}
                    onRefresh={
                        ()=>{
                            this.setState({
                                refreshing:true
                            });
                            page=0;
                            this.get()
                        }
                    }
                    refreshing={this.state.refreshing}
                    onEndReached={
                        (info)=>{
                            this.get()
                            /*if(info.distanceFromEnd>0){
                                page++;
                                this.get()
                            }*/
                            page++;
                        }
                    }
                    onEndReachedThreshold={0.1}
                />
            </View>
        );
    }


}


let styles = StyleSheet.create({
    itemTitle: {
        fontSize: 20,
        color:Colors.fontColor1,
    },
    item: {
        margin: 8
    },
});