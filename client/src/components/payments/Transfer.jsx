import React, { Fragment, useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { addData } from '../../actions/transfer';
import { getData } from '../../actions/data';
import { setAlert } from '../../actions/alert';
import PropTypes from 'prop-types';
import axios from 'axios';
import SEC_KEY from '../../config';
import TransferList from './TransferList';

const Transfer = ({ setAlert, addData, getData, buttonLabel, className }) => {
	const [ transferData, setTransferData ] = useState({
		bank_code: '',
		account_number: '',
		amount: '',
		currency: '',
		narration: '',
		reference: '',
		title: ''
	});

	const [ modal, setModal ] = useState(false);

	const toggle = () => setModal(!modal);

	const { bank_code, account_number, amount, currency, narration, reference, title } = transferData;

	const handleChange = (e) => {
		setTransferData({
			...transferData,
			[e.target.name]: e.target.value
		});
	};

	const onSubmit = (e) => {
		e.preventDefault();

		if (account_number === null) {
			setAlert('account number is required', 'danger');
		} else {
			addData({
				bank_code,
				account_number,
				amount,
				currency,
				narration,
				reference
			});

			return setTransferData({
				bank_code: '',
				account_number: '',
				amount: '',
				currency: '',
				narration: '',
				reference: ''
			});
		}
	};

	const getList = () => {
		getData();
	};

	const initTransfer = async () => {
		/* try {
			getData();
			console.log(datas)
			if (datas !== null) {
				const bulk_data = [...datas];

				const config = {
					headers: {
						'Content-Type': 'application/json',
						'Authorization': 'Bearer FLWSECK_TEST-0a06d099ba44ce50ca2d2276e5bc0319-X'
					}
				};

				let result = await axios.post(
					'https://cors-anywhere.herokuapp.com/https://api.flutterwave.com/v3/bulk-transfers',
					bulk_data,
					config
				);

				await setAlert(result.message, 'success');
			}
		} catch (error) {
			console.error(error);
			setAlert('Transaction Failed');
		} */
	};

	return (
		<Fragment>
			<NavLink onClick={toggle}>Transfer</NavLink>
			<Modal isOpen={modal} toggle={toggle} className={className}>
				<ModalHeader toggle={toggle}>Modal title</ModalHeader>
				<ModalBody>
					Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore
					et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
					aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
					cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
					culpa qui officia deserunt mollit anim id est laborum.
				</ModalBody>
				<ModalFooter>
					<Button color='primary' onClick={toggle}>
						Do Something
					</Button>{' '}
					<Button color='secondary' onClick={toggle}>
						Cancel
					</Button>
				</ModalFooter>
			</Modal>
		</Fragment>
	);
};

Transfer.propTypes = {
	addData: PropTypes.func.isRequired,
	setAlert: PropTypes.func.isRequired,
	getData: PropTypes.func.isRequired
};

/* const mapStateToProps = (state) => ({
	datas: state.data
}); */

export default connect(null, { addData, setAlert, getData })(Transfer);
