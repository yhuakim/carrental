const express = require('express');
const {
    check,
    validationResult
} = require('express-validator');
const router = express.Router();
const Admin = require('../models/Admin')

//admin authorizations
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
            let admin = await Admin.findOne({
                email
            });

            if (!admin) {
                return res.status(400).json({
                    errors: [{
                        msg: 'User does not exist'
                    }]
                });
            }

            const isMatch = await bcrypt.compare(password, admin.password);

            if (!isMatch) {
                return res.status(400).json({
                    errors: [{
                        msg: 'User does not exist'
                    }]
                });
            }

            const payload = {
                admin: {
                    id: admin.id
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

        } catch (error) {
            console.error(error.message);
            res.status(500).json('Server Error')
        }
    }
);


//route to create and update car listings
router.post('/cars', (req, res) => {
    res.send('hello')
})

module.exports = router