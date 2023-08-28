import mongoose from 'mongoose';

const carouselSchema = new mongoose.Schema(
  {
    tag1: { type: String, required: false },
    tag2: { type: String, required: false },
    tag3: { type: String, required: false },
  },
  {
    timestamps: true,
  }
);

const Carousel = mongoose.model('Carousel', carouselSchema);
export default Carousel;
