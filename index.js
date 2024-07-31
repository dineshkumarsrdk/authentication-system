// importing required dependencies
import express from 'express';
import expressEjsLayouts from 'express-ejs-layouts';
import session from 'express-session';
import dotenv from 'dotenv';
import path from 'path';
import passport from 'passport';
import flash from 'connect-flash';
import cookieParser from 'cookie-parser';

import { connectToMongoDB } from './config/mongodbConfig.js';
import homeRouter from './src/routes/homeRoute.js';
import authRouter from './src/routes/authRoute.js';
import './config/passportLocalConfig.js';

// configuring dotenv
dotenv.config(); 
const port = process.env.PORT || 3000;
// initializing express app
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
// setting up ejs view engine
app.set('view engine', 'ejs');
app.set('views', path.join(path.resolve(), 'src', 'views'));
app.use(expressEjsLayouts);
// initializing static files
app.use(express.static(path.join(path.resolve(), 'public')));
// initializing express session middleware
app.use(session({
    secret: 'agfd76257agsdf90',
    resave: false,
    saveUninitialized: false,
    cookie: {secure: false}
}));
// initializing passport on every route
app.use(passport.initialize());
// allow passport to use express-session
app.use(passport.session()); 
// to use flash messages from passport
app.use(flash());
// routes
app.use('/', homeRouter);
app.use('/auth', authRouter);

// error handler middleware
app.use((err, req, res, next)=>{
    if(err){
        console.log(err);
        res.render('error-page');
    }
});

app.listen(port, ()=>{
    console.log('Server is listening on port: '+port);
    connectToMongoDB();
})