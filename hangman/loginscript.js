
const baseurl = 'http://localhost:8383/'


const username = document.getElementById('userName');
const password = document.getElementById('password');
const wrongmessage = document.getElementById('wrongMessage');

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
    let data = await res.json()
    
    // console.log(data);
    if( data.length >0 && !newvariable.Authentication(data[0])){
        wrongmessage.textContent = "username or password is invalid";
        // console.log(data.length);
    }
    else{
        const up = await fetch(baseurl + 'stat' , {
            method : 'POST',
            headers :{
                'Content-Type': "application/json"
            },
            body : JSON.stringify({stat : true})
    
        })
        document.location.href = "index.html";
    }
    
    // console.log("ssm : "+ newvariable.word);
}

const submitButton = document.querySelector('.submitButton');
class login{

    loginFun(){
        console.log(submitButton);
        submitButton.addEventListener('click', getInfo)
    }

    Authentication(data){
        console.log(data.username);
        return (data.username == username.value && data.password == password.value);
    }
}

const newvariable  = new login;
newvariable.loginFun();