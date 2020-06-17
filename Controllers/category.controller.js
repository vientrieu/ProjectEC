//routes/category.routes
//models/category.model
//controller/shop.controller
const User = require("../Models/user.model");
const Product = require("../Models/product.model");
const Category = require("../Models/category.model");
module.exports = {
  ALL: async (req, res) => {
    let A = Category.find().lean().toJason();
    console.log(a);
    return A;
  },
  loadall: async (req, res, pageNum) => {
    let page = parseInt(pageNum);
    if (page == 0) page = 1;
    let limit = 6;
    let startindex = (page - 1) * limit;
    let endindex = page * limit;

    Category.find()
      .lean()
      .then((categoryList) => {
        Product.countDocuments()
          .lean()
          .then((count) => {
            // console.log("---------------------");
            // console.log(count);
            // console.log(startindex);
            // console.log(endindex);
            if (endindex > count && startindex > count) {
              page = page - 1;
              startindex = (page - 1) * limit;
              endindex = page * limit;
            }
            Product.find()
              .limit(limit)
              .skip(startindex)
              .lean()
              .then((productList) => {
                res.render("./Client/shop-details", {
                  Category: categoryList,
                  Product: productList,
                  Count: count,
                  AllCategory: categoryList,
                  pageNow: page,
                  pagePrevious: page - 1,
                  pageNext: page + 1,
                  User: req.user,
                });
              });
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  },
  loadId: async (req, res, id, pageNum) => {
    const options = {
      page: pageNum,
      limit: 9,
      lean: true,
      sort: { price: 1 },
    };
    Category.find()
      .lean()
      .then((allCategory) => {
        Category.find({ _id: id })
          .lean()
          .then((categoryList) => {
            Product.find({ "category.id": id })
              .countDocuments()
              .lean()
              .then((Count) => {
                Product.paginate({ "category.id": id }, options, function (
                  err,
                  result
                ) {
                  res.render("./Client/shop-grid product test", {
                    product: "active",
                    totalpages: result.totalPages,
                    prev: result.prevPage,
                    now: result.page,
                    next: result.nextPage,
                    list: result.docs,
                    Product: result.docs,
                    Category: categoryList,
                    AllCategory: allCategory,
                    Count: Count,
                    User: req.user,
                  });
                });
              })
              .catch((err) => console.log(err));
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  },
};
