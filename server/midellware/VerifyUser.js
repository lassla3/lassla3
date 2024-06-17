const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const verifyUser = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'No token provided!' });
    }

    const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
    const userId = decodedToken.id;

    const user = await prisma.user.findUnique({
      where: {
        id: userId
      }
    });

    if (!user) {
      return res.status(401).json({ message: 'User is not authorized' });
    }

    if (!user.isActive) {
      return res.status(401).json({ message: "You're banned. Please contact the admin to activate your account" });
    }

    req.user = { userId };
    next();
  } catch (error) {
    throw error
  }
}

module.exports = verifyUser;
