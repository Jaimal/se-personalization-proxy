const express = require("express");
const request = require("request");
const bodyParser = require('body-parser')
const url = require('url');

require("dotenv").config();

const app = express();
const port = process.env.PORT || 3001;

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, PUT, PATCH, POST, DELETE");
  res.header("Access-Control-Allow-Headers", req.header('access-control-request-headers'));
  next();
});

app.get("*", (req, res) => {
  const urlPathName = url.parse(req.url,true).pathname;
  const PersonasURL = 'https://profiles.segment.com' + urlPathName;

  request({ url: PersonasURL, method: req.method, json: req.body, headers: {'Authorization': req.headers["authorization"]} },
      function (error, response, body) {
          //console.log("Headers: "+req.headers["authorization"]);
          //console.log("URL: "+PersonasURL)
          if (error) {
              console.error('error: ' + response.statusCode)
          }
      }).pipe(res);
  //request(PersonasURL).pipe(res);
});

app.listen(port, () =>
  console.log(`SE Personalization Proxy app listening on port ${port}!`)
);
