const router = require('express').Router();
const { hashSync, compareSync } = require('bcrypt');
const { sign } = require('jsonwebtoken');

const CustomerModel = require('../../models/customer');


router.post('/register', async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const customerWithSameEmail = await CustomerModel.findOne({ email }).exec();

        if (customerWithSameEmail) {
            res.status(400).json({ errorMessage: 'Email already Exist' });
            return;
        }

        const createdCustomer = await new CustomerModel({
            name,
            email,
            password: hashSync(password)
        }).save();

        res.status(201).json({
            customer_id: createdCustomer._id,
            timestamp: createdCustomer.timestamp
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ errorMessage: error.message });
    }
})

router.post('/login', async (req, res) => {
    try {

        const { email, password } = req.body;

        const customerWithEmail = await CustomerModel.findOne({ email }).exec();

        if (!customerWithEmail) {
            res.status(400).json({ errorMessage: 'Customer does\'nt exist' });
            return;
        }

        if (compareSync(password)) {
            res.send(200).json({
                email,
                token: sign({ _id: customerWithEmail.__id })
            });
        } else {
            res.status(401).json({ errorMessage: 'Email and Password did not match' });
            return;
        }

    } catch (error) {
        console.error(error);
        res.status(500).json({ errorMessage: error.message });
    }
})


module.exports = router;
