import React, { Component } from 'react';
import { Image, TextInput, View, Text, StyleSheet, TouchableOpacity, Alert, Dimensions, FlatList, ActivityIndicator, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { socket } from "../../../Socket.io/socket.io";
const { width, height } = Dimensions.get("window");
var e;
export default class Setamount extends React.Component {
    constructor(props) {
        super(props)
        e = this;
        this.state = {
            searchString: '',
            key: '',
            dataSearch: [],
            fullname:'',
        }
        socket.on("serverSearchUsersAutoComplete", function (data) {
            var list = data.data;
            if (data.success == false) {
                console.log(JSON.stringify(data));
            } else if (data.success == true) {
                e.setState({
                    dataSearch: list,
                });
            }
        });
    };
    onSearch = async (searchString) => {
        this.setState({
            key: searchString,
            searchString:'',

        })
        const search = {
            searchString: searchString
        }
        socket.emit("clientSearchUsersAutoComplete", search)
    }
    renderItem = ({ item }) => {
        return (
            <TouchableOpacity >
                <View style={styles.search_item}>
                    <Text>{first_name}</Text>
                </View>
            </TouchableOpacity>
        )

    }
    render() {
        console.log(this.state.dataSearch)
        return (
            <View style={styles.container}>
                <View style={styles.header0}>
                    <TouchableOpacity style={{ flexDirection: 'row' }} onPress={() => this.props.navigation.goBack()}>
                        <Ionicons style={{ marginTop: 1 }} name="ios-arrow-back" size={28} color="black" />
                        <Text style={{ fontWeight: 'bold', fontSize: 25, color: 'black', marginLeft: 15, marginTop: -2 }}>Set Amount</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.body}>
                    <View style={{ margin: 20 }}>
                        <Text style={{ fontSize: 18 }}>How much good you like to send?{this.state.fullname}</Text>
                    </View>
                    <View >

                        {this.state.key != ''
                            ?
                            // <View style={{backgroundColor:'red',marginLeft:'7%', marginTop:'13%',position:'absolute', width:333,height:100}}>
                            //     {this.state.dataSearch.map((items) => {
                            //         return (
                            //             <View>
                            //             <TouchableOpacity>
                            //                 <Text style={{color:'black'}}>{items.first_name} {items.last_name}</Text>
                            //             </TouchableOpacity>
                            //             </View>
                            //         )
                            //     })}
                            // </View>
                            <FlatList
                                style={{backgroundColor:'#ffff', borderWidth:1, borderColor:'#cccc',zIndex:2,marginLeft:'7%', marginTop:'13%',position:'absolute', width:333,height:100}}
                                data={this.state.dataSearch}
                                renderItem={({ item, index }) => {
                                    return (
                                        <View key={item}
                                        >
                                            <TouchableOpacity onPress={() =>this.setState({fullname:item.first_name + ' ' + item.last_name, searchString:'',key:''}) }>
                                                <Text style={{ color: 'black' }}>{item.first_name} {item.last_name}</Text>
                                            </TouchableOpacity>
                                        </View>)
                                }}
                            />
                            :
                            null
                        }
                        <View style={{zIndex:1}}>
                            <TextInput
                                style={styles.input}
                                placeholder={'Email'}
                                placeholderTextColor={'#cccc'}
                                underlineColorAndroid='transparent'
                                onChangeText={(searchString) => this.onSearch(searchString)}
                            >
                            </TextInput>
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
                    </View>
                    <View style={{ margin: 20 }}>
                        <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Quick Actions</Text>
                    </View>
                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'center', width: "70%" }}>
                            <View style={styles.menhgia1}>
                                <Text style={styles.textmoney}>100.000</Text>
                            </View>
                            <View style={styles.menhgia}>
                                <Text style={styles.textmoney}>200.000</Text>
                            </View>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'center', width: "70%", marginTop: 15 }}>
                            <View style={styles.menhgia1}>
                                <Text style={styles.textmoney}>500.000</Text>
                            </View>
                            <View style={styles.menhgia}>
                                <Text style={styles.textmoney}>1.000.000</Text>
                            </View>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'center', width: "70%", marginTop: 15 }}>
                            <View style={styles.menhgia1}>
                                <Text style={styles.textmoney}>2.000.000</Text>
                            </View>
                            <View style={styles.menhgia}>
                                <Text style={styles.textmoney}>5.000.000</Text>
                            </View>
                        </View>

                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 20 }}>
                        <TouchableOpacity style={{ height: 40, width: 150, backgroundColor: '#488B8F', marginRight: 10, borderRadius: 5, justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ fontWeight: 'bold', color: "white", fontSize: 18 }}>Transfer</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{
                            height: 40, width: 150, borderRadius: 5, backgroundColor: '#ffff',
                            borderWidth: 1, borderColor: '#488B8F', marginLeft: 10, justifyContent: 'center', alignItems: 'center'
                        }}>
                            <Text style={{ fontWeight: 'bold', color: "#488B8F", fontSize: 18 }}>Cancel</Text>
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
        paddingTop: 15,
        backgroundColor: '#add2c9',
    },
    body: {
        justifyContent: 'center',
    },
    menhgia: {
        width: 100, height: 40,
        borderWidth: 1,
        marginLeft: 20,
        borderColor: '#2d7474',
        borderRadius: 5,
        justifyContent: 'center', alignItems: 'center'
    },
    menhgia1: {
        width: 100, height: 40,
        borderWidth: 1,
        marginRight: 20,
        borderColor: '#2d7474',
        borderRadius: 5,
        justifyContent: 'center', alignItems: 'center'
    },
    textmoney: {
        fontWeight: 'bold',
    },
    input: {
        width: width - 50,
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

    iconview: {
        position: 'absolute',
        bottom: 7,
        right: 6
    }
})