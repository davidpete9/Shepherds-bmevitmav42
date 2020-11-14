const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/gvj529', { useNewUrlParser: true,  useUnifiedTopology: true  });

module.exports = mongoose;
