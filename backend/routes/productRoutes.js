import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import Product from '../models/productModel.js';
import { isAuth, isAdmin } from '../utils.js';

const productRouter = express.Router();

productRouter.get('/', async (req, res) => {
  const products = await Product.find();
  res.send(products);
});

productRouter.post(
  '/',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const newProduct = new Product({
      name: 'sample ' + Date.now(),
      slug: 'sample-name-' + Date.now(),
      image: '/image/image.jpg',
      price: 0,
      category: 'sample category',
      brand: 'sample brand',
      countInStock: 0,
      rating: 0,
      numReviews: 0,
      description: 'sample description',
      bullet1: 'bullet 1',
      bullet2: 'bullet 2',
      bullet3: 'bullet 3',
      bullet4: 'bullet 4',
      bullet5: 'bullet 5',
      colour: '',
      colourDescription: '',
      material: '',
      length: 0,
      width: 0,
      thickness: 0,
    });
    const product = await newProduct.save();
    res.send({ message: 'Product Created', product });
  })
);
productRouter.put(
  '/:id',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const productId = req.params.id;
    const product = await Product.findById(productId);
    if (product) {
      product.name = req.body.name;
      product.slug = req.body.slug;
      product.price = req.body.price;
      product.image = req.body.image;
      product.category = req.body.category;
      product.brand = req.body.brand;
      product.countInStock = req.body.countInStock;
      product.description = req.body.description;
      product.bullet1 = req.body.bullet1;
      product.bullet2 = req.body.bullet2;
      product.bullet3 = req.body.bullet3;
      product.bullet4 = req.body.bullet4;
      product.bullet5 = req.body.bullet5;
      product.colour = req.body.colour;
      product.colourDescription = req.body.colourDescription;
      product.material = req.body.material;
      product.length = req.body.length;
      product.width = req.body.width;
      product.thickness = req.body.thickness;

      await product.save();
      res.send({ message: 'Product Updated' });
    } else {
      res.status(404).send({ message: 'Product Not Found' });
    }
  })
);

productRouter.delete(
  '/:id',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (product) {
      await product.deleteOne();
      res.send({ message: 'Product Deleted' });
    } else {
      res.status(404).send({ message: 'Product Not Found' });
    }
  })
);

productRouter.post(
  '/:id/reviews',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const productId = req.params.id;
    const product = await Product.findById(productId);
    if (product) {
      if (product.reviews.find((x) => x.name === req.user.name)) {
        return res
          .status(400)
          .send({ message: 'You have already submitted a review' });
      }
      const review = {
        name: req.user.name,
        rating: Number(req.body.rating),
        comment: req.body.comment,
      };
      product.reviews.push(review);

      product.numReviews = product.reviews.length;
      product.rating =
        product.reviews.reduce((a, c) => c.rating + a, 0) /
        product.reviews.length;
      const updateProduct = await product.save();
      res.status(201).send({
        message: 'Review Created',
        review: updateProduct.reviews[updateProduct.reviews.length - 1],
        numReviews: product.numReviews,
        rating: product.rating,
      });
    } else {
      res.status(404).send({ message: 'Product Not Found' });
    }
  })
);
const PAGE_SIZE = 10;

productRouter.get(
  '/admin',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const { query } = req;
    const page = query.page || 1;
    const pageSize = query.pageSize || PAGE_SIZE;

    const products = await Product.find()
      .skip(pageSize * (page - 1))
      .limit(pageSize);
    const countProducts = await Product.countDocuments();
    res.send({
      products,
      countProducts,
      page,
      pages: Math.ceil(countProducts / pageSize),
    });
  })
);

productRouter.get(
  '/search',
  expressAsyncHandler(async (req, res) => {
    const { query } = req;
    const pageSize = query.pageSize || PAGE_SIZE;
    const page = query.page || 1;
    const category = query.category || '';
    const brand = query.brand || '';
    const colour = query.colour || '';
    const material = query.material || '';
    const thickness = query.thickness || '';
    const price = query.price || '';
    const rating = query.rating || '';
    const order = query.order || '';
    const searchQuery = query.searchQuery || '';

    const queryFilter =
      searchQuery && searchQuery !== 'all'
        ? {
            name: {
              $regex: searchQuery,
              $options: 'i',
            },
          }
        : {};

    const categoryFilter = category && category !== 'all' ? { category } : {};
    const brandFilter = brand && brand !== 'all' ? { brand } : {};
    const colourFilter = colour && colour !== 'all' ? { colour } : {};
    const materialFilter = material && material !== 'all' ? { material } : {};
    const thicknessFilter =
      thickness && thickness !== 'all' ? { thickness } : {};

    const ratingFilter =
      rating && rating !== 'all'
        ? {
            rating: {
              $gte: Number(rating),
            },
          }
        : {};
    const priceFilter =
      price && price !== 'all'
        ? {
            price: {
              $gte: Number(price.split('-')[0]),
              $lte: Number(price.split('-')[1]),
            },
          }
        : {};

    const sortOrder =
      order === 'featured'
        ? { featured: -1 }
        : order === 'lowest'
        ? { price: 1 }
        : order === 'highest'
        ? { price: -1 }
        : order === 'topRated'
        ? { rating: -1 }
        : order === 'newest'
        ? { createdAt: -1 }
        : { _id: -1 };

    const products = await Product.find({
      ...queryFilter,
      ...categoryFilter,
      ...brandFilter,
      ...colourFilter,
      ...materialFilter,
      ...thicknessFilter,
      ...priceFilter,
      ...ratingFilter,
    })
      .sort(sortOrder)
      .skip(pageSize * (page - 1))
      .limit(pageSize);

    const countProducts = await Product.countDocuments({
      ...queryFilter,
      ...categoryFilter,
      ...brandFilter,
      ...colourFilter,
      ...materialFilter,
      ...thicknessFilter,
      ...priceFilter,
      ...ratingFilter,
    });

    res.send({
      products,
      countProducts,
      page,
      pages: Math.ceil(countProducts / pageSize),
    });
  })
);

productRouter.get(
  '/categories',
  expressAsyncHandler(async (req, res) => {
    const categories = await Product.find().distinct('category');
    res.send(categories);
  })
);

productRouter.get(
  '/brands',
  expressAsyncHandler(async (req, res) => {
    const brands = await Product.find().distinct('brand');
    res.send(brands);
  })
);

productRouter.get(
  '/colours',
  expressAsyncHandler(async (req, res) => {
    const colours = await Product.find().distinct('colour');
    res.send(colours);
  })
);

productRouter.get(
  '/materials',
  expressAsyncHandler(async (req, res) => {
    const materials = await Product.find().distinct('material');
    res.send(materials);
  })
);

productRouter.get(
  '/thicknesses',
  expressAsyncHandler(async (req, res) => {
    const thicknesses = await Product.find().distinct('thickness');
    res.send(thicknesses);
  })
);

productRouter.get('/slug/:slug', async (req, res) => {
  const product = await Product.findOne({ slug: req.params.slug });
  if (product) {
    res.send(product);
  } else {
    res.status(404).send({ message: 'Product Not Found' });
  }
});

productRouter.get('/:id', async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    res.send(product);
  } else {
    res.status(404).send({ message: 'Product Not Found' });
  }
});

// Inside your productRoutes.js or equivalent

// Assuming you have a field like 'createdAt' in your product schema
productRouter.get('/newly-added-products', async (req, res) => {
  try {
    const newlyAddedProducts = await Product.find()
      .sort({ timestamp: -1 }) // Sort by createdAt in descending order
      .limit(10); // Change this limit as needed

    res.send(newlyAddedProducts);
  } catch (error) {
    res.status(404).send({ message: 'Error fetching newly added products' });
  }
});

export default productRouter;
