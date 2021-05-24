import React, { Component } from 'react';
import { Image,TextInput, View, Text, StyleSheet, TouchableOpacity, Alert, Dimensions, FlatList, ActivityIndicator, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import io from 'socket.io-client/dist/socket.io';
import visa from '../../../images/visacard.png'
import { AntDesign } from '@expo/vector-icons';
import master from '../../../images/master.png';
import jcb from '../../../images/jcb.png';

const { width, height } = Dimensions.get("window");
var e;
export default class Bankkinglink extends React.Component {
    constructor(props) {
        super(props)
        e = this;
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
                        <Ionicons style={{ marginTop: 1 }} name="ios-arrow-back" size={28} color="#2d7474" />
                        <Text style={{ fontWeight: 'bold', fontSize: 25, color: 'black', marginLeft: 15, marginTop: -2 }}>Banking links</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.body}>
                    <View style={{justifyContent:'center', alignItems: 'center'}}>
                        <View style={{position:'relative',width:width-100,justifyContent:'center', alignItems: 'center'}}>
                            <TextInput
                                style={styles.input}
                                placeholder={'Enter a bank name'}
                                placeholderTextColor={'#cccc'}
                                underlineColorAndroid='transparent'
                            >
                            </TextInput>
                            
                        
                        </View>
                    </View>
                   
                    <View style={{marginLeft:30,marginTop:30}}>
                        <Text style={{fontWeight: 'bold',fontSize:20}}>International Card:</Text> 
                        <View style={{marginLeft:10}}>
                        <Text style={{fontSize:15}}>Support for release in Vietnam only</Text> 
                        </View>
                    </View>
                    <View style={{flexDirection: 'row',justifyContent:'center',marginTop: 20}}>
                <View style={{borderWidth:1,borderRadius:5,marginRight:10,justifyContent: 'center', alignItems: 'center'}}>
                  <Image style={styles.image} source={master}/>
                </View>
                <View style={{borderWidth:1,borderRadius:5,marginRight:10,marginLeft:10,justifyContent: 'center', alignItems: 'center'}}>
                <Image style={styles.image} source={jcb}/>
                </View>
                <View style={{borderWidth:1,borderRadius:5,marginLeft:10,justifyContent: 'center', alignItems: 'center'}}>
                <Image style={styles.image} source={visa}/>
                </View>
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
        ...Platform.select({
            ios: {
                height: height * 0.1,
                shadowOffset: { width: 0, height: 3 },
                paddingLeft: 10,
                paddingTop:15,
                backgroundColor: '#add2c9',
                paddingTop:36
            },
            android: {
                height: height * 0.1,
                shadowOffset: { width: 0, height: 3 },
                paddingLeft: 10,
                paddingTop:15,
                backgroundColor: '#add2c9',
            },
            default: {
              // other platforms, web for example
            }
          })
    },
    body: {
   
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
    }, 
    image:{
        height:50,width:80, borderRadius:5
      },
})