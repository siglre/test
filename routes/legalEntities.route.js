const express = require('express');
const LegalEntity = require('../models/LegalEntity'); 
const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const entities = await LegalEntity.find();
        res.json(entities);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.post('/', async (req, res) => {
    try {
        const entity = new LegalEntity({
            name: req.body.name,
            isActive: req.body.isActive !== undefined ? req.body.isActive : true
        });

        const newEntity = await entity.save();
        res.status(201).json(newEntity);
    } catch (err) {
        if (err.code === 11000) {
            return res.status(400).json({ error: 'Юрлицо с таким названием уже существует' });
        }
        res.status(400).json({ error: err.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const deletedEntity = await LegalEntity.findByIdAndDelete(req.params.id);
        
        if (!deletedEntity) {
            return res.status(404).json({ error: 'Юрлицо не найдено' });
        }
        
        res.json({ 
            message: 'Юрлицо успешно удалено',
            deletedEntity 
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});



module.exports = router;