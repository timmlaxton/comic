import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Container } from 'react-bootstrap';
import Product from '../components/Product';
import Message from '../components/Message';
import Loader from '../components/Loader';
import HeroCarousel from 'react-hero-carousel';

import { listProducts } from '../actions/productActions';

const HomeScreen = ({ match }) => {
	const keyword = match.params.keyword;

	const dispatch = useDispatch();

	const productList = useSelector((state) => state.productList);
	const { loading, error, products } = productList;
	const [productsByCategory, setProductsByCategory] = useState({});

	useEffect(() => {
		dispatch(listProducts());
	}, [dispatch]);

	useEffect(() => {
		let productsByCategory = getProductsByCategory(products);
		setProductsByCategory(productsByCategory);
	}, [products]);

	function getProductsByCategory(products = []) {
		return products.reduce((acc, product) => {
			const { category } = product;
			if (!Object.prototype.hasOwnProperty.call(acc, category)) {
				acc[category] = [];
			}

			product.featured && acc[category].push(product);
			return acc;
		}, {});
	}

	return (
		<>
			{!keyword && (
				<HeroCarousel>
					<img alt="" src="images/fan1.jpg" width="85%" height="100%" pos />
				</HeroCarousel>
			)}
			<br />
			<hr className="solid" />
			<h4>
				We are a specialist back issue comic shop based in Glasgow. We also stock new monthly comics, graphic novels,
				t-shirts and toys. Thousands of titles in stock we buy sell and exchange Marvel, DC and indie comics. Glasgow's
				best Silver/Bronze Age comic dealer - a large selection always in stock!
			</h4>
			<hr className="solid" />

			<h1>Back Issues</h1>
			<hr className="solid" />
			{loading ? (
				<Loader />
			) : error ? (
				<Message variant="danger">{error}</Message>
			) : (
				<Row>
					{productsByCategory?.['Back Issue']?.map((product) => (
						<Col key={product._id} sm={2} md={2} lg={2} xl={2}>
							<Product product={product} />
						</Col>
					))}
				</Row>
			)}

			<hr className="solid" />
			<h1>New Comics</h1>
			<hr className="solid" />
			{loading ? (
				<Loader />
			) : error ? (
				<Message variant="danger">{error}</Message>
			) : (
				<Row>
					{productsByCategory?.['New Comics']?.map((product) => (
						<Col key={product._id} sm={2} md={2} lg={2} xl={2}>
							<Product product={product} />
						</Col>
					))}
				</Row>
			)}

			<hr className="solid" />
			<h1>Trades</h1>
			<hr className="solid" />
			{loading ? (
				<Loader />
			) : error ? (
				<Message variant="danger">{error}</Message>
			) : (
				<Row>
					{productsByCategory?.['Trades']?.map((product) => (
						<Col key={product._id} sm={2} md={2} lg={2} xl={2}>
							<Product product={product} />
						</Col>
					))}
				</Row>
			)}
			<hr className="solid" />
			<footer classname="bg-light text-center text-lg-start">
				<Container className="p-4">
					<Row>
						<Col lg={2} md={2} className="hours">
							<h5 className="text-uppercase">Opening Hours</h5>

							<p>11am to 4pm - Wednesday to Saturday</p>
							<p>12pm to 4pm - Sunday</p>
							<p>Closed Monday to Tuesday</p>
						</Col>
						<Col lg={2} md={2} className="contact">
							<h5 className="text-uppercase">Contact Us</h5>
							<p>citycentrecomics@hotmail.com</p>
							<p>0141 357 6325</p>
							<p>37 Ruthven Lane, G12 9BG Glasgow</p>
						</Col>

						<Col lg={2} md={22} className="follow">
							<h5 className="text-uppercase">Follow Us</h5>
							<div>
								<a href={'https://www.facebook.com/citycentrecomics'}>
									<i className="fab fa-facebook-f"></i>
								</a>
							</div>
							<div>
								<a href={'https://twitter.com/citycentrecomic'}>
									<i className="fab fa-twitter"></i>
								</a>
							</div>
						</Col>
					</Row>
					<div className="copyright">Copyright &copy; City Centre Comics </div>
				</Container>
			</footer>
		</>
	);
};

export default HomeScreen;
