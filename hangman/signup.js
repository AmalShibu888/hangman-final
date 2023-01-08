// const { json } = require("express");

const baseurl = 'http://localhost:8383/'


const username = document.getElementById('UserName');
const password = document.getElementById('password');
const confpassword = document.getElementById('confpassword');
const wrongmessage = document.getElementById('wrongMessage');

const inputslots = document.querySelectorAll('input');
async function getInfo(e){
    e.preventDefault();
    wrongmessage.textContent = "";
    const up = await fetch(baseurl + 'form' , {
        method : 'POST',
        headers :{
            'Content-Type': "application/json"
        },
        body : JSON.stringify({username : username.value,
        password : password.value})

    })
    // console.log("up");
    const res = await fetch(baseurl +'form',{
        method: 'GET'
    })
    // console.log("k");
    let data = await res.json();
    
    console.log(data);
    if(data.length > 0){
        wrongmessage.textContent = "username already exists";
        // console.log('x');
    }
    else if(newvariable.Authentication()){
        // document.location.href = "index.html";
        const input = await fetch(baseurl  + "database",{
            method : "POST",
            headers :{
                "Content-Type" : "application/json"
            },
            body : JSON.stringify(newvariable.signupBoxToJSON())
        } )
        console.log("y");
    }
    
    // console.log("ssm : "+ newvariable.word);
}

const submitButton = document.querySelector('.submitButton');
class signup{

    signupFun(){
        console.log(submitButton);
        submitButton.addEventListener('click', getInfo)
    }

    signupBoxToJSON(){
        let o = {};
       inputslots.forEach(e => {
        console.log(e.getAttribute('name'));
            if(e.getAttribute('name') != "confpassword")
                o[e.getAttribute('name')] = e.value;
        });
        o.winCount = 0;
        o.total = 0;
        // console.log(o);
        return o;
    }
    
    Authentication(){
        console.log(password.value);
        if(password.value != confpassword.value)
        {
            console.log(password.value);
            wrongmessage.textContent = "password and confirm password should be same";
            return false;
        }
        let status = true;
        inputslots.forEach(e =>{
            if(e.value == "")
            {
                wrongmessage.textContent = "one or more fields are empty";
                status = false;
            }
        })
        return status;
    }

}

const newvariable  = new signup;
newvariable.signupFun();