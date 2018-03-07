/**
 * @File         : me.js
 *
 * @Author       : weizhenbin
 * @Time         : 2018/3/6 9:44
 * @Copyright    : 2017 (c) Shenzhen Lamabang Technology Co., Ltd.
 */
import React, {Component} from 'react';
import {
    Button, FlatList, StatusBar,
    StyleSheet,
    Text, TouchableOpacity,
    View
} from 'react-native';


const homeApi = 'http://www.wanandroid.com/article/list/0/json';


export default class Home extends Component<Props> {


    static navigationOptions = {
        headerStyle: {
            height: 45
        },
        headerLeft: null,
        headerTitle: '首页'
    };

    componentDidMount() {
        this.get();
    }

    get() {
        fetch(homeApi, {
            method: 'GET',
        }).then((response) => {
            return response.json()
        }).then((responsJson) => {
            this.setState({
                data: responsJson.data.datas
            })
        }).catch((err) => {//2
            console.error(err);
        });
    }


    constructor(props) {
        super(props);

        this.state = {
            data: []
        }
    }

    _renderItem = ({item}) => (

        <TouchableOpacity style={styles.item}>
            <Text
                style={{fontSize: 16,marginTop:4,marginBottom:4}}
                  numberOfLines={1}
            >
                {'分类:'} <Text style={{color: 'blue'}}>{item.chapterName}</Text>

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
                    {'作者:'}<Text style={{color: 'blue'}}>{item.author}</Text>
                </Text>
                <Text
                      numberOfLines={1}>{item.niceDate}</Text>
            </View>
        </TouchableOpacity>

    );

    render() {
        return (
            <View style={{flex: 1}}>
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
            <View style={{height: 1, backgroundColor: '#dcdcdc', marginLeft: 8, marginRight: 8}}/>
        );
    }
};

let styles = StyleSheet.create({
    itemTitle: {
        fontSize: 20,
        color: '#222',
        fontFamily: 'Cochin',
    },
    item: {
        margin: 8
    },
});