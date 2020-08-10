import React,{Component} from 'react'
import {
    View,
    Text,
    StyleSheet,
    CheckBox,
    Button,
    TextInput,
    ImageBackground,
    StatusBar,
    TouchableOpacity,
    Image,
    Dimensions,ActivityIndicator,Animated,
} from 'react-native'
import background from '../images/anh1.png'
import logo from '../images/logonew3.png'
import {Actions} from 'react-native-router-flux'
import { AntDesign } from '@expo/vector-icons'; 
import { FontAwesome5 } from '@expo/vector-icons'; 
import { MaterialIcons } from '@expo/vector-icons'; 
import { Entypo } from '@expo/vector-icons'; 
import io from 'socket.io-client/dist/socket.io'

const {width:WIDTH}=Dimensions.get('window')
var e;
class Login extends Component{
    constructor(props){
        super(props)
        e=this;
        this.socket=io('https://taskeepererver.herokuapp.com',{jsonp:false})
        this.state={
            showPass:true,
            press:false,
            logoContainer: new Animated.Value(0),
            loadingspinner: false,
            loginquery: '',
            password: '',
            nof:'',
            errors: {}
        }
       
        this.onSubmit1 = this.onSubmit.bind(this)
    }
   
    onSubmit() {
        const user = {
            loginquery: this.state.loginquery,
            password: this.state.password,
        }
        this.socket.emit("cl-send-login-req",user)  
        this.socket.on("sv-send-login-res",function(data){
            if(data.success==true){
                Actions.home();
            }else if(data.success==false){  
                var dataserver=data.errors
                if(data.errors.loginquery){
                    e.setState({
                        nof:dataserver.loginquery.message
                    });
                }else if(data.errors.password){
                    e.setState({
                        nof:dataserver.password.message
                    });
                }else if(data.errors.result.loginquery){
                    e.setState({
                        nof:dataserver.result.loginquery.message
                    });
                }else if(data.errors.result.password){
                    e.setState({
                        nof:dataserver.result.password.message
                    });
                }           
            }          
        });
    }
    showPass =()=>{
        if(this.state.press==false){
            this.setState({showPass:false,press:true})
        }else{
            this.setState({showPass:true,press:false})
        }

    }
    componentDidMount(){
        const{logoContainer}=this.state;
        Animated.parallel([
            Animated.spring(logoContainer,{
                toValue:1,
                tension:10,
                friction:2,
                duration:1000,
            }).start(),

        ]).start()
    }
   
    register(){
        Actions.register()
    }
    render(){
        return(
            <ImageBackground source={background} style={styles.imagebackground}>
                <Animated.View style={{
                    opacity:this.state.logoContainer,
                    top:this.state.logoContainer.interpolate({
                        inputRange:[0,1],
                        outputRange:[80,0]
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
                    <MaterialIcons
                        name="email"
                        size={24} 
                        color='#2d7474'
                        style={styles.inputIcon}
                    ></MaterialIcons>
                    <TextInput 
                        style={styles.input}
                        placeholder={'Email'} 
                        onChangeText={(loginquery)=> this.setState({loginquery})}
                        value={this.state.loginquery}  
                        placeholderTextColor={'#2d7474'}
                        underlineColorAndroid='transparent'
                    >
                    </TextInput>
                    
                </View>
                <View>
                     
                    <FontAwesome5 
                        name="lock" 
                         size={24} 
                        color='#2d7474'
                         style={styles.inputIcon} />
                    <TextInput 
                        style={styles.input}
                        placeholder={'Password'} 
                        onChangeText={(password)=> this.setState({password})}
                        value={this.state.password}
                        placeholderTextColor={'#2d7474'}
                        underlineColorAndroid='transparent'
                        secureTextEntry={this.state.showPass}
                    >
                    </TextInput>
                    <TouchableOpacity style={styles.btnEye} onPress={this.showPass.bind(this)}>
                        <AntDesign
                            name={this.state.press==false ? 'eyeo':'eye'} 
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
                <View style={styles.textgmail}><Text >Or sign in using</Text></View>
                <View style={styles.btnemailfb}>
                    <TouchableOpacity style={styles.btnfacebook}>
                        <Entypo name="facebook-with-circle" size={45} color="blue" />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.btnemail}>
                        <Entypo name="google--with-circle" size={45} color="red" />
                    </TouchableOpacity>
                </View>
                <TouchableOpacity style={styles.btnSignup} onPress={this.register}>
                    <Text style={styles.textlogin}>CREATE AN ACCOUNT</Text>
                </TouchableOpacity>
                <View>
                    <Text style={styles.logintext2}>By signing up you agree to our Policy & Terms</Text>
                </View>
               
            </ImageBackground>
        )
    }
}
export default Login;
const styles = StyleSheet.create({
    
    imagebackground:{
        flex:1,
        width:null,
        height:null,
        justifyContent:'center',
        alignItems:'center'
        
    },
    textnof:{
        color:'#FF0000'
    },
    btnemailfb:{
        flexDirection:'row',
        justifyContent:'space-around',
        width:'20%',
        
    },
    textgmail:{
        alignContent:'center',
        justifyContent:'center'
    },
    inputIcon:{
        position:'absolute',
        top:15,
        left:37,
    },
    inputIcon:{
        position:'absolute',
        top:18,
        left:37,
    },
   
    signuptextcont:{
        flexGrow:0.15,
        alignItems:'flex-end',
        justifyContent:'center',
        paddingVertical:16,
        flexDirection:'row',
    },
    logoContainer:{
        top:-300,   
        left:-100,
    },
    logo:{
        width:70,
        height:70,
    },
    btnEye:{
        position:'absolute',
        top:20,
        right:37,
    },
    logintext:{
        color:'#222222',
        alignContent:'center',
        fontSize:30,
        opacity:1,
        marginEnd:-5,
    },
    logintext1:{
        color:'#222222',
        alignContent:'center',
        fontSize:15,
        marginTop:-10
    },
    logintext2:{
        color:'#222222',
        alignContent:'center',
        fontSize:15,
        marginTop:5
    },
    input:{
        width:300,
        height:40,
        borderRadius:10,
        fontSize:16,
        paddingLeft:45,
        paddingTop:-10,
        backgroundColor:'#ffff',
        color:'#2d7474',
        marginHorizontal:25,
        marginTop:10,
    },
    btnLogin:{
        width:300,
        height:45,
        borderRadius:10,
        backgroundColor:'#2d7474',
        marginTop:10,
        justifyContent:'center'
    },
    btnSignup:{
        width:300,
        height:45,
        borderRadius:10,
        backgroundColor:'rgba(0,0,0,0.35)',
        marginTop:5,
        justifyContent:'center'
    },
    textlogin:{
        textAlign:'center',
        color:'rgba(255,255,255,0.7)',
    }
});