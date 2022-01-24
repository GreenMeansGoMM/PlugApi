const express = require('express');
const app = express();
const helmet = require('helmet');
const compression = require('compression');
app.use(compression());
const routes = require('./routes/plug');
const mongoose = require('mongoose');
var bodyparser = require('body-parser');
app.use(express.json());
require('dotenv').config()
app.use('/', routes);
app.use(helmet());

mongoose.connect(
    process.env.MONGODB_URI,
    
    (err) =>{
        if (err) return console.log("Error: ", err);
        console.log("MongoDB Connection --- Ready state is:", mongoose.connection.readyState);
    }
)
app.use(bodyparser.json);
const listener = app.listen(process.env.PORT || 5000, () => {
    console.log('Your app is listening on port ' + listener.address().port)
});
