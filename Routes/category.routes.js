const express = require('express');
const router = express.Router();
controllerCategory = require('../Controllers/category.controller');
router.get('/page/:id',(req, res)=>{
    let pageNum = req.params.id;
    controllerCategory.loadall(req, res,pageNum);
});
router.get('/:id/:page',(req, res)=>{
    let id = req.params.id;
    let pageNum = req.params.page;
    //console.log(id);
    controllerCategory.loadId(req, res,id,pageNum);
});

module.exports = router;