import React, {Component} from 'react';
import {Text,View,StyleSheet,TextInput, Alert,TouchableOpacity} from 'react-native';
import firebase from 'firebase';
import db from '../config';
import MyHeader from '../components/MyHeader'
export default class MyDonation extends Component{
    constructor(){
        super();
        this.state={
            userId:firebase.auth().currentUser.email,
            allDonations:[]
        }
        this.requestRef=null;
    }
    getAllDonation = ()=>{
         this.requestRef = db.collection("all_donations").where('donor_id','==',this.state.userId)
         .onSnapshot((snapshot)=>{
          wherealldonation = snapshot.docs.map(doc=>{
              doc.data();
              this.setState({
                  allDonations:allDonations
              })
          })
         })
    }
    sendNotification =(bookdetails,requeststatus)=>{
        var requestid = bookdetails.request_id;
        var donorid = bookdetails.doner_id;
        db.collection("all_notifications").where('request_id','==',requestid)
        db.collection("all_notifications").where('donor_id','==',donorid).get()
        .then((snapshot)=>{
            snapshot.forEach((doc)=>{
                var message = ''
                if(request_status="Book Sent"){
               message =  this.state.donorname+"sent you book"
                }else{
                    message = this.state.donorname+"has shown intresting to donat book"
                }
                db.collection('all_notifications').doc()
                .update({
                  message:message,
                  notification_status:"unread",
                  date:firebase.firestore.FieldValue.serverTimestamp() 
                })
            })
        })
        }
        sendbook = (bookdetails)=>{
            if(bookdetails.request_status === "Book Sent"){
              var requeststatus = "Donor Intrested";
              db.collection('all_donations').doc(bookdetails)
              .update({
                 request_status :"Donor Intrested"
              })
              this.sendNotification(bookdetails,requestedstatus)
            }else{
                var requeststaus = "Book Sent"
                db.collection("all_donations").doc(doci)
                .update({
        
                })
            }
        }


    keyExtractor = (item, index) => index.toString() 
    renderItem = ( {item, i} ) =>{ return ( <ListItem key={i} title={item.book_name} subtitle={item.reason_to_request} titleStyle={{ color: 'black', fontWeight: 'bold' }} rightElement={ 
    <TouchableOpacity style={styles.button} onPress ={()=>{ this.props.navigation.navigate("RecieverDetails",{"details": item}) }} >
         <Text style={{color:'#ffff'}}>View</Text> </TouchableOpacity> }
          bottomDivider /> ) }
    render(){
         return( <View style={{flex:1}}>
             <MyHeader title="Donate Books" navigation ={this.props.navigation}/> 
             <View style={{flex:1}}> { this.state.requestedBooksList.length === 0 ?(
                  <View style={styles.subContainer}> <Text style={{ fontSize: 20}}>List Of All Requested Books</Text> </View> )
                   :( <FlatList keyExtractor={this.keyExtractor} data={this.state.requestedBooksList} renderItem={this.renderItem} /> ) } </View> </View> )  }
    
}
const styles = StyleSheet.create({ subContainer:{ flex:1, fontSize: 20, justifyContent:'center', alignItems:'center' }, button:{ width:100, height:30, justifyContent:'center', alignItems:'center', backgroundColor:"#ff5722", shadowColor: "#000", shadowOffset: { width: 0, height: 8 } } })

