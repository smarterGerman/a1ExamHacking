// ! CURRENT ISSUES: 
// ! TUTORIAL BUTTON SHOWS FIRST INPUT 
// TODO: Let the user know that its his/her turn 
// TODO: Hide the tool for mobiles 
window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
Element.prototype.remove = function() {
  this.parentElement.removeChild(this);
}
NodeList.prototype.remove = HTMLCollection.prototype.remove = function() {
  for(var i = this.length - 1; i >= 0; i--) {
      if(this[i] && this[i].parentElement) {
          this[i].parentElement.removeChild(this[i]);
      }
  }
}



// Containers 
const body = document.querySelector("body");
const audio_img = document.getElementById("audio-img");
const trigger_content = document.querySelector(".trigger-content");
const correct_answers_div = document.querySelector(".correct-answers"); 
const previous_answers_div = document.querySelector(".previous-answers");
const preaching_section = document.querySelector(".preaching-container");
const starting_box = document.querySelector(".starting-box-konstantin");
const mic_container = document.querySelector(".mic-container");
const tutorialContainer = document.querySelector(".tutorial-container");
const navigationContainer = document.querySelector(".navigation");
const nextButton = document.querySelector(".next-button");
const triggerTutorialContainer = document.querySelector(".triggers");
const finishBox = document.querySelector(".finish-screen-konstantin");
const triggerCounterDiv = document.querySelector(".trigger-counter");
const counter = 0;
let play_pause_counter = 0;
let triggers = createRandomArray(vocabs, 5);
console.log(triggers);
// ! DELAY FUNCTION
// Put whatever code that needs to be delayed into sleepFor(seconds)
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
// Capitalize first letter 
function titleCase(string){
  return string[0].toUpperCase() + string.slice(1).toLowerCase();
}
async function sleepFor(seconds, whattodo, index) {
  for (let i = 0; i < seconds; i++) {
      await sleep(i * 1000);
  }
  whattodo(index);
}

// ! Create a random array of variable size given an array and a size 
function createRandomArray(arr, size) {
  let randomIndices = [];
  let randomArr = []
  // Create a list of random unique numbers of given size
  while(randomIndices.length < size){
    let r = Math.floor(Math.random() * arr.length) + 1;
    if(randomIndices.indexOf(r) === -1) randomIndices.push(r);
  }
  // Create random array of given size  
  for (let i = 0; i < randomIndices.length; i++){
    randomArr.push(arr[randomIndices[i]]);
  }
  return randomArr;
}

// ! RESET GAME 
function resetGame(){
  location.reload();
}
// Let computer give its answer function 



// ! START PREACHING 
function startPreaching(){
  preaching_section.classList.remove("hide-konstantin");
  starting_box.classList.add("hide-konstantin");
  trigger_content.classList.remove("hide-konstantin");
  mic_container.classList.remove("hide-konstantin");
  nextButton.classList.add("hide-konstantin");
  gameIsFinished = false;
  // startTutorial();
  // Initialize random array of size 5 
  // triggers = createRandomArray(vocabs, 5);
}
// ! FINISHED PREACHING 
let gameIsFinished = true;
function finishGame(){
  recognition.stop();
  words.classList.add("hide-konstantin");
  triggerTutorialContainer.classList.add("hide-konstantin");
  navigationContainer.classList.add("hide-konstantin");
  finishBox.classList.remove("hide-konstantin");
  correct_answers_div.innerText = ""
  gameIsFinished = true;
}
// WEB SPEECH API SETTINGS 
const recognition = new SpeechRecognition();
recognition.interimResults = true;
recognition.continuous = false;
recognition.lang = 'de-DE';

trigger_content.innerText = triggers[0];

let p = document.createElement('p');
const words = document.querySelector('.words');
words.appendChild(p);

// Focus Function 
function triggerFocus(element) {
  var eventType = "onfocusin" in element ? "focusin" : "focus",
  bubbles = "onfocusin" in element,
  event;
  
  if ("createEvent" in document) {
    event = document.createEvent("Event");
    event.initEvent(eventType, bubbles, true);
  }
  else if ("Event" in window) {
    event = new Event(eventType, { bubbles: bubbles, cancelable: true });
  }
  
  element.focus();
  element.dispatchEvent(event);
}

// Pick the current Trigger 
let current_trigger = triggers[0]; 
let current_trigger_index = 0;
let next_index = 0;
let paragraphs = words.getElementsByTagName("p");

let initialCounter = true;
function countTrigger(){
  triggerCounterDiv.textContent = triggers.indexOf(current_trigger) + 1 + "/" + triggers.length;
}
// ! NEXT TRIGGER FUNCTION
let secondHalf = false;
let nextCounter = 0;
function nextTrigger() {
  nextCounter++;
  if (next_index + 1 < triggers.length){
    next_index++; 
  } else {
    finishGame();
  }
  current_trigger = triggers[next_index];
  trigger_content.innerText = current_trigger;
  deleteEverything();
  correct_answers_div.innerText = "";
  // triggerFocus(words);
  computerSpeakingFirst = true;
  countTrigger();
}
// ! DELETE EVERYTHING FUNCTION 
function deleteEverything() {
  if(switchPlaces % 2 == 0){
    for(i=paragraphs.length - 1; i > 0; i--){
        if(i >= 0){
            paragraphs[i].remove();
          }
        }
    p = document.createElement('p');
    words.appendChild(p);
  } else {
      for(i=paragraphs.length - 1; i > 0; i--){
        if(i >= 0){
          paragraphs[i].remove();
        }
      }
    p = document.createElement('p');
    words.appendChild(p);
  }
  paragraphs[0].innerText = "";
  current_trigger_index = 0;
}
function otherPerson(){
  switchPlaces++; 
  deleteEverything();
}
// ! Tutorial Button 
let tutorial_counter = 0;
let example_preaching = ["Bestrafst du gern?",
"Ich bestrafe nicht gern.",
"Warum bestrafst du nicht gern?", "Weil ich einfach nicht gern bestrafe."]
function startTutorial(){
  if(tutorial_counter % 2 == 0){
    // deleteEverything();
    if(switchPlaces % 2 == 0){
      tutorialContainer.innerHTML = "";
      p = document.createElement('p');
      tutorialContainer.appendChild(p);
    }
    for(i = 0; i < example_preaching.length; i++){
      p.innerText = example_preaching[i];
      p = document.createElement('p');
      tutorialContainer.appendChild(p);
    }
    tutorialContainer.classList.remove("hide-konstantin")
    words.classList.add("blur-konstantin");
    navigationContainer.classList.add("blur-konstantin");
    tutorial_counter++;
  }
  else {
    // deleteEverything();
    tutorialContainer.innerHTML = "";
    words.classList.remove("blur-konstantin");
    navigationContainer.classList.remove("blur-konstantin");
    tutorial_counter++;
    tutorialContainer.classList.add("hide-konstantin")
  }
}

let switchPlaces = 0;
let test = true;
let tmpCounter = 0;
  // recognition.start();
// ! GET RESULT OF AUDIO 
recognition.addEventListener('result', e => {
    // TOOL SPEAKS FIRST 
    // Reset correct answer div 
    correct_answers_div.innerText = "";
    // MIC ON
    audio_img.src = "https://www.filepicker.io/api/file/Vd1N70dPS1yslZ2XwZEJ";
    const transcript = Array.from(e.results)
    .map(result => result[0])
    .map(result => result.transcript)
    .join('');
    
    // const poopScript = transcript.replace(/poo|shit|dump/gi, '💩');
    const poopScript = transcript;
    const deleteScript = transcript.match("löschen");
    if (deleteScript == "löschen" && counter == 0) {
      deleteEverything();
      $('.words').children().last().remove();
    }
    
    if(paragraphs.length > 1){
      paragraphs[paragraphs.length - 1].style.color = "black";
    }
    p.textContent = titleCase(poopScript);
    // Here is where stuff is being written 
    if (e.results[0].isFinal){
      p = document.createElement('p');
      words.appendChild(p);
      // Remove special characters from current_trigger 
      current_trigger = current_trigger.replace(/\n/g,"");
      if (tmpCounter == 0){
        let tmpArr = questions;
        let spoken = paragraphs[paragraphs.length - 2].innerText.toLowerCase().replace(/[.,?!;:]/g,"");
        console.log("I am in the questions section");
        if(tmpArr.some(el => spoken.includes(el.toLowerCase().replace(/[.,?!;:]/g,""))))
        {
          console.log("Questions arr: " + tmpArr);
          paragraphs[paragraphs.length - 2].style.color = "green";
          tmpCounter++;
        } else {
          paragraphs[paragraphs.length - 2].style.color = "red";
        }
      } else {
        let tmpArr = answers;
        let spoken = paragraphs[paragraphs.length - 2].innerText.toLowerCase().replace(/[.,?!;:]/g,"");
        console.log("I am in the answers section");
        if(tmpArr.some(el => spoken.includes(el.toLowerCase().replace(/[.,?!;:]/g,""))))
        {
          console.log("Answers arr: " + tmpArr);
          paragraphs[paragraphs.length - 2].style.color = "green";
          if (tmpCounter == 1){
            tmpCounter = 0;
            sleepFor(2, nextTrigger);
          }
        } else {
          paragraphs[paragraphs.length - 2].style.color = "red";
        }

      }
    }
  if(paragraphs.length > 5){
    paragraphs[0].remove();
  }
  recognition.addEventListener('end', () => {
    // MIC OFF 
    audio_img.src = "https://www.filepicker.io/api/file/VyfbFTekQn6m2LEPlNm5"
  });
  test = false; 
});
  // Key command to pause and start the audio 
  window.addEventListener("keydown", (event) => {
    nextButton.classList.remove("hide-konstantin");
    if(event.isComposing || event.keyCode === 13 && 
      (event.ctrlKey ||event.metaKey) && !gameIsFinished){
      recognition.start();
      audio_img.src = "https://www.filepicker.io/api/file/Vd1N70dPS1yslZ2XwZEJ"
    }
  });
  // Button to start the microphone 
  function turnOnMicro(){
    nextButton.classList.remove("hide-konstantin");
    if(initialCounter){
      countTrigger();
      initialCounter = false;
    }
    recognition.start();
    audio_img.src = "https://www.filepicker.io/api/file/Vd1N70dPS1yslZ2XwZEJ"

  }
  // Key command to go to next trigger 
  window.addEventListener("keydown", (event) => {
    if(event.isComposing || event.keyCode === 39){
      nextTrigger();
    }
  });