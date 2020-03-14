var express = require('express');

var app = express();

var handlebars = require('express-handlebars').create({defaultLayout:'main'});

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.use(express.static('public'));

var session = require('express-session');
app.use(session({secret:'SuperSecretPassword'}));


var mysql = require('mysql');
var pool = mysql.createPool({
  host  : 'classmysql.engr.oregonstate.edu',
  user  : 'cs290_clarjohn',
  password: '4049',
  database: 'cs290_clarjohn'
});

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', 7322);



/*Routes*/
app.get('/',function(req,res,next){
    var context = {};
    console.log("home rendered");
       pool.query('SELECT * FROM workouts', function(err, rows, fields){
        if(err){
          next(err);
          return;
        }
        context.results = JSON.stringify(rows);
        res.render('home', context);

       });

  });


 
app.post('/', function(req,res,next){
     console.log(req.body);
     console.log(req.body.name);
     console.log("Post Entered");
    pool.query("INSERT INTO workouts(`name`,`reps`,`weight`,`date`) VALUES (?,?,?,?)", [req.body.name, req.body.reps, req.body.weight, req.body.date], function(err, result){
        if(err){
          next(err);
          return;
        } 
        var context = {};
        console.log("home rendered");
           pool.query('SELECT * FROM workouts', function(err, rows, fields){
            if(err){
              next(err);
              return;
            }
           // return JSON.stringify(rows);
            res.end(JSON.stringify(rows)); 
        });
      
    });
  });


/*test routes*/
app.get('/reset-table',function(req,res,next){
    var context = {};
    pool.query("DROP TABLE IF EXISTS workouts", function(err){ 
      var createString = "CREATE TABLE workouts("+
      "id INT PRIMARY KEY AUTO_INCREMENT,"+
      "name VARCHAR(255) NOT NULL,"+
      "reps VARCHAR(255),"+
      "weight VARCHAR(255),"+
      "date VARCHAR(255),"+
      "lbs BOOLEAN)";
      pool.query(createString, function(err){
        context.results = "Table reset";
        res.render('home',context); 
      }) 
    });
  });


  /*boiler plate */
app.use(function(req,res){
  res.status(404);
  res.render('404');
});

app.use(function(err, req, res, next){
  console.error(err.stack);
  res.type('plain/text');
  res.status(500);
  res.render('500');
});


/*Console Log*/
app.listen(app.get('port'), function(){
  console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});
