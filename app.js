var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var clientSessions = require("client-sessions");
var bodyParser = require('body-parser');
var http = require('http');

var index = require('./routes/index');
var users = require('./routes/users');

var app = express();


var port = normalizePort(process.env.PORT || '3000');
app.set('port', port);
var server = http.createServer(app);


server.listen(port,()=>{
	console.log('listning on '+ port);
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');





app.use(clientSessions({
    // cookie name dictates the key name added to the request object
    secret: 'infinixnote4miredmi3s', // should be a large unguessable string
    duration: 24 * 60 * 60 * 1000, // how long the session will stay valid in ms
    httpOnly: true,
    secure: true,
    ephemeral: true,

    activeDuration: 1000 * 60 * 15// if expiresIn < activeDuration, the session will be extended by activeDuration milliseconds

}));
app.use(function (req, res, next) {
require('./routes/db')(req,next);
});
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));



app.use(function(req, res, next) {
    
    if (req.session_state && req.session_state.user) {
      console.log();
   
        req.db.collection('UsersDetails').findOne({ mobile_no: req.session_state.user.mobile_no },{_id : 0, password : 0}, function(err, user) {
         if (user) {
          if(user._id){
            delete user._id;
          }
          if(user.password){
            delete user.password;
          }
         req.user = user;
         req.session_state.user = user;  //refresh the session value
         res.locals.user = user;
         }
        console.log(req.user);
         next();
         });
    }
   else
    {
      next();
    }
});





var chat  = require('./routes/chat')(server);
app.use('/', index);
app.use('/chat' , chat)
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
console.log(err.message);
  // render the error page
  res.status(err.status || 500);
  res.render('error');
}); 



function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

