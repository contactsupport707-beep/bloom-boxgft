import express from 'express';

const router = express.Router();

let mockProducts = [
  {
    _id: '1',
    name: 'The Royal Truffle Collection',
    price: 3499,
    originalPrice: 4999,
    category: 'Luxury',
    image: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&q=80&w=800',
    images: [],
    videos: [],
    rating: 4.8,
    reviews: 124,
    isTrending: true
  },
  {
    _id: '2',
    name: 'Midnight Elegance Box',
    price: 2199,
    originalPrice: 2999,
    category: 'Birthday',
    image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&q=80&w=800',
    images: [],
    videos: [],
    rating: 4.9,
    reviews: 89,
    isTrending: true
  },
  {
    _id: '3',
    name: 'Golden Wedding Crate',
    price: 5999,
    originalPrice: 7500,
    category: 'Wedding',
    image: 'https://images.unsplash.com/photo-1513885535751-8b9238bd345a?auto=format&fit=crop&q=80&w=800',
    images: [],
    videos: [],
    rating: 5.0,
    reviews: 42,
    isTrending: false
  },
  {
    _id: '4',
    name: 'Velvet Rose & Macaron Set',
    price: 1899,
    originalPrice: 2200,
    category: 'Florals',
    image: 'https://images.unsplash.com/photo-1543168256-418811576931?auto=format&fit=crop&q=80&w=800',
    images: [],
    videos: [],
    rating: 4.7,
    reviews: 210,
    isTrending: true
  }
];

router.get('/', (req, res) => {
    res.json({ products: mockProducts });
});

router.get('/:id', (req, res) => {
    const product = mockProducts.find(p => p._id === req.params.id);
    if (product) {
       res.json({ product });
    } else {
       res.status(404).json({ error: 'Product not found' });
    }
});

router.post('/', (req, res) => {
    const newProduct = {
        _id: Math.random().toString(36).substr(2, 9),
        rating: 0,
        reviews: 0,
        ...req.body
    };
    mockProducts.push(newProduct);
    res.status(201).json({ product: newProduct });
});

router.put('/:id', (req, res) => {
    const index = mockProducts.findIndex(p => p._id === req.params.id);
    if (index !== -1) {
        mockProducts[index] = { ...mockProducts[index], ...req.body };
        res.json({ product: mockProducts[index] });
    } else {
        res.status(404).json({ error: 'Product not found' });
    }
});

router.delete('/:id', (req, res) => {
    mockProducts = mockProducts.filter(p => p._id !== req.params.id);
    res.json({ success: true });
});

export default router;
