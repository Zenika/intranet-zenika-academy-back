/* eslint-disable no-undef */
const httpMethod = require('../testApiMethodService');

describe('Test User Controller Api call', () => {
  let testAdminUserId = '';
  let testAdminUserRole = 0;

  let testStudentUserId = '';
  let testStudentUserRole = 0;

  it('Get all Users (fail)', async (done) => {
    await httpMethod.get('/api/user')
      .expect(404);
    done();
  });

  it('Create a new user with admin role', async (done) => {
    const body = {
      firstName: 'prénomTestPost',
      lastName: 'nomTestPost',
      role: 'admin',
      email: 'tatayoyo@gmail.com',
    };
    const response = await httpMethod.post('/api/users', body).expect(201);
    testAdminUserId = response.body.id;
    testAdminUserRole = response.body.role;
    expect(response.body.id).toEqual(expect.any(Number));
    expect(response.body.firstName).toEqual(body.firstName);
    expect(response.body.lastName).toEqual(body.lastName);
    expect(response.body.email).toEqual(body.email);
    expect(response.body.role).toEqual(1);
    expect(response.body.password).not.toEqual(body.password);
    done();
  });

  it('Update the created admin user', async (done) => {
    const bodyUpdate = {
      firstName: 'prénomTestUpdate',
      lastName: 'nomTestUpdate',
      role: testAdminUserRole,
      email: 'tatayoyo@gmail.com',
    };

    const response = await httpMethod.put(`/api/users/${testAdminUserId}/update`, bodyUpdate).expect(200);

    expect(response.body[0]).toBe(1);

    done();
  });

  it('Delete the created admin user', async (done) => {
    await httpMethod.delete(`/api/users/${testAdminUserId}`).expect(200);
    done();
  });

  it('Create a new user with student role', async (done) => {
    const body = {
      firstName: 'prénomTestPost',
      lastName: 'nomTestPost',
      role: 'student',
      email: 'tatayoyo@gmail.com',
    };
    const response = await httpMethod.post('/api/users', body).expect(201);
    testStudentUserId = response.body.id;
    testStudentUserRole = response.body.role;
    expect(response.body.id).toEqual(expect.any(Number));
    expect(response.body.firstName).toEqual(body.firstName);
    expect(response.body.lastName).toEqual(body.lastName);
    expect(response.body.email).toEqual(body.email);
    expect(response.body.role).toEqual(3);
    expect(response.body.password).not.toEqual(body.password);
    done();
  });

  it('Update the created student user', async (done) => {
    const bodyUpdate = {
      firstName: 'prénomTestUpdate',
      lastName: 'nomTestUpdate',
      role: testStudentUserRole,
      email: 'tatayoyo@gmail.com',
    };

    const response = await httpMethod.put(`/api/users/${testStudentUserId}/update`, bodyUpdate).expect(200);

    expect(response.body[0]).toBe(1);

    done();
  });

  it('Delete the created student user', async (done) => {
    await httpMethod.delete(`/api/users/${testStudentUserId}`).expect(200);
    done();
  });
});
