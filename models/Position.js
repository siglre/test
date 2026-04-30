const mongoose = require('mongoose');

const PositionSchema = new mongoose.Schema ({
    Name: {
        type: String,
        requred: [true,'Наименование должности '],
        thim: true
    },
    Payment: {
        type: String,
        required: [true,'Выберите тип оплаты'],
        enum: {
            values: ['shift', 'hourly']
        }
    },
    Rate: {
        type:Number,
        required: [true,'Сумма оплаты'],
        min: [0,'Оплата  не может быть отрицательной']
    }
});
const Position = mongoose.model('Position',PositionSchema );
module.exports = Position;