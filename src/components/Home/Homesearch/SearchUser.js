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
import avatarimage from '../../../images/avatar11.png'
const { height, width } = Dimensions.get('window');
class SearchUser extends Component {
    constructor(props) {
        super(props)
        e = this
        this.socket = io('https://taskeepererver.herokuapp.com', { jsonp: false })
        this.state = {
            dataSearch: [],
            search_string: '',
            isLoading: false
        }
        this.socket.on("sv-search-user", function (data) {
            if (data.success == false) {
                console.log(JSON.stringify(data))
            } else if (data.success == true) {
                var list = data.data
                e.setState({
                    dataSearch: list,
                    isLoading: true
                })
                console.log(data)
            }
        })
    }
    componentDidMount = () => {
        this.onSearchuser(this)
    }
    onSearchuser = () => {
        const searchtask = {
            search_string: this.props.search_key
        }
        this.socket.emit("cl-search-user", searchtask)
    }
    render() {
        return (
            <View style={styles.container}>
                {this.state.isLoading === false ?
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <ActivityIndicator size='large'></ActivityIndicator>
                    </View>
                    :
                    this.state.dataSearch.length === 0
                        ?
                        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                            <Text>Couldn't find this person</Text>
                        </View>
                        :
                        <View style={styles.container1}>
                            <FlatList data={this.state.dataSearch}
                                renderItem={({ item, index }) => {
                                    return (
                                        <Listdataitem stack={this.props.stackProfile} item={item} index={index}
                                        ></Listdataitem>
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
export default SearchUser
class Listdataitem extends Component {
    render() {
        return (
            <View style={styles.body}>
                <View >
                    <View style={styles.one}>
                        <View >
                            <View style={styles.imageview}>
                                <Image source={this.props.item.avatar ? { uri: this.props.item.avatar } : avatarimage} style={styles.image}></Image>
                            </View>
                        </View>
                        <View style={{ flexDirection: 'column', marginLeft: 15, justifyContent: 'center', width: width - 150 }}>
                            <View>
                                <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{this.props.item.first_name} {this.props.item.last_name}</Text>
                            </View>
                            <View>
                                <Text style={{ color: '#888888' }}>{this.props.item.email.current_email}</Text>
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
                                    <Text style={styles.text}>Working information:<Text style={{fontWeight: 'bold' }}> {this.props.item.working_information.length==0?null:this.props.item.working_information[0].company_name}</Text></Text>
                                </View>
                            </View>
                            <View style={styles.two}>
                                <View>
                                    <MaterialCommunityIcons name="cast-education" size={24} color="#555555" />
                                </View>
                                <View style={styles.viewtext}>
                                <Text style={styles.text}>Education information:<Text style={{fontWeight: 'bold' }}> {this.props.item.education_information.length==0?null:this.props.item.education_information[0].school_name}</Text></Text>
                                </View>
                            </View>
                            <View style={styles.two}>
                                <View>
                                    <Fontisto name="persons" size={22} color="#555555" />
                                </View>
                                <View style={styles.viewtext}>
                                     <Text style={styles.text}>Follower: <Text style={{fontWeight: 'bold' }}>{this.props.item.follower_number}</Text></Text>
                                </View>
                            </View>
                        </View>
                        <View style={styles.five}>
                            <TouchableOpacity style={styles.buttonviewprofile} onPress={() => this.props.stack(this.props.item.first_name, this.props.item.last_name,
                                this.props.item._id)}>
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
    container1: {
        flex: 1,
        backgroundColor: '#CCCCCC',

    },
    body: {
        flexDirection: 'column',
        backgroundColor: '#faf9f9',
       
        shadowColor: 'green',
        shadowOpacity: 0.1,
        elevation: 4,
        borderColor: '#71B7B7',
        marginTop: 5
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
        marginLeft: 15,
       paddingRight:5,
     
       width:"90%"
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