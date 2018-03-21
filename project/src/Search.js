

import React, {Component} from 'react';
import {FlatList, Image, Text, TextInput, TouchableOpacity, View,StyleSheet,Keyboard} from "react-native";
import Colors from "./Colors";
import ItemDivideComponent from "./views/ItemDivideComponent";
import TitleBar from "./views/TitleBar";


let key='';
let page=0;
const itemDivide=()=>(<ItemDivideComponent/>);
const hotkeyApi='http://www.wanandroid.com//hotkey/json';

let hotKeyTable;

export default class Search extends Component<Props> {


     constructor(props){
         super(props);
         this.state = {
             data: [],
             refreshing:false,
             showHotKey:true,
             keyWords:''
         }
     }
     searchFun(keyWords) {
        let formData = new FormData();
        formData.append("k",keyWords);
        fetch(this.getApi(), {
                method: 'POST',
                headers: {},
                body: formData
            }
        ).then((response) => {
            return response.json()
        }).then((responsJson) => {
            if(page===0){
                this.setState({
                    data: responsJson.data.datas,
                    showHotKey:false,
                    refreshing:false
                });
            }else {
                this.state.data.push(...responsJson.data.datas);
                this.setState({
                    refreshing:false,
                    showHotKey:false,
                });
            }
        }).catch((err) => {//2

        });
    }

    getHotKey(){
        fetch(hotkeyApi, {
            method: 'GET',
        }).then((response) => {
            return response.json()
        }).then((responsJson) => {
            hotKeyTable=this.getChilds(responsJson.data);
            this.setState({
                showHotKey:true,
            });
        }).catch((err) => {//2
            console.error(err);
        });
    }

    componentDidMount() {
        this.getHotKey()
    }


    getApi(){
        return 'http://www.wanandroid.com/article/query/'+page+'/json'
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

    getChilds(childs){
        let pages =[];
        let color=['#ff3232','#ff6464','#ff9696','#FFC832'];
        for (let i = 0; i < childs.length; i++) {
            let n=Math.floor(Math.random()*4);
            pages.push(
                <TouchableOpacity key={i} activeOpacity={0.8} onPress={
                    ()=>{
                        this.setState({
                            keyWords:childs[i].name
                        })
                        key=childs[i].name;
                        console.log('key'+key)
                    }
                }>
                    <Text style={[styles.labelItem, {backgroundColor:color[n]} ]} >{childs[i].name}</Text>
                </TouchableOpacity>
            );
        }
        return(
            <View style={styles.label}>
                {pages}
            </View>
        );
    }

    render(){
        console.log(this.state.keyWords)
        return( <View style={{flex: 1,backgroundColor:Colors.zColor2}}>
            <TitleBar
                {...this.props}
                 centerView={(<TextInput
                 style={{ flex:1}}
                 defaultValue={this.state.keyWords}
                 underlineColorAndroid={Colors.zColor1}
                 placeholder={'输入关键字 空格隔开...'}
                 returnKeyType={'search'}
                 onChangeText={(text)=>{
                     page=0;
                     key=text;
                 }
                 }
                 onSubmitEditing={
                     ()=>{
                         Keyboard.dismiss();
                         this.setState({
                             refreshing:true
                         });
                         this.searchFun(key)
                     }
                     }
                 />)}
             rightView={<TouchableOpacity  onPress={()=>{
                 Keyboard.dismiss();
                 this.setState({
                     refreshing:true
                 });
                 page=0;
                 this.searchFun(key)
             }}>
                 <Image
                     style={{width:25,height:25}}
                     source={require('../res/search.png')}
                 />
             </TouchableOpacity>}
            />
            {this.state.showHotKey?hotKeyTable: <FlatList
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
                        this.searchFun(key)
                    }
                }
                refreshing={this.state.refreshing}
                onEndReached={
                    (info)=>{
                        if(info.distanceFromEnd>0){
                            page++;
                            this.searchFun(key)
                        }
                    }
                }
                onEndReachedThreshold={0.1}
            />}

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