

const JobData = require('../models/jobRegistion/JobData')
const Account = require('../models/account/AccountRegister')
const JobListData = require ('../models/jobList/jobNameListData')

const mongoDataMethod  = {
    getUserName : async id => await  Account.findById(id),

    getAllUser : async (condition = null)=> condition === null ? await Account.find() : await Account.find(condition),

    getJobbyName : async Job => await JobData.findOne({ Job: " " }),

    getAllJob : async (condition = null)=> condition === null ? await JobData.find() : await JobData.find(condition),

    getAllJobName : async (condition = null) => condition ===null ? await  JobListData.find() : await JobListData.find(condition),

   
}


module.exports = mongoDataMethod