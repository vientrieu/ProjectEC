// const checkUser = require('../Middlewares/role.mdw').CheckUser;
const setRole = (req) => {
    if (req.user.role === 0 || req.user.role === 1) {
        req.session.isStudent = true;
        req.session.isTeacher = false;
        req.session.isAdmin = false;
    }
    else if (req.user.role === 2) {
        req.session.isStudent = false;
        req.session.isTeacher = true;
        req.session.isAdmin = false;
    }
    else if (req.user.role === 10) {
        req.session.isStudent = false;
        req.session.isTeacher = false;
        req.session.isAdmin = true;
    }
}
module.exports = {
    isTeacher: (req, res, next) => {
        setRole(req);
        if (req.session.isTeacher) return next();
        else {
            res.render('../Views/error', {layout:''})
        }
    },
    isUser: (req, res, next) => {
        setRole(req);
        if (req.session.isTeacher || req.session.isStudent) return next();
        else {
            res.render('../Views/error', {layout:''})
        }
    },
    isAdmin: (req, res, next) => {
        setRole(req);
        if (req.session.isAdmin) return next();
        else {
            res.render('../Views/error', {layout:''})
        }
    }
}