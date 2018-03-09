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


const TabNav=TabNavigator({
    Home:{screen:Home},
    Category:{screen:Category},
    Me:{screen:Me}
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
    tabBarPosition:'bottom'
});
const App=StackNavigator({
    Main:{screen:Main},
    TabNav:{screen:TabNav},
    Detail:{screen:Detail},
    SignUp:{screen:SignUp},
    Login:{screen:Login}
},{
    mode:'card',
    headerMode:'screen'
});



AppRegistry.registerComponent('wanandroid', () => App);
