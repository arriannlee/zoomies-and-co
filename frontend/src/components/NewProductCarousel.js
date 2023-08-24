import React, { useState, useEffect, useContext } from 'react';
import { Carousel, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Rating from './Rating';
import axios from 'axios';
import { Store } from '../Store';

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

function NewProductsCarousel() {
  const [newlyAddedProducts, setNewlyAddedProducts] = useState([]);
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    basket: { basketItems },
  } = state;

  const addToBasketHandler = async (item) => {
    const existItem = basketItems.find((x) => x.id === item._id);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const { data } = await axios.get(`/api/products/${item._id}`);
    if (data.countInStock < quantity) {
      window.alert('Sorry, this product is out of stock!');
      return;
    }
    ctxDispatch({
      type: 'BASKET_ADD_ITEM',
      payload: { ...item, quantity },
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      ctxDispatch({ type: 'FETCH_REQUEST' });
      try {
        const response = await axios.get('/api/newly-added-products');
        ctxDispatch({ type: 'FETCH_SUCCESS' }); // Dispatch success action if needed
        setNewlyAddedProducts(response.data);
      } catch (error) {
        ctxDispatch({
          type: 'FETCH_FAIL',
          payload: 'Error fetching newly added products',
        });
        console.error(error); // Log the error for debugging
      }
    };

    fetchData();
  }, []);

  return (
    <Carousel>
      {newlyAddedProducts.map((product) => (
        <Carousel.Item key={product._id}>
          <Card>
            <Link to={`/product/${product.slug}`}>
              <Card.Img variant="top" src={product.image} alt={product.name} />
            </Link>
            <Card.Body>
              <Link to={`/product/${product.slug}`}>
                <Card.Title>{product.name}</Card.Title>
              </Link>
              <Rating rating={product.rating} numReviews={product.numReviews} />
              <Card.Text>£{product.price}</Card.Text>
              {product.countInStock === 0 ? (
                <Button variant="light" disabled>
                  Out of Stock
                </Button>
              ) : (
                <Button onClick={() => addToBasketHandler(product)}>
                  Add to Basket
                </Button>
              )}
            </Card.Body>
          </Card>
        </Carousel.Item>
      ))}
    </Carousel>
  );
}

export default NewProductsCarousel;
