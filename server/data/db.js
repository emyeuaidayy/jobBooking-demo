

const Job = require('../models/jobRegistion/JobData')
const Account = require('../models/account/AccountRegister')
const JobData = require('../models/jobList/JobData')



const mongoDataMethod  = {
    getUserName : async id => await  Account.findById(id),

    getAllUser : async (condition = null)=> condition === null ? await Account.find() : await Account.find(condition),

    getJobbyName : async JobName => await Job.find({ JobName : JobName ,status : "available"}),

    getJobBookedbyName : async customerId => await Job.find({ customerId : customerId ,status : "unavailable"}),

    getYourJob : async userId => await Job.find({ userId : userId }),

    getJobNameType : async JobType => await Job.find ({JobType : JobName}),

    getAllJob : async (condition = null)=> condition === null ? await Job.find() : await Job.find(condition),

    getJobbyID : async id => await JobData.findById(id),

    getJobbyJobType : async JobType => await JobType.find({JobType : JobType}),



    
   
}


module.exports = mongoDataMethod