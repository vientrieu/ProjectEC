const express = require('express');
const router = express.Router();
controllerMyClass = require('../Controllers/myclass.controller');
router.get('/',(req, res)=>{
    //controllerMyClass.addclass();
    //res.render('./Client/myclass')
    var idtest="5ed3533053bdca39d00d1c00";
    controllerMyClass.LoadAllClasses(req, res, idtest);
});

router.get('/addcourse',(req, res) => {
    res.render('./Client/sell-course');
 });

 router.post('/addcourse',(req, res, next) => {
    var item ={
        name: req.body.name,
        category: req.body.category,
        descriptionshort: req.body.descriptionshort,
        descriptionfull: req.body.descriptionfull,
        price: req.body.price,
        pathImg: req.body.pathImg,
        video: req.body.video,
        discount: req.body.discount
    }
    var idtest2="5ed3533053bdca39d00d1c00";//iduser
    controllerMyClass.addcourse(req, res, idtest2, item);
    console.log("Add course sucessfully!");
    //var idtest1="5ed351d941f5691b94684360";//id class
    //var id = item._id;
    //console.log(id);
    //controllerMyClass.AddCourseToMyClass(idtest2, id);
    //console.log("Add class sucessfully!");
    
    controllerMyClass.LoadAllClasses(req, res, idtest2);
 });

router.get('/:id',(req, res)=>{
    //var idtest="5ed351d941f5691b94684360";
    let id = req.params.id;
    //consolve.log(id);
    controllerMyClass.LoadIdClasses(req, res,id);
    //res.render('./Client/myclass-detail')
 });


module.exports = router;