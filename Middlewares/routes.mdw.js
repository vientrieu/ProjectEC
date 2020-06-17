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

    app.use('/app/login', login);
    app.use('/app/admin', restrict, isAdmin, admin);
    app.use('/app/', shop);
    app.use('/app/product', product);
    app.use('/app/category', category);
    app.use('/app/cart', restrict, isUser, cart);
    app.use('/app/mycourse', restrict,isUser, mycourse);
    app.use('/app/myclass', restrict, isTeacher, myclass);
}