const express = require('express');
const bodyParser = require('body-parser');
const api = require('./api');
const cors = require('cors');
 
const port = 5000;
const app = express();

const corsOptions ={
    origin:'https://techdiggdevelopment.com', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}
 
app.listen(port, function () {
    console.log("Server is listening at port:" + port);
});
 
app.use(cors(corsOptions));

// Parses the text as url encoded data
app.use(bodyParser.urlencoded({ extended: true }));
 
// Parses the text as json
app.use(bodyParser.json());
 
app.use('/api', api);
