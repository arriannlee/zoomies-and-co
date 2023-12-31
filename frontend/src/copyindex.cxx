Reset and base styles
body {
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

ul,
li {
  list-style: none;
  margin: 0;
  padding: 0;
  border: 0;
}

a:link {
  text-decoration: none;
}

/* Header */
header {
  margin-bottom: 0;
  padding: 0; /* Remove any bottom margin */
}

.ctaBar {
  color: #fff;
  display: flex;
  justify-content: center;
}

.dwlDescription {
  height: 200px;
  padding: 2rem;
  text-align: center;
}

/* Body */
body {
  margin: 0;
  color: #131a26;
}

/* Font Size */
h3 {
  font-size: 1rem;
}

/* Layout */
.site-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

main {
  flex: 1;
}

/* Buttons */
.btn-primary,
.btn-outline-primary {
  background-color: #212529;
  color: white;
}

/* Product ratings */
.rating .fas {
  color: #007bff;
}

.rating p {
  margin-bottom: 0;
}

/* Products */
.product {
  border: 1px var(--light-alt) solid;
  margin: 1rem;
}

.product img {
  width: 100%;
  max-width: 400px;
}

.product-info {
  padding: 1rem;
}

.img-large,
.img-med,
.img-sm {
  max-width: 100%;
  padding: 10px;
}

.img-large {
  height: auto;
  max-height: 375px;
}

.img-thumbnail {
  height: 80px;
}

.small-container {
  max-width: 600px;
}

.checkout-steps > div {
  border-bottom: 0.2rem solid #a0a0a0;
  color: #a0a0a0;
}

.checkout-steps > div.active {
  border-bottom: 0.2rem solid #007bff;
  color: #007bff;
}

/* Sidebar */
.navbar-brand {
  font-weight: bold;
}

.side-navbar {
  width: 240px;
  height: 100%;
  position: absolute;
  left: -300px;
  background-color: #100901;
  transition: 0.5s;
}

.active-cont {
  margin-left: 240px;
}

.active-nav {
  left: 0;
}

.text-bold {
  font-weight: bold;
}

/* Product bullets */
.product-bullet {
  padding: 0.5rem 0;
}

.productScreen {
  padding: 1rem 0;
}

/* Icon text */
.iconText {
  justify-content: center;
  display: flex;
  align-items: center;
  margin: 10px 0;
}

.iconText i {
  margin-right: 10px;
}

.iconText p {
  margin: 0;
}

/* Product overview */
.overviewName,
.overviewPrice,
.overviewRating {
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
}

.overviewName {
  height: 100px;
  color: #131a26;
}

.overviewPrice {
  height: 25px;
}

/* Mouse Cursor */
.pointer {
  cursor: pointer;
}

/* Alignment */
.ar {
  display: flex;
  justify-content: right;
}

/* USP */
.usp-item {
  padding: 20px;
  background-color: #f0f0f0;
  margin-bottom: 10px;
  transition: all 0.3s ease;
}

/* Footer */
.socialIcons {
  display: flex;
  justify-content: center;
  align-items: center;
}

.socialIcons i {
  color: white;
  text-decoration: none;
  font-size: 2rem;
  margin: 0.75rem 1.2rem 0 0;
  display: flex;
}

.fab:hover {
  color: #007bff;
}

.white {
  color: white;
}

/* Refine By */
.refineBy {
  display: block;
}

.refineBy .refineSortContainer {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.refineBy-toggle-button {
  display: none;
}

@media (max-width: 750px) {
  .refineBy {
    display: none;
  }

  .refineBy.collapsed {
    /* Add styles for the collapsed refineBy on smaller screens */
  }

  .refineBy-toggle-button {
    display: block;
  }
}

@media (max-width: 768px) {
  .refineBy-toggle-button {
    /* Update styles for the icon and button on smaller screens */
  }
}

/* Search Screen */
.filter ul {
  margin-bottom: 1.5rem;
}

.filter h3 {
  text-transform: uppercase;
}

.filter a:link {
  color: #232323;
  text-decoration: none;
}

.filter a:visited {
  color: #232323;
}

.filter a:hover {
  color: #007bff;
}

.filter li a.selected {
  color: #007bff;
}

.logo {
  color: #007bff;
  font-size: 2rem;
}

/* Logo/Brand Name */
.brandName:hover {
  color: #007bff;
}

/* Homescreen */
.products h2 {
  text-align: center;
  text-transform: uppercase;
}

.carousel img {
  max-height: 600px;
  width: 100%;
}

.center-caption {
  color: #232323;
  background-color: rgba(255, 255, 255, 0.8);
  text-shadow: #100901;
}

.brandColour {
  color: #007bff;
} */

main {
  padding-top: 0;
  margin-bottom: 60px; /* Adjust the value to match the height of your footer */
}
header {
  margin-bottom: 0;
  padding: 0; /* Remove any bottom margin */
}

body {
  margin: 0;
  /* padding: 0; */
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
a:link {
  text-decoration: none;
}

ul {
  list-style: none;
  margin: 0;
  padding: 0;
  border: 0;
}

.strong {
  font-weight: bold;
}

/* Header */

.ctaBar {
  color: #fff; /* Change the text color */
  /* font-size: 1.1rem; */
  display: flex;
  justify-content: center;
}

.dwlDescription {
  height: 200px;
  padding: 2rem;

  text-align: center;
}

/* header {
  background-color: var(--dark-alt);
  padding: 1rem;
}

header a {
  color: var(--light);
  font-weight: bold;
  text-decoration: none;
} */

.body {
  color: #131a26;
}
/* Font Size  */

h3 {
  font-size: 1rem;
}
.site-container {
  min-height: 100vh;
}
main {
  flex: 1;
}

.btn-primary,
.btn-outline-primary {
  background-color: #212529;
  color: white;
}

/* .products {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
} */

.rating .fas {
  color: #007bff;
}

.rating p {
  margin-bottom: 0;
}
.product {
  border: 1px var(--light-alt) solid;
  margin: 1rem;
}

.product img {
  width: 100%;
  max-width: 400px;
}

.product-info {
  padding: 1rem;
}

.img-large {
  max-width: 100%;
  height: 600px;
}

.img-med {
  max-width: 100%;
  height: 500px;
  padding: 10px;
}

.img-sm {
  max-width: 100%;
  height: 300px;
  padding: 10px;
}

@media (max-width: 768px) {
  .img-large {
    height: auto;
    max-height: 375px;
  }
}

.img-thumbnail {
  height: 80px;
}

.small-container {
  max-width: 600px;
}

.checkout-steps > div {
  border-bottom: 0.2rem solid #a0a0a0;
  color: #a0a0a0;
}

.checkout-steps > div.active {
  border-bottom: 0.2rem solid #007bff;
  color: #007bff;
}

/* sidebar */
.navbar-brand {
  font-weight: bold;
}
.side-navbar {
  width: 240px;
  height: 100%;
  position: absolute;
  left: -300px;
  background-color: #100901;
  transition: 0.5s;
}

.site-container {
  transition: 0.4s;
}
.active-cont {
  margin-left: 240px;
}
.active-nav {
  left: 0;
}
.text-bold {
  font-weight: bold;
}

li {
  list-style: none;
  padding: 0; /* Add this line to remove padding */
  margin: 0.75rem 0 0.75rem 0.5rem; /* Add this line to remove margin as well */
}

.product-bullet {
  padding: 0.5rem 0;
}

.productScreen {
  padding: 1rem 0;
}

/* <Row style="display: flex; align-items: center;">
  <i className="fas fa-truck" style="margin-right: 10px;"></i>
  <p style="margin: 0;">FREE delivery on all orders over £30</p>
</Row> */

.iconText {
  justify-content: center;
  display: flex;
  align-items: center;
  margin: 10px 0; /* Adding some margin to separate from the card */
}

.iconText i {
  margin-right: 10px;
}

.iconText p {
  margin: 0;
}

/* Homescreen */

/* .overviewName,
.overviewPrice {
  text-align: center;
} */

/*  Product */

.overviewName {
  text-align: center;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #131a26;
}

.overviewPrice {
  text-align: center;
  height: 25px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.overviewRating {
  height: 20px;

  display: flex;
  justify-content: center;
  align-items: center;
}

/* .nameRating {
  height: 100px;
} */
/* Product Screen */

.productMainImg {
  display: flex;
  justify-content: center;
  align-items: center;
}

/* Mouse Cursor */
.pointer {
  cursor: pointer;
}

/* ALignment */
.ar {
  display: flex;
  justify-content: right;
}

/* USP */
.usp-item {
  padding: 20px;
  background-color: #f0f0f0;
  margin-bottom: 10px;
  transition: all 0.3s ease; /* Add transition for smooth effect */
}

/* .fixed-overview {
  height: 650px;
} */

/* Footer */

.socialIcons {
  display: flex;
  justify-content: center; /* Center horizontally */
  align-items: center; /* Center vertically */
}
.socialIcons i {
  color: white;
  text-decoration: none;
  font-size: 2rem;
  /* padding: 0.5rem; */
  margin: 0.75rem 1.2rem 0 0;
  display: flex;
}

.fab:hover {
  color: #007bff;
}

.white {
  color: white;
}

/* Refine By */

.refineBy {
  display: block;
}
/* Add CSS rules for your collapsed refineBy */
/* .refineBy.collapsed {
  display: none; /* Hide the refineBy when collapsed */

.refineBy .refineSortContainer {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.refineBy-toggle-button {
  display: none; /* Hide the toggle button on larger screens */
}

@media (max-width: 750px) {
  .refineBy {
    display: none; /* Add styles for the expanded refineBy on smaller screens */
  }

  .refineBy.collapsed {
    /* Add styles for the collapsed refineBy on smaller screens */
  }

  .refineBy-toggle-button {
    display: block; /* Show the toggle button on smaller screens */
    /* Add styling for the toggle button */
  }
}

.refineBy-toggle-button {
  /* Add styling for the button */
  /* background: none;
  border: none;
  cursor: pointer;
  font-size: 1.5rem;
  margin: 0;
  padding: 0; */
}

@media (max-width: 768px) {
  .refineBy-toggle-button {
    /* Update styles for the icon and button on smaller screens */
  }
}

/* Search Screen */
.filter ul {
  margin-bottom: 1.5rem;
}
.filter h3 {
  text-transform: uppercase;
}

.filter a:link {
  color: #232323; /* Change the color to your desired color */
  text-decoration: none;
  /* Remove underline */
}
.filter a:visited {
  color: #232323;
}
.filter a:hover {
  color: #007bff;
}

.filter li a.selected {
  color: #007bff;
}

.logo {
  color: #007bff;
  font-size: 2rem;
}
/* .searchBar ul {
  padding: 0;
  margin: 0;
} */

/* Logo/Brand Name */

.brandName:hover {
  color: #007bff;
}

/* Homescreen */

.products h2 {
  text-align: center;
  text-transform: uppercase;
}

.carousel img {
  max-height: 600px;
  width: 100%;
}

.center-caption {
  /* color: #232323; */
  /* display: flex;
  align-items: center;
  justify-content: center;
  height: 100%; Ensure the caption takes up the full height of the parent */
}

/* Continuous Text Carousel */
.carouselText {
  text-align: center;
  font-weight: bold;
  text-transform: uppercase;
  color: #232323;
}

.carouselFade .carouselItem {
  opacity: 0;
  transition: opacity 0.5s ease-in-out;
}

.carouselFade .carouselItem.active {
  opacity: 1;
}

/* Hide the indicators (navigation bars) */
.carousel .carousel-indicators {
  display: none;
}

/* Hide the controls (arrows) */
.carousel .carousel-control {
  display: none;
}

.brandColour {
  color: #007bff;
}
