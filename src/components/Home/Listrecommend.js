import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, FlatList, TextInput, Modal, Dimensions, Alert, ScrollView, Image, TouchableWithoutFeedback, Keyboard, ActivityIndicator} from 'react-native'
import io from 'socket.io-client/dist/socket.io'
import { AntDesign } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import avatar from '../../images/avatar.jpg';
import { MaterialIcons } from '@expo/vector-icons';
import iconsuccess from '../../images/checked.png';
import iconerror from '../../images/close.png';
import avatarimage from '../../images/avatar.jpg'
import AsyncStorage from '@react-native-community/async-storage';
import { MaterialCommunityIcons } from '@expo/vector-icons';
var e;
const { height, width } = Dimensions.get('window');
class Listrecommend extends Component {
    constructor(props) {
        super(props);
        e = this;
        this.state = {
            _id: '',
            introduction: '',
            ceiling_price: '',
            floor_price: '',
            secret_key: '',
            show: false,
            shownotice: false,
            notice: '',
            key: '',
            data1: [
            ],
            isLoading:false
        }
        this.socket = io('https://taskeepererver.herokuapp.com', { jsonp: false })
        this.socket.on('sv-get-recommend-task', function (data) {
            e.setState({
                data1: data.data,
                isLoading: true
            })
           
        })
    }
    componentDidMount = async () => {
        const token = await AsyncStorage.getItem('token')
        const listrecommend = {
            secret_key: token,
        }
        this.socket.emit('cl-get-recommend-task', listrecommend)
       
    }
    render() {
      
        return (
            <View style={styles.container}>
                <View style={styles.header0}>
                    <TouchableOpacity style={{ flexDirection: 'row' }} onPress={() => this.props.navigation.goBack()}>
                        <Ionicons style={{ marginTop: 1 }} name="ios-arrow-back" size={28} color="#2d7474" />
                        <Text style={{ fontWeight: 'bold', fontSize: 25, color: '#2d7474', marginLeft: 15, marginTop: -2 }}>List Recommend</Text>
                    </TouchableOpacity>

                </View>
                {this.state.isLoading==false?
                         <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                         <ActivityIndicator size='large'></ActivityIndicator>
                       </View>
                        :
                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' ,marginBottom: 20}}>
                   
                        <FlatList data={this.state.data1}
                        renderItem={({ item, index }) => {
                            var task_title = item.task_title;
                            var task_description = item.task_description;
                            var count = task_title.length;
                            var count_description=task_description.length;
                            if (count >= 25) {
                                task_title = task_title.slice(0, 20)+"...";
                            }else if(count_description>=40){
                                task_description = task_description.slice(0,34)+"...";
                            }
                            return (
                                <View style={{ flex: 1, backgroundColor: '#FAF9F9', justifyContent: 'center', alignItems: 'center'}}>
                                    <View style={{padding:15}} >
                                        <View style={{
                                            backgroundColor: '#ffff',
                                            marginHorizontal: 10,
                                            marginVertical: 10,
                                            borderRadius: 8,
                                            paddingVertical: 20,
                                            paddingHorizontal: 15,
                                            marginBottom: 16,
                                            height: 280,
                                            width: width - 40,
                                            shadowColor: 'green',
                                            shadowOpacity: 0.1,
                                            elevation: 4,
                                            borderWidth: 1,
                                            borderColor: '#71B7B7',
                                            flexDirection: 'row',
                                        }}>
                                             <TouchableOpacity onPress={()=>this.props.navigation.navigate("Profilefriend", { first_name: item.task_owner_first_name, last_name:item.task_owner_last_name, _id:item.task_owner_id})} style={styles.imageview}>
                                             <Image source={item.task_owner_avatar?{ uri: item.task_owner_avatar}:avatarimage} style={styles.image}></Image>
                                         </TouchableOpacity>
                                            <View style={{ flexDirection: 'column', flex: 1, marginLeft: 10, fontWeight: 'bold', padding: 10, width: width - 70 }}>
                                                <View style={{ width: width - 150, flexDirection: 'column' }}>
                                                    <TouchableOpacity onPress={() => this.props.navigation.navigate("Detail",{_task_id:item._id})} style={{ flexDirection: 'row'}}>
                                                         <Text style={{ fontWeight: 'bold', fontSize: 22, color: '#71B7B7' }}>{task_title}</Text>
                                                    </TouchableOpacity>
                                                    <View style={{ marginTop: 10, flexDirection: 'row',paddingRight:10 }}>
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
                                                        <View style={{ marginTop: 10}}>
                                                            <Text>{task_description}</Text>
                                                            <TouchableOpacity onPress={() => this.props.navigation.navigate("Detail",{_task_id:item._id})}>
                                                                <Text style={{ color: "red" }}> see detail</Text>
                                                            </TouchableOpacity>
                                                        </View>
                                                    </View>
                                                </View>
                                            </View>
                                        </View>
                                    </View>
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

                <Modal transparent={true}
                    visible={this.state.show}
                    animationType='slide'
                >
                    <TouchableWithoutFeedback onPress={Keyboard.dismiss} style={{ backgroundColor: '#000000aa', flex: 1, }} >
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
                                    <TouchableOpacity style={styles.apply} onPress={this.applyJob}>
                                        <Text style={{ color: '#ffff', fontSize: 20 }}>Apply</Text>
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
                            <TouchableOpacity onPress={() => this.setState({ shownotice: false })} style={{
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

export default Listrecommend;
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
        height: 360,
        shadowOffset: { width: 0, height: 0 },
        shadowColor: 'green',
        shadowOpacity: 0.1,
        elevation: 4,
        borderWidth: 1,
        borderColor: '#71B7B7',
        flexDirection: 'column',
    },
    header0: {
        height: height * 0.08,
        shadowOffset: { width: 0, height: 3 },
        paddingLeft: 10,
        paddingTop:15,
        backgroundColor: '#faf9f9'
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
    nof: {
        backgroundColor: '#71B7B7',
        height: 250,
        borderRadius: 10,
        marginHorizontal: 16,
        marginVertical: 15
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
        backgroundColor: '#ffff',
        borderRadius: 100,
    },
    imageview: {
        shadowOffset: { width: 0, height: 3 },
        shadowColor: 'green',
        shadowOpacity: 0.5,
        elevation: 5,
        borderColor: '#71B7B7',
        width:70,
        height: 70,
        marginTop:10,
        borderRadius: 100,
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
    image: {
        width:70,
        height:70,
        borderRadius: 100,
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
