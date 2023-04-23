const path = require('path'),
  PORT = process.env.PORT || 3500,
  express = require('express'),
  app = express();

// Route
app.get('^/$|/index(.html)?', (_, res) => {
  // res.sendFile('./views/index.html', { root: __dirname });
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.get('/new-page(.html)?', (_, res) => {
  res.sendFile(path.join(__dirname, 'views', 'new-page.html'));
});

app.get('/old-page(.html)?', (_, res) => {
  res.redirect(301, '/new-page.html'); // 302 by default
});

//Route Handlers

app.get(
  '/hello(.html)?',
  (req, res, next) => {
    console.log(`attempted to load hello.html`);
    next();
  },
  (req, res) => {
    res.send('Hello World');
  }
);

// chaining route handlers

const one = (req, res, next) => {
  console.log('one');
  next();
};

const two = (req, res, next) => {
  console.log('two');
  next();
};

const three = (req, res, next) => {
  console.log('three');
  res.send('Finished!');
};

app.get('/chain(.html)?', [one, two, three]);

app.get('/*', (_, res) => {
  res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
});

app.listen(PORT, () => {
  console.log(`Listening to port ${PORT}`);
});