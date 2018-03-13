/**
 * @File         : me.js
 *
 * @Author       : weizhenbin
 * @Time         : 2018/3/6 9:44
 * @Copyright    : 2017 (c) Shenzhen Lamabang Technology Co., Ltd.
 */
import React, {Component} from 'react';
import {
    Button, FlatList, Image, StatusBar,
    StyleSheet,
    Text, TouchableOpacity,
    View, ViewPagerAndroid,Dimensions
} from 'react-native';
import Colors from "./Colors";
import ItemDivideComponent from "./views/ItemDivideComponent";
import BannerComponent from "./views/BannerComponent";


let page=0;
const itemDivide=()=>(<ItemDivideComponent/>)
let newData=[];
export default class Home extends Component<Props> {


    static navigationOptions = {
        headerStyle: {
            height: 45
        },
        headerLeft: null,
        headerTitle: '首页',
        tabBarLabel:'首页'
    };

    componentDidMount() {
        this.get();
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

    getApi(){
        return 'http://www.wanandroid.com/article/list/'+page+'/json'
    }

    constructor(props) {
        super(props);

        this.state = {
            data: [],
            refreshing:true
        }
    }

    _renderItem = ({item}) => (

        <TouchableOpacity style={styles.item} onPress={
            ()=>{
                this.props.navigation.navigate('Detail',{
                    ...this.props.navigation.state.params,
                    url:item.link,title:item.title
                })
            }
        }>
            <Text
                style={{fontSize: 16,marginTop:4,marginBottom:4}}
                  numberOfLines={1}
            >
                {'分类:'} <Text style={{color: Colors.zColor1}}>{item.chapterName}</Text>

            </Text>
            <Text
                style={styles.itemTitle}
                numberOfLines={2}
            >
                {item.title}
            </Text>
            <View style={{justifyContent:'space-between', flexDirection: 'row', marginTop: 4}}>
                <Text style={{fontSize: 14}}
                      numberOfLines={1}>
                    {'作者:'}<Text style={{color: Colors.zColor1}}>{item.author}</Text>
                </Text>
                <Text
                      numberOfLines={1}>{item.niceDate}</Text>
            </View>
        </TouchableOpacity>

    );

    render() {

        console.log('数组长度'+this.state.data.length)
        return (
            <View style={{flex: 1,backgroundColor:Colors.zColor2}}>
                <FlatList
                    /*getItemLayout={(data, index) => ( {length: 63, offset: 63 * index, index} )}*/
                    data={this.state.data}
                    keyExtractor={
                        (item) => {
                            return item.id
                        }
                    }
                    ItemSeparatorComponent={itemDivide}
                    renderItem={this._renderItem}
                    ListHeaderComponent={<BannerComponent/>}
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
                            if(info.distanceFromEnd>0){
                                page++;
                                this.get()
                            }
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