const joi = require("joi");
const reviewSchema = joi.object({
    review: joi.number().required(),
    comment: joi.string().required(),
    reviewerName: joi.string(),
});

module.exports = reviewSchema;
