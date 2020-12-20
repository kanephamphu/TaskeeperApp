import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Modal, Dimensions, Alert, Image ,TouchableWithoutFeedback,Keyboard} from 'react-native'
import io from 'socket.io-client/dist/socket.io'
import { AntDesign } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import avatar from '../../../images/avatar11.png'   
import iconsuccess from '../../../images/icon1.png';
import iconerror from '../../../images/icon2.png';
import AsyncStorage from '@react-native-community/async-storage';
import moment from 'moment'
var e;
const { height, width } = Dimensions.get('window');
class FlatListdata extends Component {
    constructor(props) {
        super(props);
        e = this;
        this.state = {
            _id: '',
            introduction: '',
            ceiling_price: '',
            floor_price: '',
            secret_key: '',
            show:false,
            shownotice:false,
            notice:'',
            key:'',price:''

        }
        this.socket = io('https://taskeepererver.herokuapp.com', { jsonp: false })
        this.applyJob = this.applyJob.bind(this)
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
            } else if (data.success == true) {
                e.setState({
                    show: false ,
                    shownotice:true,
                    notice:'Tham gia thành công!',
                    key:"success",
                })
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
        this.save = this.saveTask.bind(this);
        this.socket.on("sv-save-task", function (data) {
            if (data.success == false) {
                console.log(JSON.stringify(data))
                if (data.errors.message) {
                    e.setState({
                        shownotice:true,
                        notice:'Đã tồn tại!',
                        key:"error",
                    })
                }
            } else if (data.success == true) {
               e.setState({
                   shownotice:true,
                   notice:'Lưu thành công!',
                   key:"success",
               })
            }
        })
    }
    componentDidMount = async () => {
        const token = await AsyncStorage.getItem('token')
        this.setState({
            secret_key: token,
            _id: this.props.item._id,

        })
    }
    applyJob(){
        this.setState({show: false})
        const apply = {
            secret_key: this.state.secret_key,
            task_id: this.state._id,
            introduction: this.state.introduction,
            price: this.state.price,
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
    saveTask = () => {
        const save = {
            secret_key: this.state.secret_key,
            task_id: this.state._id
        }
        this.socket.emit("cl-save-task", save)
    }
    onsss() {
        this.props.stack;
    }
    render() {
        var d = new Date();
        var task_description = this.props.item.task_description;
        var task_title = this.props.item.task_title;
        if(task_title.length>=20){
            task_title = task_title.slice(0,20);
        }
        var count = task_description.length;
        if (count >= 30) {
            task_description = task_description.slice(0, 30);
        }
        var textnull = "Null"
        return (
            <View style={styles.container}>
                <View style={styles.body} key={this.props.item._id}>
                    <View style={styles.bodyone}>
                        <TouchableOpacity style={styles.imageview} onPress={() => this.props.stackProfile(this.props.item.task_owner_first_name, this.props.item.task_owner_last_name, this.props.item.task_owner_id)}>
                            <Image source={this.props.item.task_owner_avatar ? { uri: this.props.item.task_owner_avatar } : avatar} style={{
                                width: 60, marginTop: -10
                                , height: 60, borderRadius: 50,
                            }}></Image>
                        </TouchableOpacity>
                        <View style={{ flexDirection: 'column', marginLeft: 15 }}>
                            <TouchableOpacity onPress={() => this.props.stackProfile(this.props.item.task_owner_first_name, this.props.item.task_owner_last_name, this.props.item.task_owner_id)}>
                                <Text style={{ fontSize: 18 }}>{this.props.item.task_owner_first_name ? this.props.item.task_owner_first_name : textnull}
                                    {" "}{this.props.item.task_owner_last_name ? this.props.item.task_owner_last_name : textnull}</Text>
                            </TouchableOpacity>
                            <View style={{ flexDirection: 'row' }}>
                                <View style={{ marginRight: 10 }}>
                                    <Text>{new Date(this.props.item.created_time).toLocaleDateString()}</Text>
                                </View>
                                <View>
                                    <Text>{new Date(this.props.item.created_time).toLocaleTimeString()}</Text>
                                </View>

                            </View>
                        </View>
                    </View>
                    <View style={styles.bodytwo}>
                        <TouchableOpacity style={{flexDirection:'row'}} onPress={() => this.props.stackDetail(this.props.item._id)}>
                            <Text style={{fontWeight: 'bold', fontSize: 23, fontStyle: 'italic', color: '#2d7474'}}>{task_title}</Text>
                            {task_title.length>=20?
                            <View style={{marginTop:9,flexDirection:'row'}}>
                                <Text>...</Text>
                            </View>:null}
                            {new Date(this.props.item.created_time).toLocaleDateString()==d.toLocaleDateString()?
                            <View style={{marginLeft:5}}>
                                <Text style={{fontWeight:'bold',fontSize:10,marginTop:2,color:'#CD5C5C'}}>(MỚI)</Text>
                            </View>
                            :null}
                        </TouchableOpacity>
                        <View style={{flexDirection:'column',marginTop:10}}>
                            <Text style={{fontWeight:'bold',fontSize:13}}>TASK DESCRIPTION:</Text>
                            <View style={{marginTop:10,flexDirection:'row'}}>
                                <Text style={{marginLeft:20,color:'#0E0E0E',fontSize:13}}>{task_description}</Text>
                                {count >= 30?
                                <>
                                    <Text>...</Text>
                                    <TouchableOpacity onPress={()=>this.props.stackDetail(this.props.item._id)}>
                                        <Text style={{ color: "#b30000",fontSize:13 }}> see detail</Text>
                                    </TouchableOpacity>
                                </>:null}
                            </View>
                        </View>
                    </View>
                    <View style={styles.bodynext} >
                        <View style={{flexDirection:'row',marginTop:-10,alignItems:'center'}}>                        
                            <Entypo name="location-pin" size={20} color="red"/>  
                            <View style={{marginLeft:10}}>                      
                                <Text style={{color:'#0E0E0E',fontSize:13}}>{this.props.item.location.formatted_address}</Text>
                            </View>
                        </View>
                        <View style={{flexDirection:'row',marginTop:10}}>                        
                            <Text style={{color:'#0E0E0E',fontSize:13}}>Updated:</Text> 
                            <View style={{marginLeft:5}}>                      
                                {this.props.item.end_year<moment(d).format('YYYY')?
                                <>
                                    <Text style={{color:'#0E0E0E',fontSize:13}}>You have expired to apply for this job</Text>
                                </>
                                :
                                <>
                                    {this.props.item.end_month<moment(d).format('MM')?
                                    <>
                                        <Text style={{color:'#0E0E0E',fontSize:13}}>You have expired to apply for this job</Text>
                                    </>
                                    :
                                    <>
                                        {this.props.item.end_day<=moment(d).format('DD')?
                                        <>
                                            <Text style={{color:'#0E0E0E',fontSize:13}}>You have expired to apply for this job</Text>
                                        </>
                                        :
                                        <View style={{flexDirection:'row'}}>
                                            <Text style={{color:'#0E0E0E',fontSize:13}}>You have </Text>
                                            <Text style={{color:'#0E0E0E',fontSize:13,fontWeight:'bold'}}>{this.props.item.end_day-moment(d).format('DD')} </Text>
                                            {this.props.item.end_day-moment(d).format('DD')==1?
                                            <>
                                                <Text style={{color:'#0E0E0E',fontSize:13}}>day to apply</Text>
                                            </>
                                            :
                                            <>
                                                <Text style={{color:'#0E0E0E',fontSize:13}}>days to apply</Text>
                                            </>
                                            }
                                        </View>
                                        }
                                    </>
                                    }
                                </>
                                }
                            </View>
                        </View>
                        <View style={{flexDirection:'row',marginTop:10}}>                        
                            <Text style={{color:'#0E0E0E',fontSize:13}}>Working Time:</Text> 
                            <View style={{marginLeft:5}}>
                                <Text style={{color:'#0E0E0E',fontSize:13,fontWeight:'bold'}}>{this.props.item.working_time!=null?this.props.item.working_time.start_time:null} - {this.props.item.working_time!=null?this.props.item.working_time.end_time:null}</Text> 
                            </View>
                        </View>
                    </View>
                    <View style={styles.bodythree}>
                        <TouchableOpacity style={styles.iconBulliten1} onPress={() => this.setState({ show: true })}>
                            <View>
                                <AntDesign name="pluscircle" size={24} color="#71B7B7" />
                            </View>
                            <View style={{ marginLeft: 5 }}>
                                <Text>Apply</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.iconBulliten2} onPress={this.save}>
                            <View>
                                <Entypo name="save" size={24} color="#71B7B7" />
                            </View>
                            <View style={{ marginLeft: 5 }}>
                                <Text>Save</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
                <Modal transparent={true}
                    visible={this.state.show}
                    animationType='slide'
                >
                     <TouchableWithoutFeedback onPress={Keyboard.dismiss} style={{ backgroundColor: '#000000aa', flex: 1, }} >
                    <View style={{ backgroundColor: '#000000aa', flex: 1 }}>
                        <View style={{
                            backgroundColor: '#faf9f9', borderRadius: 10,
                            height: 320, marginLeft: 40, marginRight: 40, marginTop: 75,
                            borderWidth: 2, borderColor: '#009387', padding: 20,
                            alignContent: 'center'
                        }}>
                            <View style={{ alignContent: 'center' }}>
                                <Text style={{ fontSize: 20, fontWeight: 'bold', fontStyle: 'italic' }}>Introduction:</Text>
                            </View>
                            <View style={{height: 130, padding: 10, borderColor: '#808080' }}>
                                <TextInput multiline={true}
                                    onChangeText={(introduction) => this.setState({ introduction })}
                                    value={this.state.introduction}
                                    placeholderTextColor={'#2d7474'}
                                    underlineColorAndroid='transparent'
                                    placeholder='introduction...'
                                >

                                </TextInput>
                            </View>
                            <View style={{ alignContent: 'center' }}>
                                <Text style={{ fontSize: 20, fontWeight: 'bold', fontStyle: 'italic' }}>Price:</Text>
                            </View>
                            <View style={{padding: 10, borderColor: '#808080' }}>
                                <TextInput
                                    onChangeText={(price) => this.setState({ price})}
                                    value={this.state.price}
                                    placeholderTextColor={'#2d7474'}
                                    underlineColorAndroid='transparent'
                                    placeholder='price...'
                                >

                                </TextInput>
                            </View>
                            <View style={styles.controlStyle}>
                                <TouchableOpacity style={styles.cancle} onPress={() => this.setState({ show: false })}>
                                    <Text style={{ fontWeight: 'bold',color:"#488B8F",fontSize:18 }}>Cancle</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.apply} onPress={this.applyJob}>
                                    <Text style={{ fontWeight: 'bold',color:"white",fontSize:18}}>Apply</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                    </TouchableWithoutFeedback>
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

export default FlatListdata;
const styles = StyleSheet.create({
    container: {
        backgroundColor: '#faf9f9',
        flex: 1,
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
    bodytwo: {
        flexDirection: 'column',
        margin: 10
    },
    bodynext: {
        flexDirection: 'column',
        margin: 10,
        width:width-105
    },
    bodythree: {
        flexDirection: 'row',
        borderTopWidth: 1,
        height: 45,
        right:0,
        borderColor: '#71B7B7',
        left:0,
        bottom:0,
        position:'absolute'
    },
    imageview: {
        shadowOffset: { width: 0, height: 3 },
        shadowColor: 'green',
        shadowOpacity: 0.5,
        elevation: 4,
        borderColor: '#71B7B7',
        borderRadius: 50,
        
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
    cancle: {
        flex: 1,
        backgroundColor:'#ffff',
        alignItems: 'center',
        paddingVertical: 5,
        borderTopLeftRadius: 5,
        borderBottomLeftRadius:5, marginRight: 3,
        borderWidth:1,borderColor:'#488B8F'

    },
    apply: {
        flex: 1,
        backgroundColor:'#488B8F',
        alignItems: 'center',
        paddingVertical: 5,
        borderBottomRightRadius: 5,
        borderTopRightRadius: 5, marginLeft: 3
    },
    controlStyle: {
        flexDirection: 'row',
        marginTop: 10,
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
        backgroundColor: '#ffff'
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
        height: height * 0.35,
        marginTop: 10,
        marginRight: 10,
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.2,
        backgroundColor: '#71B7B7',
        borderRadius: 15,
        elevation: 2,
        borderColor: '#71B7B7'
    }
})