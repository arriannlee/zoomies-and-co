import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    comment: { type: String, required: true },
    rating: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    slug: { type: String, required: true, unique: true },
    image: { type: String, required: true },
    brand: { type: String, required: true },
    category: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    countInStock: { type: Number, required: true },
    rating: { type: Number, required: true },
    numReviews: { type: Number, required: true },
    reviews: [reviewSchema],
    bullet1: { type: String, required: false },
    bullet2: { type: String, required: false },
    bullet3: { type: String, required: false },
    bullet4: { type: String, required: false },
    bullet5: { type: String, required: false },
    colour: { type: String, required: true },
    colourDescription: { type: String, required: true },
    material: { type: String, required: true },
    length: { type: Number, required: true },
    width: { type: Number, required: true },
    thickness: { type: Number, required: false },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model('Product', productSchema);
export default Product;
