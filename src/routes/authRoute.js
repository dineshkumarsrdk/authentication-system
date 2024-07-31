import express from 'express';
import passport from 'passport';
import bcrypt from 'bcrypt';
import otpGenerator from 'otp-generator';

import { userLocalModel } from '../model/userLocalModel.js';
import { verificationCodeModel } from '../model/verificationCodeModel.js';
import sendVerificationMail from '../../utils/sendVerificationMail.js';

// initializing express router
const authRouter = express.Router();

// render signin page
authRouter.get('/signin', (req, res, next) => {
    // const message = req.flash();
    res.render('signin', { user: req.user, message: req.flash('errorMessage') });
});

// to signin a user
authRouter.post('/signin',
    passport.authenticate('local', {
        successRedirect: "/home",
        failureRedirect: "/auth/signin",
        failureFlash: true // Enabling flash messages to pass alerts to client(need to setup connect-flash middleware)
    })
);
// authRouter.post('/signin', (req, res)=>{
//     console.log(req.body);
//     res.send(req.body);
// });

// render signup page
authRouter.get('/signup', (req, res, next) => {
    res.render('signup', { user: req.user });
});

// to sign up new user
authRouter.post('/signup', async (req, res, next) => {
    try {
        // create a new user in db
        const { username, email, password } = req.body;
        // checking if the user already exists
        const existingUser = await userLocalModel.findOne({ email: email });
        if (existingUser) {
            // alert the user if already exists and redirect
            const message = 'User already exists, please sign in!'
            res.redirect('/auth/signin');
        } else {
            // password encryption
            const hashedPassword = await bcrypt.hash(password, 10);
            // create a new user
            const newUser = new userLocalModel({ username, email, password: hashedPassword });
            await newUser.save();
            res.redirect('/auth/signin');
        }
    } catch (error) {
        next(error);
    }
});

authRouter.get('/signout', authCheck, (req, res, next) => {
    req.logout((err) => {
        if (err) {
            next(err);
        }
        res.redirect('/home');
    });
});

// render change password page
authRouter.get('/change-password', authCheck, (req, res, next) => {
    res.render('changePassword', { user: req.user });
});

// to change the password
authRouter.post('/change-password', authCheck, async (req, res, next) => {
    try {
        const newPassword = req.body.newPassword;
        const email = req?.user?.email || req?.cookies?.email; // optional chaining is used here, OR returns first truthy value
        const user = await userLocalModel.findOne({ email: email });
        if (user) {
            const hashedPassword = await bcrypt.hash(newPassword, 10);
            user.password = hashedPassword;
            await user.save();
        }
        res.redirect('/auth/signin');
    } catch (error) {
        next(error);
    }
});

// render forgot password page
authRouter.get('/forgot-password', (req, res, next) => {
    res.render('forgotPassword', { user: req.user, isValidEmail: true });
});

// to reset password via forgot password using email OTP
authRouter.post('/forgot-password', async (req, res, next) => {
    try {
        const email = req.body.email;
        // checking if the user-provided email is valid
        const user = await userLocalModel.findOne({ email: email });
        if (user) {
            // generating verification code for password reset
            const code = otpGenerator.generate(6, { upperCaseAlphabets: false, specialChars: false });
            // send the code on email and save to the database
            await sendVerificationMail(email, code, next);
            const verificationCode = new verificationCodeModel({ email, code });
            await verificationCode.save();
            // setting res cookie for email
            res.cookie('email', email, { maxAge: 3 * 60 * 1000, httpOnly: true });
            return res.render('verifyCode', { user: req.user, isCodeVerified: true });
        } else {
            return res.render('forgotPassword', { user: req.user, isValidEmail: false });
        }
    } catch (error) {
        return next(error);
    }
});


// to verify code for forgot password
authRouter.post('/forgot-password/verifyCode', async (req, res, next) => {
    try {
        // code entered by user
        const code = req.body.code;
        const email = req.cookies.email;
        // retrieve the original code from db
        const verificationCode = await verificationCodeModel.findOne({ email: email });
        if (code === verificationCode.code) {
            // res.render('changePassword', { user: req.user });
            res.redirect('/auth/change-password');
        } else {
            res.render('verifyCode', { user: req.user, isCodeVerified: false });
        }
    } catch (error) {
        next(error);
    }
});

// auth check middleware
function authCheck(req, res, next) {
    // if the user is authenticated
    if (req.user) {
        return next();
    }
    // if the request is redirected from /auth/forgot-password
    if (req.get('referrer') && (req.get('referrer').includes('/auth/forgot-password') || req.get('referrer').includes('/auth/change-password'))) {
        return next();
    }
    // redirect to the sign-in page
    res.redirect('/auth/signin');
}

// google oauth routes
authRouter.get('/oauth2-google', passport.authenticate('google', {
    scope: ['profile', 'email']
}));

// google redirect url after auth and to retrieve profile info
authRouter.get('/oauth2-google/redirect', passport.authenticate( 'google', {
    successRedirect: '/home',
    failureRedirect: '/auth/oauth2-google'
})
);

export default authRouter;