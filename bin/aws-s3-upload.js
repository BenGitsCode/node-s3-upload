'use strict'

require('dotenv').load()

// require aws-sdk module
const AWS = require('aws-sdk')

// create a new instance of AWS.S3 object
const s3 = new AWS.S3()

// require fs module
const fs = require('fs')

// script should accept file as 2nd argument
// print to make sure it does
console.log("file you're uploading is ", process.argv[2])

// create an object to store the values passed in by
// the user/command line
const file = {
  path: process.argv[2],
  name: process.argv[3] || 'default'
}

// use node fs module to create a read stream
// for our image file
// https://www.sitepoint.com/basics-node-js-streams/
const stream = fs.createReadStream(file.path)

// params required for `.upload` to work
// more at documentation
// https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/S3.html#upload-property
const params = {
  ACL: 'public-read',
  Bucket: process.env.AWS_S3_BUCKET_NAME,
  Key: file.name,
  Body: stream
}

// pass correct params to `.upload`
// and anonymous allback for handling response
s3.upload(params, function (error, data) {
   if (error) {
     console.error(error)
   } else {
     console.log(data)
   }
})
