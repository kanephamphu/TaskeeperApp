import React from 'react';
import { View, Text, StyleSheet, FlatList, Dimensions, ActivityIndicator,Image} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import io from 'socket.io-client/dist/socket.io'
import RenderItem from '../mainApply/RenderItem'
import noitem from '../../../images/box.png';
const { height, width } = Dimensions.get('window');
import {connect} from 'react-redux';
import {socket} from "../../../Socket.io/socket.io";
import * as actions from '../../../actions';
var e;
 class Apply extends React.Component {
  constructor(props) {
    super(props);
    e = this;
    this.state = {
      secret_key: '',
      deleteRowkey: null,
      isLoading: false,
      refeshing: false,
      dataApply: [
      ],
      user: {
        name: 'Lê Ngân',
        job: 'Business Analyst',
      },
      count:0,
     
    }
    this.refreshFlatlist=this.refreshFlatlist.bind(this)
   socket.on("sv-get-applied-job", (data)=> {    
        this.props.getAllApply(data.data);
    })
  };
  refreshFlatlist= async () =>  {
    const token = await AsyncStorage.getItem('token')
    this.setState({
      secret_key: token
    })
    const apply = {
      secret_key: this.state.secret_key
    }
    socket.emit("cl-get-applied-job", apply)
  }

  componentDidMount = async () => {
    this.refreshFlatlist()
    
  }
 
  render() {
   
    return (
      this.props.onstatus===true
       ?
       <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
       <ActivityIndicator size='large'></ActivityIndicator>
     </View>
       :  
      this.props.apply.length ===0 
        ?
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: "#ffff" }}>
           <Image source={noitem} style={{ height: 100, width: 100 }}></Image>
          <Text>No item</Text>
        </View>
        :
        <View style={styles.container}>
          <View style={styles.flatlist}>
            <FlatList data={this.props.apply}
              renderItem={({ item, index }) => {
                return (
                  
                  <View>
                    <RenderItem item={item} index={index} parenFlastlist={this.refreshFlatlist} ></RenderItem>
                  </View>
                )
              }}
              keyExtractor={(item) => item._id.toString()}
             
            >
            </FlatList>
          </View>
        </View>
        
    );
  }
}
const mapStateToProps = (state) => {
  return {
      status:state.status,
      apply:state.apply.data,
      onstatus:state.apply.isLoading
  }
}
const mapDispatchProps=(dispatch,props)=>{
  return {
    getAllApply:(data)=>{
          dispatch(actions.getAllApply(data));
      },
      onStatus:()=>{
          dispatch(actions.onStatus());
      }
  }
}
export default connect(mapStateToProps,mapDispatchProps)(Apply);
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#faf9f9'
  },
  flatlist: {
    flex: 1,
    alignItems: 'center'
  },
  image_container: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    flexDirection: 'row',
    borderRadius: 10,
    height: 90,
    width: 350,
    backgroundColor: 'rgba(200,200,200,0.3)',
    margin: 20
  },
  time: {
    fontWeight: 'bold',
    fontSize: 19,
    color: '#2d7474'

  },
  header0: {
    height: height * 0.08,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    padding: 10,
    shadowOpacity: 0.2,
    elevation: 1,
    marginTop: Platform.OS == 'android' ? 25 : null,
  },
  company: {
    fontWeight: 'bold',
    fontSize: 18

  },
  position: {
    fontSize: 16
  },
  rating: {
    marginTop: 5,
    flexDirection: 'row'
  }
})