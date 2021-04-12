import React, { Component } from 'react'
import {
    View, Text, StyleSheet, TouchableOpacity,
    FlatList, Image, ScrollView, Dimensions,
    SafeAreaView, Alert,ActivityIndicator,StatusBar
} from 'react-native'
import Swiper from 'react-native-swiper';
import jwt_decode from 'jwt-decode'
import io from 'socket.io-client/dist/socket.io'
import girl from '../../images/home4.png';
import job from '../../images/home5.png';
import header from '../../images/home3.png';
import avatar1 from '../../images/avatar11.png';
import { AntDesign } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Search from './Search';
import FlatListdata from './Listdata/FlatListdata'
import AsyncStorage from '@react-native-community/async-storage';
import {socket} from "../../Socket.io/socket.io";
import ShimmerPlaceholder from 'react-native-shimmer-placeholder';
import { MaterialIcons } from '@expo/vector-icons';
import {connect} from 'react-redux';
import * as actions from '../../actions';
var e;
const { height, width } = Dimensions.get('window');
class Home extends Component {
    constructor(props) {
        super(props);
        e = this;
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
            number_task:10,
            skip: 10,
            datasource: [],
            datasourcenew: [],
            test:'abc',
            datarecommend:[],
            test:false,
            isLoadingrecomend: false,
            location:''
        }
        this.onProfile = this.onProfile.bind(this);
        this.onStack = this.onStack.bind(this);
        this.onDetail = this.onDetail.bind(this);
        this.onMessage = this.onMessage.bind(this);
        this.onHistory = this.onHistory.bind(this);
        /*this.socket.on('sv-get-news-feed', function (data) {
            /*if(data.success==true){
                var list = data.data;
               
                var dulieu= e.state.datasourcenew;
                dulieu = dulieu.concat(list)
                e.setState({datasourcenew:dulieu,isLoading:true,test:false});        
                //var listdatanewfeed=e.state.datasourcenew.push(JSON.stringify(list)) 
                   
            }   
        })*/
        socket.on('sv-get-news-feed', (data)=>{
            this.props.onStatus();
            this.props.getNewfeed(data.data);
        }) 
        socket.on('sv-get-recommend-task', function (data) {
           e.setState({
                datarecommend:data.data,
                isLoadingrecomend:true
            })                        
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
            skip: 0
        }
        socket.emit("cl-get-news-feed", getnewtask)
        const listrecommend ={
            secret_key: this.state.secret_key,
        }
        socket.emit('cl-get-recommend-task',listrecommend)
      
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
                            <Text style={{ fontStyle: 'italic',color:'black' }}>The suitable of for you today !!!</Text>
                        </View>
                        <View style={styles.text}>
                            <Text style={{ fontWeight: 'bold', fontSize: 20}}>Hi </Text>
                            <Text style={{ fontSize: 20 ,color:'black'}}>{this.state.first_name} !</Text>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <View style={styles.texttitle} >
                            <Text style={{ fontWeight: 'bold', fontSize: 18, color: '#71B7B7', fontStyle: 'italic' }}>Recommend Work</Text>
                        </View>
                    </View>
                    <View style={styles.recommend}>
                        {this.state.isLoadingrecomend==false?
                         <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                         <ActivityIndicator size='large'></ActivityIndicator>
                       </View>
                        :
                        <ScrollView horizontal={true}>
                            <View style={{ flexDirection: 'row',alignItems: 'center',justifyContent: 'center' }}>
                                {this.state.datarecommend.map((task, index) => 
                                
                                <Task key={index} image={task.task_owner_avatar}
                                  first_name={task.task_owner_first_name} last_name={task.task_owner_last_name} title={task.task_title}
                                   location={task.location.formatted_address} onStack={this.onDetail} _id={task._id}
                                />)}
                                <TouchableOpacity onPress={()=>this.props.navigation.navigate("Listrecommend")} style={{marginLeft:15}} >
                                    <MaterialCommunityIcons name="skip-next-circle" size={50} color='#71B7B7' />
                                </TouchableOpacity>
                            </View>
                        </ScrollView>
                        }
                        
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
        this.setState({
            test:true,
            skip:this.state.skip+10
        })
        const gettask = {
            secret_key: this.state.secret_key,
            number_task: 10,
            skip:this.state.skip
        }
        socket.emit("cl-get-news-feed", gettask)
      
    }
    refreshTop(){
        this.props.onRefresh();
        const gettask = {
            secret_key: this.state.secret_key,
            number_task: this.state.number_task,
            skip:0
        }
        socket.emit("cl-get-news-feed", gettask)
       
    }
    onProfile(first, last, _id) {
        this.props.navigation.navigate("Profilefriend", { first_name: first, last_name: last, _id: _id })
    }
    onDetail(_id,isSaved,isApplied) {
        this.props.navigation.navigate("Detail", { _task_id: _id,isSaved:isSaved,isApplied:isApplied })
    }
    onMessage() {
        this.props.navigation.navigate("MessageHome");
    }
    onHistory(_id) {
        this.props.navigation.navigate("historyfriend", { _id: _id });
    }
    renderFooter(){
        return(
            <View style={{backgroundColor:"#faf9f9",flex:1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size='large'></ActivityIndicator>
            </View>
        )
       
    }
    render() {

        return (
            <View style={styles.container}>
                 <StatusBar />
                <View style={{ marginTop:10}}>
                    <Search stack={this.onStack} message={this.onMessage} />
                </View>
                {this.props.status === false
                    ?
                    <ScrollView>
                        <SafeAreaView >
                            <View>
                                <View style={styles.viewimage}>
                                  
                                    <View style={styles.text1}>
                                        <Text style={{ fontStyle: 'italic',color:'black' }}>The suitable of for you today !!!</Text>
                                    </View>
                                    <View style={styles.text}>
                                        <Text style={{ fontWeight: 'bold', fontSize: 20,color:'black' }}>Hi </Text>
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
                        <FlatList data={this.props.newfeed}
                           ListHeaderComponent={this.renderHeader}
                            renderItem={({ item, index }) => {
                                return (
                                    <View>
                                    <FlatListdata item={item} index={index}
                                        stackDetail={this.onDetail}
                                        stackProfile={this.onProfile}
                                        stackHistory={this.onHistory}
                                    ></FlatListdata>
                                    </View>
                                )
                            }}
                            ListFooterComponent={this.state.test==true?this.renderFooter:null}
                            keyExtractor={(item) => item._id.toString()}
                            ItemSeparatorComponent={this.ItemSeparatorComponent}
                            showsHorizontalScrollIndicator={false}
                            refreshing={this.state.refreshing}
                            onRefresh={() => { this.refreshTop() }}
                            onEndReachedThreshold={1}
                            onEndReached={()=>{this.refresh() }}
                        >
                        </FlatList>
                        
                       
                    </View>
                }
            </View>
        )
    }
}

const Task = ({ onStack,_id,first_name, image,last_name, location,title }) => {
    var fullname = title;
    var count = fullname.length;
    if (count >= 25) {
        fullname = fullname.slice(0,25) + "...";
    }
    
    return (
        <View style={{
            marginTop: 10,
            marginLeft: 16,
            marginBottom: 10,
            borderRadius: 10,
            shadowOffset: { width: 0, height: 0 },
            shadowColor: 'green',
            shadowOpacity: 0.1,
            elevation: 4,
            justifyContent:'center', alignItems: 'center'
        }}
        >
            <View >
                <TouchableOpacity onPress={()=>onStack(_id)}>
                    <Image source={image?{uri:image}:avatar1} style={{ width: 250, height: height * 0.3, borderTopLeftRadius: 10,borderTopRightRadius:10 }}>

                    </Image>
                </TouchableOpacity>
            
                <View style={styles.ImageOverlay}>
                    <TouchableOpacity style={{marginTop:5}} onPress={()=>onStack(_id)}>
                         <Text style={{ fontSize: 16, color: 'black',fontWeight: 'bold'}}>{fullname}</Text>
                    </TouchableOpacity>
                
                    <View style={{ flexDirection: 'row',paddingRight:15}}>
                        <View>
                            <Entypo name="location-pin" size={22} color="red" />
                        </View>
                        <Text style={{ fontSize: 13, color: '#888888'}}>{location}</Text>
                    </View>
                  
                </View>
                <TouchableOpacity onPress={()=>onStack(_id)} style={{ width:"90%",height:30,backgroundColor: '#2d7474',
                position: 'absolute',bottom:7,left:"5%",borderRadius:5, shadowOffset: { width: 0, height: 0 },
                shadowColor: 'green',
                shadowOpacity: 0.1,
                elevation: 4,justifyContent: 'center',alignItems: 'center'}}>
                        <Text style={{fontSize: 18, color: 'white',fontWeight: 'bold'}}>Detail</Text>
                </TouchableOpacity>
            </View>
        </View>
        

    )
}
const mapStateToProps = (state) => {
    return {
        newfeed:state.newfeed,
        status:state.status
    }
}
const mapDispatchProps=(dispatch,props)=>{
    return {
        getNewfeed:(data)=>{
            dispatch(actions.getNewfeed(data));
        },
        onStatus:()=>{
            dispatch(actions.onStatus());
        },
        onRefresh:()=>{
            dispatch(actions.onRefresh());
        }
    }
}
export default connect(mapStateToProps,mapDispatchProps)(Home);
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
        height: 45,
        borderColor: '#71B7B7',
        position:'absolute',
        bottom:0, left:15
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
        width: 250, height: height * 0.45,
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
        marginTop: 0,
        marginLeft: 20


    },
    text1: {
        position: 'absolute',
        marginTop: 25,
        marginLeft: 20
    },
    item: {
        marginTop: 10,
        flexDirection: 'row',
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 10,
    },
    recommend: {
        height: height * 0.51,
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
        width: 250, height: height*0.16, borderBottomEndRadius: 10,borderBottomLeftRadius:10,
        backgroundColor: '#ffff',paddingLeft:10,paddingRight:10
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
