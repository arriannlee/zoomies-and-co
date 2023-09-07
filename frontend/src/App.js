import axios from 'axios';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import Navbar from 'react-bootstrap/Navbar';
import Badge from 'react-bootstrap/Badge';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Container from 'react-bootstrap/Container';
import { LinkContainer } from 'react-router-bootstrap';
import { useContext, useEffect, useState } from 'react';
import { Store } from './Store';
import BasketScreen from './screens/BasketScreen';
import SigninScreen from './screens/SigninScreen';
import SignupScreen from './screens/SignupScreen';
import PaymentScreen from './screens/PaymentScreen.js';
import DeliveryAddressScreen from './screens/DeliveryAddressScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import OrderScreen from './screens/OrderScreen';
import OrderHistoryScreen from './screens/OrderHistoryScreen';
import ProfileScreen from './screens/ProfileScreen';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { getError } from './utils';
import SearchBox from './components/SearchBox';
import SearchScreen from './screens/SearchScreen';
import ProtectedRoute from './components/ProtectedRoute';
import DashboardScreen from './screens/DashboardScreen';
import AdminRoute from './components/AdminRoute';
import ProductListScreen from './screens/ProductListScreen';
import ProductEditScreen from './screens/ProductEditScreen';

function App() {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { basket, userInfo } = state;

  const signoutHandler = () => {
    ctxDispatch({ type: 'USER_SIGNOUT' });
    localStorage.removeItem('userInfo');
    localStorage.removeItem('deliveryAddress');
    localStorage.removeItem('paymentMethod');
    window.location.href = '/signin';
  };

  const currentYear = new Date().getFullYear();

  // const [refineByIsOpen, setRefineByIsOpen] = useState(false);

  // const [sidebarIsOpen, setSidebarIsOpen] = useState(false);
  // const [categories, setCategories] = useState([]);

  // const [brands, setBrands] = useState([]);
  // const [colours, setColours] = useState([]);
  // const [materials, setMaterials] = useState([]);
  // const [thickness, setThicknesses] = useState([]);

  // useEffect(() => {
  //   const fetchCategories = async () => {
  //     try {
  //       const { data } = await axios.get(`/api/products/categories`);
  //       setCategories(data);
  //     } catch (err) {
  //       toast.error(getError(err));
  //     }
  //   };
  //   fetchCategories();
  // }, []);

  // useEffect(() => {
  //   const fetchBrands = async () => {
  //     try {
  //       const { data } = await axios.get(`/api/products/brands`);
  //       setBrands(data);
  //     } catch (err) {
  //       toast.error(getError(err));
  //     }
  //   };
  //   fetchBrands();
  // }, []);

  // useEffect(() => {
  //   const fetchColours = async () => {
  //     try {
  //       const { data } = await axios.get(`/api/products/colours`);
  //       setColours(data);
  //     } catch (err) {
  //       toast.error(getError(err));
  //     }
  //   };
  //   fetchColours();
  // }, []);

  // useEffect(() => {
  //   const fetchMaterials = async () => {
  //     try {
  //       const { data } = await axios.get(`/api/products/materials`);
  //       setMaterials(data);
  //     } catch (err) {
  //       toast.error(getError(err));
  //     }
  //   };
  //   fetchMaterials();
  // }, []);

  // useEffect(() => {
  //   const fetchThicknesses = async () => {
  //     try {
  //       const { data } = await axios.get(`/api/products/thicknesses`);
  //       setColours(data);
  //     } catch (err) {
  //       toast.error(getError(err));
  //     }
  //   };
  //   fetchThicknesses();
  // }, []);

  return (
    <BrowserRouter>
      {/* <div
        className={
          sidebarIsOpen
            ? 'd-flex flex-column site-container active-cont'
            : 'd-flex flex-column site-container'
        }
      > */}
      <ToastContainer position="bottom-center" limit={1} />
      <header>
        <Navbar bg="primary" variant="light" expand="lg" className="ctaBar">
          <Link className="nav-link" to="/search">
            <i className="fas fa-truck"> </i>
            <span className="strong"> Free Delivery</span> on all orders over
            £30{' '}
          </Link>
        </Navbar>
        {/* <Navbar bg="dark" variant="dark" expand="lg"> */}
        {/* <Container className="headerSocialIcons my-3">
            <a
              href="https://www.facebook.com/"
              target="_blank"
              rel="noreferrer"
            >
              <i className="fab fa-facebook"></i>
            </a>{' '}
            <a href="https://www.twitter.com/" target="_blank" rel="noreferrer">
              <i className="fab fa-twitter"></i>
            </a>{' '}
            <a href="https://www.youtube.com/" target="_blank" rel="noreferrer">
              <i className="fab fa-youtube"></i>
            </a>
            <a href="https://www.tiktok.com/" target="_blank" rel="noreferrer">
              <i className="fab fa-tiktok"></i>
            </a>
          </Container>
          <Container>
            <a href="tel:+44800123456">+44 800 123 456</a>
            <span>Email:</span>
            <a href="mailto:hello@ommatopia.com?subject=Website%20Enquiry">
              Email hello@ommatopia.com
            </a>
          </Container> */}
        {/* </Navbar> */}
        <Navbar bg="dark" variant="dark" expand="lg">
          <Container>
            {/* <Button
              variant="dark"
              onClick={() => setSidebarIsOpen(!sidebarIsOpen)}
            >
              <i className="fas fa-bars"></i>
            </Button> */}

            <LinkContainer to="/">
              <Navbar.Brand>OMMATOPIA</Navbar.Brand>
            </LinkContainer>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              {/* <SearchBox /> */}
              <Nav className="me-auto w-100 justify-content-end">
                <Link to="/basket" className="nav-link">
                  <i className="fas fa-shopping-basket"></i>
                  {/* Basket */}
                  {basket.basketItems.length > 0 && (
                    <Badge pill bg="primary">
                      {basket.basketItems.reduce((a, c) => a + c.quantity, 0)}
                    </Badge>
                  )}
                </Link>
                {userInfo ? (
                  <NavDropdown title={userInfo.name} id="basic-nav-dropdown">
                    <LinkContainer to="/profile">
                      <NavDropdown.Item>Profile</NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to="/orderhistory">
                      <NavDropdown.Item>Order History</NavDropdown.Item>
                    </LinkContainer>
                    <NavDropdown.Divider />
                    <Link
                      className="dropdown-item"
                      to="#signout"
                      onClick={signoutHandler}
                    >
                      Sign Out
                    </Link>
                  </NavDropdown>
                ) : (
                  <Link className="nav-link" to="/signin">
                    Sign In
                  </Link>
                )}
                {userInfo && userInfo.isAdmin && (
                  <NavDropdown title="Admin" id="admin-nav-dropdown">
                    <LinkContainer to="/admin/dashboard">
                      <NavDropdown.Item>Dashboard</NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to="/admin/products">
                      <NavDropdown.Item>Products</NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to="/admin/orders">
                      <NavDropdown.Item>Orders</NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to="/admin/users">
                      <NavDropdown.Item>Users</NavDropdown.Item>
                    </LinkContainer>
                  </NavDropdown>
                )}
              </Nav>
              <SearchBox />
            </Navbar.Collapse>
          </Container>
        </Navbar>
        {/* <Navbar bg="white" variant="light" expand="lg">
          <LinkContainer to="/">
            <Navbar.Brand className="logo">OMMATOPIA</Navbar.Brand>
          </LinkContainer>
        </Navbar> */}
      </header>
      {/* <div
          className={
            sidebarIsOpen
              ? 'active-nav side-navbar d-flex justify-content-between flex-wrap flex-column'
              : 'side-navbar d-flex justify-content-between flex-wrap flex-column'
          }
        >
          <Nav className="flex-column text-white w-100 p-2">
            <Nav.Item>
              <strong>Categories</strong>
            </Nav.Item>
            {categories.map((category) => (
              <Nav.Item key={category}>
                <LinkContainer
                  to={{ pathname: '/search', search: `/category=${category}` }}
                  onClick={() => setSidebarIsOpen(false)}
                >
                  <Nav.Link>{category}</Nav.Link>
                </LinkContainer>
              </Nav.Item>
            ))}
          </Nav>
        </div> */}

      {/* <div
        className={
          refineByIsOpen
            ? 'active-nav side-navbar d-flex justify-content-between flex-wrap flex-column'
            : 'side-navbar d-flex justify-content-between flex-wrap flex-column'
        }
      >
        <Nav className="flex-column text-white w-100 p-2">
          <Nav.Item>
            <strong>Categories</strong>
          </Nav.Item>
          {categories.map((category) => (
            <Nav.Item key={category}>
              <LinkContainer
                to={{ pathname: '/search', search: `/category=${category}` }}
                onClick={() => setSidebarIsOpen(false)}
              >
                <Nav.Link>{category}</Nav.Link>
              </LinkContainer>
            </Nav.Item>
          ))}
        </Nav>
      </div> */}

      <main>
        <Container className="mt-3">
          <Routes>
            <Route path="/product/:slug" element={<ProductScreen />} />
            <Route path="/basket" element={<BasketScreen />} />
            <Route path="/search" element={<SearchScreen />} />
            <Route path="/basket/signin" element={<SigninScreen />} />
            <Route path="/signin" element={<SigninScreen />} />
            <Route path="/signup" element={<SignupScreen />} />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <ProfileScreen />
                </ProtectedRoute>
              }
            />
            <Route path="/placeorder" element={<PlaceOrderScreen />} />
            <Route
              path="/order/:id"
              element={
                <ProtectedRoute>
                  <OrderScreen />
                </ProtectedRoute>
              }
            ></Route>
            <Route
              path="/orderhistory"
              element={<OrderHistoryScreen />}
            ></Route>

            <Route path="/delivery" element={<DeliveryAddressScreen />}></Route>
            <Route path="/payment" element={<PaymentScreen />}></Route>
            {/* Admin Routes */}
            <Route
              path="/admin/dashboard"
              element={
                <AdminRoute>
                  <DashboardScreen />
                </AdminRoute>
              }
            ></Route>
            <Route
              path="/admin/products"
              element={
                <AdminRoute>
                  <ProductListScreen />
                </AdminRoute>
              }
            ></Route>
            <Route
              path="/admin/product/:id"
              element={
                <AdminRoute>
                  <ProductEditScreen />
                </AdminRoute>
              }
            ></Route>
            <Route path="/" element={<HomeScreen />} />
          </Routes>
        </Container>
      </main>
      <footer className="bg-dark text-light" variant="dark" expand="lg">
        <Container className="newsletter"></Container>
        <Container className="socialIcons my-3">
          <a href="tel:+44800123456">
            <i className="fas fa-phone"></i>
          </a>
          <a href="mailto:hello@ommatopia.com?subject=Website%20Enquiry">
            <i className="far fa-envelope"></i>
          </a>
          <a href="https://www.facebook.com/" target="_blank" rel="noreferrer">
            <i className="fab fa-facebook"></i>
          </a>{' '}
          <a href="https://www.twitter.com/" target="_blank" rel="noreferrer">
            <i className="fab fa-twitter"></i>
          </a>{' '}
          <a href="https://www.youtube.com/" target="_blank" rel="noreferrer">
            <i className="fab fa-youtube"></i>
          </a>
          <a href="https://www.tiktok.com/" target="_blank" rel="noreferrer">
            <i className="fab fa-tiktok"></i>
          </a>
        </Container>
        <Container>
          <Row className="justify-content-center">
            <Col className="text-center mb-2">
              <p>
                Copyright &copy; {currentYear} OMMATOPIA. All rights reserved.
              </p>
            </Col>
          </Row>
        </Container>
      </footer>
      {/* </div> */}
    </BrowserRouter>
  );
}

export default App;
