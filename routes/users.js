const express = require('express')
const passport = require('passport')
const router = express.Router()
const catchAsync = require('../utils/catchAsync')
const users = require('../controllers/users')
const { storeReturnTo } = require('../middleware');


router.route('/register')
    //routes rendering page for a new user
    .get(users.renderRegister)
    //route for registering a new user
    .post(catchAsync(users.register))

router.route('/login')
    //login render for user
    .get(users.renderLogin)
    //login route for user
    .post(storeReturnTo, passport.authenticate('local', { failureFlash: true, failureRedirect: '/login'}), users.login)

//logout route for user
router.get('/logout', users.logout)

module.exports = router