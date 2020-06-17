const Cart = require("../Models/cart.model");
const Product = require("../Models/product.model");
module.exports = {
    LoadCart: async (req, res, idUser) => {
        Cart.findOne({iduser:idUser}).lean()
            .then(async (MyCart) => {
               // console.log(MyCart);
               let TotalPrice = 0;
               //console.log(MyCart);
                let listproduct = await Promise.all(MyCart.idproducts.map(async idproduct => {
                    let product = await Product.findById(idproduct).lean();
                    TotalPrice += product.price*(1-product.discount);
                    return ({ ...MyCart, productlist: product });
                }));
                Cart.findByIdAndUpdate(MyCart._id, {totalprice:TotalPrice}, function(err, result) {});
                res.render('./Client/shop-cart', {
                    layout: 'client',
                    total: TotalPrice,
                    list: listproduct,
                    User: req.user, 
                });
            })
    },

    AddProductToCart: async (req, res, id, idpr)=>//id: id của cart, vì mỗi user có 1 cart nên lấy id cart. Thêm 1 giá trị vào hàm là cmt để lưu giá trị comment
    {//tạo 1 object có iduser:id, cmt: cmt
        //thay vì tìm đến giỏ hàng thì tìm đến product có giá trị id:idpr. rồi push cái object vừa tạo vào comment. làm xong rồi xóa phần chú thích này đi.oke 
        Cart.findOne({iduser:id}).lean()//tìm đến giỏ hàng của người có id = id
            .then((cart)=>{//kết quả tìm được gán vào cart
                cart.idproducts.push(idpr);//vì idproducts là array danh sách idproduct nên dùng hàm push để thêm vào cuối
                Product.findById(idpr)//tìm đến product vừa thêm vào giỏ để lấy price(giá trị) để tính tổng tiền
                .then((pr)=>{//gán kết quả tìm được vào pr
                    var newtotal=cart.totalprice + pr.price;//tính tổng tiền...mà đoạn này k cần dùng đến đâu. tới đoạn push là đủ r
                    Cart.findOneAndUpdate({iduser:id}, {totalprice:newtotal, idproducts:cart.idproducts}, function(err, result) {})
                })
            })
        .catch((err) => console.log(err))
    },
    DeleteProductFromCart: async (req, res, id, idpr)=>
    {
        Cart.findOne({iduser:id}).lean()
            .then((cart)=>{
                const newListProduct = cart.idproducts.filter(item => item !== idpr);
                Product.findById(idpr)
                        .then((pr)=>{
                            var newtotal=cart.totalprice-pr.price;
                            Cart.findOneAndUpdate({iduser:id}, {totalprice:newtotal, idproducts:newListProduct}, function(err, result) {})
                        })
            })
        .catch((err) => console.log(err))
    },
}