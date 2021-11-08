import Song from "./jukebox.js"

let humanCount = 0;
let autoCount = 0;
let autoPrice = 100;
var autoMultiplier = 0;
let multiPrice = 100;
var multiMultiplier = 0;
let x = 0;
let myDrone = true;
let droneInterval;

const abduct = document.querySelector(".abductButton");
const counter = document.querySelector(".counter");
const autoClicker = document.querySelector(".autoClicker");
const autoButton = document.querySelector(".autoButton");
const autoCountDisplay = document.querySelector(".autoCount");
const autoPriceDisplay = document.querySelector(".autoPrice");
const multiPriceDisplay = document.querySelector(".multiPrice");
const multiButton = document.querySelector(".multiButton");
const multiCount = document.querySelector(".multiCount");
const nextSong = document.querySelector("#nextSong");
const restart = document.querySelector("#restart");

const humanoid = new Song('/src/resources/Humanoid.mp3', "Song: Humanoid 2.0", "Artist: Eprom & ZEKE BEATS", "Album: Humanoid 2.0 (single)");
const aliens = new Song('/src/resources/Aliens.mp3', "Song: Aliens", "Artist: Just A Gent", "Album: Aliens (single)");
const earth = new Song('/src/resources/Earth.mp3', "Song: Earth", "Artist: Giraffage", "Album: Too Real");
const destroy = new Song('/src/resources/DestroyAllHumans.mp3', "Song: Destroy All Humans", "Artist: Oski", "Album: Destroy All Humans (EP)");
const expand = new Song('/src/resources/Expand.mp3', "Song: Expand the Universe", "Artist: LSDream & Gravitrax", "Album: Renegades of Light");
const orbit = new Song('/src/resources/Orbit.mp3', "Song: Orbit", "Artist: REZZ", "Orbit (single)");

const songs = [humanoid, aliens, earth, destroy, expand, orbit];



autoPriceDisplay.innerText = autoPrice;
multiPriceDisplay.innerText = multiPrice;
setInterval(function(){flashText(x)}, 800);

UpdateCounter();

abduct.addEventListener("click", ()=>{
    
    humanCount += Math.pow(1.2, multiMultiplier);
    UpdateCounter();
});


autoButton.addEventListener("click", ()=>{
    if (humanCount >= autoPrice){
        humanCount -= autoPrice;
        autoMultiplier++;
        myDrone = true;
        console.log(autoMultiplier);
        Drone();
        UpdateCounter();
        autoPrice = Math.round(autoPrice * 1.1);
        UpdateAutoPrice();
    }
    else{
        alert("Not enough humans!");
    }
});

multiButton.addEventListener("click", ()=>{
    if(humanCount >= multiPrice){ 
        humanCount -= multiPrice;
        multiPrice = Math.ceil(multiPrice * 1.2);
        multiMultiplier++;
        console.log(multiMultiplier);
        UpdateMultiPrice();
        UpdateCounter();
    }
    else{
        alert("Not enough humans!");
    }
});

restart.addEventListener("click", ()=> {
    humanCount = 0;
    multiPrice = 100;
    autoCount = 0;
    autoPrice = 100;
    multiMultiplier = 0;
    autoMultiplier = 0;
    myDrone = false;
    Drone();
    UpdateAutoPrice();
    UpdateCounter();
    UpdateMultiPrice();
});

function flashText(){
    var colorCheck = document.getElementById('headline').style.color;
    if(x===0){
        document.getElementById('headline').style.color = "#ff0000";
        x++;
    }
    else if(x===1){
        document.getElementById('headline').style.color = "#00e30f";
        x--;
    }
    else{
        null;
    }
}


function Drone(){
    
    if(myDrone === true){
        droneInterval = setInterval(function autoCount(){
            humanCount += (1 * autoMultiplier);
            UpdateCounter();
        }, 1000);
        console.log("set droneInterval:" + droneInterval);
    }
    else{
        console.log("clear droneInterval:" + droneInterval);
        clearInterval(droneInterval);
    } 
};



var modal = document.getElementById("myModal");

var btn = document.getElementById("myBtn");

var span = document.getElementsByClassName("close")[0];

btn.onclick = function() {
  modal.style.display = "block";
}

span.onclick = function() {
  modal.style.display = "none";
}

window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

const song = document.querySelector("#song");
const artist = document.querySelector("#artist");
const album = document.querySelector("#album");

function JukeboxDisplay(currentSong){
    song.innerText = currentSong.name;
    artist.innerText = currentSong.artist;
    album.innerText = currentSong.album;
}
let currentSong  = 0;
let audio;
function PlaySongs(songs){
    audio = new Audio(songs[currentSong].songUrl)
    JukeboxDisplay(songs[currentSong])
    audio.play();
    audio.volume = .2;
    audio.addEventListener("ended", ()=>{
        advanceSong();
    })
};



nextSong.addEventListener("click", ()=>{
    advanceSong();
})

function advanceSong(){
    audio.pause();
    currentSong++;
    if(currentSong===6){
        currentSong = 0;
    }
    PlaySongs(songs);
}

PlaySongs(songs);


function UpdateCounter(){
    counter.innerText = Math.ceil(humanCount);
    if(humanCount<autoPrice){
        autoButton.disabled = true;
    }
    else{
        autoButton.disabled = false;
    }
    if(humanCount<multiPrice){
        multiButton.disabled = true;
    }
    else{
        multiButton.disabled = false;
    }
};

 function UpdateAutoPrice(){
    autoPriceDisplay.innerText = autoPrice;
    autoCountDisplay.innerText = autoMultiplier;
};

function UpdateMultiPrice(){
    multiPriceDisplay.innerText = multiPrice;
    multiCount.innerText = multiMultiplier;
};