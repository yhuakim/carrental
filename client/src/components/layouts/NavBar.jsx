import React, { useState } from 'react'
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { logout } from '../../actions/auth'
import Register from './Register'
import Login from './Login'

const NavBar = ({ isAuthenticated, logout }) => {
	const [
		isOpen,
		setIsOpen,
	] = useState(false)

	const toggle = () => setIsOpen(!isOpen)

	const logoutUser = () => {
		logout()
	}

	return (
		<div>
			<Navbar color='light' light expand='md' fixed='top'>
				<NavbarBrand href='/'>Car Rental</NavbarBrand>
				<NavbarToggler onClick={toggle} />
				<Collapse isOpen={isOpen} navbar>
					<Nav className='mr-auto' navbar>
						<NavItem>
							{
								isAuthenticated ? null :
								<Register />}
						</NavItem>
						<NavItem>
							{
								isAuthenticated ? null :
								<Login />}
						</NavItem>
						<NavItem>
							{
								isAuthenticated ? <NavLink onClick={logoutUser}>Logout</NavLink> :
								null}
						</NavItem>
					</Nav>
				</Collapse>
			</Navbar>
		</div>
	)
}

NavBar.propTypes = {
	isAuthenticated: PropTypes.bool,
	logout: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
	isAuthenticated: state.auth.isAuthenticated,
})

export default connect(mapStateToProps, { logout })(NavBar)
