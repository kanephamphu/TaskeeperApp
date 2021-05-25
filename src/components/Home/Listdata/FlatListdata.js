import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Modal, Dimensions, Alert, Image, TouchableWithoutFeedback, Keyboard } from 'react-native'
import io from 'socket.io-client/dist/socket.io'
import { AntDesign } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import avatar from '../../../images/avatar11.png'
import iconsuccess from '../../../images/checked.png';
import iconerror from '../../../images/close.png';
import logonew from '../../../images/new3.png'
import AsyncStorage from '@react-native-community/async-storage';
import moment from 'moment';
import anhbiadetail from '../../../images/anhbiadetail.jpg';
import {socket} from "../../../Socket.io/socket.io";
import {connect} from 'react-redux';
import * as actions from '../../../actions';
import AppText from '../../app-text';
var e;
const { height, width } = Dimensions.get('window');
class FlatListdata extends Component {
    constructor(props) {
        super(props);
        e = this;
        this.state = {
            _id: '',
            introduction: '',
            ceiling_price: '',
            floor_price: '',
            secret_key: '',
            show: false,
            shownotice: false,
            notice: '',
            key: '', price: '', abc: '',
            check: false,
            checksave: false


        }
        this.applyJob = this.applyJob.bind(this)
        socket.on("sv-apply-job", function (data) {
            if (data.success == false) {
                if (data.errors.introduction) {
                    e.setState({
                        shownotice: true,
                        notice: 'Please enter your introduction!',
                        key: "error",
                        abc: 'w'
                    })

                } else {
                    e.setState({
                        shownotice: true,
                        notice: 'Already Exist!',
                        key: "error",
                    })

                }
            } else if (data.success == true) {
                e.setState({
                    show: false,
                    check: true,
                    shownotice: true,
                    notice: 'Applied Successfully!',
                    key: "success",

                })
                
            }
        })

        this.save = this.saveTask.bind(this);
        socket.on("sv-save-task", function (data) {
            if (data.success == false) {
                console.log(JSON.stringify(data))
                if (data.errors.message) {
                    e.setState({
                        shownotice: true,
                        notice: 'Already Exist!',
                        key: "error",
                    })
                }
            } else if (data.success == true) {
                e.setState({
                    shownotice: true,
                    notice: 'Saved Successfully!',
                    key: "success",

                })
            }
        })
    }
    componentDidMount = async () => {
        const token = await AsyncStorage.getItem('token')
        this.setState({
            secret_key: token,
            _id: this.props.item._id,
            isSaved: this.props.item.isSaved,
            isApplied: this.props.item.isApplied

        })
    }
    onSuccessAppy = (task) =>{
        this.props.onApply(task)
    }
    applyJob(task) {
        let a = this.state.price;
        let b = parseInt(a)
        if (this.state.introduction == '') {
            this.setState({
                notice: 'Please enter your introduction!',
                abc: "intro"
            })
        }
        else if (this.state.price == '') {
            this.setState({
                notice: 'Please enter your price!',
                abc: "price"
            })
        } else if (b !== b) {
            this.setState({
                notice: 'The price is invalid!',
                abc: "price"
            })
        } else {
            this.setState({ show: false })
            const apply = {
                secret_key: this.state.secret_key,
                task_id: this.state._id,
                introduction: this.state.introduction,
                price: this.state.price,
            }
            socket.emit("cl-apply-job", apply)
            this.props.onApply(task)
        }



    }
    /*followTask=async()=>{
        const follow={
            secret_key:this.state.secret_key,
            task_id:this.state._id,
            introduction:'Tôi mu?n theo dõi b?n',
            floor_price:this.state.floor_price,
            ceiling_price:this.state.ceiling_price
        }
        this.socket.emit("cl-follow-user",follow)
    }  */
    saveTask = (task) => {
        e.setState({
            checksave: true
        })
        const save = {
            secret_key: this.state.secret_key,
            task_id: this.state._id
        }
        socket.emit("cl-save-task", save)
        this.props.onSave(task)
    }
    onsss() {
        this.props.stack;
    }
    render() {
        var d = new Date();
        var task_description = this.props.item.task_description;
        var task_title = this.props.item.task_title;
        if (task_title.length >= 50) {
            task_title = task_title.slice(0, 50) + "...";
        }
        var count = task_description.length;
        if (count >= 30) {
            task_description = task_description.slice(0, 30);
        }
        var textnull = "Null";
        let first = this.props.item.task_owner_first_name;
        let last = this.props.item.task_owner_last_name;
        let name = this.props.item.task_owner_first_name + " " + this.props.item.task_owner_last_name
        let countname = first.length + last.length;
        if (countname >= 18) {
            name = this.props.item.task_owner_last_name;
        }
        return (

            <View style={styles.container}>
                <View style={styles.body} key={this.props.item._id}>
                    <View style={styles.bodyone}>
                        <TouchableOpacity style={styles.imageview} onPress={() => this.props.stackProfile(this.props.item.task_owner_first_name, this.props.item.task_owner_last_name, this.props.item.task_owner_id)}>
                            <Image source={this.props.item.task_owner_avatar ? { uri: this.props.item.task_owner_avatar } : avatar} style={{
                                width: 60, marginTop: -10
                                , height: 60, borderRadius: 50,
                            }}></Image>
                        </TouchableOpacity>
                        <View style={{ flexDirection: 'column', marginLeft: 15 }}>
                            <TouchableOpacity onPress={() => this.props.stackProfile(this.props.item.task_owner_first_name, this.props.item.task_owner_last_name, this.props.item.task_owner_id)}>
                                <Text style={{ fontSize: 18,fontStyle:'normal' }}>{name ? name : null}</Text>
                            </TouchableOpacity>
                            <View style={{ flexDirection: 'row' }}>
                                <View style={{ marginRight: 10 }}>
                                    <Text>{new Date(this.props.item.created_time).toLocaleDateString()}</Text>
                                </View>
                                <View>
                                    <Text>{new Date(this.props.item.created_time).toLocaleTimeString()}</Text>
                                </View>

                            </View>
                        </View>

                        {/*  {new Date(this.props.item.created_time).toLocaleDateString() == d.toLocaleDateString() ?
                                <View style={{position:'absolute',top:0,right:0}}>
                                    <Image source={logonew} style={{ height: -50, width: 50 }}></Image>
                                </View>
                      : null}*/}
                    </View>
                    <View style={styles.bodytwo}>
                        <View style={{ flex: 1, width:'100%', height: 200, borderRadius: 5, alignItems: 'center', marginRight: 10, shadowColor: 'black', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 5, shadowRadius: 3, elevation: 20 }}>
                            <Image source={anhbiadetail} style={{ width: '100%', height: '100%', borderRadius: 10 }} />
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', flexWrap: 'wrap', marginTop: 10 }}>
                            <TouchableOpacity style={{ alignSelf: 'flex-start' }} onPress={() => this.props.stackDetail(this.props.item._id, this.props.item.isSaved, this.props.item.isApplied)}>
                                <View><Text style={{ fontWeight: 'bold', fontSize: 20, fontStyle: 'normal', color: '#000000' }}>{task_title}</Text></View>
                            </TouchableOpacity>
                            {new Date(this.props.item.created_time).toLocaleDateString() == d.toLocaleDateString() ?
                                <TouchableOpacity style={{ alignSelf: 'center', borderWidth: 1, borderColor: '#F7B32D', width: '15%', borderRadius: 8, marginTop: 2 }}>
                                    <View style={{ alignItems: 'center' }}>
                                        <AppText i18nKey={"home_page.new"} style={{ color: '#F7B32D',fontStyle:'normal' }} >NEW</AppText>
                                    </View>

                                </TouchableOpacity>
                                : null}
                        </View>
                        <View style={{ flexDirection: 'column', marginTop: 10 }}>
                            <View style={{ marginTop: 10, flexDirection: 'row' }}>
                                <Text style={{ marginLeft: 10, color: '#0E0E0E', fontSize: 13, fontStyle:'normal' }}>{task_description}</Text>
                                {count >= 40 ?
                                    <>
                                        <Text>...</Text>
                                        <TouchableOpacity onPress={() => this.props.stackDetail(this.props.item._id, this.props.item.isSaved, this.props.item.isApplied)}>
                                            <AppText i18nKey={'home_page.seedetail'} style={{ color: "#b30000", fontSize: 13 }}> see detail</AppText>
                                        </TouchableOpacity>
                                    </> : null}
                            </View>
                        </View>
                    </View>
                    <View style={styles.bodynext} >
                      
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <View style={{ flexDirection: 'row' }}>
                                <AppText i18nKey={'home_page.price'} style={{ color: '#0E0E0E', fontSize: 13 }}>Price:</AppText>
                                {this.props.item.price.price_type === 'dealing' ?
                                    <View style={{ marginLeft: 5 }}>
                                        <Text style={{ color: '#0E0E0E', fontSize: 13, fontWeight: 'bold' }}>{this.props.item.price.price_type != null ? this.props.item.price.price_type : null}</Text>
                                    </View>
                                    :
                                    <View style={{ marginLeft: 5 }}>
                                        <Text style={{ color: '#0E0E0E', fontSize: 13, fontWeight: 'bold' }}>{this.props.item.price.ceiling_price != null ? this.props.item.price.ceiling_price : null} - {this.props.item.price.floor_price != null ? this.props.item.price.floor_price : null}</Text>
                                    </View>}
                            </View>
                            <View style={{ flexDirection: 'row' }}>
                                <AppText i18nKey={'home_page.workingtime'} style={{ color: '#0E0E0E', fontSize: 13 }}>Working Time:</AppText>
                                <View style={{ marginLeft: 5 }}>
                                    <Text style={{ color: '#0E0E0E', fontSize: 13, fontWeight: 'bold' }}>{this.props.item.working_time != null ? this.props.item.working_time.start_time : null} - {this.props.item.working_time != null ? this.props.item.working_time.end_time : null}</Text>
                                </View>
                            </View>
                        </View>
                        <View style={{ flexDirection: 'row', margin: 5 }}>
                            <View style={{ alignItems: 'flex-start', marginLeft: -10 }}>
                                <Entypo name="location-pin" size={20} color="red" />
                            </View>
                            <View style={{ marginLeft: 7 }}>
                                <Text style={{ color: '#0E0E0E', fontSize: 13 }}>{this.props.item.location.formatted_address}</Text>
                            </View>
                        </View>
                    </View>
                    <View style={styles.bodythree}>
                        {this.props.item.end_day - moment(d).format('DD') == 0
                            ?
                            <View style={styles.iconBulliten1} >
                                    <View style={{ flexDirection: 'row', margin: 5, borderWidth: 1, borderColor: '#71B7B7', width: 100, height: 27, alignItems: 'center', borderRadius: 15 }}>
                                        <View style={{ marginLeft: 10 }}>
                                            <AntDesign name="pluscircle" size={17} color="#ccc" />
                                        </View>
                                        <View style={{ marginLeft: 10 }}>
                                            <AppText i18nKey={'home_page.btnapply'} style={{ color: '#ccc', fontWeight: 'bold' }}>Apply</AppText>
                                        </View>
                                    </View>
                            </View> :
                            !this.props.item.isApplied ? <TouchableOpacity style={styles.iconBulliten1} onPress={() => this.setState({ show: true })}>
                                <View style={{ flexDirection: 'row', margin: 5, borderWidth: 1, borderColor: '#71B7B7', width: 100, height: 27, alignItems: 'center', borderRadius: 15 }}>
                                        <View style={{ marginLeft: 10 }}>
                                            <AntDesign name="pluscircle" size={17} color="#71B7B7" />
                                        </View>
                                        <View style={{ marginLeft: 10 }}>
                                            <AppText i18nKey={'home_page.btnapply'} style={{ fontWeight: 'bold' }}>Apply</AppText>
                                        </View>
                                    </View>
                            </TouchableOpacity> :
                                this.props.item.isApplied == false ?
                                    <TouchableOpacity style={styles.iconBulliten1} onPress={() => this.setState({ show: true })}>
                                          <View style={{ flexDirection: 'row', margin: 5, borderWidth: 1, borderColor: '#71B7B7', width: 100, height: 27, alignItems: 'center', borderRadius: 15 }}>
                                            <View style={{ marginLeft: 10 }}>
                                                <AntDesign name="pluscircle" size={17} color="#71B7B7" />
                                            </View>
                                            <View style={{ marginLeft: 10 }}>
                                                <AppText i18nKey={'home_page.btnapply'} style={{ fontWeight: 'bold' }}>Apply</AppText>
                                            </View>
                                        </View>
                                    </TouchableOpacity> :
                                    <View style={styles.iconBulliten1} >
                                        <View style={{ flexDirection: 'row', margin: 5, borderWidth: 1, borderColor: '#71B7B7', width: 100, height: 27, alignItems: 'center', borderRadius: 15 }}>
                                            <View style={{ marginLeft: 10 }}>
                                                <AntDesign name="checkcircle" size={17} color="#007700" />
                                            </View>
                                            <View style={{ marginLeft: 10 }}>
                                                <AppText i18nKey={'home_page.btnapplied'} style={{ color: '#ccc', fontWeight: 'bold' }}>Applied</AppText>
                                            </View>
                                        </View>
                                    </View>
                        }
                        {!this.props.item.isSaved ? <TouchableOpacity style={styles.iconBulliten2} onPress={()=>this.save({...this.props.item,isSaved:true})}>
                        <View style={{ flexDirection: 'row', margin: 5, borderWidth: 1, borderColor: '#71B7B7', width: 100, height: 27, alignItems: 'center', borderRadius: 15 }}>
                                        <View style={{ marginLeft: 10 }}>
                                            <Entypo name="save" size={17} color="#71B7B7" />
                                        </View>
                                        <View style={{ marginLeft: 10 }}>
                                            <AppText i18nKey={'home_page.btnsave'} style={{ fontWeight: 'bold' }}>Save</AppText>
                                        </View>
                                    </View>
                        </TouchableOpacity> :
                            this.props.item.isSaved == false ?
                                <TouchableOpacity style={styles.iconBulliten2} onPress={()=>this.save({...this.props.item,isSaved:true})}>
                                    <View style={{ flexDirection: 'row', margin: 5, borderWidth: 1, borderColor: '#71B7B7', width: 100, height: 27, alignItems: 'center', borderRadius: 15 }}>
                                        <View style={{ marginLeft: 10 }}>
                                            <Entypo name="save" size={17} color="#71B7B7" />
                                        </View>
                                        <View style={{ marginLeft: 10 }}>
                                            <AppText i18nKey={'home_page.btnsave'} style={{ fontWeight: 'bold' }}>Save</AppText>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                                :
                                <View style={styles.iconBulliten2}>
                                    <View style={{ flexDirection: 'row', margin: 5, borderWidth: 1, borderColor: '#71B7B7', width: 100, height: 27, alignItems: 'center', borderRadius: 15 }}>
                                        <View style={{ marginLeft: 10 }}>
                                            <AntDesign name="checkcircle" size={17} color="#007700" />
                                        </View>
                                        <View style={{ marginLeft: 10 }}>
                                            <AppText i18nKey={'home_page.btnsaved'} style={{ color: '#ccc', fontWeight: 'bold' }}>Saved</AppText>
                                        </View>
                                    </View>
                                </View>
                        }

                    </View>
                </View>
                <Modal transparent={true}
                    visible={this.state.show}
                    animationType='slide'
                >
                    <TouchableWithoutFeedback onPress={Keyboard.dismiss} style={{ backgroundColor: '#000000aa', flex: 1, }} >
                        <View style={{ backgroundColor: '#000000aa', flex: 1 }}>
                            <View style={{
                                backgroundColor: '#faf9f9', borderRadius: 10,
                                height: 330, marginLeft: 40, marginRight: 40, marginTop: 75,
                                borderWidth: 2, borderColor: '#009387', padding: 20,
                                alignContent: 'center'
                            }}>
                                <View style={{ alignContent: 'center' }}>
                                    <AppText i18nKey={'home_page.introduction'} style={{ fontSize: 20, fontWeight: 'bold', fontStyle: 'italic' }}>Introduction:</AppText>
                                </View>
                                <View style={{ height: 120, padding: 10, borderColor: '#808080', borderColor: '#009387', }}>
                                    <TextInput multiline={true}
                                        onChangeText={(introduction) => this.setState({ introduction })}
                                        value={this.state.introduction}
                                        placeholderTextColor={this.state.abc == "intro" ? 'red' : '#2d7474'}
                                        underlineColorAndroid='transparent'
                                        placeholder='introduction...'
                                    >

                                    </TextInput>
                                    <View>
                                        <Text></Text>
                                    </View>
                                </View>

                                <Text style={{ fontStyle: 'italic', color: 'red' }}>{this.state.abc == "intro" ? this.state.notice : null}</Text>

                                <View style={{ alignContent: 'center' }}>
                                    <AppText i18nKey={'home_page.price'} style={{ fontSize: 20, fontWeight: 'bold', fontStyle: 'italic' }}>Price:</AppText>
                                </View>
                                <View style={{ padding: 10, borderColor: '#808080' }}>
                                    <TextInput
                                        onChangeText={(price) => this.setState({ price })}
                                        value={this.state.price}
                                        placeholderTextColor={this.state.abc == "price" ? 'red' : '#2d7474'}
                                        underlineColorAndroid='transparent'
                                        placeholder='price...'
                                    >
                                    </TextInput>
                                </View>
                                <View style={{ marginTop: -5 }}>
                                    <Text style={{ fontStyle: 'italic', color: 'red' }}>{this.state.abc == "price" ? this.state.notice : null}</Text>
                                </View>
                                <View style={styles.controlStyle}>
                                    <TouchableOpacity style={styles.cancle} onPress={() => this.setState({ show: false, abc: '', introduction: '', price: '' })}>
                                        <AppText i18nKey={'home_page.cancel'} style={{ fontWeight: 'bold', color: "#488B8F", fontSize: 18 }}>Cancle</AppText>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.apply} onPress={()=>this.applyJob({...this.props.item,isApplied:true})}>
                                        <AppText i18nKey={'home_page.btnapply'} style={{ fontWeight: 'bold', color: "white", fontSize: 18 }}>Apply</AppText>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                </Modal>
                <Modal transparent={true}
                    visible={this.state.shownotice}
                    animationType='slide'
                    style={{ justifyContent: 'center', alignItems: 'center' }}
                >
                    <View style={{ backgroundColor: '#000000aa', flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <View style={{
                            backgroundColor: '#faf9f9', borderRadius: 20,
                            height: "30%", width: "70%", justifyContent: 'center', alignItems: 'center'
                        }}>
                            <Image source={this.state.key === "success" ? iconsuccess : iconerror} style={{ height: 50, width: 50 }}></Image>
                            <Text>{this.state.notice}</Text>
                            <TouchableOpacity onPress={() => this.setState({ shownotice: false, check: true })} style={{
                                width: "50%", backgroundColor: this.state.key === "success" ? 'green' : 'red',
                                height: 30, borderRadius: 10, marginTop: 15, justifyContent: 'center', alignItems: 'center'
                            }}>
                                <Text style={{ color: "white", fontSize: 15, fontWeight: 'bold' }}>Ok</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                </Modal>
            </View>
            
        )

    }


}
const mapStateToProps = (state) => {
    return {
     
    }
}
const mapDispatchProps=(dispatch,props)=>{
    return {
        onApply:(task)=>{
            dispatch(actions.onApplyTask(task));
        },
        onSave:(task)=>{
            dispatch(actions.onSaveTask(task));
        }
    }
}
export default connect(mapStateToProps,mapDispatchProps)(FlatListdata);
const styles = StyleSheet.create({
    container: {
        backgroundColor: '#faf9f9',
        flex: 1,
    },
    body: {
        backgroundColor: '#ffff',
        marginHorizontal: 10,
        marginVertical: 10,
        borderRadius: 8,
        paddingVertical: 40,
        paddingHorizontal: 15,
        marginBottom: 16,

        shadowOffset: { width: 0, height: 0 },
        shadowColor: 'green',
        shadowOpacity: 0.1,
        elevation: 4,
        borderWidth: 1,
        borderColor: '#71B7B7',
        flexDirection: 'column',
    },
    bodyone: {
        flexDirection: 'row',
        //borderBottomWidth: 1,
        borderColor: "#71B7B7",
        marginTop: -20,
        paddingBottom: 10,

    },
    bodytwo: {
        flexDirection: 'column',
        marginTop: 10
    },
    bodynext: {
        flexDirection: 'column',
        margin: 10,
        width: width - 105
    },
    bodythree: {
        flexDirection: 'row',
        borderTopWidth: 1,
        height: 45,
        right: 0,
        borderColor: '#71B7B7',
        left: 0,
        bottom: 0,
        position: 'absolute',
    },
    imageview: {
        shadowOffset: { width: 0, height: 3 },
        shadowColor: 'green',
        shadowOpacity: 0.5,
        elevation: 4,
        borderColor: '#71B7B7',
        borderRadius: 50,

    },
    iconBulliten1: {
        width: '50%',
        justifyContent: 'flex-end', alignItems: 'center',
        borderColor: '#71B7B7',
        flexDirection: 'row',
        marginLeft: 30,
        marginRight: -20
    },
    iconBulliten2: {
        width: '50%',
        justifyContent: 'center', alignItems: 'center',
        borderColor: '#71B7B7',
        flexDirection: 'row',
        marginLeft: 10
    },
    iconBulliten3: {
        borderLeftWidth: 0.5,
        width: '50%',
        justifyContent: 'center', alignItems: 'center',
        borderColor: '#71B7B7',
        backgroundColor: '#cccccc',
        flexDirection: 'row'
    },
    cancle: {
        flex: 1,
        backgroundColor: '#ffff',
        alignItems: 'center',
        paddingVertical: 5,
        borderTopLeftRadius: 5,
        borderBottomLeftRadius: 5, marginRight: 3,
        borderWidth: 1, borderColor: '#488B8F'

    },
    apply: {
        flex: 1,
        backgroundColor: '#488B8F',
        alignItems: 'center',
        paddingVertical: 5,
        borderBottomRightRadius: 5,
        borderTopRightRadius: 5, marginLeft: 3
    },
    controlStyle: {
        flexDirection: 'row',
        marginTop: 10,
    },
    nof: {
        backgroundColor: '#71B7B7',
        height: 250,
        borderRadius: 10,
        marginHorizontal: 16,
        marginVertical: 15
    },
    image: {
        width: width - 30,
        height: height * 0.4,
    },
    texttitle: {
        marginLeft: 10, marginTop: 20, width: 150, borderBottomWidth: 2, borderBottomColor: '#71B7B7'
    },
    texttitle1: {
        marginLeft: 150, marginTop: 20, width: 90, borderBottomWidth: 2, borderBottomColor: 'red'
    },
    header: {
        height: height * 0.08,
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.2,
        padding: 10,
        shadowOpacity: 0.2,
        elevation: 1,
        marginTop: Platform.OS == 'android' ? 25 : null,


    },
    icon: {
        marginLeft: 10,
        shadowOffset: { width: 0, height: 0 },
        shadowColor: 'green',
        shadowOpacity: 0.1,
        elevation: 1,
    },
    viewimage: {
        width: width - 30,
        height: height * 0.4,
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.2,
        marginHorizontal: 16,
        marginVertical: 10,
        elevation: 3,
        borderTopColor: '#71B7B7',
        backgroundColor: '#ffff'
    },
    searching: {
        backgroundColor: 'white',
        shadowOffset: { width: 0, height: 0 },
        shadowColor: 'green',
        shadowOpacity: 0.1,
        elevation: 4,
        paddingLeft: 15,
        ...Platform.select({
            ios: {
                width: 310,
                height: 35
            },
            android: {
                width: 310,
                height: 35
            },
            default: {
                // other platforms, web for example
            }
        })
    },
    text: {
        position: 'absolute',
        flexDirection: 'row',
        marginTop: 20,
        marginLeft: 20


    },
    text1: {
        position: 'absolute',
        marginTop: 40,
        marginLeft: 10
    },
    item: {
        marginTop: 10,
        flexDirection: 'row',
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 10,
    },
    recommend: {
        height: height * 0.35,
        marginTop: 10,
        marginRight: 10,
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.2,
        backgroundColor: '#71B7B7',
        borderRadius: 15,
        elevation: 2,
        borderColor: '#71B7B7'
    }
})