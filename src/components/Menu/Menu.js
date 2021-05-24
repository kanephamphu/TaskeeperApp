import React, { PureComponent } from 'react'
import { View, Text, Switch, StyleSheet, TouchableOpacity, TextInput, Image, ScrollView, Dimensions, SafeAreaView } from 'react-native'
import jwt_decode from 'jwt-decode'
import io from 'socket.io-client/dist/socket.io'
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-community/async-storage';
import { MaterialIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { SimpleLineIcons } from '@expo/vector-icons';
import Collapsible from 'react-native-collapsible';
import { Entypo } from "@expo/vector-icons";
import avatar1 from '../../images/avatar11.png'
import ShimmerPlaceholder from 'react-native-shimmer-placeholder';
import {socket} from "../../Socket.io/socket.io";
import AppText from '../app-text';
import { connect } from 'react-redux';
import * as actions from '../../actions/index';
const { height, width } = Dimensions.get('window');
var e;
class New extends PureComponent {
    constructor(props) {
        super(props);
        e = this;
        this.state = {
            first_name: '',
            last_name: '',
            email: '',
            username: '',
            id: '',
            phone_number: '',
            secret_key: '',
            collapsed: true,
            collapsed1: true,
            showPass: true,
            press: false,
            switchValue: false,
            old_password: '',
            new_password: '',
            confirm_password: '',
            nof: '',
            _user_id: "",
            avatar: '',
            day_of_birth: '',
            gender: '',
            month_of_birth: '',
            working_information: '',
            year_of_birth: '',
            education: [],
            isLoading: false,
            follower_number:'',
            following_number:'',
            showtick:false
        }
        this.onSubmitPassword = this.onSubmitChangePassword.bind(this)
      socket.on("sv-change-password", function (data) {
            if (data.success == false) {
                var dataserver = data.errors
                console.log(JSON.stringify(dataserver))
                if (data.errors.old_password) {
                    e.setState({
                        nof: dataserver.old_password.message
                    });
                } else if (data.errors.new_password) {
                    e.setState({
                        nof: dataserver.new_password.message
                    });
                } else if (data.errors.confirm_password) {
                    e.setState({
                        nof: dataserver.confirm_password.message
                    });
                }
            } else {
                e.setState({
                    nof: 'Đổi mật khẩu thành công'
                })
            }
        })
       socket.on("sv-user-detail", function (data) {
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
                    working_information: list.working_information.working_details,
                    education: list.education_information,
                    avatar: list.avatar,
                    isLoading: true,
                    follower_number:list.follower_number,
                    following_number: list.following_number
                })
               
            } else {
                console.log(data.erro)
            }
        })

    }
    setLanguage = language => {
        this.setState({ language });
        this.props.setLanguage(language);
    }
    toggleExpanded = () => {
        this.setState({ collapsed: !this.state.collapsed })
    }
    toggleExpanded1 = () => {
        this.setState({ collapsed1: !this.state.collapsed1 })
    }
    showPass = () => {
        if (this.state.press == false) {
            this.setState({ showPass: false, press: true })
        } else {
            this.setState({ showPass: true, press: false })
        }

    }
    componentDidMount = async () => {
        const token = await AsyncStorage.getItem("token")
        const decode = jwt_decode(token)
        this.setState({
            _user_id: decode._id,
        })
        const detail = {
            _user_id: this.state._user_id
        }
       socket.emit("cl-user-detail", detail)
    }
    logout = async () => {
        var token = await AsyncStorage.getItem('token')
        socket.emit("client-send-logout-request", token)
        try {
            await AsyncStorage.removeItem('token');
        } catch (e) {
            console.log(e);
        }
        this.props.navigation.navigate('Login')
      
    }
    onSubmitChangePassword = async () => {
        if (this.state.new_password != this.state.confirm_password) {
            alert('không khớp')
        } else {
            var token1 = await AsyncStorage.getItem('token')
            const newpassword = {
                secret_key: token1,
                old_password: this.state.old_password,
                new_password: this.state.new_password,
                confirm_password: this.state.confirm_password
            }
            socket.emit("cl-change-password", newpassword)
        }
    }
    render() {
        const { language } = this.props;
        const isVNLang = language === 'en' ? true : false;
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.header0}>
                <AppText style={{ fontWeight: 'bold', fontSize: 25, color: '#2d7474', marginLeft: 15, marginTop: -2 }} i18nKey={'menu'}>Menu</AppText>
                </View>
                <ScrollView>
                    <View style={styles.header}>
                        <View style={{ flexDirection: 'row' }}>
                            <TouchableOpacity onPress={() => this.props.navigation.navigate("ProfileUser",
                                { first_name: this.state.first_name, last_name: this.state.last_name, _id: this.state._user_id })} style={{
                                    borderColor: '#71B7B7',
                                    shadowOffset: { width: 0, height: 3 },
                                    shadowOpacity: 0.5,
                                    height: 120,
                                    borderRadius: 30,
                                    width: 150, marginTop: 10,
                                    borderColor: 'green',
                                    marginLeft: 10, elevation: 10
                                }}>
                                    <ShimmerPlaceholder style={{ height: 120, width:150, borderRadius: 30 }} autoRun visible={this.state.isLoading}>
                                    <Image source={this.state.avatar ? { uri: this.state.avatar } : avatar1}
                                    style={styles.Image} />
                                    </ShimmerPlaceholder>
                            </TouchableOpacity>
                            <View style={{ flexDirection: 'column', marginTop: 35, marginRight: 25,marginLeft: 20}}>
                                <TouchableOpacity onPress={() => this.props.navigation.navigate("ProfileUser", {
                                    first_name: this.state.first_name, last_name: this.state.last_name,
                                    _id: this.state._user_id
                                })}> 
                                    <ShimmerPlaceholder style={{ height: 45, marginTop: 2, borderRadius: 7,width:180}} autoRun visible={this.state.isLoading}>
                                        <Text style={{ fontWeight: 'bold', fontSize: 30 }}>{this.state.first_name} {this.state.last_name}</Text>
                                    </ShimmerPlaceholder>

                                </TouchableOpacity>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between',marginTop: 10,width:180 }}>
                                    <View style={{ flexDirection: 'row' }} >
                                        <SimpleLineIcons style={{ marginRight: 3 }} name="user-follow" size={12} color="#71B7B7" />
                                        <TouchableOpacity style={{ flexDirection: 'row' }} onPress={()=>this.props.navigation.navigate("Listfollower",{ _id: this.state._user_id})}>
                                        <AppText i18nKey={'home_menu.follower'} style={{ fontSize: 12 }}>
                                        Follower 
                                        </AppText>
                                        <Text style={{ fontSize: 12 }}> {this.state.follower_number}</Text>
                                        </TouchableOpacity>
                                       
                                    </View>
                                    <View style={{ flexDirection: 'row', marginLeft: 30 }} >
                                        <SimpleLineIcons style={{ marginRight: 3 }} name="user-following" size={12} color="#71B7B7" />
                                        <AppText i18nKey={'home_menu.following'} style={{ fontSize: 12 }}>
                                        Following 
                                        </AppText>
                                        <Text style={{ fontSize: 12 }}> {this.state.following_number}</Text>
                                    </View>
                                </View>
                            </View>
                        </View>

                    </View>

                    <View style={styles.body}>
                        <View style={{
                            marginTop: 10,
                            paddingTop: 8
                        }}>
                           
                        </View>
                        <View style={{
                            flexDirection: 'row',
                            borderBottomWidth: 2, borderColor: '#71B7B7',
                            height: height * 0.07, paddingTop: 8
                        }}>
                            <Ionicons style={{ marginLeft: 20 }} name="md-settings" size={30} color="#71B7B7" />
                            <AppText style={{ fontSize: 23, marginLeft: 15 }} i18nKey={'home_menu.setting'}>Settings</AppText>
                        </View>
                        <View>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate("Savetask")} style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <View style={{ flexDirection: 'row',marginLeft:5 }}>
                                    <View style={styles.texticon}>
                                        <AppText style={styles.text} i18nKey={'home_menu.savejob'}>Save jobs</AppText>
                                    </View>
                                </View>
                                <View style={styles.iconstyle}>
                                    <MaterialIcons name="navigate-next" size={30} color="#71B7B7" />
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={this.toggleExpanded} style={{ flexDirection: 'row',marginLeft:5 }}>
                              
                                <View style={styles.texticon}>
                                    <AppText style={styles.text} i18nKey={'home_menu.changpass'}>Change Password</AppText>
                                </View>
                            </TouchableOpacity>
                            <Collapsible collapsed={this.state.collapsed}>

                                <View style={{ flexDirection: 'column', alignItems: 'center' }}>

                                    <TextInput
                                        style={styles.input}
                                        placeholder={'Password'}
                                        onChangeText={(old_password) => this.setState({ old_password })}
                                        value={this.state.old_password}
                                        placeholderTextColor={'#2d7474'}
                                        underlineColorAndroid='transparent'
                                        secureTextEntry={this.state.showPass}
                                    >
                                    </TextInput>
                                    <TextInput
                                        style={styles.input}
                                        placeholder={'New Password'}
                                        onChangeText={(new_password) => this.setState({ new_password })}
                                        value={this.state.new_password}
                                        placeholderTextColor={'#2d7474'}
                                        underlineColorAndroid='transparent'
                                        secureTextEntry={this.state.showPass}
                                    >
                                    </TextInput>
                                    <TextInput
                                        style={styles.input}
                                        placeholder={'Confirm new Password'}
                                        onChangeText={(confirm_password) => this.setState({ confirm_password })}
                                        value={this.state.confirm_password}
                                        placeholderTextColor={'#2d7474'}
                                        underlineColorAndroid='transparent'
                                        secureTextEntry={this.state.showPass}
                                    >
                                    </TextInput>
                                    <View><Text>{this.state.nof}</Text></View>
                                    <TouchableOpacity onPress={this.onSubmitPassword} style={styles.btnLogin}>
                                    <AppText style={{ fontSize: 18, fontWeight: 'bold', color: '#ffff' }} i18nKey={'home_menu.save'}>Save</AppText>
                                    </TouchableOpacity>

                                </View>

                            </Collapsible>
                        </View>
                        <View>
                            <TouchableOpacity onPress={this.toggleExpanded1} style={{ flexDirection: 'row',marginLeft:5 }}>
                               
                                <View style={styles.texticon}>
                                    <AppText style={styles.text} i18nKey={'home_menu.lang'}>Language</AppText>
                                </View>
                            </TouchableOpacity>
                            <Collapsible collapsed={this.state.collapsed1}>

                                <View style={{ flexDirection: 'column',borderWidth:1,margin:10,borderColor:'gray',paddingBottom:10,borderRadius: 10}}>
                                    <TouchableOpacity onPress={()=>{this.setLanguage('en');this.setState({showtick:false})}} style={{marginLeft: 15,marginTop:10,flexDirection:'row'}}>
                                        <AppText i18nKey={'home_manage.english'} style={{fontSize: 16,color:'#2d7474',paddingTop:5}}>English</AppText>
                                        {this.state.showtick==false?<Entypo name="check" size={20} color="#71B7B7" />:null}
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={()=>{this.setLanguage('vi');this.setState({showtick:true})}} style={{marginLeft: 15,marginTop:10,flexDirection:'row'}}>
                                        <AppText i18nKey={'home_manage.vietnam'} style={{fontSize: 16,color:'#2d7474',paddingTop:5}}>Vietnamese</AppText>
                                        {this.state.showtick==true?<Entypo name="check" size={20} color="#71B7B7" />:null}
                                    </TouchableOpacity>

                                </View>

                            </Collapsible>

                        </View>
                        <TouchableOpacity style={{ flexDirection: 'row', justifyContent: "space-between" }}>
                            <View style={{ flexDirection: 'row',marginLeft:5 }}>
                               
                                <View style={styles.texticon}>
                                <AppText style={styles.text} i18nKey={'home_menu.notification'}>Notification</AppText>
                                </View>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={{ flexDirection: 'row',marginLeft:5 }}>
                           
                            <View style={styles.texticon}>
                                <AppText style={styles.text} i18nKey={'home_menu.help'}>Help</AppText>
                            </View>
                        </TouchableOpacity>

                        <View style={{
                            flexDirection: 'row', marginTop: 10,
                            borderBottomWidth: 2, borderColor: '#71B7B7',
                            height: height * 0.07, paddingTop: 8
                        }}>
                            <MaterialIcons style={{ marginLeft: 18 }} name="payment" size={30} color="#71B7B7" />
                            <AppText style={{ fontSize: 23, marginLeft: 15 }} i18nKey={'home_menu.payment'}>Payment</AppText>
                        </View>
                        <TouchableOpacity style={{ flexDirection: 'row',marginLeft:5,justifyContent:'space-between'  }} onPress={() => this.props.navigation.navigate("HomePayment")} >
                          
                            <View style={styles.texticon}>
                                <Text style={styles.text}>PayPal,Visa</Text>
                            </View>
                            <View style={styles.iconstyle}>
                                    <MaterialIcons name="navigate-next" size={30} color="#71B7B7" />
                                </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={{ flexDirection: 'row',marginLeft:5,justifyContent:'space-between' }} onPress={() => this.props.navigation.navigate("Ewallet")} >
                            <View style={styles.texticon}>
                                <Text style={styles.text}>E Wallet</Text>
                            </View>
                            <View style={styles.iconstyle}>
                                    <MaterialIcons name="navigate-next" size={30} color="#71B7B7" />
                                </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={this.logout} style={{
                            flexDirection: 'row', marginTop: 5,
                            height: height * 0.07, paddingTop: 8,marginBottom:10
                        }}>
                            <View style={styles.iconstyle}>
                                <AntDesign name="logout" size={30} color="#71B7B7" />
                            </View>
                            <View style={styles.texticon}>
                            <AppText style={styles.text} i18nKey={'home_menu.logout'}>Log out</AppText>
                            </View>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </SafeAreaView>




        )
    }
}

const mapStateToProps = state => {
	return {
		language: state.languageReducer.language
	};
};

const mapDispatchToProps = dispatch => {
    return {
        setLanguage: language => {
            dispatch(actions.changeLanguage(language));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(New);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#faf9f9',
    },
    header: {
        height: height * 0.20,
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.2,
        shadowOpacity: 0.2,
        elevation: 2,
        flexDirection: 'column',

    },
    iconstyle: {
        marginTop: 10,
        width: 50,
        alignItems: 'center',
        justifyContent: 'center',
    },
    texticon: {
        width: 300,

    },
    text: {
        fontSize: 20, marginLeft: 10, marginTop: 10
    },
    btnLogin: {
        width: 300,
        height: 45,
        borderRadius: 10,
        backgroundColor: '#71B7B7',
        marginTop: 5,
        justifyContent: 'center',
        alignItems: 'center',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.2,
        shadowOpacity: 0.2,
        elevation: 1,
        borderColor: '#71B7B7',
        borderWidth: 2
    },
    input: {
        width: 300,
        height: 40,
        borderRadius: 10,
        fontSize: 16,
        paddingLeft: 20,
        paddingTop: -10,
        borderWidth: 1,
        backgroundColor: '#fff',
        color: '#2d7474',
        marginHorizontal: 25,
        marginTop: 10,
    },
    iconmore: {
        marginLeft: 15, marginTop: 10
    },
    body: {
        borderColor: '#71B7B7',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.2,
        shadowOpacity: 0.2,
        elevation: 2,
        marginTop: 5,
    },
    Image: {
        height: 119,
        width: 149,
        borderRadius: 30
    },
    header0: {
        height: height * 0.08,
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.2,
        paddingLeft: 10,
        paddingTop:15,
        shadowOpacity: 0.2,
        elevation: 1,
      
    },
})
