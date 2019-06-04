const express = require('express');
const router = express.Router();

router.get('/facebook', (req, res) => {
    res.send('Facebook Callback for Webhook.');
});

module.exports = router;