const express = require('express');
const cookieParser = require('cookie-parser')
const authRoutes = require('./routes/authRoutes');
const { default: mongoose } = require('mongoose');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(cookieParser())
app.use(express.json())

app.use('/auth', authRoutes);

app.get('/', (req, res) => {
  res.send('Home Page');
});

mongoose.connect('mongodb+srv://booleanbraintechnologies:UQLCbpSzxEYqxFK1@bbt0012024.zv8b9cf.mongodb.net/', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
app.listen(5000, () => {
  console.log('Server started on http://localhost:5000');
});
