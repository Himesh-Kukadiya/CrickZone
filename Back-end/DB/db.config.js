const mongoose = require('mongoose'); // mongoose for curd with mongodb it allows to connect with mongodb

// connection function for connect with mongodb
async function connection() {
    // wait for connect
    await mongoose.connect('mongodb://127.0.0.1:27017/CrickZone');
    // after connection get message
    console.log("We are Connected");
}
// calling function to make connection.
connection();