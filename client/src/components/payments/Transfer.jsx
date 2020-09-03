import React, { Fragment, useState } from 'react'
import { Input, Form, Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap'
import { connect } from 'react-redux'
import { addData } from '../../actions/data'
import { getData } from '../../actions/data'
import { setAlert } from '../../actions/alert'
import PropTypes from 'prop-types'

const Transfer = ({ setAlert, addData, getData }) => {
	const [
		transferData,
		setTransferData,
	] = useState({
		bank_code: '',
		account_number: '',
		amount: '',
		currency: '',
		narration: '',
		reference: `${Date.now()}`,
	})

	const { bank_code, account_number, amount, currency, narration, reference } = transferData

	const [
		modal,
		setModal,
	] = useState(false)

	const toggle = () => setModal(!modal)

	const handleChange = (e) => {
		setTransferData({
			...transferData,
			[e.target.name]: e.target.value,
		})
	}

	const onSubmit = (e) => {
		e.preventDefault()

		if (account_number === null) {
			setAlert('account number is required', 'danger')
		}

		addData({
			bank_code,
			account_number,
			amount,
			currency,
			narration,
			reference,
		})

		toggle()

		return setTransferData({
			bank_code: '',
			account_number: '',
			amount: '',
			currency: '',
			narration: '',
			reference: '',
		})
	}

/* 	const initTransfer = async () => {
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
		}
	} */

	return (
		<Fragment>
			<Button color='primary' onClick={toggle}>
				ADD
			</Button>
			<Modal isOpen={modal} toggle={toggle} centered>
				<ModalHeader toggle={toggle}>Bulk Transfer: Details</ModalHeader>
				<ModalBody>
					<div className=' '>
						<Form className='mt-5 p-5' onSubmit={onSubmit}>
							<Input
								type='text'
								placeholder='Bank Code'
								name='bank_code'
								onChange={handleChange}
								pattern='\d*'
								maxLength='3'
								className='mb-4 form-control-lg'
								value={bank_code}
							/>

							<Input
								type='text'
								placeholder='Account Number'
								name='account_number'
								onChange={handleChange}
								pattern='\d*'
								maxLength='10'
								className='mb-4 form-control-lg'
								value={account_number}
							/>

							<div className='d-flex'>
								<Input
									type='text'
									placeholder='Amount'
									name='amount'
									onChange={handleChange}
									className='mb-4 mr-5 form-control-lg'
									value={amount}
								/>

								<select
									name='currency'
									id='currency'
									className='form-control-lg'
									onChange={handleChange}>
									<option value='' />
									<option value='NGN'>NGN</option>
									<option value='USD'>USD</option>
								</select>
							</div>

							<Input
								type='text'
								placeholder='Narration'
								name='narration'
								onChange={handleChange}
								className='mb-4 form-control-lg'
								value={narration}
							/>

							<Input
								type='text'
								placeholder='Reference'
								name='reference'
								onChange={handleChange}
								className='mb-4 form-control-lg'
								value={reference}
								hidden
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

Transfer.propTypes = {
	addData: PropTypes.func.isRequired,
	setAlert: PropTypes.func.isRequired,
	getData: PropTypes.func.isRequired,
}

/* const mapStateToProps = (state) => ({
	datas: state.data
}); */

export default connect(null, { addData, setAlert, getData })(Transfer)
