

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





let user = {username : "",password : "",winCount : 0,total :0,stat :0};
// let stat = false;
app.post('/form' ,(req,res)=>{
    user.username = req.body.username;
    user.password = req.body.password;
    res.status(200).send({status : 'recieved'})
    console.log(user);
})
app.get('/form' , (req,res) =>{
    // console.log("fgbjkdbkjf");
    database.find({username : user.username},(err,data) =>{
        // console.log("fgbjkdbkjf");
        if(err){
            console.log(err);
            res.end();
            return;
        }
        // console.log("GRTTT",data);
        if(data.length == 1)
        {
            user.winCount = data[0].winCount;
            user.total = data[0].total;
        }
        else
            user.stat = false;
        res.send(JSON.stringify(data));
        console.log("user1 : ",user);
    })
    
    
})

app.post('/stat' ,(req , res)=>{
    user.stat = req.body.stat;
    console.log('stat : ',user);
    res.status(200).send({statusk
        : 'recieved'});
})

app.get('/stat' ,(req,res) =>{
    console.log("user : ",user);
    res.send(user);
})


app.post('/update' , (req,res)=>{
    user = req.body;
    console.log('statssss : ',user);
    if(user.stat == 1)
    {
        database.find({username : user.username},(err,docs)=>{
            if(err)
            {
                res.end();
                return;
            }
            const tuple = docs[0];
            tuple.winCount = user.winCount;
            tuple.total = user.total;
            console.log(docs);
            database.update({ username: user.username }, tuple, {}, function (err, numReplaced) {});
            database.loadDatabase();
        })
    }
    
    res.status(200).send({statusk
        : 'recieved'});
})

app.post('/database',(req,res)=>{
    // const {username , password,winCount} = req.body;
    console.log(req.body);
    database.insert(req.body)
    user.stat = 1;
    res.status(200).send({statusk
         : 'recieved'});
    // console.log(info);
} )


app.get('/leaderboard', (req,res)=>{
    database.find({}).sort({winCount : 1}).limit(10).exec((err,docs)=>{
        if(err)
            console.log(err);
        else
            res.send(docs);
    })
})
// app.post('/logout' ,(req,res) =>{
//     console.log(req.body);
//         const data = req.body;
//         database.find({username : data.username},(err,docs)=>{
//             if(err)
//             {
//                 res.end();
//                 return;
//             }
//             const tuple = docs[0];
//             tuple.winCount += data.winCount;
//             tuple.total += data.total;
//             console.log(docs);
//             database.update({ username: data.username }, tuple, {}, function (err, numReplaced) {});
//             database.loadDatabase();
//         })
//     // console.log(info);
// })
