[![General Assembly Logo](https://camo.githubusercontent.com/1a91b05b8f4d44b5bbfb83abac2b0996d8e26c92/687474703a2f2f692e696d6775722e636f6d2f6b6538555354712e706e67)](https://generalassemb.ly/education/web-development-immersive)

# File upload with express and AWS S3

## Prerequisites

-   [aws-s3-setup-guide](https://github.com/ga-wdi-boston/aws-s3-setup-guide)
-   [node-api](https://github.com/ga-wdi-boston/node-api)

## Objectives

By the end of this, developers should be able to:

-   Upload files to AWS S3 from a node application.
-   Create path names with a low chance of duplication

## Preparation

1.  [Fork and clone](https://github.com/ga-wdi-boston/meta/wiki/ForkAndClone)
    this repository.
1.  Create a new branch, `training`, for your work.
1.  Install dependencies with `npm install`.

## Introduction

Adding a full feature to a web API can feel formidable.

We'll take a stepped approach to implementing an image upload feature.

Hard problems are hard.  We'll work to find and solve an easier problem first.

## Discussion

What are the parts of file upload?  What are the issues to guard against?

### Node packages checklist

We'll use the following node modules as we build out this feature:

-   [ ] `fs`
-   [ ] `aws-sdk`
-   [ ] `dotenv`
-   [ ] `mime`
-   [ ] `crypto`
-   [ ] `body-parser`

The node package `file-type` night be more appropriate for getting a content
type, but `mime` is sufficient for the command line portion of our feature
build.  When we start handling uploads through `multer`, we'll see that we get
file information from it.

## Structure

We'll investigate, code, refactor, and integrate all the parts of file upload.

## Uploading files to AWS from node

We'll build a command line script in `express-multer-api` to upload a file to
 AWS.

Why build a command line uploader?

We'll use [AWS.S3](http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/S3.html),
 specifically the [upload](http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/S3.html#upload-property)
 method, to send files to AWS S3.

Refactoring is a skill to cultivate.

Let's separate out the parts that aren't about a command line script so we can
 reuse them.

## Code-Along: Create a Command-Line Script for AWS Upload

We'll start by creating a script in `bin/aws-3-upload` to start building out our
feature.

We'll run the script using `node bin/aws-s3-upload <file> [comment]`.

In order to pull in the `aws-sdk` so that we can use this package we need to
run the command:

```bash
npm install --save aws-sdk
```

We'll need to install a few more packages this way as we continue developing,
but let's get crackin with a node script first...

## Code-Along: Add Secrets, and Update .gitignore

IMPORTANT!!! DO NOT GO AHEAD OR OVERLOOK THIS STEP! It may cost you thousands of
 dollars if you do! *You have been warned.*

Create a .env file `touch .env` and put your `credentials.csv` from [aws-s3-setup-guide](https://github.com/ga-wdi-boston/aws-s3-setup-guide) inside.

Type `git status`. Notice `.env` show up? STOP! BAD! Add a line to your
`.gitignore` file so that git stops tracking this file.

```diff
# Created by https://www.gitignore.io/api/macos,linux
+ .env
```

This will prevent our `.env` file from being committed and from being pushed to
github. Type `git status` again and make sure `.env` no longer shows up.

## Uploading files to AWS via multer and express

Now that we have our code a place that it is "doing the thing" let's look into
adding it to an express-api.

## Uploading files to an echo server from an html form

We'll use the `index.html` to start file uploads.

We'll use the form attribute `enctype="multipart/form-data"` to allow uploading
 of one or more files.

We'll use `FormData` and `$.ajax` to POST data to an echo server,
 `http://httpbin.org`.

Later we'll use this client to POST data to `express-multer-api`.

## [License](LICENSE)

1.  All content is licensed under a CC­BY­NC­SA 4.0 license.
1.  All software code is licensed under GNU GPLv3. For commercial use or
    alternative licensing, please contact legal@ga.co.
