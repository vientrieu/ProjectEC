//routes/category.routes
//models/category.model
//controller/shop.controller
const User = require("../Models/user.model");
const Product = require("../Models/product.model");
const Category = require("../Models/category.model");
const { count } = require("../Models/user.model");
module.exports = {
  loadall: async (req, res) => {
    Category.find()
      .lean()
      .then((categoryList) => {
        Product.find({},{},{limit:8})
          .sort({createdAt:-1})
          .lean()
          .then((productList) => {
            Product.countDocuments().then((count) => {
                  res.render("./Client/index", {
                    Category: categoryList,
                    Product: productList,
                    Count: count,
                    User: req.user,
                    Page: "Home"
                  });
                });
            });
          })
      .catch((err) => console.log(err));
  },
};
