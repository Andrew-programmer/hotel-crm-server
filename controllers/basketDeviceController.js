const {BasketDevice} = require("../models/models");
const {getUserIdFromJWT} = require("./functions");

class BasketDeviceController {
    async create(req, res) {
        try {
            const {deviceId} = req.query;
            const userId = getUserIdFromJWT(req.headers.authorization);
            const candidate = await BasketDevice.findOne({
                where: {
                    deviceId: deviceId
                }
            })

            if (!candidate) {
                const basketDevice = await BasketDevice.create({
                    deviceId,
                    basketId: userId,
                })

                return res.status(200).json({basketDevice});
            }

            res.status(400).json({message: 'Already exist'});
        } catch (e) {
            res.status(400).json({message: 'Creation error'})
        }
    }

    async delete(req, res) {
        try {
            const {id} = req.query;
            const basketDevice = await BasketDevice.destroy({
                where: {
                    id
                }
            })

            res.json({basketDevice});
        } catch (e) {
            res.status(400).json({message: 'Deleting error'})
        }
    }

    async getAllByUser(req, res) {
        try {
            const userId = getUserIdFromJWT(req.headers.authorization);
            const basketDevices = await BasketDevice.findAll({
                where: {
                    basketId: userId
                }
            })

            res.status(200).json({basketDevices});
        } catch (e) {
            res.status(400).json({message: 'Get error'})
        }
    }

    async deleteAllByUser(req, res) {
        try {
            const userId = getUserIdFromJWT(req.headers.authorization);
            const basketDevices = await BasketDevice.findAll({
                where: {
                    basketId: userId
                }
            })

            basketDevices.forEach((basketDevice) => {
                BasketDevice.destroy({
                    where: {
                        id: basketDevice.id
                    }
                })
            })

            res.status(200).json({message: 'Delete all successful'})
        } catch (e) {
            res.status(400).json({message: 'Delete all error'})
        }
    }

    async addOne(req, res) {
        try {
            const {id} = req.query;
            const oldBasketDevice = await BasketDevice.findOne({
                where: {
                    id
                }
            });
            const newCount = ++oldBasketDevice.count;
            const newBasketDevice = await BasketDevice.update({count: newCount}, {
                where: {
                    id
                }
            })

            return res.status(200).json({newBasketDevice});

        } catch (e) {
            console.log(e)
            res.status(400).json({message: 'Add one all error'})
        }
    }

    async removeOne(req, res) {
        try {
            const {id} = req.query;
            const oldBasketDevice = await BasketDevice.findOne({
                where: {
                    id
                }
            });
            if (oldBasketDevice.count > 1) {
                const newCount = --oldBasketDevice.count;
                const newBasketDevice = await BasketDevice.update({count: newCount}, {
                    where: {
                        id
                    }
                })

                return res.status(200).json({newBasketDevice});
            }

            return res.status(400).json({message: 'Value can not be 0'})
        } catch (e) {
            res.status(400).json({message: 'Add one all error'})
        }
    }
}

module.exports = new BasketDeviceController();
