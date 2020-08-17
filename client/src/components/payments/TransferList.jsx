import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { setAlert } from '../../actions/alert';
import { deleteData } from '../../actions/removeItem';
import PropTypes from 'prop-types';

const TransferList = ({ datas, deleteData }) => {
	const handleDelete = (e) => {
		const id = e.target.id;
		console.log(datas)

		deleteData(id);
	};
	/* let bulkData = Object.keys(data); */
	console.log(datas);
	if (datas !== null)
		return datas.map((d) => (
			<Fragment>
				<div className='container' key={d.id}>
					<div className='bankcode'>
						<span>Bank Code</span>
						{d.bank_code}
					</div>
					<div className='bankcode'>
						<span>Account Number</span>
						{d.account_number}
					</div>
					<div className='bankcode'>
						<span>Amount</span>
						{d.amount}
					</div>
					<div className='bankcode'>
						<span>Currency</span>
						{d.currency}
					</div>
					<div className='bankcode'>
						<span>Narration</span>
						{d.narration}
					</div>
					<div className='bankcode'>
						<span>Reference</span>
						{d.reference}
					</div>
					<button id={d.id} onClick={(e) =>handleDelete}>
						X
					</button>
				</div>
			</Fragment>
		));
};

TransferList.propTypes = {
	datas: PropTypes.object.isRequired,
	deleteData: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
	datas: state.data
});

export default connect(mapStateToProps, { setAlert, deleteData })(TransferList);
