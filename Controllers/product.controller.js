//routes/category.routes
//models/category.model
//controller/shop.controller
const User = require("../Models/user.model");
const Product = require("../Models/product.model");
const Category = require("../Models/category.model");

module.exports = {
  loadall: async (req, res, pageNum,sort) => {
    let key=1;
    if(sort =="PriceDescending") key=-1;
    const options = {
      page: pageNum,
      limit: 9,
      lean: true,
      sort: { price: key },
    };
    Category.find()
      .lean()
      .then((listCategory) => {
        Product.find({ check: 1 })
          .countDocuments()
          .lean()
          .then((Count) => {
            Product.paginate({ check: 1 }, options, function (err, result) {
              res.render("./Client/shop-grid product test", {
                product: "active",
                totalpages: result.totalPages,
                prev: result.prevPage,
                now: result.page,
                next: result.nextPage,
                list: result.docs,
                Product: result.docs,
                Category: listCategory,
                AllCategory: listCategory,
                Count: Count,
                ShopGrid: "active",
                User: req.user,
              });
            });
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  },
  loadId: async (req, res, id) => {
    Product.findById(id)
      .sort({ price: 1 })
      .lean()
      .then((productList) => {
        Category.find({ name: productList.category.name })
          .lean()
          .then((categoryList) => {
            Category.find({})
              .sort({ name: 1 })
              .lean()
              .then((AllCategory) => {
                res.render("./Client/shop-details product test", {
                  Product: productList,
                  Category: categoryList,
                  AllCategory: AllCategory,
                  ShopGrid: "active",
                  User: req.user,
                });
              })
              .catch((err) => console.log(err));
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  },
  loadSearchByNameProduct: async (req, res, query, pageNum,sort) => {
    //query= '/' +query+ '/';\
    let key=1;
    if(sort =="PriceDescending") key=-1;

    const options = {
      page: pageNum,
      limit: 9,
      lean: true,
      sort: { price: key },
    };
    Category.find()
      .lean()
      .then((listCategory) => {
        //console.log('query search= '+ query);
        //console.log("search name product query" + query);
        Product.find({ name: { $regex: query, $options: "i" }, check: 1 })
          .countDocuments()
          .lean()
          .then((Count) => {
            Product.paginate(
              { name: { $regex: query, $options: "i" }, check: 1 },
              options,
              function (err, result) {
                res.render("./Client/shop-grid product test", {
                  product: "active",
                  totalpages: result.totalPages,
                  prev: result.prevPage,
                  now: result.page,
                  next: result.nextPage,
                  list: result.docs,
                  Product: result.docs,
                  Category: listCategory,
                  AllCategory: listCategory,
                  Count: Count,
                  ShopGrid: "active",
                  User: req.user,
                  querySearch :query,
                });
              }
            );
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  },
  loadSearchByNameCategory: async (req, res, query, pageNum,sort) => {
    //query= '/' +query+ '/';
    let key=1;
    if(sort =="PriceDescending") key=-1;
    const options = {
      page: pageNum,
      limit: 9,
      lean: true,
      sort: { price: key },
    };
    Category.find()
      .lean()
      .then((listCategory) => {
        //console.log("search Category query" + query);
        Product.find({
          "category.name": { $regex: query, $options: "i" },
          check: 1,
        })
          .countDocuments()
          .lean()
          .then((Count) => {
            Product.paginate(
              { "category.name": { $regex: query, $options: "i" }, check: 1 },
              options,
              function (err, result) {
                res.render("./Client/shop-grid product test", {
                  product: "active",
                  totalpages: result.totalPages,
                  prev: result.prevPage,
                  now: result.page,
                  next: result.nextPage,
                  list: result.docs,
                  Product: result.docs,
                  Category: listCategory,
                  AllCategory: listCategory,
                  Count: Count,
                  querySearch :query,
                });
              }
            );
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  },
  loadSearchByPrice: async (req, res, query, pageNum,sort) => {
    //query= '/' +query+ '/';
    let key=1;
    if(sort =="PriceDescending") key=-1;
    const options = {
      page: pageNum,
      limit: 9,
      lean: true,
      sort: { name: key },
    };
    Category.find()
      .lean()
      .then((listCategory) => {
        //console.log("search Category query" + query);
        Product.find({
          price: query,
          check: 1,
        })
          .countDocuments()
          .lean()
          .then((Count) => {
            Product.paginate(
              { price: query, check: 1 },
              options,
              function (err, result) {
                res.render("./Client/shop-grid product test", {
                  product: "active",
                  totalpages: result.totalPages,
                  prev: result.prevPage,
                  now: result.page,
                  next: result.nextPage,
                  list: result.docs,
                  Product: result.docs,
                  Category: listCategory,
                  AllCategory: listCategory,
                  Count: Count,
                  querySearch :query,
                });
              }
            );
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  },
  loadSearchByNameAuthor: async (req, res, query, pageNum,sort) => {
    //query= '/' +query+ '/';
    let key=1;
    if(sort =="PriceDescending") key=-1;
    const options = {
      page: pageNum,
      limit: 9,
      lean: true,
      sort: { price: key },
    };
    Category.find()
      .lean()
      .then((listCategory) => {
        //console.log("search Category query" + query);
        Product.find({
          "author.name": { $regex: query, $options: "i" },
          check: 1,
        })
          .countDocuments()
          .lean()
          .then((Count) => {
            Product.paginate(
              { "author.name": { $regex: query, $options: "i" }, check: 1 },
              options,
              function (err, result) {
                res.render("./Client/shop-grid product test", {
                  product: "active",
                  totalpages: result.totalPages,
                  prev: result.prevPage,
                  now: result.page,
                  next: result.nextPage,
                  list: result.docs,
                  Product: result.docs,
                  Category: listCategory,
                  AllCategory: listCategory,
                  Count: Count,
                  querySearch :query,
                });
              }
            );
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  },
};
