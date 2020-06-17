module.exports = (app) => {
    admin = require('../Routes/admin.routes');
    login = require('../Routes/login.routes');
    shop = require('../Routes/shop.routes');
    product = require('../Routes/product.routes');
    category = require('../Routes/category.routes');
    cart = require('../Routes/cart.routes');
    mycourse = require('../Routes/mycourse.routes');
    myclass = require('../Routes/myclass.routes');
    restrict = require('../Middlewares/auth.mdw').checkAuthenticated;
    checkAuth = require('../Middlewares/auth.mdw').Authenticated;
    const role = require('../Middlewares/role.mdw');
    const { isAdmin, isUser, isTeacher } = role;

    app.use('/login', login);
    app.use('/admin', restrict, isAdmin, admin);
    app.use('/', shop);
    app.use('/product', product);
    app.use('/category', category);
    app.use('/cart', restrict, isUser, cart);
    app.use('/mycourse', restrict,isUser, mycourse);
    app.use('/myclass', restrict, isTeacher, myclass);
}