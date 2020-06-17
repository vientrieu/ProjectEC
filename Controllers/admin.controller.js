const User = require("../Models/user.model");
const Product = require("../Models/product.model");
const Bill = require("../Models/bill.model");
const Course= require("../Models/course.model");
module.exports = {
    addproduct: async ()=>
    {
        for(var i=0;i<3;i++)
        {
            const newProduct = new Product({
                name: "product "+i,
                category: {
                    id: "id "+i,
                    name: "category "+i
                },
                descriptionshort: "short",
                descriptionfull: "full",
                author: {
                    id: "id "+i,
                    name: "Tác giả "+i
                },
                price: i*10000
            });
            newProduct
                .save()
                .catch((err) => console.log(err));
        }
    },
    // adduser: async ()=>
    // {
    //     for(var i=0;i<20;i++)
    //     {
    //         const newUser = new User({
    //             username: "admin",
    //             password: "123123",
    //             displayname: "admin ne",
    //             address: "address",
    //             birthday: "01-01-1999",
    //             email: "String",
    //             avatar: "https://zicxa.com/hinh-anh/wp-content/uploads/2019/12/T%E1%BB%95ng-h%E...",
    //         });
    //         newUser
    //             .save()
    //             .catch((err) => console.log(err));
    //     }
    // },
    // addbill: async ()=>
    // {
    //     for(var i=5;i<8;i++)
    //     {
    //         const newBill = new Bill({
    //             iduser: "5ecaa161752cec16d0ed13b"+i,
    //             idproducts: ["5ec7f3e610722e0198360b67","5ec7f3e610722e0198360b68","5ec7f3e610722e0198360b69"],
    //             payment: 1,
    //             totalprice: 2000,
    //             discount: 0.5,
    //             money: 1000
    //         });
    //         newBill
    //             .save()
    //             .catch((err) => console.log(err));
    //     }
    // },
    // addcart: async ()=>
    // {
    //     for(var i=1;i<5;i++)
    //     {
    //         const newcart = new Cart({
    //             iduser: "5ecaa161752cec16d0ed13b"+i,
    //             idproducts: ["5ec7f3e610722e0198360b67","5ec7f3e610722e0198360b68","5ec7f3e610722e0198360b69"],
    //             totalprice: 2000,
    //         });
    //         newcart
    //             .save()
    //             .catch((err) => console.log(err));
    //     }
    // },
    AddMyCourse: async ()=>
    {
        for(var i=0;i<10;i++)
        {
            const newcourse = new Course({
                iduser: "5ecaa161752cec16d0ed13b"+i,
                idproducts: ["5ec7f3e610722e0198360b67","5ec7f3e610722e0198360b68","5ec7f3e610722e0198360b69"],
            });
            newcourse
                .save()
                .catch((err) => console.log(err));
        }
    },
            // result.docs
            // result.totalDocs = 100
            // result.limit = 10
            // result.page = 1
            // result.totalPages = 10
            // result.hasNextPage = true
            // result.nextPage = 2
            // result.hasPrevPage = false
            // result.prevPage = null
            // result.pagingCounter = 1

    //user management
    LoadAllUser: async (req, res, pageNum)=>
    {
        const options = {
            page: pageNum,
            limit: 10,
            lean: true,
        };
        User.paginate({}, options, function (err, result) {
            res.render('./Admin/client-management', {
                layout: 'admin',
                page: 'Quản lý khách hàng',
                client: 'active',
                totalpages: result.totalPages,
                prev: result.prevPage,
                now: result.page,
                next: result.nextPage,
                list: result.docs,
                User: req.user,
            });
        });
    },
    DeleteUser: async (req,res,id)=>
    {
        User.findByIdAndDelete(id)
            .catch((err) => console.log(err));
    },
    UpgradeUser: async (req,res,id)=>
    {
        User.findByIdAndUpdate(id, {role: 1}, function(err, result) {})
        .catch((err) => console.log(err));
    },

     //product management
    LoadAllProduct: async (req, res, pageNum)=>
    {
        const options = {
            page: pageNum,
            limit: 5,
            lean: true,
          };
          Product.paginate({}, options, function(err,result) {
              res.render('./Admin/product-management',{
                  layout: 'admin',
                  page: 'Quản lý sản phẩm',
                  product: 'active',
                  totalpages: result.totalPages,
                  prev: result.prevPage,
                  now: result.page,
                  next: result.nextPage,
                  list: result.docs,
                  User: req.user,
              });
            });
        },

    DeleteProduct: async (req,res,id)=>
    {
        Product.findByIdAndDelete(id)
            .catch((err) => console.log(err));
    },

     //bill management
    LoadAllBill: async (req, res, pageNum) => {
        const options = {
            page: pageNum,
            limit: 5,
            lean: true,
          };
        Bill.paginate({}, options, async function(err,result) {
            let listproductbill = await Promise.all(
                result.docs.map(async bill => {
                    let listproduct = await Promise.all(bill.idproducts.map(async idproduct => {
                        let product = await Product.findById(idproduct).lean();
                        return product;
                    }));
                    return ({ ...bill, productlist: listproduct })
                }));
            res.render('./Admin/business-management', {
                layout: 'admin',
                page: 'Quản lý doanh thu',
                business: 'active',
                totalpages: result.totalPages,
                prev: result.prevPage,
                now: result.page,
                next: result.nextPage,
                list: listproductbill,
                User: req.user,
            });
        })
    },

    DeleteBill: async (req,res,id)=>
    {
        Bill.findByIdAndDelete(id)
            .catch((err) => console.log(err));
    },
};

