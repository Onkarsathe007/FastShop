const joi = require("joi");
const reviewSchema = joi.object({
	rating: joi.number().integer().min(1).max(5).required(),
	comment: joi.string().required(),
	reviewerName: joi.string().required(),
	date: joi.date().optional(),
	reviewer: joi.string().hex().length(24).required(),
	reviewerEmail: joi.string().email().required(),
});

module.exports = reviewSchema;
