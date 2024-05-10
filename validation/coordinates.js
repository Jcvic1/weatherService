import Joi from 'joi';

function validateCoordinates(coordinates) {
  const schema = Joi.object({
    lat: Joi.number().precision(4).prefs({ convert: false }),
    long: Joi.number().precision(4).prefs({ convert: false })
  });

  return schema.validate(coordinates);
}


export default validateCoordinates;