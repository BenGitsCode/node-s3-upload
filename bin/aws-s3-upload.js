'use strict'

require('dotenv').load()

// require aws-sdk module
const AWS = require('aws-sdk')

// create a new instance of AWS.S3 object
const s3 = new AWS.S3()

// require fs module
const fs = require('fs')

// require mime module
const mime = require('mime')

// script should accept file as 2nd argument
// print to make sure it does
console.log("file you're uploading is ", process.argv[2])

// create an object to store the values passed in by
// the user/command line
const file = {
  path: process.argv[2],
  name: process.argv[3] || 'default'
}

// s3Upload accepts file options as a param and returns a promise,
// that resolved or rejected base on s3.upload response
const s3Upload = function (options) {

  // use node fs module to create a read stream
  // for our image file
  // https://www.sitepoint.com/basics-node-js-streams/
  const stream = fs.createReadStream(options.path)

  // use node mime module to get image mime type
  // https://www.npmjs.com/package/mime
  const contentType = mime.lookup(options.path)

  // params required for `.upload` to work
  // more at documentation
  // https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/S3.html#upload-property
  const params = {
    ACL: 'public-read',
    Bucket: process.env.AWS_S3_BUCKET_NAME,
    Key: options.name,
    Body: stream,
    ContentType: contentType
  }

  // return a promise object that is resolved or rejected,
  // based on the response from s3.upload
  return new Promise((resolve, reject) => {

    // pass correct params to `.upload`
    // and anonymous callback for handling response
    s3.upload(params, function (error, data) {

       // reject promise if error
       if (error) {
         reject(error)
       // resolve promise if no error
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
