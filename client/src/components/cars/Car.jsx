import React from 'react';
import Login from '../layouts/Login'
import { Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle, Container, Col, Row, Alert } from 'reactstrap';
import { Link } from 'react-router-dom';
import {connect} from 'react-redux'
import PropTypes from 'prop-types'

const Car = ({ state, auth: {
	isAuthenticated,
	isloading
} }) => {

	return state.map((car) => (
		<Container key={car.id} className='mb-3'>
			<Row className='p-5'>
				<Col lg='12'>
					<Card body>
						<CardImg
							style={{ backgroundImage: `${car.img}` }}
							top
							width='100%'
							src={car.img}
							alt='Card image cap'
						/>
						<CardBody>
							<CardTitle>
								<h1>{car.title}</h1>
							</CardTitle>
							<CardSubtitle>
								<strong>Price:</strong>
								<span className='mr-2'>{car.price}</span>
							</CardSubtitle>
							<CardText className='mt-3'>
								<strong>Luggage:</strong>
								<span className='mr-2'>{car.luggage}</span>
							</CardText>
							<CardText>
								<strong>Doors:</strong>
								<span className='mr-2'>{car.doors}</span>
							</CardText>
							<CardText>
								<strong>Passenger:</strong>
								<span className='mr-2'>{car.passenger}</span>
							</CardText>
							<CardText>
								<strong>Description:</strong>
								<br />
								<span className=''>{car.description}</span>
							</CardText>
							<div className="d-inline">
							<Link className='btn btn-outline-info mr-4' color='primary' to={`/cars/${car.id}`}>
								View
							</Link>
							
							{
								isAuthenticated? <Link className='btn btn-primary' color='primary' to={`/cars/rent/${car.id}`}>
								Rent Now
							</Link> : <Alert color="info" >Rent Now? <Login className="btn btn-info" /> </Alert>
							}
							</div>
						</CardBody>
					</Card>
				</Col>
			</Row>
		</Container>
	));
};

Car.propTypes = {
    auth: PropTypes.object.isRequired
}
const mapStateToProps = (state) => ({
    auth: state.auth
})

export default connect(mapStateToProps)(Car);
