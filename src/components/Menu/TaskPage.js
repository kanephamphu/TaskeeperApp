import React,{Component} from 'react';
import { View, Text, StyleSheet,ScrollView,TouchableOpacity,Image,Dimensions } from 'react-native';
import { AntDesign } from '@expo/vector-icons'; 
import { Ionicons } from '@expo/vector-icons'; 
const {height,width} =Dimensions.get('window');

class TaskPage extends Component{
    constructor(props){
        super(props);
        this.state={
            data:[{
                key:'1',
                name:'Business Analyst',
                image:require('../../images/fourdigit.png'),
                location:'Da Nang',
            },
             {
                 key:'2',
                 name:'Business Analyst',
                 image:require('../../images/cmc.png'),
                 location:'Da Nang',
             },
             {
                key:'3',
                name:'Business Analyst',
                image:require('../../images/cmc.png'),
                location:'Da Nang',
            },
            {
                key:'3',
                name:'Business Analyst',
                image:require('../../images/cmc.png'),
                location:'Da Nang',
            },
            
         ]
        }
      };
    render(){
        return (
            <View style={styles.container}>
                <View style={styles.header0}> 
                    <TouchableOpacity  style={{flexDirection:'row'}}onPress={()=>this.props.navigation.navigate("Menu")}>
                        <Ionicons style={{marginTop:1}} name="ios-arrow-back" size={28} color="#2d7474" />
                        <Text style={{fontWeight:'bold',fontSize:25,color:'#2d7474',marginLeft:15,marginTop:-2}}>Task Page</Text>
                    </TouchableOpacity>
                </View>
               
                    <ScrollView >
                        <View 
                            style={{flexDirection:'row', 
                            marginTop:20, 
                            flex: 1, 
                            alignItems: 'center', 
                            justifyContent: 'center',
                        }}>
                            <AntDesign onPress={() => alert('viết đi')} style={{marginRight:20}} name="plussquare" size={30} color="#71B7B7" />
                            <Text onPress={() => alert('viết đi')} style={{fontSize:18}}>Do you want to post new task?</Text>
                        </View>
                        <View style={{alignItems:'center',marginTop:20}}>
                            {this.state.data.map((task,index)=><Bulletin key={index} name={task.name}
                                image={task.image}
                                location={task.location}
                            />)}
                        </View>
                    </ScrollView>
            </View>
       
        );
    }
}
const Bulletin=({name,image,location})=>{
    return(
        <TouchableOpacity onPress={() => alert('Detail')} >
       
             <View style={{backgroundColor:'#71B7B7',
            
            marginHorizontal:10,
            marginVertical:10,
            borderRadius:8,
            paddingVertical:40,
            paddingHorizontal:15,
            marginTop:25,
            marginBottom:20,
            height:250,
            width:350,
            shadowOffset: { width: 0, height: 0 },
            shadowColor: 'green',
            shadowOpacity: 0.1,
            elevation: 4,
        }}>
            <View style={{marginTop:-60}}> 
                <Image source={image} style={{width:80,marginTop:-10
                    ,height:80,borderRadius:50,}}></Image>
            </View>
            <View style={{flexDirection:'column',flex:1,marginLeft:10,fontWeight:'bold'}}>
                
                <Text style={{fontWeight:'bold',fontSize:25,fontStyle:'italic'}}>{name}</Text>
                <Text >{location}</Text>
            </View>
        </View>
       
        </TouchableOpacity>
    )
}
export default TaskPage;
const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: '#faf9f9'
  },
  iconBulliten:{
    flexDirection:'row',
    borderRadius:10,
    borderWidth:1,
    height:50,
    width:90,
    alignItems:'center',
    paddingLeft:5,
    marginBottom:-30,
    marginRight:25,
    backgroundColor:'#ffff',
    shadowColor: 'green',
    shadowOpacity: 0.1,
    elevation: 4,
    borderColor:'#71B7B7'
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
})