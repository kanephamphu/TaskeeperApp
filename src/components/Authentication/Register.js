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
    Modal,TouchableWithoutFeedback,Keyboard
} from 'react-native'
import background from '../../images/anh1.png'
import logo from '../../images/logoblack.png'
import iconsuccess from '../../images/chucmung.png';
import iconerror from '../../images/close.png';
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
            errors: {},
            shownotice:false,
            notice:'',key:'', notice1:''
        }
        this.onSubmit1 = this.onSubmit.bind(this)
      
       
       this.socket.on("sv-send-register-res",function(data){
            if(data.success==true){
                e.setState({
                    notice:'Registered Successfully!',
                    shownotice:true,
                    key:'success',
                    notice1:'Access email to verify your account!',
                }); 
                
            }else if(data.success==false){ 
                var dataserver=data.errors
             
                if(data.errors.first_name){
                    if(data.errors.first_name.rule==='regex'){
                        e.setState({
                            nof:"The first name format is invalid!",
                            key:'first'
                        }); 
                    }else{
                        e.setState({
                            nof:'Please enter your first name!',
                            key:'first'
                        });  
                    }
                  
                }else  if(data.errors.last_name){
                    if(data.errors.last_name.rule==='regex'){
                        e.setState({
                            nof:"The last name format is invalid!",
                            key:'last'
                        }); 
                    }else{
                        e.setState({
                            nof:'Please enter your last name!',
                            key:'last'
                        });  
                    }
                }else  if(data.errors.phone_number){
                    if(data.errors.phone_number.rule==='phoneNumber'){
                        e.setState({
                            nof:"The phone number format is invalid!",
                            key:'phone'
                        });  
                    }else
                    if(data.errors.phone_number.rule==='required'){
                        e.setState({
                            nof:"Please enter your phone number!",
                            key:'phone'
                        });
                    }
                }
                else if(data.errors.rule==='phoneNumber'){
                    e.setState({
                        nof:"Phone number already exists!",
                        key:'phone'
                    });
                }else  if(data.errors.email){
            
                    if(data.errors.email.rule==='required'){
                        e.setState({
                            nof:'Please enter your email!',
                            key:'email'
                        });
                    }else {
                        e.setState({
                            nof:"The email format is invalid!",
                            key:'email'
                        });
                       
                    }
                }else if(data.errors.rule==='email'){
                    e.setState({
                        nof:"Email already exists!",
                        key:'email'
                    });
                }
                else  if(data.errors.password){
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
        this.socket.emit("cl-send-register-req",newUser);
      
        
    }
    onVerify(){
        const number={

        }
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
                    <TouchableOpacity onPress={()=>this.props.navigation.navigate("Login")}>
                        <Text style={styles.logintext2} >Log in</Text>
                    </TouchableOpacity>               
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
                                borderColor:this.state.key==='first'?'red':'#2d7474'}}
                            placeholder={'First Name'}
                            onChangeText={ first_name=> this.setState({first_name}) }
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
                                borderColor:this.state.key==='last'?'red':'#2d7474'}}
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
                                    borderColor:this.state.key==='phone'?'red':'#2d7474'}}
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
                <Modal transparent={true}
                            visible={this.state.shownotice}
                            animationType='slide'
                            style={{ justifyContent: 'center', alignItems: 'center' }}
                        >
                            <View style={{ backgroundColor: '#000000aa', flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                <View style={{
                                    backgroundColor: '#faf9f9', borderRadius: 20,
                                    height: 210, width: "70%", justifyContent: 'center', alignItems: 'center'
                                }}>
                                    <Image source={this.state.key === "success" ? iconsuccess : iconerror} style={{ height: 50, width: 50 }}></Image>
                                    <Text>{this.state.notice}</Text>
                                    <Text>{this.state.notice1}</Text>
                                    <TouchableOpacity onPress={() => {e.setState({shownotice:false,key:''}),this.props.navigation.navigate('Login')}} style={{
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
        color: 'red',
        fontStyle:'italic'
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
        fontWeight: 'bold',
    },
    logintext2:{
        color:'#FF0000',
        alignContent:'center',
        fontSize:15,
        opacity:1,
        marginEnd:-5,
        fontWeight: 'bold',
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
    inputnotice:{
        
        width:250,
        height:40,
        borderRadius:10,
        fontSize:16,
        paddingLeft:15,
        paddingTop:-10,
        color:'#2d7474',
        marginHorizontal:25,
        marginTop:10,
        borderWidth: 1,
        borderColor:'#dddd'
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
        color:'#ffff',
        fontWeight: 'bold',
    },
   
});