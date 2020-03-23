const bcrypt = require('bcryptjs');
const httpMethod = require('../testApiMethodService');
const { Users } = require('../../src/models');
const { createJwt } = require('../../src/utils/jwt');

describe('Test User Controller Api call', () => {
  const defaultUser = {
    role: 1,
    firstName: 'jwt',
    lastName: 'jwt',
    email: 'jwt@zenika.com',
  };

  const exampleUser = {
    role: 1,
    firstName: 'example',
    lastName: 'example',
    email: 'example@zenika.com',
    password: 'admin',
  };

  let token = '';

  beforeAll(async () => {
    process.env.JWT_SECRET = 'jwt secret for tests';
    await Users.create({
      ...defaultUser,
      password: await bcrypt.hash('jwt', 10),
    });
    token = await createJwt(defaultUser);
  });

  it('Calls a protected route without cookies (fail)', async (done) => {
    await httpMethod.get('/api/users').expect(403);
    done();
  });

  it('Creates an user, signin, call a protected route', async (done) => {
    await httpMethod
      .post('/api/users', token, {
        email: exampleUser.email,
        role: 'admin',
        firstName: exampleUser.firstName,
        lastName: exampleUser.lastName,
      })
      .expect(201);
    const signinResponse = await httpMethod
      .post('/api/users/signin', undefined, {
        email: exampleUser.email,
        password: exampleUser.password,
      })
      .expect(200);
    const signin = signinResponse.body;
    console.log('signin', signin);
    await httpMethod.get('/api/users', token).expect(200);
    done();
  });
});
