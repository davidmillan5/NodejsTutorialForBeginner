const path = require('path'),
  { logger } = require('./middleware/logEvents'),
  errorHandler = require('./middleware/errorHandler'),
  PORT = process.env.PORT || 3500,
  express = require('express'),
  app = express(),
  cors = require('cors'),
  corsOptions = require('./config/corsOptions');

// Custom Middleware Logger

app.use(logger);

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

// routes
app.use('/', require('./routes/root'));
app.use('/employees', require('./routes/api/employees'));

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
