//routes/category.routes
//models/category.model
//controller/shop.controller
const User = require("../Models/user.model");
const Product = require("../Models/product.model");
const Category = require("../Models/category.model");
module.exports = {
  loadall: async (req, res) => {
    Category.find()
      .lean()
      .then((categoryList) => {
        Product.find()
          .lean()
          .then((productList) => {
            Product.countDocuments().then((count) => {
              Category.find({})
                .lean()
                .then((AllCategory) => {
                  res.render("./Client/index", {
                    Category: categoryList,
                    Product: productList,
                    Count: count,
                    AllCategory: AllCategory,
                  });
                });
            });
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  },
};
