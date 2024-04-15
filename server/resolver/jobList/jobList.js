const mongoDataMethod = require('../../data/db');
const jobListData = require ('../../models/jobList/jobNameListData');
const { Query } = require('../jobRegistion/jobRegistion');

const jobList_resolvers = {
    
    Query : {

    },


    Mutation : {
        createJobName : async (parent , args ,context , infor ) => {
            console.log (args) ;
            const newJobName = new jobListData ({
                jobName : args.input.jobName ,
            });
            return await newJobName.save()
        }
    }
}

module.exports = jobList_resolvers