import React,{Component} from 'react';
import { View, Text, StyleSheet,Image,TextInput ,TouchableOpacity,FlatList,Switch,ActivityIndicator,ScrollView,ToastAndroid,Dimensions,Modal, Keyboard, KeyboardAvoidingView,TouchableWithoutFeedback } from 'react-native';
import { AntDesign } from '@expo/vector-icons'; 
import jwt_decode from 'jwt-decode'
import io from 'socket.io-client/dist/socket.io';
import {RNSlidingButton, SlideDirection} from 'rn-sliding-button';
import SwipeButton from 'rn-swipe-button';
import AsyncStorage from '@react-native-community/async-storage';
import { Ionicons } from '@expo/vector-icons'; 
import BottomSheet from 'reanimated-bottom-sheet'
import { Entypo } from '@expo/vector-icons'
import { FontAwesome } from '@expo/vector-icons'
import {Avatar} from 'react-native-paper'
import DropDownPicker from 'react-native-dropdown-picker'
import SectionedMultiSelect from 'react-native-sectioned-multi-select'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { FontAwesome5 } from '@expo/vector-icons'
import { MaterialIcons } from '@expo/vector-icons' 
import Animated from 'react-native-reanimated'
import { Foundation } from '@expo/vector-icons'
import DateTimePicker from 'react-native-modal-datetime-picker'
import moment from 'moment';
import * as Permissions from 'expo-permissions';
import iconsuccess from '../images/icon1.png'
import anhgrabjob from '../images/anhgrabjob.jpg';
import iconerror from '../images/icon2.png'
import MultiSelect from 'react-native-multiple-select'
import MapInput from '../components/MapInput'
import MyMapView from '../components/MapView'
import * as ImagePicker from 'expo-image-picker';
import { getLocation, geocodeLocationByName } from '../components/location-service'
import {socket} from "../Socket.io/socket.io";
const {height,width} =Dimensions.get('window');
var e;
var daynow = new Date()

export default class TaskPage extends React.Component{
    constructor(props){
        super(props);
        e=this;
        this.state={
          localUri:null,
          user_id:'',
          number_task:'',
          skip:'',
          dataPost:[
          ],
          _id:'',
          day:'',
          loadingdata: false,
          month:'',
          year:'',
          showposttask:false,
          task_owner_first_name:'',
          task_owner_avatar:'',
          task_owner_last_name:'',
          task_title:'',
          secret_key:'',
          task_requirement:'',
          task_description:'',
          task_type:'full-time',
          price_type:'',
          floor_price:'',
          ceiling_price:'',
          language:'',
          tags:'',
          industry:'',
          refreshing: false,
          formatted_address:'',
          latitude:null,
          longitude:null,
          region: [],
          skills:'',
          deal_price:'',
          position:'',
          show:false,
          isVisible:false,
          disabled:true,
          disabled1:false,
          disabled2:false,
          isVisible1:false,
          isVisible2:false,
          collapsed2:true,
          choosenTime:'',
          choosenTime1:'',
          choosenTime2:'',
          showindustry:false,
          showworkingtime:false,
          showprice:false,
          showskill:false,
          showtags:false,
          showlanguages:false,
          showlocation:false,
          items : [
            // this is the parent or 'item'
            {
              name: 'IT',
              id: 0,
              // these are the children or 'sub items'
              detail: [
                {
                  name: 'Software Engineer',
                  id: 10,
                },
                {
                  name: 'Programmer',
                  id: 2,
                },
                {
                  name: 'Tester',
                  id: 3,
                },
                {
                  name: 'Analysist',
                  id: 4,
                },
                {
                  name: 'Scurity',
                  id: 5,
                },
                {
                  name: 'Project Management',
                  id: 6,
                },
              ],
            },
            {
                name: 'Construction',
                id: 1,
                // these are the children or 'sub items'
                detail: [
                  {
                    name: 'Landscape and Park Engineering',
                    id: 7,
                  },
                  {
                    name: 'Cadastral',
                    id: 8,
                  },
                  {
                    name: 'Department of Urban Studies',
                    id: 9,
                  },
                ],
            },
        ],
        selectedItems: [],
        items1 : [
            // this is the parent or 'item'
            {
              name: 'IT',
              id: 'IT',
              // these are the children or 'sub items'
              detail: [
                {
                  name: 'Software Engineer',
                  id: 'Software Engineer',
                },
                {
                  name: 'Programmer',
                  id: 'Programmer',
                },
                {
                  name: 'Tester',
                  id: 'Tester',
                },
                {
                  name: 'Analysist',
                  id: 'Analysist',
                },
                {
                  name: 'Scurity',
                  id: 'Scurity',
                },
                {
                  name: 'Project Management',
                  id: 'Project Management',
                },
              ],
            },
            {
                name: 'Construction',
                id: 'Construction',
                // these are the children or 'sub items'
                detail: [
                  {
                    name: 'Landscape and Park Engineering',
                    id: 'Landscape and Park Engineering',
                  },
                  {
                    name: 'Cadastral',
                    id: 'Cadastral',
                  },
                  {
                    name: 'Department of Urban Studies',
                    id: 'Department of Urban Studies',
                  },
                ],
            },
        ],
        selectedSkill: [],
        items3 : [
          {
            // this is the parent or 'item'
            id: 'Active listening',
            name: 'Active listening',
          }, {
            id: 'Communication',
            name: 'Communication',
          }, {
            id: 'Computer skills',
            name: 'Computer skills',
          }, {
            id: 'Customer service.',
            name: 'Customer service.',
          }, {
            id: 'Interpersonal skills',
            name: 'Interpersonal skills',
          }, {
            id: 'Leadership',
            name: 'Leadership',
          }, {
            id: 'Management skills',
            name: 'Management skills',
          }, {
            id: 'Problem-solving.',
            name: 'Problem-solving.',
          },
        ],
        selectedTags: [],
        items4 : [
          {
            // this is the parent or 'item'
            id: 'Sales',
            name: 'Sales',
          }, {
            id: 'Sales Technical',
            name: 'Sales Technical',
          }, {
            id: 'Mechanical',
            name: 'Mechanical',
          }, {
            id: 'Authorization Control',
            name: 'Authorization Control',
          }, {
            id: 'Achieve Targets',
            name: 'Achieve Targets',
          }, {
            id: 'Direct Sales',
            name: 'Direct Sales',
          }, {
            id: 'E-Commerce',
            name: 'E-Commerce',
          }, {
            id: 'Agriculture',
            name: 'Agriculture',
          },
        ],
        selectedLanguages: [],
        showrecommendperson:false,
        items5 : [
          {
            // this is the parent or 'item'
            id: 'Vietnam',
            name: 'Vietnam',
          }, {
            id: 'France',
            name: 'France',
          }, {
            id: 'English',
            name: 'English',
          }, {
            id: 'Italia',
            name: 'Italia',
          }, {
            id: 'Thailand',
            name: 'Thailand',
          }, {
            id: 'Lao',
            name: 'Lao',
          }, {
            id: 'USA',
            name: 'USA',
          }, {
            id: 'Denmark',
            name: 'Denmark',
          },
        ],
        dataindustry:[],
        dataskills:[],
        datatags:[],
        skill_query:'Quản lý',
        tag_query:'Developer',
        start_time:'',
        end_time:'',
        shownotice:false,
        showmess:'',
        showaa:false,
        showmess1:'',
        showaa1:false,
        showmess2:'',
        showaa2:false,
        notice: '',
        key: "",
        keycheck: '',
        task_id:'',
        showninvite:false,
        dataemployee:[],
        }
        this.onInvite = this.onInvite.bind(this)
        socket.on('sv-send-work-invitation',function(data){
          if (data.success == true) {
            e.setState({
              showninvite: true,
            })
          }
          else if (data.success == false) {
            console.log(data)
          }
        })
        this.onSubmit = this.onSubmit.bind(this)
        this.onRecommend = this.onRecommend.bind(this)
        this.showProfilefriend = this.showProfilefriend.bind(this)
        socket.on('sv-new-tasks',function(data){
          if(data.success==true){
            var list = data.data
            e.setState({
              showposttask:false,
              showrecommendperson:true,
              task_id:list._id,
              shownotice: true,
              notice: 'Post Success !',
              key: "success",
              keycheck: 'success',
              task_title:'full-time',
              task_requirement:'',
              task_description:'',
              show:false,
              task_type:'',
              price_type:'',
              floor_price:'',
              selectedLanguages: [],
              selectedTags:[],
              ceiling_price:'',
              end_time:'',
              start_time:'',
              language:'',
              industry:'',
              position:'',
              region:'',
              skills:'',
              disabled:true,
              disabled1:false,
              disabled2:false,
              tags:'',
              day:'',
              month:'',
              year:'',
              choosenTime:'',
              choosenTime1:'',
              choosenTime2:'',
              formatted_address:'',
              longitude:'',
              latitude:'',
              start_time:'',
              end_time:'',
              
            })
            //console.log(list)
          }
          else if(data.success==false){
            console.log(data.errors)
          }
        })
        this.onDetail=this.onDetail.bind(this)
        socket.on("sv-get-industry-list",function(data){
          var list=data.data
          if(data.success==false){
            console.log(JSON.stringify(data))
          }else if(data.success==true){
              /*console.log(JSON.stringify(list))*/
            e.setState({
              dataindustry:list,
            })
          }
        })
        socket.on("sv-get-skills-list",function(data){
          var list=data.data
          //console.log(JSON.stringify(list))
          if(data.success==false){
            //console.log(JSON.stringify(data))
          }else if(data.success==true){
              e.setState({
                dataskills:list,
              })
              //console.log(JSON.stringify(list))
          }
        })
        socket.on("sv-get-tags-list",function(data){
          var list=data.data
          if(data.success==false){
            //console.log(JSON.stringify(data))
          }else if(data.success==true){
            e.setState({
              datatags:list,
            })
          }
          //console.log(data)
        })

        socket.on("sv-get-wall-task",function(data){
            var list=data.data
            if(data.success==false){
              console.log(JSON.stringify(data))
            }else if(data.success==true){
                //console.log(JSON.stringify(list)) 5fcf66dba3ea4b0004ddbc40
              e.setState({
                dataPost:list.reverse(),
                isLoading:false,
                loadingdata:true,
              })
            }
            //console.log(list)
        })

      socket.on("sv-get-recommend-candidate",function(data){
          var list=data.data
          e.setState({
            dataemployee:list
          })
          console.log(list)
        })

      };

 	    onDetail(a) {
        this.props.detail(a)
      }
      componentDidMount=async()=>{
        const token= await AsyncStorage.getItem('token')
        const decode=jwt_decode(token)
        if(this.state.showpost==true){
          this.setState({
            showposttask:true
          })
        }
        e.setState({
          user_id:decode._id,
          secret_key:token,
          task_owner_first_name:decode.first_name,
          task_owner_last_name:decode.last_name,
          task_owner_avatar:decode.avatar,
        })
        const getindustry={
          language:'en'
        }
        socket.emit("cl-get-industry-list",getindustry)

        const getskills={
          skill_query:this.state.skill_query
        }
        socket.emit("cl-get-skills-list",getskills)

        const gettags={
          tag_query:this.state.tag_query
        }
       socket.emit("cl-get-tags-list",gettags)
        const post ={
          user_id : decode._id,
          number_task:20,
          skip:0
        }
        socket.emit("cl-get-wall-task",post)
      }
      onInvite(_id){
        const inviteuser={
          secret_key:this.state.secret_key,
          task_id:this.state.task_id,
          invitee_id:_id
        }
        socket.emit("cl-send-work-invitation",inviteuser)
        console.log(inviteuser)
      }
      refreshTop(){
        this.componentDidMount()
      }
      onRecommend(){
        const getlistrecommend={
          secret_key:this.state.secret_key,
          task_id:this.state.task_id
        }
       socket.emit("cl-get-recommend-candidate",getlistrecommend)
        console.log(getlistrecommend)
      }
      onSubmit=async()=>{
        var d = new Date();
        if(this.state.task_type=='freelance'){
          if (this.state.task_title=='') {
            e.setState({
                showmess: "Enter your task title!",
                showaa:true
            });
          }
          if(this.state.task_requirement==''){
            e.setState({
              showmess1: "Enter your task requirement!",
              showaa1:true
            });
          }
          if(this.state.task_description==''){
            e.setState({
              showmess2: "Enter your task description!",
              showaa2:true
            });
          }
          else if(this.state.choosenTime2==''){
            e.setState({
              shownotice: true,
              notice: 'Enter your job date !',
              key: "error",
              keycheck: 'job_date'
            })
          }
          else if(this.state.year<moment(d).format('YYYY')){
            e.setState({
              shownotice: true,
              notice: "Job Date isn't in the correct format !",
              key: "error",
              keycheck: 'check_date'
            })
          }
          else if(this.state.month<moment(d).format('MM')){
            e.setState({
              shownotice: true,
              notice: "Job Date isn't in the correct format !",
              key: "error",
              keycheck: 'check_date'
            })
          }
          else if(this.state.day<moment(d).format('DD')){
            e.setState({
              shownotice: true,
              notice: "Job Date isn't in the correct format !",
              key: "error",
              keycheck: 'check_date'
            })
          }
          else if(this.state.formatted_address=='')
          {
            e.setState({
              shownotice: true,
              notice: 'Enter your location !',
              key: "error",
              keycheck: 'location'
            })
          }
          else if(this.state.price_type==''){
            e.setState({
              shownotice: true,
              notice: 'Enter your price type !',
              key: "error",
              keycheck: 'price_type'
            })
          }
          else if(this.state.price_type=="unextract"&this.state.floor_price==""){
            e.setState({
              shownotice: true,
              notice: 'Enter your floor price !',
              key: "error",
              keycheck: 'floor_price'
            })
          }
          else if(this.state.price_type=="unextract"&this.state.ceiling_price==""){
            e.setState({
              shownotice: true,
              notice: 'Enter your ceiling price !',
              key: "error",
              keycheck: 'ceiling_price'
            })
          }
          else if (this.state.floor_price>this.state.ceiling_price) {
            e.setState({
                shownotice: true,
                notice: 'Ceiling price must be greater than floor price !',
                key: "error",
                keycheck: 'check_price'
            })
          }
          else if(this.state.start_time==""){
            e.setState({
              shownotice: true,
              notice: 'Enter your start time !',
              key: "error",
              keycheck: 'start_time'
            })
          }
          else if(this.state.end_time==""){
            e.setState({
              shownotice: true,
              notice: 'Enter your end time !',
              key: "error",
              keycheck: 'end_time'
            })
          }
          else if(this.state.start_time>=this.state.end_time){
            e.setState({
              shownotice: true,
              notice: 'End time must be greater than start time !',
              key: "error",
              keycheck: 'end_time'
            })
          }
          else if(this.state.language==""){
            e.setState({
              shownotice: true,
              notice: 'Enter your language !',
              key: "error",
              keycheck: 'language'
            })
          }
          else if(this.state.tags==""){
            e.setState({
              shownotice: true,
              notice: 'Enter your tags !',
              key: "error",
              keycheck: 'tags'
            })
          }
          else{
            const tasknew={
              secret_key:this.state.secret_key,
              task_title:this.state.task_title,
              task_requirement:this.state.task_requirement,
              task_description:this.state.task_description,
              task_type:this.state.task_type,
              price_type:this.state.price_type,
              floor_price:this.state.floor_price,
              ceiling_price:this.state.ceiling_price,
              language:this.state.language,
              tags:this.state.tags,
              day:this.state.day,
              month:this.state.month,
              year:this.state.year,
              location:{
                formatted_address:this.state.formatted_address,
                geometry:{
                  location:{
                    coordinates:[this.state.longitude,this.state.latitude]
                  }
                }
              },
              working_time:{
                start_time:this.state.start_time,
                end_time:this.state.end_time
              }
          }
           socket.emit("cl-new-tasks",tasknew)
            //console.log(tasknew)
          }
        }
        else {
          if (this.state.task_title=='') {
            e.setState({
                showmess: "Enter your task title!",
                showaa:true
            });
          }
          if(this.state.task_requirement==''){
            e.setState({
              showmess1: "Enter your task requirement!",
              showaa1:true
            });
          }
          if(this.state.task_description==''){
            e.setState({
              showmess2: "Enter your task description!",
              showaa2:true
            });
          }
          else if(this.state.choosenTime2==''){
            e.setState({
              shownotice: true,
              notice: 'Enter your job date !',
              key: "error",
              keycheck: 'job_date'
            })
          }
          else if(this.state.year<moment(d).format('YYYY')){
            e.setState({
              shownotice: true,
              notice: "Job Date isn't in the correct format !",
              key: "error",
              keycheck: 'check_date'
            })
          }
          else if(this.state.month<moment(d).format('MM')){
            e.setState({
              shownotice: true,
              notice: "Job Date isn't in the correct format !",
              key: "error",
              keycheck: 'check_date'
            })
          }
          else if(this.state.day<moment(d).format('DD')){
            e.setState({
              shownotice: true,
              notice: "Job Date isn't in the correct format !",
              key: "error",
              keycheck: 'check_date'
            })
          }
          else if(this.state.formatted_address=='')
          {
            e.setState({
              shownotice: true,
              notice: 'Enter your location !',
              key: "error",
              keycheck: 'location'
            })
          }
          else if(this.state.price_type==''){
            e.setState({
              shownotice: true,
              notice: 'Enter your price type !',
              key: "error",
              keycheck: 'price_type'
            })
          }
          else if(this.state.price_type=="unextract"&this.state.floor_price==""){
            e.setState({
              shownotice: true,
              notice: 'Enter your floor price !',
              key: "error",
              keycheck: 'floor_price'
            })
          }
          else if(this.state.price_type=="unextract"&this.state.ceiling_price==""){
            e.setState({
              shownotice: true,
              notice: 'Enter your ceiling price !',
              key: "error",
              keycheck: 'ceiling_price'
            })
          }
          else if (this.state.floor_price>this.state.ceiling_price) {
            e.setState({
                shownotice: true,
                notice: 'Ceiling price must be greater than floor price !',
                key: "error",
                keycheck: 'check_price'
            })
          }
          else if(this.state.start_time==""){
            e.setState({
              shownotice: true,
              notice: 'Enter your start time !',
              key: "error",
              keycheck: 'start_time'
            })
          }
          else if(this.state.end_time==""){
            e.setState({
              shownotice: true,
              notice: 'Enter your end time !',
              key: "error",
              keycheck: 'end_time'
            })
          }
          else if(this.state.start_time>=this.state.end_time){
            e.setState({
              shownotice: true,
              notice: 'End time must be greater than start time !',
              key: "error",
              keycheck: 'end_time'
            })
          }
          else if(this.state.language==""){
            e.setState({
              shownotice: true,
              notice: 'Enter your language !',
              key: "error",
              keycheck: 'language'
            })
          }
          else if(this.state.industry==""){
            e.setState({
              shownotice: true,
              notice: 'Enter your industry !',
              key: "error",
              keycheck: 'industry'
            })
          }
          else if(this.state.position==""){
            e.setState({
              shownotice: true,
              notice: 'Enter your position !',
              key: "error",
              keycheck: 'position'
            })
          }
          else if (this.state.skills==""){
            e.setState({
              shownotice: true,
              notice: 'Enter your skills !',
              key: "error",
              keycheck: 'skills'
            })
          }
          else if(this.state.tags==""){
            e.setState({
              shownotice: true,
              notice: 'Enter your tags !',
              key: "error",
              keycheck: 'tags'
            })
          }
          else{
            const tasknew={
              secret_key:this.state.secret_key,
              task_title:this.state.task_title,
              task_requirement:this.state.task_requirement,
              task_description:this.state.task_description,
              task_type:this.state.task_type,
              price_type:this.state.price_type,
              floor_price:this.state.floor_price,
              ceiling_price:this.state.ceiling_price,
              language:this.state.language,
              industry:this.state.industry,
              position:this.state.position,
              skills:this.state.skills,
              tags:this.state.tags,
              day:this.state.day,
              month:this.state.month,
              year:this.state.year,
              location:{
                formatted_address:this.state.formatted_address,
                geometry:{
                  location:{
                    coordinates:[this.state.longitude,this.state.latitude]
                  }
                }
              },
              working_time:{
                start_time:this.state.start_time,
                end_time:this.state.end_time
              }
            }
            socket.emit("cl-new-tasks",tasknew)
            //console.log(tasknew)
            //console.log(getlistrecommend)
          }
        }
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
                    }
                });
            }
        );
      }
      getCoordsFromName(loc,name) {
      //console.log(loc)
      //console.log(name)
      this.setState({
          region: {
              formatted_address:name,
              latitude: loc.lat,
              longitude: loc.lng,
              latitudeDelta: 0.003,
              longitudeDelta: 0.003
          }
      });
      }
      onChangeTagsInput(tag_query){
        this.setState({tag_query})
        const gettags={
          tag_query:this.state.tag_query
        }
        socket.emit("cl-get-tags-list",gettags)
      }
      onChangeValueInput(skill_query){
        this.setState({skill_query})
        const getskills={
          skill_query:this.state.skill_query
        }
       socket.emit("cl-get-skills-list",getskills)
      }
      onMapRegionChange(region) {
          this.setState({ region });
      }
      onSelectedLanguagesChange = (selectedLanguages) => {
        this.setState({ selectedLanguages });
      };
      onSelectedTagsChange = (selectedTags) => {
        this.setState({ selectedTags });
      };
      onSelectedSkillsChange = (selectedSkill) => {
        this.setState({ selectedSkill });
      };
      onSelectedItemsChange = (selectedItems) => {
        this.setState({ selectedItems});
        console.log(selectedItems)
      };
      handlePicker=(time)=>{
        this.setState({show1:true,isVisible:false,choosenTime:moment(time).format('HH:mm'),start_time:moment(time).format('HH:mm')})
      } 
      showPicker=()=>{
        this.setState({isVisible:true})
      }
      hidePicker=()=>{
        this.setState({isVisible:false }) 
      }
      handlePicker1=(time)=>{
        this.setState({isVisible1:false,choosenTime1:moment(time).format('HH:mm'),end_time:moment(time).format('HH:mm')})
      } 
      showPicker1=()=>{
        this.setState({isVisible1:true})
      }
      hidePicker1=()=>{
        this.setState({isVisible1:false }) 
      }
      handlePicker2=(date)=>{
        this.setState({isVisible2:false,choosenTime2:moment(date).format('DD/MM/YYYY'),day:moment(date).format('DD'),month:moment(date).format('MM'),year:moment(date).format('YYYY')})
      } 
      showPicker2=()=>{
        this.setState({isVisible2:true})
      }
      hidePicker2=()=>{
        this.setState({isVisible2:false }) 
      }
      toggleExpanded2 =() =>{
        this.setState({collapsed2:!this.state.collapsed2})
      }
      changePosition(item){
        switch (item.value) {
          case '1':
          break;
          case '2':
          break;
          case '3':
          break;
      }
      this.setState({
        position:item.label
      });
      }
      changePrice(item){
        switch (item.value) {
          case '1':
          break;
          case '2':
          break;
        }
        if(item.label=="Unextract"){
          this.setState({
            price_type:'unextract'
          });
        }
        else if(item.label=="Dealing"){
          this.setState({
            price_type:'dealing'
          });
        }
      }
    changeJob(item,props,onpress) { 
        switch (item.value) {
            case '1':
            break;
            case '2':
            break;
            case '3':
            break;
        }
        if(item.label=="Freelance"){
          this.setState({
            task_type:'freelance'
          });
        }
        else if(item.label=="Full-time"){
          this.setState({
            task_type:'full-time'
          });
        }
        else if(item.label=="Part-time"){
          this.setState({
            task_type:'part-time'
          });
        }
        if(item.value==1){
          this.setState({
            show:false,
            disabled:true,
            disabled1:false,
            disabled2:false
          });
        }
        else if(item.value==2) this.setState({
          show:true,
          disabled:false,
          disabled1:true,
          disabled2:false
        });
        else this.setState({
          show:false,
          disabled:false,
          disabled1:false,
          disabled2:true
        });
    }
    setInputIndustry(a){
      this.setState({
        industry:a,
        showindustry:false
      })
    }
    setInputSkill(a){
      this.setState({
        skills:a,
        showskill:false
      })
    }
    setInputTag(a){
      this.setState({
        tags:a,
        showtags:false
      })
    }
    setInputLanguage(a){
      this.setState({
        language:a,
        showlanguages:false
      })
    }
    setInputLocation(a,b,c){
      this.setState({
        formatted_address:a,
        latitude:b,
        longitude:c,
        showlocation:false
      })
    }
    showProfilefriend(){
        this.setState({
          showrecommendperson:false
        })
    }
    openImagePickerAsync = async () => {
    let permissionResult = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    let pickerResult = await ImagePicker.launchImageLibraryAsync({
      type: [ImagePicker.MediaTypeOptions.file]
    });
    console.log(pickerResult);
    if (pickerResult.cancelled === true) {
      return;
    }
    this.setState({ localUri: pickerResult.uri});
      
      // if(this.state.localUri!=null){
      //   let apiUrl = 'https://taskeepererver.herokuapp.com/avataruploader/';
      //   var data = new FormData();  
      //   data.append('file', {  
      //     uri: this.state.localUri,
      //     name: 'file',
      //     type: 'image/jpg'
      //   })
      //   data.append('secret_key', this.state.secret_key)
      //   console.log(data)
      //   fetch(apiUrl, {  
      //     method: 'POST',
      //     body: data
      //   }).then(
      //     response => {
      //       console.log('success ')
      //       console.log(response)
      //     }
      //     ).catch(err => {
      //     console.log('err ')
      //     console.log(err)
      //   } )
      // }
    }
    onSlideRight = () => {
      //perform Action on slide success.
  };
    renderInner = () => (

        <View style={styles.panel}>
          <Modal transparent={true}
            visible={this.state.showlocation}
            animationType='slide'
          >
            <View style={styles.container}>
                    <View style={{backgroundColor:'white',width:width,height:100,justifyContent: 'center'}}>
                        <View style={{justifyContent:'space-between',flexDirection:'row'}}>
                          <TouchableOpacity onPress={()=>this.setState({showlocation:false})}>
                              <View style={{marginLeft:10}}>
                                    <AntDesign name="close" size={24} color="black" />
                              </View>
                            </TouchableOpacity>
                          <Text style={{fontWeight:'bold',fontSize:18}}>Location</Text>              
                          <TouchableOpacity onPress={()=>this.setInputLocation(this.state.region.formatted_address,this.state.region.latitude,this.state.region.longitude)} >
                            <View style={{marginRight:10}}>
                                    <FontAwesome name="location-arrow" size={27} color="blue" />
                            </View>
                          </TouchableOpacity>
                      </View>
                    </View>
                    <View style={{ flex: 1,marginTop:10 }}>
                        <MapInput notifyChange={(loc,name) => this.getCoordsFromName(loc,name)}
                        />
                    </View>
    
                    {
                        this.state.region['latitude'] ?
                            <View style={{ flex: 1 }}>
                                <MyMapView
                                    region={this.state.region}
                                    onRegionChange={(reg) => this.onMapRegionChange(reg)} />
                            </View> : null}
                </View>
          </Modal>
          <Modal transparent={true}
          visible={this.state.showlanguages}
          animationType='slide'
          >
            <View style={styles.container}>
              <View style={{backgroundColor:'white',height:100,width:width,borderBottomWidth:1,borderBottomColor:'#D8D8D8',justifyContent: 'center'}}>
                        <View style={{justifyContent:'space-between',flexDirection:'row'}}>
                            <TouchableOpacity onPress={()=>this.setState({showlanguages:false})}>
                                <View style={{marginLeft:10}}>
                                      <AntDesign name="close" size={24} color="black" />
                                </View>
                              </TouchableOpacity>
                            <Text style={{fontWeight:'bold',fontSize:18}}>Languages</Text>
                            {this.state.selectedLanguages.length==0?
                              <View >
                                    <Text style={{fontWeight:'bold',fontSize:18,marginRight:10,color:'#D8D8D8'}}>Done</Text>
                                </View>
                                :
                                <TouchableOpacity onPress={()=>this.setInputLanguage(this.state.selectedLanguages)}  >
                                <View >
                                    <Text style={{fontWeight:'bold',fontSize:18,marginRight:10,color:'#2d7474'}}>Done</Text>
                                </View>
                              </TouchableOpacity>}
                        </View>
                    </View>
                <MultiSelect
                        items={this.state.items5}
                        uniqueKey="id"
                        onSelectedItemsChange={this.onSelectedLanguagesChange}
                        selectedItems={this.state.selectedLanguages}
                        selectText="    Choose Languages"
                        searchInputPlaceholderText="Search Items..."
                        tagRemoveIconColor="#2d7474"
                        tagBorderColor="#2d7474"
                        tagTextColor="#2d7474"
                        selectedItemTextColor="black"
                        selectedItemIconColor="black"
                        itemTextColor="black"
                        searchInputStyle={{ color: 'black' }}
                        submitButtonColor="#2d7474"
                        submitButtonText="Confirm"
                      />
                  </View>
          </Modal>
          <Modal transparent={true}
          visible={this.state.showindustry}
          animationType='slide'
          >
            <View style={styles.container}>
                  <View style={{backgroundColor:'white',height:100,width:width,borderBottomWidth:1,borderBottomColor:'#D8D8D8',justifyContent: 'center'}}>
                      <View style={{justifyContent:'space-between',flexDirection:'row'}}>
                          <TouchableOpacity onPress={()=>this.setState({showindustry:false})}>
                              <View style={{marginLeft:10}}>
                                    <AntDesign name="close" size={24} color="black" />
                              </View>
                            </TouchableOpacity>
                          <Text style={{fontWeight:'bold',fontSize:18}}>Industry</Text>
                          {this.state.selectedItems.length==0?
                          <View >
                                <Text style={{fontWeight:'bold',fontSize:18,marginRight:10,color:'#D8D8D8'}}>Done</Text>
                            </View>
                            :
                            <TouchableOpacity onPress={()=>this.setInputIndustry(this.state.selectedItems)}  >
                            <View >
                                <Text style={{fontWeight:'bold',fontSize:18,marginRight:10,color:'#2d7474'}}>Done</Text>
                            </View>
                          </TouchableOpacity>}
                      </View>
                  </View>
                  <SectionedMultiSelect
                    //items={this.state.items1}
                    items={this.state.dataindustry}
                    IconRenderer={MaterialIcons}
                    styles={{
                      button: {
                        backgroundColor: '#2d7474',
                      },
                      color:'#2d7474',
                    }}
                    uniqueKey="name"
                    subKey="detail"
                    selectText="Choose industry you want..."
                    showDropDowns={true}
                    readOnlyHeadings={true}
                    onSelectedItemsChange={this.onSelectedItemsChange}
                    selectedItems={this.state.selectedItems}
                    />
              </View>
          </Modal>
          <Modal transparent={true}
          visible={this.state.showskill}
          animationType='slide'
          >
            <View style={styles.container}>
              <View style={{backgroundColor:'white',height:100,width:width,borderBottomWidth:1,borderBottomColor:'#D8D8D8',justifyContent: 'center'}}>
                        <View style={{justifyContent:'space-between',flexDirection:'row'}}>
                            <TouchableOpacity onPress={()=>this.setState({showskill:false})}>
                                <View style={{marginLeft:10}}>
                                      <AntDesign name="close" size={24} color="black" />
                                </View>
                              </TouchableOpacity>
                            <Text style={{fontWeight:'bold',fontSize:18}}>Skills</Text>
                            {this.state.selectedSkill.length==0?
                              <View >
                                    <Text style={{fontWeight:'bold',fontSize:18,marginRight:10,color:'#D8D8D8'}}>Done</Text>
                                </View>
                                :
                                <TouchableOpacity onPress={()=>this.setInputSkill(this.state.selectedSkill)}  >
                                <View >
                                    <Text style={{fontWeight:'bold',fontSize:18,marginRight:10,color:'#2d7474'}}>Done</Text>
                                </View>
                              </TouchableOpacity>}
                        </View>
                    </View>
                <MultiSelect
                        //items={this.state.items3}
                        items={this.state.dataskills}
                        uniqueKey="name"
                        onSelectedItemsChange={this.onSelectedSkillsChange}
                        onChangeInput={(skill_query)=>this.onChangeValueInput(skill_query)}
                        //textInputProps={this.onChangeSkillsInput}
                        selectedItems={this.state.selectedSkill}
                        selectText="  Choose Skills"
                        searchInputPlaceholderText="Search Items..."
                        tagRemoveIconColor="#2d7474"
                        tagBorderColor="#2d7474"
                        tagTextColor="#2d7474"
                        selectedItemTextColor="black"
                        selectedItemIconColor="black"
                        itemTextColor="black"
                        searchInputStyle={{ color: 'black' }}
                        submitButtonColor="#2d7474"
                        submitButtonText="Confirm"
                        
                      />
                  </View>
          </Modal>
          <Modal transparent={true}
          visible={this.state.showtags}
          animationType='slide'
          >
            <View style={styles.container}>
              <View style={{backgroundColor:'white',height:100,width:width,borderBottomWidth:1,borderBottomColor:'#D8D8D8',justifyContent: 'center'}}>
                        <View style={{justifyContent:'space-between',flexDirection:'row'}}>
                            <TouchableOpacity onPress={()=>this.setState({showtags:false})}>
                                <View style={{marginLeft:10}}>
                                      <AntDesign name="close" size={24} color="black" />
                                </View>
                              </TouchableOpacity>
                            <Text style={{fontWeight:'bold',fontSize:18}}>Tags</Text>
                            {this.state.selectedTags.length==0?
                              <View >
                                    <Text style={{fontWeight:'bold',fontSize:18,marginRight:10,color:'#D8D8D8'}}>Done</Text>
                                </View>
                                :
                                <TouchableOpacity onPress={()=>this.setInputTag(this.state.selectedTags)}  >
                                <View >
                                    <Text style={{fontWeight:'bold',fontSize:18,marginRight:10,color:'#2d7474'}}>Done</Text>
                                </View>
                              </TouchableOpacity>}
                        </View>
                    </View>
                <MultiSelect
                        items={this.state.datatags}
                        //items={this.state.items4}
                        uniqueKey="name"
                        onSelectedItemsChange={this.onSelectedTagsChange}
                        onChangeInput={(tag_query)=>this.onChangeTagsInput(tag_query)}
                        selectedItems={this.state.selectedTags}
                        selectText="    Choose Tags"
                        searchInputPlaceholderText="Search Tags..."
                        tagRemoveIconColor="#2d7474"
                        tagBorderColor="#2d7474"
                        tagTextColor="#2d7474"
                        selectedItemTextColor="black"
                        selectedItemIconColor="black"
                        itemTextColor="black"
                        searchInputStyle={{ color: 'black' }}
                        submitButtonColor="#2d7474"
                        submitButtonText="Confirm"
                      />
                  </View>
          </Modal>
          <ScrollView>
          <View style={{flexDirection:'column',backgroundColor:'white',height:500}}>
                    <View style={{flexDirection:'row'}}>
                        <TouchableOpacity onPress={this.showPicker2} style={{flexDirection:'row'}}>
                            <View  style={{position:'absolute'}}>
                                <MaterialCommunityIcons name="calendar" size={28} color="blue" />
                            </View >
                            <View style={{marginLeft:50,marginTop:2}}>
                                <Text style={{fontSize:15,fontWeight:'bold'}}>Job Date</Text>
                            </View>
                        </TouchableOpacity>
                        {this.state.year<moment(daynow).format('YYYY')
                        ?
                        <>
                        {this.state.choosenTime2==''?null:<View style={{marginTop:2,marginLeft:10}}><Text style={{color:'red',fontStyle:'italic'}}>Job Date isn't in the correct format !</Text></View>}
                        </>
                        :
                        <>
                        {this.state.month<moment(daynow).format('MM')?
                        <>
                        {this.state.choosenTime2==''?null:<View style={{marginTop:2,marginLeft:10}}><Text style={{color:'red',fontStyle:'italic'}}>Job Date isn't in the correct format !</Text></View>}
                        </>
                        :
                        <>
                        {this.state.day<moment(daynow).format('DD')?
                        <>
                        {this.state.choosenTime2==''?null:<View style={{marginTop:2,marginLeft:10}}><Text style={{color:'red',fontStyle:'italic'}}>Job Date isn't in the correct format !</Text></View>}
                        </>
                        :
                            <View style={{marginTop:2,marginLeft:10}}>
                              <Text style={{fontWeight:'bold',fontSize:15}}>{this.state.choosenTime2}</Text>
                          </View>
                        }
                        </>
                        }
                        </>
                        }
                        <DateTimePicker
                            isVisible={this.state.isVisible2}
                            onConfirm={this.handlePicker2}
                            onCancel={this.hidePicker2}
                            mode={'date'}
                        />
                     </View>
                    <TouchableOpacity onPress={()=>this.setState({showlocation:true})} style={{flexDirection:'row',marginTop:20,marginLeft:2}}>
                        <View  style={{position:'absolute',left:0}}>
                            <Entypo name="location" size={28} color="red" />
                        </View >
                        <View  style={{marginLeft:50,marginTop:2}}>
                            <Text style={{fontSize:15,fontWeight:'bold'}}>Address</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>this.setState({showprice:true})} style={{flexDirection:'row',marginTop:20,marginLeft:2}}>
                        <View  style={{position:'absolute',left:0}}>
                            <FontAwesome5 name="money-check-alt" size={28} color="green" />
                        </View >
                        <View  style={{marginLeft:50,marginTop:2,flexDirection:'row'}}>
                            <Text style={{fontSize:15,fontWeight:'bold'}}>Price</Text>
                            {!this.state.price_type?null:
                                <>
                                  {this.state.price_type==="unextract"&this.state.floor_price!=''&this.state.ceiling_price!=''?
                                    <View style={{marginLeft:10}}>
                                        <Entypo name="check" size={20} color="#71B7B7" />
                                    </View>
                                  :null}
                                  {this.state.price_type==="dealing"?
                                    <View style={{marginLeft:10}}>
                                        <Entypo name="check" size={20} color="#71B7B7" />
                                    </View>
                                  :null}
                                </>
                            }
                        </View>
                    </TouchableOpacity>
                      <KeyboardAvoidingView behavior="padding" style={{justifyContent: 'center' }}>
                        <Modal
                          transparent={true}
                          visible={this.state.showprice}
                          animationType='slide'
                          style={{ justifyContent: 'center', alignItems: 'center' }}
                        >
                          <TouchableWithoutFeedback onPress={Keyboard.dismiss} style={{ backgroundColor: '#000000aa', flex: 1, justifyContent: 'center', alignItems: 'center'}} >
                          <View style={{ backgroundColor: '#000000aa', flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                <View style={{
                                    backgroundColor: '#faf9f9', borderRadius: 20,
                                    height: 220, width: "70%", flexDirection:'column',justifyContent: 'center'
                                }}>
                                      <View style={{alignItems:'center',marginBottom:20}}>
                                        <Text style={{fontWeight:'bold',fontSize:18}}>Please choose price type!</Text>
                                      </View> 
                                      <View style={{alignItems:'center'}}>
                                        <View style={{flexDirection:'row'}}>
                                          <DropDownPicker
                                              items={[
                                                  {label: 'Unextract', value: '1'},
                                                  {label: 'Dealing', value: '2'},
                                              ]}
                                              defaultNull
                                              placeholder="Choose Price"
                                              containerStyle={{height: 30,width:150}}
                                              onChangeItem={price_type => this.changePrice(price_type)}
                                              style={{backgroundColor:'white'}}
                                          />
                                          {this.state.price_type==="unextract"?
                                          <View style={{marginLeft:10}}>
                                              <Entypo name="check" size={20} color="#71B7B7" />
                                          </View>
                                          :null
                                          }
                                        </View>
                                      </View>
                                      {this.state.price_type==="unextract"?
                                          <View style={{flexDirection:'row',justifyContent: 'center',alignItems:'center',marginTop:10}}>
                                              <TextInput 
                                              style={styles.input2}
                                              placeholder={'Low Salary'} 
                                              onChangeText={(floor_price)=> this.setState({floor_price})}
                                              placeholderTextColor={'grey'}
                                              underlineColorAndroid='transparent'
                                              multiline={true}
                                            >
                                            </TextInput>
                                            <View style={{marginLeft:10,marginTop:2}}>
                                                <Text style={{fontWeight:'bold'}}>:</Text>
                                            </View>
                                            <TextInput 
                                              style={styles.input2}
                                              placeholder={'High Salary'} 
                                              onChangeText={(ceiling_price)=> this.setState({ceiling_price})}
                                              placeholderTextColor={'grey'}
                                              underlineColorAndroid='transparent'
                                              multiline={true}
                                            >
                                            </TextInput>
                                          </View>
                                          :null
                                          }
                                      <View style={{alignItems: 'center'}}>
                                        <TouchableOpacity onPress={() => this.setState({ showprice: false })} style={{
                                              width: "50%", backgroundColor: 'green',
                                              height: 30, borderRadius: 10, marginTop: 15, justifyContent: 'center', alignItems: 'center'
                                          }}>
                                              <Text style={{ color: "white", fontSize: 15, fontWeight: 'bold' }}>Ok</Text>
                                        </TouchableOpacity>
                                      </View>
                                </View>
                            </View>
                            </TouchableWithoutFeedback>
                        </Modal>
                      </KeyboardAvoidingView>
                    <TouchableOpacity onPress={()=>this.setState({showworkingtime:true})} style={{flexDirection:'row',marginTop:20,marginLeft:2}} >
                        <View  style={{position:'absolute',left:0}}>
                            <FontAwesome name="calendar" size={24} color="orange" />
                        </View >
                        <View style={{flexDirection:'column'}}>
                            <View style={{flexDirection:'row'}}>
                                <View style={{marginLeft:50,marginTop:2,flexDirection:'row'}}>
                                    <Text style={{fontSize:15,fontWeight:'bold'}}>Working Time</Text>
                                    {!this.state.start_time|!this.state.end_time?null:
                                      <View style={{marginLeft:10}}>
                                          <Entypo name="check" size={20} color="#71B7B7" />
                                      </View>
                                    }
                                </View>
                            </View>
                        </View>
                    </TouchableOpacity>
                    <Modal transparent={true}
                      visible={this.state.showworkingtime}
                      animationType='slide'
                      style={{ justifyContent: 'center', alignItems: 'center' }}
                    >
                        <View style={{ backgroundColor: '#000000aa', flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                <View style={{
                                    backgroundColor: '#faf9f9', borderRadius: 20,
                                    height: "30%", width: "70%", flexDirection:'column',justifyContent: 'center'
                                }}>
                                  <View style={{marginBottom:20,alignItems:'center'}}>
                                      <Text style={{fontWeight:'bold',fontSize:18}}>Please choose a time period work!</Text>
                                  </View> 
                                  <View style={{flexDirection:'row'}}>
                                        <TouchableOpacity onPress={this.showPicker} style={{marginLeft:30,justifyContent: 'center', alignItems: 'center',backgroundColor: 'white',height:35,width:120,borderRadius:5,flexDirection:'row',borderWidth:1,borderColor:'#BDBDBD'}}>
                                                <Text style={{color:'black',fontSize:15}}>Start Time</Text>
                                                <View style={{marginLeft:10}}>
                                                    <Ionicons name="ios-time" size={24} color="black" />
                                                </View>
                                        </TouchableOpacity>
                                        <View style={{marginLeft:20,marginTop:5}}>
                                            <Text style={{fontWeight:'bold',fontSize:15}}>{this.state.choosenTime}</Text>
                                        </View>
                                    </View>
                                    <View style={{flexDirection:'row',marginTop:10}}>
                                        <TouchableOpacity onPress={this.showPicker1} style={{marginLeft:30,justifyContent: 'center', alignItems: 'center',backgroundColor: 'white',height:35,width:120,borderRadius:5,flexDirection:'row',borderWidth:1,borderColor:'#BDBDBD'}}>
                                                <Text style={{color:'black',fontSize:15}}>End Time</Text>
                                                <View style={{marginLeft:10}}>
                                                    <Ionicons name="ios-time" size={24} color="black" />
                                                </View>
                                        </TouchableOpacity>
                                       <View style={{marginLeft:20,marginTop:5}}>
                                            <Text style={{fontWeight:'bold',fontSize:15}}>{this.state.choosenTime1}</Text>
                                        </View>
                                    </View>
                                    <View style={{height:10,alignItems:'center'}}>{this.state.start_time>=this.state.end_time&&this.state.start_time!=''&&this.state.end_time!=''?<Text style={{color:'red',fontStyle:'italic'}}>End time must be greater than start time !</Text>:null}</View>
                                    <View style={{ alignItems: 'center'}}>
                                        <TouchableOpacity onPress={() => this.setState({ showworkingtime: false })} style={{
                                                width: "50%", backgroundColor: 'green',
                                                height: 30, borderRadius: 10, marginTop: 15, justifyContent: 'center', alignItems: 'center'
                                            }}>
                                                <Text style={{ color: "white", fontSize: 15, fontWeight: 'bold' }}>Ok</Text>
                                          </TouchableOpacity>
                                      </View>
                                    <DateTimePicker
                                    isVisible={this.state.isVisible}
                                    onConfirm={this.handlePicker}
                                    onCancel={this.hidePicker}
                                    mode={'time'}
                                    is24Hour={true}
                                />
                                <DateTimePicker
                                    isVisible={this.state.isVisible1}
                                    onConfirm={this.handlePicker1}
                                    onCancel={this.hidePicker1}
                                    mode={'time'}
                                    is24Hour={true}
                                />
                                </View>
                        </View>
                    </Modal>
                    <TouchableOpacity onPress={()=>this.setState({showlanguages:true})} style={{flexDirection:'row',marginTop:10,marginLeft:2}}>
                            <View  style={{position:'absolute',left:0}}>
                                <MaterialIcons name="language" size={28} color="yellow" />
                            </View >
                            <View  style={{marginLeft:50,marginTop:2,flexDirection:'row'}}>
                                <Text style={{fontSize:15,fontWeight:'bold'}}>Language</Text>
                                {this.state.language.length>0?
                                  <View style={{marginLeft:10}}>
                                      <Entypo name="check" size={20} color="#71B7B7" />
                                  </View>
                                :null}
                            </View>
                         </TouchableOpacity>
                         {this.state.show==false?<View>
                         <TouchableOpacity onPress={()=>this.setState({showindustry:true})} style={{flexDirection:'row',marginTop:20,marginLeft:2}}>
                            <View  style={{position:'absolute',left:0}}>
                                <FontAwesome name="industry" size={28} color="#00008B" />
                            </View >
                            <View  style={{marginLeft:50,marginTop:2,flexDirection:'row'}}>
                                <Text style={{fontSize:15,fontWeight:'bold'}}>Industry</Text>
                                {this.state.industry.length>0?
                                  <View style={{marginLeft:10}}>
                                      <Entypo name="check" size={20} color="#71B7B7" />
                                  </View>
                                :null}
                            </View>
                         </TouchableOpacity>
                         <View style={{flexDirection:'row',marginTop:20,marginLeft:2}}>
                            <View  style={{position:'absolute',left:0}}>
                                <FontAwesome5 name="users-cog" size={28} color="#D2691E" />
                            </View >
                            <View  style={{marginLeft:50,marginTop:2}}>
                            <DropDownPicker
                                items={[
                                    {label: 'Staff', value: '1'},
                                    {label: 'Front-end', value: '2'},
                                    {label: 'Back-end', value: '3'},
                                    {label: 'Database Manager', value: '4'},
                                ]}
                                defaultNull
                                placeholder="Position"
                                containerStyle={{height: 30,width:150}}
                                onChangeItem={position => this.changePosition(position)}
                                style={{backgroundColor:'white'}}
                            />
                            </View>
                         </View>
                         <TouchableOpacity onPress={()=>this.setState({showskill:true})} style={{flexDirection:'row',marginTop:20,marginLeft:2}}>
                            <View  style={{position:'absolute',left:0}}>
                                <Foundation name="social-skillshare" size={28} color="#A52A2A" />
                            </View >
                            <View  style={{marginLeft:50,marginTop:2,flexDirection:'row'}}>
                                <Text style={{fontSize:15,fontWeight:'bold'}}>Skills</Text>
                                {this.state.skills.length>0?
                                  <View style={{marginLeft:10}}>
                                      <Entypo name="check" size={20} color="#71B7B7" />
                                  </View>
                                :null}
                            </View>
                         </TouchableOpacity>
                         </View>:null}
                    <TouchableOpacity onPress={()=>this.setState({showtags:true})} style={{flexDirection:'row',marginTop:20,marginLeft:2}}>
                            <View  style={{position:'absolute',left:0}}>
                                <FontAwesome5 name="user-clock" size={28} color="#00FFFF" />
                            </View >
                            <View style={{marginLeft:50,marginTop:2,flexDirection:'row'}}>
                                <Text  style={{fontSize:15,fontWeight:'bold'}}>Tags</Text>
                                {this.state.tags.length>0?
                                  <View style={{marginLeft:10}}>
                                      <Entypo name="check" size={20} color="#71B7B7" />
                                  </View>
                                :null}
                            </View>                      
                         </TouchableOpacity>
            </View>
          </ScrollView>
        </View> 
      )
      renderHeader = () => (
        <TouchableWithoutFeedback onPress={()=>{Keyboard.dismiss();this.bs.current.snapTo(0)}} style={styles.header1}>
          <View style={styles.header1}>
              <View style={styles.panelHeader}>
                    <View style={styles.panelHandle}>
                    </View>
              </View>
              </View>
          </TouchableWithoutFeedback>
      )                     
      bs = React.createRef()
      fall = new Animated.Value(1);
      enableGes = true;
      enableCont = false;
    render(){
      var size=this.state.position.length;
      // console.log(this.state.showpost)
        return (
            <View style={styles.container}>
                <Modal transparent={true}
                    visible={this.state.showrecommendperson}
                    animationType='slide'
                >
                    <View style={{ backgroundColor: '#000000aa', flex: 1 }}>
                        <View style={{
                            backgroundColor: '#faf9f9', borderRadius: 20,
                            marginLeft: 20, marginRight: 20, marginTop: 75,marginBottom: 125,
                            borderWidth: 2, borderColor: '#009387', padding: 20,
                            alignContent: 'center',alignItems:'center'
                        }}>
                            <Text style={{color:'#488B8F',fontSize:20}}>Recommended for you</Text>
                            <FlatList data={this.state.dataemployee} 
                                renderItem={({item,index})=>{                              
                                    return(
                                        <RenderItem stackProfilefriend={this.showProfilefriend} inviteClick={this.onInvite}  item={item} index={index} stackuser={this.props.detailuser}></RenderItem>
                                    )
                                }}
                                keyExtractor={(item)=>item._id.toString()}
                            >
                            </FlatList>
                            <TouchableOpacity onPress={() => this.setState({ showrecommendperson: false })} style={styles.button}>
                                <Text style={{fontSize:20,color:'#ffff'}}>Cancel</Text> 
                            </TouchableOpacity>
                        </View>
                    </View>
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
                                    <TouchableOpacity onPress={() => {this.setState({ shownotice: false });{this.state.key === "success"?this.onRecommend():{}}}} style={{
                                        width: "50%", backgroundColor: this.state.key === "success" ? 'green' : 'red',
                                        height: 30, borderRadius: 10, marginTop: 15, justifyContent: 'center', alignItems: 'center'
                                    }}>
                                        <Text style={{ color: "white", fontSize: 15, fontWeight: 'bold' }}>Ok</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </Modal>
                        <Modal transparent={true}
                            visible={this.state.showninvite}
                            animationType='slide'
                            style={{ justifyContent: 'center', alignItems: 'center' }}
                        >
                            <View style={{ backgroundColor: '#000000aa', flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                <View style={{
                                    backgroundColor: '#faf9f9', borderRadius: 20,
                                    height: "30%", width: "70%", justifyContent: 'center', alignItems: 'center'
                                }}>
                                    <Image source={ iconsuccess } style={{ height: 50, width: 50 }}></Image>
                                    <Text>Invite Success</Text>
                                    <TouchableOpacity onPress={() => {this.setState({ showninvite: false })}} style={{
                                        width: "50%", backgroundColor: this.state.key === "success" ? 'green' : 'red',
                                        height: 30, borderRadius: 10, marginTop: 15, justifyContent: 'center', alignItems: 'center'
                                    }}>
                                        <Text style={{ color: "white", fontSize: 15, fontWeight: 'bold' }}>Ok</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </Modal>
                <Modal 
                    transparent={true}
                    visible={this.state.showposttask}
                    animationType='slide'
                >
                    <View style={styles.container} >
                            <BottomSheet
                                ref={this.bs}
                                callbackNode={this.fall}
                                snapPoints={[height/2,50]}
                                renderContent={this.renderInner}
                                renderHeader={this.renderHeader}
                                initialSnap={0}
                                //enabledGestureInteraction={true}
                                enabledHeaderGestureInteraction={true}
                                //enabledContentGestureInteraction={this.enableCont}
                            />
                        <View style={styles.header}>
                            <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                            {this.state.showpost==true?
                                <TouchableOpacity onPress={()=>{this.setState({showposttask:false});this.props.navigation.navigate("Home")}} style={{flexDirection:'row'}}>
                                <Ionicons style={{marginTop:1}} name="ios-arrow-back" size={28} color="#2d7474" />
                                <Text style={{fontWeight: 'bold', fontSize: 25, color: '#2d7474',marginLeft:15,marginTop:-2}}>Home Page</Text>
                            </TouchableOpacity>:
                            <TouchableOpacity onPress={()=>this.setState({showposttask:false})} style={{flexDirection:'row'}}>
                                <Ionicons style={{marginTop:1}} name="ios-arrow-back" size={28} color="#2d7474" />
                                <Text style={{fontWeight: 'bold', fontSize: 25, color: '#2d7474',marginLeft:15,marginTop:-2}}>New Task</Text>
                            </TouchableOpacity>}
                            <TouchableOpacity  onPress={this.onSubmit} >
                                <Text style={{fontWeight: 'bold', fontSize: 25, color: '#2d7474',marginRight:15,marginTop:-2}}>Post</Text>
                            </TouchableOpacity>
                            </View>
                        </View>
                        <View style={{marginBottom:20}}>
                        <View style={{flexDirection:'row'}}>
                            <View>
                            {this.state.localUri==null?
                              <Avatar.Image
                                  source={this.state.task_owner_avatar?{uri:this.state.task_owner_avatar}:null}
                                  size={80}
                                  style={{marginTop:10, marginLeft:30}}
                              />
                            :
                            <Avatar.Image
                                  source={{uri:this.state.localUri}}
                                  size={80}
                                  style={{marginTop:10, marginLeft:30}}
                              />
                            }
                              <TouchableOpacity onPress={()=>this.openImagePickerAsync()} style={{position:'absolute',right:0,bottom:0,backgroundColor:"#cccc",borderRadius:100,width:30,height:30,justifyContent: 'center',alignItems: 'center'}}>
                                <Entypo name="camera" size={15} color="black" />
                              </TouchableOpacity>
                            </View>
                            <View style={{marginTop:20,marginLeft:5,flexDirection:'column'}}>
                                <View style={{flexDirection:'row',marginLeft:2}}>
                                    <Text style={{fontSize:20,fontWeight:'bold'}}>{this.state.task_owner_first_name} {this.state.task_owner_last_name} </Text>                 
                                    {size>0?
                                    <>
                                        <Text style={{fontSize:18,marginTop:2}}>choose </Text>
                                        <Text style={{fontSize:20,fontWeight:'bold'}}>{this.state.position} </Text>
                                    </>
                                    :null}
                                </View>
                                <View>
                                <DropDownPicker
                                        items={[
                                            {label: 'Full-time', value: '1',selected: true, disabled:this.state.disabled},
                                            {label: 'Freelance', value: '2',disabled:this.state.disabled1},
                                            {label: 'Part-time', value: '3',disabled:this.state.disabled2}
                                        ]}
                                        defaultNull
                                        //placeholder="Task Type"
                                        containerStyle={{height: 30,width:110}}
                                        onChangeItem={item => this.changeJob(item)}
                                        style={{backgroundColor:'white'}}
                                    />
                                </View>
                                  {!this.state.region.formatted_address?null:
                                      <View style={{width:width-150, flexDirection:'row'}}>
                                      <View style={{marginTop:2}}>
                                          <Text>at </Text>
                                      </View>
                                      <Text style={{fontSize:15,marginTop:2}}>{this.state.region.formatted_address}</Text>
                                      </View>}
                            </View>
                            </View>
                        </View>
                          <ScrollView>
                            <View  style={styles.mainpost}>
                                <KeyboardAvoidingView behavior="padding" style={styles.container}>
                                <View style={{flexDirection:'column'}}>
                                  <View >
                                      <View style={{marginLeft:25}}>
                                          <Text style={{fontWeight:'bold'}}>Title</Text>
                                      </View>
                                      <View>
                                        <TextInput 
                                            style={this.state.showaa==true&&this.state.task_title==''?[styles.input,{borderColor:'red'}]:[styles.input,{borderColor:'#D8D8D8'}]}
                                            onTouchStart={()=>  this.bs.current.snapTo(1)}
                                            //editable={true}
                                            placeholder={'Enter Task Title'} 
                                            onChangeText={(task_title)=> this.setState({task_title})}
                                            placeholderTextColor={'grey'}
                                            numberOfLines={2}
                                            underlineColorAndroid='transparent'
                                            multiline={true}
                                            //returnKeyType='next'
                                        > 
                                        </TextInput>
                                        <View style={{height:20}}>
                                            {this.state.showaa==true&&this.state.task_title==''?<View style={{alignItems:'center'}}><Text style={{color:'red',fontStyle:'italic'}}>{this.state.showmess}</Text></View>:null}
                                        </View>
                                      </View>
                                  </View>
                              <View >
                                  <View style={{marginLeft:25}}>
                                      <Text style={{fontWeight:'bold'}}>Requirement</Text>
                                  </View>
                                  <View >
                                    <TextInput 
                                        style={this.state.showaa1==true&&this.state.task_requirement==''?[styles.input,{borderColor:'red'}]:[styles.input,{borderColor:'#D8D8D8'}]}
                                        onTouchStart={()=>  this.bs.current.snapTo(1)}
                                        placeholder={'Enter Task Requirement'} 
                                        onChangeText={(task_requirement)=> this.setState({task_requirement})}
                                        placeholderTextColor={'grey'}
                                        numberOfLines={5}
                                        underlineColorAndroid='transparent'
                                        //returnKeyType='next'
                                        multiline={true}
                                    >
                                    </TextInput>
                                    <View style={{height:20}}>
                                        {this.state.showaa==true&&this.state.task_requirement==''?<View style={{alignItems:'center'}}><Text style={{color:'red',fontStyle:'italic'}}>{this.state.showmess1}</Text></View>:null}
                                    </View>
                                </View>
                              </View>
                              <View>
                                <View style={{marginLeft:25}}>
                                      <Text style={{fontWeight:'bold'}}>Description</Text>
                                  </View>
                                  <View >
                                    <TextInput 
                                        style={this.state.showaa2==true&&this.state.task_description==''?[styles.input,{borderColor:'red'}]:[styles.input,{borderColor:'#D8D8D8'}]}
                                        onTouchStart={()=>  this.bs.current.snapTo(1)}
                                        placeholder={'Enter Task Description'} 
                                        onChangeText={(task_description)=> this.setState({task_description})}
                                        placeholderTextColor={'grey'}
                                        numberOfLines={5}
                                        underlineColorAndroid='transparent'
                                        multiline={true}
                                    >
                                    </TextInput>
                                    <View style={{height:20}}>
                                        {this.state.showaa2==true&&this.state.task_description==''?<View style={{alignItems:'center'}}><Text style={{color:'red',fontStyle:'italic'}}>{this.state.showmess2}</Text></View>:null}
                                    </View>
                                </View>
                              </View>
                            </View>
                          </KeyboardAvoidingView>
                        </View>
                      </ScrollView>
                    </View>
                </Modal>    
                <Modal transparent={true} visible={true}>
                     <View style={{flexDirection:'column', flex:1, backgroundColor:'#000000aa'}}>
                      <View style={styles.enterInformation}>
                            <View style={{width:303,height:87, backgroundColor:'#FFFFFF', margin:5, borderRadius:10, flexDirection:'row'}}>
                             <View>
                              <Avatar.Image
                                      style={{marginTop:10, marginLeft:30,width:43, height:44}}
                                  />
                             </View>
                             <View style={{margin:10, flexDirection:'column'}}>
                                  <View>
                                    <Text style={{fontSize:14, fontStyle:'normal', fontWeight:'bold', color:'#2d7474'}}>New freelance jobs</Text>
                                  </View>
                                  <View>
                                    <Text style={{fontSize:14, fontStyle:'normal', fontWeight:'bold'}}>Làm nghành dropshipping</Text>
                                  </View>
                                  <View style={{flexDirection:'row', flexWrap:'wrap', width:219}}>
                                    <Text style={{fontSize:14, fontStyle:'normal'}}>K560/09 Ông Ích Khiêm, Hải Châu, Đà Nẵng</Text>
                                  </View>
                             </View>
                            </View>
                            <View style={{width:275,height:350, backgroundColor:'#FFFFFF', margin:20, borderRadius:10, flexDirection:'column'}}>
                                  <View style={{flexDirection:'row', justifyContent:'space-between', marginLeft:10, marginRight:10, margin:10}}>
                                      <Text style={{fontSize:14,color:'rgba(0, 0, 0, 0.38)',fontWeight:'bold'}}>Name</Text>
                                      <Text style={{color:'#2d7474', fontWeight:'bold'}}>$3.387 - 3 Kms</Text>
                                  </View>
                                  <View style={{flexDirection:'row', justifyContent:'space-between', marginLeft:10, marginRight:10, margin:5}}>
                                      <Text style={{fontSize:14,color:'rgba(0, 0, 0, 0.6)',fontWeight:'bold'}}>NHA NGUYEN MINH</Text>
                                      <View style={{flexDirection:'row'}}>
                                        <View style={{margin:3}}>
                                         <AntDesign name="clockcircleo" size={14} color="black" />
                                        </View>
                                      <View>
                                        <Text style={{fontSize:14,color:'rgba(0, 0, 0, 0.38)'}}>1 Hour ago</Text>
                                      </View>
                                      </View> 
                                  </View>
                                  <View style={{borderWidth:1, borderColor:'rgba(0, 0, 0, 0.38)', marginLeft:40, marginRight:40, alignItems:'center'}}></View>
                                    <View style={{margin:20}}>
                                      <Image source={ anhgrabjob } style={{ height: 167, width: 237 }}></Image>
                                    </View>
                                    <View style={{margin:20, marginTop:-10}}>
                                      <Text style={{color:'rgba(0, 0, 0, 0.38)', fontWeight:'bold'}}>
                                        Làm cho ông đó, ổng bảo ổng kiếm được 500.000 đô... quá ghê....
                                      </Text>
                                    </View>
                                    <View style={{flexDirection:'row', justifyContent:'flex-end', marginRight:20}}>                                   
                                        <Text style={{color:'#2d7474',fontWeight:'bold'}}>10 </Text>
                                        <Text style={{color:'rgba(0, 0, 0, 0.38)'}}>candidates</Text> 
                                    </View>
                            </View>
                            <View style={{margin:20, marginTop:-6}}>
                                <RNSlidingButton
                                  style={{
                                    width: 240,
                                  }}
                                  height={35}
                                  color='black'
                                  onSlidingSuccess={this.onSlideRight}
                                  slideDirection={SlideDirection.RIGHT}>
                                  <View>
                                    <Text numberOfLines={1} style={styles.titleText}>
                                      SLIDE RIGHT TO ACCEPT
                                    </Text>
                                  </View>
                                </RNSlidingButton>
                            </View>
                        </View>
                     </View>
                  </Modal>      
                        <View 
                            style={{flexDirection:'row', 
                            marginTop:20, 
                            flex: 1, 
                            justifyContent: 'center',
                        }}>
                            <TouchableOpacity onPress={()=>this.setState({showposttask:true})}>
                                <View style={{flexDirection:'row'}}>
                                    <AntDesign  style={{marginRight:20}} name="plussquare" size={30} color="#71B7B7" />
                                    <Text  style={{fontSize:18}}>Do you want to post new task?</Text>
                                </View>
                            </TouchableOpacity>
                    </View>
                        {!this.state.loadingdata == true ?
                        <View style={{ flex: 1, alignItems: 'center' }}>
                            <ActivityIndicator size='large'></ActivityIndicator>
                        </View>:
                        this.state.dataPost.length==0?
                        <View style={{ flex: 1, alignItems: 'center' }}>
                        <Text>No item</Text>
                        </View>
                        :
                        
                        <View style={{alignItems:'center',flex:12}}>
                            <FlatList data={this.state.dataPost}
                                    renderItem={({item,index})=>{
                                    return(
                                        <Bulletin stackDetail={this.onDetail} item={item} index={index} ></Bulletin>
                                    )
                                }}
                                keyExtractor={(item)=>item._id.toString()}
                                refreshing={this.state.refreshing}
                                onRefresh={() => { this.refreshTop() }}
                                >
                            </FlatList>
                            </View>}
                </View>
        );
    }
}
class Bulletin  extends React.Component{
    render(){
        var d = new Date();
        var task_description = this.props.item.task_description
        var task_title = this.props.item.task_title;
        var counttitle = this.props.item.task_title.length;
        if(counttitle>=25){
          task_title = task_title.slice(0,20)+'...';
        }
        var count = task_description.length;
        if (count >= 10) {
            task_description = task_description.slice(0, 20);
        }
        return(
            <View key={this.props.item._id} style={{flex:1,backgroundColor: '#faf9f9'}}>
                <View >            
                    <View style={{backgroundColor: '#ffff',
                        marginHorizontal: 10,
                        marginVertical: 10,
                        borderRadius: 8,
                        paddingVertical: 20,
                        paddingHorizontal: 15,
                        marginBottom: 16,
                        width:width-30,
                        shadowColor: 'green',
                        shadowOpacity: 0.1,
                        elevation: 4,
                        borderWidth: 1,
                        borderColor: '#71B7B7',
                        flexDirection: 'column',
                        }}>
                            <View style={{flexDirection:'column',flex:1,marginLeft:10,fontWeight:'bold',padding:10,width:width-70}}>
                                <View style={{width:width-130,flexDirection:'column'}}>
                                    <TouchableOpacity onPress={()=>this.props.stackDetail(this.props.item._id,this.props.item.task_owner_id)} style={{flexDirection:'row'}}>
                                      <Text style={{fontWeight: 'bold', fontSize: 23, fontStyle: 'italic', color: '#2d7474'}}>{task_title}</Text>
                                      {new Date(this.props.item.created_time).toLocaleDateString()==d.toLocaleDateString()?
                                      <>
                                          <Text style={{fontWeight:'bold',fontSize:10,marginTop:2,color:'#CD5C5C',marginLeft:5}}>(MỚI)</Text>
                                      </>
                                      :null}
                                    </TouchableOpacity>
                                    <View style={{marginTop:10,flexDirection:'row'}}>
                                        <Text style={{color:'#696969'}}>Address:</Text>
                                        <Text style={{color:'#696969'}}> {this.props.item.location.formatted_address}</Text>
                                    </View>
                                    <View style={{marginTop:10,flexDirection:'row'}}>
                                        <Text style={{color:'#696969'}}>Updated:</Text>
                                        <Text> {new Date(this.props.item.created_time).toLocaleTimeString()} {new Date(this.props.item.created_time).toLocaleDateString()}</Text>
                                    </View>
                                    <View style={{marginTop:10}}>
                                    {this.props.item.price.floor_price==null?
                                        <View>
                                            <Text style={{color:'#696969'}}>price: {this.props.item.price.price_type}</Text>    
                                        </View>
                                        :
                                        <View style={{flexDirection:'row'}}>
                                            <Text style={{color:'#696969'}}>price: {this.props.item.price.floor_price}</Text>
                                            <Text style={{color:'#696969'}}> - {this.props.item.price.ceiling_price}</Text>
                                        </View>}
                                    </View>
                                    <View style={{marginTop:10,flexDirection:'column'}}>
                                        <Text style={{fontWeight:'bold'}}>TASK DESCRIPTION:</Text>
                                            <View style={{marginTop:10,flexDirection:'row'}}>
                                                <Text style={{marginLeft:20}}>{task_description}</Text>
                                                <Text>...</Text>
                                                <TouchableOpacity onPress={()=>this.props.stackDetail(this.props.item._id,this.props.item.task_owner_id)}>
                                                    <Text style={{ color: "#696969" }}> see detail</Text>
                                                </TouchableOpacity>
                                            </View>
                                    </View>
                                </View>
                            </View>
                    </View>
            
                </View>
        </View>
          )
    }
}
class RenderItem  extends React.Component{
  render(){
    var name = this.props.item.last_name
    var demcount = this.props.item.first_name.length+this.props.item.last_name.length
    if(this.props.item.last_name.length>=11){
      name = name.slice(0,11);
    }
        return(
            <View style={styles.image_container}>
                    <TouchableOpacity onPress={()=>{this.props.stackuser(this.props.item.first_name,this.props.item.last_name,this.props.item._id);this.props.stackProfilefriend}} style={{justifyContent:'center',marginLeft:10}}>
                        <Image source={{uri:this.props.item.avatar}} style={styles.image}/>
                    </TouchableOpacity>
                    <View>
                        <View  style={{flexDirection:'column',marginLeft:10,marginTop:10,alignItems:'flex-start',width:170}}>
                          <TouchableOpacity  onPress={()=>{this.props.stackuser(this.props.item.first_name,this.props.item.last_name,this.props.item._id);this.props.stackProfilefriend}} >
                            {demcount>=11?<Text style={{ fontWeight:'bold',fontSize:15}}>{name}</Text>:
                                  <Text style={{ fontWeight:'bold',fontSize:15}}>{this.props.item.first_name} {this.props.item.last_name}</Text>}
                          </TouchableOpacity>
                          <View style={{flexDirection:'row'}}>
                              <Text style={styles.rate}>{this.props.item.votes.vote_point_average.toFixed(0)}/5</Text> 
                          <Image 
                              source={require('../images/star.png')}
                              style={{width:20,height:20,top:1}}
                              resizeMode="cover"
                          />
                          </View>
                        </View>
                    </View>
                    <TouchableOpacity onPress={()=>this.props.inviteClick(this.props.item._id)} style={{
                      width:70,
                      height:30,
                      borderRadius:10,
                      backgroundColor:'#009387',
                      alignItems:'center',
                      justifyContent:'center',
                      shadowOffset:{width:0,height:3},
                      shadowOpacity:0.2,
                      shadowOpacity: 0.2,
                      elevation: 3,
                      borderColor:'#71B7B7',
                      borderWidth:1,
                      position:'absolute',
                      right:20,
                      top:30
                    }} >
                        <Text style={{ fontSize:13,color:'#ffff'}}>Invite</Text>
                    </TouchableOpacity>
            </View>  
          )
    }
  }
  
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
      height: height * 0.08,
      shadowOffset: { width: 0, height: 3 },
      shadowOpacity: 0.2,
      paddingLeft: 10,
      paddingTop:15,
      shadowOpacity: 0.2,
      elevation: 1,
    },
    image_container:{
      marginBottom:10,
      paddingVertical:10,
      paddingHorizontal:10,
      flexDirection:'row',
      borderRadius:10,
      height:90,
      width:width-100,
      backgroundColor:'rgba(200,200,200,0.3)',
      margin:10,
        
      },
      header:{
        height: height * 0.08,
      shadowOffset: { width: 0, height: 3 },
      shadowOpacity: 0.2,
      paddingLeft: 10,
      paddingTop:15,
      shadowOpacity: 0.2,
      elevation: 1,
      },
      mainpost:{
        flex: 1,
        alignItems: 'center', 
        flexDirection:'column',
        marginBottom:50
      },
      input:{
        width:width-50,
        borderRadius:5,
        borderWidth:1,
        fontSize:15,
        paddingLeft:25,
        paddingTop:-10,
        backgroundColor:'#fff',
        marginHorizontal:25,
        textAlignVertical: 'top'
      },
      input1:{
        width:width-50,
        fontSize:15,
        paddingLeft:25,
        paddingTop:-10,
        backgroundColor: '#faf9f9',
        marginHorizontal:25,
        marginTop:10,
      },
      input2:{
        borderWidth:1,
        marginLeft:10,
        width:100,
        borderRadius:5,
        borderColor:'#D8D8D8',
        paddingLeft:15,
        paddingRight:5,
       
      },
      inputIcon:{
        position:'absolute',
        top:12,
        left:40
      },
      inputIcon2:{
        position:'absolute',
        top:5,
        left:40
      },
      button:{
        width:width-300,
        height:40,
        borderRadius:10,
        backgroundColor:'#009387',
        alignItems:'center',
        justifyContent:'center',
        shadowOffset:{width:0,height:3},
        shadowOpacity:0.2,
        shadowOpacity: 0.2,
        elevation: 3,
        borderColor:'#71B7B7',
        borderWidth:1
      },
      imageStyle:{
        width: 50, height: 50,
        marginBottom:20,
        borderTopLeftRadius:10,
        borderTopRightRadius:10,
        borderBottomLeftRadius:10,
        borderBottomRightRadius:10,marginRight:100
      },
      header1: {
        backgroundColor: 'white',
        // elevation: 5,
        paddingTop: 20,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        borderStartColor:'#D8D8D8',
        borderStartWidth:1,
        borderEndColor:'#D8D8D8',
        borderEndWidth:1,
        borderTopWidth:1,
        borderTopColor:'#D8D8D8'
      },
      panelHeader: {
        alignItems: 'center',
      },
      panelHandle: {
        width: 40,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#D8D8D8',
        marginBottom: 10,
      },
      enterInformation:{
        backgroundColor:'#E5E5E5',
        width:'76%',
        height:550,
        margin:'10%', 
        marginTop:'25%',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 12,
        },
        shadowOpacity: 0.58,
        shadowRadius: 16.00,
        elevation: 24,
        borderRadius:10
    },
      panel: {
        padding: 20,
        backgroundColor: 'white',
        paddingTop: 20,
        height:450,
        
        // borderTopLeftRadius: 20,
        // borderTopRightRadius: 20,
        // shadowColor: '#000000',
        // shadowOffset: {width: 0, height: 0},
        // shadowRadius: 5,
        // shadowOpacity: 0.4,
      },
      image:{
        width:40,
        height:50
    },
})