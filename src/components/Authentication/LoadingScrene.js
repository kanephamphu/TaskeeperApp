import React,{Component} from 'react'
import {Text,StyleSheet,Animated,Image,ImageBackground} from 'react-native'
import Logo from '../../images/logowhite.png';
import background from '../../images/anh1.png';
import AsyncStorage from '@react-native-community/async-storage';
var e;
class Loadingscene extends Component{
    

    constructor(props) {
        super(props)
        e = this
      
        this.state = {
            secret_key: '',
            LogoAnime: new Animated.Value(0),
            Logotext:new Animated.Value(0),
            loadingspinner: false,
            fontloaded:false,
        }
    }
    componentDidMount=async()=>{
        const token = await AsyncStorage.getItem('token')
        this.setState({ 
            secret_key:token
        })
        const switchtoAuth = ()=>{
            {this.state.secret_key===null?
                this.props.navigation.navigate('LandingPage')
                :
                this.props.navigation.navigate('Taskeeper')
               }
           
        }
        const{LogoAnime,Logotext}=this.state;
        Animated.parallel([
            Animated.spring(LogoAnime,{
                toValue:1,
                tension:10,
                friction:2,
                duration:1000,
                useNativeDriver:false  
            }).start(),
            Animated.timing(Logotext,{
                toValue:1,
                duration:2000,
                useNativeDriver:false  
            }),

        ]).start(()=>{
            this.setState({
            loadingspinner:true,
            });

            setTimeout(switchtoAuth,1200);
        });
    }
    render(){
        return(
            <ImageBackground source={background} style={styles.imagebackground}>
                <Animated.View style={{
                    opacity:this.state.LogoAnime,
                    top:this.state.LogoAnime.interpolate({
                        inputRange:[0,1],
                        outputRange:[80,0],
                        useNativeDriver:false  
                    }),borderWidth:1,borderColor:"#2d7474",borderRadius:3
                }}>
                    <Image style={styles.image} source={Logo}/>
                </Animated.View>
                <Animated.View style={{
                    opacity:this.state.Logotext,
                    useNativeDriver:false  
                }}>
                    <Text style={styles.logotext}>TASKEEPER</Text>
                </Animated.View>
            </ImageBackground>
        )         
    }
}
export default Loadingscene;

const styles = StyleSheet.create({
    imagebackground:{
        flex:1,
        width:null,
        height:null,
        justifyContent:'center',
        alignItems:'center'
    },
    logotext:{
        color:'#2d7474',
        fontWeight:'bold',
        fontSize:30,
       
        marginTop:29.1,
      
        
    },
    image:{
       height:70,
       width:70,
       borderRadius:3
    }
  });