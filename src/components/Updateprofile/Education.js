import React, { Component } from "react";
import { Modal, View, TouchableOpacity, TextInput, Text, StyleSheet, ScrollView, Alert, Dimensions, Image, ActivityIndicator } from "react-native";
import DropDownPicker from 'react-native-dropdown-picker';
import { Entypo } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import jwt_decode from 'jwt-decode';
import io from 'socket.io-client/dist/socket.io';
import AsyncStorage from '@react-native-community/async-storage';
import { AntDesign } from '@expo/vector-icons';
import iconsuccess from '../../images/icon1.png';
import iconerror from '../../images/icon2.png';
import iconwarning from '../../images/icon3.png';
import Swipeout from 'react-native-swipeout'

var e;
const { height, width } = Dimensions.get('window');
class Education extends Component {
    constructor(props) {
        super(props);
        e = this;
        this.socket = io('https://taskeepererver.herokuapp.com', { jsonp: false })
        this.state = {
            totalSteps: "",
            currentStep: "",
            secret_key: '',
            first_name: '',
            last_name: '',
            email: '',
            phone_number: '',
            gender: '',
            day_of_birth: '',
            month_of_birth: '',
            year_of_birth: '',
            school_name: '',
            description: '',
            show: false,
            refreshing: false,
            _user_id: '',
            data: [],
            time_type: '',
            from_time: '',
            to_time: '',
            loadingdata: false,
            showedit: false,
            edu_id: '',
            shownotice: false,
            notice: '',
            key: '',
            keycheck: '',
            showarning:false,
            show1:false,
            school_nameedit: '',
            descriptionedit: '',
            time_typeedit: '',
            from_timeedit: '',
            to_timeedit: '',

        };
        this.onEdit = this.onEdit.bind(this);
        this.onDelete = this.onDelete.bind(this);
        this.onSubmit = this.onSubmit.bind(this)
        this.socket.on('sv-new-edu', function (data) {
            if (data.success == true) {
                e.setState({
                    show: false,
                    shownotice: true,
                    notice: 'Thêm thành công!',
                    key: "success"
                })

            }
            else if (data.success == false) {

                if (data.errors.school_name) {
                    e.setState({
                        shownotice: true,
                        notice: 'Chưa điền tên trường học !',
                        key: "error",
                        keycheck: 'school_name'
                    })
                } else if (data.errors.time_type) {
                    e.setState({
                        shownotice: true,
                        notice: 'Chưa chọn kiểu thời gian !',
                        key: "error",
                        keycheck: 'time_type'
                    })
                } else if (data.errors.from_time) {
                    e.setState({
                        shownotice: true,
                        notice: 'Chưa chọn năm bắt đầu !',
                        key: "error",
                        keycheck: 'from_time'
                    })
                } else if (data.errors.to_time) {
                    e.setState({
                        shownotice: true,
                        notice: 'Chưa chọn năm kết thúc !',
                        key: "error",
                        keycheck: 'to_time'
                    })
                } else if (data.errors.description) {
                    e.setState({
                        shownotice: true,
                        notice: 'Chưa điền miêu tả trường học !',
                        key: "error",
                        keycheck: 'description'
                    })
                }
            }
        });
        this.socket.on('sv-edu-info-detail', function (data) {
            if (data.success == true) {
                e.setState({
                    data: data.data.reverse(),
                    loadingdata: true
                })

            }
            else if (data.success == false) {
                console.log(JSON.stringify(data))
            }
        });
        this.socket.on("sv-delete-edu", function (data) {
            if (data.success == true) {
                e.setState({
                    show1: true,
                    notice: 'Xóa thành công!',
                    key: "success"
                })
            }
            else if (data.success == false) {
                console.log(JSON.stringify(data))
            }
        })
        this.socket.on("sv-edit-edu", function (data) {
            if (data.success == true) {
                e.setState({
                    showedit: false,
                    shownotice: true,
                    notice: 'Sửa thành công!',
                    key: "success"
                })
            }
            else if (data.success == false) {
                if (data.errors.school_name) {
                    e.setState({
                        shownotice: true,
                        notice: 'Chưa điền tên trường học !',
                        key: "error",
                        keycheck: 'school_name'
                    })
                } else if (data.errors.description) {
                    e.setState({
                        shownotice: true,
                        notice: 'Chưa điền miêu tả trường học !',
                        key: "error",
                        keycheck: 'description'
                    })
                } else if (data.errors.time_type) {
                    e.setState({
                        shownotice: true,
                        notice: 'Chưa chọn kiểu thời gian !',
                        key: "error",
                        keycheck: 'time_type'
                    })
                } else if (data.errors.from_time) {
                    e.setState({
                        shownotice: true,
                        notice: 'Chưa chọn năm bắt đầu !',
                        key: "error",
                        keycheck: 'from_time'
                    })
                } else if (data.errors.to_time) {
                    e.setState({
                        shownotice: true,
                        notice: 'Chưa chọn năm kết thúc !',
                        key: "error",
                        keycheck: 'to_time'
                    })
                }
            }
        })

    }
    componentDidMount = async () => {
        this.onRefresh()
    }
    onRefresh = async () => {
        const token = await AsyncStorage.getItem('token');
        const decode = jwt_decode(token)
        var dataitem = [];
        for (var i = 1990; i <= 2020; i++) {
            dataitem.push({ value: "" + i + "", label: "" + i + "" });
        }
        e.setState({
            secret_key: token,
            _user_id: decode._id
        })
        const inforeducation = {
            _user_id: this.state._user_id
        }
        this.socket.emit("cl-edu-info-detail", inforeducation)

    }
    onSubmit() {
        const addEducation = {
            secret_key: this.state.secret_key,
            school_name: this.state.school_name,
            description: this.state.description,
            time_type: this.state.time_type.value,
            from_time: this.state.from_time.value,
            to_time: this.state.to_time.value,
        }
        this.socket.emit("cl-new-edu", addEducation)

        this.onRefresh()

    }
    onDelete(_id) {
        const deleteedu = {
            secret_key: this.state.secret_key,
            education_id: _id
        }
        this.socket.emit("cl-delete-edu", deleteedu)
      
        this.onRefresh()
    }
    onEdit() {
        const editEducation = {
            secret_key: this.state.secret_key,
            edu_id: this.state.edu_id,
            school_name: this.state.school_nameedit,
            description: this.state.descriptionedit,
            time_type: this.state.time_typeedit,
            from_time: this.state.from_timeedit,
            to_time: this.state.to_timeedit,

        }
        this.socket.emit("cl-edit-edu", editEducation)
     
        this.onRefresh()
    }
    setInput(edu_id, school_name, description, time_type, from_time, to_time) {
        this.setState({
            school_nameedit: school_name,
            descriptionedit: description,
            time_typeedit: time_type,
            from_timeedit: from_time,
            to_timeedit: to_time,
            edu_id: edu_id
        })
    }
    setInputdelete(edu_id){
        this.setState({
            edu_id: edu_id
        })
    }
    render() {
        const swipeSetting = {
            right: [
                {
                    onPress: () => {

                    },
                    text: 'Delete', type: 'delete'
                }
            ]
        }
        return (
            <View style={styles.container}>
                {!this.state.loadingdata == true ?
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <ActivityIndicator size='large'></ActivityIndicator>
                    </View>
                    :
                    <ScrollView  >
                        {this.state.data.map((item) => {
                            return (
                                <View key={item._id} style={{
                                    flexDirection: 'column', margin: 10
                                    , backgroundColor: '#ffff', shadowOffset: { width: 0, height: 0 },
                                    shadowColor: 'green',
                                    shadowOpacity: 0.1,
                                    elevation: 4,
                                    borderWidth: 1,
                                    borderColor: '#71B7B7', padding: 5,

                                }}>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                        <View style={{ flexDirection: 'row' }}>
                                            <View >
                                                <MaterialCommunityIcons name="cast-education" size={24} color="#555555" />
                                            </View>
                                            <View style={{ marginLeft: 5, padding: 5, width: width - 100 }}>
                                                <Text>
                                                    Education at
                                            <Text style={{ fontWeight: 'bold' }}> {item.school_name}</Text>
                                                </Text>
                                            </View>
                                        </View>
                                        <TouchableOpacity onPress={() => {
                                            this.setState({  showarning:true});
                                            this.setInputdelete(item._id)
                                        } }>
                                            <AntDesign name="closecircleo" size={20} color="red" />
                                        </TouchableOpacity>
                                    </View>

                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 5 }}>
                                        <View style={{ flexDirection: 'column', marginLeft: 35, marginRight: 15, marginBottom: 5, width: width - 120 }}>
                                            <View>
                                                <Text>+ Education decription:</Text>
                                            </View>
                                            <View style={{ width: width - 130, marginLeft: 15 }}>
                                                <Text style={{ fontWeight: 'bold' }}>{item.description} </Text>
                                            </View>
                                            <View style={{ flexDirection: 'row' }}>
                                                <View>
                                                    <Text>+ Năm:</Text>
                                                </View>
                                                <View style={{ width: width - 130, marginLeft: 5 }}>
                                                    <Text style={{ fontWeight: 'bold' }}>{item.time_period.from_time}{item.time_period.to_time == null ? null : " - "}{item.time_period.to_time === null ? null : item.time_period.to_time}</Text>
                                                </View>
                                            </View>
                                        </View>
                                        <TouchableOpacity onPress={() => {
                                            this.setState({ showedit: true });
                                            this.setInput(item._id, item.school_name,
                                                item.description, item.time_period.time_type, item.time_period.from_time, item.time_period.to_time);
                                        }
                                        }
                                            style={{ justifyContent: 'flex-end' }}>
                                            <AntDesign name="edit" size={20} color="#71B7B7" />
                                        </TouchableOpacity>
                                    </View>
                                </View>

                            )
                        })}
                        <TouchableOpacity onPress={() => this.setState({ show: true })} style={{ justifyContent: 'center', alignItems: 'center' }}>
                            <Ionicons name="ios-add-circle" size={40} color="#71B7B7" />
                            <Text style={{ color: '#71B7B7', fontWeight: 'bold' }}>Add education</Text>
                        </TouchableOpacity>
                        <Modal transparent={true}
                            visible={this.state.show}
                            animationType='slide'
                        >
                            <ScrollView>
                                <View style={{ width: "100%", height: height, backgroundColor: "#ffff", flexDirection: 'column' }}>
                                    <View style={{ flexDirection: 'column', flex: 1, alignItems: 'center' }}>
                                        <View style={{ marginTop: 10 }}>
                                            <Text style={{ fontWeight: 'bold', fontSize: 20 }} >Add education </Text>
                                        </View>
                                        <View style={{ marginTop: 10 }}>
                                            <Text >Education name:</Text>
                                        </View>
                                        <View style={{ backgroundColor: '#ffff', borderWidth: 1, width:315, paddingLeft: 10, marginTop: 10, borderColor:'#71B7B7', borderWidth: 1, borderRadius: 3 }}>
                                            <TextInput multiline={true}  placeholder="Education name" onChangeText={(school_name) => this.setState({ school_name })} ></TextInput>
                                        </View>
                                        <View style={{ marginTop: 10 }}>
                                            <Text>Time:</Text>
                                        </View>
                                        <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 10, height: 30 }}>
                                            <DropDownPicker
                                                items={[
                                                    { label: 'present', value: 'present' },
                                                    { label: 'past', value: 'past' },
                                                ]}
                                                defaultNull
                                                placeholder="Time type"
                                                onChangeItem={(time_type) => this.setState({ time_type })}
                                                style={{
                                                    backgroundColor: '#ffff',
                                                    width: 105,
                                                    height: height,
                                                    borderColor:'#71B7B7',
                                                    borderWidth: 1,
                                                }}
                                            />
                                            <DropDownPicker
                                                items={[
                                                    { label: '2000', value: 2000 },
                                                    { label: '2100', value: 2100 },
                                                ]}
                                                defaultNull
                                                placeholder="From"
                                                onChangeItem={(from_time) => this.setState({ from_time })}
                                                style={{
                                                    backgroundColor: '#ffff',
                                                    width: 105,
                                                    height: height,
                                                    borderColor:'#71B7B7',
                                                    borderWidth: 1,
                                                }}
                                            />
                                            {
                                                this.state.time_type.value === "past" ?
                                                    <DropDownPicker
                                                        items={[
                                                            { label: '2000', value: 2000 },
                                                            { label: '2100', value: 2100 },
                                                        ]}
                                                        defaultNull
                                                        placeholder="To"
                                                        onChangeItem={(to_time) => this.setState({ to_time })}
                                                        style={{
                                                            backgroundColor: '#ffff',
                                                            width:105,
                                                            height: height,
                                                            borderColor:'#71B7B7',
                                                            borderWidth: 1,
                                                        }}
                                                    /> : null
                                            }
                                        </View>
                                        <View style={{ marginTop: 10 }}>
                                            <Text>Education description:</Text>
                                        </View>
                                        <View style={{ backgroundColor: '#ffff', width:315, height:height*0.5, paddingLeft: 10, marginTop: 10, borderColor:'#71B7B7', borderWidth: 1, borderRadius: 3 }}>
                                            <TextInput multiline={true} placeholder="Education description" onChangeText={(description) => this.setState({ description })} ></TextInput>
                                        </View>
                                        <View style={{ flexDirection: 'row', margin: 20, justifyContent: 'space-between' }}>
                                            <TouchableOpacity onPress={() => this.setState({ show: false })} style={styles.btnLogin}>
                                                <Text style={{ fontSize: 20, color: '#ffff' }}>Cancel</Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity onPress={this.onSubmit} style={styles.btnLogin1}>
                                                <Text style={{ fontSize: 20, color: '#ffff' }}>Add</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </View>
                            </ScrollView>
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
                        <Modal transparent={true}
                            visible={this.state.showarning}
                            animationType='slide'
                            style={{ justifyContent: 'center', alignItems: 'center' }}
                        >
                            <View style={{ backgroundColor: '#000000aa', flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                {this.state.show1===false
                                ?
                                <View style={{
                                    backgroundColor: '#faf9f9', borderRadius: 20,
                                    height: "30%", width: "70%", justifyContent: 'center', alignItems: 'center'
                                }}>
                                    <Image source={iconwarning} style={{ height: 50, width: 50 }}></Image>
                                    <Text>Bạn có thật sự muốn xóa !</Text>
                                    <View style={{ flexDirection: 'row',justifyContent:'space-between',width:"70%"}}>
                                    <TouchableOpacity onPress={() => this.setState({ showarning: false })} style={{
                                        width: "50%", backgroundColor: '#71B7B7',
                                        height: 30, borderRadius: 10, marginTop: 15, justifyContent: 'center', alignItems: 'center',marginRight: 5
                                    }}>
                                        <Text style={{ color: "white", fontSize: 15, fontWeight: 'bold' }}>Trở về</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => this.onDelete(this.state.edu_id)} style={{
                                        width: "50%", backgroundColor: '#71B7B7',
                                        height: 30, borderRadius: 10, marginTop: 15, justifyContent: 'center', alignItems: 'center',marginLeft: 5
                                    }}>
                                        <Text style={{ color: "white", fontSize: 15, fontWeight: 'bold' }}>Ok</Text>
                                    </TouchableOpacity>
                                    </View>
                                </View>
                                :
                                <View style={{
                                    backgroundColor: '#faf9f9', borderRadius: 20,
                                    height: "30%", width: "70%", justifyContent: 'center', alignItems: 'center'
                                }}>
                                    <Image source={this.state.key === "success" ? iconsuccess : iconerror} style={{ height: 50, width: 50 }}></Image>
                                    <Text>{this.state.notice}</Text>
                                    <TouchableOpacity onPress={() => this.setState({ showarning:false,show1:false })} style={{
                                        width: "50%", backgroundColor: this.state.key === "success" ? 'green' : 'red',
                                        height: 30, borderRadius: 10, marginTop: 15, justifyContent: 'center', alignItems: 'center'
                                    }}>
                                        <Text style={{ color: "white", fontSize: 15, fontWeight: 'bold' }}>Ok</Text>
                                    </TouchableOpacity>
                                </View>
                                }
                                
                            </View>
                        </Modal>
                        <Modal transparent={true}
                            visible={this.state.showedit}
                            animationType='slide'
                        >
                            <ScrollView>
                                <View style={{ width: "100%", height: height, backgroundColor: "#ffff", flexDirection: 'column' }}>
                                    <View style={{ flexDirection: 'column', flex: 1, alignItems: 'center' }}>
                                        <View style={{ marginTop: 10 }}>
                                            <Text style={{ fontWeight: 'bold', fontSize: 20 }} >Edit education </Text>
                                        </View>
                                        <View style={{ marginTop: 10 }}>
                                            <Text >Education name:</Text>
                                        </View>
                                        <View style={{ backgroundColor: '#ffff', borderWidth: 1, width:315, paddingLeft: 10, marginTop: 10, borderColor: '#71B7B7', borderWidth: 1, borderRadius: 3 }}>
                                            <TextInput multiline={true} placeholder="Education name" onChangeText={(school_nameedit) => this.setState({ school_nameedit })} value={this.state.school_nameedit} ></TextInput>

                                        </View>
                                        <View style={{ marginTop: 10 }}>
                                            <Text>Time:</Text>
                                        </View>
                                        <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 10, height: 30 }}>
                                            <DropDownPicker
                                                items={[
                                                    { label: 'present', value: 'present' },
                                                    { label: 'past', value: 'past' },
                                                ]}
                                                defaultNull
                                                placeholder="Time type"
                                                onChangeItem={(time_typeedit) => this.setState({ time_typeedit: time_typeedit.value })}
                                                defaultValue={this.state.time_typeedit}
                                                style={{
                                                    backgroundColor: '#ffff',
                                                    width:105,
                                                    height: height,
                                                    borderColor:'#71B7B7',
                                                    borderWidth: 1,
                                                }}
                                            />
                                            <DropDownPicker
                                                items={[
                                                    { label: '2000', value: 2000 },
                                                    { label: '2100', value: 2100 },
                                                ]}
                                                defaultNull
                                                placeholder="From"
                                                onChangeItem={(from_timeedit) => this.setState({ from_timeedit: from_timeedit.value })}
                                                defaultValue={this.state.from_timeedit}
                                                style={{
                                                    backgroundColor: '#ffff',
                                                    width:105,
                                                    height: height,
                                                    borderColor:'#71B7B7',
                                                    borderWidth: 1,
                                                }}
                                            />
                                            {
                                                this.state.time_typeedit === "past" ?
                                                    <DropDownPicker
                                                        items={[
                                                            { label: '2000', value: 2000 },
                                                            { label: '2100', value: 2100 },
                                                        ]}
                                                        defaultNull
                                                        placeholder="To"
                                                        onChangeItem={(to_timeedit) => this.setState({ to_timeedit: to_timeedit.value })}
                                                        defaultValue={this.state.to_timeedit}
                                                        style={{
                                                            backgroundColor: '#ffff',
                                                            width:105,
                                                            height: height,
                                                            borderColor:'#71B7B7',
                                                            borderWidth: 1,
                                                        }}
                                                    /> : null
                                            }
                                        </View>
                                        <View style={{ marginTop: 10 }}>
                                            <Text>Education description:</Text>
                                        </View>
                                        <View style={{ backgroundColor: '#ffff', borderWidth: 1, width:315, height:height*0.5, paddingLeft: 10, marginTop: 10, borderColor: '#71B7B7', borderWidth: 1, borderRadius: 3 }}>
                                            <TextInput multiline={true} value={this.state.descriptionedit} placeholder="Education description" onChangeText={(descriptionedit) => this.setState({ descriptionedit })} ></TextInput>
                                        </View>
                                        <View style={{ flexDirection: 'row', margin: 20, justifyContent: 'space-between' }}>
                                            <TouchableOpacity onPress={() => this.setState({ showedit: false })} style={styles.btnLogin}>
                                                <Text style={{ fontSize: 20, color: '#ffff' }}>Cancel</Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity onPress={this.onEdit} style={styles.btnLogin1}>
                                                <Text style={{ fontSize: 20, color: '#ffff' }}>Save</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </View>
                            </ScrollView>
                        </Modal>
                    </ScrollView>

                }
            </View>
        );
    }
}

export default Education;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#faf9f9'
    },
    header0: {
        height: height * 0.08,
        shadowOffset: { width: 0, height: 3 },
        padding: 10,
        marginTop: Platform.OS == 'android' ? 25 : null,
        backgroundColor: '#faf9f9',

    },
    picker3: {
        backgroundColor: '#ffff',
        width: 110,
        height: height,
        borderWidth: 1,

    },
    btnContainer: {
        flexDirection: "row",
        justifyContent: "center",
    },
    btnStyle: {
        borderColor: "#71B7B7",
        borderWidth: 2,
        borderRadius: 100,
        width: 60,
        height: 60,
        justifyContent: "center",
        alignItems: "center"
    },
    btnLogin: {
        width: 120,
        height: 40,
        borderRadius: 10,
        backgroundColor: '#71B7B7',
        justifyContent: 'center',
        alignItems: 'center',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.2,
        shadowOpacity: 0.2,
        elevation: 3,
        marginTop: 10,
        borderColor: '#71B7B7',
        borderWidth: 1,
        marginRight:5
     
    },
    btnLogin1: {
        width: 120,
        height: 40,
        borderRadius: 10,
        backgroundColor: '#71B7B7',
        justifyContent: 'center',
        alignItems: 'center',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.2,
        shadowOpacity: 0.2,
        elevation: 3,
        marginTop: 10,
        borderColor: '#71B7B7',
        borderWidth: 1,
        marginLeft:5,
    },
    textall: {
        marginTop: 20,
        marginBottom: 8,
        marginLeft: 50,
        fontSize: 15
    },
    input: {
        justifyContent: 'center',
        flexDirection: 'row',
        backgroundColor: '#faf9f9',

    },
    textinput: {
        backgroundColor: '#ffff',
        borderRadius: 3,
        width: 300,
        height: 35,
        borderWidth: 1,
        padding: 10,
        borderColor: '#71B7B7'
    },
    textinput1: {
        backgroundColor: '#ffff',
        borderRadius: 3,
        width: 300,
        height: 300,
        borderWidth: 1,
        padding: 10,
        borderColor: '#71B7B7',

    },
    input1: {
        justifyContent: 'center',
    },
    picker1: {
        backgroundColor: '#ffff',
        width: 60,
        height: 30,
        marginRight: 10,
        borderWidth: 1,

    },
    picker2: {
        backgroundColor: '#ffff',
        width: 60,
        height: 60,
        marginRight: 10,

        borderWidth: 1,
    },

});