const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth')
const {
    check,
    validationResult
} = require('express-validator');
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');

//get and authenticate user
router.get('/user', auth, async (req, res) => {
    try {
        let admin = await Admin.findOne(req.body._id).select(['-password', '-phone']);

        let user = await User.findOne(req.body._id).select(['-password', '-phone', '-address']);

        console.log(admin)

        if (admin) {
            return res.json(admin)
        } else if (user) {
            res.json(user)
        }

    } catch (error) {
        console.error(error);
        res.status(500)
    }
});

//signing user
router.post(
    '/login',
    [
        check('email', 'Enter a valid email address').isEmail(),
        check('password', 'password Incorrect').exists()
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array()
            })
        }
        const {
            email,
            password
        } = req.body;

        try {
            let user = await User.findOne({
                email
            });

            let admin = await Admin.findOne({
                email
            })

            if (!user && !admin) {
                return res.status(400).json({
                    errors: [{
                        msg: 'Invalid credentials'
                    }]
                });
            }

            if (user) {
                const isMatch = await bcrypt.compare(password, user.password);

                if (!isMatch) {
                    return res.status(400).json({
                        errors: [{
                            msg: 'Invalid Credentials'
                        }]
                    });
                }

                const payload = {
                    user: {
                        id: user.id
                    }
                }

                //jsonwebtoken hookup
                jwt.sign(payload, process.env.JWT_SECRET, {
                    expiresIn: 360000
                }, (err, token) => {
                    if (err) throw err;
                    res.json({
                        token
                    });
                });

            } else if (admin) {
                const isMatch = await bcrypt.compare(password, admin.password);

                if (!isMatch) {
                    return res.status(400).json({
                        errors: [{
                            msg: 'Invalid Credentials'
                        }]
                    });
                }

                const payload = {
                    admin: {
                        id: admin.id
                    }
                }

                //jsonwebtoken hookup
                jwt.sign(payload, process.env.JWT_SECRET_ADMIN, {
                    expiresIn: 360000
                }, (err, token_admin) => {
                    if (err) throw err;
                    res.json({
                        token_admin
                    });
                });
            }


        } catch (error) {
            console.error(error.message);
            res.status(500).json('Server Error')
        }
    }
);


module.exports = router