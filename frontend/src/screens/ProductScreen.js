import axios from 'axios';
import React, {
  useContext,
  useEffect,
  useReducer,
  useRef,
  useState,
} from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import ListGroup from 'react-bootstrap/esm/ListGroup';
import Badge from 'react-bootstrap/Badge';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Rating from '../components/Rating';
import { Helmet } from 'react-helmet-async';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { getError } from '../utils';
import { Store } from '../Store';
import Product from '../components/Product';
import NewProductsCarousel from '../components/NewProductCarousel';
import { FloatingLabel } from 'react-bootstrap';
import { toast } from 'react-toastify';

const reducer = (state, action) => {
  switch (action.type) {
    case 'REFRESH_PRODUCT':
      return { ...state, product: action.payload };
    case 'CREATE_REQUEST':
      return { ...state, loadingCreateReview: true };
    case 'CREATE_SUCCESS':
      return { ...state, loadingCreateReview: false };
    case 'CREATE_FAIL':
      return { ...state, loadingCreateReview: false };
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return { ...state, product: action.payload, loading: false };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

function ProductScreen() {
  let reviewsRef = useRef();
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const navigate = useNavigate();
  const params = useParams();
  const { slug } = params;

  const [{ loading, error, product, loadingCreateReview }, dispatch] =
    useReducer(reducer, {
      product: [],
      loading: true,
      error: '',
    });

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: 'FETCH_REQUEST' });
      try {
        const result = await axios.get(`/api/products/slug/${slug}`);
        dispatch({ type: 'FETCH_SUCCESS', payload: result.data });
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: getError(err) });
      }
    };
    fetchData();
  }, [slug]);

  const [quantity, setQuantity] = useState(1); // New quantity state

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { basket, userInfo } = state;
  const addToBasketHandler = async () => {
    const existItem = basket.basketItems.find((x) => x.id === product._id);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const { data } = await axios.get(`/api/products/${product._id}`);
    if (data.countInStock < quantity) {
      window.alert('Sorry, this product is out of stock!');
      return;
    }
    ctxDispatch({
      type: 'BASKET_ADD_ITEM',
      payload: { ...product, quantity },
    });
    navigate('/basket');
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!comment || !rating) {
      toast.error('Please enter comment and rating');
      return;
    }
    try {
      const { data } = await axios.post(
        `/api/products/${product._id}/reviews`,
        { rating, comment, name: userInfo.name },
        {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        }
      );

      dispatch({
        type: 'CREATE_SUCCESS',
      });
      toast.success('Review submitted successfully');
      product.reviews.unshift(data.review);
      product.numReviews = data.numReviews;
      product.rating = data.rating;
      dispatch({ type: 'REFRESH_PRODUCT', payload: product });
      window.scrollTo({
        behavior: 'smooth',
        top: reviewsRef.current.offsetTop,
      });
    } catch (error) {
      toast.error(getError(error));
      dispatch({ type: 'CREATE_FAIL' });
    }
  };

  const scrollToReviews = () => {
    window.scrollTo({
      behavior: 'smooth',
      top: reviewsRef.current.offsetTop,
    });
  };

  return loading ? (
    <LoadingBox />
  ) : error ? (
    <MessageBox variant="danger">{error}</MessageBox>
  ) : (
    <div className="productScreen">
      <Helmet>
        <title>{product.name}</title>
      </Helmet>
      <Row>
        <Col md={4} className="productMainImg">
          <img
            className="img-large"
            src={product.image}
            alt={product.name}
          ></img>
        </Col>
        <Col md={8}>
          <Row className="my-3">
            <Col md={7}>
              <ListGroup.Item>
                <h1>
                  {product.colourDescription} {product.thickness}mm{' '}
                  {product.category}
                </h1>
                <h3>Ommatopia {product.type}</h3>
                <div className="my-2 pointer" onClick={scrollToReviews}>
                  <Rating
                    rating={product.rating}
                    numReviews={product.numReviews}
                  ></Rating>
                </div>
                {/* <p className="mt-2">
                  {product.description.split(' ').slice(0, 20).join(' ')}...{' '}
                  <a href="description">more</a>
                </p> */}
              </ListGroup.Item>
            </Col>
            <Col md={5}>
              <Card className="">
                <Card.Body>
                  <ListGroup variant="flush">
                    <Row className="mb-3">
                      <Col>Price: </Col>
                      <Col className="ar">£{product.price}</Col>
                    </Row>
                    <Row className="mb-3">
                      <Col>Availability:</Col>
                      <Col className="ar">
                        {product.countInStock > 0 ? (
                          <Badge bg="success">In Stock</Badge>
                        ) : (
                          <Badge bg="danger">Sold Out</Badge>
                        )}
                      </Col>
                    </Row>
                    {product.countInStock > 0 && (
                      <div className="d-grid">
                        <Button onClick={addToBasketHandler} variant="primary">
                          Add to Basket
                        </Button>
                      </div>
                    )}
                  </ListGroup>

                  {/* <ListGroup.Item>
                <p>FREE Delivery on all orders over £30!</p>
              </ListGroup.Item> */}
                </Card.Body>
              </Card>
              {/* <div className="iconText">
                <i className="fas fa-truck"></i>
                <p>FREE DELIVERY on all orders over £30</p>
              </div> */}
            </Col>
          </Row>
          <Row className="my-3">
            <ListGroup.Item>{product.description}</ListGroup.Item>
          </Row>
          <p className="strong">Features</p>
          <ListGroup.Item>
            <Row>
              <p>- {product.bullet1}</p>
            </Row>
          </ListGroup.Item>
          <ListGroup.Item>
            <Row>
              <p>- {product.bullet2}</p>
            </Row>
          </ListGroup.Item>
          <ListGroup.Item>
            <Row>
              <p>- {product.bullet3}</p>
            </Row>
          </ListGroup.Item>
          <ListGroup.Item>
            <Row>
              <p>- {product.bullet4}</p>
            </Row>
          </ListGroup.Item>
          <ListGroup.Item>
            <Row>
              <p>- {product.bullet5}</p>
            </Row>
          </ListGroup.Item>
          <p>
            <span className="strong">Colour </span> {product.colour}
          </p>
          <p>
            <span className="strong">Material </span> {product.material}
          </p>
          <p>
            <span className="strong">Dimension </span> {product.length}cm x{' '}
            {product.width}cm x {product.thickness}mm
          </p>
        </Col>
      </Row>

      {/* <div className="reviewOverview">
        <Row>
          <Col md={3}>
            <Row className="rating">
              <span>
                <h1>
                  {' '}
                  <i className="fas fa-star"></i>
                </h1>
              </span>
            </Row>
          </Col>
          <Col md={6}></Col>
        </Row>
      </div> */}
      <div className="my-3">
        <h2 ref={reviewsRef}>Reviews</h2>
        <div className="mb-3">
          {product.reviews.length === 0 && (
            <MessageBox>There are no reviews</MessageBox>
          )}
        </div>
        <ListGroup>
          {product.reviews.map((review) => (
            <ListGroup.Item key={review._id}>
              <strong>{review.name.split(' ')[0]}</strong>
              <p className="mb-0">
                {`${review.createdAt.substring(
                  8,
                  10
                )}/${review.createdAt.substring(
                  5,
                  7
                )}/${review.createdAt.substring(0, 4)}`}
              </p>

              {/* <p>{review.createdAt.substring(0, 10)}</p> */}

              <Rating rating={review.rating} caption=" "></Rating>
              <p className="my-3">{review.comment}</p>
            </ListGroup.Item>
          ))}
        </ListGroup>
        <div className="my-3">
          {userInfo ? (
            <form onSubmit={submitHandler}>
              <h2>Write a customer review</h2>
              <Form.Group className="mb-3" controlId="rating">
                <Form.Label>Rating</Form.Label>
                <Form.Select
                  aria-label="Rating"
                  value={rating}
                  onChange={(e) => setRating(e.target.value)}
                >
                  <option value="">Select...</option>
                  <option value="1">1 - Poor</option>
                  <option value="2">2 - Fair</option>
                  <option value="3">3 - Good</option>
                  <option value="4">4 - Very Good</option>
                  <option value="5">5 - Excellent</option>
                </Form.Select>
              </Form.Group>
              <FloatingLabel
                controlId="floatingTextarea"
                label="Comments"
                className="mb-3"
              >
                <Form.Control
                  as="textarea"
                  placeholder="Leave a comment here"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                />
              </FloatingLabel>

              <div className="mb-3">
                <Button disabled={loadingCreateReview} type="submit">
                  Submit
                </Button>
                {loadingCreateReview && <LoadingBox></LoadingBox>}
              </div>
            </form>
          ) : (
            <MessageBox>
              Please{' '}
              <Link to={`/signin?redirect=/product/${product.slug}`}>
                Sign In
              </Link>{' '}
              to write a review
            </MessageBox>
          )}
        </div>
      </div>
    </div>
  );
}
export default ProductScreen;

// Quantity

/* 
                    <ListGroup.Item>
                      <div className="d-flex align-items-center">
                        <span className="me-2">Quantity:</span>
                        <Button
                          onClick={() => setQuantity(Math.max(1, quantity - 1))}
                          variant="light"
                          disabled={quantity === 1}
                        >
                          -
                        </Button>
                        <span className="mx-2">{quantity}</span>
                        <Button
                          onClick={() =>
                            setQuantity(
                              Math.min(product.countInStock, quantity + 1)
                            )
                          }
                          variant="light"
                          disabled={quantity === product.countInStock}
                        >
                          +
                        </Button>
                      </div>
                    </ListGroup.Item> */
