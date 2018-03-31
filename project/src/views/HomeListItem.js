/**
 * @File         : ListItem.js
 *
 * @Author       : weizhenbin
 * @Time         : 2018/3/31 15:18
 */
import React, {Component} from 'react';
import {View, StyleSheet, TouchableOpacity, Dimensions, Text, Image, BackHandler} from "react-native";
import Colors from "../Colors";

let width = Dimensions.get('window').width;
export default class HomeListItem extends Component<Props> {

    static defaultProps = {
        item: null,
        collect:null,
        unCollect:null
    };

    render() {
        let item=this.props.item;
        return ( <TouchableOpacity style={styles.item} onPress={
            ()=>{
                this.props.navigation.navigate('Detail',{
                    ...this.props.navigation.state.params,
                    url:item.link,title:item.title
                })
            }
        }>
            <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                <Text
                    style={{fontSize: 16,marginTop:4,marginBottom:4}}
                    numberOfLines={1}
                >
                    {'分类:'} <Text style={{color: Colors.zColor1}}>{item.chapterName}</Text>

                </Text>
                <TouchableOpacity onPress={()=>{
                    if(!item.collect){
                        this.props.collect(item.id)
                    }else {
                        this.props.unCollect(item.id)
                    }
                }}>
                    <Image
                        style={{height:25,width:25}}
                        source={item.collect?require('../../res/collected.png'):require('../../res/collect.png')}
                    />
                </TouchableOpacity>
            </View>
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
        </TouchableOpacity>)
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