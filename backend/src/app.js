const path = require('path');
const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const redirectSsl = require('redirect-ssl');
const promotions = require('./routes/promotions');
const users = require('./routes/users');
const programs = require('./routes/programs');
const { verifyJwt } = require('./utils/jwt');

if (!process.env.JWT_SECRET) {
  throw new Error('ERROR: JWT_SECRET env variable not set');
}
if (!process.env.COOKIE_SECRET) {
  throw new Error('ERROR: COOKIE_SECRET env variable not set');
}

const port = process.env.PORT || '4000';
const app = express();

app.use(redirectSsl);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser(process.env.COOKIE_SECRET));

app.use(async (req, res, next) => {
  if (!req.url.startsWith('/api') || req.url === '/api/users/signin') {
    next();
    return;
  }
  const token = req.cookies.token || '';
  try {
    await verifyJwt(token);
    next();
  } catch (err) {
    res.status(403).send(err);
    console.error('ERROR: Could not verify JWT', err);
  }
});

app.use('/api/users', users);
app.use('/api/programs', programs);
app.use('/api/promotions', promotions);

if (
  process.env.SERVE_FRONTEND === 'true' ||
  process.env.NODE_ENV === 'production'
) {
  // serve front-end
  const assetFolder = path.resolve('./public');
  app.use(express.static(assetFolder));
  app.use((req, res) => {
    res.sendFile(path.join(assetFolder, 'index.html'));
  });
  console.log('serving files from', assetFolder);
}

module.exports = app;

if (require.main === module) {
  const server = http.createServer(app);
  // eslint-disable-next-line no-console
  server.listen(port, () => console.log(`Server started on port ${port}`));
}
