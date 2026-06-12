import express from 'express';

const router = express.Router();

let mockCategories = [
  { _id: '1', name: 'Wedding', image: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&q=80&w=600', icon: '💍', count: 12 },
  { _id: '2', name: 'Birthday', image: 'https://images.unsplash.com/photo-1513201099705-a9746e1e201f?auto=format&fit=crop&q=80&w=600', icon: '🎂', count: 8 },
  { _id: '3', name: 'Luxury', image: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&q=80&w=600', icon: '🍷', count: 24 },
  { _id: '4', name: 'Florals', image: 'https://images.unsplash.com/photo-1543168256-418811576931?auto=format&fit=crop&q=80&w=600', icon: '💐', count: 15 },
];

router.get('/', (req, res) => {
    res.json({ categories: mockCategories });
});

router.post('/', (req, res) => {
    const newCategory = {
        _id: Math.random().toString(36).substr(2, 9),
        count: 0,
        ...req.body
    };
    mockCategories.push(newCategory);
    res.status(201).json({ category: newCategory });
});

router.put('/:id', (req, res) => {
    const index = mockCategories.findIndex(c => c._id === req.params.id);
    if (index !== -1) {
        mockCategories[index] = { ...mockCategories[index], ...req.body };
        res.json({ category: mockCategories[index] });
    } else {
        res.status(404).json({ error: 'Category not found' });
    }
});

router.delete('/:id', (req, res) => {
    mockCategories = mockCategories.filter(c => c._id !== req.params.id);
    res.json({ success: true });
});

export default router;
