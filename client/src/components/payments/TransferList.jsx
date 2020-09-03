import React, { Fragment, useEffect } from 'react'
import Transfer from './Transfer'
import { connect } from 'react-redux'
import { setAlert } from '../../actions/alert'
import { deleteData, queueData } from '../../actions/data'
import PropTypes from 'prop-types'
import { Button, Table } from 'reactstrap'

const TransferList = ({ datas, deleteData, success, queueData }) => {
	const handleDelete = (event) => {
		let id = event.target.id
		console.log(id)
		deleteData(id)
	}
	console.log(datas)

	const handleQueue = () => {
		queueData(datas)
	}

	return (
		<Fragment>
			<div className='container-fluid mt-5 p-5 bg-white'>
				<Transfer />
				<Table striped>
					<thead>
						<tr>
							<th>#</th>
							<th>Bank Code</th>
							<th>Account Number</th>
							<th>Amount</th>
							<th>Currency</th>
							<th>Narration</th>
							<th>Reference</th>
						</tr>
					</thead>
					{
						datas && success ? datas.map((data, index) => (
							<tbody key={data._id}>
								<tr>
									<th scope='row'>{index + 1}</th>
									<td>{data.bank_code}</td>
									<td>{data.account_number}</td>
									<td>{data.amount}</td>
									<td>{data.currency}</td>
									<td>{data.narration}</td>
									<td>{data.reference}</td>
									<td>
										<Button id={data._id} onClick={handleDelete} color='danger'>
											{' '}
											&times;{' '}
										</Button>
									</td>
								</tr>
							</tbody>
						)) :
						console.log('error')}
				</Table>
				<Button onClick={handleQueue}>QUEUE</Button>
			</div>
		</Fragment>
	)
}

TransferList.propTypes = {
	datas: PropTypes.array,
	deleteData: PropTypes.func,
	queueData: PropTypes.func,
	success: PropTypes.bool,
}

const mapStateToProps = (state) => ({
	datas: state.data.data,
	success: state.data.success,
})

export default connect(mapStateToProps, { setAlert, deleteData, queueData })(TransferList)