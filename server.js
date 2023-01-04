const express = require('express')
const mysql = require('mysql');
const app =express();
const port =8383;


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



const info = new Array;

app.get('/form' , (req,res) =>{
    res.send(JSON.stringify(info));
})
app.post('/',(req,res)=>{
    const {username , password } = req.body;
    console.log(req.body);
    info.push(req.body)
    // if(!username || !password)
    //     return res.status(400).send({status :'failed'});
    res.status(200).send({status : 'recieved'});
    console.log(info);
} )
