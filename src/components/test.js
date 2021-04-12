import React,{Component} from 'react'
import {View,Text,StyleSheet,TouchableOpacity,Animated, Dimensions} from 'react-native'
import io from 'socket.io-client/dist/socket.io'
import Collapsible from 'react-native-collapsible';
const {height,width} =Dimensions.get('window');
import {socket} from "../Socket.io/socket.io";
class test extends Component{
    constructor(props){
        super(props);     
        this.state={
            collapsed:true,
        }
    }
    toggleExpanded =() =>{
        this.setState({collapsed:!this.state.collapsed})
    }

    render(){
        return(
           <View>
               <TouchableOpacity onPress={this.toggleExpanded}>
                   <View style={{marginTop:50}}>
                        <Text>
                            minh nha
                        </Text>
                   </View>
               </TouchableOpacity>
               <Collapsible collapsed={this.state.collapsed}>
                   <Animated.View >
                       <Text style={{lineHeight:15}}>
                          sadfsadfasdfsadfasdfasdfasdfsadfsadfasdfasdfsdafasdfsdafasdfưerwqerwqerweqrqwerrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrsadfffffffffffffffffffffffffffffffffffffffffffffrteerttttttttttttttttttttttttttttttttttttttttt
                         
                       </Text>
                   </Animated.View>
               </Collapsible>
           </View>
           
        )
    }
}


export default test;
const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#faf9f9',
    },
   
})
