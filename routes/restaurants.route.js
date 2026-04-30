const express = require('express');
const Restaurant = require('../models/Restaurant'); 
const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const restaurants = await Restaurant.find()
            .populate('LegalEntity', 'name isActive'); 
        
        res.json(restaurants);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


router.post('/', async (req, res) => {
    try {
        const restaurant = new Restaurant({
            name: req.body.name,
            address: req.body.address,
            Contactnumber: req.body.Contactnumber,
            LegalEntity: req.body.LegalEntity,
            isActive: req.body.isActive !== undefined ? req.body.isActive : true
        });

        const newRestaurant = await restaurant.save();
        

        await newRestaurant.populate('LegalEntity');
        
        res.status(201).json(newRestaurant);
    } catch (err) {
        if (err.code === 11000) {
            return res.status(400).json({ error: 'Ресторан с таким названием уже существует' });
        }
        res.status(400).json({ error: err.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const deletedRestaurant = await LegalRestaurant.findByIdAndDelete(req.params.id);
        
        if (!deletedRestaurant) {
            return res.status(404).json({ error: 'Ресторан  не найден' });
        }
        
        res.json({ 
            message: 'Ресторан успешно удален',
            deletedRestaurant
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


module.exports = router;