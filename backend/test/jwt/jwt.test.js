/* eslint-disable no-undef */
const httpMethod = require('../testApiMethodService');

describe('Test User Controller Api call', () => {

  it('Call a protected route without cookies (fail)', async (done) => {
    await httpMethod.get('/api/user')
      .expect(403);
    done();
  });

});
