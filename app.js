const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

// Middleware to check working hours
function workingHoursMiddleware(req, res, next) {
  const date = new Date();
  const day = date.getDay();
  const hour = date.getHours();
  if (day >= 1 && day <= 5 && hour >= 9 && hour < 17) {
    next();
  } else {
    res.send("Our website is only available Monday to Friday from 9 to 17.");
  }
}

// Apply middleware
app.use(workingHoursMiddleware);

// Set view engine
app.set('view engine', 'ejs');

// Static files
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.get('/', (req, res) => {
  res.render('home');
});

app.get('/services', (req, res) => {
  res.render('services');
});

app.get('/contact', (req, res) => {
  res.render('contact');
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
