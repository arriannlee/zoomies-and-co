// import { Link } from 'react-router-dom';
// import data from '../data';
import { useEffect, useReducer, useState } from 'react';
import axios from 'axios';
// import logger from 'use-reducer-logger';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

import Carousel from 'react-bootstrap/Carousel';
import Product from '../components/Product';
import { Helmet } from 'react-helmet-async';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { Container, Image } from 'react-bootstrap';

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return { ...state, products: action.payload, loading: false };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

function HomeScreen() {
  const [{ loading, error, products }, dispatch] = useReducer(reducer, {
    product: [],
    loading: true,
    error: '',
  });

  // const [products, setProducts] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: 'FETCH_REQUEST' });
      try {
        const result = await axios.get('/api/products');
        dispatch({ type: 'FETCH_SUCCESS', payload: result.data });
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: err.message });
      }
      // setProducts(result.data);
    };
    fetchData();
  }, []);
  return (
    <div>
      <Helmet>
        <title>OMMATOPIA</title>
      </Helmet>

      {/* Carousel */}
      <Container className="carousel">
        <Carousel>
          <Carousel.Item>
            <Image
              className="d-block w-100"
              src="/images/foralllevels.jpg"
              alt="Crafted For Yogis Of All Levels"
            />
            <Carousel.Caption className="carouselCaption">
              <h2>Crafted for yogis of all levels</h2>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <Image
              className="d-block w-100"
              src="/images/unrollmat.jpg"
              alt="Free Delivery On All Orders Over £30"
            />
            <Carousel.Caption className="carouselCaption">
              <h2>unroll free delivery on all orders over £30</h2>
            </Carousel.Caption>{' '}
          </Carousel.Item>
          <Carousel.Item>
            <Image
              className="d-block w-100"
              src="/images/teacherdiscount.jpg"
              alt="Studio & Yoga TEacher Discount Available"
            />
            <Carousel.Caption className="carouselCaption">
              <h2>STUDIO & YOGA TEACHER DISCOUNT available</h2>
            </Carousel.Caption>{' '}
          </Carousel.Item>
        </Carousel>
      </Container>

      <div className="mainContentSection">
        <Container className="contentDescription">
          <h2 className="my-3">Uniquely designed yoga mats</h2>
          <h4>
            Our top selling yoga mats - for the yogi who wants to be different
          </h4>
        </Container>
        {loading ? (
          <LoadingBox />
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
          <Row className="homescreenCard">
            {products.map((product) => (
              <Col key={product.slug} sm={6} md={4} lg={3} className="mb-3">
                <div className="product-card">
                  <Product product={product}></Product>
                </div>
              </Col>
            ))}
          </Row>
        )}
        {/* <h2 onClick={() => navigate('/search')}>More...</h2> */}
      </div>

      {/* <Row>
        <Col md={4}>
          <Image
            className="d-block w-100 mx-auto"
            src="/images/dwl.png"
            alt="Designed With Love"
          />
        </Col>

        <Col md={8} className="mx-auto">
          <Container className="justify-content-end dwlDescription">
            <p className="brandColour">
              Our mats are more than just accessories; they're an embodiment of
              our commitment to your well-being and the environment. Explore our
              collection to find the perfect mat that supports your practice
              while adding a touch of elegance to your sacred space. Welcome to
              Ommatopia, where love for yoga and thoughtful design unite to
              inspire your journey towards inner harmony.
            </p>
          </Container>
        </Col>
      </Row> */}
    </div>
  );
}

export default HomeScreen;
