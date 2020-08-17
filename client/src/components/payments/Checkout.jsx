import React, { Fragment, useState } from 'react';
import axios from 'axios';
import { Container } from 'reactstrap';
import { Link } from 'react-router-dom';
import SEC_KEY from '../../config';
import { setAlert } from '../../actions/alert';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const Checkout = ({ match, mycars, setAlert }) => {
	console.log(setAlert);
	let selected = mycars.filter((item) => item.id === match.params.id);
	const { price, title, description } = selected[0];

	const [ customerDetails, setCustomerDetails ] = useState({
		email: '',
		phonenumber: '',
		name: ''
	});

	const { email, name, phonenumber } = customerDetails;
	console.log(email, phonenumber);

	const [ payData, setPayData ] = useState({
		tx_ref: 'hooli-tx-1920bbtytty',
		amount: price,
		currency: 'NGN',
		redirect_url: 'https://webhook.site/9d0b00ba-9a69-44fa-a43d-a82c33c36fdc',
		payment_options: 'card',
		meta: {
			consumer_id: 23,
			consumer_mac: '92a3-912ba-1192a'
		},
		customer: {
			email: '',
			phonenumber: '',
			name: ''
		},
		customizations: {
			title,
			description,
			logo: 'https://assets.piedpiper.com/logo.png'
		}
	});

	const handleChange = (e) => {
		setCustomerDetails({
			...customerDetails,
			[e.target.name]: e.target.value
		});

		setPayData({
			tx_ref: 'hooli-tx-1920bbtytty',
			amount: price,
			currency: 'NGN',
			redirect_url: 'https://webhook.site/9d0b00ba-9a69-44fa-a43d-a82c33c36fdc',
			payment_options: 'card',
			meta: {
				consumer_id: 23,
				consumer_mac: '92a3-912ba-1192a'
			},
			customer: {
				email: email,
				phonenumber: phonenumber,
				name: name
			},
			customizations: {
				title,
				description,
				logo: 'https://assets.piedpiper.com/logo.png'
			}
		});
	};

	const handlePay = async (e) => {
		e.preventDefault();

		try {
			const config = {
				headers: {
					'Content-Type': 'application/json',
					'Authorization': `Bearer ${SEC_KEY}`
				}
			};

			const body = JSON.stringify(payData);

			const pay = await axios.post(
				'https://cors-anywhere.herokuapp.com/https://api.flutterwave.com/v3/payments',
				body,
				config
			);
			const dataLink = await pay.data.data.link;

			if (dataLink) {
				window.open(dataLink);
			} else {
				setAlert(`An Error Occured`, 'danger');
			}
		} catch (error) {
			if (error) {
				setAlert(`${error}`, 'danger');
			}
		}
	};

	return (
		<Container className='body mt-5'>
			<form className='form bg-transparent' onSubmit={handlePay}>
				<h1 className='text-secondary p-4'>Your Details</h1>
				<input
					type='name'
					placeholder='Name'
					className='form-control-lg m-2'
					name='name'
					onChange={handleChange}
					value={name}
				/>

				<input
					type='email'
					placeholder='Email'
					name='email'
					className='form-control-lg m-2'
					onChange={handleChange}
					value={email}
				/>

				<input
					type='tel'
					placeholder='Phone Number'
					name='phonenumber'
					className='form-control-lg m-2'
					onChange={handleChange}
					value={phonenumber}
				/>
				<button type='submit' className='btn btn-primary btn-lg col-9'>
					Proceed
				</button>
				<div>
					<Link className='mt-3 btn btn-md btn-outline-secondary' to='/transfer'>
						pay with
					</Link>
				</div>
			</form>
		</Container>
	);
};

Checkout.propTypes = {
	setAlert: PropTypes.func.isRequired,
	mycars: PropTypes.array.isRequired
};

const mapStateToProps = (state) => ({
	mycars: state.carlist.cars
});

export default connect(mapStateToProps, { setAlert })(Checkout);
