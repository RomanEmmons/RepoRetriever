const express = require('express');
let app = express();
const { getReposByUsername } = require('../helpers/github.js');
const bodyParser = require('body-parser');
const { save, top25 } = require('../database/index.js');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static(__dirname + '/../client/dist'));

app.post('/repos', function (req, res) {
  // TODO - your code here!
  // This route should take the github username provided
  // and get the repo information from the github API, then
  // save the repo information in the database
  console.log('req.body', req.body);
  let userName = req.body.name;

  getReposByUsername(userName, (err, res) => {
    //console.log('res', res);
    save(JSON.parse(res));
  });

  res.end('recieved!');
});

app.get('/repos', function (req, res) {
  console.log('ajaxd');
  // TODO - your code here!
  // This route should send back the top 25 repos
  top25((err, docs) => {
    if (err) {
      res.send(404);
    }
    console.log('docs on server side', docs);
    res.send(docs);
  });
});

let port = 1128;

app.listen(port, function () {
  console.log(`listening on port ${port}`);
});
