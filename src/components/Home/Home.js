import React, { Component } from 'react'
import {
    View, Text, StyleSheet, TouchableOpacity,
    FlatList, Image, ScrollView, Dimensions,
    SafeAreaView, Alert,
} from 'react-native'
import Swiper from 'react-native-swiper';
import jwt_decode from 'jwt-decode'
import io from 'socket.io-client/dist/socket.io'
import girl from '../../images/abc.png';
import job from '../../images/job.png';
import header from '../../images/header.png';
import { AntDesign } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Search from './Search';
import FlatListdata from './Listdata/FlatListdata'
import AsyncStorage from '@react-native-community/async-storage';
import ShimmerPlaceholder from 'react-native-shimmer-placeholder';
import { MaterialIcons } from '@expo/vector-icons';
var e;
const { height, width } = Dimensions.get('window');
class Home extends Component {
    constructor(props) {
        super(props);
        e = this;
        this.socket = io('https://taskeepererver.herokuapp.com', { jsonp: false })
        this.state = {
            first_name: '',
            last_name: '',
            email: '',
            avatar: '',
            username: '',
            phone: '',
            introduction: '',
            floor_price: '',
            ceiling_price: '',
            isLoading: false,
            secret_key: '',
            refreshing: false,
            show: false,
            data: [{
                key: '1',
                name: 'Business Analyst',
                image: require('../../images/dac.png'),
                location: 'Da Nang'
            },
            {
                key: '2',
                name: 'Business Analyst',
                image: require('../../images/fptshop.jpg'),
                location: 'Da Nang'
            },
            {
                key: '3',
                name: 'Business Analyst',
                image: require('../../images/logigear.jpg'),
                location: 'Da Nang'
            }, {
                key: '4',
                name: 'Business Analyst',
                image: require('../../images/taseco.jpg'),
                location: 'Da Nang'
            },
            {
                key: '5',
                name: 'Business Analyst',
                image: require('../../images/taseco.jpg'),
                location: 'Da Nang'
            },
            {
                key: '6',
                name: 'Business Analyst',
                image: require('../../images/taseco.jpg'),
                location: 'Da Nang'
            },
            {
                key: '7',
                name: 'Business Analyst',
                image: require('../../images/taseco.jpg'),
                location: 'Da Nang'
            },

            ],
            number_task: 10,
            skip: 0,
            datasource: [],
            datasourcenew: [],
            test:'abc'
        }
        this.onProfile = this.onProfile.bind(this);
        this.onStack = this.onStack.bind(this);
        this.onDetail = this.onDetail.bind(this);
        this.onMessage = this.onMessage.bind(this);
        this.onHistory = this.onHistory.bind(this);
        /* this.apply=this.applyJob.bind(this)*/
        this.socket.on("sv-apply-job", function (data) {
            if (data.success == false) {
                if (data.errors.introduction) {
                    Alert.alert(
                        'Notice',
                        'Introduction blank', [
                        { text: 'Ok' }
                    ], { cancelable: true }
                    )
                } else {
                    Alert.alert(
                        'Notice',
                        'Đa Apply', [
                        { text: 'Ok' }
                    ], { cancelable: true }
                    )
                }
                console.log(JSON.stringify(data))
            } else if (data.success == true) {
                Alert.alert(
                    'Notice',
                    'Apply Success', [
                    { text: 'Ok' }
                ], { cancelable: true }
                )
            }
        })
        /*this.follow=this.followTask.bind(this)
        this.socket.on("sv-follow-user",function(data){
            if(data.success==false){
                console.log(JSON.stringify(data))
                alert('Đã follow ')
            }else if(data.success==true){
                alert('follow success')
            }
        })*/

        this.socket.on("sv-save-task", function (data) {
            if (data.success == false) {
                console.log(JSON.stringify(data))
                if (data.errors.message) {
                    Alert.alert(
                        'Notice',
                        'Đa save', [
                        { text: 'Ok' }
                    ], { cancelable: true }
                    )
                }
            } else if (data.success == true) {
                console.log("lua thanh cong")
                Alert.alert(
                    'Notice',
                    'Save Success', [
                    { text: 'Ok' }
                ], { cancelable: true }
                )
            }
        })
        this.socket.on('sv-get-news-feed', function (data) {
            var list = data.data
            if (data.success == true) {
                e.setState({
                    datasourcenew: list,
                    isLoading: true
                })
               
            }
        })
    }

    componentDidMount = async () => {
        const token = await AsyncStorage.getItem("token")
        const decode = jwt_decode(token)
        this.setState({
            first_name: decode.first_name,
            email: decode.email,
            secret_key: token,

        })
        const getnewtask = {
            secret_key: this.state.secret_key,
            number_task: this.state.number_task,
            skip: this.state.skip
        }
        this.socket.emit("cl-get-news-feed", getnewtask)
    }
    applyJob = async (task_id, floor_price, ceiling_price) => {
        this.setState({
            show: false
        })
        const apply = {
            secret_key: this.state.secret_key,
            task_id: task_id,
            introduction: this.state.introduction,
            floor_price: floor_price,
            ceiling_price: ceiling_price
        }
        this.socket.emit("cl-apply-job", apply)

    }
    /*followTask=async()=>{
        const follow={
            secret_key:this.state.secret_key,
            task_id:this.state._id,
            introduction:'Tôi muốn theo dõi bạn',
            floor_price:this.state.floor_price,
            ceiling_price:this.state.ceiling_price
        }
        this.socket.emit("cl-follow-user",follow)
    }  */ 
    renderHeader = () => {

        return (
            <SafeAreaView style={styles.container}>
                <View>
                    <View style={styles.viewimage}>
                        <Swiper>
                            <Image style={styles.image} source={job} />
                            <Image style={styles.image} source={girl} />
                            <Image style={styles.image} source={header} />
                        </Swiper>
                        <View style={styles.text1}>
                            <Text style={{ fontStyle: 'italic' }}>The suitable of for you today !!!</Text>
                        </View>
                        <View style={styles.text}>
                            <Text style={{ fontWeight: 'bold', fontSize: 20 }}>Hi </Text>
                            <Text style={{ fontSize: 20 }}>{this.state.first_name} !</Text>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <View style={styles.texttitle} >
                            <Text style={{ fontWeight: 'bold', fontSize: 18, color: '#71B7B7', fontStyle: 'italic' }}>Recommend Work</Text>
                        </View>
                    </View>
                    <View style={styles.recommend}>
                        <ScrollView horizontal={true}>
                            <View style={{ flexDirection: 'row' }}>
                                {this.state.data.map((task, index) => <Task key={index} name={task.name}
                                    image={task.image}
                                    location={task.location}
                                />)}
                                <TouchableOpacity style={{ marginTop: 100, marginRight: 30, marginLeft: 10 }} >
                                    <MaterialCommunityIcons name="skip-next-circle" size={50} color='#71B7B7' />
                                </TouchableOpacity>
                            </View>
                        </ScrollView>
                    </View>
                    <View style={{ marginLeft: 10, marginTop: 10, width: 130, marginBottom: 10, borderBottomWidth: 2, borderBottomColor: '#71B7B7' }}>
        <Text style={{ fontWeight: 'bold', fontSize: 18, color: '#71B7B7', fontStyle: 'italic' }}>Bulletin Board</Text>
                    </View>
                </View>
            </SafeAreaView>
        )
    }
    onStack(search_string) {
        this.props.navigation.navigate("HomeSearch", { key: search_string })
    }
    refresh() {
        const gettask = {
            number_task: this.state.number_task,
            skip: this.state.skip
        }
        this.socket.emit("cl-get-news-feed", gettask)
    }
    onProfile(first, last, _id) {
        this.props.navigation.navigate("Profilefriend", { first_name: first, last_name: last, _id: _id })
    }
    onDetail(_id, user_id) {
        this.props.navigation.navigate("Detail", { _task_id: _id })
    }
    onMessage() {
        this.props.navigation.navigate("MessageHome");
    }
    onHistory(_id) {
        this.props.navigation.navigate("historyfriend", { _id: _id });
    }
    render() {

        return (
            <View style={styles.container}>
                <View style={{ marginTop: 40 }}>
                    <Search stack={this.onStack} message={this.onMessage} />
                </View>

                {this.state.isLoading === false
                    ?
                    <ScrollView>
                        <SafeAreaView >
                            <View>
                                <View style={styles.viewimage}>

                                    <View style={styles.text1}>
                                        <Text style={{ fontStyle: 'italic' }}>The suitable of for you today !!!</Text>
                                    </View>
                                    <View style={styles.text}>
                                        <Text style={{ fontWeight: 'bold', fontSize: 20 }}>Hi </Text>
                                    </View>
                                </View>
                                <View style={{ flexDirection: 'row' }}>
                                    <View style={styles.texttitle}>
                                        <Text style={{ fontWeight: 'bold', fontSize: 18, color: '#71B7B7', fontStyle: 'italic' }}>Recommend Work</Text>
                                    </View>
                                </View>
                                <View style={styles.recommend}>
                                    <ScrollView horizontal={true}>
                                        <View style={{ flexDirection: 'row' }}>
                                            <View style={styles.loading}>
                                            </View>
                                            <View style={styles.loading}>
                                            </View>
                                            <View style={styles.loading}>
                                            </View>
                                            <View style={styles.loading}>
                                            </View>
                                            <View style={styles.loading}>
                                            </View>
                                        </View>
                                    </ScrollView>
                                </View>
                                <View style={{ marginLeft: 10, marginTop: 10, width: 130, marginBottom: 10, borderBottomWidth: 2, borderBottomColor: '#71B7B7' }}>
                                    <Text style={{ fontWeight: 'bold', fontSize: 18, color: '#71B7B7', fontStyle: 'italic' }}>Bulletin Board</Text>
                                </View>
                            </View>
                            <View style={styles.container}>
                                <View style={styles.body} >
                                    <View style={styles.bodyone}>
                                        <TouchableOpacity style={styles.imageview} >
                                            <ShimmerPlaceholder style={{ height: 60, width: 60, marginTop: -10, borderRadius: 50 }} autoRun visible={this.state.isLoading}>
                                                <Image source={null} style={{
                                                    width: 60, marginTop: -10
                                                    , height: 60, borderRadius: 50,
                                                }}></Image>
                                            </ShimmerPlaceholder>
                                        </TouchableOpacity>
                                        <View style={{ flexDirection: 'column', marginLeft: 15 }}>
                                            <TouchableOpacity >
                                                <ShimmerPlaceholder style={{ height: 15, width: 190, }} autoRun visible={this.state.isLoading}>
                                                    <Text style={{ fontSize: 18 }}></Text>
                                                </ShimmerPlaceholder>
                                            </TouchableOpacity>
                                            <View style={{ flexDirection: 'row', marginTop: 10 }}>
                                                <View style={{ marginRight: 10 }}>
                                                    <ShimmerPlaceholder style={{ height: 15, width: 100, }} autoRun visible={this.state.isLoading}>
                                                        <Text style={{ fontSize: 18 }}></Text>
                                                    </ShimmerPlaceholder>
                                                </View>

                                            </View>
                                        </View>
                                    </View>
                                    <View style={styles.bodytwo}>
                                        <TouchableOpacity style={{ height: 60, }} >
                                            <ShimmerPlaceholder style={{ height: 30, width: 250, }} autoRun visible={this.state.isLoading}>
                                                <Text style={{ fontWeight: 'bold', fontSize: 23, fontStyle: 'italic', color: '#2d7474' }}>

                                                </Text>
                                            </ShimmerPlaceholder>

                                        </TouchableOpacity>
                                        <View style={{ height: 70 }}>
                                            <Text style={{ fontSize: 16 }}>

                                            </Text>
                                            <View style={{ flexDirection: 'row' }}>
                                                <Text>
                                                    ...
                                </Text>
                                                <TouchableOpacity>
                                                    <Text style={{ color: "#888888" }}> see detail</Text>
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                        <View >
                                            <Text style={{ fontSize: 16 }}>

                                            </Text>
                                        </View>
                                    </View>
                                    <View style={styles.bodynext} >
                                        <View style={{ flexDirection: 'row' }}>
                                            <View>
                                                <MaterialIcons name="attach-money" size={24} color="black" />
                                            </View>
                                            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                                <Text></Text>
                                            </View>
                                        </View>
                                        <View style={{ flexDirection: 'row', marginLeft: 5 }}>
                                            <View>
                                                <Ionicons name="md-time" size={24} color="black" />
                                            </View>
                                            <View style={{ marginLeft: 5, justifyContent: 'center', alignItems: 'center' }}>
                                                <Text>Full time</Text>
                                            </View>
                                        </View>
                                        <View style={{ flexDirection: 'row', marginLeft: 5 }}>
                                            <View>
                                                <Entypo name="location-pin" size={24} color="black" />
                                            </View>
                                            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                                <Text>Quảng Nam </Text>
                                            </View>
                                        </View>
                                    </View>
                                    <View style={styles.bodythree}>
                                        <TouchableOpacity style={styles.iconBulliten1} >
                                            <View>
                                                <AntDesign name="pluscircle" size={24} color="#71B7B7" />
                                            </View>
                                            <View style={{ marginLeft: 5 }}>
                                                <Text>Apply</Text>
                                            </View>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={styles.iconBulliten2} >
                                            <View>
                                                <Entypo name="save" size={24} color="#71B7B7" />
                                            </View>
                                            <View style={{ marginLeft: 5 }}>
                                                <Text>Save</Text>
                                            </View>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                                <View style={styles.body} >
                                    <View style={styles.bodyone}>
                                        <TouchableOpacity style={styles.imageview} >
                                            <ShimmerPlaceholder style={{ height: 60, width: 60, marginTop: -10, borderRadius: 50 }} autoRun visible={this.state.isLoading}>
                                                <Image source={null} style={{
                                                    width: 60, marginTop: -10
                                                    , height: 60, borderRadius: 50,
                                                }}></Image>
                                            </ShimmerPlaceholder>
                                        </TouchableOpacity>
                                        <View style={{ flexDirection: 'column', marginLeft: 15 }}>
                                            <TouchableOpacity >
                                                <ShimmerPlaceholder style={{ height: 15, width: 190, }} autoRun visible={this.state.isLoading}>
                                                    <Text style={{ fontSize: 18 }}></Text>
                                                </ShimmerPlaceholder>
                                            </TouchableOpacity>
                                            <View style={{ flexDirection: 'row', marginTop: 10 }}>
                                                <View style={{ marginRight: 10 }}>
                                                    <ShimmerPlaceholder style={{ height: 15, width: 100, }} autoRun visible={this.state.isLoading}>
                                                        <Text style={{ fontSize: 18 }}></Text>
                                                    </ShimmerPlaceholder>
                                                </View>

                                            </View>
                                        </View>
                                    </View>
                                    <View style={styles.bodytwo}>
                                        <TouchableOpacity style={{ height: 60, }} >
                                            <ShimmerPlaceholder style={{ height: 30, width: 250, }} autoRun visible={this.state.isLoading}>
                                                <Text style={{ fontWeight: 'bold', fontSize: 23, fontStyle: 'italic', color: '#2d7474' }}>

                                                </Text>
                                            </ShimmerPlaceholder>

                                        </TouchableOpacity>
                                        <View style={{ height: 70 }}>
                                            <Text style={{ fontSize: 16 }}>

                                            </Text>
                                            <View style={{ flexDirection: 'row' }}>
                                                <Text>
                                                    ...
                                </Text>
                                                <TouchableOpacity>
                                                    <Text style={{ color: "#888888" }}> see detail</Text>
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                        <View >
                                            <Text style={{ fontSize: 16 }}>

                                            </Text>
                                        </View>
                                    </View>
                                    <View style={styles.bodynext} >
                                        <View style={{ flexDirection: 'row' }}>
                                            <View>
                                                <MaterialIcons name="attach-money" size={24} color="black" />
                                            </View>
                                            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                                <Text></Text>
                                            </View>
                                        </View>
                                        <View style={{ flexDirection: 'row', marginLeft: 5 }}>
                                            <View>
                                                <Ionicons name="md-time" size={24} color="black" />
                                            </View>
                                            <View style={{ marginLeft: 5, justifyContent: 'center', alignItems: 'center' }}>
                                                <Text>Full time</Text>
                                            </View>
                                        </View>
                                        <View style={{ flexDirection: 'row', marginLeft: 5 }}>
                                            <View>
                                                <Entypo name="location-pin" size={24} color="black" />
                                            </View>
                                            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                                <Text>Quảng Nam </Text>
                                            </View>
                                        </View>
                                    </View>
                                    <View style={styles.bodythree}>
                                        <TouchableOpacity style={styles.iconBulliten1} >
                                            <View>
                                                <AntDesign name="pluscircle" size={24} color="#71B7B7" />
                                            </View>
                                            <View style={{ marginLeft: 5 }}>
                                                <Text>Apply</Text>
                                            </View>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={styles.iconBulliten2} >
                                            <View>
                                                <Entypo name="save" size={24} color="#71B7B7" />
                                            </View>
                                            <View style={{ marginLeft: 5 }}>
                                                <Text>Save</Text>
                                            </View>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        </SafeAreaView>
                    </ScrollView>
                    /* <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                         <ActivityIndicator size='large'  animating />
                     </View>*/
                    :
                    <View style={styles.container}>
                        <FlatList data={this.state.datasourcenew}
                            ListHeaderComponent={this.renderHeader}
                            renderItem={({ item, index }) => {
                                return (
                                    <FlatListdata item={item} index={index}
                                        stackDetail={this.onDetail}
                                        stackProfile={this.onProfile}
                                        stackHistory={this.onHistory}
                                    ></FlatListdata>
                                )
                            }}
                            keyExtractor={(item) => item._id.toString()}
                            ItemSeparatorComponent={this.ItemSeparatorComponent}
                            showsHorizontalScrollIndicator={false}
                            refreshing={this.state.refreshing}
                            onRefresh={() => { this.refresh() }}
                            onEndReachedThreshold={1}
                            onEndReached={()=>{this.setState({
                                test:'minh nha'
                            })}}
                        >
                        </FlatList>
                    </View>
                }
            </View>
        )
    }
}
const Bulletin = ({ name, image, location }) => {
    return (
        <View style={{
            backgroundColor: '#71B7B7',
            marginHorizontal: 10,
            marginVertical: 10,
            borderRadius: 8,
            paddingVertical: 40,
            paddingHorizontal: 15,
            marginTop: 30,
            marginBottom: 20,
            height: 250,
            shadowOffset: { width: 0, height: 0 },
            shadowColor: 'green',
            shadowOpacity: 0.1,
            elevation: 4,
        }}>
            <View style={{ marginTop: -60 }}>
                <Image source={image} style={{
                    width: 80, marginTop: -10
                    , height: 80, borderRadius: 50,
                }}></Image>
            </View>
            <View style={{ flexDirection: 'column', flex: 1, marginLeft: 10, fontWeight: 'bold' }}>

                <Text style={{ fontWeight: 'bold', fontSize: 25, fontStyle: 'italic' }}>{name}</Text>
                <Text >{location}</Text>

            </View>

            <View style={{ flexDirection: 'row', marginLeft: -11 }}>
                <TouchableOpacity style={styles.iconBulliten} onPress={() => alert('Follow')}>
                    <AntDesign style={{ marginRight: 5 }} name="pluscircle" size={30} color="#71B7B7" />
                    <Text>Follow</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.iconBulliten} onPress={() => alert('Apply')}>
                    <Ionicons style={{ marginRight: 5 }} name="md-checkmark-circle" size={30} color="#71B7B7" />
                    <Text>Apply</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.iconBulliten} onPress={() => alert('save')}>
                    <Entypo style={{ marginRight: 5 }} name="save" size={30} color="#71B7B7" />

                    <Text>Save</Text>
                </TouchableOpacity>
            </View>
        </View>


    )
}
const Task = ({ name, image, location }) => {
    return (
        <View style={{
            marginTop: 20,
            marginLeft: 16,
            marginBottom: 20,
            borderRadius: 10,
            shadowOffset: { width: 0, height: 0 },
            shadowColor: 'green',
            shadowOpacity: 0.1,
            elevation: 4,
            justifyContent: 'flex-end', alignItems: 'flex-end'
        }}
        >
            <TouchableOpacity>
                <Image source={image} style={{ width: 160, height: height * 0.35, borderRadius: 10 }}>

                </Image>
                <View style={styles.ImageOverlay}></View>
                <View style={{ position: 'absolute', marginLeft: 10, height: "100%", alignItems: 'center', justifyContent: 'flex-end', paddingBottom: 10 }}>
                    <Text style={{ fontSize: 18, color: 'white' }}>{name}</Text>
                    <View style={{ flexDirection: 'row', }}>
                        <View>
                            <Entypo name="location-pin" size={24} color="white" />
                        </View>
                        <Text style={{ fontSize: 18, color: 'white' }}>{location}</Text>
                    </View>

                </View>
            </TouchableOpacity>
        </View>
        /*<TouchableOpacity>
            <View style={{
                backgroundColor: '#ffff',
                flexDirection: 'row',
                marginHorizontal: 10,
                marginVertical: 10,
                borderRadius: 8,
                paddingVertical: 10,
                paddingHorizontal: 15,
                marginTop: 20,
                marginBottom: 20,
                shadowOffset: { width: 0, height: 0 },
                shadowColor: 'green',
                shadowOpacity: 0.1,
                elevation: 4,
                height: 200
            }}>

                <View style={{ flexDirection: 'column', flex: 1, marginLeft: 10, fontWeight: 'bold' }}>
                    <Image source={image} style={{
                        width: 100
                        , height: 100, borderRadius: 10,
                    }}></Image>
                    <Text >{name}</Text>
                    <Text >{location}</Text>
                </View>
            </View>

        </TouchableOpacity>*/

    )
}
export default Home;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#faf9f9',
    },
    imageview: {
        shadowOffset: { width: 0, height: 3 },
        shadowColor: 'green',
        shadowOpacity: 0.5,
        elevation: 10,
        borderColor: '#71B7B7',
        borderRadius: 50,
    },
    body: {
        backgroundColor: '#ffff',
        marginHorizontal: 10,
        marginVertical: 10,
        borderRadius: 8,
        paddingVertical: 40,
        paddingHorizontal: 15,
        marginBottom: 16,
        height: 340,
        shadowOffset: { width: 0, height: 0 },
        shadowColor: 'green',
        shadowOpacity: 0.1,
        elevation: 4,
        borderWidth: 1,
        borderColor: '#71B7B7',
        flexDirection: 'column',
    },
    bodyone: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderColor: "#71B7B7",
        marginTop: -20,
        paddingBottom: 10
    },
    iconBulliten: {
        flexDirection: 'row',
        borderRadius: 10,
        borderWidth: 1,
        height: 50,
        width: 127,
        alignItems: 'center',
        paddingLeft: 5,
        marginBottom: -35,
        marginRight: 1,
        backgroundColor: '#ffff',
        shadowColor: 'green',
        shadowOpacity: 0.1,
        elevation: 4,
        borderColor: '#71B7B7'
    },
    bodytwo: {
        flexDirection: 'column',
        margin: 10
    },
    bodynext: {
        flexDirection: 'row',
        margin: 10,
        justifyContent: 'space-between'
    },
    bodythree: {
        flexDirection: 'row',
        borderTopWidth: 1,
        height: 35,
        borderColor: '#71B7B7',
    },
    iconBulliten2: {
        flexDirection: 'row',
        flex: 1,
        paddingVertical: 5,
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10, marginRight: 3,
        alignItems: 'center',
        justifyContent: 'flex-start',
        backgroundColor: '#ffff',
        shadowColor: 'green',
        shadowOpacity: 0.5,
        elevation: 10,
        borderColor: '#71B7B7'
    },
    iconBulliten1: {
        flexDirection: 'row',
        flex: 1,
        paddingVertical: 5,
        borderBottomRightRadius: 10,
        borderTopRightRadius: 10, marginLeft: 3,
        alignItems: 'center',
        backgroundColor: '#ffff',
        shadowColor: 'green',
        shadowOpacity: 0.1,
        elevation: 4,
        borderColor: '#71B7B7'
    },
    cancle: {
        flex: 1,
        backgroundColor: '#2d7474',
        alignItems: 'center',
        paddingVertical: 5,
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10, marginRight: 3

    },
    apply: {
        flex: 1,
        backgroundColor: '#2d7474',
        alignItems: 'center',
        paddingVertical: 5,
        borderBottomRightRadius: 10,
        borderTopRightRadius: 10, marginLeft: 3
    },
    controlStyle: {
        flexDirection: 'row',
        marginTop: 10,
    },
    loading: {
        backgroundColor: '#EEEEEE',
        borderRadius: 8,
        marginTop: 20,
        marginLeft: 16,
        marginBottom: 20,
        shadowOffset: { width: 0, height: 0 },
        shadowColor: 'green',
        shadowOpacity: 0.1,
        elevation: 4,
        width: 160, height: height * 0.35,
    },
    nof: {
        backgroundColor: '#71B7B7',
        height: 250,
        borderRadius: 10,
        marginHorizontal: 16,
        marginVertical: 15
    },
    image: {
        width: width - 30,
        height: height * 0.4,
    },
    texttitle: {
        marginLeft: 10, marginTop: 20, width: 150, borderBottomWidth: 2, borderBottomColor: '#71B7B7'
    },
    texttitle1: {
        marginLeft: 150, marginTop: 20, width: 90, borderBottomWidth: 2, borderBottomColor: 'red'
    },
    header: {
        height: height * 0.08,
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.2,
        padding: 10,
        shadowOpacity: 0.2,
        elevation: 1,
        marginTop: Platform.OS == 'android' ? 25 : null,


    },
    icon: {
        marginLeft: 10,
        shadowOffset: { width: 0, height: 0 },
        shadowColor: 'green',
        shadowOpacity: 0.1,
        elevation: 1,
    },
    viewimage: {
        width: width - 30,
        height: height * 0.4,
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.2,
        marginHorizontal: 16,
        marginVertical: 10,
        elevation: 3,
        borderTopColor: '#71B7B7',
        backgroundColor: '#EEEEEE'
    },
    searching: {
        backgroundColor: 'white',
        shadowOffset: { width: 0, height: 0 },
        shadowColor: 'green',
        shadowOpacity: 0.1,
        elevation: 4,
        paddingLeft: 15,
        ...Platform.select({
            ios: {
                width: 310,
                height: 35
            },
            android: {
                width: 310,
                height: 35
            },
            default: {
                // other platforms, web for example
            }
        })
    },
    text: {
        position: 'absolute',
        flexDirection: 'row',
        marginTop: 20,
        marginLeft: 20


    },
    text1: {
        position: 'absolute',
        marginTop: 40,
        marginLeft: 10
    },
    item: {
        marginTop: 10,
        flexDirection: 'row',
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 10,
    },
    recommend: {
        height: height * 0.4,
        marginTop: 10,
        marginRight: 10,
        marginLeft: 10,
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.2,
        backgroundColor: '#ffff',
        borderRadius: 15,
        elevation: 2,
        borderColor: '#71B7B7',
        borderWidth: 1,
        justifyContent: 'flex-end', alignItems: 'center'
    },
    ImageOverlay: {
        width: 160, height: 81, borderRadius: 10,
        backgroundColor: '#000000aa',
        opacity: 0.5,
        position: 'absolute',
        bottom: 0
    },
    iconBulliten1: {
        borderRightWidth: 0.5,
        width: '50%',
        justifyContent: 'center', alignItems: 'center',
        borderColor: '#71B7B7',
        flexDirection: 'row'
    },
    iconBulliten2: {
        borderLeftWidth: 0.5,
        width: '50%',
        justifyContent: 'center', alignItems: 'center',
        borderColor: '#71B7B7',
        flexDirection: 'row'
    },
})
