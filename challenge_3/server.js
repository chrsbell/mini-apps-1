const express = require('express');
const path = require('path');
const app = express();

const port = 3000;
const router = express.Router();

// make sure to use json parser before using router
app.use(express.json());

app.use(router);

// send page index
router.get('/', (req, res) => {
  let index = path.join(__dirname, '/public/index.html');
  res.status(200).sendFile(index);
});

router.post('/submit', (req, res) => {
  console.log(req.body);
  res.sendStatus(201);
})

// send app
router.get('/app.js', (req, res) => {
  res.status(200).sendFile(path.join(__dirname, '/compiled/client/app.js'));
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});