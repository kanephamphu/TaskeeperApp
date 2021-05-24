import React, { Component } from 'react'
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity
} from 'react-native'
import io from 'socket.io-client/dist/socket.io'
import AsyncStorage from '@react-native-community/async-storage';
import {socket} from "../../Socket.io/socket.io";
import { AntDesign } from '@expo/vector-icons';
var e;
class SearchTrending extends Component {
    constructor(props) {
        super(props)
        e = this;
        this.state = {
            dataSource: [],
            dataHistory:[],
        }
      socket.on("sv-get-search-trend", function (data) {
            var list = data.data
            if (data.success == false) {
                console.log(JSON.stringify(data))
            } else if (data.success == true) {
                e.setState({
                    dataSource: list
                })
            }
        })
       socket.on("sv-get-search-history", function (data) {
            var list = data.data
            if (data.success == false) {
                console.log(JSON.stringify(data))
            } else if (data.success == true) {
                e.setState({
                    dataHistory: list
                })
            }
        })

    }
    componentDidMount = () => {
       socket.emit("cl-get-search-trend", "a")
        const token = AsyncStorage.getItem("token")
        socket.emit("cl-get-search-history", token)
    }
    render() {
        return (
            <View style={styles.container}>
               
                <View style={styles.body}>
                    <View style={{ marginTop: 40, borderBottomWidth: 2, borderBottomColor: '#71B7B7' }}>
                        <View style={{ marginLeft: 25 }}>
                            <Text style={styles.textheader}>Trending</Text>
                        </View>
                    </View>
                    <ScrollView>
                         {this.state.dataSource.map((item, index) =>  <TouchableOpacity onPress={() => this.props.stackTrending(item.query_string)} key={item._id} style={styles.search_item}>
                            <AntDesign style={styles.item_icon} name="search1" size={16} color="#000000" />
                            <Text>#{item.query_string}</Text>
                        </TouchableOpacity>)}
                    </ScrollView>
                </View>
            </View>
        )
    }
}
export default SearchTrending
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#faf9f9'
    },
    header: {
        marginTop: 25,
    },
    textheader: {
        fontWeight: 'bold',
        fontSize: 18,
    },
    nameTask: {
        marginLeft: 20,
        marginTop: 5,
        height: 30,
        width: 100,
        backgroundColor: '#71B7B7',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    },
    textName: {
        fontSize: 18
    },
    search_item: {
        flexDirection: 'row',
        height: 40,
        alignItems: 'center',
        borderBottomWidth: 2,
        borderBottomColor: '#e6e4eb',
    },
    item_icon: {
        marginRight: 15,
        marginLeft: 10
    }
})