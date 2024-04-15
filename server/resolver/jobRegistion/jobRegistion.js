const mongoDataMethod = require('../../data/db');
const UserData = require ('../../models/Jobs/JobData');
const typeDefs_account = require('../../schema/Accountschema');

const user_resolvers =  {

    Query : {
        Jobs : async (parent, args, { mongoDataMethods }) =>   await mongoDataMethod.getAllJob(),

        getJobbyName : async (parent , {Job} , {mongoDataMethods})=> await mongoDataMethod.getJobbyName(Job),
           
        
    },

    Mutation : {
        jobRegistion : async (parents , args ,context , infor ) =>{
           const  newJob= new UserData ({
                Job : args.input.Job ,
                JobType : args.input.JobType ,
                price : args.input.price ,
                jobDecription : args.input.jobDecription,
                userId : args.input.userId,
            });
            return await newJob.save();
        }
    }

}
module.exports= user_resolvers;