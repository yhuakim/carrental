import React from 'react';
import Login from '../layouts/Login'
import { Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle, Container, Col, Row, Alert } from 'reactstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const CarDetails = ({ mycars, match, auth: {
	isAuthenticated
} }) => {
	let selected = mycars.filter((item) => item.id === match.params.id);

	const { title, img, price, luggage, doors, description, passenger, id } = selected[0];

	return (
		<Container key={id} className='mb-3'>
			<Row className='p-5'>
				<Col lg='12'>
					<Card body>
						<CardImg top width='100%' src={img} alt='Card image cap' />
						<CardBody>
							<CardTitle>
								<h1>{title}</h1>
							</CardTitle>
							<CardSubtitle>
								<strong>Price:</strong>
								<span className='mr-2'>{price}</span>
							</CardSubtitle>
							<CardText className='mt-3'>
								<strong>Luggage:</strong>
								<span className='mr-2'>{luggage}</span>
							</CardText>
							<CardText>
								<strong>Doors:</strong>
								<span className='mr-2'>{doors}</span>
							</CardText>
							<CardText>
								<strong>Passenger:</strong>
								<span className='mr-2'>{passenger}</span>
							</CardText>
							<CardText>
								<strong>Description:</strong>
								<br />
								<span className=''>{description}</span>
							</CardText>
							{
								isAuthenticated? <Link className='btn btn-primary mr-5' color='primary' to={`/cars/rent/${id}`}>
								Rent Now
							</Link> : <Alert color="info" >Rent Now? <Login className="btn btn-info" /> </Alert>
							}
							<Link className='btn btn-outline-secondary' to='/cars'>
								Back
							</Link>
						</CardBody>
					</Card>
				</Col>
			</Row>
		</Container>
	);
};

CarDetails.propTypes = {
	mycars: PropTypes.array.isRequired,
	auth: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
	mycars: state.carlist.cars,
	auth: state.auth
});

export default connect(mapStateToProps, null)(CarDetails);
