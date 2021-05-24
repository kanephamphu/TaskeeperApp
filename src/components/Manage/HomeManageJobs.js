import  React, { Component } from 'react';
import { View, Text, StyleSheet,Button,TouchableOpacity,Modal,TouchableWithoutFeedback,Keyboard,Animated,ScrollView,Dimensions,FlatList } from 'react-native';
import ScrollableTabView,{DefaultTabBar} from 'react-native-scrollable-tab-view';
import { Ionicons } from '@expo/vector-icons'; 
import { FontAwesome5 } from '@expo/vector-icons'; 
import io from 'socket.io-client/dist/socket.io'
import {Container,Header,Content,Tab,Tabs,Left} from 'native-base'
import { Entypo } from '@expo/vector-icons'; 
import {createStackNavigator} from '@react-navigation/stack';
import Jobs from '../Manage/Jobs';
import History from '../Manage/HistoryJobs'
import {socket} from "../../Socket.io/socket.io";
import AppText from '../app-text';
var e;
const { width,height } = Dimensions.get("window");
export default class HomeManageJobs extends React.Component {
  constructor(props){
    super(props);
    e=this;
    this.onDetail1 = this.onDetail.bind(this)
    this.state={
      /*secret_key=''*/
    }
  }
  onDetail(_id, user_id) {
    this.props.navigation.navigate("detailjobs", { _task_id: _id })
  }
  render(){
    return(
      <View style={styles.container}>
         <View style={styles.header0} /*onPress={()=>this.props.navigation.navigate("detailcandidates")}*/> 
              <AppText style={{fontWeight:'bold',fontSize:20,color:'black',marginBottom:-10}} i18nKey={'home_manage.titlehomemanagejobs'}>Careers Management</AppText>
              <TouchableOpacity onPress={()=>{this.props.navigation.navigate("HomeManageCandidate")}} style={{flexDirection:'row',paddingRight:7,borderRadius:5,marginBottom:-20}}>
                  <FontAwesome5 name="sync-alt" size={24} color="#2d7474" />
                  <View style={{marginLeft:5,marginTop:2}}>
                    <AppText style={{color:'#2d7474',fontWeight:'bold'}} i18nKey={'home_manage.candidate'}>Candidate</AppText>
                  </View>
              </TouchableOpacity>
        </View>
        <Tabs tabBarUnderlineStyle={{backgroundColor:'#2d7474'}} tabContainerStyle={{borderTopWidth:3,borderColor:'#ffff'}} >
                    <Tab tabStyle={{ backgroundColor: '#faf9f9' }} activeTabStyle={{ backgroundColor: '#faf9f9' }}
                        textStyle={{ color: 'black' }} activeTextStyle={{ color: '#2d7474', fontWeight: 'bold' }}
                     heading="Jobs" >
                       <Jobs stackDetail={this.onDetail1}/>
                    </Tab>
                    <Tab tabStyle={{ backgroundColor: '#faf9f9' }} activeTabStyle={{ backgroundColor: '#faf9f9' }}
                        textStyle={{ color: 'black' }} activeTextStyle={{ color: '#2d7474', fontWeight: 'bold' }}
                     heading="History" >
                       <History stackDetail={this.onDetail1}/>
                    </Tab>
        </Tabs>
        {/*<ScrollableTabView
          initialPage={0}
          tabBarActiveTextColor="#009387"
          renderTabBar={()=><DefaultTabBar 
            underlineStyle={{
              backgroundColor:'#009387'
            }}
          />}
        > 
            <HRM tabLabel='HRM' stack={this.onStack1}/>
            <View tabLabel='History' props={this.props}>
              
            </View>
          </ScrollableTabView>*/}
      </View>
    )
  }
}
const styles = StyleSheet.create({
    image_container:{
      ...Platform.select({
        ios: {
          width:90,
          height:90
        },
        android: {
          width:90,
          height:90,
        },
        default: {
          // other platforms, web for example
        }
      })
    },
    item:{
      ...Platform.select({
        ios: {
          flex: 1,   
          paddingVertical:10,
          paddingHorizontal:10,
          flexDirection:'row'
        },
        android: {
          flex: 1,   
          paddingVertical:10,
          paddingHorizontal:10,
          flexDirection:'row'
        },
        default: {
          // other platforms, web for example
        }
      })
    },
    container:{
      ...Platform.select({
        ios: {
          flex: 1,   
          backgroundColor: '#faf9f9',
        },
        android: {
          flex: 1,  
          backgroundColor: '#faf9f9',
          /*backgroundColor:'#faf9f9'*/
        },
        default: {
          // other platforms, web for example
        }
      })
    },
    header0:{
      ...Platform.select({
      ios: {
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        height:height*0.08, 
        shadowOffset:{width:0,height:3},
        shadowOpacity:0.2,
        padding: 10,
        shadowOpacity: 0.2,
        elevation: 1,
        paddingTop:36,
        marginBottom:10
      },
      android: {
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        height:height*0.08, 
        shadowOffset:{width:0,height:3},
        shadowOpacity:0.2,
        padding: 10,
        shadowOpacity: 0.2,
        elevation: 1,
      },
      default: {
        // other platforms, web for example
      }
    })
     
  },
    header:{
      ...Platform.select({
        ios: {
          flexDirection:'row',
          marginTop:20,
          marginBottom:20,
          height: 36,
          position: "relative"
        },
        android: {
          flexDirection:'row',
          marginTop:20,
          marginBottom:20,
          marginLeft:20,
          marginRight:30,
          height: 36,
          position: "relative"
        },
        default: {
          // other platforms, web for example
        }
      })
    },
    touchable1:{
      ...Platform.select({
        ios: {
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          borderWidth: 1,
          borderColor: "black",
          borderRadius: 4,
          borderRightWidth: 0,
          borderTopRightRadius: 0,
          borderBottomRightRadius: 0,
        },
        android: {
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          borderWidth: 1,
          borderColor: "black",
          borderRadius: 4,
          borderRightWidth: 0,
          borderTopRightRadius: 0,
          borderBottomRightRadius: 0,
        },
        default: {
          // other platforms, web for example
        }
      })
    },
    touchable3:{
      ...Platform.select({
        ios: {
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          borderWidth: 1,
          borderColor: "black",
          borderRadius: 4,
          borderRightWidth: 0,
          borderTopRightRadius: 0,
          borderBottomRightRadius: 0,
          borderLeftWidth: 0,
          borderTopLeftRadius: 0,
          borderBottomLeftRadius: 0,
        },
        android: {
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          borderWidth: 1,
          borderColor: "black",
          borderRadius: 4,
          borderRightWidth: 0,
          borderTopRightRadius: 0,
          borderBottomRightRadius: 0,
          borderLeftWidth: 0,
          borderTopLeftRadius: 0,
          borderBottomLeftRadius: 0,
        },
        default: {
          // other platforms, web for example
        }
      })
    },
    touchable2:{
      ...Platform.select({
        ios: {
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          borderWidth: 1,
          borderColor: "black",
          borderRadius: 4,
          borderLeftWidth: 0,
          borderTopLeftRadius: 0,
          borderBottomLeftRadius: 0,
  
        },
        android: {
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          borderWidth: 1,
          borderColor: "black",
          borderRadius: 4,
          borderLeftWidth: 0,
          borderTopLeftRadius: 0,
          borderBottomLeftRadius: 0,
        },
        default: {
          // other platforms, web for example
        }
      })
    },
    fonttext:{
      ...Platform.select({
        ios: {
          left:30,
          fontWeight:'bold',
          flex:1,
          justifyContent:'center',
          alignItems:'center',
          fontSize:17,
        },
        android: {
          left:30,
          fontWeight:'bold',
          flex:1,
          justifyContent:'center',
          alignItems:'center',
          fontSize:17,
        },
        default: {
          // other platforms, web for example
        }
      })
    },
    fonttextinfor:{
      ...Platform.select({
        ios: {
          left:50,
          flex:2,
          justifyContent:'center',
          alignItems:'center',
          fontSize:17,
        },
        android: {
          left:50,
          flex:2,
          justifyContent:'center',
          alignItems:'center',
          fontSize:17,
        },
        default: {
          // other platforms, web for example
        }
      })
    },
    button:{
      ...Platform.select({
        ios: {
          borderRadius:4,
          backgroundColor:"#009387",
          width:55,
          height:25
  
        },
        android: {
          borderRadius:4,
          backgroundColor:"#009387",
          width:55,
          height:25
        },
        default: {
          // other platforms, web for example
        }
      })
    },
    buttontext:{
      textAlign:'center',
      ...Platform.select({
        ios: {
          fontSize:15,
          color:"white",
        },
        android: {
          fontSize:15,
          color:"white",
        },
        default: {
          // other platforms, web for example
        }
      })
    }
  })