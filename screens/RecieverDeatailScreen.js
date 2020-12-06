import React, { Component } from 'react';
import {View,Text} from 'react-native';
import firebase, { firestore } from 'firebase';
import db from '../config';
import Header from '../components/MyHeader'
import {Card, Icon} from 'react-native-elements';
import { TouchableOpacity } from 'react-native-gesture-handler';
export default class RecieverDetails extends Component{
    constructor(props){
        super(props);
        this.state={
            userId:firebase.auth().currentUser.email,
         recieverId:this.props.navigation.getparam('details')["user_id"],
         requestId:this.props.navigation.getparam('details')["request_id"],
         bookName:this.props.navigation.getparam('details')["book_name"],
         reason_for_requesting:this.props.navigation.getparam('details')["reason_to_request"],
         recieverName:'',recieverContact:'',recieverAddress:'',recieverRequestDocid:''
        }
    }
getRecieverDetails(){
    db.collection("users").where('email_id','==',this.state.recieverId).get()
    .then(snapshot=>{
        snapshot.forEach(doc=>{
            this.setState({
                recieverName:doc.data().Name,
                recieverAddress:doc.data().address,
                recieverContact:doc.data().contact
            })
        })
    })
    db.collection("request_book").where('request_id','==',this.state.requestId).get()
    .then(snapshot=>{
        snapshot.forEach(doc=>{
            this.setState({
                recieverRequestDocid:doc.id
            })
        })
    })
}
updateBookStatus = ()=>{
    db.collection("all_donations").add({
        book_name:this.state.bookName,
        request_id:this.state.requestId,
        requested_by:this.state.recieverName,
        doner_id:this.state.userId,
        request_status:"Doner Intrested"
    })
}
addNotification =()=>{
    var messege = this.state.username+'has shown the intresting to doanting the book';
    db.collection("allnotifications").add({
        'targeted_user_id':this.state.recieverId,
        'doner_id':this.state.userId,
        'request_id':this.state.requestId,
        'book_name':this.state.bookName,
        'date':firebase.firestore.FieldValue.serverTimestamp(),
        'notification_status':"uread",
        'message':messege
    })
}

componentDidMount(){
    this.getRecieverDetails();
    this.getuserdetails(this.state.userId);
}
    render(){
        return(
            <View style={StyleSheet.conatainer}>
            <View style={{flex:0.1}}><Header leftComponent={<Icon name="arrow-left" type="feather" onPress={this.props.navigation.goBack()}/>}
            centerComponent={{text:donateBook,color:'red',fontSize:20,fontWeight:'bold'}}
            backgroundColor="#eaf8fe"
            /></View>
            <View style={{flex:0.3}}><Card title="book info" titleStyle={{fontSize:20}}><Card><Text style={{fontWeight:'bold'}}>Name:{this.state.bookName}</Text><Card>
            <Text style={{fontWeight:'bold'}}>Reason:{this.state.reason_for_requesting}</Text>  </Card></Card></Card></View>
            <View style={{flex:0.3}}><Card title="reciever info" titleStyle={{fontSize:20}}><Card><Text style={{fontWeight:'bold'}}>Name:{this.state.recieverName}</Text><Card>
            <Text style={{fontWeight:'bold'}}>Contact:{this.state.recieverContact}</Text>  </Card></Card></Card></View>
            <View style={styles.buttonContainer}>{
                this.state.userId !== this.state.recieverId?(<TouchableOpacity onPress={()=>{this.updateBookStatus()
                    this.addNotification()
                this.props.navigation.navigate('MyDonations')
                }}><Text>I want to donate</Text></TouchableOpacity>): null
            }

            </View>
            </View>
        )
    }
}