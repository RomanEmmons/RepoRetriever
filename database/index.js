const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/retriever', { useNewUrlParser: true });
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  // we're connected!
  console.log('db connected!');
});

let repoSchema = mongoose.Schema({
  // TODO: your schema here!
  repoName: { type: String, unique: true, dropDups: true },
  userName: String,
  gitUrl: String,
  createdOn: Date,
  stars: Number,
  forks: Number,
  watchers: Number,
});

let Repo = mongoose.model('Repo', repoSchema);

let save = (reposArr) => {
  // TODO: Your code here
  // This function should save a repo or repos to
  // the MongoDB
  console.log('reposArr', reposArr[0]);
  reposArr.forEach((repo, i) => {
    repo = new Repo({
      repoName: repo.name,
      userName: repo.owner.login,
      gitUrl: repo.html_url,
      createdOn: repo.created_at,
      stars: repo.stargazers_count,
      forks: repo.forks_count,
      watchers: repo.watchers,
    });
    console.log('repo from forEach', repo);
    let query = { repoName: repo.name };
    Repo.findOneAndUpdate(query, repo, { upsert: true }, function (err, doc) {
      if (err) {
        console.log('error from save', err);
      }
      console.log('saved from save function');
    });
  });
};

let top25 = (callback) => {
  Repo.find({})
    .sort({ forks: -1 })
    .limit(25)
    .lean()
    .then((results) => {
      //console.log('result from top25', results);
      // let storeArr = [];
      // results.forEach(result => {
      //   //console.log('result', result._doc);
      //   storeArr.push(result._doc);
      // });
      // //console.log('storeArr', storeArr);
      callback(null, results);
    });

  // (err, doc) => {
  //       if (err) {
  //         console.log('err', err);
  //       } else {
  //         //console.log('doc', doc);
  //         callback(null, doc);
  //       }
  //     }
  // Repo.find({}, (err, doc) => {
  //   if (err) {
  //     console.log('err', err);
  //   } else {
  //     //console.log('doc', doc);
  //     callback(null, doc);
  //   }
  // });
};

module.exports = { save, top25 };
