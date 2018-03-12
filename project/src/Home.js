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
    View, ViewPagerAndroid
} from 'react-native';
import Colors from "./Colors";


const dataApi = 'http://www.wanandroid.com/article/list/0/json';
const bannerApi='http://www.wanandroid.com/banner/json';

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
        fetch(dataApi, {
            method: 'GET',
        }).then((response) => {
            return response.json()
        }).then((responsJson) => {
            this.setState({
                data: responsJson.data.datas

            })
            console.log(this.state.data)
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
                    ListHeaderComponent={HeaderComponent}
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

//头部
class HeaderComponent extends Component{
    constructor(props){
        super(props)
        this.state = {
            data: []
        }
    }
    componentDidMount() {
       this.getBanner();
    }
    render(){
        return(
            <ViewPagerAndroid
                style={{backgroundColor:'red',height:120}}
                initialPage={0}>
                <View style={{
                    alignItems: 'center',
                    padding: 20,
                }}>
                    <Text>First page</Text>
                </View>
                <View style={{
                    alignItems: 'center',
                    padding: 20,
                }}>
                    <Text>Second page</Text>
                </View>
            </ViewPagerAndroid>
        );
    }
    getPages(data){
        let pages =[];
        for (let i = 0; i < data.length; i++) {
            pages.push(
                <TouchableOpacity style={{flex:1}}  key={i}>
                    <Image
                        style={{flex:1}}
                        source={{uri: data[i].imagePath}}
                    />

                </TouchableOpacity>
            );
        }

        return(
            <View style={{flex:1, backgroundColor:'#ff3'}}>
                {pages}
            </View>
        );
    }

    getBanner(){
        fetch(bannerApi, {
            method: 'GET',
        }).then((response) => {
            return response.json()
        }).then((responsJson) => {
            this.setState({
                data: responsJson.data
            })
        }).catch((err) => {//2
            console.error(err);
        });
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