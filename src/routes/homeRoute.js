import express from 'express';
// initializing express router
const homeRouter = express.Router();

homeRouter.get('/home', (req, res, next)=>{
    // console.log('home: '+req.user);
    res.render('home', {user: req.user});
});

export default homeRouter;