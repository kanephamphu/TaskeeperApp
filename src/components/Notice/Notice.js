import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Dimensions, Modal ,ActivityIndicator} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import AsyncStorage from '@react-native-community/async-storage';
import io from 'socket.io-client/dist/socket.io';
import iconsuccess from '../../images/icon1.png';
import iconerror from '../../images/icon2.png';
import iconwarning from '../../images/icon3.png';
const { height, width } = Dimensions.get('window');
var e;
class Notice extends Component {
    constructor(props) {
        super(props);
        e = this;
        this.socket = io('https://taskeepererver.herokuapp.com', { jsonp: false })
        this.state = {
            dataSource: [],
            isLoading: false,
            refeshing: false,
            secret_key: '',
            show1: false,
            showarning: false,
            notice: "",
            key: ''
        }
        this.socket.on("sv-read-notification", function (data) {
            var list = data.data
            if (data.success == false) {
                console.log(JSON.stringify(data))
            } else if (data.success == true) {
                e.setState({
                    dataSource: list,
                    isLoading:true,
                })
                console.log(JSON.stringify(list))
               
            }
        })
        this.socket.on("sv-readed-all-notification", function (data) {
            if (data.success == false) {
                console.log(JSON.stringify(data))
            } else if (data.success == true) {
                e.setState({ show1: true, notice: "Đã đọc tất cả", key: "success" })
            }
        })
    };
    componentDidMount = async () => {
        const token = await AsyncStorage.getItem('token')
        this.setState({
            secret_key: token
        })
        const notice = {
            secret_key: this.state.secret_key,
            number_notification: 10,
            skip: 0
        }
        this.socket.emit("cl-get-notification", notice)
    }
    readAllnotice() {
        const readall = {
            secret_key: this.state.secret_key,
        }
        this.socket.emit("cl-readed-all-notification", readall)
    }
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.header0}>
                    <View style={styles.header_inner}>
                        <View>
                            <Text style={{ fontSize: 25, color: '#EE9A49' }}>Notifications</Text>
                        </View>
                        <TouchableOpacity onPress={() => this.setState({ showarning: true })} >
                            <Entypo name="menu" size={26} color="#71B7B7" />
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{ height: 1, borderWidth: 2, borderColor: '#71B7B7', backgroundColor: '#71B7B7' }}></View>
                {this.state.isLoading===false
                ?
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size='large'></ActivityIndicator>
              </View>
                :
                <View>
                    <ScrollView>
                        {this.state.dataSource.map((items) => {
                            return (
                                <View key={items._id} style={{ flexDirection: 'row',
                                    height: 100,
                                    alignItems: 'center',
                                    borderBottomWidth: 1,
                                    borderBottomColor: '#71B7B7',
                                    backgroundColor:items.is_readed===true?'#faf9f9':'#dddd',paddingBottom:5}}>
                                    <View style={{marginLeft:15}}>
                                        <MaterialIcons name="notifications-active" size={35} color="#71B7B7" />
                                    </View>
                                    <View style={{ flexDirection: 'column', marginBottom: 10, marginTop: 5, marginLeft: 30 }}>
                                        <View>
                                            <Text style={styles.textTitle}>
                                            {items._id}
                                        </Text>
                                        </View>
                                        <View>
                                            <Text style={{ fontSize: 16 }}>
                                               {items.description}
                                        </Text>
                                        </View>
                                        <View style={{flexDirection: 'row'}}>
                                        <View style={{fontSize:16}}>
                                    <Text>{new Date(items.created_time).toLocaleDateString() } </Text>
                                </View>
                                <View>
                                    <Text>{new Date(items.created_time).toLocaleTimeString()}</Text>
                                </View>
                                        </View>
                                    </View>
                                </View>
                            )
                        })}
                    </ScrollView>

                </View>
                }
                
                <Modal transparent={true}
                    visible={this.state.showarning}
                    animationType='slide'
                    style={{ justifyContent: 'center', alignItems: 'center' }}
                >
                    <View style={{ backgroundColor: '#000000aa', flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        {this.state.show1 === false
                            ?
                            <View style={{
                                backgroundColor: '#faf9f9', borderRadius: 20,
                                height: "30%", width: "70%", justifyContent: 'center', alignItems: 'center'
                            }}>
                                <Image source={iconwarning} style={{ height: 50, width: 50 }}></Image>
                                <Text>Đọc tất cả thông báo !</Text>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: "70%" }}>
                                    <TouchableOpacity onPress={() => this.setState({ showarning: false })} style={{
                                        width: "50%", backgroundColor: '#71B7B7',
                                        height: 30, borderRadius: 10, marginTop: 15, justifyContent: 'center', alignItems: 'center', marginRight: 5
                                    }}>
                                        <Text style={{ color: "white", fontSize: 15, fontWeight: 'bold' }}>Trở về</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => this.readAllnotice()} style={{
                                        width: "50%", backgroundColor: '#71B7B7',
                                        height: 30, borderRadius: 10, marginTop: 15, justifyContent: 'center', alignItems: 'center', marginLeft: 5
                                    }}>
                                        <Text style={{ color: "white", fontSize: 15, fontWeight: 'bold' }}>Ok</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                            :
                            <View style={{
                                backgroundColor: '#faf9f9', borderRadius: 20,
                                height: "30%", width: "70%", justifyContent: 'center', alignItems: 'center'
                            }}>
                                <Image source={this.state.key === "success" ? iconsuccess : iconerror} style={{ height: 50, width: 50 }}></Image>
                                <Text>{this.state.notice}</Text>
                                <TouchableOpacity onPress={() => this.setState({ showarning: false, show1: false })} style={{
                                    width: "50%", backgroundColor: this.state.key === "success" ? 'green' : 'red',
                                    height: 30, borderRadius: 10, marginTop: 15, justifyContent: 'center', alignItems: 'center'
                                }}>
                                    <Text style={{ color: "white", fontSize: 15, fontWeight: 'bold' }}>Ok</Text>
                                </TouchableOpacity>
                            </View>
                        }

                    </View>
                </Modal>
            </View>

        );
    }
}
export default Notice;
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
        justifyContent: 'space-between',
        marginTop: 5,
        position: 'relative'
    },
    header: {
        flexDirection: 'row',
        height: 100,
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#71B7B7',
        marginLeft: 16,
        marginTop: 5, marginBottom: 10
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
        height: height * 0.08,
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.2,
        padding: 10,
        shadowOpacity: 0.2,
        elevation: 1,
        marginTop: Platform.OS == 'android' ? 40 : null,
    },
})