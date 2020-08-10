import {createStackNavigator} from 'react-navigation-stack';
import {createAppContainer} from 'react-navigation';
import loadingscene from '../components/Loadingscene'
import login from '../components/Login'
import register from '../components/Register'
const screens={
    login:{
        screen:login
    },
    loadingscene:{
        screen:loadingscene
    },
    login:{
        screen:login
    },
    register:{
        screen:register
    }
}
const HomeStack=createStackNavigator(screens);
export default createAppContainer(HomeStack)