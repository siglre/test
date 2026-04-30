const express = require('express');
const Employee = require('../models/Employee'); 
const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const employees = await Employee.find()
            .populate('Restaurant')
            .populate('Position');
        
        res.json(employees);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.post('/', async (req, res) => {
    try {
        const employee = new Employee({
            Name: req.body.Name,
            Phone: req.body.Phone,
            Restaurant: req.body.Restaurant,
            Position: req.body.Position,
            Login: req.body.Login,
            Password: req.body.Password
        });

        const newEmployee = await employee.save();
        res.status(201).json(newEmployee);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});


module.exports = router;