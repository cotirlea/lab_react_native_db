import * as React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import Home from './Home';
import LogIn from './LogIn';
import SignIn from './SignIn';
import Main from './Main';
import Update from './Update';
import Test from './Test';
import WatchList from './WatchList';


const screens = {
 
  LogIn:{
    screen:LogIn,
    navigationOptions: {header: null,},
  },
   WatchList:{
    screen:WatchList,
    navigationOptions: {header: null,},
  },
  Test:{
    screen:Test,
    navigationOptions: {header: null,},
  },
  Home:{
    screen:Home,
    navigationOptions: {header: null,},
  },
  SignIn:{
    screen:SignIn,
    navigationOptions: {header: null,},
  },
  Main:{
    screen:Main,
    navigationOptions: {header: null,},
  },
  Update:{
    screen:Update,
    navigationOptions: {header:null,},
  }
}

const HomeStack = createStackNavigator(screens);

export default createAppContainer(HomeStack);