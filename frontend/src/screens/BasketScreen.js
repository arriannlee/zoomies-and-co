import { Helmet } from 'react-helmet-async';
import { Store } from '../Store';
import { useContext } from 'react';
import MessageBox from '../components/MessageBox';
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';
import Button from 'react-bootstrap/esm/Button';
import Card from 'react-bootstrap/esm/Card';
import ListGroup from 'react-bootstrap/esm/ListGroup';
import { Link } from 'react-router-dom';

export default function BasketScreen() {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    basket: { basketItems },
  } = state;

  return (
    <div>
      <Helmet>
        <title>Shopping Cart</title>
      </Helmet>
      <h1>Basket</h1>
      <Row>
        <Col md={8}>
          {basketItems.length === 0 ? (
            <MessageBox>
              Basket is empty. <Link to="/">Go Shopping</Link>
            </MessageBox>
          ) : (
            <ListGroup>
              {basketItems.map((item) => (
                <ListGroup.Item key={item._id}>
                  <Row className="align-items-center">
                    <Col md={4}>
                      <img
                        src={item.image}
                        alt={item.name}
                        className="img-fluid rounded img-thumbnail"
                      ></img>{' '}
                      <Link to={`/products/${item.slug}`}>{item.name}</Link>
                    </Col>
                    <Col md={3}>
                      <Button variant="light" disabled={item.quantity === 1}>
                        <i className="fas fa-minus circle"></i>
                      </Button>{' '}
                      <span>{item.quantity}</span>{' '}
                      <Button variant="light" disabled={item.quantity === 1}>
                        <i className="fas fa-plus circle"></i>
                      </Button>
                    </Col>
                    <Col md={3}>£{item.price}</Col>
                    <Col md={2}>
                      <Button variant="light">
                        <i className="fas fa-trash"></i>
                      </Button>
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
        </Col>
        <Col md={4}>
          <Card>
            <Card.Body>
              <ListGroup variant="flush">
                <h3>
                  Total ({basketItems.reduce((a, c) => a + c.quantity, 0)}{' '}
                  items) : £
                  {basketItems.reduce((a, c) => a + c.price * c.quantity, 0)}
                </h3>
              </ListGroup>
              <ListGroup.Item>
                <div className="d-grid">
                  <Button
                    type="button"
                    variant="primary"
                    disabled={basketItems.length === 0}
                  >
                    Proceed to Checkout
                  </Button>
                </div>
              </ListGroup.Item>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
