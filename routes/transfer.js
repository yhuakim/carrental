const express = require('express');
const router = express.Router();
const Transfer = require('../models/BulkTransfer');

//add new bulk data
router.post('/new', async (req, res) => {
    try {
        const {
            bank_code,
            account_number,
            amount,
            currency,
            narration,
            reference
        } = req.body

        let data = await Transfer.findOne({
            account_number
        });

        if (data) {
            return res.status(400).json({
                errors: [{
                    msg: 'Account Number Already Exists'
                }]
            });
        }

        data = new Transfer({
            bank_code,
            account_number,
            amount,
            currency,
            narration,
            reference
        });

        await data.save();
        console.log(data)

        res.status(200).json({
            success: true,
            msg: "Data added Succesfully"
        })

    } catch (error) {
        console.error(error)
        res.status(500).json('Server Error')
    }
});

//get all bulk data
router.get('/data', async (req, res) => {
    try {
        const data = await Transfer.find();

        res.status(200).json({
            success: true,
            data
        })

    } catch (error) {
        console.error(error)
        res.status(500).json({
            msg: "Server Error"
        })
    }
})

//clear all or delete one
router.delete('/delete/:id', async (req, res) => {
    try {
        const data = await Transfer.findById(req.params.id);
        await data.remove();
        return res.status(200).json({
            success: true
        })
    } catch (error) {
        console.error(error);
        res.status(500).json({
            msg: 'Server Error'
        })
    }
})

module.exports = router;