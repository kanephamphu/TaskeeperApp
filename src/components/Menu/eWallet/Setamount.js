import React, { Component } from 'react';
import { Image,TextInput, View, Text, StyleSheet, TouchableOpacity, Alert, Dimensions, FlatList, ActivityIndicator, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import io from 'socket.io-client/dist/socket.io';
const { width, height } = Dimensions.get("window");
var e;
export default class Setamount extends React.Component {
    constructor(props) {
        super(props)
        e = this;
        this.socket = io('https://taskeepererver.herokuapp.com', { jsonp: false })
        this.state = {

        }
    };

    componentDidMount = async () => {
    }
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.header0}>
                    <TouchableOpacity style={{ flexDirection: 'row' }} onPress={() => this.props.navigation.goBack()}>
                        <Ionicons style={{ marginTop: 1 }} name="ios-arrow-back" size={28} color="black" />
                        <Text style={{ fontWeight: 'bold', fontSize: 25, color: 'black', marginLeft: 15, marginTop: -2 }}>Set Amount</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.body}>
                    <View style={{margin:20}}>
                        <Text style={{fontSize:18}}>How much good you like to send?</Text>
                    </View>
                    <View >
                    <TextInput
                        style={styles.input}
                        placeholder={'Amount (VND)'}
                        placeholderTextColor={'#cccc'}
                        underlineColorAndroid='transparent'
                    >
                    </TextInput>
                    <TextInput
                        style={styles.input}
                        placeholder={'Message (up to 200 characters)'}
                        placeholderTextColor={'#cccc'}
                        underlineColorAndroid='transparent'
                        multiline={true}
                    >
                    </TextInput>
                    </View>
                    <View style={{margin:20}}>
                        <Text style={{fontSize:18 ,fontWeight: 'bold'}}>Quick Actions</Text>
                    </View>
                    <View style={{justifyContent: 'center',alignItems: 'center'}}>
                        <View style={{flexDirection: 'row',justifyContent:'center',width:"70%"}}>
                            <View style={styles.menhgia1}>
                                <Text style={styles.textmoney}>100.000</Text>
                            </View>
                            <View style={styles.menhgia}>
                                <Text style={styles.textmoney}>200.000</Text>
                            </View>
                        </View>
                        <View style={{flexDirection: 'row',justifyContent:'center',width:"70%",marginTop:15}}>
                            <View style={styles.menhgia1}>
                                <Text style={styles.textmoney}>500.000</Text>
                            </View>
                            <View style={styles.menhgia}>
                                <Text style={styles.textmoney}>1.000.000</Text>
                            </View>
                        </View>
                        <View style={{flexDirection: 'row',justifyContent:'center',width:"70%",marginTop:15}}>
                            <View style={styles.menhgia1}>
                                <Text style={styles.textmoney}>2.000.000</Text>
                            </View>
                            <View style={styles.menhgia}>
                                <Text style={styles.textmoney}>5.000.000</Text>
                            </View>
                        </View>
                        
                    </View>
                    <View style={{flexDirection: 'row',justifyContent: 'center', alignItems: 'center' ,marginTop: 20 }}>
                        <TouchableOpacity style={{height:40,width:150,backgroundColor:'#488B8F',marginRight:10,borderRadius:5,justifyContent: 'center', alignItems: 'center'}}>
                            <Text style={{ fontWeight: 'bold',color:"white",fontSize:18}}>Transfer</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{height:40,width:150,borderRadius:5,backgroundColor:'#ffff',
                        borderWidth:1,borderColor:'#488B8F',marginLeft:10,justifyContent: 'center', alignItems: 'center'}}>
                            <Text style={{ fontWeight: 'bold',color:"#488B8F",fontSize:18}}>Cancel</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        ...Platform.select({
            ios: {
                flex: 1,
                backgroundColor: '#faf9f9',
            },
            android: {
                flex: 1,
                backgroundColor: '#faf9f9',
            },
            default: {
                // other platforms, web for example
            }
        })
    },
    viewmini: {
        height: 50, width: 65, borderRadius: 5, backgroundColor: "#E5E5E5", justifyContent: 'center', alignItems: "center"
    },
    header0: {
        height: height * 0.1,
        shadowOffset: { width: 0, height: 3 },
        paddingLeft: 10,
        paddingTop:15,
        backgroundColor: '#add2c9',
    },
    body: {
      justifyContent: 'center'
    },
    menhgia: {
        width:100, height: 40,
        borderWidth: 1,
        marginLeft:20, 
        borderColor: '#2d7474',
        borderRadius: 5,
        justifyContent: 'center', alignItems:'center'
    },
    menhgia1: {
        width:100, height: 40,
        borderWidth: 1,
        marginRight:20,
        borderColor: '#2d7474',
        borderRadius: 5,
        justifyContent: 'center', alignItems:'center'
    },
    textmoney: {
        fontWeight: 'bold',
    },
    input: {
        width:width-50,
        height: 40,
        borderRadius: 5,
        fontSize: 16,
        paddingLeft: 15,
        paddingTop: -10,
        color: '#2d7474',
        marginHorizontal: 25,
        marginTop: 10,
        borderBottomWidth: 1,
        borderColor: '#2d7474'
    },
   
    iconview:{
        position: 'absolute',
        bottom: 7,
        right:6
    }
})