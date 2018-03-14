

import React, {Component} from 'react';
import {FlatList, Image, Text, TextInput, TouchableOpacity, View,StyleSheet} from "react-native";
import Colors from "./Colors";
import ItemDivideComponent from "./views/ItemDivideComponent";


let key='';
let page=0;
const itemDivide=()=>(<ItemDivideComponent/>)
export default class Search extends Component<Props> {

    static navigationOptions = ({ navigation }) => ({
        headerStyle: {
            height: 45
        },
        headerTitle:( <TextInput
            style={{ flex:1}}
            underlineColorAndroid={Colors.zColor1}
            placeholder={'输入关键字 空格隔开...'}
            returnKeyType={'search'}
            onChangeText={(text)=>{
                page=0;
            key=text;
            }
            }
        />),
        headerRight:(<TouchableOpacity style={{marginRight:15}} onPress={()=>{
            navigation.state.params.searchFun(key)
        }}>
            <Image
                style={{width:25,height:25}}
                source={require('../res/search.png')}
            />
        </TouchableOpacity>)
    });


    componentDidMount() {
        this.props.navigation.setParams({searchFun:this.searchFun})
        this.props.navigation.setParams({getApi:this.getApi})
    }
     constructor(props){
         super(props);
         this.state = {
             data: [],
             refreshing:false
         }
     }
     searchFun(keyWords) {
        let formData = new FormData();
        formData.append("k",keyWords);
        fetch('http://www.wanandroid.com/article/query/'+page+'/json', {
                method: 'POST',
                headers: {},
                body: formData
            }
        ).then((response) => {
            return response.json()
        }).then((responsJson) => {
            if(page===0){
                console.log('数据1'+responsJson.data.datas.length)
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

        });
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
    render(){
        console.log('数据2'+this.state.data.length)
        return( <View style={{flex: 1,backgroundColor:Colors.zColor1}}>
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
});