import React,{Component} from 'react'
import {View,Text,StyleSheet,Animated,Image,ActivityIndicator,ImageBackground} from 'react-native'
import {Actions} from 'react-native-router-flux'
import Logo from '../images/logonew3.png';
import background from '../images/anh1.png';

const switchtoAuth = ()=>{
    Actions.replace('login')
}
class Loadingscene extends Component{
    
    state={
        LogoAnime: new Animated.Value(0),
        Logotext:new Animated.Value(0),
        loadingspinner: false,
        fontloaded:false,
    };
    componentDidMount(){
        const{LogoAnime,Logotext}=this.state;
        Animated.parallel([
            Animated.spring(LogoAnime,{
                toValue:1,
                tension:10,
                friction:2,
                duration:1000,
            }).start(),
            Animated.timing(Logotext,{
                toValue:1,
                duration:2000,
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
                        outputRange:[80,0]
                    })
                }}>
                    <Image style={styles.image} source={Logo}/>
                </Animated.View>
                <Animated.View style={{
                    opacity:this.state.Logotext,
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
        color:'#ffff',
        fontFamily:'bold',
        fontSize:30,
        marginTop:29.1,
      
        
    },
    image:{
       height:70,
       width:70,
    }
  });