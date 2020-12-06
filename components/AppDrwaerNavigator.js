import React from 'react';
import {createDrawerNavigator} from 'react-navigation-drawer';
import {AppTabNavigator} from './AppTabNavigator';
import CustomSideBarMenu from './CustomSideBarMenu';
import SettingScreen from '../screens/Settings';
import MyDonation from '../screens/MyDonateScreen';
import NotificationScreen from '../screens/notificationScreen'
export const AppDrawerNavigator = createDrawerNavigator({
    Home:{screen:AppTabNavigator},
    MyDonations:{screen:MyDonation},
    Notifications:{screen:NotificationScreen},
    Setting:{screen:SettingScreen},
    
},
        {contentComponent:CustomSideBarMenu},
        {initialRouteName:'Home'
})



