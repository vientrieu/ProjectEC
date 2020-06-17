const Course = require("../Models/course.model");
const Product = require("../Models/product.model");
module.exports = {
  LoadAllCourses: async (req, res, idtest) => {
    Course.findById(idtest).lean()
      .then(async (MyCourse) => {
        let listproduct = await Promise.all(MyCourse.idproducts.map(async idproduct => {
          let product = await Product.findById(idproduct).lean();
          return (product);
        }));
        console.log(MyCourse);
        console.log(listproduct);
        res.render('./Client/mycourse', {
          layout: 'client',
          list: listproduct,
          User: req.user,
        });
      })
  },
  LoadIdCourses: async (req, res, id) => {
    Product.findById(id)
      .lean()
      .then(async (productList) => {
        res.render("./Client/mycourse-detail", {
          layout: 'client',
          Product: productList,
          User: req.user,
        });
      })
      .catch((err) => console.log(err));
  },
  // addComment: async (req, res, idPr,idUs, cmt)=>//id: id của cart, vì mỗi user có 1 cart nên lấy id cart. Thêm 1 giá trị vào hàm là cmt để lưu giá trị comment
  // {//tạo 1 object có iduser:id, cmt: cmt
  //   var ObjectComment = {
  //     iduser: idUs,
  //     cmt : cmt.comment,
  //   }
  //   console.log(ObjectComment);
  //     //thay vì tìm đến giỏ hàng thì tìm đến product có giá trị id:idpr. rồi push cái object vừa tạo vào comment. làm xong rồi xóa phần chú thích này đi.oke 
  //     Product.findOne({idproduct:idPr}).lean()//tìm đến giỏ hàng của người có id = id
  //         .then((comment)=>{//kết quả tìm được gán vào cart
  //           comment.comments.push(ObjectComment);//vì idproducts là array danh sách idproduct nên dùng hàm push để thêm vào cuối
            
  //               Product.findOneAndUpdate({iduser:idUs}, {cmt:cmt}, function(err, result) {})
  
  //         })
  //     .catch((err) => console.log(err))
  // },
};


