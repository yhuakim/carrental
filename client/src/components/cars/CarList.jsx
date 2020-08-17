import React, { Fragment } from 'react';
import Car from './Car';
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

const CarList = ({mycars}) => {
	return (
		<Fragment>
			<div className='jumbotron mt-5'>
				<h1 className='text-secondary'>Cars List</h1>
			</div>
			<Car state={mycars} />
		</Fragment>
	);
};

CarList.propTypes = {
	mycars: PropTypes.array.isRequired
}

const mapStateToProps = (state) => ({
	mycars: state.carlist.cars
})

export default connect(mapStateToProps, null) (CarList);
