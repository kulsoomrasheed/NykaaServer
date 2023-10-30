const mongoose = require('mongoose');
 const connection = mongoose.connect(process.env.db)

 module.exports = {connection}