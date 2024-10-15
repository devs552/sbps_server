const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');



const app = express();
app.use(bodyParser.json());
app.use(cors());

// Set up MongoDB connection and user routes here
mongoose.connect('mongodb+srv://admin1:admin2@cluster0.ru3opcr.mongodb.net/', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

  const apiRouter = require('./routes/register');
app.use('/register',apiRouter)
const login = require('./routes/login');
app.use('/login',login)
const contest = require('.//routes/contest');
app.use('/contest', contest)




const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
