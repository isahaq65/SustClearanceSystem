const { connect, set } = require("mongoose");
set("strictQuery", false);
connect(process.env.DB_URL, (error, success) => {
  if (error) {
    console.log("DB connection failed");
  }
  if (success) {
    console.log("DB connection successful");
  }
});

// const dotenv = require('dotenv');

// //const { response } = require('express');
// // const express = require('express');
// const mongoose = require('mongoose');

// mongoose.connection.on('error', (err)=> {
//     console.log(err);
// });

// mongoose.connection.once('open', () => {
//     console.log('Database Connection Established');
// });

// mongoose.connect("mongodb+srv://admin:lg6SjMZDJzogmAxr@cluster0.lhwrgxf.mongodb.net/?retryWrites=true&w=majority",{
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//     })
//    .then(() => console.log('connection successful'))
//    .catch((err) => console.log(err));
