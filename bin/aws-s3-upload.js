'use strict'

// require aws-sdk module
const AWS = require('aws-sdk')

// create a new instance of AWS.S3 object
const s3 = new AWS.S3()

// require fs module
const fs = require('fs')

// script should accept file as 2nd argument
// print to make sure it does
console.log('File to be uploaded ', process.argv[2])

// attempt s3.upload knowing it will fail to ensure the
// module is required correctly
s3.upload(process.argv[2])
