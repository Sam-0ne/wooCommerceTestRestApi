const Joi = require('joi');

const productReviewWooCommerceSchema = Joi.object({
    id: Joi.number().required(),
    date_created: Joi.date().required(),
    date_created_gmt: Joi.date().required(),
    product_id: Joi.number().required(),
    product_name: Joi.string().required(),
    product_permalink: Joi.string().uri().required(),
    status: Joi.string().required(),
    reviewer: Joi.string().required(),
    reviewer_email: Joi.string().email({ tlds: { allow: false } }).required(),
    review: Joi.string().required(),
    rating: Joi.number().min(0).max(5).required(),
    verified: Joi.boolean().required(),
    reviewer_avatar_urls: Joi.object({
        24: Joi.string().uri().required(),
        48: Joi.string().uri().required(),
        96: Joi.string().uri().required()
    }).required(),
    _links: Joi.object({
        self: Joi.array().items(
            Joi.object({
                href: Joi.string().uri().required()
            }).required()
        ).required(),
        collection: Joi.array().items(
            Joi.object({
                href: Joi.string().uri().required()
            }).required()
        ).required(),
        up: Joi.array().items(
            Joi.object({
                href: Joi.string().uri().required()
            }).required()
        ).required()
    }).required()
}).required()

export default productReviewWooCommerceSchema