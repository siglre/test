const mongoose = require('mongoose');

const legalEntitySchema = new mongoose.Schema ({
    name: {
        type: String,
        required: [ true, 'Название юридического лица'],
        trim: true,
        unique: true
    },

    isActive: {
        type: Boolean,
        default: true
    }
});
const LegalEntity = mongoose.model('LegalEntity', legalEntitySchema);


ваыва
module.exports = LegalEntity;