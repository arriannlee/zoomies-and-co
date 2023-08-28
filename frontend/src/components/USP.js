import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export default function USP() {
  return (
    <Container fluid>
      <div>
        <Row>Worldwide Delivery</Row>
        <Row>Great value delivery around the world</Row>
      </div>
      <div>
        <Row>Free Delivery</Row>
        <Row>UK mainland delivery available on all orders over £30*</Row>
      </div>
      <div>
        <Row>5 Star Service</Row>
        <Row>Independently rated as 'Excellent' by customers worldwide</Row>
      </div>
      <div>
        <Row>Simple Returns</Row>
        <Row>No-quibble 30 days refund policy</Row>
      </div>
    </Container>
  );
}
