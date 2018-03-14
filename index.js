import { AppRegistry } from 'react-native';
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


const TabNav=TabNavigator({
    Home:{screen:Home,
        navigationOptions:{
        tabBarLabel:'首页',
    }
    },
    Category:{screen:Category,
        navigationOptions:{
        tabBarLabel:'体系',
    }},
    Me:{screen:Me,
        navigationOptions:{
        tabBarLabel:'我的',
    }}
},{
    tabBarOptions:{
        indicatorStyle:{
            height:0
        },
        style: {
            backgroundColor: Colors.zColor1,
        },
        labelStyle: {
            fontSize: 16,
        }
    },
    backBehavior:'none',
    tabBarPosition:'bottom',
    swipeEnabled:false
});
const App=StackNavigator({
    Main:{screen:Main},
    TabNav:{screen:TabNav},
    Detail:{screen:Detail},
    SignUp:{screen:SignUp},
    Login:{screen:Login},
    Search:{screen:Search},
    TitleBar:{screen:TitleBar}
},{
    mode:'card',
    headerMode:'screen',
    navigationOptions:{header:null}
});



AppRegistry.registerComponent('wanandroid', () => App);
