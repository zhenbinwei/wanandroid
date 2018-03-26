/**
 * @File         : CategoryDetailItem.js
 *
 * @Author       : weizhenbin
 * @Time         : 2018/3/23 9:50
 */
import React, {Component} from 'react';
import {FlatList, Image, Text, TextInput, TouchableOpacity, View,StyleSheet} from "react-native";
import Colors from "./Colors";
import ItemDivideComponent from "./views/ItemDivideComponent";


let page=0;
const itemDivide=()=>(<ItemDivideComponent/>);
export default class CategoryDetailItem extends Component<Props> {


    constructor(props){
        super(props);
        page=0;
        this.state = {
            data: [],
            refreshing:true,
        }
    }
    getData() {
        fetch(this.getApi(), {
                method: 'GET',
            }
        ).then((response) => {
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
                    refreshing:false,
                });
            }
        }).catch((err) => {//2

        });
    }
    componentDidMount() {
       // this.getData()
    }


    getApi(){
        return 'http://www.wanandroid.com/article/list/'+page+'/json?cid='+this.props.cid;
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

    render(){
        return( <View style={{flex: 1,backgroundColor:Colors.zColor2}}>
             <FlatList
                data={this.state.data}
                keyExtractor={
                    (item) => {
                        return item.id
                    }
                }
                ItemSeparatorComponent={itemDivide}
                renderItem={this._renderItem}
                onRefresh={
                    ()=>{
                        this.setState({
                            refreshing:true
                        });
                        page=0;
                        this.getData()
                    }
                }
                refreshing={this.state.refreshing}
                onEndReached={
                    (info)=>{
                        this.getData()
                        page++;
                    }
                }
                onEndReachedThreshold={0.1}
            />
        </View>)
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
    label:{
        justifyContent:'flex-start',
        flexDirection:'row',
        flexWrap:'wrap',
        marginTop:4,
        marginBottom:4
    },
    labelItem:{
        fontSize:16,
        margin:4,
        color:Colors.fontColor4,
        padding:4,
        borderRadius:5
    }
});