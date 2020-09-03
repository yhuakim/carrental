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
    console.log(req.user)
    try {
        if (req.user.role === 'admin') {
            let admin = await Admin.findById(req.user.id).select(['-password', '-phone']);
            if (admin) {
                return res.json(admin)
            }

            console.log(res.json(admin))
        }

        let user = await User.findById(req.user.id).select(['-password', '-phone', '-address']);

        if (user) {
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
                        id: user.id,
                        role: user.role
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

            if (admin) {
                const isMatch = await bcrypt.compare(password, admin.password);

                if (!isMatch) {
                    return res.status(400).json({
                        errors: [{
                            msg: 'Invalid Credentials'
                        }]
                    });
                }

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
            }


        } catch (error) {
            console.error(error.message);
            res.status(500).json('Server Error')
        }
    }
);

router.delete('/delete', async (req, res) => {
    try {
        await Admin.remove()
    } catch (error) {
        console.error(error);
    }
})


module.exports = router