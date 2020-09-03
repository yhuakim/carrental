import React, { useState } from 'react';
import {
    Route,
    Redirect
} from 'react-router-dom'

import {
    connect
} from 'react-redux'
import PropTypes from 'prop-types'


const PrivateRoute = ({
    Component,
    auth:{
        isloading,
        isAuthenticated,
        user
    },
    ...others
}) => {

   // const [users, setUser] = useState(null)

   return ( 
    <Route
    {...others}
    render = {
        (props) => isAuthenticated && user.role === 'admin' ? <Component {...props} /> : <Redirect to='/cars' /> 
    }
    />
   )  
} 

PrivateRoute.propTypes = {
    auth: PropTypes.object.isRequired
}
const mapStateToProps = (state) => ({
    auth: state.auth
})

export default connect(mapStateToProps)(PrivateRoute)