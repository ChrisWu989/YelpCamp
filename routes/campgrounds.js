const express = require('express')
const multer = require('multer')
const router = express.Router()
const {storage} = require('../cloudinary')
const catchAsync = require('../utils/catchAsync')
const campgrounds = require('../controllers/campgrounds')
const {isLoggedIn, isAuthor, validateCampground} = require('../middleware.js')
const upload = multer({ storage })

router.route('/')
    //index page with route to campgrounds
    .get(catchAsync(campgrounds.index))
    //Where the form goes 
    .post(isLoggedIn, upload.array('image'), validateCampground, catchAsync(campgrounds.createCampgound))


//Route to make a new campground
router.get('/new', isLoggedIn, campgrounds.renderNewForm)

router.route('/:id')
    //details page with route to campground/id
    .get(catchAsync(campgrounds.showCampground))
    //put route where it edits the campground and returns back
    .put(isLoggedIn, isAuthor, upload.array('image'), validateCampground, catchAsync(campgrounds.updateCampground))
    //deletes a campground
    .delete(isLoggedIn, isAuthor, catchAsync(campgrounds.deleteCampground))

//edit page with route to edit each campground
router.get('/:id/edit', isLoggedIn, isAuthor, catchAsync(campgrounds.renderEditForm))

module.exports = router