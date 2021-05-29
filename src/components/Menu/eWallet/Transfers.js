import React, { Component } from 'react';
import { Image, TextInput, View, Text, StyleSheet, TouchableOpacity, Alert, Dimensions, FlatList, ActivityIndicator, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-community/async-storage';
import { Entypo } from '@expo/vector-icons';
import io from 'socket.io-client/dist/socket.io';
import { MaterialIcons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { Fontisto } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import {sockettest} from "../../../Socket.io/socket.io";
import visa from '../../../images/visacard.png'
import { MaterialCommunityIcons } from '@expo/vector-icons';
const { width, height } = Dimensions.get("window");
var e;
export default class Transfers extends React.Component {
    constructor(props) {
        super(props)
        e = this;
        this.state = {

        }

    };

    componentDidMount = async () => {
    }
    reloadEwallet=()=>{
        const sendemail={
            email:this.props.route.params.email
        }
        sockettest.emit("cl-get-total-currently",sendemail)
    }
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.header0}>
                    <TouchableOpacity style={{ flexDirection: 'row' }} onPress={() => {this.props.navigation.goBack();this.reloadEwallet()}}>
                        <Ionicons style={{ marginTop: 1 }} name="ios-arrow-back" size={28} color="#2d7474" />
                        <Text style={{ fontWeight: 'bold', fontSize: 25, color: 'black', marginLeft: 15, marginTop: -2 }}>Transfers</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.body}>
                    <View style={{ margin: 20 }}>
                        <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'black' }}>Select Option</Text>
                    </View>
                    <TouchableOpacity onPress={()=>this.props.navigation.navigate("Setamount")} style={{ marginLeft: 10, marginRight: 20, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                        <View style={{ height: 50, width: 50, justifyContent: 'center', alignItems: 'center' }}>
                            <MaterialCommunityIcons name="cellphone-android" size={30} color="red" />
                        </View>
                        <View style={{
                            flexDirection: 'row', justifyContent: 'space-between',
                            borderBottomWidth: 1, width: "85%", alignItems: "center", marginLeft: 10, borderColor: '#cccc', height: 40
                        }}>
                            <Text style={{ fontSize: 16 }}>Transfer money to E-user</Text>
                            <MaterialIcons name="navigate-next" size={30} color="black" />
                        </View>
                    </TouchableOpacity>
                    <View style={{ marginLeft: 10, marginRight: 20, marginTop: 10, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                        <View style={{ height: 50, width: 50, justifyContent: 'center', alignItems: 'center' }}>
                            <FontAwesome name="cc-mastercard" size={30} color="#F4A460" />
                        </View>
                        <View style={{
                            flexDirection: 'row', justifyContent: 'space-between',
                            borderBottomWidth: 1, width: "85%", alignItems: "center", marginLeft: 10, borderColor: '#cccc', height: 40
                        }}>
                            <Text style={{ fontSize: 16 }}>Transfer money to bank account</Text>
                            <MaterialIcons name="navigate-next" size={30} color="black" />
                        </View>
                    </View>
                    <View style={{ marginLeft: 10, marginRight: 20, marginTop: 10, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                        <View style={{ height: 50, width: 50, justifyContent: 'center', alignItems: 'center' }}>
                            <Fontisto name="qrcode" size={30} color="#488B8F" />
                        </View>
                        <View style={{
                            flexDirection: 'row', justifyContent: 'space-between',
                            borderBottomWidth: 1, width: "85%", alignItems: "center", marginLeft: 10, borderColor: '#cccc', height: 40
                        }}>
                            <Text style={{ fontSize: 16 }}>Transfer money by QR code</Text>
                            <MaterialIcons name="navigate-next" size={30} color="black" />
                        </View>
                    </View>
                    <View style={{
                        shadowOffset: { width: 0, height: 0 },
                        shadowOpacity: 0.2,
                        shadowOpacity: 0.2,
                        elevation: 6,
                        borderWidth: 1,
                        height: 140,
                        backgroundColor: '#ffff',
                        marginLeft: 30,
                        marginRight: 30,
                        borderColor: '#ffff',
                        borderRadius: 7
                        , marginTop: 10
                    }}>
                        <View style={{ margin: 10 }}>
                            <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Recent Receipts</Text>
                        </View>
                        <View style={{ justifyContent: 'space-around', alignItems: 'center', flexDirection: 'row', marginTop: 5 }}>
                            <View style={{justifyContent: 'center', alignItems: 'center'}}>
                                <View style={{ width: 60, height: 60, borderRadius: 100, backgroundColor: '#488B8F' }}>

                                </View>
                                <Text>Nha</Text>
                            </View>
                            <View style={{justifyContent: 'center', alignItems: 'center'}}>
                                <View style={{ width: 60, height: 60, borderRadius: 100, backgroundColor: '#488B8F' }}>

                                </View>
                                <Text>Ngan</Text>
                            </View>
                            <View style={{justifyContent: 'center', alignItems: 'center'}}>
                                <View style={{ width: 60, height: 60, borderRadius: 100, backgroundColor: '#488B8F' }}>

                                </View>
                                <Text>Phat</Text>
                            </View>
                            <View style={{justifyContent: 'center', alignItems: 'center'}}>
                                <View style={{ width: 60, height: 60, borderRadius: 100, backgroundColor: '#488B8F' }}>

                                </View>
                                <Text>Tai</Text>
                            </View>
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
        margin: 10
    },

})