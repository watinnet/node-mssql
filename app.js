var express=require('express');
var bodyParser=require('body-parser');
var path=require('path');

var app=express();

//View Engine

app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));

// Body Parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

//Set static path
app.use(express.static(path.join(__dirname,'public')));
app.get('/',function(req,res){
    console.log('Running');
    GetData(function(result){
        console.log(result);
        
        res.render('index',{
            title:result.rowsAffected,
            age:6,
            products:result.recordsets[0]
          
        });
    });

    
    
   
 });

 function GetData(callback){
    const sql=require('mssql');
    var config={
        user:'nano',
        password:'Pwd12345',
        database:'MYDEMO',
        server:'10.121.99.251'
    };
    sql.close();
    sql.connect(config,err => {
        new sql.Request().query('SELECT * FROM products', (err, result) => {
            // ... error checks
            callback(result);
            //console.dir(result)
        });
    });
    

    
 }

 app.listen('3001',function(){
    
        console.log("Server started on port 3001 ... ");
    });