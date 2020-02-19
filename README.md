# lambda functions
# hoteliers-sendgrid-api-service
This Lambda gets triggered by sendgrid email send API

# hoteliers-mailgun-api-service
This Lambda gets triggered by mailgun email send API

# API endpoints:
  POST - https://luja970or2.execute-api.ap-southeast-2.amazonaws.com/dev/sendgrid

  POST - https://luja970or2.execute-api.ap-southeast-2.amazonaws.com/dev/mailgun

# payload (body)
{ 
    "to": "test@test.com", 
    "from": "test@test.com", 
    "subject": "This is test message", 
    "text": "Hello, World"
}
## How to run locally
To test the lambda function locally, you can use [lambda-local](https://www.npmjs.com/package/lambda-local).

> $ npm install -g lambda-local<br>
> $ lambda-local -l index.js -h emailhandlesendgrid -e { "to": "test@test.com", "from": "test@test.com", "subject": "This is test message", "text": "Hello, World"} empty-event.json -t 10

> $ lambda-local -l index.js -h emailhandlemailgun -e { "to": "test@test.com", "from": "test@test.com", "subject": "This is test message", "text": "Hello, World"} empty-event.json -t 10

#### Debugging
We can use the launch configuration given in launch.json for debugging in [VS Code](http://code.visualstudio.com/docs/editor/debugging).

### Node Version
Node.js version 10.15.3 is used for this project because this version of node supported by AWS Lambda. 

### Development Tools and architecture
I used visual studio code for the development environment and  nodejs V10.15.3.
I deployed the code in AWS. I have created two separate lambda functions and the lambdas are triggered by API which is configured in AWS API Gateway. I used Serverless framework  to automate the deployment.

### Style Guide
Followed the google styleguides for [javascript](https://google.github.io/styleguide/jsguide.html) and [html](https://google.github.io/styleguide/htmlcssguide.html)

#### Indentation
Used two spaces for indentation instead of tabs in all javascript, css, html and json files. (vs code default indentation)

#### File naming conventions
Used lower case file names, with hyphens separating words.
For example:
index.js, email-handler.js

