// importing passport.js for authentication
import passport from "passport";
import { Strategy as LocalStrategy } from 'passport-local';
import bcrypt from 'bcrypt';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import dotenv from 'dotenv';

import { userLocalModel } from "../src/model/userLocalModel.js";

// for google client secrets
dotenv.config();

// using passport local strategy to authenticate the user
passport.use('local',
    // The email and password are populated from the req.body.email and req.body.password by passport
    new LocalStrategy({usernameField: 'email', passReqToCallback: true}, async function verify(req, username, password, done) {
        // checking if the user already exists in db
        try {
            const existingUser = await userLocalModel.findOne({ email: username });
            if (existingUser) {
                const isMatch = await bcrypt.compare(password, existingUser.password);
                if (isMatch) {
                    // user obj is passed to the serializeUser to setup the session
                    return done(null, existingUser);
                } else {
                    return done(null, false, req.flash('errorMessage', 'Incorrect password'));
                }
            } else {
                // alert user doesn't exist/invalid username - flash message
                // return done(null, false, { message: 'No user with this email' });
                return done(null, false, req.flash('errorMessage', 'Invalid email'));
            }
        } catch (error) {
            return done(error);
        }
    })
);

// using google passport strategy for authenticate user using OAuth
passport.use('google', new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_REDIRECT_URI
}, async (accessToken, refreshToken, email, done) => {
    // console.log('email'+JSON.stringify(email)+'---------------end');
    // console.log('email'+email.emails[0].value+'---------------end');
    // console.log('profilename'+email.displayName+'---------------end');
    // check if user already exists in our local db
    const existingUser = await userLocalModel.findOne({googleId: email.id});
    if(existingUser) {
        return done(null, existingUser);
    } else {
        // creating new user in our local db
        const newUser = new userLocalModel(
            {username: email.displayName, email: email.emails[0].value, googleId: email.id});
        await newUser.save();
        return done(null, newUser);
    }
})
);

passport.serializeUser((user, done) => {
    // here the user obj is populated in the session using passport and express session
    // req.session.passport.user.{}
    // console.log('localser: '+user);
    done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
    // here the user data is read from the session and attached to req obj
    // req.user.{}
    try {
        const user = await userLocalModel.findById(id);
        // console.log('localdes: '+user);
        done(null, user);
    } catch (error) {
        done(error);
    }
});