const { createJwt } = require('../../utils/jwt');
const bcrypt = require('bcryptjs');
const { Users } = require('../../models');

const saltRounds = 10;

module.exports = {
  getAllUsers: (req, res) =>
    Users.findAll({ raw: true })
      .then((content) => res.status(200).send(content))
      .catch((e) => res.status(400).send(e)),

  getUserById: async (req, res) => {
    try {
      const user = await Users.findOne({ where: { id: res.locals.user_id } });
      return res.status(200).send(user);
    } catch (error) {
      return res.status(400).send(error);
    }
  },

  userCreate: async (req, res) => {
    const { user } = res.locals;
    switch (user.role) {
      case 'admin':
        user.password = 'admin';
        user.role = 1;
        break;
      case 'teacher':
        user.password = 'teacher';
        user.role = 2;
        break;
      case 'student':
        user.password = 'student';
        user.role = 3;
        break;
      default:
        break;
    }
    try {
      user.password = await bcrypt.hash(user.password, saltRounds);
      const userCreated = await Users.create(user);
      return res.status(201).send(userCreated);
    } catch (error) {
      console.error(error);
      if (error.name === 'SequelizeUniqueConstraintError') {
        return res.status(409).send(error);
      }
      return res.status(400).send(error);
    }
  },

  userUpdate: async (req, res) => {
    const { user } = res.locals;
    const userId = Number(res.locals.user_id);
    const foundUser = await Users.findOne({ where: { id: userId } });
    if (!foundUser) res.status(403).json({ error: 'User not found' });
    try {
      const userUpdated = await Users.update(
        { ...user },
        { where: { id: userId } },
      );
      return res.status(200).send(userUpdated);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  },

  userSignIn: async (req, res) => {
    const { user } = res.locals;
    const foundUser = await Users.findOne({ where: { email: user.email } });
    if (!foundUser) res.status(401).json({ error: 'User not found' });
    try {
      const allowedUser = await bcrypt.compare(
        user.password,
        foundUser.password,
      );
      if (!allowedUser) throw new Error('wrong credentials');
      const payload = {
        role: foundUser.role,
        email: foundUser.email,
        promoId: foundUser.promotionId,
      };
      const token = await createJwt(payload);
      return res
        .cookie('token', token, {
          maxAge: process.env.COOKIE_MAX_AGE_IN_MS || 10 * 60 * 60 * 1000,
          httpOnly: true,
        })
        .status(200)
        .send(payload);
    } catch (error) {
      return res.status(403).json({ error: error.message });
    }
  },

  userDelete: async (req, res) => {
    try {
      await Users.destroy({ where: { id: res.locals.user_id } });
      return res.status(200).send('Deleted');
    } catch (error) {
      return res.status(400).send(error);
    }
  },
};
