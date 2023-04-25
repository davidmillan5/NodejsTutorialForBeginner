const express = require('express'),
  router = express.Router(),
  path = require('path');

router.get('^/$|/index(.html)?', (_, res) => {
  res.sendFile(path.join(__dirname, '..', 'views', 'subdir', 'index.html'));
});

router.get('/test(.html)?', (_, res) => {
  res.sendFile(path.join(__dirname, '..', 'views', 'subdir', 'test.html'));
});

module.exports = router;
