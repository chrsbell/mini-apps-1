const { MongoClient } = require('mongodb');

const uri = 'mongodb://127.0.0.1:27017/';

const client = new MongoClient(uri, { useUnifiedTopology: true });

const _ = require('underscore');

let database = null;
let collection = null;

// connects to the database
module.exports.connect = () => {
  return client.connect()
  .then(() => {
    // access the database or create it if it doesn't already exist
      database = client.db('NotAmazon');
      console.log('Connected to database!');
      collection = database.collection('checkoutInfo');
    })
    .catch(err => {
      console.log(`Couldn't connect to database.`);
      throw err;
    });
}

// closes the database connection
module.exports.close = () => {
  return client.close()
  .then(() => {
    console.log('Closed database connection!')
  });
}

// exports a user's info in the database
module.exports.update = (cookie, userInfo) => {

  // make sure info was actually sent
  if (!userInfo) {
    return;
  }

  // update the record matching the cookie
  const filter = { session: cookie };

  // update or insert a document if it doesn't exist (table record)
  const options = { upsert: true };

  // search by cookie
  let updateDoc = {
    $set: { session: cookie }
  }

  // add user info
  _.extend(updateDoc.$set, userInfo);

  // console.log(`Cookie: ${cookie}`);
  // console.log(`User Info: ${JSON.stringify(updateDoc.$set)}`);

  return collection.updateOne(filter, updateDoc, options)
    .then((result) => {
      console.log(`${result.matchedCount} document(s) matched the filter, updated ${result.modifiedCount} document(s)`);
    });
}