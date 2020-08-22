import React, { Fragment, useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { setAlert } from '../../actions/alert'
import { register } from '../../actions/auth'
import Alert from './Alert'
import PropTypes from 'prop-types'
import { NavLink, Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, Input } from 'reactstrap'
import { Redirect } from 'react-router-dom'

const Register = ({ setAlert, register, isAuthenticated }) => {
	const [
		formData,
		setFormData,
	] = useState({
		name: '',
		email: '',
		password: '',
		password2: '',
		phone: '',
		address: '',
	})

	const [
		modal,
		setModal,
	] = useState(false)

	const toggle = () => setModal(!modal)

	const { name, email, password, password2, phone, address } = formData

	const handleChange = (e) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		})
	}

	const onSubmit = (e) => {
		e.preventDefault()

		if (password !== password2) {
			setAlert('Password do not match', 'danger')
		}

		register({ name, email, password, phone, address })

		if (isAuthenticated) {
			setModal(!modal)
			setFormData({
				name: '',
				email: '',
				password: '',
				password2: '',
				phone: '',
				address: '',
				role: '',
			})
			return <Redirect to='/cars' />
		}
	}

	return (
		<Fragment>
			<NavLink color='danger' onClick={toggle}>
				Register
			</NavLink>
			<Modal isOpen={modal} toggle={toggle} centered>
				<ModalHeader toggle={toggle}>Register</ModalHeader>
				<Alert>
					<Alert />
				</Alert>
				<ModalBody>
					<div className=' '>
						<Form className=''>
							<Input
								type='name'
								placeholder='Name'
								name='name'
								onChange={handleChange}
								className='mb-4 form-control-lg'
								value={name}
							/>

							<Input
								type='email'
								placeholder='Email'
								name='email'
								onChange={handleChange}
								className='mb-4 form-control-lg'
								value={email}
							/>

							<Input
								type='password'
								placeholder='Password'
								name='password'
								minLength='4'
								onChange={handleChange}
								className='mb-4 form-control-lg'
								value={password}
							/>

							<Input
								type='password'
								placeholder='Confirm Password'
								name='password2'
								minLength='4'
								onChange={handleChange}
								className='mb-4 form-control-lg'
								value={password2}
							/>

							<Input
								type='phone'
								placeholder='Phone'
								name='phone'
								onChange={handleChange}
								className='mb-4 form-control-lg'
								value={phone}
							/>

							<Input
								type='address'
								placeholder='Address'
								name='address'
								onChange={handleChange}
								className='mb-4 form-control-lg'
								value={address}
							/>
						</Form>
					</div>
				</ModalBody>
				<ModalFooter>
					<Button color='primary' onClick={onSubmit}>
						Submit
					</Button>
				</ModalFooter>
			</Modal>
		</Fragment>
	)
}

Register.propTypes = {
	setAlert: PropTypes.func.isRequired,
	register: PropTypes.func.isRequired,
	isAuthenticated: PropTypes.bool,
}

const mapStateToProps = (state) => ({
	isAuthenticated: state.auth.isAuthenticated,
})

export default connect(mapStateToProps, { setAlert, register })(Register)
