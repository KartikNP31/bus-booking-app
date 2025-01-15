const express = require('express');
const router = express.Router();
const UserActions = require('../controller/UserActions');


router.get('/getAllCities', async (req, res) => {
    try {
        const response = await UserActions.getAllCities()
        return res.status(response.status).json(response);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
})

router.get('/getSearchBus', async (req, res) => {
    try {
        const response = await UserActions.getSearchBus(req.query)
        return res.status(response.status).json(response);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
})

router.get('/getPNR', async (req, res) => {
    try {
        const response = await UserActions.getPNR(req.query)
        return res.status(response.status).json(response);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
})

router.post('/postBookTicket', async (req, res) => {
    try {
        const response = await UserActions.postBookTicket(req.body)
        return res.status(response.status).json(response);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
})

module.exports = router;