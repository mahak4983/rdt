const bcrypt = require('bcryptjs');
const User = require('../models/user');

exports.getIndex = (req, res, next) => {
    res.render('index');
};

exports.getLogin = (req, res, next) => {
    /* login page */

    /* also check existing user */
    res.render('signin', {
        errorMessage: ''
    });
};

exports.postLogin = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    User.findOne({ email: email })
        .then(user => {
            if (!user) {
                /* render login page again  */
                /* return res.render('auth/login', {
   
                })*/
                res.render('signin', {
                    errorMessage: 'invalid email'
                });
            }
            bcrypt.compare(password, user.password)
                .then(doMatch => {
                    if (doMatch) {
                        req.session.isLoggedIn = true;
                        req.session.user = user;
                        return req.session.save(err => {
                            console.log(err);
                            res.redirect('/');

                            /* render to welcome page */
                        });
                    }
                    /* render login page again password wrong */
                    return res.render('signin', {
                        errorMessage: 'Wrong Password'
                    });
                })
                .catch(err => {
                    console.log(err);
                    /* redirect to /login */
                    res.render('signin', {
                        errorMessage: 'serverError'
                    });
                });
        })
        .catch(err => {
            console.log(err);
        });
};
exports.postSignup = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    const username = req.body.username;

    bcrypt.hash(password, 12)
        .then(hashedPass => {
            const user = new User({
                email: email,
                password: hashedPass,
                username: username
            });
            return user.save();
        })
        .then(result => {
            /* redirect to /login page */
            res.redirect('/login');
        })
        .catch(err => {
            console.log(err);
            res.render('signup', {
                errorMessage: 'serverError'
            });
        });

};

exports.getSignup = (req, res, next) => {
    res.render('signup', {
        errorMessage: ''
    });
};

exports.postLogout = (req, res, next) => {
    req.session.destroy(err => {
        console.log(err);
        /* redirect to welcome page */
    });
};