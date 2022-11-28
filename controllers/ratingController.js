const {Rating} = require('../models/models');
const {getUserIdFromJWT} = require('./functions');

class RatingController {
    async create(req, res) {
        try {
            let {rate} = req.body;
            rate = +rate;
            const {deviceId} = req.query;
            const userId = getUserIdFromJWT(req.headers.authorization);

            const rating = await Rating.create({
                rate,
                userId,
                deviceId
            })

            res.status(200).json({rating});
        } catch (e) {
            res.status(400).json({message: 'Create rating error'});
        }
    }

    async getAverage(req, res) {
        try {
            const {deviceId} = req.query;
            const allRatings = await Rating.findAll({
                where: {
                    deviceId: deviceId
                }
            })
            res.status(200).json({allRatings});
        } catch (e) {
            res.status(400).json({message: 'Get average rating error'});
        }
    }

    async getAll(req, res){
        try{
            const rating = await Rating.findAll();
            res.status(200).json({rating});
        } catch (e){
            res.status(400).json({message: 'Get ratings error'});
        }
    }

    async getOne(req, res) {
        try {
            const {deviceId} = req.query;
            const userId = getUserIdFromJWT(req.headers.authorization);

            const rating = await Rating.findOne({
                where: {
                    deviceId,
                    userId
                }
            })

            res.status(200).json({rating})
        } catch (e) {
            res.status(400).json({message: 'Get rating error'})
        }
    }

    async update(req, res) {
        try {
            let {rate} = req.body;
            rate = +rate;
            console.log(rate);
            const {deviceId} = req.query;
            const userId = getUserIdFromJWT(req.headers.authorization);

            const rating = await Rating.update({
                rate
            }, {
                where: {
                    userId,
                    deviceId
                }
            })

            res.status(200).json({rating})
        } catch (e) {
            console.log(e);
            res.status(400).json({message: 'Update rating error'})
        }
    }

    async delete(req, res) {
        try {
            const {deviceId} = req.query;
            const userId = getUserIdFromJWT(req.headers.authorization);

            await Rating.destroy({
                where: {
                    userId,
                    deviceId
                }
            })

            res.status(200).json({message: 'Delete rating success'});

        } catch (e) {
            res.status(400).json({message: 'Get rating error'})
        }
    }
}

module.exports = new RatingController();
