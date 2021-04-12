import React from 'react';
import { View ,Dimensions,TouchableOpacity,Text,StatusBar} from 'react-native';
import MapInput from '../Map/MapInput'
import MyMapView from '../Map/MapView';
import { AntDesign } from '@expo/vector-icons';
import io from 'socket.io-client/dist/socket.io'
import { FontAwesome } from '@expo/vector-icons'; 
import { getLocation, geocodeLocationByName } from '../location-service';
import {socket} from "../../Socket.io/socket.io";
const {height,width} =Dimensions.get('window');
var e;
class Map extends React.Component {
  constructor(props) {
    super(props)
    e = this;
    this.state = {
        region: {},
        formatted_address:'',
        latitude:'',
        longitude:'',
        getJobsNear:[]
    };
    this.onDetailJob = this.onDetailJob.bind(this)
   socket.on("sv-get-near-job", function (data) {
      var list = data.data
      if (data.success == true) {
        e.setState({
          getJobsNear:list
        })
        console.log(list)
      } else {
        console.log(JSON.stringify(list))
      }
    })
  }
    componentDidMount() {
      this.getInitialState();
    }

    getInitialState() {
        getLocation().then(
            (data) => {
                console.log(data);
                this.setState({
                    region: {
                        latitude: data.lat,
                        longitude: data.lng,
                        latitudeDelta: 0.003,
                        longitudeDelta: 0.003
                    }
                });
                const getjobnear = {
                  lat:data.lng,
                  lng:data.lat
                }
                socket.emit("cl-get-near-job", getjobnear)
                //console.log(getjobnear)
            }
        );
    }

    getCoordsFromName(loc,name) {
        console.log(loc)
        //console.log(name)
        this.setState({
            region: {
                latitude: loc.lat,
                longitude: loc.lng,
                latitudeDelta: 0.003,
                longitudeDelta: 0.003
            },
            formatted_address:name
        });
        const getjobnear = {
          lat:loc.lng,
          lng:loc.lat
        }
       socket.emit("cl-get-near-job", getjobnear)
        //console.log(getjobnear)
    }

    onMapRegionChange(region) {
        this.setState({ region });
    }
    onDetailJob(_id){
      this.props.navigation.navigate("DetailMap", { _task_id: _id })
    }
    render() {
        return (
            <View style={{ flex: 1}}>
                <StatusBar backgroundColor='blue' animated={true}/>
                <View style={{ flex: 1,marginTop:10,zIndex: 1000}}>
                    <MapInput style={{zIndex: 2000}} notifyChange={(loc,name) => this.getCoordsFromName(loc,name)}/>
                </View>
                {
                    this.state.region['latitude'] ?
                        <View style={{ 
                          width: "100%",
                          height: "80%",
                          zIndex: 0 }}>
                            <MyMapView
                                onStackDetail={this.onDetailJob}
                                getJobsNear={this.state.getJobsNear}
                                formatted_address={this.state.formatted_address}
                                region={this.state.region} />
                        </View> : null}
            </View>
        );
    }
}

export default Map;