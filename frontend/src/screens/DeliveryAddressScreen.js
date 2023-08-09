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
  const [addressLine1, setAddressLine1] = useState(
    deliveryAddress.addressLine1 || ''
  );
  const [addressLine2, setAddressLine2] = useState(
    deliveryAddress.addressLine2 || ''
  );
  const [townCity, setTownCity] = useState(deliveryAddress.townCity || '');
  const [county, setCounty] = useState(deliveryAddress.county || '');
  const [postcode, setPostcode] = useState(deliveryAddress.postcode || '');
  const [country, setCountry] = useState(deliveryAddress.country || '');
  useEffect(() => {
    if (!userInfo) {
      navigate('/signin?redirect=/delivery');
    }
  }, [userInfo, navigate]);
  const submitHandler = (e) => {
    e.preventDefault();
    ctxDispatch({
      type: 'SAVE_DELIVERY_ADDRESS',
      payload: {
        fullName,
        addressLine1,
        addressLine2,
        townCity,
        county,
        postcode,
        country,
      },
    });
    localStorage.setItem(
      'deliveryAddress',
      JSON.stringify({
        fullName,
        addressLine1,
        addressLine2,
        townCity,
        county,
        postcode,
        country,
      })
    );
    navigate('/payment');
  };
  return (
    <div>
      <Helmet>Delivery Address</Helmet>
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
          <Form.Group className="mb-3" controlId="addressLine1">
            <Form.Label>Address Line 1 (or Company Name)</Form.Label>
            <Form.Control
              value={addressLine1}
              onChange={(e) => setAddressLine1(e.target.value)}
              required
            />
          </Form.Group>{' '}
          <Form.Group className="mb-3" controlId="addressLine2">
            <Form.Label>Address Line 2 (optional)</Form.Label>
            <Form.Control
              value={addressLine2}
              onChange={(e) => setAddressLine2(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="townCity">
            <Form.Label>Town/City</Form.Label>
            <Form.Control
              value={townCity}
              onChange={(e) => setTownCity(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="county">
            <Form.Label>County (if applicable)</Form.Label>
            <Form.Control
              value={county}
              onChange={(e) => setCounty(e.target.value)}
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
