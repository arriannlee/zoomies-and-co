import bcrypt from 'bcryptjs';

const data = {
  users: [
    {
      name: 'admin',
      email: 'admin@test.com',
      password: bcrypt.hashSync('123456'),
      isAdmin: true,
    },
    {
      name: 'not admin',
      email: 'test@test.com',
      password: bcrypt.hashSync('test'),
      isAdmin: true,
    },
    {
      name: 'Bob',
      email: 'bob@bobsbobbin.com',
      password: bcrypt.hashSync('123456'),
      isAdmin: false,
    },
  ],
  products: [
    {
      name: 'Nike Skinny Shirt',
      slug: 'nike-skinny-shirt',
      category: 'Shirts',
      image: '/images/p1.jpg',
      price: 120,
      countInStock: 10,
      brand: 'Nike',
      rating: 4.5,
      numReviews: 10,
      description: 'high quality shirt',
    },
    {
      name: 'Adidas Fit Shirt',
      slug: 'adidas-fit-shirt',
      category: 'Shirts',
      image: '/images/p2.jpg',
      price: 250,
      countInStock: 0,
      brand: 'Adidas',
      rating: 4.0,
      numReviews: 10,
      description: 'high quality shirt',
    },
    {
      name: 'Nike Slim Pants',
      slug: 'nike-slim-pants',
      category: 'Shirts',
      image: '/images/p3.jpg',
      price: 25,
      countInStock: 15,
      brand: 'Nike',
      rating: 4.5,
      numReviews: 14,
      description: 'high quality product',
    },
    {
      name: 'Adidas Fit Pants',
      slug: 'adidas-fit-pants',
      category: 'Pants',
      image: '/images/p4.jpg',
      price: 65,
      countInStock: 5,
      brand: 'Puma',
      rating: 4.5,
      numReviews: 10,
      description: 'high quality product',
    },
  ],
};

export default data;
