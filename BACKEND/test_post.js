const axios = require('axios');
const API = 'http://localhost:5000/api/products';
const testProduct = {
    name: 'Test Product ' + Date.now(),
    description: 'Test Desc',
    price: 99,
    imageUrl: 'https://example.com/test.jpg',
    category: 'Test'
};

axios.post(API, testProduct)
    .then(res => console.log('Success:', res.data))
    .catch(err => {
        console.error('Error Status:', err.response?.status);
        console.error('Error Data:', err.response?.data);
        console.error('Error Message:', err.message);
    });
