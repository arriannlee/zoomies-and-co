import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';

export default function AdminSearchBox() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const submitHandler = (e) => {
    e.preventDefault();
    navigate(`/admin/products?search=${searchQuery}`);
  };

  return (
    <Form className="d-flex" onSubmit={submitHandler}>
      <InputGroup>
        <FormControl
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search products..."
          aria-label="Search products..."
        />
        <Button variant="outline-primary" type="submit">
          <i className="fas fa-search"></i>
        </Button>
      </InputGroup>
    </Form>
  );
}
