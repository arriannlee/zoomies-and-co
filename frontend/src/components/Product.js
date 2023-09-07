import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import Rating from './Rating';
import axios from 'axios';
import { useContext } from 'react';
import { Store } from '../Store';
import { Col, Row } from 'react-bootstrap';

function Product(props) {
  const { product } = props;

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    basket: { basketItems },
  } = state;

  const addToBasketHandler = async (item) => {
    const existItem = basketItems.find((x) => x.id === product._id);
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
  return (
    <Card className="fixed-overview">
      <Link to={`/product/${product.slug}`}>
        <img
          src={product.image}
          className="card-img-top img-med"
          alt={product.name}
        />
      </Link>
      <Card.Body>
        <div className="nameRating">
          <Link to={`/product/${product.slug}`}>
            <Card.Title className="overviewName">
              {product.type} {product.colourDescription} {product.category}
            </Card.Title>
          </Link>
          {/* <div className="overviewRating mb-3">
            <Rating rating={product.rating} numReviews={product.numReviews} />
          </div> */}
        </div>

        <Row>
          <Card.Text className="overviewPrice">
            <h5>£{product.price}</h5>
          </Card.Text>
          {product.countInStock === 0 ? (
            <Button variant="light" disabled>
              Out of Stock
            </Button>
          ) : (
            <Button onClick={() => addToBasketHandler(product)}>
              Add to Basket{' '}
            </Button>
          )}
        </Row>
      </Card.Body>
    </Card>
  );
}
export default Product;
