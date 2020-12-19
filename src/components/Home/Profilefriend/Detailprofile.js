import React, { Component } from 'react';
import { Image, View, Text, StyleSheet, TouchableOpacity, Alert, Dimensions, FlatList, ActivityIndicator, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-community/async-storage';
import { Entypo } from '@expo/vector-icons';
import io from 'socket.io-client/dist/socket.io';
import { MaterialIcons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
const { width, height } = Dimensions.get("window");
var e;
export default class Detailprofile extends React.Component {
    constructor(props) {
        super(props)
        e = this;
        this.socket = io('https://taskeepererver.herokuapp.com', { jsonp: false })
        this.state = {
            secret_key: '',
            deleteRowkey: null,
            isLoading: false,
            refeshing: false,
            dataSave: [],
            email: '',
            phone_number: '',
            day_of_birth: '',
            month_of_birth: '',
            year_of_birth: '',
            gender: '',
            working_information: [],
            education: [],
            last_name: '',
            from_time: '',
            to_time: '',
            time_type: ''

        }

        this.socket.on("sv-user-detail", function (data) {
            var list = data.data
            if (data.success == true) {
                e.setState({
                    email: list.email.current_email,
                    phone_number: list.phone_number.current_phone_number,
                    day_of_birth: list.day_of_birth,
                    month_of_birth: list.month_of_birth,
                    year_of_birth: list.year_of_birth,
                    gender: list.gender,
                    working_information: list.working_information,
                    education: list.education_information,
                    isLoading: true,
                    last_name: list.last_name,

                })

            } else {
                console.log(data.errors)
            }
        })
       
    };

    componentDidMount = async () => {
        const detail = {
            _user_id: this.props.route.params._id,
        }
        this.socket.emit("cl-user-detail", detail)
        
    }
   
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.header0}>
                    <TouchableOpacity style={{ flexDirection: 'row' }} onPress={() => this.props.navigation.goBack()}>
                        <Ionicons style={{ marginTop: 1 }} name="ios-arrow-back" size={28} color="black" />
                        <Text style={{ fontWeight: 'bold', fontSize: 25, color: 'black', marginLeft: 15, marginTop: -2 }}>{this.state.last_name}'s Detail profile</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ flex: 1 }}>
                    {this.state.isLoading === false
                        ?
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                            <ActivityIndicator size='large'></ActivityIndicator>
                        </View>
                        :
                        <ScrollView>
                            <View style={{ marginLeft: 15, marginRight: 15, backgroundColor: '#faf9f9', borderBottomWidth: 1, borderBottomColor: '#DDDDDD', paddingBottom: 15 }}>
                                <View>
                                    <Text style={{ fontSize: 20, fontWeight: 'bold' }}>WORK</Text>
                                </View>
                                {this.state.working_information.map((item) => {
                                    return (
                                        <View key={item._id} style={{ flexDirection: 'row', marginTop: 10 }}>
                                            <View style={{
                                                width: 50, height: 50, backgroundColor: '#2d7474', borderRadius: 100,
                                                justifyContent: 'center', alignItems: 'center'
                                            }}>
                                                <MaterialCommunityIcons name="cast-education" size={26} color="#ffff" />
                                            </View>
                                            <View style={{
                                                flexDirection: 'column', marginLeft: 15, justifyContent: 'center',
                                                width: '70%'
                                            }}>
                                                <View>
                                                    <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{item.company_name}</Text>
                                                </View>
                                                <View>
                                                    {item.time_period.time_type == "past" ?
                                                        <Text>{item.time_period.from_time}-<Text>{item.time_period.to_time}</Text></Text>
                                                        :
                                                        <Text>{item.time_period.from_time}</Text>
                                                    }

                                                </View>
                                            </View>
                                            <View style={{justifyContent: 'center'}} ><Text>{item.time_period.time_type}</Text></View>
                                        </View>
                                    )
                                })
                                }
                            </View>
                            <View style={{ marginLeft: 15, marginRight: 15, backgroundColor: '#faf9f9', borderBottomWidth: 1, borderBottomColor: '#DDDDDD', paddingBottom: 15 }}>
                                <View style={{ marginTop: 10 }}>
                                    <Text style={{ fontSize: 20, fontWeight: 'bold' }}>EDUCATION</Text>
                                </View>

                                {this.state.education.map((item) => {
                                    return (
                                        <View key={item._id} style={{ flexDirection: 'row', marginTop: 10 }}>
                                            <View style={{
                                                width: 50, height: 50, backgroundColor: '#2d7474', borderRadius: 100,
                                                justifyContent: 'center', alignItems: 'center'
                                            }}>
                                                <MaterialCommunityIcons name="cast-education" size={26} color="#ffff" />
                                            </View>
                                            <View style={{
                                                flexDirection: 'column', marginLeft: 15, justifyContent: 'center',
                                                width: '70%'
                                            }}>
                                                <View>
                                                    <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{item.school_name}</Text>
                                                </View>
                                                <View>
                                                    {item.time_period.time_type == "past" ?
                                                        <Text>{item.time_period.from_time}-<Text>{item.time_period.to_time}</Text></Text>
                                                        :
                                                        <Text>{item.time_period.from_time}</Text>
                                                    }

                                                </View>
                                            </View>
                                            <View style={{justifyContent: 'center'}} ><Text>{item.time_period.time_type}</Text></View>
                                        </View>
                                    )
                                })
                                }
                            </View>
                            <View style={{ marginLeft: 15, marginRight: 15, backgroundColor: '#faf9f9', borderBottomWidth: 1, borderBottomColor: '#DDDDDD', paddingBottom: 15 }}>
                                <View style={{ marginTop: 10 }}>
                                    <Text style={{ fontSize: 20, fontWeight: 'bold' }}>BASIC INFO</Text>
                                </View>
                                <View style={{ flexDirection: 'row', marginTop: 10 }}>
                                    <View style={{
                                        width: 50, height: 50, backgroundColor: '#2d7474', borderRadius: 100,
                                        justifyContent: 'center', alignItems: 'center'
                                    }}>
                                        <Ionicons name="md-person" size={26} color="#ffff" />
                                    </View>
                                    <View style={{
                                        flexDirection: 'column', marginLeft: 15, justifyContent: 'center',
                                        width: '80%'
                                    }}>
                                        <View>
                                            <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{this.state.gender === 'undefined' ? null : this.state.gender}</Text>
                                        </View>
                                        <View>
                                            <Text>gender</Text>
                                        </View>
                                    </View>
                                </View>
                                <View style={{ flexDirection: 'row', marginTop: 10 }}>
                                    <View style={{
                                        width: 50, height: 50, backgroundColor: '#2d7474', borderRadius: 100,
                                        justifyContent: 'center', alignItems: 'center'
                                    }}>
                                        <FontAwesome name="birthday-cake" size={26} color="#ffff" />
                                    </View>
                                    <View style={{
                                        flexDirection: 'column', marginLeft: 15, justifyContent: 'center',
                                        width: '80%'
                                    }}>
                                        <View>
                                            <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{this.state.day_of_birth}-{this.state.month_of_birth}-{this.state.year_of_birth}</Text>
                                        </View>
                                        <View>
                                            <Text>birthday</Text>
                                        </View>
                                    </View>
                                </View>
                                <View style={{ flexDirection: 'row', marginTop: 10 }}>
                                    <View style={{
                                        width: 50, height: 50, backgroundColor: '#2d7474', borderRadius: 100,
                                        justifyContent: 'center', alignItems: 'center'
                                    }}>
                                        <MaterialIcons name="email" size={26} color="#ffff" />
                                    </View>
                                    <View style={{
                                        flexDirection: 'column', marginLeft: 15, justifyContent: 'center',
                                        width: '80%'
                                    }}>
                                        <View>
                                            <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{this.state.email}</Text>
                                        </View>
                                        <View>
                                            <Text>email</Text>
                                        </View>
                                    </View>
                                </View>
                                <View style={{ flexDirection: 'row', marginTop: 10 }}>
                                    <View style={{
                                        width: 50, height: 50, backgroundColor: '#2d7474', borderRadius: 100,
                                        justifyContent: 'center', alignItems: 'center'
                                    }}>
                                        <FontAwesome name="mobile-phone" size={26} color="#ffff" />
                                    </View>
                                    <View style={{
                                        flexDirection: 'column', marginLeft: 15, justifyContent: 'center',
                                        width: '80%'
                                    }}>
                                        <View>
                                            <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{this.state.phone_number}</Text>
                                        </View>
                                        <View>
                                            <Text>phone number</Text>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        </ScrollView>
                    }

                </View>

            </View>
        )
    }
}
const styles = StyleSheet.create({
    flatlist: {
        flex: 1,
        alignItems: 'center'
    },
    image_container: {
        paddingVertical: 10,
        paddingHorizontal: 10,
        flexDirection: 'row',
        borderRadius: 10,
        height: 90,
        width: 350,
        backgroundColor: 'rgba(200,200,200,0.3)',
        margin: 20
    },
    time: {
        fontWeight: 'bold',
        fontSize: 19,
        color: '#2d7474'

    },
    company: {
        fontWeight: 'bold',
        fontSize: 18,


    },
    position: {
        fontSize: 16
    },
    rating: {
        marginTop: 5,
        flexDirection: 'row'
    },
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
        height: height * 0.08,
        shadowOffset: { width: 0, height: 3 },
        paddingLeft: 10,
        paddingTop: 15,

        backgroundColor: '#faf9f9',

    },
})