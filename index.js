import {AppRegistry, Image} from 'react-native';
import {StackNavigator, TabNavigator} from "react-navigation";
import "./project/src/tools/Storage"
import Main from "./project/src/Main";
import Detail from "./project/src/Detail";
import Me from "./project/src/Me";
import Home from "./project/src/Home";
import Category from "./project/src/Category";
import Colors from "./project/src/Colors";
import Login from "./project/src/Login";
import SignUp from "./project/src/SignUp";
import Search from "./project/src/Search";
import TitleBar from "./project/src/views/TitleBar";
import * as React from "react";
import CategoryDetail from "./project/src/CategoryDetail";
import CategoryDetailItem from "./project/src/CategoryDetailItem";


const TabNav=TabNavigator({
    Home:{screen:Home,
        navigationOptions:{
        tabBarLabel:'首页',
        tabBarIcon:(({ tintColor, focused }) => (
            <Image
                style={{width:25,height:25}}
                   resizeMode='contain'
                   source={require('./project/res/home.png')}
            />
        ))
        },
    },
    Category:{screen:Category,
        navigationOptions:{
        tabBarLabel:'体系',
            tabBarIcon:(({ tintColor, focused }) => (
                <Image
                    style={{width:25,height:25}}
                    resizeMode='contain'
                    source={require('./project/res/organization.png')}
                />
            ))
    }},
    Me:{screen:Me,
        navigationOptions:{
        tabBarLabel:'我的',
            tabBarIcon:(({ tintColor, focused }) => (
                <Image
                    style={{width:25,height:25}}
                    resizeMode='contain'
                    source={require('./project/res/user.png')}
                />
            ))
    }}
},{
    tabBarOptions:{
        indicatorStyle:{
            height:0
        },
        style: {
            backgroundColor: Colors.zColor1,
            margin:0,
        },
        labelStyle: {
            fontSize: 16,
            margin:0
        },
        tabStyle:{
            marginTop:-4,
            marginBottom:-4
        },
        showIcon:true
    },
    backBehavior:'none',
    tabBarPosition:'bottom',
    swipeEnabled:false,

});
const App=StackNavigator({
    Main:{screen:Main},
    TabNav:{screen:TabNav},
    Detail:{screen:Detail},
    SignUp:{screen:SignUp},
    Login:{screen:Login},
    Search:{screen:Search},
    TitleBar:{screen:TitleBar},
    CategoryDetail:{screen:CategoryDetail},
},{
    mode:'card',
    headerMode:'screen',
    navigationOptions:{header:null}
});



AppRegistry.registerComponent('wanandroid', () => App);
