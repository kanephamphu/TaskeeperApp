import React from 'react';
import { View ,Dimensions,TouchableOpacity,Text,StatusBar} from 'react-native';
import MapInput from '../../components/MapInput'
import MyMapView from '../../components/MapView'
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons'; 
import io from 'socket.io-client/dist/socket.io';
import { getLocation, geocodeLocationByName } from '../../components/location-service'

const {height,width} =Dimensions.get('window');
var e;
class Map extends React.Component {
    constructor(props){
        super(props);
        e=this;
        this.socket=io('https://taskeepererver.herokuapp.com',{jsonp:false})
        this.state={
            region: {},
        };
        this.socket.on("sv-get-skills-list",function(data){
            var list = data.data;
            console.log(list);
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
                        latitude: data.latitude,
                        longitude: data.longitude,
                        latitudeDelta: 0.003,
                        longitudeDelta: 0.003
                    },
                });
                const getworkinvitation={
                    lat:data.latitude,
                    lng:data.longitude,
                }
                this.socket.emit("cl-get-near-job",getworkinvitation)
                console.log(getworkinvitation)
            }
        );
    }

    getCoordsFromName(loc,name) {
        //console.log(loc)
        //console.log(name)
        this.setState({
            region: {
                latitude: loc.lat,
                longitude: loc.lng,
                latitudeDelta: 0.003,
                longitudeDelta: 0.003
            },
        });
        const getworkinvitation={
            lat:loc.lat,
            lng:loc.lng,
        }
        this.socket.emit("cl-get-near-job",getworkinvitation)
        console.log(getworkinvitation)
    }

    onMapRegionChange(region) {
        this.setState({ region });
    }
    render() {
        return (
            <View style={{ flex: 1 }}>
                <View style={{ flex:1,marginTop:10,zIndex: 1,marginLeft:10,marginRight:10}}>
                    <MapInput notifyChange={(loc,name) => this.getCoordsFromName(loc,name)}
                    />
                </View>
                {
                    this.state.region['latitude'] ?
                        <View style={{ flex: 1}}>
                            <MyMapView
                                region={this.state.region}
                                onRegionChange={(reg) => this.onMapRegionChange(reg)} />
                        </View> : null}
            </View>
        );
    }
}

export default Map;