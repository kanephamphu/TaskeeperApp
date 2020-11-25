import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity,
     Modal, TextInput, Image, ScrollView, Dimensions, LinearGradient, SafeAreaView, } from 'react-native';
import io from 'socket.io-client/dist/socket.io';
import avatarimage from '../../images/avatar.jpg';
import { Entypo } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import iconsuccess from '../../images/icon1.png';
import iconerror from '../../images/icon2.png';
import AsyncStorage from '@react-native-community/async-storage';
var e;
const { height, width } = Dimensions.get('window');
class Detail extends Component {
    constructor(props) {
        super(props);
        this.socket = io('https://taskeepererver.herokuapp.com', { jsonp: false })
        e = this;
        this.state = {
            languages: '',
            task_type: '',
            tags: '',
            task_owner_id: '',
            task_description: '',
            created_time: '',
            task_owner_first_name: '',
            task_owner_last_name: '',
            floor_price: '',
            ceiling_price: '',
            location: '',
            task_title: '',
            avatar: '',
            shownotice: false,
            notice:'',key:'',
            secret_key:'',
            introduction: '',
            show: false,

        }
        this.apply = this.applyJob.bind(this)
        this.save = this.saveTask.bind(this);
        this.socket.on("sv-save-task", function (data) {
            if (data.success == false) {
                console.log(JSON.stringify(data))
                    e.setState({
                        shownotice:true,
                        notice:'Đã tồn tại!',
                        key:"error",
                    })
            } else if (data.success == true) {
               e.setState({
                   shownotice:true,
                   notice:'Lưu thành công!',
                   key:"success",
               })
               console.log(JSON.stringify(data))
            }
        })
        this.socket.on("sv-apply-job", function (data) {
            if (data.success == false) {
                if (data.errors.introduction) {
                    e.setState({          
                        shownotice:true,
                        notice:'Chưa điền giới thiệu!',
                        key:"error"
                    })
                } else {
                    e.setState({
                        shownotice:true,
                        notice:'Đã tồn tại!',
                        key:"error",
                    })
                }
                console.log(JSON.stringify(data))
            } else if (data.success == true) {
                e.setState({
                    show: false ,
                    shownotice:true,
                    notice:'Tham gia thành công!',
                    key:"success",
                })
            }
        })
        this.socket.on("sv-task-detail", function (data) {
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
                    avatar: list.task_owner_avatar
                })
            } else {
                console.log(data.erro)
            }
        })
    }
    componentDidMount= async () =>  {
        const token = await AsyncStorage.getItem('token')
        this.setState({
            secret_key: token,
        })
        const detail = {
            _task_id: this.props.route.params._task_id,
        }
        this.socket.emit("cl-task-detail", detail)
    }
    applyJob(){
        const apply = {
            secret_key: this.state.secret_key,
            task_id: this.props.route.params._task_id,
            introduction: this.state.introduction,
            price: this.state.floor_price,
        }
        this.socket.emit("cl-apply-job", apply)

    }
    saveTask = () => {
        const save = {
            secret_key:this.state.secret_key,
            task_id: this.props.route.params._task_id
        }
        this.socket.emit("cl-save-task", save)
      
    }
    render() {
        var fullname = this.state.task_owner_first_name + " " + this.state.task_owner_last_name;
        var count = fullname.length;
        if (count >= 18) {
            fullname = fullname.slice(0, 14) + "....";
        }
        return (
            <View style={styles.container}>

                <View style={styles.header0}>
                    <TouchableOpacity style={{ flexDirection: 'row' }} onPress={() => this.props.navigation.goBack()}>
                        <Ionicons style={{ marginTop: 1 }} name="ios-arrow-back" size={28} color="#2d7474" />
                        <Text style={{ fontWeight: 'bold', fontSize: 25, color: '#2d7474', marginLeft: 15, marginTop: -2 }}>Detail job</Text>
                    </TouchableOpacity>

                </View>
                <ScrollView>
                    <View style={styles.body}>

                        <View style={styles.bodyone}>
                            <View style={{flexDirection: 'row',marginRight: 20}}>
                                <View style={styles.imageview}>
                                    <Image source={this.state.avatar ? { uri: this.state.avatar } : avatarimage} style={styles.image}></Image>
                                </View>
                                <View style={{
                                flexDirection: 'column', marginLeft: 10, padding:5,
                                width:width-240
                            }}>
                                <TouchableOpacity onPress={() => this.props.navigation.navigate("ProfileUser", {
                                    first_name: this.state.task_owner_first_name,
                                    last_name: this.state.task_owner_last_name, _id: 10
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
                           
                            <View style={{flexDirection: 'row',marginRight: 20}}>
                            <TouchableOpacity onPress={()=>this.setState({show:true})} style={styles.iconview1}>
                            <AntDesign name="pluscircle" size={24} color="black" />
                            </TouchableOpacity>
                            <TouchableOpacity  onPress={this.save} style={styles.iconview2}>
                                <Entypo name="save" size={24} color="black" />
                            </TouchableOpacity>
                            </View>
                           
                        </View>
                        <View style={styles.bodytwo}>
                            <View style={{ marginLeft: 15, marginTop: 25 }}>
                                <Text style={{ color: '#71b7b7', fontWeight: 'bold', fontSize: 18, fontStyle: 'italic' }}>{this.state.task_title}</Text>
                            </View>
                        </View>
                        <View style={styles.bodyThree}>
                            <View style={{ marginTop: 40 }}>
                                <Text style={{ fontSize: 18, fontWeight: 'bold', marginLeft: 15 }}>
                                    Job Description:
                            </Text>
                            </View>
                            <View style={{ margin:15}}>

                                <Text style={styles.textJobRe}>
                                    - {this.state.task_description}
                                </Text>

                                <Text style={styles.textJobRe}>
                                    - Kiểu công việc: {this.state.task_type}
                                </Text>
                                <Text style={styles.textJobRe}>
                                    - Giá sàn: {this.state.floor_price}
                                </Text>
                                <Text style={styles.textJobRe}>
                                    - Giá trên: {this.state.ceiling_price}
                                </Text>
                                <Text style={styles.textJobRe}>
                                    - Địa chỉ: {this.state.location}
                                </Text>
                            </View>
                            <View style={{ marginTop: 40 }}>
                                <Text style={{ fontSize: 18, fontWeight: 'bold', marginLeft: 15 }}>
                                    Job Requirement:
                            </Text>
                            </View>
                            <View style={{ marginLeft: 25, marginTop: 10 }}>
                                <Text style={styles.textJobRe}>
                                    - {this.state.languages}
                                </Text>
                                <Text style={styles.textJobRe}>
                                    - {this.state.tags}
                                </Text>
                            </View>
                        </View>
                    </View>
                </ScrollView>
                <Modal transparent={true}
                    visible={this.state.show}
                    animationType='slide'
                >
                    <View style={{ backgroundColor: '#000000aa', flex: 1 }}>
                        <View style={{
                            backgroundColor: '#faf9f9', borderRadius: 20,
                            height: 300, marginLeft: 40, marginRight: 40, marginTop: 75,
                            borderWidth: 2, borderColor: '#009387', padding: 20,
                            alignContent: 'center'
                        }}>
                            <View style={{ alignContent: 'center' }}>
                                <Text style={{ fontSize: 20, fontWeight: 'bold', fontStyle: 'italic' }}>Introduction:</Text>
                            </View>
                            <View style={{ height: 180, padding: 10, borderColor: '#808080' }}>
                                <TextInput multiline={true}
                                    onChangeText={(introduction) => this.setState({ introduction })}
                                    value={this.state.introduction}
                                    placeholderTextColor={'#2d7474'}
                                    underlineColorAndroid='transparent'
                                    placeholder='introduction...'
                                >
                                </TextInput>
                            </View>
                            <View style={styles.controlStyle}>
                                <TouchableOpacity style={styles.cancle} onPress={() => this.setState({ show: false })}>
                                    <Text style={{ color: '#ffff', fontSize: 20 }}>Cancle</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.apply} onPress={this.apply}>
                                    <Text style={{ color: '#ffff', fontSize: 20 }}>Apply</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal>
                <Modal transparent={true}
                    visible={this.state.shownotice}
                    animationType='slide'
                    style={{justifyContent: 'center', alignItems: 'center'}}
                >
                    <View style={{backgroundColor: '#000000aa', flex: 1,justifyContent: 'center', alignItems: 'center' }}>
                        <View style={{
                            backgroundColor: '#faf9f9', borderRadius: 20,
                            height: "30%", width: "70%",justifyContent: 'center', alignItems: 'center' 
                        }}>
                            <Image source={this.state.key==="success"?iconsuccess:iconerror} style={{height:50,width:50}}></Image>
                            <Text>{this.state.notice}</Text>
                            <TouchableOpacity onPress={()=>this.setState({shownotice:false})} style={{width:"50%",backgroundColor:this.state.key==="success"?'green':'red',
                            height:30,borderRadius:10,marginTop:15,justifyContent: 'center', alignItems: 'center'}}>
                                <Text style={{color:"white",fontSize:15,fontWeight: 'bold'}}>Ok</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
            </View>


        )
    }
}

export default Detail;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#faf9f9',
    },
    header0: {
        height: height * 0.08,
        shadowOffset: { width: 0, height: 3 },
        padding: 10,
        marginTop: Platform.OS == 'android' ? 25 : null,
        backgroundColor: '#faf9f9'
    },
    body: {
        flex: 1,
        justifyContent: 'center',
    },
    bodyone: {
        flexDirection: 'row',
        marginTop: 10,
        justifyContent:'space-between',
       
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
        backgroundColor: '#add2c9',
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
