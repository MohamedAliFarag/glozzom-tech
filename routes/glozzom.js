const express = require('express')
const router = express.Router()
//validator
const { check, body } = require('express-validator');


//controllers
const glozzomController = require('../controllers/home')

//Routes

//Index ::GET
router.get('/',glozzomController.indexGet)

//Index ::POST
router.post('/',
[
    check('name','Please Enter A Valid Name').not().isEmpty().isAlpha(),
    check('email','Please Enter A Valid Email').not().isEmpty().isEmail().normalizeEmail({gmail_remove_dots: false})
]
,glozzomController.postNews)

//About ::GET
router.get('/about',glozzomController.getAbout)

//Services ::GET
router.get('/services',glozzomController.getServices)

//Blog ::GET
router.get('/blog',glozzomController.getBlog)

//Contact ::GET
router.get('/contact',glozzomController.getContact)

router.post('/contact',[
    check('firstName','Enter first Name At Least 3 Char & Char Only').not().isEmpty().isAlpha().isLength({min:3}),
    check('lastName','Enter Last Name At Least 3 Char & Char Only').not().isEmpty().isAlpha().isLength({min:3}),
    check('email','Enter Valid Email').not().isEmpty().isEmail().normalizeEmail({gmail_remove_dots: false}),
    check('phoneNumber','Numbers Only & At Least 11 Number').not().isEmpty().isNumeric().isInt().isMobilePhone().isLength({min:11}),
    check('message','Message Min 5 charctares & Max 300').not().isEmpty().isLength({max:300})
]
,glozzomController.postContact)
module.exports = router