# User Authentication System
## _Authentication using Passport.js[OAuth2.0]_
> Please go ahead and check out the application [Authentication System](https://authentication-system-3rny.onrender.com/home)

![sample-image](/public/images/sample-image.png)

## About project

The Authentication System is built using **Node.js** for backend, **EJS** for frontend, **Passport.js** for OAuth and **Google API Services** for authentication using google account.
This project is built in a way that it can be coupled with any application for user authentication, by configuring few endpoint in this Authentication System according to the other application's needs.

## Project setup

Run the below command to clone this repository on your local machine and try it out.
```sh
git clone https://github.com/dineshkumarsrdk/authentication-system.git
```

Install the dependencies and start the server.

```sh
cd authentication-system
npm i
node index.js
```
Please remember to add the environment variables.

##### Environtment variables
- PORT = <Your port number>
- MONGODB_URL = <MongoDB Atlas URL>
- MAIL_ID = <Mail id for sending email using nodemailer>
- MAIL_PASSKEY = <Passkey for the above mail>(Need to get from google account service)
- GOOGLE_CLIENT_ID = <Client ID for OAuth>(Needs to be configured at Google console->API Services)
- GOOGLE_CLIENT_SECRET = <Client secret for OAuth>(Needs to be configured at Google console->API Services)
- GOOGLE_REDIRECT_URI = <Google redirect URI for OAuth>(Needs to be configured at Google console->API Services->OAuth credentials)

## Features

1. **Sign Up**: User can Sign Up providing their username, email and password or using their google account 
2. **Sign In**: Similarly user can Sign In using the email and password or using their google account
3. **Database**: User password will be encrypted using bcrypt and user info will be stored in MongoDB 
4. **Password reset**: Users Signed In using email and password will be able to re-set their password
5. **Forget password**: Also user can re-set their password via forgot password feature by providing their registered email and passing by providing the verification code sent to their registered email.

## Dependencies

Packages used in this application

- [Express] - framework used for node.js application
- [MongoDB](https://www.mongodb.com/docs/) - used for database
- [Mongoose](https://mongoosejs.com/docs/api/document.html) - library used for MongoDB connection
- [Passport.js](https://www.passportjs.org/docs/) - library for authentication
- [OTP-Generator](https://www.npmjs.com/package/otp-generator) - to generate code for password reset
- [Bcrypt](https://www.npmjs.com/package/bcrypt) - used for password encryption
- [Nodemailer](https://nodemailer.com/usage/) - for sending verification code on email
- [Dotenv](https://www.npmjs.com/package/dotenv) - for configuring up .env file
- [EJS](https://www.npmjs.com/package/ejs) - used as view engine

***Thank You! Have a great day!***

[//]: # (These are reference links used in the body of this note and get stripped out when the markdown processor does its job. There is no need to format nicely because it shouldn't be seen. Thanks SO - http://stackoverflow.com/questions/4823468/store-comments-in-markdown-syntax)

   [dill]: <https://github.com/joemccann/dillinger>
   [git-repo-url]: <https://github.com/joemccann/dillinger.git>
   [john gruber]: <http://daringfireball.net>
   [df1]: <http://daringfireball.net/projects/markdown/>
   [markdown-it]: <https://github.com/markdown-it/markdown-it>
   [Ace Editor]: <http://ace.ajax.org>
   [node.js]: <http://nodejs.org>
   [Twitter Bootstrap]: <http://twitter.github.com/bootstrap/>
   [jQuery]: <http://jquery.com>
   [@tjholowaychuk]: <http://twitter.com/tjholowaychuk>
   [express]: <http://expressjs.com>
   [AngularJS]: <http://angularjs.org>
   [Gulp]: <http://gulpjs.com>

   [PlDb]: <https://github.com/joemccann/dillinger/tree/master/plugins/dropbox/README.md>
   [PlGh]: <https://github.com/joemccann/dillinger/tree/master/plugins/github/README.md>
   [PlGd]: <https://github.com/joemccann/dillinger/tree/master/plugins/googledrive/README.md>
   [PlOd]: <https://github.com/joemccann/dillinger/tree/master/plugins/onedrive/README.md>
   [PlMe]: <https://github.com/joemccann/dillinger/tree/master/plugins/medium/README.md>
   [PlGa]: <https://github.com/RahulHP/dillinger/blob/master/plugins/googleanalytics/README.md>
