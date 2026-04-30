const mongoose = require('mongoose');
const LegalEntity = require('./LegalEntity');

const RestaurantSchema = new mongoose.Schema ({
    name: {
        type: String,
        required: [true, 'Название ресторана'],
        trim: true,
        unique: true
    },
    
    address: {
        type: String,
        required: [true, 'Адрес заведения'],
        trim: true
    },
    
    Contactnumber: {
        type: String,
        required: [true, 'Контактный телефон'],
        trim: true
    },

    LegalEntity: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'LegalEntity',
        required: [true, 'Юридическое лицо обязательно']
    },

    isActive: {
        type: Boolean,
        default: true
    }
});
const Restaurant = mongoose.model('Restaurant',RestaurantSchema );
module.exports = Restaurant;