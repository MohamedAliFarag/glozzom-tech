//dotenv
require('dotenv').config()
//models
const Contact = require('../models/contact')
const Newsletter = require('../models/newsLetter')

//mailgun
var api_key = process.env.MAILGUNAPI;
var domain = process.env.MAULGUNDOMAIN;
var mailgun = require('mailgun-js')({apiKey: api_key, domain: domain});

//validation
const { check, body, validationResult} = require('express-validator')


//***********************************************************

//home ::GET
exports.indexGet = (req,res,next)=>{
    res.render('index/home',{
        pageTitle : 'Home',
        oldInput: {name:'',email:''}
    })
}

//home ::POST
exports.postNews = (req,res,next)=>{
    const name = req.body.name
    const email = req.body.email
    const newletter = new Newsletter({name:name,email:email})
    //validate Data
    const errors = validationResult(req)
        if(!errors.isEmpty()){
            return res.status(422).render('index/home',{
                pageTitle : 'Home',
                error : errors.array()[0].msg,
                oldInput : {name:name,email:email}
            })
        }
        Newsletter.findOne({email:req.body.email})
        .then(email =>{
            if(email){
                req.flash('error',"This Email is Already Registred")
                return res.redirect('/')
            }else{
            newletter.save()
            .then(letter => {
                const data = {
                    from: 'Glozzom NewsLetter <mohamedali.itc@gmail.com>',
                    to: req.body.email,
                    subject:  `${req.body.name} you now subscribed To our newsletter`,
                    text: `Congrats ${name} You Have Succesfully Registred In Our NewsLetter Services `
                  };
                  mailgun.messages().send(data, function (error, body) {
                      if(error){
                          console.log(error)
                      }else{
                    console.log(body);
                }
                  });
            req.flash('success',`Congrats  ${req.body.name} You Have Succesfully Subscribed To Our NewsLetter`)
            res.redirect('/')
            })
            }
        })
        .catch(err=>{console.log(err)}) 
}

//about ::GET
exports.getAbout = (req,res,next)=>{
    res.render('index/about',{
        pageTitle : 'About'
    })
}

//services ::GET
exports.getServices = (req,res,next)=>{
    res.render('index/services',{
        pageTitle : 'Services'
    })
}

//blog ::GET
exports.getBlog = (req,res,next)=>{
    res.render('index/blog',{
        pageTitle:'Blog'
    })
}

//contact ::GET
exports.getContact = (req,res,next)=>{
    res.render('index/contact',{
        pageTitle : 'Contact',
        oldInput : {firstName:'',lastName:'',email:'',phoneNumber:'',message:''}
    })
}

//contact ::POST
exports.postContact = (req,res,next)=>{
    const firstName = req.body.firstName
    const lastName = req.body.lastName
    const email    = req.body.email
    const phoneNumber = req.body.phoneNumber
    const message  = req.body.message
    //Validate Data
    const errors = validationResult(req);
        if (!errors.isEmpty()) {
    return res.status(422).render('index/contact',{
        pageTitle : 'Contact',
        error     : errors.array()[0].msg,
        oldInput  : {firstName:firstName,lastName:lastName,email:email,phoneNumber:phoneNumber,message:message}
    });
  }
  const contactInfo = new Contact({firstName:firstName,lastName:lastName,email:email,phoneNumber:phoneNumber,message:message}) 

    
    contactInfo.save()
    .then(contact =>{
        const data = {
            from: 'Glozzom NewsLetter <mohamedali.itc@gmail.com>',
            to: email,
            subject:  `${firstName} : Confirmation Email`,
            text: `Thank You ${firstName + lastName} For Contact Us
            We Have Recived Your Mail Succesfully
            Your Data is
            first Name : ${firstName}
            last Name : ${lastName}
            Mobile Number : ${phoneNumber}
            Message : ${message}

            we will back to you very soon 
            `
          };
          mailgun.messages().send(data, function (error, body) {
              if(error){
                  console.log(error)
              }else{
            console.log(body);
        }
          });
        req.flash('success','Your Message Have Been Sent Succesfully')
        res.redirect('/contact')
    })
    .catch(err=>{console.log(err)})
}