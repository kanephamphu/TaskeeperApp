import React, { Component } from 'react'
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    ImageBackground,
    TouchableOpacity,
    Image,
    Dimensions,
    Animated,
} from 'react-native'

import io from 'socket.io-client/dist/socket.io'
import AsyncStorage from '@react-native-community/async-storage';

const { width: WIDTH } = Dimensions.get('window')
var e;
class test extends Component {
    constructor(props) {
        super(props)
        e = this;
        this.socket = io('https://taskeepererver.herokuapp.com', { jsonp: false })
        this.state = {
            showPass: true,
            press: false,
            logoContainer: new Animated.Value(0),
            loadingspinner: false,
            loginquery: '',
            password: '',
            nof: '',
            errors: {},
            key:''
        }

        this.onSubmit1 = this.onSubmit.bind(this)
        this.socket.on("sv-send-login-res", async function (data) {
            if (data.success == true) {
                e.setState({
                  
                    key:''
                })
                var token = data.secret_key

                try {
                    await AsyncStorage.setItem("token", token)
                } catch (e) {
                    console.log(e)
                }
                e.props.navigation.push('Taskeeper')
            } else if (data.success == false) {
                var dataserver = data.errors
                console.log(data.errors)
                if (data.errors.loginquery) {
                    if(data.errors.loginquery.rule==='required'){
                        e.setState({
                            nof:'Please enter your email!',
                            key:'email'
                        });
                    }else{
                        e.setState({
                            nof:'The email address is invalid!',
                            key:'email'
                        });
                    }
                   
                } else if (data.errors.password) {
                    if(data.errors.password.rule=='required'){
                        e.setState({
                            nof:'Please enter your password!',
                            key:'pass'
                        });
                    }else  if(data.errors.password.rule=='wrong-password'){
                        e.setState({
                            nof:"Incorrect password!",
                            key:'pass'
                        });
                    }else if(data.errors.password.rule=='minLength'){
                        e.setState({
                            nof:"The password can not be less than 8!",
                            key:'pass'
                        });
                    }
                  
                } else if (data.errors.result.loginquery) {
                    e.setState({
                        nof:'Can not found the email!',
                        key:'email'
                    });
                } else if (data.errors.result.password) {
                    e.setState({
                        nof:"Incorrect password!",
                        key:'pass'
                    });
                }else if(data.errors.result.status.rule=='unVefiy'){
                    e.setState({
                        nof:"Account is not verify!",
                        key:''
                    });
                }
               
            }
        });
    }


    onSubmit() {
        const user = {
            loginquery: this.state.loginquery,
            password: this.state.password,
        }
        this.socket.emit("cl-send-login-req", user)

    }
    showPass = () => {
        if (this.state.press == false) {
            this.setState({ showPass: false, press: true })
        } else {
            this.setState({ showPass: true, press: false })
        }

    }
    componentDidMount() {
        const { logoContainer } = this.state;
        Animated.parallel([
            Animated.spring(logoContainer, {
                toValue: 1,
                tension: 10,
                friction: 2,
                duration: 1000,
                useNativeDriver: false
            }).start(),

        ]).start()
    }

    render() {
        return (
            <View  style={styles.imagebackground}>
                <Text>mange</Text>
            </View>
        )
    }
}
export default test;
const styles = StyleSheet.create({

    imagebackground: {
        flex: 1,
        width: null,
        height: null,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#faf9f9'

    },
    textnof: {
        color: 'red',
        fontStyle:'italic'
    },
    btnemailfb: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '20%',

    },
    textgmail: {
        alignContent: 'center',
        justifyContent: 'center'
    },
    inputIcon: {
        position: 'absolute',
        top: 15,
        left: 37,

    },

    signuptextcont: {
        flexGrow: 0.15,
        alignItems: 'flex-end',
        justifyContent: 'center',
        paddingVertical: 16,
        flexDirection: 'row',
    },
    logoContainer: {
        top: -300,
        left: -100,
    },
    logo: {
        width: 70,
        height: 70,
    },
    btnEye: {
        position: 'absolute',
        top: 20,
        right: 37,
    },
    logintext: {
        color: '#222222',
        alignContent: 'center',
        fontSize: 30,
        opacity: 1,
        marginEnd: -5,
    },
    logintext1: {
        color: '#222222',
        alignContent: 'center',
        fontSize: 15,
        marginTop: -10
    },
    logintext2: {
        color: '#222222',
        alignContent: 'center',
        fontSize: 15,
        marginTop: 5
    },
    input: {
        width: 300,
        height: 40,
        borderRadius: 10,
        fontSize: 16,
        paddingLeft: 45,
        paddingTop: -10,
        backgroundColor: '#fff',
        color: '#2d7474',
        marginHorizontal: 25,
        marginTop: 10,
        borderWidth: 1,
        borderColor: '#2d7474'
    },
    btnLogin: {
        width: 300,
        height: 45,
        borderRadius: 10,
        backgroundColor: '#2d7474',
        marginTop: 5,
        justifyContent: 'center'
    },
    btnSignup: {
        width: 300,
        height: 45,
        borderRadius: 10,
        backgroundColor: 'rgba(0,0,0,0.35)',
        marginTop: 5,
        justifyContent: 'center'
    },
    textlogin: {
        textAlign: 'center',
        color: '#ffff',
        fontWeight:'bold'
    }
});