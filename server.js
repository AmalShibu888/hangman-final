const { response } = require('express');
const express = require('express')
const mysql = require('mysql');
const app = express();
const port = 8383;

const Datastore = require('nedb');

const con =  mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : 'leo10@messi',
    database : "wordslist",


});

con.connect((err) =>{
    if(err)
    console.log(err);
    else
    console.log("connect");
} )


app.use(express.static('hangman'));
app.use(express.json());
app.use(express.urlencoded());

app.listen(port , ()=>{console.log('server has started on port : 8383')})

app.get('/info' , (req,res) =>{
    const word = con.query("SELECT * FROM BOOK1 ORDER BY RAND() LIMIT 1" , function(err,result,fields){
        if(err)
            console.log(err);
        else
            res.send(JSON.parse(JSON.stringify(result))[0]);
        
    })
    // next();
})



const database = new Datastore('database.db');
database.loadDatabase();

app.get('/form' , (req,res) =>{
    database.find({},(err,data) =>{
        if(err){
            res.end();
            return;
        }
        res.send(JSON.stringify(data));
    })
    
})
app.post('/',(req,res)=>{
    // const {username , password,winCount} = req.body;
    console.log(req.body);
    database.insert(req.body)
    // if(!username || !password)
    //     return res.status(400).send({status :'failed'});
    res.status(200).send({status : 'recieved'});
    // console.log(info);
} )

app.post('/logout' ,(req,res) =>{
    console.log(req.body);
        const data = req.body;
            database.find({username : data.username},(err,docs)=>{
                if(err)
                {
                    res.end();
                    return;
                }
                const tuple = docs[0];
                tuple.winCount += data.winCount;
                tuple.total += data.total;
                console.log(docs);
                database.update({ username: data.username }, tuple, {}, function (err, numReplaced) {});
                database.loadDatabase();
            })
    // console.log(info);
})
