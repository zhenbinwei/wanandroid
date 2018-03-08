/**
 * @File         : category.js
 *
 * @Author       : weizhenbin
 * @Time         : 2018/3/6 9:44
 * @Copyright    : 2017 (c) Shenzhen Lamabang Technology Co., Ltd.
 */
import React, { Component } from 'react';
import {
    FlatList,
    Text, TouchableOpacity,
    View,
    StyleSheet
} from 'react-native';
import Colors from "./Colors";


let dataApi='http://www.wanandroid.com/tree/json';

export default class Category extends Component<Props> {
    static navigationOptions={
        headerStyle:{
            height:45
        },
        headerLeft:null,
        headerTitle:'分类'
    };

    constructor(props){
        super(props);
        this.state = {
            data: []
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
                 data: responsJson.data
             })
console.log(responsJson.data)

        }).catch((err) => {//2
            console.error(err);
        });
    }

    _renderItem = ({item}) => (

        <View style={styles.item}>
            <Text style={styles.itemTitle}>
                {item.name}
            </Text>
            {this.getChilds(item.children)}
        </View>

    );

    getChilds(childs){
        let pages =[];
        for (let i = 0; i < childs.length; i++) {
            pages.push(
                <TouchableOpacity key={i}>
                <Text style={styles.labelItem} >{childs[i].name}</Text>
                </TouchableOpacity>
            );
        }
        return(
            <View style={styles.label}>
                {pages}
            </View>
        );
    }

    render() {
        return (
            <View style={{flex: 1,backgroundColor:Colors.zColor2}}>
                <FlatList
                    data={this.state.data}
                    keyExtractor={
                        (item) => {
                            return item.id
                        }
                    }
                    ItemSeparatorComponent={ItemDivideComponent}
                    renderItem={this._renderItem}
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