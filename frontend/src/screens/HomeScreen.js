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
        <title>OMMATOPIA</title>
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

      <div className="products">
        <h2 className="my-3">Shop OMMATOPIA bestsellers!</h2>

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

      <Row>
        <Col md={4}>
          <Image
            className="d-block w-100 mx-auto"
            src="/images/dwl.png"
            alt="Designed With Love"
          />
        </Col>

        <Col md={8} className="mx-auto">
          <Container className="justify-content-end dwlDescription">
            <p>
              Designed with devotion and meticulously crafted for yogis at any
              stage, our mats are a harmonious blend of comfort and stability.
              Imagine them as the soft clouds of the fitness cosmos, supporting
              your joints as you delve into the depths of downward dogs and the
              spirit of warrior poses.
            </p>
            <p>
              Whether you're a seasoned yogi or a tentative explorer, our mats
              offer the foundation for your practice, both physically and
              metaphorically. These mats aren't mere floor coverings; they're a
              path to enlightenment for your body and soul.
            </p>
            <p>
              So, why wait? Immerse yourself in the world of OMMATOPIA, where
              every unrolling leads to a fresh experience of tranquility. Let's
              embark on this voyage together – unroll your zen NOW!
            </p>
          </Container>
        </Col>
      </Row>
    </div>
  );
}

export default HomeScreen;
