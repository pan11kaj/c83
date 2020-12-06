import React, { Component } from 'react';
import {View,Text} from 'react-native';
import {createStackNavigator} from 'react-navigation-stack';
import RecieverDetails from '../screens/RecieverDeatailScreen';
import BookDonationScreen from '../screens/bookdonateScreen';

export const AppStackNavigator = createStackNavigator({
    BookDonateList:{screen:BookDonationScreen,
    navigationOptions:{
        headerShown:false
    }
    },
    RecieverDetails:{screen:RecieverDetails,
        navigationOptions:{
            headerShown:false
        }},},
    {
        initialRouteName:'BookDonateList'
    }
     
)

