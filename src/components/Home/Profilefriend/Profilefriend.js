import React, { Component } from 'react';
import {
    View, Text, StyleSheet, TouchableOpacity,
    Modal, ScrollView, Dimensions, Image, TextInput,
    ActivityIndicator, Keyboard, TouchableWithoutFeedback
} from 'react-native';
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
import nha from '../../../images/avatar11.png';
import bia from '../../../images/bai1.png';
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
            datawall: [],
            isFollowing: false,
            checkloading: false,
        }

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
                    votes: list.votes.vote_count
                })
               
            } else {
                console.log(data.errors)
            }
        })
        this.socket.on("sv-follow-user", function (data) {
            if (data.success == true) {
                console.log(data)
            } else {
                console.log(data)
            }
        })
        this.socket.on("sv-unfollow-user", function (data) {
            if (data.success == true) {
                console.log(data)
            } else {
                console.log(data)
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
        this.onGetwall = this.onGetwall.bind(this);
        this.socket.on("sv-get-wall-task", function (data) {
            if (data.success == true) {
                e.setState({
                    datawall: data.data
                })
               
            } else {
                console.log(JSON.stringify(data));
            }
        })
        this.socket.on("sv-check-followed", function (data) {
            var list = data.data;
            if (data.success == true) {
                e.setState({
                    isFollowing: data.isFollowing,
                    checkloading: true
                })

            } else {
                console.log(data)
            }
        })

    }
    componentDidMount = async () => {
        await this.onCheckFollower()
        this.onDetail()
        this.onGetwall()
    }
    onCheckFollower = async () => {
        const token = await AsyncStorage.getItem('token');
        const check = {
            secret_key: token,
            user_id: this.props.route.params._id
        }
        this.socket.emit("cl-check-followed", check)
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
            number_task: 10,
            skip: 0
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
    onFollow = async (_id) => {
        e.setState({
            isFollowing: true
        })
        const token = await AsyncStorage.getItem('token')
        const follow = {
            secret_key: token,
            user_id: _id
        }
        this.socket.emit("cl-follow-user", follow);

        console.log(follow)

    }
    onUnFollow = async (_id) => {
        e.setState({
            isFollowing: false
        })
        const token = await AsyncStorage.getItem('token')
        const follow = {
            secret_key: token,
            user_id: _id
        }
        this.socket.emit("cl-unfollow-user", follow);

        console.log(follow)
    }
    onVote = async (_id) => {
        const token = await AsyncStorage.getItem('token')
        const vote = {
            secret_key: token,
            user_id: _id,
            vote_point: this.state.vote,
            vote_comment: this.state.comment
        }
        this.socket.emit("cl-send-vote", vote)
        if (this.state.comment == "") {
            e.setState({
                notice: "Please enter your comment!"
            })
        } else if (this.state.vote == "") {
            e.setState({
                notice: "Please choose a rating!"
            })
        }
        this.onDetail()
    }
    render() {
        const { first_name, last_name, _id } = this.props.route.params;
        var number = this.state.votes
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
                    <TouchableWithoutFeedback onPress={Keyboard.dismiss} style={{ backgroundColor: '#000000aa', flex: 1, justifyContent: 'center', alignItems: 'center' }} >
                        <View style={{ backgroundColor: '#000000aa', flex: 1, justifyContent: 'center', alignItems: 'center' }}>


                            <View style={{
                                backgroundColor: '#faf9f9', borderRadius: 20,
                                height: 220, width: "70%", justifyContent: 'center', alignItems: 'center'
                            }}>

                                <Text style={{ fontWeight: 'bold', fontSize: 23 }}>{this.state.votes} đánh giá</Text>
                                <View style={{ flexDirection: 'row' }}>
                                    <TouchableOpacity onPress={() => this.setState({ vote: 1 })}>
                                        <AntDesign name={this.state.vote >= 1 ? "star" : "staro"} size={24} color={this.state.vote >= 1 ? "#FFD700" : "black"} />
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => this.setState({ vote: 2 })}>
                                        <AntDesign name={this.state.vote >= 2 ? "star" : "staro"} size={24} color={this.state.vote >= 2 ? "#FFD700" : "black"} />
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => this.setState({ vote: 3 })}>
                                        <AntDesign name={this.state.vote >= 3 ? "star" : "staro"} size={24} color={this.state.vote >= 3 ? "#FFD700" : "black"} />
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => this.setState({ vote: 4 })}>
                                        <AntDesign name={this.state.vote >= 4 ? "star" : "staro"} size={24} color={this.state.vote >= 4 ? "#FFD700" : "black"} />
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => this.setState({ vote: 5 })}>
                                        <AntDesign name={this.state.vote == 5 ? "star" : "staro"} size={24} color={this.state.vote == 5 ? "#FFD700" : "black"} />
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
                                <View>
                                    <Text style={{ color: 'red' }}>{this.state.notice}</Text>
                                </View>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: "70%" }}>
                                    <TouchableOpacity onPress={() => this.setState({ showvote: false, vote: 0 })} style={{
                                        width: "50%", backgroundColor: '#ffff',
                                        borderWidth: 1, borderColor: '#488B8F',
                                        height: 30, borderRadius: 10, marginTop: 15, justifyContent: 'center', alignItems: 'center', marginRight: 5
                                    }}>
                                        <Text style={{ color: '#488B8F', fontSize: 15, fontWeight: 'bold' }}>Cancel</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => this.onVote(_id)} style={{
                                        width: "50%", backgroundColor: '#488B8F',
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
                {this.state.checkloading === false ?
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <ActivityIndicator size='large'></ActivityIndicator>
                    </View>
                    :
                    <ScrollView>
                        <View style={styles.header}>
                            <View style={{ flexDirection: 'column' }}>
                                <View style={{
                                    height: height * 0.2, borderTopLeftRadius: 15,
                                    borderTopRightRadius: 15, backgroundColor: "#71B7B7", borderWidth: 1, borderColor: '#2d7474'

                                }}>
                                    <Image source={bia} style={{
                                        height: height * 0.2, borderTopLeftRadius: 15,
                                        borderTopRightRadius: 15, width: "100%"
                                    }}></Image>
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
                                    <TouchableOpacity onPress={() => this.state.isFollowing == false ? this.onFollow(_id) : this.onUnFollow(_id)} style={{
                                        backgroundColor: this.state.isFollowing == false ? '#2d7474' : '#ffff',
                                        justifyContent: 'center', alignItems: 'center',
                                        width: "70%", height: 35, borderRadius: 5, flexDirection: "row", borderWidth: 1, borderColor: "#ccc"
                                    }}>
                                        {this.state.isFollowing == false ?
                                            <SimpleLineIcons name="user-follow" size={22} color="#ffff" />
                                            :
                                            <AntDesign name="checkcircleo" size={20} color="black" />
                                        }

                                        <Text style={{ fontSize: 16, fontWeight: 'bold', color: this.state.isFollowing == false ? '#ffff' : "black", marginLeft: 5 }}>{this.state.isFollowing == false ? "Follow" : "Followed"}</Text>
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
                                    this.state.education.length==0?
                                    <View style={styles.two}>
                                                <View>
                                                    <MaterialIcons name="work" size={24} color="#555555" />
                                                </View>
                                                <View style={styles.viewtext}>
                                                    <Text style={styles.text}>Working information:</Text>
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
                                    this.state.working_information.length==0?
                                    <View style={styles.two}>
                                                <View>
                                                    <MaterialIcons name="work" size={24} color="#555555" />
                                                </View>
                                                <View style={styles.viewtext}>
                                                    <Text style={styles.text}>Working information:</Text>
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
                                        <Text style={styles.text}>Follower: {this.state.follower_number==null?null:this.state.follower_number}</Text>
                                    </View>
                                </View>
                                <View style={styles.two}>
                                    <View>
                                        <MaterialCommunityIcons name="vote" size={24} color="#555555" />
                                    </View>
                                    <View style={styles.viewtext}>
                                        <Text style={styles.text}>
                                            Average votes: {!number?null:number}</Text>
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
                                    {this.state.datawall.length!=1?this.state.datawall.map((item) => {

                                        var task_title = item.task_title;
                                        if (task_title.length >= 20) {
                                            task_title = task_title.slice(0, 20) + "...";
                                        }

                                        return (
                                            <View style={{ flex: 1, backgroundColor: '#FAF9F9', justifyContent: 'center', alignItems: 'center' }}>
                                                <View >
                                                    <View key={item._id} style={{
                                                        backgroundColor: '#ffff',
                                                        marginHorizontal: 10,
                                                        marginVertical: 10,
                                                        borderRadius: 8,
                                                        paddingVertical: 20,
                                                        paddingHorizontal: 15,
                                                        marginBottom: 16,
                                                        height: 250,
                                                        width: width - 40,
                                                        shadowColor: 'green',
                                                        shadowOpacity: 0.1,
                                                        elevation: 4,
                                                        borderWidth: 1,
                                                        borderColor: '#71B7B7',
                                                        flexDirection: 'row',
                                                    }}>
                                                        <View style={{ flexDirection: 'column', flex: 1, marginLeft: 10, fontWeight: 'bold', padding: 10, width: width - 70 }}>
                                                            <View style={{ width: width - 100, flexDirection: 'column' }}>
                                                                <TouchableOpacity onPress={() => this.props.navigation.navigate("Detail", { _task_id: item._id })} style={{ flexDirection: 'row' }}>
                                                                    <Text style={{ fontWeight: 'bold', fontSize: 22, color: '#71B7B7' }}>{task_title}</Text>
                                                                </TouchableOpacity>
                                                                <View style={{ marginTop: 10, flexDirection: 'row' }}>
                                                                    <Text style={{ color: '#696969' }}>Address: {item.location.formatted_address}</Text>
                                                                    <Text style={{ color: '#696969' }}></Text>
                                                                </View>
                                                                <View style={{ marginTop: 10, flexDirection: 'row' }}>
                                                                    <Text style={{ color: '#696969' }}>Full name:{item.task_owner_first_name} {item.task_owner_last_name}</Text>
                                                                    <Text></Text>
                                                                </View>
                                                                <View style={{ marginTop: 10 }}>
                                                                </View>
                                                                <View style={{ marginTop: 10, flexDirection: 'column' }}>
                                                                    <Text style={{ fontWeight: 'bold' }}>TASK DESCRIPTION:</Text>
                                                                    <View style={{ marginTop: 10, flexDirection: 'row' }}>
                                                                        <Text style={{ marginLeft: 20 }}></Text>
                                                                        <Text>...</Text>
                                                                        <TouchableOpacity onPress={() => this.props.navigation.navigate("Detail", { _task_id: item._id })}>
                                                                            <Text style={{ color: "#696969" }}> see detail</Text>
                                                                        </TouchableOpacity>
                                                                    </View>
                                                                </View>
                                                            </View>
                                                        </View>
                                                    </View>
                                                </View>
                                            </View>

                                        )
                                    }):null}
                                </View>
                            </View>
                        </View>
                    </ScrollView>
                }

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
        paddingLeft: 10,
        paddingTop: 15,
        shadowOpacity: 0.2,
        elevation: 1,

    },
    input: {
        width: 230,
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