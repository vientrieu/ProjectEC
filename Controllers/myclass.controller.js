const Class = require("../Models/class.model");
const Product = require("../Models/product.model");

module.exports = {
    LoadAllClasses: async (req, res, idUser) => {
        Class.findOne({iduser:idUser}).lean()
            .then(async (MyClass) => {
                let listclass = await Promise.all(MyClass.idcourses.map(async idcourse=> {
                    let course = await Product.findById(idcourse).lean();
                    return (course);
                }));//
                res.render('./Client/myclass', {
                    layout: 'client',
                    class: listclass,
                    User: req.user,
                });
            })
            .catch((err) => console.log(err));
                
    },
    LoadIdClasses : async (req, res, id) => {
        Product.findById(id)
          .lean()
          .then((classList) => {
                    res.render("./Client/myclass-detail", {
                      Class: classList,
                      User: req.user,
                    });
            })
            .catch((err) => console.log(err));
    },

    AddCourseToMyClass: async (iduser, idcourse)=>//id: id của user, vì mỗi user có 1 myclass nên lấy id class
    {
        Class.findOne({iduser:iduser}).lean()
            .then(async (Class)=>{
                Class.idcourses.push(idcourse);
            })
        .catch((err) => console.log(err))
    },

    /*addclass: async (id, idcourse)=>{
        const newClass = Class.findById(id).lean();
        if(newClass != null){
        Class.findOneAndUpdate(id, {idcourses: idcourse}, function(err, result) {})
                            .catch((err) => console.log(err));
        }
        else {
        newClass = new Class({
                 iduser: id,
                 idcourses:idcourse,
             });
             newClass
                 .save()
                 .catch((err) => console.log(err)); 
        }        
     },*/

     addcourse: async (req, res, idUser,course)=>  {
        const newProduct = new Product({
            name: course.name,
            category: {
                id: "5ecbf45921c3159255c4ba6d",
                name: course.category
            },
            descriptionshort: course.descriptionshort,
            descriptionfull: course.descriptionfull,
            author: {
                id: idUser,
                name: "Thương Hoài"
            },
            price: course.price,
            pathImg: course.pathImg,
            video: course.video,
            discount: course.discount
        });
        newProduct
            .save()
            .catch((err) => console.log(err))
        var idpr = String(newProduct._id);
        console.log(idpr);
            Class.findOne({iduser:idUser}).lean()
            .then(async (myClass)=>{
                myClass.idcourses.push(idpr);
                Class.findOneAndUpdate({iduser:idUser}, {idcourses:myClass.idcourses}, function(err, result) {})
            })
            .catch((err) => console.log(err))
        }
        
};            