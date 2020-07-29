const express = require('express');
const router = express.Router();
controllerShop = require('../Controllers/shop.controller');
router.get('/', (req,res) => {
    controllerShop.loadall(req, res);
});

router.get('/shop-details', (req,res) => {
    res.render('./Client/shop-details',{User: req.user,});
});
router.get('/blog-details', (req,res) => {
    res.render('./Client/blog-details',{User: req.user,});
});
router.get('/blog', (req,res) => {
    res.render('./Client/blog',{User: req.user,Page: "Blog",Blog:"active"});
});
router.get('/checkout', (req,res) => {
    res.render('./Client/checkout',{User: req.user,});
});
router.get('/contact', (req,res) => {
    res.render('./Client/contact',{User: req.user, Page: "Contact Us", Contact:"active"});
});
module.exports = router;