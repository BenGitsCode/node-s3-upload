'use strict'

// This loads the env variables to a process.env object
require('dotenv').load()

// require fs module
const fs = require('fs')

// require aws-sdk module
const AWS = require('aws-sdk')

// create a new instance of AWS.S3 object
const s3 = new AWS.S3()

// testing that dotenv module works and loads bucket name
console.log('bucket to be uploaded to is ' + process.env.AWS_S3_BUCKET_NAME)
// script should accept file as 2nd argument
// print to make sure it does
console.log('File to be uploaded ', process.argv[2])

const file = {
  path: process.argv[2],
  name: process.argv[3],
  bucket: process.env.AWS_S3_BUCKET_NAME
}

const s3Upload = function (options) {
  // use node fs module to create a read stream
  // for our image file
  // https://www.sitepoint.com/basics-node-js-streams/
  const stream = fs.createReadStream(options.path)

  console.log('Stream is: ', stream)

  const params = {
    ACL: 'public-read',
    Bucket: options.bucket,
    Body: stream,
    Key: options.name || 'default_name'
  }

  // return a promise object that is resolved or rejected,
  // based on the response from s3.upload
  return new Promise((resolve, reject) => {
    // attempt s3.upload knowing it will fail to ensure the
    // module is required correctly
    s3.upload(params, function (error, data) {
      if (error) {
        reject(error)
      } else {
        resolve(data)
      }
    })
  })
}

// pass file to s3.Upload and begin promise chain
s3Upload(file)
 // .then((s3response) => console.log(s3response))
 .then(console.log)
 // .catch((error) => console.error(error))
 .catch(console.error)
