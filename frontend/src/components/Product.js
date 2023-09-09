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
    <Card className="productCard">
      <Link to={`/product/${product.slug}`}>
        <img
          src={product.image}
          className="card-img-top img-large"
          alt={product.name}
        />
      </Link>
      <Card.Body>
        <div className="productCardName">
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
          <Card.Text className="productCardPrice">
            <h4>£{product.price}</h4>
          </Card.Text>
          <div className="center">
            {product.countInStock === 0 ? (
              <Button className="btn-custom center" variant="light" disabled>
                Out of Stock
              </Button>
            ) : (
              <Button
                className="btn custom-button"
                onClick={() => addToBasketHandler(product)}
              >
                Add to Basket
              </Button>
            )}
          </div>
        </Row>
      </Card.Body>
    </Card>
  );
}
export default Product;
