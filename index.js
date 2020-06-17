let express = require('express');
let app = express();

var morgan = require('morgan');
//app.use(morgan('dev')); // sử dụng để log mọi request ra console
var passport = require('passport');
require('./Controllers/login.controller')(passport); // cấu hình passport, 1 lib sử dụng cho việc authentication của chúng ta
var flash    = require('connect-flash');


User = require('./Models/user.model');
//const PORT = process.env.PORT || 5000;
const URI = "mongodb+srv://20A09team:admin@cluster0-4kpyf.gcp.mongodb.net/test?retryWrites=true&w=majority";



//set public static folder
app.use(express.static(__dirname + '/Public'));
//use view engine
let expressHbs = require('express-handlebars');
let hbs = expressHbs.create({
    extname :'hbs',
    defaultLayout: 'client',
    layoutsDir:__dirname + '/Views/Layouts',
    partialsDir:__dirname + '/Views/Partials'
});
app.engine('hbs',hbs.engine);
app.set('view engine','hbs');

//Use Body parser
let bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));

//Use Cookie-parser
let cookieParser = require('cookie-parser');
app.use(cookieParser());

//Use Session
let session = require('express-session');
app.use(session({
    cookie: { httpOnly: true, maxAge: 30 * 24 * 60 * 60 * 1000 },
    secret: 'Secret',
    resave: false,
    saveUninitialized: false
}))
app.use(passport.initialize());
app.use(passport.session()); 
app.use(flash());


//define your routers here

require('./Databases/mongodb')(URI);
require('./Middlewares/routes.mdw')(app);

//set server port & start server
app.set('port',process.env.PORT || 3000;);
app.listen(app.get('port'), () => {
    console.log(`Server is running at port ${app.get('port')}`);
});