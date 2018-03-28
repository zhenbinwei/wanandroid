/**
 * @File         : category.js
 *
 * @Author       : weizhenbin
 * @Time         : 2018/3/6 9:44
 */
import React, { Component } from 'react';
import {
    FlatList,
    Text, TouchableOpacity,
    View,
    StyleSheet, Image,BackHandler
} from 'react-native';
import Colors from "./Colors";
import TitleBar from "./views/TitleBar";
import EmptyComponent from "./views/EmptyComponent";


let dataApi='http://www.wanandroid.com/tree/json';
export default class Category extends Component<Props> {
    constructor(props){
        super(props);
        this.state = {
            data: [],
            refreshing:true
        }
    }
    componentDidMount() {
        this.get()
    }


    get() {
        fetch(dataApi, {
            method: 'GET',
        }).then((response) => {
            return response.json()
        }).then((responsJson) => {
             this.setState({
                 data: responsJson.data,
                 refreshing:false
             })
        }).catch((err) => {//2
            console.error(err);
        });
    }

    _renderItem = ({item}) => (

        <TouchableOpacity style={styles.item} onPress={()=>{
            this.props.navigation.navigate('CategoryDetail',{item:item,index:0})
        }}>
            <Text style={styles.itemTitle}>
                {item.name}
            </Text>
            {this.getChilds(item)}
        </TouchableOpacity>

    );

    getChilds(item){
        let pages =[];
        if(item&&item.children){
        for (let i = 0; i < item.children.length; i++) {
            pages.push(
                <TouchableOpacity key={i} onPress={()=>{
                    this.props.navigation.navigate('CategoryDetail',{item:item,index:i})
                }}>
                <Text style={styles.labelItem} >{item.children[i].name}</Text>
                </TouchableOpacity>
            );
        }}
        return(
            <View style={styles.label}>
                {pages}
            </View>
        );
    }

    render() {
        return (
            <View style={{flex: 1,backgroundColor:Colors.zColor2}}>
                <TitleBar
                    {...this.props}
                    centerText={'体系'}
                    rightView={<TouchableOpacity  onPress={
                        ()=>{
                            this.props.navigation.navigate('Search')
                        }
                    }>
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
                    data={this.state.data}
                    keyExtractor={
                        (item) => {
                            return item.id
                        }
                    }
                    refreshing={this.state.refreshing}
                    ItemSeparatorComponent={ItemDivideComponent}
                    ListEmptyComponent={<EmptyComponent/>}
                    renderItem={this._renderItem}
                    onRefresh={
                        ()=>{
                            this.setState({
                                refreshing:true
                            });
                            this.get()
                        }
                    }
                />
            </View>
        );
    }
}
//分隔线
class ItemDivideComponent extends Component {
    render() {
        return (
            <View style={{height: 1, backgroundColor: Colors.fColor1, marginLeft: 8, marginRight: 8}}/>
        );
    }
};
let styles = StyleSheet.create({
    itemTitle: {
        fontSize: 20,
        color: Colors.fontColor1,
        fontFamily: 'Cochin',
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
        color:Colors.fontColor3
    }
});