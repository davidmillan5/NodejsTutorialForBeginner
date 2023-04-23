const path = require('path'),
  { logger } = require('./middleware/logEvents'),
  errorHandler = require('./middleware/errorHandler'),
  PORT = process.env.PORT || 3500,
  express = require('express'),
  app = express(),
  cors = require('cors');

// Custom Middleware Logger

app.use(logger);

//apply cors - Cross Origin Resource Sharing
const whitelist = [
  'https://www.yoursite.com',
  'http://127.0.0.1:5500',
  'http://localhost:3500/',
];

const corsOptions = {
  origin: (origin, callback) => {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

// built-in middleware to handle urlencoded data
// in other words, form data:
// 'content-type' : application/x-www-form.urlencoded'
// is to handle url form data, when is submitted
app.use(express.urlencoded({ extended: false }));

// built-in middleware for json
app.use(express.json());

// serve static files
app.use(express.static(path.join(__dirname, '/public')));

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

// app.use('/')
app.all('*', (req, res) => {
  res.status(404);
  if (req.accepts('html')) {
    res.sendFile(path.join(__dirname, 'views', '404.html'));
  } else if (req.accepts('json')) {
    res.json({ error: '404 Not Found' });
  } else {
    res.type('txt').send('404 Not Found');
  }
});

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Listening to port ${PORT}`);
});
