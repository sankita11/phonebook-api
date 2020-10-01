const express = require('express');
const bodyParser = require('body-parser');
const ContactRouter = require("./contacts/routes/contacts.route");
const cors = require('cors');


const app = express(),
  port = process.env.PORT || 3006;

let server = app.listen(port);

//app.use(cors());

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
  res.header('Access-Control-Expose-Headers', 'Content-Length');
  res.header('Access-Control-Allow-Headers', 'Accept, Authorization, Content-Type, X-Requested-With, Range');
  if (req.method === 'OPTIONS') {
      return res.sendStatus(200);
  } else {
      return next();
  }
});

app.options('*', cors()) 


app.use(bodyParser.json());

ContactRouter.contactRoutes(app);


console.log('PhoneBook API server started on: ' + port);

module.exports = server