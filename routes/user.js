const express = require('express');
const router = express.Router();
const {
    check,
    validationResult
} = require('express-validator');
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const gravatar = require('gravatar');
const Admin = require('../models/Admin');
const contains = require('validator/lib/contains')

//init Role
let role = 'user'

//user registration
router.post(
    '/register',
    [
        check('name', 'Name is required').not().isEmpty(),
        check('email', 'Enter a valid email address').isEmail(),
        check('password', 'password must be more than 4 characters and must be alphanumeric').isLength({
            min: 4
        }),
        check('phone', 'must be a number').isLength({
            max: 11
        }).isNumeric(),
        check('address', 'address is required').not().isEmpty()
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
            password,
            name,
            phone,
            address
        } = req.body;

        try {
            if (contains(email, 'admin-')) {
                role = 'admin';

                let admin = await Admin.findOne({
                    email
                })

                if (admin) {
                    return res.status(400).json({
                        errors: [{
                            msg: 'Invalid credentials'
                        }]
                    });
                }

                admin = new Admin({
                    name,
                    email,
                    password,
                    phone,
                    role
                });

                const salt = await bcrypt.genSalt(10);
                admin.password = await bcrypt.hash(password, salt);

                await admin.save();

                const payload = {
                    user: {
                        id: admin.id,
                        role: admin.role
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

            } else {

                let user = await User.findOne({
                    email
                });

                if (user) {
                    return res.status(400).json({
                        errors: [{
                            msg: 'User already exists'
                        }]
                    });
                }

                const avatar = gravatar.url(email, {
                    s: '200',
                    r: 'pg',
                    d: 'mm'
                })

                user = new User({
                    name,
                    email,
                    password,
                    phone,
                    avatar,
                    address,
                    role
                });

                const salt = await bcrypt.genSalt(10);
                user.password = await bcrypt.hash(password, salt);

                await user.save();

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
            }

        } catch (error) {
            console.error(error.message);
            res.status(500).json('Server Error')
        }
    }
);

router.delete('/delete', async (req, res) => {
    try {
        await User.remove()
        res.status(200)
    } catch (error) {
        console.error(error);
    }
})

//route to create and update car listidngs
router.get('/cars', (req, res) => {
    res.send('hello');
});

module.exports = router;