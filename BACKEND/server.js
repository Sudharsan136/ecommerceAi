const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware — allow all origins (safe for hobby/free-tier projects)
app.use(cors({ origin: true, credentials: true }));
app.use(express.json());

// MongoDB Connection — trim to remove any accidental whitespace/newlines from env vars
const mongoUri = (process.env.MONGO_URI || 'mongodb://localhost:27017/ecommerce').trim();
console.log('Connecting to MongoDB, URI starts with:', mongoUri.substring(0, 20) + '...');
mongoose.connect(mongoUri)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Could not connect to MongoDB', err));

// Routes
const productRoutes = require('./routes/productRoutes');
const paymentRoutes = require('./routes/paymentRoutes');
app.use('/api/products', productRoutes);
app.use('/api/payments', paymentRoutes);

app.get('/', (req, res) => {
    res.send('Ecommerce API is running...');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
