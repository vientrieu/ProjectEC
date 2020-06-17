const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
const User = require('../Models/user.model');
const checkAuthenticated = require('../Middlewares/auth.mdw').checkAuthenticated;

router.get(`/`, (req, res) => {
  if (!req.isAuthenticated()) {
    res.render('./Login/login', { layout: 'login'});
  }
  else {
    res.redirect('/login/profile');
  }
});
router.post('/', (req, res, next) => {
  const url = new URL(req.headers.referer);
  passport.authenticate('local', {
    successRedirect: url.searchParams.get('retUrl'),//thành công
    failureRedirect: `${req.headers.referer}`,//thất bại
  })(req, res, next);
});


router.get('/register', (req, res) => {
  if (!req.isAuthenticated()) {
    res.render('./Login/register', { layout: 'login' });
  }
  else {
    res.redirect('/login/profile');
  }
});

// push này lên
router.post('/register', (req, res) => {
  const { displayname, email, password, password2, address, birthday, customCheckRegister } = req.body;
  req.session.errors = { msg: '' }
  // kiểm tra đã điền đủ thông tin đang kí chưa
  if (!customCheckRegister) {
    req.session.errors = { msg: 'Please click on (I agree with the Privacy Policy)' };
  }
  else if (!displayname || !email || !password || !password2 || !address || !birthday) {
    req.session.errors = { msg: 'Please enter all fields' };
  }
  // kiểm tra xác nhận password
  else if (password != password2) {
    req.session.errors = { msg: 'Passwords do not match' };
  }
  // password phải >= 6 kí tự
  else if (password.length < 6) {
    req.session.errors = { msg: 'Password must be at least 6 characters' };
  }

  if (req.session.errors.msg != "") {// nếu có lỗi thì trả về trang đăng kí
    res.render('./Login/register', {
      layout: 'login', message: req.session.errors.msg
    }
    );
  }
  else {// kiểm tra email đăng kí đã tồn tại chưa, nếu rồi thì trở về trang đăng kí
    User.findOne({ email: email }).then(user => {
      if (user) {
        req.session.errors = { msg: 'Email already exists' };
        res.render('./Login/register', { layout: 'login', message: req.session.errors.msg });
      }
      else { // ngược lại thì lưu dữ liệu và database và trở về trang đăng nhập để đăng nhập tài khoản
        const newUser = new User({
          displayname,
          email,
          password,
          address,
          birthday
        });
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser
              .save()
              .then(user => {
                res.redirect('/login/profile');
              })
              .catch(err => console.log(err));
          });
        });
      }
    });
  }
});

// profile
router.get('/profile', checkAuthenticated, (req, res) =>
  res.render('./Login/profile', {
    User: req.user,
    raw: true,
  })
);

// Đăng xuất
router.get('/logout', function (req, res) {
  req.logout();
  res.redirect('/');
});

// change address
// profile
router.get('/changeaddress', checkAuthenticated, (req, res) =>
res.redirect('/login/profile')
);
router.post('/changeaddress', (req, res) => {
  const { displayname,address, birthday} = req.body;
  email=req.user.email;
  req.session.errors = { msg: '' } 
  if (!displayname || !address || !birthday) {
    req.session.errors = { msg: 'Please enter all fields' };
  }
  if (req.session.errors.msg != "") {// nếu có lỗi thì trả về trang đăng kí
    //console.log(req.session.errors.msg);
    res.render('./Login/profile',{User:req.user, message: req.session.errors.msg});
  }
  else{// ngược lại thì update dữ liệu
    User.findOneAndUpdate({email:email},{displayname:displayname,address:address,birthday:birthday},function(err, result){})
    .then(data=>{
      req.user=data;
      res.redirect('/login/profile');
    })
    .catch((err) => console.log(err))
  }
  //check session
})
router.post('/changepassword', (req, res) => {
  const {password,password2,password3} = req.body;
  req.session.errors = { msg: '' }
  user=req.user;
  if (!password || !password2 || !password3) {
    req.session.errors = { msg: 'Please enter all fields' };
  }
  else if(password!=password2)
  {
    req.session.errors = { msg: 'Fail password confirm' };
  }
  else if (password3.length < 6) {
    req.session.errors = { msg: 'Password must be at least 6 characters' };
  }
  // Match password
  bcrypt.compare(password, user.password, (err, isMatch) => {
    if (err) throw err;
    if (isMatch) {
    } else {
      req.session.errors = { msg: 'Password incorrect' };
    }
  });
  if (req.session.errors.msg != "") {// nếu có lỗi thì trả về trang đăng kí
    //console.log(req.session.errors.msg);
    res.render('./Login/profile',{User:req.user, message: req.session.errors.msg});
  }
  else{// ngược lại thì update dữ liệu
    email=req.user.email;
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(password3, salt, (err, hash) => {
        if (err) throw err;
        user.password = hash;
        User.findOneAndUpdate({email:email},{password:user.password},function(err, result){})
        .then(data=>{
          req.user=data;
          res.redirect('/login/profile');
        })
        .catch((err) => console.log(err))
      });
    });
  }
})
// change address
/*
// Hàm được sử dụng để kiểm tra đã login hay chưa
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();
    res.redirect('/');
}
*/
module.exports = router;