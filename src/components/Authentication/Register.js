import React,{Component} from 'react'
import {
    View,
    Text,
    StyleSheet,
    CheckBox,
    TextInput,
    ImageBackground,
    TouchableOpacity,
    Image,
    Dimensions,
    Animated,
} from 'react-native'
import background from '../../images/anh1.png'
import logo from '../../images/logonew3.png'
import { MaterialIcons } from '@expo/vector-icons'; 
import { Ionicons } from '@expo/vector-icons'; 
import { AntDesign } from '@expo/vector-icons'; 
import io from 'socket.io-client/dist/socket.io';
import { FontAwesome5 } from '@expo/vector-icons'; 
const {width:WIDTH}=Dimensions.get('window')
var e;

export default class Register extends Component{
    constructor(props){
        super(props)
        e=this;
        this.socket=io('https://taskeepererver.herokuapp.com',{jsonp:false})
        this.state={
            showPass:true,
            press:false,
            logoContainer: new Animated.Value(0),
            loadingspinner: false,
            first_name: '',
            last_name: '',
            email: '',
            phone_number:'',
            password: '',
            day:'23',
            month:'08',
            year:'1999',
            nof:'',
            errors: {}
        }
        this.onSubmit1 = this.onSubmit.bind(this)
        this.socket.on("sv-send-register-res",function(data){
            if(data.success==true){
                e.setState({
                    nof:'Congratulations on your successful registration'
                }); 
            }else if(data.success==false){ 
                var dataserver=data.errors
                if(data.errors.first_name){
                    e.setState({
                        nof:dataserver.first_name.message
                    });  
                }else  if(data.errors.last_name){
                    e.setState({
                        nof:dataserver.last_name.message
                    });  
                }else  if(data.errors.phone_number){
                    e.setState({
                        nof:dataserver.phone_number.message
                    });  
                }else  if(data.errors.email){
                    e.setState({
                        nof:dataserver.email.message
                    });  
                }else  if(data.errors.password){
                    e.setState({
                        nof:dataserver.password.message
                    });  
                }else if(data.errors){
                    e.setState({
                        nof:dataserver.message
                    });  
                }                    
            }       
        });
    }
    onSubmit() {
        const newUser = {
            first_name: this.state.first_name,
            last_name: this.state.last_name,
            email: this.state.email,
            phone_number: this.state.phone_number,
            password: this.state.password,
            day: this.state.day,
            month: this.state.month,
            year: this.state.year
        }
        this.socket.emit("cl-send-register-req",newUser)  
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
                useNativeDriver:false   
            }).start(),

        ]).start()
    }
    render(){
        
        return(
            <View style={styles.imagebackground}>
                
               <Animated.View style={{
                        opacity:this.state.logoContainer,
                        top:this.state.logoContainer.interpolate({
                            inputRange:[0,1],
                            outputRange:[80,0]
                        })
                    }}>   
                        <Image source={logo} style={styles.logo}></Image>
                </Animated.View>
                <View><Text style={styles.logintext}>REGISTRATION</Text></View>
                <View style={styles.textcontainer}>
                    <Text style={styles.logintext1}>Already have an account ?  </Text>
                    <TouchableOpacity onPress={()=>this.props.navigation.navigate("Taskeeper")}>
                        <Text style={styles.logintext2} >Log in</Text>
                    </TouchableOpacity>               
                </View>
                <View>
                        <TextInput 
                            style={styles.input}
                            placeholder={'First Name'}
                            onChangeText={(first_name)=> this.setState({first_name})}
                            value={this.state.first_name}
                            placeholderTextColor={'#2d7474'}
                           
                           
                        >
                        </TextInput>
                        <View style={styles.inputIcon}>
                            < Ionicons
                            name="md-person"
                            size={28} 
                            color='#2d7474'
                            
                            ></ Ionicons>
                        </View>
                </View>
                <View>
                        
                        <TextInput 
                            style={styles.input}
                            placeholder={'Last Name'} 
                            onChangeText={last_name=> this.setState({last_name})}
                            value={this.state.last_name}
                            placeholderTextColor={'#2d7474'}
                               
                            >
                        </TextInput>
                        <View style={styles.inputIcon}>
                            < Ionicons
                                name="md-person"
                                size={28} 
                                color='#2d7474'
                                
                            ></ Ionicons>
                        </View>
                 </View>               
                        <View>                         
                            <TextInput 
                                style={styles.input}
                                placeholder={'Phone'} 
                                onChangeText={(phone_number)=> this.setState({phone_number})}
                                value={this.state.phone_number}
                                keyboardType='numeric'
                                
                                placeholderTextColor={'#2d7474'}
                            >
                            </TextInput>
                            <View  style={styles.inputIcon} >
                                <MaterialIcons 
                                name="smartphone" 
                                    size={24} 
                                    color='#2d7474'
                                   />
                            </View>
                        </View>
                        <View>
                            <TextInput 
                                style={styles.input}
                                placeholder={'Email'} 
                                onChangeText={(email)=> this.setState({email})}
                                value={this.state.email}                      
                                placeholderTextColor={'#2d7474'}
                                
                                keyboardType='email-address'

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
                                style={styles.input}
                                placeholder={'Password'} 
                                onChangeText={(password)=> this.setState({password})}
                                value={this.state.password}
                                placeholderTextColor={'#2d7474'}
                               
                                secureTextEntry={this.state.showPass}
                            >
                            </TextInput>
                            <View style={styles.inputIcon} >
                                <FontAwesome5 
                                name="lock" 
                                size={24} 
                                color='#2d7474'
                                />
                            </View>
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
                <View style={styles.textcontainer}>
                    <View>
                        <CheckBox></CheckBox>
                    </View>
                    <View>
                        <Text>Yes,I agree to your  Terms</Text>
                    </View>
                </View>
                <TouchableOpacity style={styles.btnLogin} onPress={this.onSubmit1}>
                    <Text style={styles.textlogin}>SIGN IN</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    
    imagebackground:{
        flex:1,
        width:null,
        height:null,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor: '#faf9f9'
    },
    textnof:{
        color:'#FF0000'
    },
    textcontainer:{
        flexDirection:'row',
        marginTop:10
    },
    
    inputIcon:{
        position:'absolute',
        top:17,
        left:35,
    },
    btnEye:{
        position:'absolute',
        top:20,
        right:37,
    },
    signuptext:{
        color:'rgba(255,255,255,0.7)',
        fontSize:16
    },
    signuptextcont:{
        flexGrow:0.15,
        alignItems:'flex-end',
        justifyContent:'center',
        paddingVertical:16,
        flexDirection:'row',
    },
    logoContainer:{
        alignItems:'center'
    },
    logo:{
        width:70,
        height:70,
        
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
        opacity:1,
        marginEnd:-5,
    },
    logintext2:{
        color:'#FF0000',
        alignContent:'center',
        fontSize:15,
        opacity:1,
        marginEnd:-5,
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
        borderWidth: 1,
        borderColor:'#2d7474'
    },
    btnLogin:{
        width:300,
        height:45,
        borderRadius:10,
        backgroundColor:'#2d7474',
        marginTop:10,
        justifyContent:'center'
    },
    textlogin:{
        textAlign:'center',
        color:'rgba(255,255,255,0.7)',
    },
   
});