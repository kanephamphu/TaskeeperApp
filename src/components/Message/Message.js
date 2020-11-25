import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, Dimensions, TouchableHighlight } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import profile from '../../images/nha.jpg'
import io from 'socket.io-client/dist/socket.io'
import { AntDesign } from '@expo/vector-icons';
import AsyncStorage from '@react-native-community/async-storage';
const { height, width } = Dimensions.get('window');
var e;
class Message extends Component {
    constructor(props) {
        super(props);
        e = this;
        this.socket = io('https://taskeepererver.herokuapp.com', { jsonp: false })
        this.state = {
            dataSource: [
                {
                    _id: 1,
                    name: 'Nguyen Minh Nha',
                    messagetext: 'Hom nay toi buon',
                    time: '10:25'
                },
                {
                    _id: 2,
                    name: 'Nguyen Minh Nha',
                    messagetext: 'Hom nay toi buon',
                    time: '10:25'
                },
                {
                    _id: 3,
                    name: 'Nguyen Minh Nha',
                    messagetext: 'Hom nay toi buon',
                    time: '10:25'
                },
                {
                    _id: 4,
                    name: 'Nguyen Minh Nha',
                    messagetext: 'Hom nay toi buon',
                    time: '10:25'
                },
                {
                    _id: 5,
                    name: 'Nguyen Minh Nha',
                    messagetext: 'Hom nay toi buon',
                    time: '10:25'
                },
                {
                    _id: 6,
                    name: 'Nguyen Minh Nha',
                    messagetext: 'Hom nay toi buon',
                    time: '10:25'
                },
            ],
            isLoading: true,
            refeshing: false,
            secret_key: '',
            dataMessage:[]
        }
        this.ondetail=this.ondetail.bind(this);
        this.socket.on('sv-get-message-list', function (data) {
            var listdata = data.data
            if (data.success == true) {
                e.setState({
                    dataMessage: listdata,
                })
               console.log(JSON.stringify(listdata))
            }

        })
    }
    componentDidMount= async ()=>{
        const token = await AsyncStorage.getItem("token");
        const message ={
            secret_key:token,
            skip:0,
        }
        this.socket.emit("cl-get-message-list",message);
    }
    renderHeader = () => {
        return (
            <View style={{ height: 30, backgroundColor: '#faf9f9', justifyContent: 'center', alignItems: 'center' }}>
                <Text>You have 1 unread meassage</Text>
            </View>
        )
    }
    ondetail(receiver_id){
        this.props.navigation.navigate("MesagePersonHome",{receiver_id :receiver_id });
    }
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.header0}>
                    <View style={{ flexDirection: 'row', marginTop: 40, marginLeft: 10 }}>
                        <View style={{ flexDirection: 'row' }}>
                            <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                                <Ionicons style={{ marginTop: 1, marginLeft: 5 }} name="ios-arrow-back" size={28} color="#faf9f9" />
                            </TouchableOpacity>
                            <Text style={{ fontSize: 25, color: '#2d7474', marginLeft: 120, marginTop: -2 }}>Message</Text>
                        </View>
                        <View style={{ justifyContent: 'center', alignItems: 'flex-end', marginLeft: 110 }}>
                            <TouchableHighlight
                                activeOpacity={1}
                                underlayColor={"#ccd0d5"}  
                                onPress={this.ondetail}              
                                style={styles.search_icon_box}
                            >
                                <AntDesign name="search1" size={22} color="#000000" />
                            </TouchableHighlight>
                        </View>
                    </View>
                </View>
                <View >
                    <FlatList data={this.state.dataMessage}
                        ListHeaderComponent={this.renderHeader}
                        renderItem={({ item, index }) => {
                            return (
                                <RenderItem onMessage={this.ondetail} item={item} index={index}></RenderItem>
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
        return (
            <View style={{ flexDirection: 'column' }}>
                <View style={styles.header}>
                    <TouchableOpacity onpress={this.props.onMessage}>
                        <Image source={this.props.item.user.avatar ? { uri: this.props.item.user.avatar } : null} style={{
                            width: 80
                            , height: 80, borderRadius: 50,
                        }}></Image>
                        <View style={{
                            width: 30
                            , height: 30, borderRadius: 50, backgroundColor: '#71B7B7',
                            alignItems: 'center', justifyContent: 'center', position: 'absolute', left: 50, top: -10
                        }}>
                            <Text style={{ color: '#ffff' }}>2</Text>
                        </View>
                    </TouchableOpacity>

                    <View >
                        <View style={{ flexDirection: 'column', marginBottom: 10, marginTop: 5, marginLeft: 30, width: 170 }}>
                            <TouchableOpacity  onpress={this.props.onMessage}>
                                <Text style={styles.textTitle}>
                                    {this.props.item.user.name}
                                </Text>
                            </TouchableOpacity>
                            <View>
                                <Text style={{ fontSize: 16 }}>
                                    {this.props.item.text}
                                </Text>
                            </View>
                        </View>
                    </View>
                    <View style={{ marginLeft: 40 }}>
                        <Text> {new Date(this.props.item.createdAt).toLocaleDateString()}</Text>
                    </View>
                </View>
                <View style={{ height: 1, borderWidth: 1, borderColor: '#e6e4eb', backgroundColor: 'black', marginLeft: 100 }}></View>
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
        color: '#71B7B7',
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
        marginTop: 5, marginBottom: 10
    },
    search_icon_box: {
        width: 40,
        height: 40,
        borderRadius: 40,
        backgroundColor: '#e4e6eb',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
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
})