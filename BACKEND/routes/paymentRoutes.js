const express = require('express');
const router = express.Router();

// Placeholder route - payment handled on frontend with demo modal
router.get('/status', (req, res) => {
    res.json({ message: 'Payment service ready' });
});

module.exports = router;
