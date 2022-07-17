const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = require('./app');

dotenv.config({ path: './config.env' });

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => {
    //console.log(con.connections);
    console.log('DB Connection Successful');
  });

//console.log(app.get('env'));
// environment variables by node.js
//console.log(process.env);

// testTour
//   .save()
//   .then((doc) => {
//     console.log(doc);
//   })
//   .catch((err) => {
//     console.log('ERROR : ', err);
//   });

const port = process.env.NODE_PORT || 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
