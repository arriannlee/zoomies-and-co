import React, { useContext, useEffect, useReducer, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';
import { Store } from '../Store';
import { getError } from '../utils';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import { Helmet } from 'react-helmet-async';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return { ...state, loading: false };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    case 'UPDATE_REQUEST':
      return { ...state, loadingUpdate: true };
    case 'UPDATE_SUCCESS':
      return { ...state, loadingUpdate: false };
    case 'UPDATE_FAIL':
      return { ...state, loadingUpdate: false };
    case 'UPLOAD_REQUEST':
      return { ...state, loadingUpload: true, errorUpload: '' };
    case 'UPLOAD_SUCCESS':
      return {
        ...state,
        loadingUpload: false,
        errorUpload: '',
      };
    case 'UPLOAD_FAIL':
      return { ...state, loadingUpload: false, errorUpload: action.payload };

    default:
      return state;
  }
};

const colorOptions = [
  'Red',
  'Blue',
  'Green',
  'Yellow',
  'Purple',
  'Orange',
  'Pink',
  'Brown',
  'Black',
  'White',
  'Gray',
  'Multicoloured',
  'Natural',
];

export default function ProductEditScreen() {
  const params = useParams(); // /product/:id
  const { id: productId } = params;
  const navigate = useNavigate();

  const { state } = useContext(Store);
  const { userInfo } = state;
  const [{ loading, error, loadingUpdate, loadingUpload, product }, dispatch] =
    useReducer(reducer, {
      product: [],
      loading: true,
      error: '',
    });

  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState('');
  const [category, setCategory] = useState('');
  const [countInStock, setCountInStock] = useState('');
  const [brand, setBrand] = useState('');
  const [description, setDescription] = useState('');
  const [bullet1, setBullet1] = useState('');
  const [bullet2, setBullet2] = useState('');
  const [bullet3, setBullet3] = useState('');
  const [bullet4, setBullet4] = useState('');
  const [bullet5, setBullet5] = useState('');
  const [colour, setColour] = useState('');
  const [colourDescription, setColourDescription] = useState('');
  const [material, setMaterial] = useState('');
  const [length, setLength] = useState('');
  const [width, setWidth] = useState('');
  const [thickness, setThickness] = useState('');
  const [selectedColor, setSelectedColor] = useState('');

  const handleColorChange = (e) => {
    setSelectedColor(e.target.value);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch({ type: 'FETCH_REQUEST' });
        const { data } = await axios.get(`/api/products/${productId}`);
        const generatedSlug = data.name.toLowerCase().replace(/ /g, '-');

        setName(data.name);
        setSlug(generatedSlug);
        // setSlug(data.slug);
        setPrice(data.price);
        setImage(data.image);
        setCategory(data.category);
        setCountInStock(data.countInStock);
        setBrand(data.brand);
        setDescription(data.description);
        setBullet1(data.bullet1);
        setBullet2(data.bullet2);
        setBullet3(data.bullet3);
        setBullet4(data.bullet4);
        setBullet5(data.bullet5);
        setColour(data.colour);
        setColourDescription(data.colourDescription);
        setMaterial(data.material);
        setLength(data.length);
        setWidth(data.width);
        setThickness(data.thickness);
        setSelectedColor(data.SelectedColor);

        dispatch({ type: 'FETCH_SUCCESS' });
      } catch (err) {
        dispatch({
          type: 'FETCH_FAIL',
          payload: getError(err),
        });
      }
    };
    fetchData();
  }, [productId]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      dispatch({ type: 'UPDATE_REQUEST' });
      await axios.put(
        `/api/products/${productId}`,
        {
          _id: productId,
          name,
          slug,
          price,
          image,
          category,
          brand,
          countInStock,
          description,
          bullet1,
          bullet2,
          bullet3,
          bullet4,
          bullet5,
          colour,
          colourDescription,
          material,
          length,
          width,
          thickness,
        },
        {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        }
      );
      dispatch({
        type: 'UPDATE_SUCCESS',
      });
      toast.success('Product Updated Successfully');
      navigate('/admin/products');
    } catch (err) {
      toast.error(getError(err));
      dispatch({ type: 'UPDATE_FAIL' });
    }
  };

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const bodyFormData = new FormData();
    bodyFormData.append('file', file);
    try {
      dispatch({ type: 'UPLOAD_REQUEST' });
      const { data } = await axios.post('/api/upload', bodyFormData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${userInfo.token}`,
        },
      });
      dispatch({ type: 'UPLOAD_SUCCESS' });
      toast.success('Image Uploaded Successfully');
      setImage(data.secure_url);
    } catch (err) {
      toast.error(getError(err));
      dispatch({ type: 'UPLOAD_FAIL', payload: getError(err) });
    }
  };

  const remainingCharacters = 50 - name.length;

  return (
    <Container className="small-container">
      <Helmet>
        <title>New Product ${productId}</title>
      </Helmet>
      <h1>Add Product {productId}</h1>

      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <Form onSubmit={submitHandler}>
          <Form.Group className="mb-3" controlId="name">
            <Form.Label>Product Name</Form.Label>
            <Form.Control
              value={name}
              onChange={(e) =>
                setName(
                  e.target.value
                    .slice(0, 50)
                    .replace(/\b\w/g, (char) => char.toUpperCase())
                )
              }
              maxLength={50}
              required
            />
            <small>{remainingCharacters} characters remaining</small>
          </Form.Group>
          <Row>
            <Col md={4}>
              <Form.Group className="mb-3" controlId="colour">
                <Form.Label>Colour</Form.Label>
                <Form.Control
                  value={colour}
                  onChange={(e) => setColour(e.target.value)}
                  required
                />
              </Form.Group>
            </Col>
            <Col md={8}>
              <Form.Group className="mb-3" controlId="colourDescription">
                <Form.Label>Colour Description</Form.Label>
                <Form.Control
                  value={colourDescription}
                  onChange={(e) =>
                    setColourDescription(
                      e.target.value.replace(/\b\w/g, (char) =>
                        char.toUpperCase()
                      )
                    )
                  }
                  required
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3" controlId="brand">
                <Form.Label>Brand</Form.Label>
                <Form.Control
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                  required
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3" controlId="category">
                <Form.Label>Category</Form.Label>
                <Form.Control
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  required
                />
              </Form.Group>
            </Col>
          </Row>

          <Form.Group className="mb-3" controlId="description">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea" // Use a textarea instead of a regular input
              style={{ height: '150px' }} // Adjust the height as needed
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="bullet1">
            <Form.Label>Bullet One</Form.Label>
            <Form.Control
              value={bullet1}
              onChange={(e) => setBullet1(e.target.value)}
              // required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="bullet2">
            <Form.Label>Bullet Two</Form.Label>
            <Form.Control
              value={bullet2}
              onChange={(e) => setBullet2(e.target.value)}
              // required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="bullet3">
            <Form.Label>Bullet Three</Form.Label>
            <Form.Control
              value={bullet3}
              onChange={(e) => setBullet3(e.target.value)}
              // required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="bullet4">
            <Form.Label>Bullet Four</Form.Label>
            <Form.Control
              value={bullet4}
              onChange={(e) => setBullet4(e.target.value)}
              // required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="bullet5">
            <Form.Label>Bullet Five</Form.Label>
            <Form.Control
              value={bullet5}
              onChange={(e) => setBullet5(e.target.value)}
              // required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="material">
            <Form.Label>Material</Form.Label>
            <Form.Control
              value={material}
              onChange={(e) => setMaterial(e.target.value)}
              required
            />
          </Form.Group>

          <Row>
            <Col md={4}>
              <Form.Group className="mb-3" controlId="length">
                <Form.Label>Length (cm)</Form.Label>
                <Form.Control
                  value={length}
                  onChange={(e) => setLength(e.target.value)}
                  required
                />
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group className="mb-3" controlId="width">
                <Form.Label>Width (cm)</Form.Label>
                <Form.Control
                  value={width}
                  onChange={(e) => setWidth(e.target.value)}
                  required
                />
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group className="mb-3" controlId="thickness">
                <Form.Label>Thickness (mm)</Form.Label>
                <Form.Control
                  value={thickness}
                  onChange={(e) => setThickness(e.target.value)}
                  required
                />
              </Form.Group>
            </Col>
          </Row>

          {/* <Form.Group className="mb-3" controlId="slug">
            <Form.Label>Slug</Form.Label>
            <Form.Control
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              required
            />
          </Form.Group> */}
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3" controlId="countInStock">
                <Form.Label>Count In Stock</Form.Label>
                <Form.Control
                  value={countInStock}
                  onChange={(e) => setCountInStock(e.target.value)}
                  required
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3" controlId="name">
                <Form.Label>Price</Form.Label>
                <Form.Control
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  required
                />
              </Form.Group>
            </Col>
          </Row>
          {/* <Form.Group className="mb-3" controlId="image">
            <Form.Label>Image File</Form.Label>
            <Form.Control
              value={image}
              onChange={(e) => setImage(e.target.value)}
              required
            />
          </Form.Group> */}
          <Form.Group className="mb-3" controlId="imageFile">
            <Form.Label>Upload File</Form.Label>
            <Form.Control type="file" onChange={uploadFileHandler} />
            {loadingUpload && <LoadingBox></LoadingBox>}
          </Form.Group>

          {/* <div>
            <img
              className="img-small"
              src={product.image}
              alt={product.name}
            ></img>
          </div> */}
          <div className="mb-3">
            <Button disabled={loadingUpdate} type="submit">
              Update
            </Button>
            {loadingUpdate && <LoadingBox></LoadingBox>}
          </div>
        </Form>
      )}
    </Container>
  );
}
