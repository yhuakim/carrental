import React, { Fragment, useEffect } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import './assets/css/bootstrap.min.css'
//import Home from './components/Home';
import Login from './components/layouts/Login'
import NavBar from './components/layouts/NavBar'
import Register from './components/layouts/Register'
//import Header from './components/Header';

//redux
import { Provider } from 'react-redux'
import store from './store'
import Alert from './components/layouts/Alert'
import Checkout from './components/payments/Checkout'
import CarList from './components/cars/CarList'
import CarDetails from './components/cars'
import Transfer from './components/payments/Transfer'
import { loadUser } from './actions/auth'
import setAuthToken from './utils/setAuthToken'
import { setAlert } from './actions/alert'

if (localStorage.token) {
	setAuthToken(localStorage.token)
} else {
	setAlert('An error occured', 'danger')
}

const App = () => {
	useEffect(() => {
		store.dispatch(loadUser())
	}, [])

	return (
		<Provider store={store}>
			<Router>
				<Fragment>
					<NavBar />
					<Alert />
				</Fragment>
				<Switch>
					<Route path='/' component={CarList} exact />
					<Route path='/cars' component={CarList} exact />
					<Route path='/cars/:id' component={CarDetails} exact />
					<Route path='/cars/rent/:id' component={Checkout} exact />

					<Route path='/transfer' component={Transfer} exact />
				</Switch>
			</Router>
		</Provider>
	)
}

export default App
