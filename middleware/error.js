import winston from 'winston';

const { error } = winston;

export default (err, req, res, next) => {
  error(err.message, err);

  res.status(500).send('Server error.');
}