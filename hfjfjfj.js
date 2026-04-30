
const express = require('express');
const router = express.Router();
const IikoController = require('../controllers/iikocontroller');

const iikoController = new IikoController();


router.get('/terminal-groups', iikoController.getTerminalGroups);

router.get('/organization-info', iikoController.getOrganizationInfo);

router.get('/external-menus', iikoController.getMenuById);
router.get('/id-menus', iikoController.getMenu);
router.post('/categories', iikoController.getCategories);
router.post('/iikocard/guest', iikoController.createIikoCardGuest);
router.post('/iikocard/guest/info', iikoController.getIikoCardGuestInfo);
module.exports = router;
