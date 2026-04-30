const Position = require('../models/Position');

const createPosition = async(req, res) => {
    try {
        const position = await Positioncreate(req.body);
        res.status(201).json(position);
    }   catch (error) {
        res.status(400).json({error: error.message}) 
    }
};

const getPosition = async(req, res) => {
    try{
        const position = Position.find();
        res.status(201).json(position);
    }   catch (error) {
        res.status(400).json({error: error.message})
    }
};
const editPos = async(req, res) =>{
    try{
        const id = req.params.id
        const {name, payment, rate} = req.body;

        const position = Position.findByIdAndUpdate();

    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const deletePosition = async (req, res) => {
    try {
        const deletedPosition = await LegalEntity.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Deleted successfully'});
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = {
    createPosition,
    getPosition,
    deletePosition
};