import express from 'express';
import jwt from 'jsonwebtoken';

const router = express.Router();

router.post('/register', (req, res) => {
    // Mock registration
    res.json({ message: 'User registered successfully (Mock)', user: { id: "123", name: req.body.name, email: req.body.email } });
});

router.post('/login', (req, res) => {
    // Mock login
    res.json({ token: 'mock-jwt-token', user: { id: "123", name: req.body.email?.split('@')[0] || 'User', email: req.body.email } });
});

router.post('/admin-login', (req, res) => {
    const { username, password } = req.body;
    if (username === 'admin' && password === 'Ram8561@') {
        const token = jwt.sign({ role: 'admin' }, process.env.JWT_SECRET || 'super-secret-jwt-key', { expiresIn: '1d' });
        res.json({ success: true, token });
    } else {
        res.status(401).json({ success: false, message: 'Invalid admin credentials' });
    }
});

export default router;
