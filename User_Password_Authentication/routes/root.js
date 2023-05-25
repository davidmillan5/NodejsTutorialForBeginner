const express = require('express'),
  router = express.Router(),
  path = require('path');

// Route
router.get('^/$|/index(.html)?', (_, res) => {
  res.sendFile(path.join(__dirname, '..', 'views', 'index.html'));
});

module.exports = router;
