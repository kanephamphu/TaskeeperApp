import React, { Component } from 'react'
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    FlatList, ActivityIndicator, Dimensions
} from 'react-native'
var e;
import io from 'socket.io-client/dist/socket.io'
import { Fontisto } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import avatarimage from '../../images/avatar11.png'
import AsyncStorage from '@react-native-community/async-storage';
const { height, width } = Dimensions.get('window');
class ListFollower extends Component {
    constructor(props) {
        super(props)
        e = this
        this.socket = io('https://taskeepererver.herokuapp.com', { jsonp: false })
        this.state = {
            dataFollower: [],
            search_string: '',
            isLoading: false,
            secret_key: '',
        }
        this.socket.on("sv-get-followers",function(data){
            e.setState({
                dataFollower:data.data,
                isLoading:true
            })
            console.log(data)
        })  
    }
    componentDidMount = () => {
        this.onFollow()
    }
  
    onFollow = async () => {
        const token = await AsyncStorage.getItem('token');
        const get={
            user_id:this.props.route.params._id
        }
        this.socket.emit("cl-get-followers",get)
        console.log(get)
    }
    render() {
        return (
            <View style={styles.container}>
                 <View style={styles.header0}>
                    <TouchableOpacity style={{ flexDirection: 'row' }} onPress={() => this.props.navigation.goBack()}>
                        <Ionicons style={{ marginTop: 1 }} name="ios-arrow-back" size={28} color="black" />
                        <Text style={{ fontWeight: 'bold', fontSize: 25, color: 'black', marginLeft: 15, marginTop: -2 }}>List Followers</Text>
                    </TouchableOpacity>
                </View>
            {this.state.isLoading === false ?
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <ActivityIndicator size='large'></ActivityIndicator>
                </View>
                :
                this.state.dataFollower.length === 0
                    ?
                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                        <Text>Trống</Text>
                    </View>
                    :
                    <View style={styles.container1}>
                        <FlatList data={this.state.dataFollower}
                            renderItem={({ item, index }) => {
                                return (
                                    <View key={item._id} style={styles.body}>
                                    <TouchableOpacity onPress={()=>this.props.navigation.navigate("Profilefriendmenu",{_id: item.follower_id})} >
                                        <View style={styles.imageview}>
                                            <Image source={item.avatar? { uri:item.avatar }:avatarimage} style={styles.image}></Image>
                                        </View>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={()=>this.props.navigation.navigate("Profilefriendmenu",{_id: item.follower_id})} style={{ flexDirection: 'column',marginLeft:10,justifyContent: 'center', alignItems: 'center'}}>
                                        <Text style={{fontSize:20,fontWeight: 'bold'}}>{item.follower_first_name} {item.follower_last_name}</Text>
                                        
                                    </TouchableOpacity>
                                </View>
                                )
                            }}
                            keyExtractor={(item) => item._id.toString()}
                            ItemSeparatorComponent={this.ItemSeparatorComponent}
                            showsHorizontalScrollIndicator={false}
                        >
                        </FlatList>
                    </View>
            }
        </View>
          
        )
    }
}
export default ListFollower
class Listdataitem extends Component {
    render() {
        return (
            <View style={styles.body}>
                <View >
                    <View style={styles.one}>
                        <View >
                            <View style={styles.imageview}>
                                <Image source={avatarimage} style={styles.image}></Image>
                            </View>
                        </View>
                        <View style={{ flexDirection: 'column', marginLeft: 15, justifyContent: 'center', width: width - 150 }}>
                            <View>
                                <Text style={{ fontSize: 20, fontWeight: 'bold' }}></Text>
                            </View>
                            <View>
                                <Text style={{ color: '#888888' }}></Text>
                            </View>
                        </View>
                    </View>
                    <View >
                        <View style={{ flexDirection: 'column', margin: 10 }}>
                            <View style={styles.two}>
                                <View>
                                    <MaterialIcons name="work" size={24} color="#555555" />
                                </View>
                                <View style={styles.viewtext}>
                                    <Text style={styles.text}>Working information</Text>
                                </View>
                            </View>
                            <View style={styles.two}>
                                <View>
                                    <MaterialCommunityIcons name="cast-education" size={24} color="#555555" />
                                </View>
                                <View style={styles.viewtext}>
                                    <Text style={styles.text}>Eucation infoamation</Text>
                                </View>
                            </View>
                            <View style={styles.two}>
                                <View>
                                    <Fontisto name="persons" size={24} color="#555555" />
                                </View>
                                <View style={styles.viewtext}>
                                    <Text style={styles.text}>So nguoi follow</Text>
                                </View>
                            </View>
                        </View>
                        <View style={styles.five}>
                            <TouchableOpacity style={styles.buttonviewprofile}>
                                <Text style={{ color: 'black', fontWeight: 'bold' }}>View Profile</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.viewmes}>
                                <AntDesign name="message1" size={22} color="black" />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#faf9f9',

    },
    header0: {
        height: height * 0.1,
        shadowOffset: { width: 0, height: 3 },
        paddingLeft: 10,
        paddingTop:15,
        backgroundColor: '#faf9f9',
    
      },    
    container1: {
        flex: 1,
        backgroundColor: '#CCCCCC',

    },
    body: {
        flexDirection: 'row',
        backgroundColor: '#faf9f9',
        height: 100,
        shadowColor: 'green',
        shadowOpacity: 0.1,
        elevation: 4,
        borderColor: '#71B7B7',
        padding:15,
        marginTop:5
    },
    one: {
        flexDirection: 'row',
        margin: 10,

    },
    imageview: {
        shadowOffset: { width: 0, height: 3 },
        shadowColor: 'green',
        shadowOpacity: 0.5,
        elevation: 10,
        borderColor: '#71B7B7',
        borderRadius: 50,
    },
    image: {
        height: 70,
        width: 70,
        borderRadius: 50,
    },
    two: {
        flexDirection: 'row',
        marginLeft: 10,
    },
    viewtext: {
        marginLeft: 15
    },
    text: {
        color: '#444444'
    },
    five: {
        flexDirection: 'row',
        marginTop: 7,
        justifyContent: 'space-between',
        margin: 10
    },
    buttonviewprofile: {
        height: 35,
        width: "80%",
        borderRadius: 5,
        backgroundColor: '#DDDDDD',
        justifyContent: 'center',
        alignItems: 'center'
    },
    viewmes: {
        height: 35,
        width: "15%",
        borderRadius: 5,
        backgroundColor: '#DDDDDD',
        justifyContent: 'center',
        alignItems: 'center'
    }
})