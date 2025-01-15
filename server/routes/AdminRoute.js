const express = require('express');
const AdminActions = require('../controller/AdminActions');
const router = express.Router();


router.post('/addNewBus', async (req, res) => {
    try {
        const response = await AdminActions.addNewBus(req.body)
        return res.status(response.status).json(response);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
})

module.exports = router;