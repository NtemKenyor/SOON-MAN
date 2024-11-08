const express = require('express');
const router = express.Router();
const { createToken, getTokens } = require('../controllers/tokenController');

router.post('/', createToken);  // Endpoint to create token
router.get('/', getTokens);     // Endpoint to retrieve tokens

module.exports = router;
