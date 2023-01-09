
const baseurl = 'http://localhost:8383/'




const wordContainer = document.querySelector('.word');
const digitalKeyboard = document.querySelectorAll(".alphaKeys");
 
const signupBox = document.querySelector('.signuppop');
const loginBox = document.querySelector('.loginpop');

const LoginToSignupButton =  document.querySelector('.signupLink');
const SignupToSignupButton =  document.querySelector('.loginLink');

const BoxCloseButtons = document.querySelectorAll('.popup-close');

const signupsubmitbutton = document.querySelector('.signupSubmitButton');
const loginSubmitButton = document.querySelector('.loginSubmitButton');

const usernameInput = document.getElementById('UserName');
const passwordInput = document.getElementById('passworddec');

const signupInputslots = signupBox.getElementsByTagName('input');


const loginusernameInput =document.getElementById('userName')
const loginpasswordInput =document.getElementById('password')


const signupwrongmessage = document.getElementById('signwrongm');
const loginwrongmessage = document.getElementById('loginwrongm');


// console.log(logoutTriggerButton);
async function getInfo(){
    const res = await fetch(baseurl +'info',{
        method: 'GET'
    })
    
    let data = await res.json();
    const arr = ["Countries" , "Animals"];
    arr.forEach(e =>{
        if(data[0].hasOwnProperty(e))
        {
            // console.log("x");
            data = data[0][e];
        }
    })
    console.log("y" ,data);
    newvariable.getWord(data);
}


async function postInfo(){
    console.log('y');
    const res = await fetch(baseurl ,{
        method: 'POST',
        headers:{
            "Content-Type" : "application/json"
        },
        body : JSON.stringify(newvariable.signupBoxToJSON())
    }
    
    
)
    console.log(res.body);
// console.log('usernameInput ',usernameInput.value);
}

async function postlogout(){
    console.log('y');
    const res = await fetch(baseurl + 'logout',{
        method: 'POST',
        headers:{
            "Content-Type" : "application/json"
        },
        body : JSON.stringify({
            username : userName,
            winCount : wincount,
            total : Total - 1
        })
    }
    
)
// console.log('usernameInput ',usernameInput.value);
}
    



async function getInfo3(){
    const res = await fetch(baseurl +'form',{
        method: 'GET'
    })
    
    const data = await res.json();
    return data;
}

let wincount = 0,Total = 0, userName = "";
// class to select hide the word
class SelectedWord{
    // get a random word from the database
    getWord(data){
        console.log("z" ,data);
        this.word = data;
        Total++;
        this.hideWord();
        this.noOfRepeat();
        return this;
        
    }


    // hiding the word and and marking each letter with underline

    hideWord(){
        
        let s = this.word;
        for(let i = 0;i<s.length;i++){
            const x = document.createElement('span');
            if(s[i] === " ")
                x.className = "letter space";
            else
                x.className = "letter S" + s[i].toLowerCase();
                wordContainer.appendChild(x);
            
        }
    }


    // returning the number of times a letter is present in the word selected by the getword function into repeat object 

    noOfRepeat(){
        this.repeat = {'a':0,'b':0,'c':0,'d':0,'e':0,'f':0,'g':0,'h':0,'i':0,'j':0,'k':0,'l':0,'m':0,'n':0,'o':0,'p':0,'q':0,'r':0,'s':0,'t':0,'u':0,'v':0,'w':0,'x':0,'y':0,'z':0};
        let s = this.word;
        for(let i = 0;i<s.length;i++)
            this.repeat[s[i].toLowerCase()]++;
        
        this.fail = 0;
        let spaces = this.word.split(' ').length - 1;
        this.success = this.word.length - spaces;
    }

    

}



// making digital and analog Keyboard responsive
class Keyboard extends SelectedWord{

    

// making digital Keyboard responsive
    digitalKeyboard(){
        digitalKeyboard.forEach((e)=>{
                e.addEventListener('click',(x)=>{
                    console.log("y");
                this.updateKeyboard_ShowLetter_updateFigure(e.textContent , e);
                this.result();
            })
        })
        return this;
    }


// making analog Keyboard responsive
    analogKeyboard(){
        document.addEventListener('keypress' , updateAnalogKeyboard);
        return this;
    }
    


    // updating keyboard keys after pressing as well as update the success and fail variables
    updateKeyboard_ShowLetter_updateFigure(s , node){
        if(this.repeat[s.toLowerCase()] > 0)
        {
            node.className += " rightLetter";
            this.showLetter(s);
            this.success-= this.repeat[s.toLowerCase()];
        }
        else if(this.repeat[s.toLowerCase()] == 0)
        {
            node.className += " wrongLetter";
            this.fail++;
            console.log("fail : ",this.fail)
            this.updateFigure(this.fail);
        } 
        this.repeat[s.toLowerCase()] = -1;
    }
}


async function postupdate(){
    const res = await fetch(baseurl + 'update',{
        method :'POST',
        headers :{
            "Content-Type" : "application/json"
        },
        body : JSON.stringify(newvariable.loginfo)
    })
}

// updating the figure the analog keyboard and the wrong letters slots with each press
class updatingReset extends Keyboard{

    
    result(){
        console.log(this.fail, "  ",this.success);
        if(this.fail == 6)
        {
            this.loginfo.total++;
            postupdate();
            this.reset();
            alert("Sorry you are hanged");
        }
        else if(this.success == 0)
        {
            this.loginfo.total++;
            this.loginfo.winCount++;
            postupdate();
            this.reset();
            alert("Yay you won !!!!!");
            wincount++;
        }
    }
    // updating the figure in accordance with the current state
    updateFigure(x){
        if(x == 1){
            let x = document.querySelector('.try1');
            x.style.r = "20";
        }
        else if(x == 2){
            let x = document.querySelector('.try2');
            console.log(x);
            x.style.strokeWidth = "3";
            x.style.stroke = "black";
        }
        else if(x == 3){
            let x = document.querySelector('.try3');
            x.style.strokeWidth = "3";
            x.style.stroke = "black";
        }
        else if(x == 4){
            let x = document.querySelector('.try4');
            x.style.strokeWidth = "3";
            x.style.stroke = "black";
        }
        else if(x == 5){
            let x = document.querySelector('.try5');
            x.style.strokeWidth = "3";
            x.style.stroke = "black";
        }
        else{
            let x = document.querySelector('.try6');
            x.style.strokeWidth = "3";
            x.style.stroke = "black";
        }
    }


    // makes the character visible and decrease the success parameter by 1

    showLetter(s){
        let x = document.querySelectorAll('.S'+s.toLowerCase());
        x.forEach(e => {
            e.textContent = s.toUpperCase();
        });
        
    }




    // // makes the wrong letters popup in the wrong letters section
    // updateWrongLetter(s){
    //     let x = document.querySelector('.wrongLetterList');
    //     x.textContent += " "+s;
    // }


    // resets the entire game takes and takes new random word and the game starts again

    reset(){
        this.fail = 0;
        let x = document.querySelectorAll('.rightLetter');
        x.forEach(e => {
            e.className = "alphaKeys " + e.textContent.toLowerCase();
        });
        x = document.querySelectorAll('.wrongLetter');
        x.forEach(e => {
            e.className = "alphaKeys " + e.textContent.toLowerCase();
        });

        x = document.querySelectorAll('.figure-part');
        x.forEach(e => {
            e.style.strokeWidth = "0";
            e.style.r = "0";
        });
        x = document.querySelector('.word');
        while (x.firstChild) {
            x.removeChild(x.firstChild);
        }
        const obj = getInfo();
//         obj.then(data => {
//         newvariable.getWord(data);
// })
    }
}




// import { workSheet } from "./users.js";
async function getstat(){
    const res = await fetch(baseurl + 'stat' ,{
        method:'GET'
    });
    const data = await res.json();
    // newvariable.logstat = data.stat;
    newvariable.loginfo = data;
    if(newvariable.loginfo.stat)
            newvariable.displayLogout();
    else
        newvariable.displaySignupLogin();
        // this.closebutton();
}

// async function sendstat(){
//     const res = await fetch(baseurl +"stat" ,{
//         method : "POST",
//         headers :{
//             "Content-Type" : "application/json"
//         },
//         body : JSON.stringify({stat : false})
//     });
// }
class PlayerVerification extends updatingReset {

    // making all popup as well as buttons associated with it except submit button operational
    init(){
        this.loginfo;
        // this.logstat = 0;
        getstat();
        // if(this.loginfo.stat)
        //     this.displayLogout();
        // else
        //     this.displaySignupLogin();
        // this.closebutton();
        
        // this.switchbutton(LoginToSignupButton , signupBox);
        // this.switchbutton(SignupToSignupButton, loginBox);
    }




   // making curnode capable of toggling the newnode popupbox
    // switchbutton(curnode , newnode){
    //     curnode.addEventListener('click' , (e)=>{
    //         const par = curnode.parentNode;
    //         par.style.display = "none";
    //         newnode.style.display = "block";
    //     })
        
    // } 


    // making the close button on the top right corner of every popup box operational
    // closebutton(){
        
    //     BoxCloseButtons.forEach(button=> {
    //         // console.log("y");
    //             button.addEventListener('click' , (e)=>{
    //             document.addEventListener('keypress' , updateAnalogKeyboard);
    //             const par = button.parentNode;
    //             par.style.display = "none";
    //             par.parentNode.style.display = "none";
    //         })
    //     });
    // }
    
    
    // // making the login/signup button(button) on top right corner of the screen operational ie toggle the respective form (box)
    // buttonWork(button , box){
    //         button.addEventListener('click' ,(e) =>{
    //         document.removeEventListener('keypress' , updateAnalogKeyboard);
    //         const par =   box.parentNode;
    //         par.style.display = "flex";
    //         box.style.display = "block";
    //     })
    // }


    //   validating the values written in submit form are allowable
    // signupValidation(data){
    //     const password = document.querySelector("#passworddec");
    //     const confpassword = document.querySelector("#confpassword");
    //     let stat = true;
    //     Array.from(signupInputslots).forEach(e => {
    //         if(e.value.trim() == "")
    //         {
    //             signupwrongmessage.textContent = "one or more fields are empty";
    //             stat = false;
    //         }
    //     });
    //     if(stat && password.value != confpassword.value)
    //     {
    //         signupwrongmessage.textContent = "Password does not match";
    //         return false;
    //     }
    //     if(stat)
    //     {
    //         data.forEach(e=>{
    //             if(e.username == usernameInput.value)
    //             {
    //                 signupwrongmessage.textContent = 'username already exists';
    //                 stat =  false;
    //             }

    //         })
    //     }
    //     return stat;
    // }
    // make signup possible

    // signupBoxToJSON(){
    //     let o = {};
    //     Array.from(signupInputslots).forEach(e => {
    //         o[e.getAttribute('name')] = e.value;
    //     });
    //     o.winCount = 0;
    //     o.total = 0;
    //     // console.log(o);
    //     return o;
    // }
    // signup(){
    //         signupsubmitbutton.addEventListener('click' ,(e)=>{
    //             e.preventDefault();
    //             signupwrongmessage.textContent = "";
    //             const obj = getInfo3();
    //             obj.then(data=>{
    //                 console.log(data);
    //                 if(this.signupValidation(data))
    //                 {
                        
    //                     userName = usernameInput.value;
    //                     console.log("y");
    //                     postInfo()
    //                     this.analogKeyboard();
    //                     this.displayLogout();
    //                     signupBox.style.display = "none";
    //                     signupBox.parentElement.style.display = "none";
    //                     this.logout();  
    //                 }
    //             })
                
    //         })
        
    //     return this;
    // }

// make login possible
    // login(){
    //     // loginSubmitButton.addEventListener('click', getInfo2);
    //     // (e)=>{
    //         // e.preventDefault();
    //         // this.displayLogout();
    //         // loginBox.parentElement.style.display = "none";
    //         // loginBox.style.display = "none";
    //         // this.logout();
    //     // })
        
    //     // this.loginValidation();
    //     return this;
    // }

    // make logout possible
    logout(){
        
        const logoutTriggerButton = document.querySelector('.logout-button');
        logoutTriggerButton.addEventListener('click', (e) =>{
            this.displaySignupLogin();
            this.loginfo.stat = false;
            // sendstat();
            this.reset();
        })
        
        return this;
    }

    // display the signup/ligin button and make them responsive
    displaySignupLogin(){
        const par = document.querySelector('.loginSignup-button');
        par.innerHTML = ""
        let x = document.createElement('a');
        x.setAttribute('href' , "login.html");
        x.className = "login-button";
        x.textContent = "Login"
        par.appendChild(x);
        // this.buttonWork(x , loginBox);
        x = document.createTextNode('/');
        par.appendChild(x);
        
        x = document.createElement('a');
        x.setAttribute('href' , "signUp.html");
        x.className = "signup-button";
        x.textContent = "Signup"
        par.appendChild(x);
        // this.buttonWork(x , signupBox);
    }

    // display logout button
    displayLogout(){
        const par = document.querySelector('.loginSignup-button');
        par.innerHTML = ""
        let x = document.createElement('span');
        x.className = "logout-button";
        x.textContent = "Logout"
        par.appendChild(x);
        this.logout();
    }
}





const newvariable = new PlayerVerification;
newvariable.init();

newvariable.digitalKeyboard().analogKeyboard();


const obj = getInfo();

    


 

    
    

    
// function to update when typing physically using keyboard

    function updateAnalogKeyboard(e){
        if((e.charCode>64 && e.charCode <91) || (e.charCode >96 && e.charCode <123))
        {
            console.log("xxx");
            let s = e.key;
            let node = document.querySelector('.' + e.key.toLowerCase());
            if(newvariable.repeat[s.toLowerCase()] > 0)
            {
                node.className += " rightLetter";
                newvariable.success-=newvariable.repeat[s.toLowerCase()];
                newvariable.showLetter(s);
            }
            else if(newvariable.repeat[s.toLowerCase()] == 0)
            {
                node.className += " wrongLetter";
                newvariable.fail++;
                newvariable.updateFigure(newvariable.fail);
            }
            newvariable.repeat[s.toLocaleLowerCase()] = -1;
            newvariable.result();
        }

    }