import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import LoadingBox from '../components/LoadingBox';
import { useNavigate, useParams } from 'react-router-dom';

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
export default function CarouselManagementScreen() {
  const params = useParams(); // /product/:id
  const { id: carouselId } = params;
  const navigate = useNavigate();

  const [{ loading, error, loadingUpdate, loadingUpload }, dispatch] =
    useReducer(reducer, {
      loading: true,
      error: '',
    });

  const [tag1, setTag1] = useState('');
  const [tag2, setTag2] = useState('');
  const [tag3, setTag3] = useState('');
  const [carouselImage, setCarouselImage] = useState('');
  const [loadingUpload, setLoadingUpload] = useState(false);

  const uploadCarouselImageHandler = async (e) => {
    const file = e.target.files[0];
    const bodyFormData = new FormData();
    bodyFormData.append('file', file);
    try {
      setLoadingUpload(true);
      const { data } = await axios.post('/api/upload', bodyFormData);
      setLoadingUpload(false);
      toast.success('Carousel Image Uploaded Successfully');
      setCarouselImage(data.secure_url);
    } catch (err) {
      toast.error('Carousel Image Upload Failed');
      setLoadingUpload(false);
    }
  };

  // Create a handler to submit carousel content
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      dispatch({ type: 'UPDATE_REQUEST' });
      await axios.put(
        `/api/carousel/${carouselId}`,
        {
          _id: carouselId,
          tag1,
          tag2,
          tag3,
        },
        ax
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

  return (
    <Container className="small-container">
      <h1>Carousel Management</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group className="mb-3" controlId="tag1">
          <Form.Label>Tag Line One</Form.Label>
          <Form.Control
            value={tag1}
            onChange={(e) => setTag1(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="tag2">
          <Form.Label>Tag Line Two</Form.Label>
          <Form.Control
            value={tag2}
            onChange={(e) => setTag2(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="tag3">
          <Form.Label>Tag Line Three</Form.Label>
          <Form.Control
            value={tag3}
            onChange={(e) => setTag3(e.target.value)}
          />
        </Form.Group>
        {/* Similar groups for carouselBullet2 and carouselBullet3 */}
        <Form.Group className="mb-3" controlId="carouselImage">
          <Form.Label>Upload Carousel Image</Form.Label>
          <Form.Control type="file" onChange={uploadCarouselImageHandler} />
          {loadingUpload && <LoadingBox></LoadingBox>}
        </Form.Group>
        <Button type="submit">Submit Carousel</Button>
      </Form>
    </Container>
  );
}
