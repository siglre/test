const Restaurant = require('../models/Restaurant')

const createRestaurant = async(req, res) => {
    try{
        const restaurant = await Restaurant.create(req.body);
        res.status(201).json(restaurant);
    }   catch (error) {
        res.status(400),json({error: error.message});
    }
};

const getRestaurant = async (req, res) => {
    try {
    const restaurants = await Restaurant.find ();
    res.status(201).json(restaurants);
    }   catch (error) {
    res.status(400).json({error: error.message});
    }
};

const deleteRestaurant = async (req, res) => {
    try {
        const deletedRestaurant = await LegalEntity.findByIdAndDelete(req.params.id);
        res.status(200).json({});
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = {
    createRestaurant,
    getRestaurant,
    deleteRestaurant
};