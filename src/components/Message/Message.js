import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, Dimensions, TouchableHighlight } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import _ from "lodash";
import profile from '../../images/nha.jpg'
import io from 'socket.io-client/dist/socket.io'
import { AntDesign } from '@expo/vector-icons';
import avatarimage from '../../images/avatar11.png';
import moment from 'moment';
import jwt_decode from "jwt-decode";
import AsyncStorage from '@react-native-community/async-storage';
import {socket,sockettest} from "../../Socket.io/socket.io";
const { height, width } = Dimensions.get('window');
var e;
class Message extends Component {
    constructor(props) {
        super(props);
        e = this;
        this.sendIDMessage=this.sendIDMessage.bind(this);
        this.state = {
            isLoading: true,
            refeshing: false,
            secret_key: '',
            dataMessage:[],
            receiver_id:''
        }
        socket.on('sv-get-message-list', function (data) {       
            //console.log(data)
        })
        sockettest.on('sv-get-list-messages', data => {
            var list = data
            let listdata = _.uniqBy(list.result,'receiver_id');
            e.setState({dataMessage:listdata})
            //console.log(list)
        })
        sockettest.on("sv-set-socketID",data =>{
            //console.log(data);
        }) 
    }
    componentDidMount= async ()=>{
        const token = await AsyncStorage.getItem("token");
        const decode = jwt_decode(token);
        const message ={
             secret_key:token,
             skip:1,
        }
        sockettest.emit("set-socketID" ,{user_id:decode._id})
        //console.log(decode._id)
        socket.emit("cl-get-message-list",message);
        //console.log(message)
        const sendID_Message ={
            user_id:decode._id
        }
        sockettest.emit("cl-get-list-messages",sendID_Message);
        //console.log(sendID_Message);
    }
    sendIDMessage(receiver_id,first_name,last_name,avatar){
        this.props.navigation.navigate("MessageNewHome",{receiver_id :receiver_id,first_name:first_name,last_name:last_name,avatar:avatar })    
    }
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.header0}>
                    <View style={{ justifyContent:'center', marginLeft: 10,width:width*0.95,flex:1 }}>
                        <View style={{justifyContent:'space-between',flexDirection:'row'}}>
                            <TouchableOpacity style={{marginTop:6}} onPress={() => this.props.navigation.goBack()}>
                                <Ionicons name="ios-arrow-back" size={28} color="#faf9f9" />
                            </TouchableOpacity>
                            <Text style={{ fontSize: 20, color: 'black',fontWeight:'bold',marginTop:8 }}>Message</Text>
                            <View>
                                <TouchableHighlight
                                    activeOpacity={1}
                                    underlayColor={"#ccd0d5"}           
                                    style={styles.search_icon_box}
                                >
                                    <AntDesign style={{marginTop:10,marginLeft:9}} name="search1" size={22} color="#000000" />
                                </TouchableHighlight>
                            </View>
                        </View>
                    </View>
                </View>
                <View >
                    <FlatList data={this.state.dataMessage}
                        renderItem={({ item, index }) => {
                            return (
                                <RenderItem onMessage={this.sendIDMessage} item={item} index={index}></RenderItem>
                            )
                        }}
                        keyExtractor={(item) => item._id.toString()}
                    >
                    </FlatList>
                </View>
            </View>
        );
    }
}
class RenderItem extends Component {
    render() {
        var text = this.props.item.text
        var counttext = this.props.item.text.length;
        if (counttext >= 15) {
            text = text.slice(0, 15) + "...";
        }
        var name = this.props.item.first_name+" "+this.props.item.last_name
        var countname = (this.props.item.first_name+" "+this.props.item.last_name).length;
        if (countname >= 15) {
            name = name.slice(0, 15) + "...";
        }
        return (
                <View style={styles.header}>  
                        <TouchableOpacity onPress={()=>this.props.onMessage(this.props.item.receiver_id,this.props.item.first_name,this.props.item.last_name,this.props.item.avatar)} style={styles.imageview}>
                            <Image source={this.props.item.avatar ? { uri: this.props.item.avatar } : avatarimage} style={styles.image}></Image>
                        </TouchableOpacity>
                        <View style={{marginBottom: 10,marginTop:10, paddingTop: 20, marginLeft: 20, width: width*0.65,borderBottomWidth:1,height:100,borderBottomColor:'gray', }}>
                            <TouchableOpacity  onPress={()=>this.props.onMessage(this.props.item.receiver_id,this.props.item.first_name,this.props.item.last_name,this.props.item.avatar)}>
                                <View style={{justifyContent:'space-between',flexDirection:'row',marginBottom: 10}}>
                                    <Text style={styles.textTitle}>
                                        {name}
                                    </Text>
                                    <Text style={{ marginTop: 5}}> {moment(this.props.item.createdAt).format('HH:MM')}</Text>
                                </View>
                                    <Text style={{ fontSize: 16,color:'gray' }}>
                                        {this.props.item.text}
                                    </Text>
                            </TouchableOpacity>                      
                        </View>
            </View>

        )
    }
}
export default Message;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#faf9f9'
    },
    textTitle: {
        fontWeight: 'bold',
        color: '#2D7474',
        fontSize: 20
    },
    header_inner: {
        flex: 1,
        overflow: 'hidden',
        flexDirection: 'row',
        alignItems: 'center',
        position: 'relative'
    },
    header: {
        flexDirection: 'row',
        height: 100,
        alignItems: 'center',
        marginLeft: 16,
        marginRight:10,
        marginTop: 5,
        marginBottom: 10,
    },
    search_icon_box: {
        width: 40,
        height: 40,
        borderRadius: 40,
        backgroundColor: '#e4e6eb',
    },
    iconBulliten: {
        flexDirection: 'row',
        borderRadius: 10,
        borderWidth: 1,
        height: 50,
        width: 90,
        alignItems: 'center',
        paddingLeft: 5,
        marginBottom: -30,
        marginRight: 25,
        backgroundColor: '#ffff',
        shadowColor: 'green',
        shadowOpacity: 0.1,
        elevation: 4,
        borderColor: '#71B7B7'
    },
    header0: {
        height: height * 0.13,
        backgroundColor: 'rgba(113, 183, 183, 0.3)',

    },
    imageview: {
        shadowOffset: { width: 0, height: 3 },
        shadowColor: 'green',
        shadowOpacity: 0.5,
        elevation: 10,
        borderColor: '#71B7B7',
        borderRadius: 50,
    },
    image: {
        height: 70,
        width: 70,
        borderRadius: 50,
    },
})