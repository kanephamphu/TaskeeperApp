import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity,
     Modal, ScrollView, Dimensions, Image,TextInput ,
       KeyboardAvoidingView,Keyboard,TouchableWithoutFeedback} from 'react-native';
import { Avatar } from 'react-native-paper';
import io from 'socket.io-client/dist/socket.io'
import { Ionicons } from '@expo/vector-icons';
import jwt_decode from 'jwt-decode'
import AsyncStorage from '@react-native-community/async-storage';
import { AntDesign } from '@expo/vector-icons';
import { Fontisto } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { SimpleLineIcons } from '@expo/vector-icons';
import nha from '../../../images/avatar.jpg';
import sao from '../../../images/star.png';
import iconsuccess from '../../../images/icon1.png';
import iconerror from '../../../images/icon2.png';
import iconwarning from '../../../images/icon3.png';
const { height, width } = Dimensions.get('window');
var e;
export default class Profilefriend extends React.Component {
    constructor(props) {
        super(props)
        e = this;
        this.socket = io('https://taskeepererver.herokuapp.com', { jsonp: false })
        this.state = {
            data: [
                {
                    _id: 1,
                    time: '03-2019',
                    company: 'Fancha Milktea',
                    position: 'Staff',
                    rating: 3
                },
                {
                    _id: 2,
                    time: '07-2019',
                    company: "Crazy's Cat",
                    position: 'Batender',
                    rating: 4
                },
                {
                    _id: 3,
                    time: '02-2019',
                    company: 'Fourdigit',
                    position: 'FE Developer',
                    rating: 1
                },
                {
                    _id: 4,
                    time: '02-2019',
                    company: 'Fourdigit',
                    position: 'FE Developer',
                    rating: 1
                },
            ],
            email: "",
            last_name: "",
            first_name: "",
            phone_number: "",
            day_of_birth: "",
            month_of_birth: "",
            year_of_birth: "",
            gender: "",
            working_information: [],
            education: [],
            avatar: "",
            secret_key: "",
            shownotice: false,
            key: '',
            notice: '',
            showvote: false,
            vote: '',
            follower_number: '',
            votes: '',
            comment: '',
            datawall:[]
        }
        this.onFollow = this.onFollow.bind(this)
        this.socket.on("sv-user-detail", function (data) {
            var list = data.data
            if (data.success == true) {
                e.setState({
                    email: list.email.current_email,
                    last_name: list.last_name,
                    first_name: list.first_name,
                    phone_number: list.phone_number.current_phone_number,
                    day_of_birth: list.day_of_birth,
                    month_of_birth: list.month_of_birth,
                    year_of_birth: list.year_of_birth,
                    gender: list.gender,
                    working_information: list.working_information,
                    education: list.education_information,
                    avatar: list.avatar,
                    follower_number: list.follower_number,
                    votes: 4
                })

            } else {
                console.log(data.errors)
            }
        })
        this.socket.on("sv-follow-user", function (data) {
            if (data.success == true) {
                e.setState({
                    shownotice: true,
                    key: 'success',
                    notice: 'Theo dõi thành công!'
                })
            } else {
                e.setState({
                    shownotice: true,
                    key: 'error',
                    notice: 'Đã theo dõi !'
                })
            }
        })
        this.onVote = this.onVote.bind(this)
        this.socket.on("sv-send-vote", function (data) {
            if (data.success == true) {
                e.setState({
                    showvote: false
                })
            } else {
                console.log(JSON.stringify(data));
            }
        })
        this.onGetwall=this.onGetwall.bind(this);
        this.socket.on("sv-get-wall-task", function (data) {
            if (data.success == true) {
                e.setState({
                    datawall: data.data
                })
                console.log(JSON.stringify(data));
            } else {
                console.log(JSON.stringify(data));
            }
        })

    }
    componentDidMount = async () => {
        const token = await AsyncStorage.getItem('token')
        const decode = jwt_decode(token)
        this.setState({
            secret_key: token
        })
        this.onDetail()
        this.onGetwall()
    }
    onDetail = async () => {
        const detail = {
            _user_id: this.props.route.params._id,
        }
        this.socket.emit("cl-user-detail", detail)
    }
    onGetwall = async () => {
        const get = {
            user_id: this.props.route.params._id,
            number_task :5,
			skip :0
        }
        this.socket.emit("cl-get-wall-task", get)
    }
    _rating(item) {
        let rating = [];
        for (i = 0; i < item; i++) {
            rating.push(
                <Image
                    source={sao}
                    style={{ width: 15, height: 15, marginRight: 3 }}
                    resizeMode="cover"
                />

            )
        }
        return rating;
    }
    onFollow(_id) {
        const follow = {
            secret_key: this.state.secret_key,
            user_id: _id
        }
        this.socket.emit("cl-follow-user", follow);

    }
    onVote(_id) {
        const vote = {
            secret_key: this.state.secret_key,
            user_id: _id,
            vote_point: this.state.vote,
            vote_comment: this.state.comment
        }
        this.socket.emit("cl-send-vote", vote)
        this.onDetail()
    }
    render() {
        const { first_name, last_name, _id } = this.props.route.params;
        return (
            <View style={styles.container}>
                <Modal transparent={true}
                    visible={this.state.shownotice}
                    animationType='slide'
                    style={{ justifyContent: 'center', alignItems: 'center' }}
                >
                    <View style={{ backgroundColor: '#000000aa', flex: 1, justifyContent: 'center', alignItems: 'center' }}>

                        <View style={{
                            backgroundColor: '#faf9f9', borderRadius: 20,
                            height: "30%", width: "70%", justifyContent: 'center', alignItems: 'center'
                        }}>
                            <Image source={this.state.key === "success" ? iconsuccess : iconerror} style={{ height: 50, width: 50 }}></Image>
                            <Text>{this.state.notice}</Text>
                            <TouchableOpacity onPress={() => this.setState({ shownotice: false })} style={{
                                width: "50%", backgroundColor: this.state.key === "success" ? 'green' : 'red',
                                height: 30, borderRadius: 10, marginTop: 15, justifyContent: 'center', alignItems: 'center'
                            }}>
                                <Text style={{ color: "white", fontSize: 15, fontWeight: 'bold' }}>Ok</Text>
                            </TouchableOpacity>
                        </View>

                    </View>
                </Modal>
                <Modal transparent={true}
                    visible={this.state.showvote}
                    animationType='slide'
                    style={{ justifyContent: 'center', alignItems: 'center' }}
                >
                      <TouchableWithoutFeedback onPress={Keyboard.dismiss} style={{ backgroundColor: '#000000aa', flex: 1, justifyContent: 'center', alignItems: 'center'}} >
                    <View style={{ backgroundColor: '#000000aa', flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                           

                            <View style={{
                            backgroundColor: '#faf9f9', borderRadius: 20,
                            height: "40%", width: "70%", justifyContent: 'center', alignItems: 'center'
                        }}>

                            <Text style={{ fontWeight: 'bold', fontSize: 23 }}>{this.state.votes} đánh giá</Text>
                            <View style={{ flexDirection: 'row' }}>
                                <TouchableOpacity onPress={() => this.setState({ vote: 1 })}>
                                    <AntDesign name={this.state.vote >= 1 ? "star" : "staro"} size={24} color={this.state.vote >= 1 ? "yellow" : "black"} />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => this.setState({ vote: 2 })}>
                                    <AntDesign name={this.state.vote >= 2 ? "star" : "staro"} size={24} color={this.state.vote >= 2 ? "yellow" : "black"} />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => this.setState({ vote: 3 })}>
                                    <AntDesign name={this.state.vote >= 3 ? "star" : "staro"} size={24} color={this.state.vote >= 3 ? "yellow" : "black"} />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => this.setState({ vote: 4 })}>
                                    <AntDesign name={this.state.vote >= 4 ? "star" : "staro"} size={24} color={this.state.vote >= 4 ? "yellow" : "black"} />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => this.setState({ vote: 5 })}>
                                    <AntDesign name={this.state.vote == 5 ? "star" : "staro"} size={24} color={this.state.vote == 5 ? "yellow" : "black"} />
                                </TouchableOpacity>
                            </View>
                            <TextInput
                                style={styles.input}
                                placeholder={'Comment'}
                                onChangeText={(comment) => this.setState({ comment })}
                                value={this.state.comment}
                                placeholderTextColor={'#cccc'}
                                underlineColorAndroid='transparent'
                                multiline={true}
                              
                            >
                            </TextInput>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: "70%" }}>
                                <TouchableOpacity onPress={() => this.setState({ showvote: false, vote: 0 })} style={{
                                    width: "50%", backgroundColor: '#71B7B7',
                                    height: 30, borderRadius: 10, marginTop: 15, justifyContent: 'center', alignItems: 'center', marginRight: 5
                                }}>
                                    <Text style={{ color: "white", fontSize: 15, fontWeight: 'bold' }}>Trở về</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => this.onVote(_id)} style={{
                                    width: "50%", backgroundColor: '#71B7B7',
                                    height: 30, borderRadius: 10, marginTop: 15, justifyContent: 'center', alignItems: 'center', marginLeft: 5
                                }}>
                                    <Text style={{ color: "white", fontSize: 15, fontWeight: 'bold' }}>Ok</Text>
                                </TouchableOpacity>
                            </View>
                        </View>

                          
                            
                       
                    </View>
                    </TouchableWithoutFeedback>
                </Modal>
                <View style={styles.header0}>
                    <TouchableOpacity style={{ flexDirection: 'row' }} onPress={() => this.props.navigation.goBack()}>
                        <Ionicons style={{ marginTop: 1 }} name="ios-arrow-back" size={28} color="black" />
                        <Text style={{ fontWeight: 'bold', fontSize: 25, color: 'black', marginLeft: 15, marginTop: -2 }}>{this.state.first_name} {this.state.last_name}</Text>
                    </TouchableOpacity>
                </View>
                <ScrollView>
                    <View style={styles.header}>
                        <View style={{ flexDirection: 'column' }}>
                            <View style={{
                                height: height * 0.2, borderTopLeftRadius: 15,
                                borderTopRightRadius: 15, backgroundColor: "#71B7B7"
                            }}>

                            </View>
                            <View style={{ height: height * 0.05, alignItems: 'center' }}>
                                <View style={{
                                    width: 125, height: 125, borderRadius: 100, backgroundColor: "#ffff",
                                    marginTop: -65, justifyContent: 'center', alignItems: "center"
                                }}>
                                    <Image source={this.state.avatar ? { uri: this.state.avatar } : nha} style={{
                                        width: 118, height: 118, borderRadius: 60, backgroundColor: "red",
                                        borderWidth: 1
                                    }}>

                                    </Image>
                                </View>



                            </View>
                            <View style={{ marginTop: 20, alignItems: 'center' }} >
                                <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{this.state.first_name} {this.state.last_name}</Text>
                            </View>
                            <View style={{ marginTop: 10, flexDirection: 'row', justifyContent: 'space-around' }}>
                                <TouchableOpacity onPress={() => this.onFollow(_id)} style={{
                                    backgroundColor: '#2d7474',
                                    justifyContent: 'center', alignItems: 'center',
                                    width: "70%", height: 35, borderRadius: 5, flexDirection: "row"
                                }}>
                                    <SimpleLineIcons name="user-follow" size={22} color="#ffff" />
                                    <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#ffff', marginLeft: 5 }}>Theo dõi</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={{
                                    borderRadius: 5,
                                    backgroundColor: '#DDDDDD', justifyContent: 'center', alignItems: 'center', width: "10%", height: 35
                                }}>
                                    <AntDesign name="message1" size={22} color="black" />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => this.setState({ showvote: true })} style={{
                                    borderRadius: 5,
                                    backgroundColor: '#DDDDDD', justifyContent: 'center', alignItems: 'center', width: "10%", height: 35
                                }}>
                                    <MaterialCommunityIcons name="vote" size={22} color="black" />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                    <View style={{ marginTop: 10, borderBottomWidth: 1, borderBottomColor: '#DDDDDD' }}>
                        <View style={{ flexDirection: 'column', margin: 10 }}>
                            {this.state.education.length === 0 ?
                                <View style={styles.two}>
                                    <View>
                                        <MaterialCommunityIcons name="cast-education" size={24} color="#555555" />
                                    </View>
                                    <View style={styles.viewtext}>
                                        <Text style={styles.text}>Eucation infomation: <Text style={{ fontWeight: 'bold' }}></Text></Text>
                                    </View>
                                </View>
                                :
                                this.state.education.map((item) => {
                                    return (
                                        <View key={item._id} style={styles.two}>
                                            <View>
                                                <MaterialCommunityIcons name="cast-education" size={24} color="#555555" />
                                            </View>
                                            <View style={styles.viewtext}>
                                                <Text style={styles.text}>Eucation infomation: <Text style={{ fontWeight: 'bold' }}>{item.school_name}</Text></Text>
                                            </View>
                                        </View>
                                    )
                                })
                            }
                        </View>
                    </View>
                    <View style={{ marginTop: 5, borderBottomWidth: 1, borderBottomColor: '#DDDDDD' }}>
                        <View style={{ flexDirection: 'column', margin: 10 }}>
                            {this.state.working_information.length === 0
                                ?
                                <View style={styles.two}>
                                    <View>
                                        <MaterialIcons name="work" size={24} color="#555555" />
                                    </View>
                                    <View style={styles.viewtext}>
                                        <Text style={styles.text}>Working information:  <Text style={{ fontWeight: 'bold' }}></Text></Text>
                                    </View>
                                </View>
                                :
                                this.state.working_information.map((item) => {
                                    return (
                                        <View key={item._id} style={styles.two}>
                                            <View>
                                                <MaterialIcons name="work" size={24} color="#555555" />
                                            </View>
                                            <View style={styles.viewtext}>
                                                <Text style={styles.text}>Working information:  <Text style={{ fontWeight: 'bold' }}>{item.company_name}</Text></Text>
                                            </View>
                                        </View>
                                    )
                                })
                            }
                        </View>

                    </View>
                    <View style={{ marginTop: 5, borderBottomWidth: 1, borderBottomColor: '#DDDDDD' }}>
                        <View style={{ flexDirection: 'column', margin: 10 }}>
                            <View style={styles.two}>
                                <View>
                                    <Fontisto name="persons" size={24} color="#555555" />
                                </View>
                                <View style={styles.viewtext}>
                                    <Text style={styles.text}>Số người theo dõi: {this.state.follower_number}</Text>
                                </View>
                            </View>
                            <View style={styles.two}>
                                <View>
                                    <MaterialCommunityIcons name="vote" size={24} color="#555555" />
                                </View>
                                <View style={styles.viewtext}>
                                    <Text style={styles.text}>Số lượt đánh giá: {this.state.votes}</Text>
                                </View>
                            </View>
                        </View>

                    </View>
                    <View style={{ marginTop: 5, borderBottomWidth: 1, borderBottomColor: '#DDDDDD' }}>
                        <View style={{ flexDirection: 'column', margin: 10, }}>
                            <TouchableOpacity onPress={() => this.props.navigation.navigate("Detailprofile", { _id: this.props.route.params._id })} style={{ marginLeft: 10 }}>
                                <Text>See more profile...</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={{ marginTop: 5, borderBottomWidth: 1, borderBottomColor: '#DDDDDD' }}>
                        <View style={{ flexDirection: 'column', margin: 10 }}>
                            <View style={{ marginLeft: 10 }}>
                                <Text style={{ fontSize: 15, fontWeight: 'bold' }}>History Jobs</Text>
                            </View>
                            <View style={{ marginTop: 20 }}>
                                {this.state.data.map((item) => {
                                    return (
                                        <View key={item._id} style={{
                                            flexDirection: 'column'
                                            , backgroundColor: '#ffff', shadowOffset: { width: 0, height: 0 },
                                            shadowColor: 'green',
                                            shadowOpacity: 0.1,
                                            elevation: 4,
                                            borderWidth: 1,
                                            borderColor: '#71B7B7', padding: 5,
                                            height: 100, borderRadius: 10, justifyContent: 'center', alignItems: 'center', marginBottom: 10
                                        }}>
                                            <View>
                                                <Text style={{ fontWeight: 'bold', color: '#2d7474', fontSize: 18 }}>{item.company}</Text>
                                            </View>
                                            <View >
                                                <Text style={{ fontWeight: 'bold', color: 'black', fontSize: 18 }}>{item.position}</Text>
                                            </View>
                                            <View  >
                                                <Text>{this._rating(item.rating)}</Text>
                                            </View>
                                        </View>
                                    )
                                })}
                            </View>
                            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                <TouchableOpacity onPress={() => this.props.navigation.navigate("historyfriend", { first: this.state.first_name, last: this.state.last_name })} style={{
                                    backgroundColor: '#DDDDDD',
                                    justifyContent: 'center', alignItems: 'center',
                                    width: "100%", height: 35, borderRadius: 5, flexDirection: "row"
                                }}>
                                    <Text style={{ fontSize: 16, fontWeight: 'bold', color: 'black' }}>View history jobs</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                    <View style={{ marginTop: 5, borderBottomWidth: 1, borderBottomColor: '#DDDDDD' }}>
                        <View style={{ flexDirection: 'column', margin: 10 }}>
                            <View style={{ marginLeft: 10 }}>
                                <Text style={{ fontSize: 15, fontWeight: 'bold' }}>Jobs Page</Text>
                            </View>
                            <View style={{ marginTop: 20 }}>
                                {this.state.data.map((item) => {
                                    return (
                                        <View key={item._id} style={{
                                            flexDirection: 'column'
                                            , backgroundColor: '#ffff', shadowOffset: { width: 0, height: 0 },
                                            shadowColor: 'green',
                                            shadowOpacity: 0.1,
                                            elevation: 4,
                                            borderWidth: 1,
                                            borderColor: '#71B7B7', padding: 5,
                                            height: 300, borderRadius: 10, justifyContent: 'center', alignItems: 'center', marginBottom: 10
                                        }}>

                                        </View>
                                    )
                                })}
                            </View>
                        </View>
                    </View>
                </ScrollView>
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
        height: height * 0.08,
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.2,
        padding: 10,
        shadowOpacity: 0.2,
        elevation: 1,
        marginTop: Platform.OS == 'android' ? 25 : null,
    },
    input: {
        width:230,
        height: 55,
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
    image_container: {
        flex: 1,
        paddingVertical: 10,
        paddingHorizontal: 30,
        flexDirection: 'row',
        borderRadius: 10,
        height: 130,
        width: 330,
        backgroundColor: '#faf9f9',
        alignItems: 'center',
        marginBottom: 10

    },
    header: {
        height: height * 0.40,
        margin: 5,
        borderBottomWidth: 1, borderColor: '#DDDDDD'
    },
    two: {
        flexDirection: 'row',
        marginLeft: 10,
        width: width - 50
    },
    viewtext: {
        marginLeft: 10, flexDirection: 'row',
        width: width - 80
    },
    text: {
        color: '#444444'
    },
})