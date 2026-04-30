const express = require('express');
const Position = require('../models/Position'); 
const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const positions = await Position.find();
        res.json(positions);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.post('/', async (req, res) => {
    try {
        const position = new Position({
            Name: req.body.Name,
            Payment: req.body.Payment
        });

        const newPosition = await position.save();
        res.status(201).json(newPosition);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const deletedposition = await Legalposition.findByIdAndDelete(req.params.id);
        
        if (!deletedposition) {
            return res.status(404).json({ error: 'Должность не найдена' });
        }
        
        res.json({ 
            message: 'Должность успешно удалена',
            deletedposition 
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;