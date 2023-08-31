// import { Link } from 'react-router-dom';
// import data from '../data';
import { useEffect, useReducer, useState } from 'react';
import axios from 'axios';
// import logger from 'use-reducer-logger';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
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
        <title>Zoomies & Co</title>
      </Helmet>

      {/* Carousel */}
      <Container className="carousel">
        <Carousel>
          <Carousel.Item>
            {/* <a href="/search" onClick={() => navigate('/search')}> */}
            <Image
              className="d-block w-100"
              src="/images/designedwithlove.png"
              alt="First slide"
            />
            {/* </a> */}
          </Carousel.Item>
          <Carousel.Item>
            <Image
              className="d-block w-100"
              src="/images/experiencefreedom.png"
              alt="First slide"
            />
          </Carousel.Item>
        </Carousel>
      </Container>
      <h1 className="my-3">What's New...</h1>
      <div className="products">
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
      </div>
    </div>
  );
}

export default HomeScreen;
