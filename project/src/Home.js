/**
 * @File         : me.js
 *
 * @Author       : weizhenbin
 * @Time         : 2018/3/6 9:44
 * @Copyright    : 2017 (c) Shenzhen Lamabang Technology Co., Ltd.
 */
import React, { Component } from 'react';
import {
    Button, FlatList,

    Text,
    View
} from 'react-native';


const homeApi='http://www.wanandroid.com/article/list/0/json';


export default class Home extends Component<Props> {


    static navigationOptions={
        header:null
    }

    componentDidMount() {
        this.get();
    }
    get() {
        fetch(homeApi, {
            method: 'GET',
        }).then((response) => {
            return response.json()
        }).then((responsJson)=>{
            console.log(responsJson.data.datas)
            this.setState({
                data:responsJson.data.datas
            })
        }).catch((err) => {//2
            console.error(err);
        });
    }



    constructor(props){
        super(props);

        this.state={
            data:[]
        }
    }
    _renderItem = ({item}) => (
        <Text
            style={{height:40}}
        >
            {item.title}
        </Text>
    );
    _keyExtractor = (item, index) => index;

    render() {
        return (
            <View style={{flex:1}}>
               <FlatList
                   data={this.state.data}
               keyExtractor={this._keyExtractor()}

               renderItem={this._renderItem}
               />
            </View>
        );
    }
}