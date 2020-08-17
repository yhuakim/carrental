import React from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle, Button, Container, Col, Row } from 'reactstrap';
import { Link } from 'react-router-dom';

const Car = ({ state }) => {
	/* const handleRent = (e) => {
		let clickedId = e.target.id;
		console.log(clickedId);
	}; */

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
							<Link className='btn btn-outline-info mr-4' color='primary' to={`/cars/${car.id}`}>
								View
							</Link>
							<Link className='btn btn-primary' color='primary' to={`/cars/rent/${car.id}`}>
								Rent Now
							</Link>
						</CardBody>
					</Card>
				</Col>
			</Row>
		</Container>
	));
};

export default Car;
