const express = require('express');
const router = express.Router();


router.post('/', (req, res) => {

  res.send('Order placed successfully!');
});

module.exports = router;
