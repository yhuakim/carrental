import {
    combineReducers
} from 'redux';
import alert from './Alert';
import auth from './auth'
import carlist from './carlist'
import data from './data'


export default combineReducers({
    alert,
    auth,
    carlist,
    data
})