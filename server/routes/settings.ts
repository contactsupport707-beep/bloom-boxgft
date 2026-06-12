import express from 'express';

const router = express.Router();

let settings = {
  payment: {
    upiId: 'bloomandbox@ybl',
    qrCodeImage: '' 
  },
  whatsapp: {
    number: '+919876543210',
    enabled: true
  }
};

router.get('/', (req, res) => {
    res.json(settings);
});

router.put('/payment', (req, res) => {
    settings.payment = { ...settings.payment, ...req.body };
    res.json({ success: true, payment: settings.payment });
});

router.put('/whatsapp', (req, res) => {
    settings.whatsapp = { ...settings.whatsapp, ...req.body };
    res.json({ success: true, whatsapp: settings.whatsapp });
});

export default router;
