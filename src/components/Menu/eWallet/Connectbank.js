import React, { Component } from 'react';
import { Image, View, Text, StyleSheet, TouchableOpacity, Alert, Dimensions, FlatList, ActivityIndicator, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import io from 'socket.io-client/dist/socket.io';
import { MaterialIcons } from '@expo/vector-icons';
import visa from '../../../images/visacard.png'
import { MaterialCommunityIcons } from '@expo/vector-icons';
const { width, height } = Dimensions.get("window");
var e;
export default class Connectbank extends React.Component {
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
                        <Text style={{ fontWeight: 'bold', fontSize: 25, color: 'black', marginLeft: 15, marginTop: 1 }}>Bank</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.body}>
                   <View style={{margin:20,height:100,borderWidth:1,
                    borderRadius:10,borderColor:'#cccc',
                    backgroundColor:' rgba(229, 229, 229, 0.51)',padding:20,justifyContent: 'center'}}>
                        <Text style={{fontSize:16}}>Link to credit card,debit card</Text>
                        <TouchableOpacity onPress={()=>this.props.navigation.navigate("Test")} style={{flexDirection:'row',marginTop:15}}>
                            <Text style={{fontSize:18,fontWeight: 'bold'}}>Add connective</Text>
                            <MaterialIcons name="navigate-next" size={28} color="black" />
                        </TouchableOpacity>
                   </View>
                   <View   style={{margin:20}}>
                        <Text style={{fontSize:20,fontWeight: 'bold',color: '#2D7474'}}>Linked Banks</Text>
                   </View>
                   <View style={{margin:20,height:100,borderWidth:1,
                    borderRadius:10,borderColor:'#cccc',
                    backgroundColor:'rgba(97, 141, 193, 0.6)',padding:20,justifyContent: 'space-between',flexDirection: 'row'}}>
                        <View style={{flexDirection: 'row',justifyContent: 'center', alignItems: 'center'}}>
                            <Image  style={{height:50,width:60,borderRadius:4}} source={visa}></Image>
                            <TouchableOpacity onPress={()=>this.props.navigation.navigate("Addnewcard")} style={{marginLeft:10}}>
                            <Text style={{fontSize:18,color: 'white' ,fontWeight: 'bold'}}>Visa</Text>
                        </TouchableOpacity>
                        </View>
                        <View style={{justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{fontSize:18,color: 'white' ,fontWeight: 'bold'}}>****23456</Text>
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

    }
})