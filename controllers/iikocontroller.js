const IikoService = require('../services/iiko.service');

class IikoController {
    constructor() {
        this.iikoService = new IikoService();
    }

    normalizeOrganizationId(organizationId) {
        const guidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
        const rawOrganizationId = organizationId || this.iikoService.organizationId;

        if (!rawOrganizationId) {
            return { error: 'Pass organizationId in body or set IIKO_ORGANIZATION_ID in .env' };
        }

        const preparedOrganizationId = String(rawOrganizationId).trim();
        if (
            (preparedOrganizationId.startsWith('{{') && preparedOrganizationId.endsWith('}}')) ||
            preparedOrganizationId.includes('{{') ||
            preparedOrganizationId.includes('}}')
        ) {
            return { error: 'organizationId looks like template. Pass a real GUID value' };
        }

        const normalizedOrganizationId = preparedOrganizationId
            .replace(/^\{/, '')
            .replace(/\}$/, '');

        if (!guidRegex.test(normalizedOrganizationId)) {
            return { error: 'Invalid organizationId format. GUID expected' };
        }

        return { value: normalizedOrganizationId };
    }

    getTerminalGroups = async (req, res) => {
        try {
            console.log('Запрос терминальных групп');
            const result = await this.iikoService.getTerminalGroups();

            res.json({
                success: true,
                data: result
            });
        } catch (error) {
            console.error('Ошибка в getTerminalGroups:', error);
            res.status(500).json({
                success: false,
                error: error.message
            });
        }
    };

    getOrganizationInfo = async (req, res) => {
        try {
            console.log('Запрос информации об организации');
            const result = await this.iikoService.getTerminalGroups();

            res.json({
                success: true,
                data: result
            });
        } catch (error) {
            console.error('Ошибка в getOrganizationInfo:', error);
            res.status(500).json({
                success: false,
                error: error.message
            });
        }
    };

    getMenu = async (req, res) => {
        try {
            const menuData = await this.iikoService.getIdMenus();
            res.status(200).json({
                menuData
            });
        } catch (err) {
            console.log(err);

        }
    }
    getMenuById = async (req, res) => {
        try {
            // const { idmenu } = req.body;
            // const menuId = "46885";
            const menuData = await this.iikoService.getExternalMenus("46885");
            res.status(200).json({

                menuData
            });
        } catch (err) {
            console.log(err);

        }
    }

    getCategories = async (req, res) => {
        try {
            const { organizationId } = req.body || {};
            const normalizedOrgIdResult = this.normalizeOrganizationId(organizationId);

            if (normalizedOrgIdResult.error) {
                return res.status(400).json({
                    success: false,
                    error: normalizedOrgIdResult.error
                });
            }

            const categories = await this.iikoService.getCategories({
                organizationId: normalizedOrgIdResult.value
            });

            return res.status(200).json({
                success: true,
                total: categories.length,
                data: categories
            });
        } catch (error) {
            const details = error.response?.data || error.message;
            return res.status(500).json({
                success: false,
                error: 'Failed to get iiko categories',
                details
            });
        }
    };

    createIikoCardGuest = async (req, res) => {
        try {
            const { organizationId, phone, name } = req.body;
            const normalizedPhone = String(phone || '').trim();
            const normalizedName = String(name || '').trim();

            if (!normalizedPhone) {
                return res.status(400).json({
                    success: false,
                    error: 'phone is required'
                });
            }

            if (!normalizedName) {
                return res.status(400).json({
                    success: false,
                    error: 'name is required'
                });
            }

            const normalizedOrgIdResult = this.normalizeOrganizationId(organizationId);
            if (normalizedOrgIdResult.error) {
                return res.status(400).json({
                    success: false,
                    error: normalizedOrgIdResult.error
                });
            }

            const data = await this.iikoService.createIikoCardGuest({
                organizationId: normalizedOrgIdResult.value,
                phone: normalizedPhone,
                name: normalizedName
            });

            return res.status(200).json({
                success: true,
                data
            });
        } catch (error) {
            const details = error.response?.data || error.message;
            return res.status(500).json({
                success: false,
                error: 'Failed to create/update iikoCard guest',
                details
            });
        }
    };

    getIikoCardGuestInfo = async (req, res) => {
        try {
            const { organizationId, type, phone, cardTrack, cardNumber, email, id } = req.body || {};
            const normalizedType = String(type || '').trim();
            const allowedTypes = ['phone', 'cardTrack', 'cardNumber', 'email', 'id'];

            if (!normalizedType || !allowedTypes.includes(normalizedType)) {
                return res.status(400).json({
                    success: false,
                    error: 'type is required and must be one of: phone, cardTrack, cardNumber, email, id'
                });
            }

            const normalizedOrgIdResult = this.normalizeOrganizationId(organizationId);
            if (normalizedOrgIdResult.error) {
                return res.status(400).json({
                    success: false,
                    error: normalizedOrgIdResult.error
                });
            }

            const normalizedPayload = {
                organizationId: normalizedOrgIdResult.value,
                type: normalizedType,
                phone: phone ? String(phone).trim() : undefined,
                cardTrack: cardTrack ? String(cardTrack).trim() : undefined,
                cardNumber: cardNumber ? String(cardNumber).trim() : undefined,
                email: email ? String(email).trim() : undefined,
                id: id ? String(id).trim() : undefined
            };

            const typeFieldMap = {
                phone: 'phone',
                cardTrack: 'cardTrack',
                cardNumber: 'cardNumber',
                email: 'email',
                id: 'id'
            };

            const requiredField = typeFieldMap[normalizedType];
            if (!normalizedPayload[requiredField]) {
                return res.status(400).json({
                    success: false,
                    error: `field ${requiredField} is required for type ${normalizedType}`
                });
            }

            const data = await this.iikoService.getIikoCardGuestInfo(normalizedPayload);

            return res.status(200).json({
                success: true,
                data
            });
        } catch (error) {
            const details = error.response?.data || error.message;
            const errorCode = String(error.response?.data?.errorCode || '');
            if (errorCode === 'Validation_IncorrectPhone') {
                return res.status(404).json({
                    success: false,
                    error: 'Guest not found by this phone in selected organization',
                    details
                });
            }

            return res.status(500).json({
                success: false,
                error: 'Failed to get iikoCard guest info',
                details
            });
        }
    };
}

module.exports = IikoController;
