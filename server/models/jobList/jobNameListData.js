// jobModel.js

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const jobName = new Schema({
  jobName: String
});



module.exports = mongoose.model('JobName', jobName);
