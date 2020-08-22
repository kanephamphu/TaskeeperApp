import  React ,{Component}from 'react';
import {View,Text,StyleSheet,TouchableOpacity,TextInput,FlatList,Image,ScrollView, Dimensions,LinearGradient} from 'react-native'
const {height} =Dimensions.get('window');
import { AntDesign } from '@expo/vector-icons'; 
class Map extends Component{
  constructor(props){
      super(props);
     
      this.state={
         first_name:'',
         last_name:'',
         email:'',
         username:'',
         id:'',  
         phone:''   ,   
         secret_key:'',
      }
  }
  render(){
      return(
          <View style={styles.container}>
              <View style={styles.header}>
                  <View style={{flexDirection:'row',paddingHorizontal:20}}>                                                
                       <AntDesign name="search1" size={25} color="#71B7B7" style={{marginRight:10,marginLeft:1,top:6}} />                  
                          <TextInput
                              style={styles.searching}
                              placeholder="Searching GooGle Map..." 
                              placeholderTextColor='#71B7B7'
                              underlineColorAndroid="transparent"
                              />                                        
                          <AntDesign name="message1" size={30} color="#71B7B7" style={styles.icon} 
                      onPress={() => alert('This is a button!')}
                      />
                  </View>
                  
              </View>
              
          </View>
             
         
      )
  }
}
export default Map;
const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'#faf9f9',
},
header:{
  height:height*0.08, 
  shadowOffset:{width:0,height:3},
  shadowOpacity:0.2,
  padding: 10,
  shadowOpacity: 0.2,
  elevation: 1,
  marginTop: Platform.OS == 'android' ? 30 : null,
  alignItems:'center',
 
},
icon:{
  marginLeft:10,
  shadowOffset: { width: 0, height: 0 },
  shadowColor: 'green',
  shadowOpacity: 0.1,
  elevation: 1,
},
searching:{
  backgroundColor:'white',
  shadowOffset: { width: 0, height: 0 },
  shadowColor: 'green',
  shadowOpacity: 0.1,
  elevation: 4,
  paddingLeft:15,
  ...Platform.select({
    ios: {
      width:310,
      height:35
    },
    android: {
      width:310,
      height:35
    },
    default: {
      // other platforms, web for example
    }
  })
},
})