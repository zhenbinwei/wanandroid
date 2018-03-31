/**
 * @File         : me.js
 *
 * @Author       : weizhenbin
 * @Time         : 2018/3/6 9:44
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
import BannerComponent from "./views/BannerComponent";
import TitleBar from "./views/TitleBar";
import EmptyComponent from "./views/EmptyComponent";
import HomeListItem from "./views/HomeListItem";


let page=0;
const itemDivide=()=>(<ItemDivideComponent/>)
export default class Home extends Component<Props> {

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


    collect(id){
        fetch(this.collectApi(id), {
            method: 'POST',
        }).then((response) => {
            return response.json()
        }).then((responsJson) => {
            if(responsJson.errorCode===0){
                //收藏成功
                this.changeData(id,true)
            }
            this.setState({
                data:this.state.data
            });
        }).catch((err) => {//2
            //console.error(err);
        });
    }

    unCollect(id){
        fetch(this.unCollectApi(id), {
            method: 'POST',
        }).then((response) => {
            return response.json()
        }).then((responsJson) => {
            if(responsJson.errorCode===0){
                //取消收藏成功
                this.changeData(id,false)
            }
            this.setState({
                data:this.state.data
            });
        }).catch((err) => {//2
            //console.error(err);
        });
    }

    changeData(id,collect){
        for (let item of this.state.data) {
            if(item.id===id){
                item.collect=collect
            }
        }
    }

    getApi(){
        return 'http://www.wanandroid.com/article/list/'+page+'/json'
    }

    collectApi(id){
        return 'http://www.wanandroid.com/lg/collect/'+id+'/json'
    }
    unCollectApi(id){
        return 'http://www.wanandroid.com/lg/uncollect_originId/'+id+'/json'
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
       <HomeListItem
                 {...this.props}
                 item={item}
                 collect={ (id)=> this.collect(id)}
                 unCollect={(id)=> this.unCollect(id)}/>
    );

    render() {

        return (
            <View style={{flex: 1,backgroundColor:Colors.zColor2}}>
                <TitleBar
                    {...this.props}
                    centerText={'首页'}
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
                    ItemSeparatorComponent={itemDivide}
                    ListEmptyComponent={<EmptyComponent/>}
                    renderItem={this._renderItem}
                    ListHeaderComponent={<BannerComponent {...this.props}/>}
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


