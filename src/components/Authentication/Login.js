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
    TouchableWithoutFeedback,
    Keyboard
} from 'react-native'
import background from '../../images/anh1.png'
import logo from '../../images/logoblack.png'
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { Fontisto } from '@expo/vector-icons'; 
import io from 'socket.io-client/dist/socket.io'
import AsyncStorage from '@react-native-community/async-storage';
import {connect} from 'react-redux';
import * as actions from '../../actions';
import {socket} from "../../Socket.io/socket.io";
const { width: WIDTH } = Dimensions.get('window')
var e;
class Login extends Component {
    constructor(props) {
        super(props)
        e = this;
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
        socket.on("sv-send-login-res", async function (data) {
            if (data.success == true) {
                e.setState({
                    key:'' ,loginquery: '',
                    password: '',
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
       socket.emit("cl-send-login-req", user) 
    
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
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} style={styles.imagebackground}>
            <View  style={styles.imagebackground}>
                <Animated.View style={{
                    opacity: this.state.logoContainer,
                    top: this.state.logoContainer.interpolate({
                        inputRange: [0, 1],
                        outputRange: [80, 0]
                    })
                }}>
                    <Image source={logo} style={styles.logo}></Image>

                </Animated.View>
                <View>
                    <Text style={styles.logintext}>WELCOME BACK</Text>

                </View>
                <View>
                    <Text style={styles.logintext1}>Please sign in or create your account</Text>
                </View>
                <View>

                    <TextInput
                        style={{ width:300,
                            height:40,
                            borderRadius:10,
                            fontSize:16,
                            paddingLeft:45,
                            paddingTop:-10,
                            backgroundColor:'#ffff',
                            color:'#2d7474',
                            marginHorizontal:25,
                            marginTop:10,
                            borderWidth: 1,
                            borderColor:this.state.key==='email'?'red':'#2d7474'}}
                        placeholder={'Email'}
                        onChangeText={(loginquery) => this.setState({ loginquery })}
                        value={this.state.loginquery}
                        placeholderTextColor={'#2d7474'}
                        underlineColorAndroid='transparent'
                       


                    >
                    </TextInput>
                    <View style={styles.inputIcon}>
                        <MaterialIcons
                            name="email"
                            size={24}
                            color='#2d7474'

                        ></MaterialIcons>
                    </View>

                </View>
                <View>

                    <TextInput
                        style={{ width:300,
                            height:40,
                            borderRadius:10,
                            fontSize:16,
                            paddingLeft:45,
                            paddingTop:-10,
                            backgroundColor:'#ffff',
                            color:'#2d7474',
                            marginHorizontal:25,
                            marginTop:10,
                            borderWidth: 1,
                            borderColor:this.state.key==='pass'?'red':'#2d7474'}}
                        placeholder={'Password'}
                        onChangeText={(password) => this.setState({ password })}
                        value={this.state.password}
                        placeholderTextColor={'#2d7474'}
                        underlineColorAndroid='transparent'
                        secureTextEntry={this.state.showPass}
                    >
                    </TextInput>
                    <View style={styles.inputIcon}>
                        <FontAwesome5
                            name="lock"
                            size={24}
                            color='#2d7474'
                        />
                    </View>
                    <TouchableOpacity style={styles.btnEye} onPress={this.showPass.bind(this)}>
                        <AntDesign
                            name={this.state.press == false ? 'eyeo' : 'eye'}
                            size={24}
                            color='#2d7474'
                            style={styles.eye}
                        />
                    </TouchableOpacity>
                </View>
                <View>
                    <Text style={styles.textnof}>{this.state.nof}</Text>
                </View>
                <TouchableOpacity style={styles.btnLogin} onPress={this.onSubmit1}>
                    <Text style={styles.textlogin}>LOGIN</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.btnSignup} onPress={() => this.props.navigation.navigate("Register")}>
                    <Text style={styles.textlogin}>CREATE AN ACCOUNT</Text>
                </TouchableOpacity>
                <View>
                    <Text style={styles.logintext2}>By signing up you agree to our Policy & Terms</Text>
                </View>

            </View>
            </TouchableWithoutFeedback>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        login:state.authentication,
    }
  }
  const mapDispatchProps=(dispatch,props)=>{
    return {
        onLogin:()=>{
            dispatch(actions.onLogin());
        },
    }
  }
export default connect(mapStateToProps,mapDispatchProps)(Login);
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