import React, { useContext, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import { Store } from '../Store';
import CheckoutSteps from '../components/CheckoutSteps';

export default function DeliveryAddressScreen() {
  const navigate = useNavigate();
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    userInfo,
    basket: { deliveryAddress },
  } = state;
  const [fullName, setFullName] = useState(deliveryAddress.fullName || '');
  const [address, setAddress] = useState(deliveryAddress.address || '');
  const [city, setCity] = useState(deliveryAddress.city || '');
  const [postcode, setPostcode] = useState(deliveryAddress.postcode || '');
  useEffect(() => {
    if (!userInfo) {
      navigate('/signin?redirect=/delivery');
    }
  }, [userInfo, navigate]);
  const [country, setCountry] = useState(deliveryAddress.country || '');
  const submitHandler = (e) => {
    e.preventDefault();
    ctxDispatch({
      type: 'SAVE_DELIVERY_ADDRESS',
      payload: {
        fullName,
        address,
        city,
        postcode,
        country,
      },
    });
    localStorage.setItem(
      'deliveryAddress',
      JSON.stringify({
        fullName,
        address,
        city,
        postcode,
        country,
      })
    );
    navigate('/payment');
  };
  return (
    <div>
      <Helmet>
        <title>Delivery Address</title>
      </Helmet>
      <CheckoutSteps step1 step2></CheckoutSteps>
      <div className="container small-container">
        <h1 className="my-3">Delivery Address</h1>
        <Form onSubmit={submitHandler}>
          <Form.Group className="mb-3" controlId="fullName">
            <Form.Label>Full Name</Form.Label>
            <Form.Control
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="address">
            <Form.Label>Address</Form.Label>
            <Form.Control
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="city">
            <Form.Label>Town/City</Form.Label>
            <Form.Control
              value={city}
              onChange={(e) => setCity(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="postcode">
            <Form.Label>Postcode</Form.Label>
            <Form.Control
              value={postcode}
              onChange={(e) => setPostcode(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="country">
            <Form.Label>Country</Form.Label>
            <Form.Control
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              required
            />
          </Form.Group>
          <div className="mb-3">
            <Button variant="primary" type="submit">
              Continue
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
}
