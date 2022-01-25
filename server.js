const express = require('express');
const app = express();

const helmet = require('helmet');
const compression = require('compression');
app.use(helmet());

app.use(compression());
const routes = require('./routes/plug');
const mongoose = require('mongoose');
var bodyparser = require('body-parser');
app.use(express.json());
require('dotenv').config()
app.use('/', routes);
app.route('/')
  .get(function (req, res) {
    res.sendFile(process.cwd() + '/index.html');
});


mongoose.connect(
    process.env.MONGODB_URI,
    {
      
      //server: { socketOptions: { keepAlive: 300000, connectTimeoutMS: 30000 } },
      //replset: { socketOptions: { keepAlive: 300000, connectTimeoutMS: 30000 } },
    },
    function (err) {
      if (err) return console.log("Error: ", err);
      console.log(
        "MongoDB Connection -- Ready state is:",
        mongoose.connection.readyState
      );
    }
  );
  
app.use(bodyparser.json);
const listener = app.listen(process.env.PORT || 5000, () => {
    console.log('Your app is listening on port ' + listener.address().port)
});
