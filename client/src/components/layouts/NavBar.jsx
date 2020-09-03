import React, { useState } from 'react'
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { logout } from '../../actions/auth'
import Register from './Register'
import Login from './Login'

const NavBar = ({ isAuthenticated, logout, userRole, isloading }) => {
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
						<NavItem>
							{
								!isloading &&
								isAuthenticated &&
								userRole !== null &&
								userRole.role === 'admin' ? <NavLink href='/transfer'>Tranfer</NavLink> :
								<NavLink>Github</NavLink>}
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
	userRole: PropTypes.object,
	isloading: PropTypes.bool,
}

const mapStateToProps = (state) => ({
	isAuthenticated: state.auth.isAuthenticated,
	userRole: state.auth.user,
	isloading: state.auth.isloading,
})

export default connect(mapStateToProps, { logout })(NavBar)
