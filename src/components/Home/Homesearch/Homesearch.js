import React, { Component } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity, Dimensions ,Text} from 'react-native'
import io from 'socket.io-client/dist/socket.io'
import { Container, Tab, Tabs } from 'native-base'
import SearchUser from '../Homesearch/SearchUser'
import SearchTask from '../Homesearch/SearchTask'
import { Ionicons } from '@expo/vector-icons';
var e;
const width = Dimensions.get('window').width
const height = Dimensions.get('window').height
export default class Homesearch extends Component {
    constructor(props) {
        super(props);
        e = this;
        this.socket = io('https://taskeepererver.herokuapp.com', { jsonp: false })
        this.state = {

        }
        this.onProfile = this.onProfile.bind(this);
        this.onDetail = this.onDetail.bind(this);
    }
    onProfile(first, last, _id) {
        this.props.navigation.navigate("Profilefriend", { first_name: first, last_name: last, _id: _id })
    }
    onDetail(_id) {
        this.props.navigation.navigate("Detail", { _task_id: _id })
    }
    render() {
        const { key } = this.props.route.params;
        return (
            <Container style={{ flex: 1 }}>
                <View style={styles.header}>
                    <View
                        style={styles.input_box}
                    >
                        <View >
                            <TouchableOpacity
                                onPress={() => this.props.navigation.goBack()}
                                style={styles.back_icon_box}
                            >
                                <Ionicons name="ios-arrow-back" size={22} color="#000000" />
                            </TouchableOpacity>
                        </View>
                        <View>
                            <Text style={{fontSize:20}}>{key}</Text>
                        </View>
                       {/* <TextInput
                            ref="input"
                            placeholder="Search "
                            clearButtonMode="always"
                            style={styles.input}
                       />*/}
                    </View>
                </View>
                <Tabs tabBarUnderlineStyle={{ backgroundColor: '#2d7474' }} >
                    <Tab tabStyle={{ backgroundColor: '#faf9f9' }} activeTabStyle={{ backgroundColor: '#faf9f9' }}
                        textStyle={{ color: 'black' }} activeTextStyle={{ color: '#2d7474', fontWeight: 'bold' }} heading="Job"  >
                        <SearchTask stackDetail={this.onDetail}
                            stackProfile={this.onProfile} search_key={key} />
                    </Tab>
                    <Tab tabStyle={{ backgroundColor: '#faf9f9' }} activeTabStyle={{ backgroundColor: '#faf9f9' }}
                        textStyle={{ color: 'black' }} activeTextStyle={{ color: '#2d7474', fontWeight: 'bold' }} heading="People">
                       
                            <SearchUser stackDetail={this.onDetail}
                            stackProfile={this.onProfile} search_key={key} />
                    </Tab>
                </Tabs>
            </Container>
        )
    }
}
const styles = StyleSheet.create({
    header: {
        height: 85,
        zIndex: 1000,
        backgroundColor: '#faf9f9',
       marginTop:-30
    },
    input: {
        flex: 1,
        height: 35,
        backgroundColor: '#e4e6eb',
        borderRadius: 16,
        paddingHorizontal: 16,
        marginLeft: -20,
        fontSize: 15,
    },
    back_icon_box: {
        width: 40,
        height: 40,
        borderRadius: 40,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    back_icon_box: {
        width: 40,
        height: 40,
        borderRadius: 40,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',

    },
    input_box: {
        height: 50,
        flexDirection: 'row',
        alignItems: 'center',
        position: 'absolute',
        top: 0,
        left: 0,
        backgroundColor: '#faf9f9',
        width: width - 32,
        marginTop: 35,
        marginLeft: 18
    },
})