/**
 * @File         : CategoryDetail.js
 *
 * @Author       : weizhenbin
 * @Time         : 2018/3/22 17:13
 */
import React, {Component} from 'react';
import {ScrollView, Text, View} from "react-native";
import TitleBar from "./views/TitleBar";
import ScrollableTabView, {DefaultTabBar, ScrollableTabBar} from "react-native-scrollable-tab-view";
import CategoryDetailItem from "./CategoryDetailItem";
import Colors from "./Colors";

export default class CategoryDetail extends Component<Props> {

    render(){
        let {params}=this.props.navigation.state;
        if (params){
            return(<View style={{flex:1}}>
                <TitleBar
                    {...this.props}
                    centerText={params.item?params.item.name:''}
                />
                <ScrollableTabView
                    initialPage={params.index}
                    style={{backgroundColor:Colors.zColor2}}
                    tabBarActiveTextColor={Colors.fontColor0}
                    tabBarInactiveTextColor={Colors.fontColor3}
                    tabBarUnderlineStyle={{height:2,backgroundColor:Colors.zColor1}}
                    renderTabBar={() => <ScrollableTabBar
                        style={{height:44}}/>}
                >
                    {this.getPages(params.item.children)}
                </ScrollableTabView>
            </View>)
        }else {
            return <View/>
        }
    }

    getPages(childs){
        let pages=[];
        for (let i = 0; i < childs.length; i++) {
            pages.push(
                <CategoryDetailItem
                    {...this.props}
                    key={i}
                    tabLabel={childs[i].name}
                    cid={childs[i].id}
                />
            );
        }
       return pages;
    }
}