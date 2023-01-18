
const baseurl = 'http://localhost:8383/'




const wordContainer = document.querySelector('.word');
const digitalKeyboard = document.querySelectorAll(".alphaKeys");
const multibutton = document.getElementById('multi');
const par = document.querySelector('.loginSignup-button');

const multiplayPop = document.querySelector('.multipop');
const bgmodel = document.querySelector('.bgModel');
const body = document.getElementsByTagName('body');

const subutton = multiplayPop.querySelector('button');
const player1name = document.getElementById('player1nameinp');
const player2name = document.getElementById('player2nameinp');
console.log(player1name);

const closebutton = document.getElementById('close-button');
const outputpop = document.querySelector('.outputpop')
const multinfo = document.getElementById('multinfo');
const multiturns = document.getElementById('multiturns');

const leaderboardpar = document.getElementsByTagName('tbody');
// console.log(leaderboardpar);

const outmessage = document.getElementById('message');
const wordmes = document.getElementById('wordmessage');

const wordinp = document.getElementById('multiword');
const wordsub = document.getElementById('wordsub');
const wordpop = document.querySelector('.wordpop');
// console.log(wordpop);
const addname = document.getElementById('addname');

const wordwrongmess = document.getElementById('wordwrongmess');

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


async function getstat(){
    const res = await fetch(baseurl + 'stat' ,{
        method:'GET'
    });
    const data = await res.json();
    // newvariable.logstat = data.stat;
    newvariable.loginfo = data;
    if(newvariable.loginfo.stat == 1)
            newvariable.displayLogout();
    else if(newvariable.loginfo.stat == 0)
        newvariable.displaySignupLogin();
        // this.closebutton();
}

async function poststat(){
    const res = await fetch(baseurl + 'stat' ,{
        method:'POST',
            headers :{
                "Content-Type" : "application/json"
            },
            body : JSON.stringify({stat : newvariable.loginfo.stat})
        })
        
    };
async function postupdate(){
    const res = await fetch(baseurl + 'update',{
        method :'POST',
        headers :{
            "Content-Type" : "application/json"
        },
        body : JSON.stringify(newvariable.loginfo)
    })
    getleaderboard();
    console.log("yy" ,res);
}



async function getleaderboard(){
    const res = await fetch(baseurl + 'leaderboard', {
        method : 'GET'
    })
    const data = await res.json();
    console.log(data);
    newvariable.leaderboardinp(data);
}

// class to select hide the word
class SelectedWord{
    // get a random word from the database
    getWord(data){
        console.log("z" ,data);
        this.word = data;
        this.hideWord();
        this.noOfRepeat();
        return this;
        
    }


    // hiding the word and and marking each letter with underline

    hideWord(){
        
        let s = this.word;
        let par = document.createElement('p');
        for(let i = 0;i<s.length;i++){
            const x = document.createElement('span');
            if(s[i] === " ")
            {
                // x.className = "letter space";
                wordContainer.appendChild(par);
                par = document.createElement('p');
                console.log("y");
            }
            else
            {
                x.className = "letter S" + s[i].toLowerCase();
                par.appendChild(x);
            }
        }
        wordContainer.appendChild(par);
    }


    // returning the number of times a letter is present in the word selected by the getword function into repeat object 

    noOfRepeat(){
        this.repeat = {'a':0,'b':0,'c':0,'d':0,'e':0,'f':0,'g':0,'h':0,'i':0,'j':0,'k':0,'l':0,'m':0,'n':0,'o':0,'p':0,'q':0,'r':0,'s':0,'t':0,'u':0,'v':0,'w':0,'x':0,'y':0,'z':0};
        let s = this.word;
        for(let i = 0;i<s.length;i++)
            this.repeat[s[i].toLowerCase()]++;
        
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
                if(this.loginfo.stat == 2)
                    this.multiplayerRes()
                else
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




// updating the figure the analog keyboard and the wrong letters slots with each press
class updatingReset extends Keyboard{


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

    normalreset(){
        multibutton.style.display = "flex";
        document.getElementById('player1name').textContent = "Player1";
        document.getElementById('player1score').textContent = "0";
        document.getElementById('player2name').textContent = "Player2";
        document.getElementById('player2score').textContent = "0";
        multinfo.style.display = "none";
        this.loginfo.stat = 0;
        this.displaySignupLogin();
    }


    // resets the entire game takes and takes new random word and the game starts again
    reset(){
        this.fail = 0;
        this.keyboardCorReset();
        this.keyboardWrongReset();
        this.hideWordReset();
        this.figureReset();
        
        const obj = getInfo();
//         obj.then(data => {
//         newvariable.getWord(data);
// })
    }

    multiplayerReset(){
        this.fail = 0;
        this.keyboardCorReset();
        this.keyboardWrongReset();
        this.hideWordReset();
        this.figureReset();
        if(this.turns > 0)
        {
            this.displaywordpop();
            // console.log("y");
            // this.turns--;
        }
        else if(this.turns1 > 0)
        {
            this.displaywordpop();
        }
    }

    keyboardCorReset(){
        let x = document.querySelectorAll('.rightLetter');
        x.forEach(e => {
            e.className = "alphaKeys " + e.textContent.toLowerCase();
        });
    }

    keyboardWrongReset(){
        let x = document.querySelectorAll('.wrongLetter');
        x.forEach(e => {
            e.className = "alphaKeys " + e.textContent.toLowerCase();
        });
    }
    figureReset(){
        let x = document.querySelectorAll('.figure-part');
        x.forEach(e => {
            e.style.strokeWidth = "0";
            e.style.r = "0";
        });
    }

    hideWordReset(){
        let x = document.querySelector('.word');
        x.innerHTML = "";
    }

}




// import { workSheet } from "./users.js";


class Results extends updatingReset{
    
    multiplayerRes(){
        // console.log(this.fail, "  ",this.success);

        

        if(this.fail == 6)
        {
            console.log('ccc');
            if(this.turns == 1)
                this.player++;
            if(this.turns >0)
            {
                this.win1++;
                this.turns--;
            }
            else if(this.turns1 > 0)
            {
                this.win2++;
                this.turns1--;
            }



            if(this.turns1 == 0)
                this.displayRes();
            
        //    this.player++;
            // this.multiplayerReset();
            this.multiplayerReset();
            this.updatewincount();
            // this.displayRes();
        }
        else if(this.success == 0)
       {
           console.log(this.win2);
           if(this.turns == 1)
                this.player++;

            if(this.turns >0)
            {
                this.win2++;
                this.turns--;
            }
            else if(this.turns1 > 0)
            {
                this.win1++;
                this.turns1--;
            }
            
            if(this.turns1 == 0)
            {
                console.log("turns1" + this.turns);
                this.displayRes();
            }


            this.multiplayerReset();
            this.updatewincount();
        }
        
        
   }

   updatewincount(){
        let pos;
           pos = document.getElementById('player1score');
           pos.textContent = this.win1;
           pos = document.getElementById('player2score');
           pos.textContent = this.win2;
            this.multiplayerReset();
   }
   result(){
       // console.log(this.fail, "  ",this.success);
       if(this.fail == 6)
       {
           if(this.loginfo.stat == 1)
           {
               this.loginfo.total++;
               postupdate()
               .then(this.resultpop("Sorry you are hanged" , this.word));
           }
           else
               this.resultpop("Sorry you are hanged", this.word);

           this.reset();

       }
       else if(this.success == 0)
       {
           console.log(this.loginfo);
           if(this.loginfo.stat == 1)
           {
               this.loginfo.total++;
               this.loginfo.winCount++;
               postupdate()
               .then(this.resultpop("Yay you won !!!!!" , ""))
           }
           else
               this.resultpop("Yay you won !!!!!" , "");
           this.reset();
           
       }
   }
   
}

class Resultpopup extends Results{
    leaderboardinp(data){
        leaderboardpar[0].innerHTML = `<tr class = "odd"><th>Rank</th><th>User Name</th><th>Total</th><th>Win Count</th>`;
        let outp;
        let n = data.length;
        for(let i = 1;i<=n;i++)
        {
            let x = "";
            if(i%2 == 0)
                x = `class = "odd"`;
            outp = `<tr ${x}><td>${i}</td><td>${data[n - i].username}</td><td>${data[n - i].total}</td><td>${data[n - i].winCount}</td>`
            leaderboardpar[0].innerHTML+=outp;
        }
    }
    closebutton(){
        closebutton.addEventListener('click' , (e)=>{
                document.addEventListener('keypress' , updateAnalogKeyboard);
                closebutton.parentNode.style.display = "none";
                console.log(closebutton.parentNode.parentNode);
                bgmodel.style.display = "none";
                body[0].style.overflow = "scroll";
            })

    }

    resultpop(message , wordmessage){
        wordmes.textContent = "";
        outputpop.style.display = "block";
        bgmodel.style.display = "flex";
        document.removeEventListener('keypress' , updateAnalogKeyboard);
        outmessage.textContent = message;
        body[0].style.overflow = "hidden";
        if(wordmessage != "")
            wordmes.textContent = `The word is ${this.word}`;

    }
}

class multiplayer extends Resultpopup{
    multiplayer(){
        multibutton.addEventListener('click', (e)=>{
            this.win1 = 0 ;
            this.win2 = 0;
            this.player = 1;
            this.turns = 0;
            this.turns1 = 0;
            this.loginfo.stat = 2;
            this.displaymultipop();
            this.player1 = "Player1";
            this.player2 = "Player2";
            par.innerHTML = "";
            multibutton.style.display = "none";
            multinfo.style.display = "flex";
            // this.displaySignupLogin();
            this.reset();
        })
    }
    displaywordpop(){
        bgmodel.style.display = "flex";
        wordpop.style.display = "block";
        if(this.player == 1)
            addname.textContent = `plz enter the word ${this.player1}`;
        else
            addname.textContent = `plz enter the word ${this.player2}`;
        body[0].style.overflow = "hidden";
        document.removeEventListener('keypress' , updateAnalogKeyboard); 
    }
    closewordpop(){
        bgmodel.style.display = "none";
        wordpop.style.display = "none";
        body[0].style.overflow = "scroll";
        document.addEventListener('keypress' , updateAnalogKeyboard); 
    }
    submitwordpop(){
        wordsub.addEventListener('click',(e)=>{
            e.preventDefault();
            this.multiplayerReset();
            this.wordEvaluation();
            // e.preventDefault();
            
        })
        
    }
    
    async wordEvaluation(){
        let curword = wordinp.value.trim();
        // try{
            const res = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${curword}`);
            // if (!response.ok) {
            //     // throw new Error("Not 2xx response");
            // } else {
                const data = await res.json();
                console.log(res);
                if(data.title != "No Definitions Found")
                {
                    this.getWord(curword);
                    this.closewordpop();
                    wordwrongmess.textContent = "";
                }
                else
                {
                    wordwrongmess.textContent = "Invalid Word";
                }

            // }
            
        // }catch(err)
        // {
        //     wordpop.innerHTML += `<p>${err}</p>`;
        // }
        
    }
    displaymultipop(){
        // console.log(bgmodel);
        bgmodel.style.display = "flex";
        multiplayPop.style.display = "block";
        // console.log(body);
        body[0].style.overflow = "hidden";
        document.removeEventListener('keypress' , updateAnalogKeyboard); 
    }
    closemultipop(){
        bgmodel.style.display = "none";
        multiplayPop.style.display = "none";
        console.log(body);
        body[0].style.overflow = "scroll";
        document.addEventListener('keypress' , updateAnalogKeyboard); 
    }
    submitmultipop(){
        subutton.addEventListener('click',(e)=>{
            e.preventDefault();
            this.displayname();
            this.closemultipop();
            this.displaywordpop();
        })
    }

    displayname(){
        let pos;
        pos = document.querySelector('#player1name');
        if(player1name.value.trim() != ""){
            pos.textContent = player1name.value;
            this.player1 = player1name.value;
        }
        pos = document.querySelector('#player2name');
        if(player2name.value.trim() != ""){
            pos.textContent = player2name.value;
            this.player2 = player2name.value;
        }
        this.turns = Number(multiturns.value);
        this.turns1 = this.turns;
        this.updatewincount();
    // console.log(pos);
        
        
        
    }

    displayRes(){
        // console.log(this.player1);
        // console.log(this.player2);
        if(this.win1>this.win2)
        {
            this.resultpop(`${this.player1} won the match` ,"");
        }
        else if(this.win1<this.win2)
        {
            this.resultpop(`${this.player2} won the match`,"");
        }
        else
            this.resultpop(`Match is a draw`,"");
        
        
        this.normalreset();
        this.reset();
    }
}

class PlayerVerification extends multiplayer {

    // making all popup as well as buttons associated with it except submit button operational
    init(){
        this.loginfo;
        this.fail = 0;
        getstat();
        this.submitmultipop();
        this.closebutton();
        this.submitwordpop();
        return this;
    }


    

    // make logout possible
    logout(){
        
        const logoutTriggerButton = document.querySelector('.logout-button');
        logoutTriggerButton.addEventListener('click', (e) =>{
            this.displaySignupLogin();
            this.loginfo.stat = false;
            poststat();
            this.reset();
        })
        
        return this;
    }

    // display the signup/ligin button and make them responsive
    displaySignupLogin(){
        
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
        par.innerHTML = ""
        let x = document.createElement('a');
        x.getAttribute('href','#');
        x.className = "logout-button";
        x.textContent = "Logout"
        par.appendChild(x);
        this.logout();
    }
}





const newvariable = new PlayerVerification;
const obj = getInfo();
obj.then(newvariable.init().digitalKeyboard().analogKeyboard().multiplayer())



getleaderboard();

// newvariable.getWord("abcsdaaaaaaaaaaaaa abc");

    


 

    
    

    
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
            if(newvariable.loginfo.stat == 2)
                newvariable.multiplayerRes();
            else
                newvariable.result();
        }

    }