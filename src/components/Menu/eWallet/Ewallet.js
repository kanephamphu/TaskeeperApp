import React, { Component } from 'react';
import { Image, View, Text ,StyleSheet, TouchableOpacity, Alert, Dimensions, FlatList, ActivityIndicator, ScrollView,StatusBar} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-community/async-storage';
import { Entypo } from '@expo/vector-icons';
import io from 'socket.io-client/dist/socket.io';
import { MaterialIcons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
const { width, height } = Dimensions.get("window");
var e;
export default class Ewallet extends React.Component {
    constructor(props) {
        super(props)
        e = this;
    };

    componentDidMount = async () => {
    }
    render() {
        return (
            <View style={styles.container}>
                <StatusBar />
                <View style={styles.header0}>
                    <TouchableOpacity style={{ flexDirection: 'row' }} onPress={() => this.props.navigation.goBack()}>
                        <Ionicons style={{ marginTop: 1 }} name="ios-arrow-back" size={28} color="#2d7474" />
                        <Text style={{ fontWeight: 'bold', fontSize: 25, color: 'black', marginLeft: 15, marginTop: -2 }}>E Wallet</Text>
                    </TouchableOpacity>
                    <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 20 }}>
                        <Text style={{ fontSize: 25, color: 'black' }}>Total income</Text>
                        <Text style={{ fontWeight: 'bold', fontSize: 30, color: 'black' }}>0.00</Text>
                    </View>
                </View>
                <View style={styles.body}>
                    <View style={{
                        shadowOffset: { width: 0, height: 0 },
                        shadowOpacity: 0.2,
                        shadowOpacity: 0.2,
                        elevation: 6,
                        marginTop: -45,
                        borderWidth: 1,
                        height: 120,
                        backgroundColor: '#ffff',
                        marginLeft: 30,
                        marginRight: 30,
                        borderColor: '#ffff',
                        borderRadius: 7,
                        justifyContent: 'space-around', alignItems: 'center', flexDirection: 'row'
                    }}>
                        <TouchableOpacity style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                            <View style={styles.viewmini}>
                                <FontAwesome5 name="dollar-sign" size={30} color="#2d7474" />
                            </View>
                            <Text>Top up</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                            <View style={styles.viewmini}>
                                <FontAwesome5 name="money-bill" size={30} color="#2d7474" />
                            </View>
                            <Text>Withdraw</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=>this.props.navigation.navigate("Transfer")} style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                            <View style={styles.viewmini}>
                                <FontAwesome name="paper-plane" size={30} color="#2d7474" />
                            </View>
                            <Text>Send</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=>this.props.navigation.navigate("Connectbank")} style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                            <View style={styles.viewmini}>
                                <FontAwesome5 name="wallet" size={30} color="#2d7474" />
                            </View>
                            <Text>Wallet</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ margin: 20 }}>
                        <Text style={{ fontWeight: 'bold', fontSize: 23, color: 'black' }}>Settings</Text>
                    </View>
                    <TouchableOpacity onPress={()=>this.props.navigation.navigate("HistoryPayment")} style={{
                        borderWidth: 1, margin: 20, height: 45,
                        borderColor: '#71B7B7', justifyContent: 'space-between', padding: 10, flexDirection: 'row', alignItems: 'center', borderRadius: 5
                    }}>
                        <Text style={{ fontSize: 20, color: 'black' }}>Transaction history</Text>
                        <MaterialIcons name="navigate-next" size={30} color="black" />
                    </TouchableOpacity>
                    <TouchableOpacity style={{
                        borderWidth: 1, margin: 20, height: 45,
                        borderColor: '#71B7B7', justifyContent: 'space-between', padding: 10, flexDirection: 'row', alignItems: 'center', borderRadius: 5
                    }}>
                        <Text style={{ fontSize: 20, color: 'black' }}>My bank account</Text>
                        <MaterialIcons name="navigate-next" size={30} color="black" />
                    </TouchableOpacity>
                    <TouchableOpacity style={{
                        borderWidth: 1, margin: 20, height: 45,
                        borderColor: '#71B7B7', justifyContent: 'space-between', padding: 10, flexDirection: 'row', alignItems: 'center', borderRadius: 5
                    }}>
                        <Text style={{ fontSize: 20, color: 'black' }}>Change the order password</Text>
                        <MaterialIcons name="navigate-next" size={30} color="black" />
                    </TouchableOpacity>
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
                height: height * 0.3,
                shadowOffset: { width: 0, height: 3 },
                paddingLeft: 10,
                paddingTop:15,
                backgroundColor: '#add2c9',
                paddingTop:36
            },
            android: {
                height: height * 0.3,
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

    }
})