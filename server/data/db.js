

const JobData = require('../models/Jobs/JobData')
const Account = require('../models/account/AccountRegister')

const mongoDataMethod  = {
    getUserName : async id => await  Account.findById(id),

    getAllUser : async (condition = null)=> condition === null ? await Account.find() : await Account.find(condition),

    getJobbyName : async Job => await JobData.findOne({ Job: "Job 7" }),

    getAllJob : async (condition = null)=> condition === null ? await JobData.find() : await JobData.find(condition),

   
}


module.exports = mongoDataMethod