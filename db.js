const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/sbps_db', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
