var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});
router.get('/PersonalChat', function(req, res, next) {
    console.log(req.user);
    if(req.user){
         res.render('PersonalChat');
    }
    else {
         res.render('index');
    }
 
});
router.get('/PersonLogin', function(req, res, next) {
  res.render('PersonLogin');
});
router.get('/StrangerChat', function(req, res, next) {
  res.render('StrangerChat');
});


router.post('/setUsersDetails',function(req,res)
{
	console.log(req.db);

var query = {
        mobile_no: req.body.mobile_no
    };


req.db.collection('UsersDetails').find(query,{_id : 0}).toArray(function(err,objs){

   if(objs.length===0)
        {
          
req.db.collection('UsersDetails').insertOne(req.body,function(err)
    {
        if(err)
        {
            res.json({msg:"ERROR OCCURRED"});
            throw err;
        }
        console.log('done');
       res.json({msg:"ok"});
    })
}
else{
  res.json({msg:"USER ALREADY EXISTS."});
}
});
});

router.get('/logout', function(req, res) {
    req.session_state.reset();
    res.redirect('/');
});
router.get('/mobno', function(req, res) {
    
    res.send(''+req.session_state.user.mobile_no);
});


router.post('/login',function(req,res){
    var query={
        mobile_no:req.body.login_number,
        password:req.body.login_password
    };
    console.log(query);
    req.db.collection('UsersDetails').find(query, { _id: 0 }).toArray(function (err,objs)
    {

        if(err){
            console.log('Error'+err.toString);
            throw err;
        }
        //console.log("hello"+objs);
        
        if(objs.length===1) {
            req.session_state.user = objs[0];
            console.log(req.session_state.user);
            res.json({msg: 'ok', addr : "/PersonalChat"});
            


        }
        else
            res.json({msg:'WRONG USERNAME OR PASSWORD'});

        //req.db.close();
    });

    });

router.get('/logout', function(req, res) {
    req.session_state.reset();
    res.redirect('/');
});


router.get('/getPersons',function (req,res) {
    //var sk=parseInt(req.params.a);
    //req.db.collection('UsersDetails').find(query, { _id: 0 }).toArray(function ( err,objs){
        req.db.collection('UsersDetails').find().toArray(function ( err,objs){
        if(err)
        {
            res.json({msg:"ERROR OCCURRED"});
            throw err;
        }
        res.json(objs);
    })


});


/* GET home page. */
/*router.get('/*', function(req, res, next) {
  res.redirect('/');
});
*/
module.exports = router;
