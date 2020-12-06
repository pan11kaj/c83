import React, {Component} from 'react';
import {Text,View,StyleSheet,TextInput, Alert,TouchableOpacity} from 'react-native';
import db from '../config'
export default class NotificationScreen extends Component{
componentDidMount(){
    this.getNotifications()
}
componentwillUnMount(){
    this.Notificationref()
}
getNotifications = ()=>{
    this.requestref = db.collection("all_notifications").where("notifiction_status",'==',"unread")
    .where(target_userId = this.state.userid)
    .onSnapshot((doc)=>{
        notification["doc_id"]=doc.id
        allnotifications.push(notification)
        this.setState({
            allnotifications:notification
        })
        
    })
    
}

    render(){
        return(
            <View></View>
        )
    }
}

