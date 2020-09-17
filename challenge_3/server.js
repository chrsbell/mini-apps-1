const express = require('express');
const path = require('path');
const app = express();
const session = require('cookie-session');
const db = require('./db.js');

const port = 3000;
const router = express.Router();

// open connection to database
db.connect();

// make sure to use json parser before using router
app.use(express.json());

app.use(router);

// make a new session for each user
app.use(session({
  name: 'sessionId',
  secret: Math.random().toString().slice(2, -1),
  maxAge: 60 * 60 * 1000 // 1 hour
}));

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});

// send page index
router.get('/', (req, res, next) => {
  let index = path.join(__dirname, '/public/index.html');
  res.status(200).sendFile(index);
});

// send app
router.get('/app.js', (req, res) => {
  res.status(200).sendFile(path.join(__dirname, '/compiled/client/app.js'));
});

router.post('/submit', (req, res) => {
  // update the database, then send response
  db.update(req.headers.cookie, req.body)
  .then(() => {
    res.sendStatus(201);
  });
});

process.on('SIGINT', function() {
  console.log(`\nClosing connection...`);
  db.close()
  .then(() => {
    process.exit();
  });
});