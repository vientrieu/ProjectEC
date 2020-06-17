const express = require('express');
const router = express.Router();
controllerMyCourse = require('../Controllers/mycourse.controller');
router.get('/',(req, res)=>{
    var idtest="5ed0ddf998cb1323fc856543";
    //console.log(req.user._id);
    //var id = req.user;
    //var idtest="5ed674beee9f12138c0b5ad3";
    //let idUser =  req.user._id;
    //console.log(idUser);
    controllerMyCourse.LoadAllCourses(req, res,idtest);
});
router.get('/:id',(req, res)=>{
    //var idtest="5ed0ddf998cb1323fc856543";
     let id = req.params.id;
    // console.log(id);
    // let idUser =  req.user._id;
    // console.log(idUser);
    controllerMyCourse.LoadIdCourses(req, res,id);
   // res.render('./Client/mycourse-detail')
 });
// router.post('/:id',(req,res,next)=>
// {
//     var cmt ={
//         comment: req.body.comment     }
//         var idtest="5ed0ddf998cb1323fc856543";
//     let idUs = req.user._id;//iduser
//     var idPr=req.params.id;
//     controllerMyCourse.addComment(req, res, idPr,idUs, cmt);
//     console.log("Add comment sucessfully!");
//     controllerMyCourse.LoadIdCourses(req, res,idPr);
// });

module.exports = router;