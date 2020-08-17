import {
    combineReducers
} from 'redux';
import alert from './Alert';
import auth from './auth'
import carlist from './carlist'
import transfer from './tranfer'
import data from './data'
import removeItem from './removeItem'


export default combineReducers({
    alert,
    auth,
    carlist,
    transfer,
    data,
    removeItem
})