const express = require('express');
const http = require('http');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const promotions = require('./routes/promotions');
const users = require('./routes/users');
const programs = require('./routes/programs');
const {verifyJwt} = require('./utils/jwt');

if(!process.env.JWT_SECURITY_KEY){
  throw new Error("ERROR: JWT_SECURITY_KEY env variable not set")
}
if(!process.env.COOKIE_SECURITY_KEY){
  throw new Error("ERROR: COOKIE_SECURITY_KEY env variable not set")
}
const port = process.env.PORT || '4000';
const app = express();

app.use(cors({
  origin: [
    `${process.env.FRONT_URL}`,
    'http://localhost:3000'
  ],
  credentials: true
}));
app.set('view engine', 'pug');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept',
  );
  next();
});

app.use(cookieParser(
  process.env.COOKIE_SECURITY_KEY
))

app.use(async (req, res, next) => {
  if(req.url === "/api/users/signin"){
    next();
    return;
  }
  const token = req.cookies.token || '';
  try{
    const result = await verifyJwt(token);
    if(!result){
      res.sendStatus(403);
      console.error("ERROR: Could not verify JWT");
      return;
    }
    next();
  }catch(err){
    res.status(403).send(err);
  }
  
})

app.use('/api/users', users);
app.use('/api/programs', programs);
app.use('/api/promotions', promotions);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use((err, req, res) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = err;

  // render the error page
  res.status(err.status || 500);
  res.send(res.locals.message);
});

module.exports = app;

if (require.main === module) {
  const server = http.createServer(app);
  // eslint-disable-next-line no-console
  server.listen(port, () => console.log(`Server started on port ${port}`));
}
