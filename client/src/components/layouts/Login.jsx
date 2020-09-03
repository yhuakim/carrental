import React, { Fragment, useState } from 'react';
import { NavLink, Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, Input } from 'reactstrap';
import Alert from './Alert'
import '../../Login.css';
import { Redirect } from 'react-router-dom';
import { login } from '../../actions/auth';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const Login = ({ login, isAuthenticated }) => {
	const [ loginData, setLoginData ] = useState({
		email: '',
		password: ''
	});

	const [ modal, setModal ] = useState(false);

	const toggle = () => {
		setModal(!modal);
	};

	const { email, password } = loginData;

	const handleChange = (e) =>
		setLoginData({
			...loginData,
			[e.target.name]: e.target.value
		});

	const onSubmit = (e) => {
		e.preventDefault();
		login(email, password);

		if (isAuthenticated) {
			setModal(!modal);
			return <Redirect path='/cars' />;
		}
	};

	return (
		<Fragment>
			<NavLink onClick={toggle}>Login</NavLink>
			<Modal isOpen={modal} centered toggle={toggle}>
				<ModalHeader toggle={toggle}>Login</ModalHeader>
				<Alert>
					<Alert />
				</Alert>
				<ModalBody>
					<Form>
						<Input
							type='email'
							placeholder='Email'
							name='email'
							value={email}
							className='mb-4 form-control-lg'
							onChange={handleChange}
						/>
						<Input
							type='password'
							placeholder='Password'
							name='password'
							value={password}
							className='mb-4 form-control-lg'
							onChange={handleChange}
						/>
					</Form>
				</ModalBody>
				<ModalFooter>
					<Button color='primary' onClick={onSubmit}>
						Enter
					</Button>
				</ModalFooter>
			</Modal>
		</Fragment>
	);
};

Login.propTypes = {
	login: PropTypes.func.isRequired,
	isAuthenticated: PropTypes.bool
};

const mapStateToProps = (state) => ({
	isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { login })(Login);
