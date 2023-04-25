const express = require('express'),
  router = express.Router(),
  path = require('path');

// Route
router.get('^/$|/index(.html)?', (_, res) => {
  res.sendFile(path.join(__dirname, '..', 'views', 'index.html'));
});

router.get('/new-page(.html)?', (_, res) => {
  res.sendFile(path.join(__dirname, '..', 'views', 'new-page.html'));
});

router.get('/old-page(.html)?', (_, res) => {
  res.redirect(301, '/new-page.html'); // 302 by default
});

module.exports = router;
