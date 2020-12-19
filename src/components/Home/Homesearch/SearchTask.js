import React, { Component } from 'react'
import {
    View,
    StyleSheet,
    ActivityIndicator, FlatList,Text
} from 'react-native'
var e;
import io from 'socket.io-client/dist/socket.io'
import FlatListdata from '../../Home/Listdata/FlatListdata'
class SearchTask extends Component {
    constructor(props) {
        super(props)
        e = this
        this.socket = io('https://taskeepererver.herokuapp.com', { jsonp: false })
        this.state = {
            dataSearch: [],
            search_string: "",
            isLoading: false,
        }
        this.searchTask = this.searchTask.bind(this);
        this.socket.on("sv-search-task", function (data) {
            console.log(data)
            var list = data.data
            if (data.success == false) {

            } else if (data.success == true) {
                var list = data.data
                e.setState({
                    dataSearch: list,
                    isLoading: true
                })
                console.log(list)
            }
        })
    }
    componentDidMount = () => {
        this.searchTask(this);
    }
    searchTask = () => {
        const searchTask = {
            search_string: this.props.search_key,
            limit :10,
			skip : 0
        }

        this.socket.emit("cl-search-task", searchTask)
      console.log(searchTask)
    }
    render() {
        return (
            <View style={styles.container}>
                {this.state.isLoading === false ?
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <ActivityIndicator size='large'></ActivityIndicator>
                    </View>
                    :
                    this.state.dataSearch.length === 0
                    ?
                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                        <Text>Không tìm thấy công việc này này</Text>
                    </View>
                    :
                    <View style={styles.container1}>
                        <FlatList data={this.state.dataSearch}
                            renderItem={({ item, index }) => {
                                return (
                                    <FlatListdata  stackDetail={this.props.stackDetail}
                                    stackProfile={this.props.stackProfile} item={item} index={index}
                                    ></FlatListdata>
                                )
                            }}
                            keyExtractor={(item) => item._id.toString()}
                            ItemSeparatorComponent={this.ItemSeparatorComponent}
                            showsHorizontalScrollIndicator={false}
                        >
                        </FlatList>
                    </View>
                }
            </View>
        )
    }
}
export default SearchTask
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#faf9f9'
    },

})