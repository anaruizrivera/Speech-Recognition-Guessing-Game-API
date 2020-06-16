const msgEl = document.getElementById('msg');

const randomNum = getRandomNumber();

function getRandomNumber() {
    return Math.floor(Math.random() * 100) + 1;
}
// console.log("Number: " randomNum);

//Initalize a speech recognition object
window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;


//create a variable to work with the Speech Recognition object
let recognition = new window.SpeechRecognition();

//start recognition 
recognition.start();

//Listen for the result event
recognition.addEventListener('result', onSpeak)

//Create onSpeak function
function onSpeak(e) {
    const msg = e.result[0][0].transcript;
    console.log(msg)

    writeMessage(msg);
    checkNumber(msg);
}
//Display msg to the screen
function writeMessage(msg) {
    msgEl.innerHTML = `
    <div>You Said: </div>
    <span class="box>${msg}</span>
    `;
}
//Check the against the number
function checkNumber(msg) {
    const num = +msg;
    //check if a valid number
    if (Number.isNana(num)) {
        msgEl.innerHTML += `<div>that is not a valid number!</div>`;
        return;
    }
    //Check if number is in range
    if (num > 100 || num < 1) {
        msgEl.innerHTML += `<div>Your number must be between 1-100!</div>`;
        return;

    }
    //check number against Ramdomly generated Number
    if (num === randomNum) {
        document.body.innerHTML = `
    <h2>Congrats!! YOU GUESSED THE NUMBER <br></h2>
    It was ${num}
    <button class="play-again" id="play-again">Play again</button>`;
    } else if (num > randomNum) {
        msgEl.innerHTML += `<div>GO LOWER</div>`
    } else {
        msgEl.innerHTML += `<div>GO HIGHER</div>`
    }

}

//Allow the user to continue to guess - End Speech Recognition
recognition.addEventListener('end', ()=> recognition.start());


//Make the play button work
document.body.addEventListener('click', e=> {
    if(e.target.id=='play-again'){
        window.location.reload();
    }
})