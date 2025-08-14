const joi = require("joi");
const reviewSchema = joi.object({
    rating: joi.number().integer().min(1).max(5).required(),
    comment: joi.string().required(),
    reviewerName: joi.string().required(),
    date: joi.date().optional(),
});

module.exports = reviewSchema;
