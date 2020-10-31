
const Joi = require('joi')

// User validation rules
module.exports = {
    create: Joi.object({
        name: Joi.string().min(1).max(128).required(),
        url: Joi.string().uri().required(),
        startTime: Joi.number().integer().required(),
        endTime: Joi.number().integer().required(),
        size: Joi.number().integer().required(),
    }),
    delete: Joi.object({
        id: Joi.string().required(),
    })
}
