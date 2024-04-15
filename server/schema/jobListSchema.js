
const gql = require ('graphql-tag')

const typeDefs_jobList = gql  `


    type JobName {
        jobName: String!
    }
    type JobType {
        jobType : String
        jobName : [JobName]

    }
    input JobNameInput{
        jobName : String

    }
    input JobTypeInput {
        jobType : String
        jobName : [JobNameInput]
    }

    type Query {
        ShowJobName : [JobName]
        ShowJobType : [JobType]
    }

    type Mutation {
        createJobName (input : JobNameInput) : JobName
        createJobType (input : JobTypeInput) : JobType
 

    }


`
module.exports = typeDefs_jobList