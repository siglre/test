const LegalEntity = require('../models/LegalEntity');

const createLegalEntity = async(req, res) => {
    try {
        const legalEntity = await LegalEntity.create(req.body);
        res.status(201).json(legalEntity);
    }  catch (error) {
       res.status(400).json({error: error.message});
    }
};

const getLegalEntity = async (req,res) => {
    try {
        const legalEntitys = await legalEntitys.find();
        res.status(201).json(legalEntitys);
    }   catch (error) {
        res.status(400).json({error: error.message});
    }
};

const deleteLegalEntity = async (req, res) => {
    try {
        const deletedEntity = await LegalEntity.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Deleted successfully'});
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = {
    createLegalEntity,
    getLegalEntity,
    deleteLegalEntity
};

