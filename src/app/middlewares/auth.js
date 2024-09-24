import jwt from 'jsonwebtoken';
import autConfig from '../../config/auth';

function authMiddLeware(request, response, next) {
  const authToken = request.headers.authorization;

  if (!authToken) {
    return response.status(401).json({ error: 'Token not provided' });
  }

  const token = authToken.split(' ').at(1);

  try {
    jwt.verify(token, autConfig.secret, (err, decoded) => {
      if (err) {
        throw new Error();
      }

      request.userId = decoded.id;
      request.userName = decoded.name;
    });
  } catch (err) {
    return response.status(401).json({ error: 'Token is invalid' });
  }
  return next();
}

export default authMiddLeware;
