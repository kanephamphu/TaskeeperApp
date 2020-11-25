import React, { Component } from 'react';
import { Image,TextInput, View, Text, StyleSheet, TouchableOpacity, Alert, Dimensions, FlatList, ActivityIndicator, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-community/async-storage';
import { Entypo } from '@expo/vector-icons';
import io from 'socket.io-client/dist/socket.io';
import { MaterialIcons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { Fontisto } from '@expo/vector-icons'; 
import { FontAwesome } from '@expo/vector-icons';
import visa from '../../../images/visacard.png'
import { MaterialCommunityIcons } from '@expo/vector-icons';
const { width, height } = Dimensions.get("window");
var e;
export default class Addnewcard extends React.Component {
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
                        <Text style={{ fontWeight: 'bold', fontSize: 25, color: 'black', marginLeft: 15, marginTop: -2 }}>Add new card</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.body}>
                    <View style={{margin:20}}>
                        <Text style={{ fontWeight: 'bold',fontSize:16}}>Fill in the fields below to add a new card</Text>
                    </View>
                    <View >
                    <TextInput
                        style={styles.input}
                        placeholder={'Card Number'}
                        placeholderTextColor={'#cccc'}
                        underlineColorAndroid='transparent'
                    >
                    </TextInput>
                    <TextInput
                        style={styles.input}
                        placeholder={'Card Holder Name'}
                        placeholderTextColor={'#cccc'}
                        underlineColorAndroid='transparent'
                    >
                    </TextInput>
                    <View style={{flexDirection: 'row',justifyContent: 'center', alignItems: 'center' }}>
                        <View>
                        <TextInput
                        style={styles.input1}
                        placeholder={'Expiration Date'}
                        placeholderTextColor={'#cccc'}
                        underlineColorAndroid='transparent'
                    >
                    </TextInput>
                    <View style={styles.iconview}>
                    <Fontisto name="date" size={24} color="#cccc" />
                    </View>
                        </View>
                    <TextInput
                        style={styles.input2}
                        placeholder={'CCV'}
                        placeholderTextColor={'#cccc'}
                        underlineColorAndroid='transparent'
                    >
                    </TextInput>
                    </View>
                    </View>
                    <View style={{flexDirection: 'row',justifyContent: 'center', alignItems: 'center' ,marginTop: 20 }}>
                        <TouchableOpacity style={{height:40,width:150,backgroundColor:'#488B8F',marginRight:10,borderRadius:5,justifyContent: 'center', alignItems: 'center'}}>
                            <Text style={{ fontWeight: 'bold',color:"white"}}>CONNECT</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{height:40,width:150,borderRadius:5,backgroundColor:'#ffff',
                        borderWidth:1,borderColor:'#488B8F',marginLeft:10,justifyContent: 'center', alignItems: 'center'}}>
                            <Text style={{ fontWeight: 'bold',color:"#488B8F"}}>CANCEL</Text>
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
        padding: 10,
        marginTop: Platform.OS == 'android' ? 25 : null,
        backgroundColor: '#add2c9',
    },
    body: {
  justifyContent: 'center',alignItems: 'center'
    },
    input: {
        width:320,
        height: 40,
        borderRadius: 5,
        fontSize: 16,
        paddingLeft: 15,
        paddingTop: -10,
        backgroundColor: '#fff',
        color: '#2d7474',
        marginHorizontal: 25,
        marginTop: 10,
        borderWidth: 1,
        borderColor: '#2d7474'
    },
    input1: {
        width: 200,
        height: 40,
        borderRadius: 5,
        fontSize: 16,
        paddingLeft: 15,
        paddingTop: -10,
        backgroundColor: '#fff',
        color: '#2d7474',
        marginTop: 10,
        borderWidth: 1,
        borderColor: '#2d7474'
    },
    input2: {
        width: 100,
        height: 40,
        borderRadius: 5,
        fontSize: 16,
        paddingLeft: 15,
        paddingTop: -10,
        backgroundColor: '#fff',
        color: '#2d7474',
        marginTop: 10,
        borderWidth: 1,
        borderColor: '#2d7474',marginLeft:20
    },
    iconview:{
        position: 'absolute',
        bottom: 7,
        right:6
    }
})