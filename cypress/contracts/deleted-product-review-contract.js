const Joi = require('joi');

const deletedProductReviewWooCommerceSchema = Joi.object({
    deleted: Joi.boolean().required(),
    previous: Joi.object({
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
        }).required()
    }).required()
}).required()

export default deletedProductReviewWooCommerceSchema