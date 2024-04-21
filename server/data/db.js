

const Job = require('../models/jobRegistion/JobData')
const Account = require('../models/account/AccountRegister')
const JobData = require('../models/jobList/JobData')



const mongoDataMethod  = {
    getUserName : async id => await  Account.findById(id),

    getAllUser : async (condition = null)=> condition === null ? await Account.find() : await Account.find(condition),

    getJobbyName : async JobName => await Job.findOne({ JobName}),

    getJobNameType : async JobType => await Job.findOne ({JobType}),

    getAllJob : async (condition = null)=> condition === null ? await Job.find() : await Job.find(condition),

    getJobbyID : async id => await JobData.findById(id)

    
    
   
}


module.exports = mongoDataMethod