

const express = require('express')
const app = express();
const port = 8383;
const Datastore = require('nedb');
const path = require('path');


let publicpath = path.join(__dirname , 'hangman');
const database = new Datastore('database.db');
database.loadDatabase();
const wordlist = new Datastore('wordlist.db');
wordlist.loadDatabase();



app.use(express.static('hangman'));
app.use(express.json());
app.use(express.urlencoded());

app.listen(port , ()=>{console.log('server has started on port : 8383')})

app.get('/' ,(req,res) =>{
    res.sendFile(`${publicpath}/index.html`);
})

app.get('/login' ,(req,res) =>{
    res.sendFile(`${publicpath}/login.html`);
})

app.get('/signup' ,(req,res) =>{
    res.sendFile(`${publicpath}/signUp.html`);
})


app.get('/info' , (req,res) =>{
    // res.send({name : 'hello'});
    wordlist.count({},  (err, count)=> {
        if (!err && count > 0) {
          // count is the number of docs
      
          // skip a random number between 0 to count-1
          var skipCount = Math.floor(Math.random() * count);
      
          wordlist.find({}).skip(skipCount).limit(1).exec((err2, docs)=> {
            if (!err2) {
                    res.send(docs);
            }
          });
        }
      });
})





let user = {username : "",password : ""};
app.post('/form' ,(req,res)=>{
    user.username = req.body.username;
    user.password = req.body.password;
    res.status(200).send({status : 'recieved'})
    // console.log(user);
})
app.get('/form' , (req,res) =>{
    database.find({username : user.username},(err,data) =>{
        if(err){
            res.end();
            return;
        }
        console.log(data);
        res.send(JSON.stringify(data));
    })
    
})




app.post('/database',(req,res)=>{
    // const {username , password,winCount} = req.body;
    console.log(req.body);
    database.insert(req.body)
    // if(!username || !password)
    //     return res.status(400).send({status :'failed'});
    res.status(200).send({statusk
         : 'recieved'});
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
