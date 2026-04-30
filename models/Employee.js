const mongoose = require('mongoose');
const Position = require('../models/Position');
const Restaurant = require('../models/Restaurant');

const EmployeeSchema = new mongoose.Schema ({
    Name: {
        type: String,
        required: [true,'ФИО'],
        trim: true
    },
    
    Phone: {
        type: String,
        required: [true,'Номер телефона'],
        trim: true
    },
    
    Restaurant: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Restaurant',
        required: [true,'Ресторан'],
    },

    Position: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Position',
        required: [true,'Position'],
    },

    Login: {
        type: String,
        required: [true,'Логин'],
        trim: true,
        unique: true
    },

    Password: {
        type: String,
        required: [true,'Пароль'],
        trim: true
    }
});

const Employee = mongoose.model('Employee',EmployeeSchema );
module.exports = Employee;


