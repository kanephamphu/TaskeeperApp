import  React from 'react';
import { View, Text, StyleSheet,Button,FlatList,Image ,Dimensions,TouchableOpacity} from 'react-native';
import { Entypo } from '@expo/vector-icons'; 
import AsyncStorage from '@react-native-community/async-storage';
import io from 'socket.io-client/dist/socket.io'
import { AntDesign } from '@expo/vector-icons'; 

const {height,width} =Dimensions.get('window');
var e;
export default class Appprove extends React.Component {
  constructor(props){
    super(props);
    e=this;
    this.socket=io('https://taskeepererver.herokuapp.com',{jsonp:false})
    this.state={

      data:[
        {
            _id:'1',
          time:'Part time',
          company: 'Fancha Milktea',
          position: 'Staff',
        
        },
        {
            _id:'2',
          time:'Full time',
          company: "Crazy's Cat",
          position: 'Batender',
         
        },
        {
            _id:'3',
          time:'Part time',
          company: 'Fourdigit',
          position: 'FE Developer',
         
        },
        {
            _id:'4',
          time:'Part time',
          company: 'sadasdsadasd',
          position: 'FE Developer',
         
        },
        {
            _id:'5',
          time:'Full time',
          company: 'ccccccc',
          position: 'FE Developer',
         
        },
      ],
      dataHistoryjob:[

      ],
      user:{
        name:'Lê Ngân',
        job:'Business Analyst',
    },       
    }
  };
  componentDidMount=async()=>{

  }
 
  render(){
    return (
      <View style={styles.container}>
              <View style={styles.flatlist}>
              <FlatList data={this.state.data}
                    renderItem={({item,index})=>{
                    return(
                        <RenderItem item={item} index={index}></RenderItem>
                    )
                }}
                keyExtractor={(item)=>item._id.toString()}
                >
            </FlatList>
            </View>  
      </View>
    );
  }
}

class RenderItem  extends React.Component{
    render(){
        return(
            <View style={styles.image_container}>
                <View style={{justifyContent:'center',marginLeft:20}}>
                    <AntDesign name="clockcircleo" size={35} color="#009387" />
                </View>
                <View>
                    <View  style={{flexDirection:'column',marginLeft:20,alignItems:'flex-start',width:170}}>
                        <View>
                        <Text style={styles.time}>{this.props.item.time}</Text>
                        </View>
                    <View>
                    <Text style={styles.company}>{this.props.item.company}</Text>
                    </View>
                    <View>
                    <Text style={styles.position}>{this.props.item.position}</Text> 
                    </View>
                    </View>
                </View>
                <View style={{marginLeft:60}} >
                    <Entypo name="dots-three-vertical" size={24} color="#009387" />
                </View>
            </View>    
          )
    }
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    justifyContent: 'center',  
    backgroundColor: '#faf9f9'
  },
  flatlist:{
      flex:1,
      alignItems:'center'
  },
  image_container:{
      paddingVertical:10,
      paddingHorizontal:10,
      flexDirection:'row',
      borderRadius:10,
      height:90,
      width:350,
      backgroundColor:'rgba(200,200,200,0.3)',
      margin:20
  },
  time:{
    fontWeight:'bold',
    fontSize:19,
    color:'#2d7474'
      
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
  company:{
    fontWeight:'bold',
    fontSize:18
    
  },
  position:{
    fontSize:16
  },
  rating:{
      marginTop:5,
      flexDirection:'row'
  }
})