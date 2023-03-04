const Joi = require("joi");

const dataValidator = (date) => {
  const schema = Joi.object({
    fileName: Joi.string().required(),
    content: Joi.string().required(),
  });

  return schema.validate(date);
};

module.exports = dataValidator;
