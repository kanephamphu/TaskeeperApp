import React, { Component } from 'react'
import {
    View, Text, StyleSheet, TouchableOpacity,
    Modal, TextInput, Image, ScrollView, Dimensions, ActivityIndicator, FlatList, TouchableWithoutFeedback, Keyboard
} from 'react-native';
import io from 'socket.io-client/dist/socket.io';
import avatarimage from '../../images/avatar11.png';
import { Entypo } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import iconsuccess from '../../images/checked.png';
import iconerror from '../../images/close.png';
import AsyncStorage from '@react-native-community/async-storage';
import avatar1 from '../../images/avatar11.png';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import {socket} from "../../Socket.io/socket.io";
import anhbiadetail from './../../images/anhbiadetail.jpg';
var e;
const { height, width } = Dimensions.get('window');
class Detail extends Component {
    constructor(props) {
        super(props);
        e = this;
        this.state = {
            languages: [],
            task_type: '',
            price_type: "",
            tags: [],
            task_owner_id: '',
            task_description: '',
            task_requirement: '',
            created_time: '',
            task_owner_first_name: '',
            task_owner_last_name: '',
            floor_price: '',
            ceiling_price: '',
            location: '',
            task_title: '',
            avatar: '',
            _id: '',
            industry: '',
            isLoadingrecomend: false,
            skills: '',
            position: '',
            shownotice: false,
            notice: '', key: '',
            secret_key: '',
            introduction: '',
            show: false,
            price: '',
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
            datarecommend: []

        }
        this.apply = this.applyJob.bind(this)
        this.save = this.saveTask.bind(this);
        this.onDetail = this.onDetail.bind(this)
        this.onDetail1 = this.onDetail1.bind(this)
        socket.on("sv-save-task", function (data) {
            if (data.success == false) {
                e.setState({
                    shownotice: true,
                    notice: 'Already Exist!',
                    key: "error",
                })
            } else if (data.success == true) {
                e.setState({
                    shownotice: true,
                    notice: 'Saved Successfully!',
                    key: "success",
                })
            }
        })
        socket.on("sv-apply-job", function (data) {
            if (data.success == false) {
                if (data.errors.introduction) {
                    e.setState({
                      
                      
                    })

                } if(data.errors.price){
                    e.setState({
                       
                    })
                }else {
                    e.setState({
                        shownotice: true,
                        notice: 'Already Exist!',
                        key: "error",
                    })

                }
              
            } else if (data.success == true) {
                e.setState({
                  
                    shownotice: true,
                    notice: 'Applied Successfully!',
                    key: "success",
                })
            }
        })
        socket.on("sv-task-detail", function (data) {
            var list = data.data
            if (data.success == true) {
                e.setState({
                    task_owner_first_name: list.task_owner_first_name,
                    task_owner_last_name: list.task_owner_last_name,
                    languages: list.languages,
                    tags: list.tags,
                    floor_price: list.price.floor_price,
                    ceiling_price: list.price.ceiling_price,
                    task_description: list.task_description,
                    location: list.location.formatted_address,
                    task_title: list.task_title,
                    created_time: list.created_time,
                    task_type: list.task_type,
                    avatar: list.task_owner_avatar,
                    _id: list._id,
                    task_owner_id: list.task_owner_id,
                    task_requirement: list.task_requirement,
                    price_type: list.price.price_type,
                    industry: list.industry,
                    skills: list.skills,
                    position: list.position

                })
            } else {
                
            }
        })
        socket.on('sv-get-recommend-task-based-on-id', function (data) {
            e.setState({
                datarecommend: data.data,
                isLoadingrecomend: true
            })
        })
    }
    onDetail(_id, user_id) {
        this.props.navigation.navigate("Detailtoo", { _task_id: _id })
    }
    onDetail1(_id, user_id) {
        this.props.navigation.navigate("Detail", { _task_id: _id })
    }
    componentDidMount = async () => {
        const token = await AsyncStorage.getItem('token')
        this.setState({
            secret_key: token,
        })
        const detail = {
            secret_key: token,
            _task_id: this.props.route.params._task_id,
        }
        socket.emit("cl-task-detail", detail)
        const listrecommend = {
            secret_key: token,
            task_id: this.props.route.params._task_id
        }
        socket.emit('cl-get-recommend-task-based-on-id', listrecommend)
    }
    applyJob () {
        let a=e.state.price;
        let b=parseInt(a)
        if(e.state.introduction==''){
            e.setState({
                notice: 'Please enter your introduction!',
                key: "intro"
            })
        }else if(e.state.price==''){
            e.setState({
                notice: 'Please enter your price!',
                key: "price"
            })
        }else if(b!==b){
            e.setState({
                notice: 'The price is invalid!',
                key: "price"
            })
        }else{
            e.setState({ show: false })
            const apply = {
                secret_key: e.state.secret_key,
                task_id: e.props.route.params._task_id,
                introduction: e.state.introduction,
                price: e.state.price,
            }
            socket.emit("cl-apply-job", apply)
        }
      

    }
    saveTask = async () => {
        const token = await AsyncStorage.getItem('token')
        const save = {
            secret_key: token,
            task_id: this.props.route.params._task_id
        }
        socket.emit("cl-save-task", save)

    }
    render() {
        var fullname = this.state.task_owner_first_name + " " + this.state.task_owner_last_name;
        var count = fullname.length;
        if (count >= 10) {
            fullname = fullname.slice(0,10) + "...";
        }

        return (
            <View style={styles.container}>
                <View style={styles.header0}>
                    <TouchableOpacity style={{zIndex:2,width:'7%'}}  onPress={() => this.props.navigation.goBack()}>
                        <Ionicons style={{ marginTop: 1 }} name="ios-arrow-back" size={28} color="#2d7474" />
                    </TouchableOpacity>
                    <View style={{flex:1,width:'120%',height:200,position:'absolute',}}>
                                <Image source={anhbiadetail} style={{width:'100%',height:'100%'}}/>
                     </View>
                </View>
                <View style={{backgroundColor:'rgba(113, 183, 183, 0.8)',marginLeft:10, marginRight:10, borderRadius:10}}>
                            <View style={styles.bodyone}>
                                {this.state.task_owner_id != this.props.route.params.task_owner_id ? <><View style={{ flexDirection: 'row' }}>
                                    <TouchableOpacity onPress={() => this.props.navigation.navigate("Profilefriend", {
                                            first_name: this.state.task_owner_first_name,
                                            last_name: this.state.task_owner_last_name, _id:this.state.task_owner_id
                                        })} style={styles.imageview}>
                                        <Image source={this.state.avatar ? { uri: this.state.avatar } : avatarimage} style={styles.image}></Image>
                                    </TouchableOpacity>
                                    <View style={{
                                        flexDirection: 'column', marginLeft: 10, paddingTop: 10,
                                        marginRight: 10
                                    }}>
                                        <TouchableOpacity onPress={() => this.props.navigation.navigate("Profilefriend", {
                                            first_name: this.state.task_owner_first_name,
                                            last_name: this.state.task_owner_last_name, _id:this.state.task_owner_id
                                        })}>
                                            <Text style={{ fontWeight: 'bold', fontSize: 20, }} >{fullname}</Text>
                                        </TouchableOpacity>
                                        <View>
                                            <Text>
                                                {new Date(this.state.created_time).toLocaleDateString()}
                                            </Text>
                                        </View>
                                    </View>
                                </View>

                                    <View style={{ flexDirection: 'row', marginRight: 20 }}>
                                      
                                          <TouchableOpacity onPress={() => this.setState({ show: true })} style={styles.iconview1}>
                                          <AntDesign name="pluscircle" size={24} color="Black" />
                                         </TouchableOpacity>
                                      
                                       
                                           <TouchableOpacity onPress={this.save} style={styles.iconview2}>
                                           <Entypo name="save" size={24} color="black" />
                                          </TouchableOpacity>
                                     
                                       
                                    </View></> : null}
                            </View>
                            <View style={{borderWidth:1, justifyContent:'center',borderColor:'white', marginTop:20,marginLeft:30,marginRight:30}}>

                            </View>
                            <View style={styles.bodytwo}>
                                <View style={{ padding: 15 }}>
                                    <Text style={{ fontWeight: 'bold', fontSize: 23, fontStyle: 'normal', color: '#000000'  }}>{this.state.task_title}</Text>
                                </View>
                            </View>
                            </View>
                <ScrollView>
                    {this.state.task_owner_first_name == '' ?
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                            <ActivityIndicator size='large'></ActivityIndicator>
                        </View>
                        :
                        
                        
                        <View style={styles.body}>
                            <View style={styles.bodyThree}>
                                <View style={{ marginTop: 30 }}>
                                    <Text style={{ fontWeight: 'bold', fontSize: 13, marginLeft: 15 }}>
                                        JOB DESCRIPTION:
                            </Text>
                                </View>
                                <View style={{ marginLeft: 25, marginTop: 10, marginRight: 20, flexDirection: 'row', width: width - 38 }}>

                                    <Text style={styles.textJobRe}>
                                        {this.state.task_description}
                                    </Text>

                                    {/*<Text style={styles.textJobRe}>
                                    - Ki?u công vi?c: {this.state.task_type}
                                </Text>
                                <Text style={styles.textJobRe}>
                                    - Giá sàn: {this.state.floor_price}
                                </Text>
                                <Text style={styles.textJobRe}>
                                    - Giá trên: {this.state.ceiling_price}
                                </Text>
                                <Text style={styles.textJobRe}>
                                    - Ð?a ch?: {this.state.location}
                                </Text>*/}
                                </View>
                                <View style={{ marginTop: 30 }}>
                                    <Text style={{ fontWeight: 'bold', fontSize: 13, marginLeft: 15 }}>
                                        JOB REQUIREMENT:
                            </Text>
                                </View>
                                <View style={{ marginLeft: 25, marginTop: 10, marginRight: 20, flexDirection: 'row', width: width - 38 }}>
                                    {/*<Text style={styles.textJobRe}>
                                    - {this.state.languages}
                                </Text>
                                <Text style={styles.textJobRe}>
                                    - {this.state.tags}
                                </Text>*/}
                                    <Text style={styles.textJobRe}>
                                        {!this.state.task_requirement?null:this.state.task_requirement}
                                    </Text>
                                </View>
                                <View style={{ marginTop: 30 }}>
                                    <Text style={{ fontWeight: 'bold', fontSize: 13, marginLeft: 15 }}>
                                        WORK LOCATION:
                            </Text>
                                </View>
                                <View style={{ alignItems: 'center', marginLeft: 25, marginTop: 10, marginRight: 30, flexDirection: 'row' }}>
                                    <Entypo name="location" size={24} color="red" />
                                    <View style={{ marginLeft: 10 }}>
                                        <Text style={styles.textJobRe}>
                                            {this.state.location}
                                        </Text>
                                    </View>
                                </View>
                                <View style={{ marginTop: 30 }}>
                                    <Text style={{ fontWeight: 'bold', fontSize: 13, marginLeft: 15 }}>
                                        OTHER:
                            </Text>
                                </View>
                                <View style={{ marginLeft: 25, marginTop: 10, marginRight: 20 }}>
                                    <View style={{ marginLeft: 10, marginTop: 5 }}>
                                        {this.state.price_type == "dealing" ?
                                            <>
                                                <Text style={styles.textJobRe}>
                                                    Price Type: {this.state.price_type}
                                                </Text>
                                            </>
                                            :
                                            <>
                                                <Text style={styles.textJobRe}>
                                                    Price Type: {this.state.floor_price} - {this.state.ceiling_price}
                                                </Text>
                                            </>}
                                            <View style={{flexDirection: 'row'}}>
                                            <Text style={styles.textJobRe}>
                                                        Languages: </Text>
                                            {this.state.languages.map((items) => {
                                                return (
                                                <View key={items}>
                                                    <Text style={styles.textJobRe}>
                                                       {items}, </Text>
                                                </View>
                                                )
                                            })}
                                    
                                            </View>
                                         
                                     
                                        {this.state.task_type == 'freelance' ?
                                            null :
                                            <>
                                                <Text style={styles.textJobRe}>
                                                    Industry: {this.state.industry}
                                                </Text>
                                                <Text style={styles.textJobRe}>
                                                    Skills: {this.state.skills}
                                                </Text>
                                                <Text style={styles.textJobRe}>
                                                    Task type: {this.state.task_type}
                                                </Text>
                                              
                                            </>
                                        }
                                    </View>
                                </View>
                                <View style={{ marginTop: 30 }}>
                                    <Text style={{ fontWeight: 'bold', fontSize: 13, marginLeft: 15 }}>
                                        TAGS:
                                </Text>
                                </View>
                                <View style={{ marginLeft: 25, marginTop: 10, marginRight: 20, marginBottom: 50 }}>
                                    <FlatList numColumns={2} data={this.state.tags} renderItem={({ item, index }) => {
                                         let tag = item;
                                         let count =tag.length;
                                         if (count >=14) {
                                            tag = tag.slice(0,14)+'..';
                                         }
                                        return (
                                            <View key={item} style={{ borderWidth: 1, backgroundColor: '#EEEEEE', borderColor: '#D2D2D2', alignItems: 'center', justifyContent: 'center', borderRadius: 5, height: 30, paddingLeft: 20, paddingRight: 20, marginBottom: 10, marginRight: 10 }}>
                                                <Text style={{ color: '#505050', lineHeight: 20, fontSize: 13 }}>{tag}</Text>
                                            </View>
                                        )
                                    }}
                                        keyExtractor={(item) => item.toString()}>
                                    </FlatList>

                                </View>
                            </View>
                            {!this.state.datarecommend?null
                            :
                             <>
                             <View>
                                 <Text style={{ fontWeight: 'bold', fontSize: 13, marginLeft: 15 }}>
                                     RECOMMENDED FOR YOU:
                             </Text>
                             </View>
                             <View style={styles.recommend}>
                                 {this.state.isLoadingrecomend == false ?
                                     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                         <ActivityIndicator size='large'></ActivityIndicator>
                                     </View>
                                     :
 
                                     <ScrollView horizontal={false}>
                                         <View style={{ alignItems: 'center', justifyContent: 'center', paddingRight: 15 }}>
                                             {!this.state.datarecommend?null:this.state.datarecommend.map((task, index) => <Task key={index} image={task.task_owner_avatar}
                                                 first_name={task.task_owner_first_name} last_name={task.task_owner_last_name} title={task.task_title}
                                                 location={task.location.formatted_address} onStack={this.onDetail} onStack1={this.onDetail1} _id={task._id}
                                             />)}
 
                                         </View>
                                     </ScrollView>
                                 }
                             </View>
                             </>
                            }
                           
                          
                        </View>}
                </ScrollView>
                <Modal transparent={true}
                    visible={this.state.show}
                    animationType='slide'
                >
                    <TouchableWithoutFeedback onPress={Keyboard.dismiss} style={{ backgroundColor: '#000000aa', flex: 1, }} >
                        <View style={{ backgroundColor: '#000000aa', flex: 1 }}>
                            <View style={{
                                backgroundColor: '#faf9f9', borderRadius: 10,
                                height: 330, marginLeft: 40, marginRight: 40, marginTop: 75,
                                borderWidth: 2, borderColor: '#009387', padding: 20,
                                alignContent: 'center'
                            }}>
                                <View style={{ alignContent: 'center' }}>
                                    <Text style={{ fontSize: 20, fontWeight: 'bold', fontStyle: 'italic' }}>Introduction:</Text>
                                </View>
                                <View style={{ height: 120, padding: 10, borderColor: '#808080' }}>
                                    <TextInput multiline={true}
                                        onChangeText={(introduction) => this.setState({ introduction })}
                                        value={this.state.introduction}
                                        placeholderTextColor={this.state.key=='intro'?'red':'#2d7474'}
                                        underlineColorAndroid='transparent'
                                        placeholder='introduction...'
                                    >

                                    </TextInput>
                                </View>
                               <View>
                                   <Text style={{fontStyle: 'italic',color:'red'}}>{this.state.key=='intro'?this.state.notice:null}</Text>
                               </View>
                                <View style={{ alignContent: 'center' }}>
                                    <Text style={{ fontSize: 20, fontWeight: 'bold', fontStyle: 'italic' }}>Price:</Text>
                                </View>
                                <View style={{ padding: 10, borderColor: '#808080' }}>
                                    <TextInput
                                        onChangeText={(price) => this.setState({ price })}
                                        value={this.state.price}
                                        placeholderTextColor={this.state.key=='price'?'red':'#2d7474'}
                                        underlineColorAndroid='transparent'
                                        placeholder='price...'
                                    >

                                    </TextInput>
                                </View>
                                <View style={{marginTop: -5}}>
                                   <Text style={{fontStyle: 'italic',color:'red'}}>{this.state.key=='price'?this.state.notice:null}</Text>
                               </View>
                                <View style={styles.controlStyle}>
                                    <TouchableOpacity style={styles.cancle} onPress={() => this.setState({ show: false,key:'',introduction:'',price:''  })}>
                                        <Text style={{ fontWeight: 'bold', color: "#488B8F", fontSize: 18 }}>Cancle</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.apply} onPress={this.applyJob}>
                                        <Text style={{ fontWeight: 'bold', color: "white", fontSize: 18 }}>Apply</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                </Modal>
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
                            <TouchableOpacity onPress={() => this.setState({ shownotice: false,show:false,introduction:'',price:''  })} style={{
                                width: "50%", backgroundColor: this.state.key === "success" ? 'green' : 'red',
                                height: 30, borderRadius: 10, marginTop: 15, justifyContent: 'center', alignItems: 'center'
                            }}>
                                <Text style={{ color: "white", fontSize: 15, fontWeight: 'bold' }}>Ok</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
            </View>
        )
    }
}
const Task = ({ onStack, _id, first_name, image, last_name, location, title, onStack1 }) => {
    var fullname = title;
    var count = fullname.length;
    if (count >= 35) {
        fullname = fullname.slice(0, 35) + "....";
    }
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
            justifyContent: 'center', alignItems: 'center',

        }}
        >
            <View>
                <TouchableOpacity onPress={() => {
                    if (onStack1(_id)) {
                        onStack1(_id)
                    }
                    else  if(onStack(_id)){
                        onStack(_id)
                    }
                }
            }>

                </TouchableOpacity>
                <Image source={image ? { uri: image } : avatar1} style={{ width: width - 20, height: height * 0.30, borderTopLeftRadius: 10, borderTopRightRadius: 10 }}>

                </Image>
                <View style={styles.ImageOverlay}>
                    <TouchableOpacity onPress={() => {
                    if (onStack1(_id)) {
                        onStack1(_id)
                    }
                    else  if(onStack(_id)){
                        onStack(_id)
                    }
                }
            }>
                        <Text style={{ fontSize: 20, color: 'black', fontWeight: 'bold' }}>{fullname}</Text>
                    </TouchableOpacity>

                    <View style={{ flexDirection: 'row', paddingLeft: 20, paddingRight: 10 }}>
                        <View style={{ marginRight: 10 }}>
                            <Entypo name="location" size={22} color="red" />
                        </View>
                        <Text style={{ fontSize: 16, color: '#888888' }}>{location}</Text>
                    </View>
                    <TouchableOpacity onPress={() => {
                    if (onStack1(_id)) {
                        onStack1(_id)
                    }
                    else  if(onStack(_id)){
                        onStack(_id)
                    }
                }

                } style={{
                    width: "100%", height: 35, backgroundColor: '#2d7474',
                    position: 'absolute', bottom: 10, borderRadius: 5, shadowOffset: { width: 0, height: 0 },
                    shadowColor: 'green',
                    shadowOpacity: 0.1,
                    elevation: 4, justifyContent: 'center', alignItems: 'center'
                }}>
                    <Text style={{ fontSize: 18, color: 'white', fontWeight: 'bold' }}>Detail</Text>
                </TouchableOpacity>
                </View>
               
            </View>
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
export default Detail;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#faf9f9',
    },
    header0: {
        height: height * 0.17,
        paddingLeft: 10,
        backgroundColor: '#faf9f9'
    },
    body: {
        flex: 1,
        justifyContent: 'center',
    },
    bodyone: {
        flexDirection: 'row',
        marginTop: 10,
        justifyContent: 'space-between',   
    },
    ImageOverlay: {
        width: width - 20, height: height * 0.18, borderBottomEndRadius: 10, borderBottomLeftRadius: 10,
        backgroundColor: '#ffff', alignItems: 'center', padding: 5
    },
    cancle: {
        flex: 1,
        backgroundColor: '#ffff',
        alignItems: 'center',
        paddingVertical: 5,
        borderTopLeftRadius: 5,
        borderBottomLeftRadius: 5, marginRight: 3,
        borderWidth: 1, borderColor: '#488B8F'

    },
    apply: {
        flex: 1,
        backgroundColor: '#488B8F',
        alignItems: 'center',
        paddingVertical: 5,
        borderBottomRightRadius: 5,
        borderTopRightRadius: 5, marginLeft: 3
    },
    controlStyle: {
        flexDirection: 'row',
        marginTop: 10,
    },
    imageview: {
        marginLeft: 20,
        shadowOffset: { width: 0, height: 3 },
        shadowColor: 'green',
        shadowOpacity: 0.5,
        elevation: 10,
        borderColor: '#71B7B7',
        borderRadius: 50,
    },
    image: {
        height: 80,
        width: 80,
        borderRadius: 50,
    },
    iconview1: {
        height: 40,
        width: 40,
        backgroundColor: '#ffff',
        marginTop: 15,
        marginRight: 10, justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4
    },
    iconview2: {
        height: 40,
        width: 40,
        backgroundColor: '#ffff',
        marginTop: 15,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#add2c9',
        borderRadius: 4
    },
    bodytwo: {

    },
    textJobRe: {
        lineHeight: 20, fontSize: 18,

        color: '#555555'
    }
})
