import React, { useEffect, useReducer, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { getError } from '../utils';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Helmet } from 'react-helmet-async';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Rating from '../components/Rating';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import Button from 'react-bootstrap/Button';
import Product from '../components/Product';
import LinkContainer from 'react-router-bootstrap/LinkContainer';

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return {
        ...state,
        products: action.payload.products,
        page: action.payload.page,
        pages: action.payload.pages,
        countProducts: action.payload.countProducts,
        loading: false,
      };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

const prices = [
  {
    name: '£0 - £9.99',
    value: '0-9.99',
  },
  {
    name: '£10 - £19.99',
    value: '10-19.99',
  },
  {
    name: '£20 - £29.99',
    value: '20-29.99',
  },
  {
    name: '£30 - £39.99',
    value: '30-39.99',
  },
  {
    name: '£40 - £49.99',
    value: '40-49.99',
  },
  {
    name: '£50+',
    value: '50-100000',
  },
];

export const ratings = [
  {
    name: '4stars & up',
    rating: '4',
  },
  {
    name: '3stars & up',
    rating: '3',
  },
  {
    name: '2stars & up',
    rating: '2',
  },
  {
    name: '1stars & up',
    rating: '1',
  },
];

export default function SearchScreen() {
  const navigate = useNavigate();
  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const category = sp.get('category') || 'all';
  const type = sp.get('type') || 'all';
  const colour = sp.get('colour') || 'all';
  const material = sp.get('material') || 'all';
  const thickness = sp.get('thickness') || 'all';
  const query = sp.get('query') || 'all';
  const price = sp.get('price') || 'all';
  const rating = sp.get('rating') || 'all';
  const order = sp.get('order') || 'newest';
  const page = sp.get('page') || 1;

  const [{ loading, error, products, pages, countProducts }, dispatch] =
    useReducer(reducer, {
      loading: true,
      error: '',
    });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(
          `/api/products/search?page=${page}&query=${query}&category=${category}&type=${type}&colour=${colour}&material=${material}&thickness=${thickness}&price=${price}&rating=${rating}&order=${order}`
        );
        console.log('API Response:', data);

        dispatch({ type: 'FETCH_SUCCESS', payload: data });
      } catch (err) {
        dispatch({
          type: 'FETCH_FAIL',
          payload: getError(err),
        });
      }
    };
    fetchData();
  }, [
    category,
    type,
    colour,
    material,
    thickness,
    error,
    order,
    page,
    price,
    query,
    rating,
  ]);

  const [refineByCollapsed, setRefineByCollapsed] = useState(true);

  const [categories, setCategories] = useState([]);
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await axios.get('/api/products/categories');
        setCategories(data);
      } catch (err) {
        toast.error(getError(err));
      }
    };
    fetchCategories();
  }, [dispatch]);

  const [types, setTypes] = useState([]);
  useEffect(() => {
    const fetchTypes = async () => {
      try {
        const { data } = await axios.get('/api/products/types');
        setTypes(data);
      } catch (err) {
        toast.error(getError(err));
      }
    };
    fetchTypes();
  }, [dispatch]);

  const [colours, setColours] = useState([]);
  useEffect(() => {
    const fetchColours = async () => {
      try {
        const { data } = await axios.get('/api/products/colours');
        setColours(data);
      } catch (err) {
        toast.error(getError(err));
      }
    };
    fetchColours();
  }, [dispatch]);

  const [materials, setMaterials] = useState([]);
  useEffect(() => {
    const fetchMaterials = async () => {
      try {
        const { data } = await axios.get('/api/products/materials');
        setMaterials(data);
      } catch (err) {
        toast.error(getError(err));
      }
    };
    fetchMaterials();
  }, [dispatch]);

  const [thicknesses, setThicknesses] = useState([]);
  useEffect(() => {
    const fetchThicknesses = async () => {
      try {
        const { data } = await axios.get('/api/products/thicknesses');
        setThicknesses(data);
      } catch (err) {
        toast.error(getError(err));
      }
    };
    fetchThicknesses();
  }, [dispatch]);

  const getFilterUrl = (filter, skipPathname) => {
    const filterPage = filter.page || page;
    const filterCategory = filter.category || category;
    const filterType = filter.type || type;
    const filterColour = filter.colour || colour;
    const filterMaterial = filter.material || material;
    const filterThickness = filter.thickness || thickness;
    const filterQuery = filter.query || query;
    const filterRating = filter.rating || rating;
    const filterPrice = filter.price || price;
    const sortOrder = filter.order || order;
    return `${
      skipPathname ? '' : '/search?'
    }&category=${filterCategory}&type=${filterType}&colour=${filterColour}&material=${filterMaterial}&thickness=${filterThickness}&query=${filterQuery}&price=${filterPrice}&rating=${filterRating}&order=${sortOrder}&page=${filterPage}`;
  };
  return (
    <div>
      <Helmet>
        <title>Search Products</title>
      </Helmet>
      <Row>
        <Col
          md={3}
          className={`refineBy ${refineByCollapsed ? 'collapsed' : ''}`}
        >
          {/* <div className="filter">
            <h3>Category</h3>
            <ul>
              <li>
                <Link
                  className={'all' === category ? 'text-bold' : ''}
                  to={getFilterUrl({ category: 'all' })}
                >
                  Any
                </Link>
              </li>
              {categories.map((c) => (
                <li key={c}>
                  <Link
                    className={c === category ? 'text-bold' : ''}
                    to={getFilterUrl({ category: c })}
                  >
                    {c}
                  </Link>
                </li>
              ))}
            </ul> */}
          {/* </div> */}
          <div className="filter">
            <h3>Type</h3>
            <ul>
              <li>
                <Link
                  className={'all' === type ? 'text-bold selected' : ''}
                  to={getFilterUrl({ type: 'all' })}
                >
                  Any
                </Link>
              </li>
              {types.map((b) => (
                <li key={b}>
                  <Link
                    className={b === type ? 'text-bold selected' : ''}
                    to={getFilterUrl({ type: b })}
                  >
                    {b}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="filter">
            <h3>Colour</h3>
            <ul>
              <li>
                <Link
                  className={'all' === colour ? 'text-bold selected' : ''}
                  to={getFilterUrl({ colour: 'all' })}
                >
                  Any
                </Link>
              </li>
              {colours.map((c) => (
                <li key={c}>
                  <Link
                    className={c === colour ? 'text-bold selected' : ''}
                    to={getFilterUrl({ colour: c })}
                  >
                    {c}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="filter">
            <h3>Material</h3>
            <ul>
              <li>
                <Link
                  className={'all' === material ? 'text-bold selected' : ''}
                  to={getFilterUrl({ material: 'all' })}
                >
                  Any
                </Link>
              </li>
              {materials.map((m) => (
                <li key={m}>
                  <Link
                    className={m === material ? 'text-bold selected' : ''}
                    to={getFilterUrl({ material: m })}
                  >
                    {m}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="filter">
            <h3>Thickness</h3>
            <ul>
              <li>
                <Link
                  className={'all' === thickness ? 'text-bold selected' : ''}
                  to={getFilterUrl({ thickness: 'all' })}
                >
                  Any
                </Link>
              </li>
              {thicknesses.map((t) => (
                <li key={t}>
                  <Link
                    className={t === thickness ? 'text-bold selected' : ''}
                    to={getFilterUrl({ thickness: t })}
                  >
                    {t}mm
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="filter">
            <h3>Price</h3>
            <ul>
              <li>
                <Link
                  className={'all' === price ? 'text-bold selected' : ''}
                  to={getFilterUrl({ price: 'all' })}
                >
                  Any
                </Link>
              </li>
              {prices.map((p) => (
                <li key={p.value}>
                  <Link
                    to={getFilterUrl({ price: p.value })}
                    className={p.value === price ? 'text-bold selected' : ''}
                  >
                    {p.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="filter">
            <h3>Average Customer Rating</h3>
            <ul>
              {ratings.map((r) => (
                <li key={r.name}>
                  <Link
                    to={getFilterUrl({ rating: r.rating })}
                    className={`${r.rating}` === `${rating}` ? 'text-bold' : ''}
                  >
                    <Rating caption={' '} rating={r.rating}></Rating>
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  to={getFilterUrl({ rating: 'all' })}
                  className={rating === 'all' ? 'text-bold' : ''}
                >
                  <Rating caption={' '} rating={0}></Rating>
                </Link>
              </li>
            </ul>
          </div>
        </Col>

        <Col md={9} className="sortBy">
          {loading ? (
            <LoadingBox></LoadingBox>
          ) : error ? (
            <MessageBox variant="danger">{error}</MessageBox>
          ) : (
            <>
              {/* <Row className="justify-content-between mb-3"> */}
              <Row>
                <div className="results my-3">
                  {countProducts === 0 ? 'No' : countProducts} Results
                  {query !== 'all' && ' : ' + query}
                  {category !== 'all' && ' : ' + category}
                  {type !== 'all' && ' : ' + type}
                  {colour !== 'all' && ' : ' + colour}
                  {material !== 'all' && ' : ' + material}
                  {thickness !== 'all' && ' : ' + thickness}
                  {price !== 'all' && ' : Price ' + price}
                  {rating !== 'all' && ' : Rating ' + rating + ' & up'}
                  {query !== 'all' ||
                  category !== 'all' ||
                  type !== 'all' ||
                  colour !== 'all' ||
                  material !== 'all' ||
                  thickness !== 'all' ||
                  rating !== 'all' ||
                  price !== 'all' ? (
                    <Button variant="light" onClick={() => navigate('/search')}>
                      <i className="fas fa-times-circle"></i>
                    </Button>
                  ) : null}
                </div>
              </Row>
              <Row>
                <Col md={6}>
                  <div className="refineSortContainer">
                    <div
                      className="refine refineBy-toggle-button pointer"
                      onClick={() => setRefineByCollapsed(!refineByCollapsed)}
                    >
                      <i className="fas fa-filter"> </i>
                      FILTER BY
                    </div>
                    <div className="sortBy">
                      Sort by{' '}
                      <select
                        value={order}
                        onChange={(e) => {
                          navigate(getFilterUrl({ order: e.target.value }));
                        }}
                      >
                        <option value="newest">Newest First</option>
                        <option value="lowest">Price: Low to High</option>
                        <option value="highest">Price: High to Low</option>
                        <option value="topRated">
                          Average Customer Rating
                        </option>
                      </select>
                    </div>
                  </div>
                </Col>
                <Col>
                  {/* <div className="sortBy text-end"> */}
                  <div className="sortBy">
                    Sort by{' '}
                    <select
                      value={order}
                      onChange={(e) => {
                        navigate(getFilterUrl({ order: e.target.value }));
                      }}
                    >
                      <option value="newest">Newest First</option>
                      <option value="lowest">Price: Low to High</option>
                      <option value="highest">Price: High to Low</option>
                      <option value="topRated">Average Customer Rating</option>
                    </select>
                  </div>
                </Col>
              </Row>

              {products.length === 0 && (
                <MessageBox>No Product Found</MessageBox>
              )}
              <Row>
                {products.map((product) => (
                  <Col sm={6} lg={4} className="mb-3" key={product._id}>
                    <Product product={product}></Product>
                  </Col>
                ))}
              </Row>
              <div>
                {[...Array(pages).keys()].map((x) => (
                  <LinkContainer
                    key={x + 1}
                    className="mx-1"
                    to={{
                      pathname: '/search',
                      search: getFilterUrl({ page: x + 1 }, true),
                    }}
                  >
                    <Button
                      className={Number(page) === x + 1 ? 'text-bold' : ''}
                      variant="light"
                    >
                      {x + 1}
                    </Button>
                  </LinkContainer>
                ))}
              </div>
            </>
          )}
        </Col>
      </Row>
    </div>
  );
}
