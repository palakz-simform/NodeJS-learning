const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });
const app = require('./app');

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD,
);
mongoose
  .connect(DB, {
    useNewUrlParser: true,
  })
  .then(() => console.log('DB connection successfull'));

const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log('App running on port ', port);
});

process.on('unhandledRejection', (err) => {
  console.log(err.name, err.messages);
  console.log('UNHANDLED REJECTION! Shutting Down');
  server.close(()=>{
    process.exit(1);
  })
});
// test
