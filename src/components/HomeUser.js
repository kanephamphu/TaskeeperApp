import  React, { Component } from 'react';
import { View, Text, StyleSheet,Button,TouchableOpacity,Animated,ScrollView,Dimensions,FlatList } from 'react-native';
import { t } from '../locales';
import {Avatar} from 'react-native-paper';
import { Fontisto } from '@expo/vector-icons'; 
import { AntDesign } from '@expo/vector-icons'; 
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import ScrollableTabView,{DefaultTabBar} from 'react-native-scrollable-tab-view';
import ProfileUser from './Menu/ProfileUser';
import TaskPage from './Menu/TaskPage';
import HistoryJob from './Menu/HistoryJob';
import update from './Menu/ChangeProfileUser';
import { Ionicons } from '@expo/vector-icons'; 
import StackSearch from '../components/Home/SearchStackScreen'
import {createStackNavigator} from '@react-navigation/stack';
const { width,height } = Dimensions.get("window");
const ProfileStack = createStackNavigator();
export default class HomeUser extends React.Component {
  render(){
    return(
      <View style={styles.container}>
         <View style={styles.header0}> 
            <TouchableOpacity  style={{flexDirection:'row'}}onPress={()=>this.props.navigation.navigate("Menu")}>
                <Ionicons style={{marginTop:1}} name="ios-arrow-back" size={28} color="#71B7B7" />
                <Text style={{fontWeight:'bold',fontSize:25,color:'#71B7B7',marginLeft:15,marginTop:-2}}>Profile</Text>
            </TouchableOpacity>
        </View>
        <ScrollableTabView
          initialPage={0}
          tabBarActiveTextColor="#009387"
          renderTabBar={()=><DefaultTabBar 
            underlineStyle={{
              backgroundColor:'#009387'
            }}
          />}
        >
          <StackSearch tabLabel='Information' props={this.props}/>
          <HistoryJob tabLabel='History Job' props={this.props}/>
          <TaskPage tabLabel='Task Page'props={this.props}/>
        </ScrollableTabView>
      </View>
    )
  }
}
const ProfileStackScreen = ({navigation}) => {
  
  return (
    <ProfileStack.Navigator
      screenOptions={{
        
        headerStyle: {
         
          elevation: 0, // Android
        },
      
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}>
      <ProfileStack.Screen
        name="ProfileUser"
        component={ProfileUser}
        options={{headerShown: false}}
      />
       <ProfileStack.Screen
        name="update"
        component={update}
        options={{headerShown: false}}
      />
    </ProfileStack.Navigator>
  );
};
const styles = StyleSheet.create({
  image_container:{
    ...Platform.select({
      ios: {
        width:90,
        height:90
      },
      android: {
        width:90,
        height:90
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
      },
      default: {
        // other platforms, web for example
      }
    })
  },
  header0:{
    height:height*0.08, 
    shadowOffset:{width:0,height:3},
    shadowOpacity:0.2,
    padding: 10,
    shadowOpacity: 0.2,
    elevation: 1,
    marginTop: Platform.OS == 'android' ? 25 : null,
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