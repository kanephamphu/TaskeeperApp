import React from 'react';
import { View, Text, StyleSheet, Dimensions, ScrollView } from 'react-native';
import { Foundation } from '@expo/vector-icons';
import io from 'socket.io-client/dist/socket.io'
const { height, width } = Dimensions.get('window');
var e;
export default class HistoryPayment extends React.Component {
    constructor(props) {
        super(props);
        e = this;
        this.socket = io('https://taskeepererver.herokuapp.com', { jsonp: false })
        this.state = {

            data: [
                {
                    _id: '1',
                    title: 'Chuyển tiền tới',
                    time: '28/08/2020',
                    price: '-30000000',

                },
                {
                    _id: '2',
                    title: 'Nhân tiền tới',
                    time: '28/08/2020',
                    price: '+30000000',

                },
                {
                    _id: '3',
                    title: 'Chuyển tiền tới',
                    time: '28/08',
                    price: '-30000000',

                },
                {
                    _id: '4',
                    title: 'Nhận tiền tới',
                    time: '28/08',
                    price: '+30000000',

                },
            ],
            user: {
                name: 'Lê Ngân',
                job: 'Business Analyst',
            },
        }
    };
    componentDidMount = async () => {

    }

    render() {
        return (
            <ScrollView>
                <View style={styles.container}>
                    
                    <View style={styles.timeheader}>
                        <Text>08/2020</Text>
                    </View>
                    <View style={styles.search_item}>
                        <View style={{ flexDirection: 'row'}}>
                        <View>
                            <Foundation name="print" size={26} color="#71B7B7" />
                        </View>
                        <View style={{ flexDirection: 'column', marginLeft: 30 }}>
                            <View>
                                <Text style={styles.text}>chuyển tiền tới </Text>
                            </View>
                            <View >
                                <Text>28/08 06.40</Text>
                            </View>
                        </View>
                        </View>
                        <View >
                            <Text>-2.000.000</Text>
                        </View>
                    </View>
                    <View style={styles.search_item}>
                        <View style={{ flexDirection: 'row'}}>
                        <View>
                            <Foundation name="print" size={26} color="#71B7B7" />
                        </View>
                        <View style={{ flexDirection: 'column', marginLeft: 30 }}>
                            <View>
                                <Text style={styles.text}>chuyển tiền tới </Text>
                            </View>
                            <View >
                                <Text>28/08 06.40</Text>
                            </View>
                        </View>
                        </View>
                        <View >
                            <Text>-2.000.000</Text>
                        </View>
                    </View>
                    <View style={styles.search_item}>
                        <View style={{ flexDirection: 'row'}}>
                        <View>
                            <Foundation name="print" size={26} color="#71B7B7" />
                        </View>
                        <View style={{ flexDirection: 'column', marginLeft: 30 }}>
                            <View>
                                <Text style={styles.text}>chuyển tiền tới </Text>
                            </View>
                            <View >
                                <Text>28/08 06.40</Text>
                            </View>
                        </View>
                        </View>
                        <View >
                            <Text>-2.000.000</Text>
                        </View>
                    </View>
                </View>
            </ScrollView>
        );
    }
}
class RenderItemHeader extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            show: false
        }
    }
    render() {
        return (
            <View style={styles.image_container}>
                <View>
                    <Text>{this.props.item.time}</Text>
                </View>
            </View>
        )
    }
}
class RenderItem extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            show: false
        }
    }
    render() {
        return (
            <View style={styles.image_container}>
                <View >
                    <Text>{this.props.item.time}</Text>
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <View>
                        <Text>icon</Text>
                    </View>
                    <View style={{ flexDirection: 'column' }}>
                        <View>
                            <Text>{this.props.item.title}</Text>
                        </View>
                        <View>
                            <Text>{this.props.item.time}</Text>
                        </View>
                    </View>
                    <View>
                        <Text>{this.props.item.price}</Text>
                    </View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#faf9f9'
    },
    flatlist: {
        flex: 1,
        alignItems: 'center'
    },
    timeheader: {
        backgroundColor: 'rgba(92, 141, 137, 0.5)',
        height: height * 0.04,
        paddingLeft: 20,
        justifyContent: 'center'
    },
    search_item: {
        flexDirection: 'row',
        height: 50,
        alignItems: 'center',
        borderBottomWidth: 2,
        borderBottomColor: '#e6e4eb',
        marginLeft: 16,
        margin:10,
        justifyContent:'space-between'
    },
    image_container: {
        paddingVertical: 10,
        paddingHorizontal: 10,
        flexDirection: 'column',
        borderRadius: 10,
        height: 90,
        width: 350,
        backgroundColor: 'rgba(200,200,200,0.3)',
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
    },
    text: {
        fontSize: 20,
        fontWeight: 'bold'
    }
})